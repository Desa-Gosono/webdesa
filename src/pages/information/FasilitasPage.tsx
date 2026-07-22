import React from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { Building2, MapPin } from 'lucide-react';
import { useFacilities } from '@/hooks/useFacilities';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function FasilitasPage() {
  const { useFetchFacilities } = useFacilities();
  const { data: facilities = [], isLoading } = useFetchFacilities();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <PageHero 
        title="Fasilitas Umum" 
        description="Daftar fasilitas umum dan layanan yang tersedia di Desa Gosono."
        icon={Building2}
      />
      
      <div className="container mx-auto px-4 py-16 relative z-10 flex-grow max-w-7xl">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin"></div>
          </div>
        ) : facilities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((item, i) => (
              <Link to={`/fasilitas/${item.id}`} key={item.id} className="block group">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 h-full flex flex-col group-hover:shadow-xl transition-all"
                >
                  <div className="h-48 relative overflow-hidden bg-slate-100 dark:bg-slate-700">
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.name || ''} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Building2 className="w-12 h-12 text-slate-300 dark:text-slate-500" />
                      </div>
                    )}
                    {item.category && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider shadow-sm">
                          {item.category}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-sky-600 transition-colors">
                      {item.name}
                    </h3>
                    
                    {item.address && (
                      <div className="flex items-start gap-2 text-sm text-slate-500 dark:text-slate-400 mt-auto">
                        <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <p className="line-clamp-2">{item.address}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700">
            <Building2 className="w-20 h-20 text-slate-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Belum ada fasilitas</h3>
            <p className="text-slate-500 max-w-md mx-auto">Data fasilitas umum saat ini sedang dalam proses pembaruan.</p>
          </div>
        )}
      </div>
    </div>
  );
}
