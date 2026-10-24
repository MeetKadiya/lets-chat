import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { LetsChatNav } from '../components/letschat/LetsChatNav';
import { LetsChatInfoPanel } from '../components/letschat/LetsChatInfoPanel';
import { LetsChatStartCard } from '../components/letschat/LetsChatStartCard';
import { LetsChatCallControls } from '../components/letschat/LetsChatCallControls';
import { Screen1Home } from '../components/letschat/screens/Screen1Home';
import { Screen3Profile } from '../components/letschat/screens/Screen3Profile';
import { Screen4Pricing } from '../components/letschat/screens/Screen4Pricing';
import { Screen5Interests } from '../components/letschat/screens/Screen5Interests';

describe("Let's Chat Exact Reference-Matched UI Components", () => {
  it('renders LetsChatNav with brand logo and profile menu', () => {
    render(<LetsChatNav username="Player123" />);

    expect(screen.getAllByText("Let's Chat").length).toBeGreaterThan(0);
    expect(screen.getByText('Chat')).toBeDefined();
    expect(screen.getByText('About')).toBeDefined();
    expect(screen.getByText('Safety')).toBeDefined();
    expect(screen.getByText('Player123')).toBeDefined();
  });

  it('renders LetsChatInfoPanel with header and three value propositions', () => {
    render(<LetsChatInfoPanel />);

    expect(screen.getByText('Random video chat with new people')).toBeDefined();
    expect(screen.getByText('Meet new people')).toBeDefined();
    expect(screen.getByText('Be kind & respectful')).toBeDefined();
    expect(screen.getByText('Your safety matters')).toBeDefined();
  });

  it('renders LetsChatStartCard and triggers onStart when clicked', () => {
    const handleStart = vi.fn();
    render(<LetsChatStartCard onStart={handleStart} />);

    expect(screen.getByText('Ready to make a new connection?')).toBeDefined();
    const startBtn = screen.getByText('Start chatting');
    expect(startBtn).toBeDefined();

    fireEvent.click(startBtn);
    expect(handleStart).toHaveBeenCalled();
  });

  it('renders LetsChatCallControls with Next, Mute, End buttons', () => {
    const handleNext = vi.fn();
    const handleMute = vi.fn();
    const handleEnd = vi.fn();

    render(
      <LetsChatCallControls
        onNext={handleNext}
        onToggleMute={handleMute}
        onEndCall={handleEnd}
      />
    );

    expect(screen.getByText('Next')).toBeDefined();
    expect(screen.getByText('Mute')).toBeDefined();
    expect(screen.getByText('End')).toBeDefined();
  });

  it('renders Screen 1 Home Landing hero and feature pills', () => {
    const handleStart = vi.fn();
    render(<Screen1Home onStartChatting={handleStart} />);

    expect(screen.getByText("Meet new people. Have fun conversations.")).toBeDefined();
    expect(screen.getByText('Start Chatting')).toBeDefined();
  });

  it('renders Screen 4 Pricing with Free and Plus plans', () => {
    render(<Screen4Pricing />);

    expect(screen.getByText('Choose Your Plan')).toBeDefined();
    expect(screen.getByText('$0')).toBeDefined();
    expect(screen.getByText('$4.99')).toBeDefined();
    expect(screen.getByText('Subscribe Now')).toBeDefined();
  });
});
