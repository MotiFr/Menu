'use client';

import ResetPasswordForm from '@/components/Main/ResetPasswordForm';
import { useState, useEffect } from 'react';

export default function ResetPasswordPageClient({ token }) {
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await fetch('/api/reset-password/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok && data.valid) {
          setIsValid(true);
        } else {
          setMessage('This reset link is invalid or has expired.');
        }
      } catch (error) {
        setMessage('Failed to validate reset link.');
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [token]);

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Set New Password</h1>
        
        {isValidating ? (
          <div className="text-center py-4">
            <p>Validating your reset link...</p>
          </div>
        ) : isValid ? (
          <ResetPasswordForm token={token} />
        ) : (
          <div className="text-center py-4">
            <p className="text-red-500">{message}</p>
            <p className="mt-4">
              <a href="/reset-password" className="text-blue-500 hover:underline">
                Request a new reset link
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}