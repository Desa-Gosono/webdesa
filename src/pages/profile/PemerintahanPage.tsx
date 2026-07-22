import React from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { Users, User, ArrowRight } from 'lucide-react';
import { useOfficials } from '@/hooks/useOfficials';
import { motion } from 'framer-motion';
import { useSettingsContext } from '@/contexts/SettingsContext';

export default function PemerintahanPage() {
  const { settings } = useSettingsContext();
  const { useFetchOfficials } = useOfficials();
  const { data: officials = [], isLoading } = useFetchOfficials();

  // Sort by order_number
  const sortedOfficials = [...officials].sort((a, b) => a.order_number - b.order_number);

  const kepalaDesa = sortedOfficials.filter(p => p.position.toLowerCase().includes('kepala desa'));
  const sekretaris = sortedOfficials.filter(p => p.position.toLowerCase().includes('sekretaris'));
  const others = sortedOfficials.filter(p => !p.position.toLowerCase().includes('kepala desa') && !p.position.toLowerCase().includes('sekretaris'));

  const OfficialCard = ({ person }: { person: any }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/20 dark:border-slate-700 text-center flex flex-col items-center group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 w-full"
    >
      <div className="w-32 h-32 mx-auto bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-6 overflow-hidden border-4 border-emerald-50 dark:border-slate-600 transition-transform duration-300 group-hover:scale-105 shadow-md">
        {person.photo_url ? (
          <img src={person.photo_url} alt={person.name} className="w-full h-full object-cover" />
        ) : (
          <User className="w-12 h-12 text-slate-300 dark:text-slate-500" />
        )}
      </div>
      <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-2">{person.name}</h3>
      <span className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400 rounded-full text-xs font-bold mb-4 shadow-sm">
        {person.position}
      </span>
      {person.description && (
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mt-auto">
          {person.description}
        </p>
      )}
    </motion.div>
  );

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900 min-h-screen">
      <PageHero 
        title="Pemerintahan Desa" 
        description="Struktur organisasi dan aparatur Pemerintah Desa Gosono."
        icon={Users}
        backgroundImage={settings.bg_pemerintahan && !settings.bg_pemerintahan.endsWith('.mp4') ? settings.bg_pemerintahan : undefined}
        backgroundVideoUrl={settings.bg_pemerintahan?.endsWith('.mp4') ? settings.bg_pemerintahan : undefined}
        illustrationUrl={settings.ill_pemerintahan}
      />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
              Aparatur Desa
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Mengenal lebih dekat struktur organisasi dan para pelayan masyarakat yang berdedikasi membangun Desa Gosono.
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
            </div>
          ) : sortedOfficials.length > 0 ? (
            <div className="flex flex-col items-center w-full">
              
              {/* Tier 1: Kepala Desa */}
              {kepalaDesa.length > 0 && (
                <div className="w-full flex flex-col items-center">
                  <div className="w-full max-w-sm">
                    {kepalaDesa.map(person => <OfficialCard key={person.id} person={person} />)}
                  </div>
                  {/* Vertical Line Down */}
                  {(sekretaris.length > 0 || others.length > 0) && (
                    <div className="w-1 h-12 bg-slate-300 dark:bg-slate-600 rounded-full my-2"></div>
                  )}
                </div>
              )}

              {/* Tier 2: Sekretaris Desa */}
              {sekretaris.length > 0 && (
                <div className="w-full flex flex-col items-center">
                  <div className="w-full max-w-sm">
                    {sekretaris.map(person => <OfficialCard key={person.id} person={person} />)}
                  </div>
                  {/* Vertical Line Down */}
                  {others.length > 0 && (
                    <div className="w-1 h-12 bg-slate-300 dark:bg-slate-600 rounded-full my-2"></div>
                  )}
                </div>
              )}

              {/* Tier 3: Others (Kasi, Kaur, Kadus) */}
              {others.length > 0 && (
                <div className="w-full relative mt-4">
                  {/* Connecting Horizontal Branch for Grid (Only visible on MD and above) */}
                  <div className="hidden md:block absolute top-0 left-1/4 right-1/4 h-1 bg-slate-300 dark:bg-slate-600 rounded-full -mt-[18px]"></div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {others.map(person => (
                      <div key={person.id} className="flex flex-col items-center relative">
                        {/* Connecting Vertical Branch for Grid Item (Only visible on MD and above) */}
                        <div className="hidden md:block absolute -top-[18px] left-1/2 w-1 h-[18px] bg-slate-300 dark:bg-slate-600 rounded-full -translate-x-1/2"></div>
                        <OfficialCard person={person} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="text-center py-12 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-3xl border border-slate-100 dark:border-slate-700 shadow-lg">
              <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">Belum ada data aparatur desa.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
