import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSettingsContext } from '@/contexts/SettingsContext';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
}

export function SEO({ title, description, image, type = 'website' }: SEOProps) {
  const { settings } = useSettingsContext();

  const siteName = settings.website_name || 'Desa Gosono';
  const defaultDesc = settings.seo_description || 'Website resmi Pemerintah Desa Gosono.';

  const pageTitle = title ? `${title} | ${siteName}` : (settings.seo_title || siteName);
  const pageDesc = description || defaultDesc;
  const pageImage = image || settings.website_logo || '/logo.png';
  const keywords = settings.seo_keywords || 'desa, gosono, website desa';

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />
      <meta name="keywords" content={keywords} />

      {/* OpenGraph tags for social media sharing */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDesc} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDesc} />
      <meta name="twitter:image" content={pageImage} />
    </Helmet>
  );
}
