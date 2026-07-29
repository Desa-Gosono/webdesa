import React from 'react';
import { HomeHero } from '@/features/home/components/HomeHero';
import { MayorWelcome } from '@/features/home/components/MayorWelcome';
import { VillageStats } from '@/features/home/components/VillageStats';
import { FeaturedPrograms } from '@/features/home/components/FeaturedPrograms';
import { LatestNews } from '@/features/home/components/LatestNews';
import { LatestAgenda } from '@/features/home/components/LatestAgenda';
import { CallToAction } from '@/features/home/components/CallToAction';
import { VillageGISMap } from '@/features/home/components/VillageGISMap';
import { SEO } from '@/components/ui/SEO';

// Reusable section wrapper without card styling
const SectionWrapper = ({ children }: { children: React.ReactNode }) => (
  <section className="py-8 relative z-10 w-full">
    <div className="container mx-auto px-4 max-w-7xl">
      {children}
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
        <SectionWrapper>
          <MayorWelcome />
        </SectionWrapper>
        
        <section className="relative z-10 w-full">
          <div className="container mx-auto px-4 max-w-7xl">
            <VillageStats variant="card" />
          </div>
        </section>
        
        {/* VillageGISMap has its own wrapper built-in for custom layout */}
        <VillageGISMap />
        
        <SectionWrapper>
          {/* We will rename FeaturedPrograms to Potensi & UMKM later */}
          <FeaturedPrograms />
        </SectionWrapper>
        
        <SectionWrapper>
          <LatestNews />
        </SectionWrapper>
        
        <SectionWrapper>
          <LatestAgenda />
        </SectionWrapper>
      </div>
      
      <CallToAction />
    </div>
  );
}
