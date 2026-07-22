import React from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { Sprout, Briefcase, Store, Tractor, Music, MapPin, ArrowRight } from 'lucide-react';
import { usePotentials } from '@/hooks/usePotentials';
import { useUmkm } from '@/hooks/useUmkm';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSettingsContext } from '@/contexts/SettingsContext';

export default function PotensiPage() {
  const { settings } = useSettingsContext();
  const { useFetchPotentials } = usePotentials();
  const { data: potentials = [], isLoading: isLoadingPotentials } = useFetchPotentials();
  
  const { useFetchUmkm } = useUmkm();
  const { data: umkms = [], isLoading: isLoadingUmkm } = useFetchUmkm();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <PageHero
        title="Potensi & UMKM"
        description="Mengenal ragam komoditas unggulan dan usaha kreatif warga Desa Gosono."
        icon={Sprout}
        backgroundImage={settings.bg_potensi && !settings.bg_potensi.endsWith('.mp4') ? settings.bg_potensi : undefined}
        backgroundVideoUrl={settings.bg_potensi?.endsWith('.mp4') ? settings.bg_potensi : undefined}
        illustrationUrl={settings.ill_potensi}
      />

      <div className="container mx-auto px-4 py-16 relative z-10 flex-grow max-w-6xl">
        
        {/* Potensi Desa Section */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-10 border-b border-slate-200 dark:border-slate-700 pb-4">
            <Sprout className="w-8 h-8 text-emerald-600" />
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Potensi Unggulan</h2>
          </div>
          
          {isLoadingPotentials ? (
            <div className="flex justify-center py-12">
              <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
            </div>
          ) : potentials.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {potentials.map((item, i) => (
                <Link to={`/potensi/${item.id}`} key={item.id}>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group h-full bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col"
                  >
                    <div className="h-48 overflow-hidden relative bg-slate-100 dark:bg-slate-700">
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex justify-center items-center"><Sprout className="w-12 h-12 text-slate-300" /></div>
                      )}
                      {item.category && (
                        <div className="absolute top-4 left-4 bg-sky-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                          {item.category}
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-emerald-600 transition-colors">{item.title}</h3>
                      {item.description && (
                        <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3 mb-4 flex-grow">
                          {item.description}
                        </p>
                      )}
                      <div className="mt-auto flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-bold gap-1 group-hover:gap-2 transition-all">
                        Lihat Detail <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700">
              <MapPin className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">Belum ada data potensi desa.</p>
            </div>
          )}
        </div>

        {/* UMKM Section */}
        <div>
          <div className="flex items-center gap-3 mb-10 border-b border-slate-200 dark:border-slate-700 pb-4">
            <Briefcase className="w-8 h-8 text-sky-600" />
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white">UMKM Lokal</h2>
          </div>
          
          {isLoadingUmkm ? (
            <div className="flex justify-center py-12">
              <div className="w-10 h-10 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin"></div>
            </div>
          ) : umkms.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {umkms.map((item, i) => (
                <Link to={`/umkm/${item.id}`} key={item.id}>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group h-full bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col"
                  >
                    <div className="h-48 overflow-hidden relative bg-slate-100 dark:bg-slate-700">
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex justify-center items-center"><Store className="w-12 h-12 text-slate-300" /></div>
                      )}
                      {item.product && (
                        <div className="absolute bottom-4 right-4 bg-amber-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg">
                          {item.product}
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      {item.category && (
                        <span className="text-sky-600 dark:text-sky-400 text-xs font-bold mb-2 block">{item.category}</span>
                      )}
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-sky-600 transition-colors">{item.name}</h3>
                      {item.owner && (
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Pemilik: {item.owner}</p>
                      )}
                      {item.description && (
                        <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-4 flex-grow">
                          {item.description}
                        </p>
                      )}
                      
                      <div className="mt-auto flex items-center justify-between">
                        <span className="flex items-center text-sky-600 dark:text-sky-400 text-sm font-bold gap-1 group-hover:gap-2 transition-all">
                          Lihat Detail <ArrowRight className="w-4 h-4" />
                        </span>
                        
                        {item.phone && (
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              window.open(`https://wa.me/${item.phone?.replace(/[^0-9]/g, '')}`, '_blank');
                            }}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                          >
                            Hubungi
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700">
              <Store className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">Belum ada data UMKM.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
