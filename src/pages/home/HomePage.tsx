import React from 'react';
import { HomeHero } from '@/features/home/components/HomeHero';
import { MayorWelcome } from '@/features/home/components/MayorWelcome';
import { VillageStats } from '@/features/home/components/VillageStats';
import { FeaturedPrograms } from '@/features/home/components/FeaturedPrograms';
import { LatestNews } from '@/features/home/components/LatestNews';
import { CallToAction } from '@/features/home/components/CallToAction';
import { SEO } from '@/components/ui/SEO';

export default function HomePage() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <SEO 
        title="Beranda" 
        description="Selamat datang di Website Resmi Desa Gosono, Kecamatan Wonosegoro, Kabupaten Boyolali. Temukan berbagai informasi menarik mengenai potensi alam, UMKM, dan kegiatan masyarakat kami."
      />
      <HomeHero />
      <MayorWelcome />
      <VillageStats />
      {/* We will rename FeaturedPrograms to Potensi & UMKM later */}
      <FeaturedPrograms />
      <LatestNews />
      <CallToAction />
    </div>
  );
}
