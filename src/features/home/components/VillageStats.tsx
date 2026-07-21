import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '3,500+', label: 'Penduduk' },
  { value: '950', label: 'Kepala Keluarga' },
  { value: '450', label: 'Hektar Luas Wilayah' },
  { value: '6', label: 'Dusun' },
];

export function VillageStats() {
  return (
    <section className="py-24 bg-primary-950 dark:bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://placehold.co/1920x1080/16a34a/ffffff?text=Pattern')] opacity-5 mix-blend-overlay bg-cover bg-center" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
          {stats.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center px-4"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{s.value}</h2>
              <p className="text-primary-200 font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}