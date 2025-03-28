'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface AuthCheckProps {
  children: React.ReactNode;
}

export default function AuthCheck({ children }: AuthCheckProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setIsLoading(false);
      if (!user) {
        setShowDialog(true);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    router.push('/auth');
    setShowDialog(false);
  };

  // Show nothing while checking authentication status
  if (isLoading) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
              <h2 className="text-xl font-semibold mb-4">Authentication Required</h2>
              <p className="text-gray-600 mb-6">
                Please sign in to access this page.
              </p>
              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => router.push('/')}>
                  Go Back
                </Button>
                <Button onClick={handleLogin}>
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </Dialog>
      </>
    );
  }

  return <>{children}</>;
}
