'use client';

import { useEffect, useState, useCallback } from 'react';

const SimulatedPointer = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [lastKeyPress, setLastKeyPress] = useState(Date.now());
  const [timeoutId, setTimeoutId] = useState(null);

  const MOVE_SPEED = 10;
  const HIDE_DELAY = 2000; // 2 seconds

  const movePointer = useCallback((dx, dy) => {
    setPosition(prev => ({
      x: Math.max(0, Math.min(window.innerWidth, prev.x + dx)),
      y: Math.max(0, Math.min(window.innerHeight, prev.y + dy))
    }));
    setIsVisible(true);
    setLastKeyPress(Date.now());
  }, []);

  const handleKeyDown = useCallback((e) => {
    switch (e.key.toLowerCase()) {
      case 'w':
        movePointer(0, -MOVE_SPEED);
        break;
      case 's':
        movePointer(0, MOVE_SPEED);
        break;
      case 'a':
        movePointer(-MOVE_SPEED, 0);
        break;
      case 'd':
        movePointer(MOVE_SPEED, 0);
        break;
      case 'enter':
        if (isVisible) {
          const element = document.elementFromPoint(position.x, position.y);
          if (element) {
            element.click();
          }
        }
        break;
    }
  }, [movePointer, isVisible, position]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (['w', 'a', 's', 'd', 'enter'].includes(e.key.toLowerCase())) {
        handleKeyDown(e);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isVisible) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const newTimeoutId = setTimeout(() => {
        setIsVisible(false);
      }, HIDE_DELAY);

      setTimeoutId(newTimeoutId);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isVisible, lastKeyPress]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="w-4 h-4 bg-red-500 rounded-full shadow-lg" />
    </div>
  );
};

export default SimulatedPointer; 