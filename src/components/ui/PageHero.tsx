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
      <div className="relative overflow-hidden bg-primary-950 h-[45vh] min-h-[320px] flex items-center shadow-2xl">

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

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/65 to-black/85 z-10" />
        </div>

        <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-3xl flex flex-col items-center"
            >
              {Icon && (
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 shadow-inner backdrop-blur-md border border-white/20">
                  <Icon className="h-7 w-7 text-white" />
                </div>
              )}
              <h1 className="font-display text-2xl font-bold tracking-tight text-white sm:text-4xl drop-shadow-lg text-center">
                {title}
              </h1>
              {description && (
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/90 max-w-xl text-center drop-shadow-md">
                  {description}
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
