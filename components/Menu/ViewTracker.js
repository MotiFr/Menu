'use client';

import { useEffect } from 'react';

export default function ViewTracker({ restname }) {

  useEffect(() => {
    const trackPageView = async () => {
      try {
        await fetch('/api/trackView', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ restname }),
        });
      } catch (error) {
        console.error('Error tracking view:', error);
      }
    };

    trackPageView();
  }, [restname]);

  return null; 
}