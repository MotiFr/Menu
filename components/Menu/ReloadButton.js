'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { buttonClasses } from '@/components/Menu/Themes';

export default function ErrorRetryButton({ restname, isRTL, revalidateAction, theme = 'default' }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const themeButtonClass = buttonClasses[theme] || buttonClasses.default;
  
  const handleRetry = async () => {
    try {
      setIsLoading(true);
      
      await revalidateAction(restname);
      
      router.refresh();
    } catch (error) {
      console.error('Error during retry:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <button 
      onClick={handleRetry}
      disabled={isLoading}
      className={`mt-4 px-4 py-2 rounded transition-colors text-white ${
        isLoading 
          ? 'bg-gray-400 cursor-not-allowed' 
          : themeButtonClass
      }`}
    >
      {isLoading 
        ? (isRTL ? 'טוען...' : 'Loading...') 
        : (isRTL ? 'נסה שוב' : 'Try Again')}
    </button>
  );
}