import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { InterestPicker } from '../components/landing/InterestPicker';
import { MessageInput } from '../components/chat/MessageInput';

describe('Web UI Components (Let\'s Chat)', () => {
  it('renders HeroSection with mode options and start button', () => {
    const handleSelectMode = vi.fn();
    const handleStart = vi.fn();

    render(
      <HeroSection
        selectedMode="text"
        onSelectMode={handleSelectMode}
        onStart={handleStart}
        isConnecting={false}
      />
    );

    expect(screen.getByText('Start Chatting Now')).toBeDefined();
    expect(screen.getByText('Text Chat')).toBeDefined();
    expect(screen.getByText('Video Chat')).toBeDefined();
  });

  it('allows selecting and toggling interest tags in InterestPicker', () => {
    const handleChange = vi.fn();

    render(
      <InterestPicker
        selectedInterests={['gaming']}
        onChange={handleChange}
      />
    );

    const musicButton = screen.getByText('music');
    expect(musicButton).toBeDefined();
    fireEvent.click(musicButton);

    expect(handleChange).toHaveBeenCalledWith(['gaming', 'music']);
  });

  it('renders MessageInput with character limit and handles submission', () => {
    const handleSend = vi.fn();

    render(
      <MessageInput
        onSendMessage={handleSend}
        disabled={false}
      />
    );

    const input = screen.getByPlaceholderText('Type a message (Enter to send)...');
    expect(input).toBeDefined();

    fireEvent.change(input, { target: { value: 'Hello stranger!' } });
    expect(screen.getByText('15/2000')).toBeDefined();

    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(handleSend).toHaveBeenCalledWith('Hello stranger!');
  });
});
