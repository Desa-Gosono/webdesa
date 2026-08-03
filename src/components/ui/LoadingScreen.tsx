import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettingsContext } from '@/contexts/SettingsContext';

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const { settings } = useSettingsContext();

  useEffect(() => {
    // Show for 1.8 seconds for a nice visual impact without being annoying
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative flex flex-col items-center"
          >
            {/* Logo or Icon */}
            {settings.logo ? (
              <img src={settings.logo} alt="Logo Desa" className="h-24 md:h-32 w-auto mb-6 object-contain drop-shadow-xl" />
            ) : (
              <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-[2rem] flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/20 rotate-3">
                <span className="text-white text-3xl font-bold tracking-tighter">DS</span>
              </div>
            )}
            
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white mb-2 tracking-tight">
              {settings.nama_desa ? `Desa ${settings.nama_desa}` : 'Portal Desa'}
            </h1>
            {settings.kabupaten && (
              <p className="text-slate-500 font-medium">Kabupaten {settings.kabupaten}</p>
            )}
            
            {/* Loading Indicator */}
            <div className="mt-12 flex gap-3">
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                className="w-3 h-3 bg-emerald-500 rounded-full shadow-sm shadow-emerald-500/50"
              />
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                className="w-3 h-3 bg-emerald-500 rounded-full shadow-sm shadow-emerald-500/50"
              />
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                className="w-3 h-3 bg-emerald-500 rounded-full shadow-sm shadow-emerald-500/50"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
