import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export function CallToAction() {
  return (
    <section className="py-24 relative overflow-hidden bg-primary-600 dark:bg-primary-900">
      <div className="absolute inset-0 bg-[url('https://placehold.co/1920x1080/16a34a/ffffff?text=Pattern')] opacity-10 mix-blend-overlay bg-cover bg-center" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Jelajahi Lebih Dekat</h2>
          <p className="text-primary-100 text-lg mb-10">Kenali potensi wisata, seni, dan ekonomi kreatif yang ada di Desa Gosono.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-100 rounded-full" onClick={() => window.location.href = '/potensi'}>Jelajahi Potensi</Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 rounded-full" onClick={() => window.location.href = '/kontak'}>Hubungi Kami</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}