'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Camera, CameraOff, Mic, MicOff, Volume2, Sparkles, AlertCircle } from 'lucide-react';

interface WebcamPreviewProps {
  isMuted: boolean;
  isVideoOff: boolean;
  onToggleMic: () => void;
  onToggleVideo: () => void;
  compact?: boolean;
}

export function WebcamPreview({
  isMuted,
  isVideoOff,
  onToggleMic,
  onToggleVideo,
  compact = false,
}: WebcamPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    let activeStream: MediaStream | null = null;
    let audioContext: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let animFrameId: number | null = null;

    async function initCamera() {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          setErrorMessage('Media devices not supported in this browser.');
          setHasPermission(false);
          return;
        }

        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 640 },
            height: { ideal: 480 },
            facingMode: 'user',
          },
          audio: true,
        });

        activeStream = mediaStream;
        setStream(mediaStream);
        setHasPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }

        // Audio activity detection
        try {
          const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          if (AudioContextClass) {
            audioContext = new AudioContextClass();
            const source = audioContext.createMediaStreamSource(mediaStream);
            analyser = audioContext.createAnalyser();
            analyser.fftSize = 256;
            source.connect(analyser);

            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            const checkVolume = () => {
              if (analyser && !isMuted) {
                analyser.getByteFrequencyData(dataArray);
                let sum = 0;
                for (let i = 0; i < dataArray.length; i++) {
                  sum += dataArray[i];
                }
                const average = sum / dataArray.length;
                setIsSpeaking(average > 15);
              } else {
                setIsSpeaking(false);
              }
              animFrameId = requestAnimationFrame(checkVolume);
            };
            checkVolume();
          }
        } catch (e) {
          // Non-blocking audio detection failure
        }
      } catch (err) {
        console.warn('Webcam preview permission denied or unavailable:', err);
        setHasPermission(false);
        setErrorMessage('Camera or microphone permission needed.');
      }
    }

    if (!isVideoOff) {
      initCamera();
    } else if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      if (audioContext && audioContext.state !== 'closed') {
        audioContext.close().catch(() => {});
      }
      if (activeStream) {
        activeStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isVideoOff, isMuted]);

  useEffect(() => {
    if (stream) {
      stream.getAudioTracks().forEach((track) => {
        track.enabled = !isMuted;
      });
      stream.getVideoTracks().forEach((track) => {
        track.enabled = !isVideoOff;
      });
    }
  }, [stream, isMuted, isVideoOff]);

  return (
    <div
      className={`relative w-full glass-panel border border-white/10 shadow-2xl overflow-hidden flex flex-col items-center justify-center transition-all ${
        compact
          ? 'h-[200px] sm:h-[240px] md:h-[260px] rounded-2xl'
          : 'h-[360px] sm:h-[440px] md:h-[480px] rounded-3xl'
      }`}
    >
      {/* Video Feed */}
      {!isVideoOff && hasPermission ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover scale-x-[-1]"
        />
      ) : (
        <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-400 shadow-inner">
            <CameraOff className="w-8 h-8" />
          </div>
          <div className="text-sm font-bold text-white">Camera Preview Disabled</div>
          <p className="text-xs text-slate-400 max-w-[220px]">
            {errorMessage || 'Your camera is currently off. Click below to test your framing before matching.'}
          </p>
        </div>
      )}

      {/* Floating Status Indicator on Top Left */}
      <div className="absolute top-3.5 left-3.5 px-3 py-1.5 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/10 flex items-center gap-2 text-xs font-semibold text-white">
        <span
          className={`w-2 h-2 rounded-full ${
            hasPermission && !isVideoOff ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
          }`}
        />
        <span>{hasPermission && !isVideoOff ? 'Selfie Frame' : 'Camera Off'}</span>

        {/* Audio Wave Indicator */}
        {hasPermission && !isMuted && (
          <div className="flex items-center gap-0.5 ml-1 h-3">
            <span className={`w-0.5 bg-cyan-400 rounded-full ${isSpeaking ? 'animate-wave-1' : 'h-1'}`} />
            <span className={`w-0.5 bg-cyan-400 rounded-full ${isSpeaking ? 'animate-wave-2' : 'h-2'}`} />
            <span className={`w-0.5 bg-cyan-400 rounded-full ${isSpeaking ? 'animate-wave-3' : 'h-1'}`} />
          </div>
        )}
      </div>

      {/* Floating Media Controls on Bottom */}
      <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-950/65 backdrop-blur-md border border-white/15 shadow-xl">
        {/* Toggle Mic */}
        <button
          type="button"
          onClick={onToggleMic}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            isMuted
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm shadow-rose-500/10'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
          title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
        >
          {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        {/* Toggle Video */}
        <button
          type="button"
          onClick={onToggleVideo}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            isVideoOff
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm shadow-rose-500/10'
              : 'bg-white/10 text-white hover:bg-white/20'
          }`}
          title={isVideoOff ? 'Turn camera on' : 'Turn camera off'}
        >
          {isVideoOff ? <CameraOff className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
