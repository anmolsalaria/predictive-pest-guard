'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, sendEmailVerification, onAuthStateChanged, reload } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { toast } from 'react-hot-toast';
import { useLanguage } from '@/lib/context/LanguageContext';
import { useTranslations } from '@/lib/translations';

export default function VerifyEmailPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const { language } = useLanguage();
  const t = useTranslations(language);

  useEffect(() => {
    const checkVerificationStatus = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          // Reload user data to get latest verification status
          await reload(user);
          
          if (user.emailVerified) {
            toast.success(t.auth.emailVerified, {
              duration: 3000,
              position: 'top-center',
              style: {
                background: '#4CAF50',
                color: '#fff',
              },
            });
            // Sign out the user and redirect to login with verification success
            await auth.signOut();
            router.push('/auth?verified=true');
          }
        } catch (error) {
          console.error('Error checking verification status:', error);
        }
      }
    };

    // Check verification status every 5 seconds
    const interval = setInterval(checkVerificationStatus, 5000);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/auth');
        return;
      }

      // Check email verification status
      if (user.emailVerified) {
        // Sign out the user and redirect to login
        auth.signOut().then(() => {
          router.push('/auth');
        });
      }
    });

    // Cleanup
    return () => {
      clearInterval(interval);
      unsubscribe();
    };
  }, [router, t]);

  const handleResendVerification = async () => {
    try {
      setIsLoading(true);
      setError('');
      setSuccess('');

      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        router.push('/auth');
        return;
      }

      await sendEmailVerification(user);
      toast.success(t.auth.verificationEmailSent, {
        duration: 5000,
        position: 'top-center',
        style: {
          background: '#4CAF50',
          color: '#fff',
        },
      });
    } catch (error) {
      toast.error(t.auth.verificationEmailError, {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#f44336',
          color: '#fff',
        },
      });
      console.error('Error sending verification email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {t.auth.verifyEmailTitle}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {t.auth.verifyEmailMessage}
          </p>
          <p className="mt-2 text-center text-sm text-gray-500">
            {t.auth.verifyEmailNote}
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <button
            onClick={handleResendVerification}
            disabled={isLoading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isLoading ? t.common.processing : t.auth.resendVerification}
          </button>

          <button
            onClick={() => router.push('/auth')}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {t.common.back}
          </button>
        </div>
      </div>
    </div>
  );
}