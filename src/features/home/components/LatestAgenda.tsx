import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useDynamicCrud } from '@/hooks/useDynamicCrud';
import { Link } from 'react-router-dom';

export function LatestAgenda() {
  const { useFetchAll } = useDynamicCrud('agenda');
  const { data: allAgendas = [] } = useFetchAll();
  const recentAgendas = allAgendas.slice(0, 4);

  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-2">Agenda Desa</h2>
            <p className="text-gray-600 dark:text-gray-400">Jadwal kegiatan terbaru di Desa Gosono</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden md:block"
          >
            <Link to="/kategori/agenda">
              <Button variant="outline" className="rounded-full cursor-pointer z-20 relative">Lihat Semua <ArrowRight className="ml-2 w-4 h-4" /></Button>
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {recentAgendas.length > 0 ? recentAgendas.map((n: any, i: number) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group block cursor-pointer"
            >
              <Link to={`/agenda/${n.slug || n.id}`} className="block h-full">
                <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 dark:border-slate-700 h-full flex flex-row items-center sm:max-h-24">
                  
                  <div className="relative w-24 sm:w-28 h-24 sm:h-full shrink-0 bg-slate-100 dark:bg-slate-700">
                    {n.image_url ? (
                      <img src={n.image_url} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400"><Calendar className="w-8 h-8 opacity-50" /></div>
                    )}
                  </div>

                  <div className="p-3 flex flex-col flex-grow justify-center min-w-0">
                    <div className="flex items-center gap-2 text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 mb-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> 
                      <span className="truncate">{new Date(n.event_date || n.created_at || '').toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                    
                    <h3 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white group-hover:text-emerald-500 transition-colors line-clamp-1 mb-1">
                      {n.title}
                    </h3>

                    {n.location && (
                      <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-500 dark:text-slate-400">
                        <MapPin className="w-3.5 h-3.5 shrink-0 text-rose-400" />
                        <span className="truncate">{n.location}</span>
                      </div>
                    )}
                  </div>

                </div>
              </Link>
            </motion.div>
          )) : (
            <div className="col-span-full py-12 text-center text-slate-500">
              Belum ada agenda yang dijadwalkan.
            </div>
          )}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link to="/kategori/agenda">
            <Button variant="outline" className="rounded-full w-full justify-center">Lihat Semua <ArrowRight className="ml-2 w-4 h-4" /></Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
