'use client';

import { useLanguage } from '@/lib/context/LanguageContext';
import { useEffect } from 'react';

export function MetadataProvider() {
  const { t } = useLanguage();

  useEffect(() => {
    // Update document title
    document.title = t('website.title');
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('website.description'));
    }
  }, [t]);

  return null;
} 