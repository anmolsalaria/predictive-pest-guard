'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isProUser } from '@/lib/pro-subscription';

interface ProFeatureGuardProps {
  children: React.ReactNode;
}

export default function ProFeatureGuard({ children }: ProFeatureGuardProps) {
  const [isPro, setIsPro] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkProStatus = async () => {
      const hasProAccess = await isProUser();
      setIsPro(hasProAccess);
      
      if (!hasProAccess) {
        router.push('/pestguard-pro');
      }
    };

    checkProStatus();
  }, [router]);

  if (isPro === null) {
    return null; // Loading state
  }

  if (!isPro) {
    return null; // Will be redirected
  }

  return <>{children}</>;
} 