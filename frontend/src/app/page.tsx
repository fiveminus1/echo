'use client';

import { Card, CardContent  } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SpotifyIcon } from '@/components/icons/spotify-icon';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const handleLogin = () => {
    window.location.href= 'http://localhost:3000/auth/login'; //todo: make sure this link is right
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-y-6 bg-gradient-to-br from-black via-gray-900 to-gray-800 px-6 text-white">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-emerald-400">Welcome to Echo</h1>
        <p className="text-gray-300 text-lg">Blah blah blah....</p>
      </div>

      <Button 
        onClick={handleLogin}
        className="flex w-56 h-12 text-lg bg-green-500 hover:bg-green-600 transition-colors duration-200 font-semibold"
      >
        <SpotifyIcon className="!w-6 !h-6" />
        Login with Spotify
      </Button>

    </main>
  );
}
