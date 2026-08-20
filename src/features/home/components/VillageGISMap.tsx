import React, { useState, useEffect } from 'react';
import { Map, Maximize2, ZoomIn, ZoomOut, RotateCcw, X, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

const MAPS = [
  {
    id: 'map-1',
    name: 'Peta UMKM',
    src: '/peta-gis.webp'
  },
  {
    id: 'map-2',
    name: 'Peta Administrasi',
    src: '/peta administrasi.webp'
  }
];

export function VillageGISMap() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeMapIndex, setActiveMapIndex] = useState(0);

  // Esc key listener to close fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const activeMap = MAPS[activeMapIndex];

  const MapContent = ({ isModal = false }: { isModal?: boolean }) => (
    <TransformWrapper
      key={activeMap.id} // Re-initialize zoom when map changes
      initialScale={1}
      minScale={isModal ? 0.2 : 1}
      maxScale={8}
      centerOnInit
      limitToBounds={!isModal}
    >
      {({ zoomIn, zoomOut, resetTransform }) => (
        <div className="relative w-full h-full bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl overflow-hidden group">
          {/* Controls */}
          <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button onClick={() => zoomIn()} className="p-2.5 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl shadow-lg backdrop-blur-sm transition-all hover:scale-105 active:scale-95 border border-slate-200 dark:border-slate-700" title="Perbesar">
              <ZoomIn className="w-5 h-5" />
            </button>
            <button onClick={() => zoomOut()} className="p-2.5 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl shadow-lg backdrop-blur-sm transition-all hover:scale-105 active:scale-95 border border-slate-200 dark:border-slate-700" title="Perkecil">
              <ZoomOut className="w-5 h-5" />
            </button>
            <button onClick={() => resetTransform()} className="p-2.5 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl shadow-lg backdrop-blur-sm transition-all hover:scale-105 active:scale-95 border border-slate-200 dark:border-slate-700" title="Reset Posisi">
              <RotateCcw className="w-5 h-5" />
            </button>
            <button onClick={() => setIsFullscreen(!isFullscreen)} className="p-2.5 bg-emerald-500/90 hover:bg-emerald-500 text-white rounded-xl shadow-lg backdrop-blur-sm transition-all hover:scale-105 active:scale-95 mt-2 border border-emerald-600/50" title={isFullscreen ? "Tutup Layar Penuh" : "Layar Penuh"}>
              {isFullscreen ? <X className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>

          <div className="w-full h-full cursor-move">
            <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
              <img
                src={activeMap.src}
                alt={`Peta WebGIS Desa - ${activeMap.name}`}
                className="w-full h-full object-contain"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/logo-desa.png';
                  (e.target as HTMLImageElement).className = 'w-32 h-32 opacity-20 object-contain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
                }}
              />
            </TransformComponent>
          </div>

          <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
            <div className="px-4 py-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 shadow-sm border border-white/50 dark:border-slate-700/50">
              Gunakan mouse wheel atau sentuh layar untuk zoom
            </div>
          </div>
        </div>
      )}
    </TransformWrapper>
  );

  return (
    <>
      <section className="py-12 relative z-10 w-full">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/40 dark:bg-gray-900/50 backdrop-blur-xl rounded-[2rem] shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-white/60 dark:border-gray-700/50 p-6 md:p-8 hover:-translate-y-1 transition-transform duration-500"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl shadow-lg shadow-emerald-200 dark:shadow-emerald-900/20 text-white shrink-0">
                  <Map className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Peta WebGIS Desa</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Eksplorasi tata ruang dan batas wilayah Desa secara interaktif.</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  {MAPS.map((map, idx) => (
                    <button
                      key={map.id}
                      onClick={() => setActiveMapIndex(idx)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeMapIndex === idx
                        ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-700/50'
                        }`}
                    >
                      <MapPin className="w-4 h-4" />
                      {map.name}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors font-semibold text-sm border border-emerald-200 dark:border-emerald-800"
                >
                  <Maximize2 className="w-4 h-4" />
                  Layar Penuh
                </button>
              </div>
            </div>

            <div className="relative w-full max-w-4xl mx-auto bg-slate-100 dark:bg-slate-800/80 rounded-3xl overflow-hidden border-2 border-white/80 dark:border-gray-700 shadow-inner" style={{ aspectRatio: '3179/2245' }}>
              <MapContent />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 bg-black/50 border-b border-white/10 text-white shadow-xl relative z-10">
              <div className="flex items-center gap-3">
                <Map className="w-6 h-6 text-emerald-400" />
                <div>
                  <h3 className="font-bold text-lg leading-tight">Peta WebGIS Desa</h3>
                  <p className="text-xs text-slate-400">Tekan Esc untuk menutup</p>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="flex bg-white/10 p-1 rounded-xl flex-1 md:flex-none">
                  {MAPS.map((map, idx) => (
                    <button
                      key={map.id}
                      onClick={() => setActiveMapIndex(idx)}
                      className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeMapIndex === idx
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                        }`}
                    >
                      <MapPin className="w-4 h-4" />
                      {map.name}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="p-3 bg-white/10 hover:bg-red-500/80 hover:text-white rounded-xl transition-all text-sm font-semibold backdrop-blur-md shadow-lg shrink-0"
                  title="Tutup Peta"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 w-full h-full p-2 md:p-6 bg-slate-950">
              <div className="w-full h-full bg-slate-900 rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative">
                <MapContent isModal={true} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
