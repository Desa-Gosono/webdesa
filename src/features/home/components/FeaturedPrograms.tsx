import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { usePotentials } from '@/hooks/usePotentials';
import { useUmkm } from '@/hooks/useUmkm';
import { Link } from 'react-router-dom';

export function FeaturedPrograms() {
  const { useFetchPotentials } = usePotentials();
  const { useFetchUmkm } = useUmkm();
  
  const { data: potentials = [] } = useFetchPotentials();
  const { data: umkms = [] } = useFetchUmkm();

  const programs = useMemo(() => {
    const combined = [
      ...potentials.map(p => ({
        id: `pot-${p.id}`,
        route: `/potensi/${p.id}`,
        title: p.title,
        desc: p.description,
        img: p.image_url,
        category: p.category
      })),
      ...umkms.map(u => ({
        id: `umkm-${u.id}`,
        route: `/umkm/${u.id}`,
        title: u.name,
        desc: u.description,
        img: u.image_url,
        category: u.category
      }))
    ];
    return combined.slice(0, 6); // Ambil 6 terbaru
  }, [potentials, umkms]);
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
            {programs.length > 0 ? programs.map((p) => (
              <SwiperSlide key={p.id}>
                <Link to={p.route} className="block group rounded-3xl overflow-hidden bg-white dark:bg-gray-950 shadow-xl shadow-gray-200/50 dark:shadow-black/50 hover:-translate-y-2 transition-all duration-300 h-full border border-gray-100 dark:border-gray-800">
                  <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    {p.img ? (
                      <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <span className="text-slate-400">Tanpa Gambar</span>
                    )}
                    <div className="absolute top-4 right-4 bg-primary-500 text-white text-xs px-2 py-1 rounded-lg font-bold">
                      {p.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors">{p.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{p.desc}</p>
                  </div>
                </Link>
              </SwiperSlide>
            )) : (
              <div className="py-12 text-center text-gray-500">
                Belum ada data Potensi atau UMKM.
              </div>
            )}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}