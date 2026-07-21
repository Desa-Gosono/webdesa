import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export function HomeHero() {
  return (
    <div className="relative h-[90vh] min-h-[600px] w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beautiful-green-landscape-4251-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/60 to-gray-900/40 mix-blend-multiply" />
      </div>
      
      <div className="container relative z-10 mx-auto px-4 h-full flex items-center">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-semibold mb-6">
            Selamat Datang di Portal Resmi
          </span>
          <h1 className="text-5xl sm:text-7xl font-display font-bold text-white mb-6 leading-tight drop-shadow-xl">
            Desa Gosono, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">
              Mandiri & Berbudaya.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-10 max-w-2xl font-light">
            Menelusuri keindahan alam, kekayaan budaya, dan potensi ekonomi lokal yang terus berkembang di jantung Kabupaten Boyolali.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full shadow-xl shadow-primary-600/20" onClick={() => window.location.href = '/potensi'}>
              Jelajahi Potensi <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="glass" className="rounded-full text-white" onClick={() => window.location.href = '/galeri'}>
              Galeri Desa
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}