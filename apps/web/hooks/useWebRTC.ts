'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { AppSocket } from './useSocket';
import { SdpPayload, IceCandidatePayload } from '@strangerconnect/shared';

const DEFAULT_ICE_SERVERS: RTCIceServer[] = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
];

export interface UseWebRTCOptions {
  socket: AppSocket | null;
  matchId: string | null;
  isOfferer: boolean;
  enabled: boolean;
}

export function useWebRTC({ socket, matchId, isOfferer, enabled }: UseWebRTCOptions) {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [connectionState, setConnectionState] = useState<RTCPeerConnectionState>('new');
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoDisabled, setIsVideoDisabled] = useState(false);

  const pcRef = useRef<RTCPeerConnection | null>(null);
  const candidateBufferRef = useRef<RTCIceCandidateInit[]>([]);
  const isRemoteDescriptionSetRef = useRef(false);

  // 1. Cleanup connection
  const cleanup = useCallback(() => {
    if (pcRef.current) {
      pcRef.current.ontrack = null;
      pcRef.current.onicecandidate = null;
      pcRef.current.onconnectionstatechange = null;
      pcRef.current.close();
      pcRef.current = null;
    }

    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
    }

    setRemoteStream(null);
    candidateBufferRef.current = [];
    isRemoteDescriptionSetRef.current = false;
    setConnectionState('new');
  }, [localStream]);

  // 2. Setup WebRTC peer connection
  useEffect(() => {
    if (!enabled || !matchId || !socket) {
      cleanup();
      return;
    }

    let isMounted = true;

    async function initMediaAndConnection() {
      try {
        setPermissionError(null);
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (!isMounted) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        setLocalStream(stream);

        const pc = new RTCPeerConnection({
          iceServers: DEFAULT_ICE_SERVERS,
        });
        pcRef.current = pc;

        // Add local tracks
        stream.getTracks().forEach((track) => {
          pc.addTrack(track, stream);
        });

        // Remote track handler
        pc.ontrack = (event) => {
          if (event.streams && event.streams[0]) {
            setRemoteStream(event.streams[0]);
          } else {
            const inboundStream = new MediaStream([event.track]);
            setRemoteStream(inboundStream);
          }
        };

        // ICE candidate handler
        pc.onicecandidate = (event) => {
          if (event.candidate && matchId && socket) {
            socket.emit('webrtc:ice', {
              matchId,
              candidate: {
                candidate: event.candidate.candidate,
                sdpMid: event.candidate.sdpMid,
                sdpMLineIndex: event.candidate.sdpMLineIndex,
                usernameFragment: event.candidate.usernameFragment,
              },
            });
          }
        };

        pc.onconnectionstatechange = () => {
          setConnectionState(pc.connectionState);
        };

        // If offerer, create offer
        if (isOfferer && socket && matchId) {
          const offer = await pc.createOffer();
          await pc.setLocalDescription(offer);

          socket.emit('webrtc:offer', {
            matchId,
            description: {
              type: 'offer',
              sdp: offer.sdp || '',
            },
          });
        }
      } catch (err: any) {
        if (!isMounted) return;
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          setPermissionError('Camera or microphone access denied. Text chat is still available.');
        } else if (err.name === 'NotFoundError') {
          setPermissionError('No camera or microphone found. Text chat is still available.');
        } else {
          setPermissionError(`Media error: ${err.message}`);
        }
      }
    }

    initMediaAndConnection();

    // Socket signaling listeners
    const handleOffer = async (data: { matchId: string; description: SdpPayload }) => {
      if (data.matchId !== matchId || !pcRef.current || !socket) return;
      try {
        await pcRef.current.setRemoteDescription(new RTCSessionDescription(data.description));
        isRemoteDescriptionSetRef.current = true;

        // Flush buffered candidates
        for (const cand of candidateBufferRef.current) {
          await pcRef.current.addIceCandidate(new RTCIceCandidate(cand));
        }
        candidateBufferRef.current = [];

        const answer = await pcRef.current.createAnswer();
        await pcRef.current.setLocalDescription(answer);

        socket.emit('webrtc:answer', {
          matchId,
          description: {
            type: 'answer',
            sdp: answer.sdp || '',
          },
        });
      } catch (err) {
        console.error('Error handling WebRTC offer:', err);
      }
    };

    const handleAnswer = async (data: { matchId: string; description: SdpPayload }) => {
      if (data.matchId !== matchId || !pcRef.current) return;
      try {
        await pcRef.current.setRemoteDescription(new RTCSessionDescription(data.description));
        isRemoteDescriptionSetRef.current = true;

        // Flush buffered candidates
        for (const cand of candidateBufferRef.current) {
          await pcRef.current.addIceCandidate(new RTCIceCandidate(cand));
        }
        candidateBufferRef.current = [];
      } catch (err) {
        console.error('Error handling WebRTC answer:', err);
      }
    };

    const handleIce = async (data: { matchId: string; candidate: IceCandidatePayload }) => {
      if (data.matchId !== matchId || !pcRef.current) return;
      try {
        const iceCandidateInit: RTCIceCandidateInit = {
          candidate: data.candidate.candidate,
          sdpMid: data.candidate.sdpMid || undefined,
          sdpMLineIndex: data.candidate.sdpMLineIndex ?? undefined,
        };

        if (isRemoteDescriptionSetRef.current) {
          await pcRef.current.addIceCandidate(new RTCIceCandidate(iceCandidateInit));
        } else {
          candidateBufferRef.current.push(iceCandidateInit);
        }
      } catch (err) {
        console.error('Error adding ICE candidate:', err);
      }
    };

    socket.on('webrtc:offer', handleOffer);
    socket.on('webrtc:answer', handleAnswer);
    socket.on('webrtc:ice', handleIce);

    return () => {
      isMounted = false;
      socket.off('webrtc:offer', handleOffer);
      socket.off('webrtc:answer', handleAnswer);
      socket.off('webrtc:ice', handleIce);
      cleanup();
    };
  }, [matchId, isOfferer, enabled, socket, cleanup]);

  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioMuted(!audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoDisabled(!videoTrack.enabled);
      }
    }
  };

  return {
    localStream,
    remoteStream,
    connectionState,
    permissionError,
    isAudioMuted,
    isVideoDisabled,
    toggleAudio,
    toggleVideo,
  };
}
