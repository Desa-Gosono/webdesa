import React from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { SEO } from '@/components/ui/SEO';

interface PageHeroProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  illustrationUrl?: string;
  backgroundImage?: string;
  backgroundVideoUrl?: string;
}

export function PageHero({ 
  title, 
  description, 
  icon: Icon, 
  illustrationUrl,
  backgroundImage,
  backgroundVideoUrl
}: PageHeroProps) {
  return (
    <>
      <SEO title={title} description={description} />
      <div className="relative overflow-hidden bg-primary-950 py-24 sm:py-32 rounded-b-[3rem] shadow-2xl">
        
        {/* Dynamic Background Media */}
        <div className="absolute inset-0 z-0">
          {backgroundVideoUrl ? (
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="object-cover w-full h-full absolute inset-0 z-0"
            >
              <source src={backgroundVideoUrl} type="video/mp4" />
            </video>
          ) : backgroundImage ? (
            <img 
              src={backgroundImage} 
              alt={`${title} Background`} 
              className="object-cover w-full h-full absolute inset-0 z-0"
            />
          ) : (
            // Default background color and blobs if no media
            <div className="absolute inset-0 bg-primary-950">
              <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary-600/30 mix-blend-multiply blur-3xl" />
              <div className="absolute top-1/2 -right-24 h-80 w-80 rounded-full bg-accent-500/20 mix-blend-multiply blur-3xl" />
            </div>
          )}
          
          {/* Frosted Glass Overlay */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] z-10" />
        </div>
      
        <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-2xl"
            >
              {Icon && (
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 shadow-inner backdrop-blur-md border border-white/20">
                  <Icon className="h-7 w-7 text-white" />
                </div>
              )}
              <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl drop-shadow-lg text-left">
                {title}
              </h1>
              {description && (
                <p className="mt-6 text-lg leading-8 text-white/90 max-w-xl text-left drop-shadow-md">
                  {description}
                </p>
              )}
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="hidden lg:block relative"
            >
              {illustrationUrl ? (
                <img src={illustrationUrl} alt={title} className="w-full max-w-md mx-auto aspect-square object-cover rounded-full shadow-2xl drop-shadow-2xl opacity-80" />
              ) : (
                <div className="w-full max-w-md mx-auto aspect-square bg-gradient-to-tr from-white/10 to-white/30 rounded-full backdrop-blur-3xl border border-white/20 shadow-2xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://placehold.co/800x800/16a34a/ffffff?text=Illustration')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
