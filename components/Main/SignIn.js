"use client"
import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Eye, EyeOff, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignIn() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sessionCookie, setSessionCookie] = useState(false);

  const router = useRouter();

  useEffect(() => {
    async function verifySession() {
      try {
        const response = await fetch('/api/verifySession');
        await response.json();
        if (response.status === 200) {
          setSessionCookie(true);
        }

      } catch {

      } finally {
        setIsLoading(false);
      }
    }
    verifySession();

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/signIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData,
        }),
      });

      const responseData = await response.json();

      if (response.status === 400) {
        setError(responseData.message);
      }
      else if (response.status === 500) {
        setError(responseData.message);
      }
      else {
        router.push('/user/welcomePage');
      }


    } catch (error) {
      setError('Failed to login');
    }
    finally {
      setIsLoading(false);
    }

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <>
      {sessionCookie ? (<button
              onClick={() => router.push('/user/welcomePage')}
              className={`border shadow-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
              Login
            </button>) :
        <Dialog>
          <DialogTrigger asChild>
            <button
              onClick={sessionCookie ? () => router.push('/user/welcomePage') : null}
              className={`border shadow-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
              Login
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">Login</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  Username / Email
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="pr-10"
                    placeholder="Enter your password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="text-right">
                <Link
                  href="/reset-password"
                  className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              
              <div>
                {error && (
                  <p className="text-red-500 text-sm font-medium">{error}</p>
                )}
              </div>

              <Button
                type="submit"
                className={`w-full text-white font-medium py-2.5 ${isLoading ? 'cursor-not-allowed bg-primary-light dark:bg-primary-light hover:bg-primary-light' : 'cursor-pointer  bg-primary dark:bg-primary-dark hover:bg-primary/90 dark:hover:bg-primary-dark/90'}`}
              >
                Login
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      }
    </>
  );
};