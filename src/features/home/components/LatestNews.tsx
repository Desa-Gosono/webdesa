import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const news = [
  { id: 1, title: 'Sosialisasi Program KKN Undip 2026', date: '15 Jul 2026', category: 'Kegiatan', img: 'https://placehold.co/600x400/22c55e/ffffff?text=Sosialisasi' },
  { id: 2, title: 'Kerja Bakti Massal Sambut Kemerdekaan', date: '10 Jul 2026', category: 'Kegiatan', img: 'https://placehold.co/600x400/16a34a/ffffff?text=Kerja+Bakti' },
  { id: 3, title: 'Pelatihan Digital Marketing UMKM Desa', date: '05 Jul 2026', category: 'Pelatihan', img: 'https://placehold.co/600x400/15803d/ffffff?text=Pelatihan' },
];

export function LatestNews() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">Berita Desa</h2>
            <p className="text-gray-600 dark:text-gray-400">Informasi terbaru seputar Desa Gosono</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden md:block"
          >
            <Button variant="outline" className="rounded-full cursor-pointer z-20 relative">Lihat Semua <ArrowRight className="ml-2 w-4 h-4" /></Button>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {news.map((n, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative h-60 rounded-3xl overflow-hidden mb-6 shadow-lg shadow-gray-200/50 dark:shadow-none">
                <img src={n.img} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-primary-600 dark:text-primary-400">
                  {n.category}
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
                <Calendar className="w-4 h-4" /> {n.date}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {n.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}