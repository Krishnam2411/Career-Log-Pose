'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ComponentType, useEffect } from 'react';

export default function withAuth<T extends {}>(Component: ComponentType<T>) {
  return function AuthenticatedComponent(props: T) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !user) {
        router.replace('/login');
      }
    }, [isLoading, user, router]);

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <span className="inline-block w-8 h-8 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
        </div>
      );
    }

    if (!user) {
      return null;
    }

    return <Component {...props} />;
  };
}