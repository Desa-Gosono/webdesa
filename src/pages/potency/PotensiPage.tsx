import React from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { Sprout, Briefcase } from 'lucide-react';
import { useJsonData } from '@/hooks/useJsonData';

export default function PotensiPage() {
  const { data: potensi } = useJsonData<any>('umkm.json');

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Potensi Desa & UMKM"
        description="Mengenal ragam komoditas lokal dan produk usaha mikro menengah karya warga Desa Gosono."
        icon={Sprout}
      />

      <div className="container mx-auto px-4 py-12 relative z-10 flex-grow max-w-6xl">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Sprout className="w-8 h-8 text-primary-600" />
            <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white">Pertanian & Peternakan</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {potensi?.pertanian?.map((item: any, i: number) => (
              <div key={i} className="group rounded-2xl overflow-hidden bg-white dark:bg-gray-950 shadow-md border border-gray-100 dark:border-gray-800 transition-all hover:shadow-xl">
                <div className="h-48 overflow-hidden">
                  <img src={item.foto} alt={item.nama} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{item.nama}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{item.deskripsi}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="w-8 h-8 text-primary-600" />
            <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white">UMKM Lokal</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {potensi?.umkm?.map((item: any, i: number) => (
              <div key={i} className="group rounded-2xl overflow-hidden bg-white dark:bg-gray-950 shadow-md border border-gray-100 dark:border-gray-800 transition-all hover:shadow-xl">
                <div className="h-48 overflow-hidden relative">
                  <img src={item.foto} alt={item.nama} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute top-3 right-3 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {item.produk}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{item.nama}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{item.deskripsi}</p>
                  <a href={`https://wa.me/${item.kontak.replace(/^0/, '62')}`} target="_blank" rel="noopener noreferrer" className="inline-block w-full text-center py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors">
                    Hubungi via WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
