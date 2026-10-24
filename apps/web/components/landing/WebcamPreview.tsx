'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Camera, CameraOff, Mic, MicOff, AlertCircle } from 'lucide-react';

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
          setErrorMessage('Media devices not supported.');
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
        console.warn('Camera preview permission not granted:', err);
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
    <div
      className={`relative w-full rounded-2xl bg-[#8CCDF4] border-2 border-[#252820] shadow-[0_4px_0_#252820] overflow-hidden flex flex-col items-center justify-center transition-all ${
        compact ? 'h-48 sm:h-56' : 'h-64 sm:h-72 md:h-80'
      }`}
    >
      {/* Pixel Clouds in Background Sky */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="w-full h-full" shapeRendering="crispEdges">
          <rect x="20" y="20" width="48" height="16" fill="#FFFFFF" rx="4" />
          <rect x="32" y="12" width="24" height="12" fill="#FFFFFF" rx="4" />
          <rect x="220" y="35" width="56" height="16" fill="#FFFFFF" rx="4" />
        </svg>
      </div>

      {/* Video Feed */}
      {!isVideoOff && hasPermission ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover scale-x-[-1] z-10"
        />
      ) : (
        <div className="flex flex-col items-center justify-center p-4 text-center z-10 text-[#252820]">
          <div className="w-14 h-14 rounded-xl bg-white/70 border-2 border-[#252820] shadow-[0_2px_0_#252820] flex items-center justify-center text-2xl mb-2">
            👦
          </div>
          <div className="text-xs font-black text-[#252820]">
            {errorMessage ? 'Permission Needed' : 'Camera Off'}
          </div>
          <p className="text-[11px] text-[#252820]/80 max-w-[180px] mt-0.5">
            {errorMessage || 'Click below to turn on your webcam.'}
          </p>
        </div>
      )}

      {/* "You" Indicator Badge */}
      <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-lg bg-white border-2 border-[#252820] shadow-[0_2px_0_#252820] flex items-center gap-1.5 text-xs font-black text-[#252820]">
        <span className="w-2 h-2 rounded-full bg-[#65A843] animate-pulse" />
        <span>You</span>
      </div>

      {/* Bottom Floating Media Controls */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white/90 border-2 border-[#252820] shadow-[0_2px_0_#252820]">
        <button
          type="button"
          onClick={onToggleMic}
          className={`w-7 h-7 rounded-lg border border-[#252820] flex items-center justify-center transition-all ${
            isMuted ? 'bg-[#EF5350] text-white' : 'bg-white text-[#252820] hover:bg-[#EAF5D5]'
          }`}
          title={isMuted ? 'Unmute Mic' : 'Mute Mic'}
        >
          {isMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
        </button>

        <button
          type="button"
          onClick={onToggleVideo}
          className={`w-7 h-7 rounded-lg border border-[#252820] flex items-center justify-center transition-all ${
            isVideoOff ? 'bg-[#EF5350] text-white' : 'bg-white text-[#252820] hover:bg-[#EAF5D5]'
          }`}
          title={isVideoOff ? 'Turn Camera On' : 'Turn Camera Off'}
        >
          {isVideoOff ? <CameraOff className="w-3.5 h-3.5" /> : <Camera className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}
