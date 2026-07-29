import React from 'react';
import { motion } from 'framer-motion';
import { useProfile } from '@/hooks/useProfile';

export function VillageStats({ variant = 'default' }: { variant?: 'default' | 'card' }) {
  const { useFetchProfile } = useProfile();
  const { data: profile } = useFetchProfile();

  const stats = [
    { value: profile?.population ? `${profile.population.toLocaleString('id-ID')}+` : '3,500+', label: 'Penduduk' },
    { value: profile?.families ? profile.families.toLocaleString('id-ID') : '950', label: 'Kepala Keluarga' },
    { value: profile?.area ? profile.area.toLocaleString('id-ID') : '450', label: 'Hektar Luas Wilayah' },
    { value: profile?.hamlets ? profile.hamlets.toString() : '6', label: 'Dusun' },
  ];

  const isCard = variant === 'card';

  return (
    <section className={`relative overflow-hidden ${isCard ? 'py-12 bg-emerald-500/10 dark:bg-emerald-500/10 rounded-3xl border border-emerald-500/20 backdrop-blur-sm mt-4' : 'py-24 bg-primary-950 dark:bg-black'}`}>
      {!isCard && <div className="absolute inset-0 bg-[url('https://placehold.co/1920x1080/16a34a/ffffff?text=Pattern')] opacity-5 mix-blend-overlay bg-cover bg-center" />}
      <div className="container mx-auto px-4 relative z-10">
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 ${isCard ? 'divide-x divide-emerald-500/20' : 'divide-x divide-white/10'}`}>
          {stats.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center px-4"
            >
              <h2 className={`text-4xl md:text-5xl font-display font-bold mb-2 ${isCard ? 'text-emerald-700 dark:text-emerald-400' : 'text-white'}`}>{s.value}</h2>
              <p className={`font-medium ${isCard ? 'text-emerald-700/80 dark:text-emerald-400/80' : 'text-primary-200'}`}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}