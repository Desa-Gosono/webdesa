import React, { useState } from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { Image as ImageIcon, Video, X, PlayCircle } from 'lucide-react';
import { useGallery } from '@/hooks/useGallery';
import { Gallery } from '@/models/types';

import { motion, AnimatePresence } from 'framer-motion';

export default function GaleriPage() {
  const { useFetchGallery } = useGallery();
  const { data: items = [], isLoading } = useFetchGallery();
  
  const [selectedMedia, setSelectedMedia] = useState<Gallery | null>(null);

  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <PageHero 
        title="Galeri Desa" 
        description="Dokumentasi foto dan video kegiatan serta pemandangan di Desa Gosono."
        icon={ImageIcon}
      />
      
      <div className="container mx-auto px-4 py-16 relative z-10 flex-grow max-w-7xl">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
          </div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item, i) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                key={item.id} 
                onClick={() => setSelectedMedia(item)}
                className="group cursor-pointer bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all"
              >
                <div className="h-64 relative overflow-hidden bg-slate-100 dark:bg-slate-700">
                  {item.media_type === 'image' ? (
                    <img src={item.media_url} alt={item.title || 'Galeri'} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full relative">
                      {getYouTubeId(item.media_url) ? (
                        <img src={`https://img.youtube.com/vi/${getYouTubeId(item.media_url)}/hqdefault.jpg`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Video Thumbnail" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-800"><Video className="w-12 h-12 text-slate-500" /></div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                        <PlayCircle className="w-16 h-16 text-white/90 group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                  )}
                  
                  {item.category && (
                    <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                      {item.media_type === 'video' ? <Video className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                      {item.category}
                    </div>
                  )}
                </div>
                
                {(item.title || item.description) && (
                  <div className="p-5">
                    {item.title && <h3 className="font-bold text-slate-800 dark:text-white line-clamp-1">{item.title}</h3>}
                    {item.description && <p className="text-sm text-slate-500 line-clamp-2 mt-1">{item.description}</p>}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700">
            <ImageIcon className="w-20 h-20 text-slate-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Belum ada media</h3>
            <p className="text-slate-500 max-w-md mx-auto">Dokumentasi foto dan video akan segera ditambahkan ke halaman ini.</p>
          </div>
        )}
      </div>

      {/* Lightbox / Modal Preview */}
      <AnimatePresence>
        {selectedMedia && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0"
              onClick={() => setSelectedMedia(null)} 
            />
            
            <button 
              onClick={() => setSelectedMedia(null)}
              className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-md transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl max-h-[90vh] flex flex-col items-center justify-center z-10"
            >
              {selectedMedia.media_type === 'image' ? (
                <img 
                  src={selectedMedia.media_url} 
                  alt={selectedMedia.title || 'Preview'} 
                  className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl" 
                />
              ) : (
                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
                  {getYouTubeId(selectedMedia.media_url) ? (
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={`https://www.youtube.com/embed/${getYouTubeId(selectedMedia.media_url)}?autoplay=1`} 
                      title="YouTube video player" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white">
                      <Video className="w-16 h-16 mb-4 text-slate-500" />
                      <p>URL Video tidak dapat diputar.</p>
                      <a href={selectedMedia.media_url} target="_blank" rel="noreferrer" className="mt-4 text-sky-400 hover:underline">Buka tautan</a>
                    </div>
                  )}
                </div>
              )}
              
              {(selectedMedia.title || selectedMedia.description) && (
                <div className="mt-6 text-center text-white max-w-2xl bg-black/50 p-4 rounded-xl backdrop-blur-md">
                  {selectedMedia.title && <h3 className="text-xl font-bold mb-2">{selectedMedia.title}</h3>}
                  {selectedMedia.description && <p className="text-sm text-slate-300">{selectedMedia.description}</p>}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
