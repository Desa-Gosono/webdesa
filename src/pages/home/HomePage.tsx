import React from 'react';
import { HomeHero } from '@/features/home/components/HomeHero';
import { MayorWelcome } from '@/features/home/components/MayorWelcome';
import { VillageStats } from '@/features/home/components/VillageStats';
import { FeaturedPrograms } from '@/features/home/components/FeaturedPrograms';
import { LatestNews } from '@/features/home/components/LatestNews';
import { CallToAction } from '@/features/home/components/CallToAction';
import { VillageGISMap } from '@/features/home/components/VillageGISMap';
import { SEO } from '@/components/ui/SEO';

// Reusable anti-gravity wrapper
const AntiGravityWrapper = ({ children }: { children: React.ReactNode }) => (
  <section className="py-8 relative z-10 w-full">
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="bg-white/40 dark:bg-gray-900/50 backdrop-blur-xl rounded-[2rem] shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-white/60 dark:border-gray-700/50 p-6 md:p-8 hover:-translate-y-1 transition-transform duration-500">
        {children}
      </div>
    </div>
  </section>
);

export default function HomePage() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <SEO 
        title="Beranda" 
        description="Selamat datang di Website Resmi Desa Gosono, Kecamatan Wonosegoro, Kabupaten Boyolali. Temukan berbagai informasi menarik mengenai potensi alam, UMKM, dan kegiatan masyarakat kami."
      />
      
      {/* HomeHero uses dynamic settings now */}
      <HomeHero />
      
      <div className="flex flex-col gap-8 pb-16 pt-8">
        <AntiGravityWrapper>
          <MayorWelcome />
        </AntiGravityWrapper>
        
        <section className="relative z-10 w-full">
          <div className="container mx-auto px-4 max-w-7xl">
            <VillageStats variant="card" />
          </div>
        </section>
        
        {/* VillageGISMap has its own wrapper built-in for custom layout */}
        <VillageGISMap />
        
        <AntiGravityWrapper>
          {/* We will rename FeaturedPrograms to Potensi & UMKM later */}
          <FeaturedPrograms />
        </AntiGravityWrapper>
        
        <AntiGravityWrapper>
          <LatestNews />
        </AntiGravityWrapper>
      </div>
      
      <CallToAction />
    </div>
  );
}
