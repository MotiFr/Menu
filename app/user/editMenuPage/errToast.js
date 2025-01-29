import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';


const ErrorToast = ({ message = "Something went wrong", duration = 5000 }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);
  
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.max(prev - (100 / (duration / 100)), 0));
    }, 100);

    const hideTimeout = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(hideTimeout);
    };
  }, [duration]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-10 left-0 right-0 z-50 flex justify-center">
        <div className='bg-white p-2 text-black rounded-lg shadow-lg relative border border-black'>
          <span>{message}</span>
        </div>
        <div 
          className="absolute bottom-0 left-0 h-1 bg-white transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
  );
};

const showError = (message) => {
  const container = document.createElement('div');
  container.id = 'error-toast-container';
  document.body.appendChild(container);
  
  const root = createRoot(container);
  root.render(
    <ErrorToast message={message} />
  );

  setTimeout(() => {
    root.unmount();
    container.remove();
  }, 5000);
};

export { ErrorToast, showError };