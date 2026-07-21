import React from 'react';
import { motion } from 'framer-motion';

export function MayorWelcome() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:w-1/2 relative"
          >
            <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-tr from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 blur-2xl opacity-50"></div>
            <img 
              src="https://placehold.co/800x1000/eeeeee/999999?text=Kepala+Desa" 
              alt="Kepala Desa" 
              className="relative w-full max-w-md mx-auto rounded-[3rem] shadow-2xl object-cover aspect-[4/5]"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:w-1/2"
          >
            <h4 className="text-primary-600 dark:text-primary-400 font-semibold mb-2">Sambutan Kepala Desa</h4>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Bersama Membangun <br/> Desa yang Berkembang
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-300 text-lg">
              <p>
                Selamat datang di portal informasi digital Desa Gosono. Website ini dikembangkan sebagai media branding dan publikasi untuk mengenalkan berbagai potensi luar biasa yang dimiliki desa kami kepada masyarakat luas.
              </p>
              <p>
                Melalui platform ini, kami mengajak Anda untuk menelusuri keindahan alam, kekayaan tradisi lokal, serta produk-produk unggulan UMKM karya warga Desa Gosono yang terus berkembang.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div>
                <p className="font-display font-bold text-xl text-gray-900 dark:text-white">Bapak Muslim</p>
                <p className="text-sm text-gray-500">Kepala Desa Gosono</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}