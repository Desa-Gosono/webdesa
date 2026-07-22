import React from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { Users, User, ArrowRight } from 'lucide-react';
import { useOfficials } from '@/hooks/useOfficials';
import { motion } from 'framer-motion';

export default function PemerintahanPage() {
  const { useFetchOfficials } = useOfficials();
  const { data: officials = [], isLoading } = useFetchOfficials();

  // Sort by order_number
  const sortedOfficials = [...officials].sort((a, b) => a.order_number - b.order_number);

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900 min-h-screen">
      <PageHero 
        title="Pemerintahan Desa" 
        description="Struktur organisasi dan aparatur Pemerintah Desa Gosono."
        icon={Users}
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
              Aparatur Desa
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Mengenal lebih dekat para pelayan masyarakat yang berdedikasi membangun Desa Gosono.
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
            </div>
          ) : sortedOfficials.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedOfficials.map((person, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  key={person.id} 
                  className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 text-center flex flex-col items-center group hover:shadow-xl transition-all"
                >
                  <div className="w-32 h-32 mx-auto bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-6 overflow-hidden border-4 border-emerald-50 dark:border-slate-600 transition-transform group-hover:scale-105">
                    {person.photo_url ? (
                      <img src={person.photo_url} alt={person.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-slate-300 dark:text-slate-500" />
                    )}
                  </div>
                  <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-2">{person.name}</h3>
                  <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full text-xs font-bold mb-4">
                    {person.position}
                  </span>
                  {person.description && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mt-auto">
                      {person.description}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700">
              <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">Belum ada data aparatur desa.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
