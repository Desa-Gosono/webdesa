import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const programs = [
  { title: 'Pertanian Organik', desc: 'Sistem budidaya padi organik terpadu', img: 'https://placehold.co/600x400/22c55e/ffffff?text=Pertanian' },
  { title: 'Kerajinan Bambu', desc: 'Produk anyaman bambu khas Gosono', img: 'https://placehold.co/600x400/16a34a/ffffff?text=Kerajinan' },
  { title: 'Wisata Alam', desc: 'Menikmati panorama alam pegunungan', img: 'https://placehold.co/600x400/15803d/ffffff?text=Wisata+Alam' },
];

export function FeaturedPrograms() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">Potensi & UMKM Unggulan</h2>
          <p className="text-gray-600 dark:text-gray-400">Jelajahi kekayaan alam dan produk lokal berkualitas karya masyarakat Desa Gosono.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            className="pb-16"
          >
            {programs.map((p, i) => (
              <SwiperSlide key={i}>
                <div className="group rounded-3xl overflow-hidden bg-white dark:bg-gray-950 shadow-xl shadow-gray-200/50 dark:shadow-black/50 hover:-translate-y-2 transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{p.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{p.desc}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}