import React from 'react';
import { Pause, Play } from 'lucide-react';

interface TimerProps {
  timeRemaining: number;
  isPaused: boolean;
  onTogglePause: () => void;
}

export const Timer: React.FC<TimerProps> = ({ timeRemaining, isPaused, onTogglePause }) => {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="flex items-center gap-2">
      <div className="text-2xl font-mono">
        <div className="bg-gray-800 text-white px-4 py-2 rounded-lg">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </div>
      <button
        onClick={onTogglePause}
        className="p-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
        aria-label={isPaused ? 'Resume timer' : 'Pause timer'}
      >
        {isPaused ? (
          <Play className="w-5 h-5" />
        ) : (
          <Pause className="w-5 h-5" />
        )}
      </button>
    </div>
  );
};