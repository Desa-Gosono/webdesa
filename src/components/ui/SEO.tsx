import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useJsonData } from '@/hooks/useJsonData';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: string;
}

export function SEO({ title, description, image, type = 'website' }: SEOProps) {
  const { data: desaData } = useJsonData<any>('profile.json');

  const siteName = desaData ? `Desa ${desaData.nama}` : 'Desa Gosono';
  const defaultDesc = desaData ? `Website resmi Pemerintah Desa ${desaData.nama}, ${desaData.kecamatan}, ${desaData.kabupaten}.` : 'Company Profile Desa Gosono.';

  const pageTitle = title ? `${title} | ${siteName}` : siteName;
  const pageDesc = description || defaultDesc;
  const pageImage = image || '/logo.png';

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    "name": siteName,
    "description": pageDesc,
    "image": pageImage,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": desaData?.telepon,
      "contactType": "customer service"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": desaData?.kecamatan,
      "addressRegion": desaData?.provinsi,
      "streetAddress": desaData?.alamat
    }
  };

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDesc} />

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
