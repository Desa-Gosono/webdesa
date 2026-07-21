const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'features', 'home', 'components');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const files = {
  'HomeHero.tsx': `import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export function HomeHero() {
  return (
    <div className="relative h-[90vh] min-h-[600px] w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="h-full w-full object-cover"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beautiful-green-landscape-4251-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/60 to-gray-900/40 mix-blend-multiply" />
      </div>
      
      <div className="container relative z-10 mx-auto px-4 h-full flex items-center">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-semibold mb-6">
            Selamat Datang di Portal Resmi
          </span>
          <h1 className="text-5xl sm:text-7xl font-display font-bold text-white mb-6 leading-tight drop-shadow-xl">
            Desa Gosono, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400">
              Mandiri & Berbudaya.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-10 max-w-2xl font-light">
            Membangun ekosistem Smart Village terintegrasi untuk kesejahteraan masyarakat dan kemajuan teknologi pertanian.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full shadow-xl shadow-primary-600/20">
              Jelajahi Potensi <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="glass" className="rounded-full text-white">
              Layanan Publik
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}`,

  'QuickAccess.tsx': `import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Map, Users, Stethoscope, Landmark, Briefcase } from 'lucide-react';
import { Card } from '@/components/ui/Card';

const services = [
  { icon: FileText, title: 'Layanan Surat', desc: 'Pembuatan surat pengantar' },
  { icon: Landmark, title: 'Dana Desa', desc: 'Transparansi anggaran' },
  { icon: Users, title: 'Kependudukan', desc: 'Data dan statistik' },
  { icon: Stethoscope, title: 'Kesehatan', desc: 'Jadwal Posyandu' },
  { icon: Briefcase, title: 'BUMDes', desc: 'Badan Usaha Milik Desa' },
  { icon: Map, title: 'Peta Interaktif', desc: 'Informasi geospasial' },
];

export function QuickAccess() {
  return (
    <section className="py-20 relative z-20 -mt-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {services.map((svc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Card className="h-full border-0 bg-white/90 backdrop-blur-xl dark:bg-gray-900/90 shadow-xl shadow-gray-200/50 dark:shadow-black/50 hover:-translate-y-2 transition-transform cursor-pointer group rounded-3xl p-6 text-center flex flex-col items-center">
                <div className="h-14 w-14 rounded-2xl bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary-600 transition-all duration-300">
                  <svc.icon className="h-7 w-7 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{svc.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{svc.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}`,

  'VillageStats.tsx': `import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '3,500+', label: 'Penduduk' },
  { value: '950', label: 'Kepala Keluarga' },
  { value: '450', label: 'Hektar Luas Wilayah' },
  { value: '6', label: 'Dusun' },
];

export function VillageStats() {
  return (
    <section className="py-24 bg-primary-950 dark:bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://placehold.co/1920x1080/16a34a/ffffff?text=Pattern')] opacity-5 mix-blend-overlay bg-cover bg-center" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
          {stats.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="text-center px-4"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{s.value}</h2>
              <p className="text-primary-200 font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}`,

  'MayorWelcome.tsx': `import React from 'react';
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
                Selamat datang di portal resmi Desa Gosono. Website ini merupakan wujud nyata komitmen kami dalam mewujudkan transparansi dan pelayanan publik yang prima berbasis digital.
              </p>
              <p>
                Melalui platform Smart Village ini, kami berharap seluruh elemen masyarakat dapat dengan mudah mengakses informasi, mengurus administrasi, serta turut serta dalam pengawasan dan pembangunan desa.
              </p>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div>
                <p className="font-display font-bold text-xl text-gray-900 dark:text-white">Bpk. H. Sutrisno</p>
                <p className="text-sm text-gray-500">Kepala Desa Gosono</p>
              </div>
            </div>
          </motion.div>
        </div>
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

export default function HomePage() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <HomeHero />
      <QuickAccess />
      <VillageStats />
      <MayorWelcome />
      
      {/* TODO: Add other components (News, Programs, Map, etc.) here */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900 container mx-auto px-4 text-center">
        <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">Seksi Lanjutan (Berita, Peta, Wisata)</h2>
        <p className="text-gray-500 dark:text-gray-400">Sedang dalam proses pembuatan script...</p>
      </section>
    </div>
  );
}
`;

fs.writeFileSync(path.join(__dirname, 'src', 'pages', 'home', 'HomePage.tsx'), homePage);
console.log('Homepage partials (Hero, QuickAccess, Stats, Mayor) generated!');
