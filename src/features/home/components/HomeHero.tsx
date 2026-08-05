import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { useSettingsContext } from '@/contexts/SettingsContext';
import { useNavigate } from 'react-router-dom';

interface HomeHeroProps {
  backgroundVideoUrl?: string;
  backgroundImage?: string;
}

export function HomeHero({ backgroundVideoUrl, backgroundImage }: HomeHeroProps) {
  const { settings } = useSettingsContext();
  const navigate = useNavigate();
  
  // Find bg_beranda as primary source, fallback to legacy hero_image, or default mixkit video
  const defaultBg = "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beautiful-green-landscape-4251-large.mp4";
  const bgSource = backgroundVideoUrl || backgroundImage || settings.bg_beranda || settings.hero_image || defaultBg;
  const isVideo = bgSource.includes('.mp4') || bgSource.includes('.webm') || bgSource.includes('.ogg');

  return (
    <div className="relative h-[90vh] min-h-[600px] w-full overflow-hidden">
      <div className="absolute inset-0 z-0 bg-slate-900">
        {isVideo ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          >
            <source src={bgSource} type="video/mp4" />
          </video>
        ) : (
          <img
            src={bgSource}
            alt="Hero Background"
            className="h-full w-full object-cover"
          />
        )}
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
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
            {settings.hero_title || 'Desa Gosono'}, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-500">
              {settings.hero_subtitle || 'Mandiri & Berbudaya.'}
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-10 max-w-2xl font-light">
            {settings.hero_description || 'Menelusuri keindahan alam, kekayaan budaya, dan potensi ekonomi lokal yang terus berkembang di jantung Kabupaten Boyolali.'}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full shadow-xl shadow-primary-600/20" onClick={() => navigate(settings.cta_url || '/profil')}>
              {settings.cta_text || 'Jelajahi Desa'} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="glass" className="rounded-full text-white" onClick={() => navigate('/kategori/potensi')}>
              Potensi Desa
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}