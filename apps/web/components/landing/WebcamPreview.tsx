'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Camera, CameraOff, Mic, MicOff, RefreshCw, Sparkles } from 'lucide-react';

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

  useEffect(() => {
    let activeStream: MediaStream | null = null;

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
      if (activeStream) {
        activeStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isVideoOff]);

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
    <div className={`relative w-full border-2 border-white/10 shadow-2xl overflow-hidden flex flex-col items-center justify-center transition-all ${
      compact
        ? 'h-[200px] sm:h-[240px] md:h-[250px] rounded-2xl bg-[#141220]'
        : 'h-[380px] sm:h-[460px] md:h-[520px] rounded-3xl bg-[#141220]'
    }`}>
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
        <div className="flex flex-col items-center justify-center p-6 text-center space-y-3 text-white/70">
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-white/50">
            <CameraOff className="w-8 h-8" />
          </div>
          <div className="text-sm font-bold text-white">Camera Preview Disabled</div>
          <p className="text-xs text-white/50 max-w-[200px]">
            {errorMessage || 'Click below to turn on your camera before starting chat.'}
          </p>
        </div>
      )}

      {/* Floating Status Indicator on Top Left */}
      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-2 text-xs font-semibold text-white">
        <span className={`w-2 h-2 rounded-full ${hasPermission && !isVideoOff ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
        <span>{hasPermission && !isVideoOff ? 'Live Preview' : 'Camera Off'}</span>
      </div>

      {/* Floating Media Controls on Bottom */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-3 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/15 shadow-lg">
        {/* Toggle Mic */}
        <button
          type="button"
          onClick={onToggleMic}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            isMuted
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
          title={isMuted ? 'Unmute Microphone' : 'Mute Microphone'}
        >
          {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        {/* Toggle Video */}
        <button
          type="button"
          onClick={onToggleVideo}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            isVideoOff
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
          title={isVideoOff ? 'Turn Camera On' : 'Turn Camera Off'}
        >
          {isVideoOff ? <CameraOff className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
