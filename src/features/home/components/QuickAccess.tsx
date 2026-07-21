import React from 'react';
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
}