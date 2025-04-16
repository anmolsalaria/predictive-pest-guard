'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { checkProAccess } from '@/lib/pro-subscription';

interface ProUserRedirectProps {
  children: React.ReactNode;
}

export default function ProUserRedirect({ children }: ProUserRedirectProps) {
  const [isPro, setIsPro] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkProStatus = async () => {
      const hasProAccess = await checkProAccess();
      setIsPro(hasProAccess);
      
      if (hasProAccess) {
        router.push('/pestguard-pro/features');
      }
    };

    checkProStatus();
  }, [router]);

  if (isPro === null) {
    return null; // Loading state
  }

  if (isPro) {
    return null; // Will be redirected
  }

  return <>{children}</>;
} 