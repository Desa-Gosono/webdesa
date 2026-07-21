import React from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { Leaf } from 'lucide-react';

export default function GaleriPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHero 
        title="Galeri" 
        description="Jelajahi informasi lengkap mengenai galeri di Desa Gosono."
        icon={Leaf}
      />
      <div className="container mx-auto px-4 py-12 relative z-10 flex-grow">
        {/* TODO: Implement Galeri content here */}
        <div className="h-96 rounded-2xl border border-gray-200 bg-white/80 p-8 shadow-sm backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
          <h2 className="font-display text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Konten Galeri</h2>
          <p className="text-gray-500 dark:text-gray-400">Konten sedang dalam tahap pengembangan sesuai dengan Design System Modern Formal.</p>
        </div>
      </div>
    </div>
  );
}
