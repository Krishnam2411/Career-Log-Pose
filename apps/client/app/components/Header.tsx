'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { usePathname } from 'next/navigation';

export default function Header() {
  const { user } = useAuth();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

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
          {user ? (
            pathname === '/' ? (
              <Link
                href="/dashboard"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors shadow"
              >
                Dashboard
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors shadow"
              >
                Logout
              </button>
            )
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 border border-white text-white hover:bg-white hover:text-gray-900 rounded-full transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}