import React from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { Building2, Map, BookOpen } from 'lucide-react';
import { useJsonData } from '@/hooks/useJsonData';

export default function ProfilPage() {
  const { data: profile } = useJsonData<any>('profile.json');
  const { data: history } = useJsonData<any>('history.json');

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero 
        title="Profil Desa" 
        description="Mengenal lebih dekat sejarah, visi misi, dan kondisi geografis desa kami."
        icon={Building2}
      />
      <div className="container mx-auto px-4 py-12 relative z-10 flex-grow max-w-4xl">
        <div className="space-y-8">
          
          <div className="rounded-2xl border border-gray-200 bg-white/80 p-8 shadow-sm backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
            <h2 className="font-display text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
              <BookOpen className="text-primary-600" /> Sejarah Desa
            </h2>
            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
              <p>{history?.sejarah || 'Memuat informasi sejarah...'}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white/80 p-8 shadow-sm backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
            <h2 className="font-display text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
              <Building2 className="text-primary-600" /> Visi & Misi
            </h2>
            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
              <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">Visi</h3>
              <p className="italic font-medium text-primary-700 dark:text-primary-400">"{history?.visi}"</p>
              
              <h3 className="font-bold text-lg mt-6 text-gray-800 dark:text-gray-200">Misi</h3>
              <ul className="list-disc pl-5 space-y-2">
                {history?.misi?.map((m: string, i: number) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white/80 p-8 shadow-sm backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
            <h2 className="font-display text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-3">
              <Map className="text-primary-600" /> Kondisi Geografis
            </h2>
            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
              <p>{history?.geografi}</p>
              <h4 className="font-bold mt-4">Batas Wilayah:</h4>
              <ul className="list-disc pl-5">
                <li>Utara: {history?.batas?.utara}</li>
                <li>Selatan: {history?.batas?.selatan}</li>
                <li>Timur: {history?.batas?.timur}</li>
                <li>Barat: {history?.batas?.barat}</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
