import React from 'react';
import { Map } from 'lucide-react';
import { motion } from 'framer-motion';

export function VillageGISMap() {
  return (
    <section className="py-12 relative z-10 w-full">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/40 dark:bg-gray-900/50 backdrop-blur-xl rounded-[2rem] shadow-xl shadow-gray-200/50 dark:shadow-black/20 border border-white/60 dark:border-gray-700/50 p-6 md:p-8 hover:-translate-y-1 transition-transform duration-500"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl shadow-lg shadow-emerald-200 dark:shadow-emerald-900/20 text-white">
              <Map className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Peta WebGIS Desa</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Eksplorasi tata ruang dan batas wilayah Desa Gosono secara interaktif.</p>
            </div>
          </div>
          
          <div className="relative w-full h-[500px] bg-gray-100 dark:bg-gray-800 rounded-3xl overflow-hidden border-2 border-white/80 dark:border-gray-700 shadow-inner">
            {/* Placeholder for WebGIS */}
            <div id="webgis-map" className="w-full h-full flex items-center justify-center">
              <div className="text-center p-8">
                <Map className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-500 dark:text-gray-400 mb-2">Peta WebGIS Segera Hadir</h3>
                <p className="text-gray-400 dark:text-gray-500 text-sm max-w-md mx-auto">
                  Kontainer ini disiapkan untuk integrasi WebGIS (Leaflet/Mapbox) di tahap selanjutnya.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
