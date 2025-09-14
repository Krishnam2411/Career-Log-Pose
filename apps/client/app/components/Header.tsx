'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full px-4 py-4 md:px-8">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 z-50 relative">
          <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-gray-900">✦</span>
          </div>
          <span className="text-base md:text-lg font-semibold text-white">
            Career Log Pose
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link 
            href="/login" 
            className="px-4 py-2 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 rounded transition-colors"
          >
            Login
          </Link>
        </div>

        {/* No hamburger or mobile menu */}
      </nav>
    </header>
  );
}