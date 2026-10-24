'use client';

import React, { useState, useEffect } from 'react';
import { useSocket } from '../../hooks/useSocket';
import { useChatSession } from '../../hooks/useChatSession';
import { useWebRTC } from '../../hooks/useWebRTC';
import { ChatControls } from './ChatControls';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { VideoContainer } from '../video/VideoContainer';
import { ReportModal } from '../moderation/ReportModal';
import { BlockConfirmationModal } from '../moderation/BlockConfirmationModal';
import { ReportCategory } from '@strangerconnect/shared';

export function ChatContainer() {
  const { socket, isConnected, sessionId } = useSocket();
  const {
    sessionState,
    activeMatchId,
    chatMode,
    sharedInterests,
    isOfferer,
    messages,
    startChat,
    nextStranger,
    disconnectChat,
    sendMessage,
  } = useChatSession(socket, sessionId);

  const isVideoEnabled = (chatMode === 'video' || chatMode === 'both') && sessionState === 'CHATTING';

  const {
    localStream,
    remoteStream,
    permissionError,
    isAudioMuted,
    isVideoDisabled,
    toggleAudio,
    toggleVideo,
  } = useWebRTC({
    socket,
    matchId: activeMatchId,
    isOfferer,
    enabled: isVideoEnabled,
  });

  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isBlockOpen, setIsBlockOpen] = useState(false);

  // Keyboard shortcut: Escape = Next
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        nextStranger();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextStranger]);

  const handleReport = (category: ReportCategory, details: string) => {
    if (socket && activeMatchId) {
      socket.emit('moderation:report', {
        matchId: activeMatchId,
        category,
        details,
      });
    }
  };

  const handleBlock = () => {
    if (socket && activeMatchId) {
      socket.emit('moderation:block', { matchId: activeMatchId });
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] max-w-7xl mx-auto w-full bg-surface-300 rounded-none sm:rounded-2xl border-0 sm:border border-slate-800 shadow-2xl overflow-hidden">
      {/* Top Controls Bar */}
      <ChatControls
        sessionState={sessionState}
        onNext={nextStranger}
        onDisconnect={disconnectChat}
        onReport={() => setIsReportOpen(true)}
        onBlock={() => setIsBlockOpen(true)}
      />

      {/* Main Chat/Video Area */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Video Area (if video or both mode) */}
        {(chatMode === 'video' || chatMode === 'both') && (
          <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-slate-800 bg-black/40 flex flex-col justify-center">
            <VideoContainer
              localStream={localStream}
              remoteStream={remoteStream}
              permissionError={permissionError}
              isAudioMuted={isAudioMuted}
              isVideoDisabled={isVideoDisabled}
              onToggleAudio={toggleAudio}
              onToggleVideo={toggleVideo}
            />
          </div>
        )}

        {/* Text Area */}
        <div className="flex flex-col flex-1 bg-surface-200/50">
          <MessageList messages={messages} sessionState={sessionState} />
          <MessageInput
            onSendMessage={sendMessage}
            disabled={sessionState !== 'CHATTING'}
          />
        </div>
      </div>

      {/* Modals */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        onSubmit={handleReport}
      />
      <BlockConfirmationModal
        isOpen={isBlockOpen}
        onClose={() => setIsBlockOpen(false)}
        onConfirm={handleBlock}
      />
    </div>
  );
}
