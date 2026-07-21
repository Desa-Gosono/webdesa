const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'features', 'home', 'components');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const files = {
  'FeaturedPrograms.tsx': `import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const programs = [
  { title: 'Smart Farming', desc: 'Sistem irigasi pintar berbasis IoT', img: 'https://placehold.co/600x400/2ecc71/ffffff?text=Smart+Farming' },
  { title: 'Desa Digital', desc: 'Pelayanan administrasi online terpadu', img: 'https://placehold.co/600x400/3498db/ffffff?text=Desa+Digital' },
  { title: 'UMKM Go Online', desc: 'Pelatihan digital marketing', img: 'https://placehold.co/600x400/f39c12/ffffff?text=UMKM+Online' },
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
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">Program Unggulan</h2>
          <p className="text-gray-600 dark:text-gray-400">Inisiatif strategis untuk memajukan Desa Gosono menuju kemandirian dan kesejahteraan.</p>
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
}`,

  'LatestNews.tsx': `import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const news = [
  { id: 1, title: 'Peluncuran Smart Farming 2026', date: '15 Jul 2026', category: 'Inovasi', img: 'https://placehold.co/600x400/2ecc71/ffffff?text=News+1' },
  { id: 2, title: 'Kerja Bakti Massal Sambut Kemerdekaan', date: '10 Jul 2026', category: 'Kegiatan', img: 'https://placehold.co/600x400/e74c3c/ffffff?text=News+2' },
  { id: 3, title: 'Pembagian Bibit Gratis untuk Warga', date: '05 Jul 2026', category: 'Pertanian', img: 'https://placehold.co/600x400/f1c40f/ffffff?text=News+3' },
];

export function LatestNews() {
  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">Berita Desa</h2>
            <p className="text-gray-600 dark:text-gray-400">Informasi terbaru seputar Desa Gosono</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden md:block"
          >
            <Button variant="outline" className="rounded-full cursor-pointer z-20 relative">Lihat Semua <ArrowRight className="ml-2 w-4 h-4" /></Button>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {news.map((n, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative h-60 rounded-3xl overflow-hidden mb-6 shadow-lg shadow-gray-200/50 dark:shadow-none">
                <img src={n.img} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-primary-600 dark:text-primary-400">
                  {n.category}
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
                <Calendar className="w-4 h-4" /> {n.date}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {n.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}`,

  'CallToAction.tsx': `import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export function CallToAction() {
  return (
    <section className="py-24 relative overflow-hidden bg-primary-600 dark:bg-primary-900">
      <div className="absolute inset-0 bg-[url('https://placehold.co/1920x1080/16a34a/ffffff?text=Pattern')] opacity-10 mix-blend-overlay bg-cover bg-center" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Mulai Integrasi Smart Village</h2>
          <p className="text-primary-100 text-lg mb-10">Daftarkan diri Anda untuk mendapatkan akses penuh ke layanan administrasi mandiri Desa Gosono.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-100 rounded-full">Buat Akun Warga</Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 rounded-full">Hubungi Admin</Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}`
};

for (const [name, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(dir, name), content);
}

const homePage = `import React from 'react';
import { HomeHero } from '@/features/home/components/HomeHero';
import { QuickAccess } from '@/features/home/components/QuickAccess';
import { VillageStats } from '@/features/home/components/VillageStats';
import { MayorWelcome } from '@/features/home/components/MayorWelcome';
import { FeaturedPrograms } from '@/features/home/components/FeaturedPrograms';
import { LatestNews } from '@/features/home/components/LatestNews';
import { CallToAction } from '@/features/home/components/CallToAction';

export default function HomePage() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <HomeHero />
      <QuickAccess />
      <VillageStats />
      <MayorWelcome />
      <FeaturedPrograms />
      <LatestNews />
      <CallToAction />
    </div>
  );
}
`;

fs.writeFileSync(path.join(__dirname, 'src', 'pages', 'home', 'HomePage.tsx'), homePage);
console.log('Homepage partials 2 generated!');
