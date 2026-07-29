import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useDynamicCrud } from '@/hooks/useDynamicCrud';
import { Link } from 'react-router-dom';

export function LatestAgenda() {
  const { useFetchAll } = useDynamicCrud('agendas');
  const { data: allAgendas = [] } = useFetchAll();
  const recentAgendas = allAgendas.slice(0, 3);

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

        <div className="grid md:grid-cols-3 gap-8">
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
                <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 h-full flex flex-col">
                  
                  <div className="relative h-48 rounded-t-3xl overflow-hidden bg-slate-100 dark:bg-slate-700 shrink-0">
                    {n.image_url ? (
                      <img src={n.image_url} alt={n.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400"><Calendar className="w-12 h-12 opacity-50" /></div>
                    )}
                    <div className="absolute top-4 left-4 bg-emerald-500/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-white uppercase tracking-wider shadow-sm">
                      Agenda
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
                      <Calendar className="w-4 h-4 text-emerald-500" /> 
                      {new Date(n.event_date || n.created_at || '').toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-emerald-500 transition-colors line-clamp-2 mb-3">
                      {n.title}
                    </h3>
                    
                    {n.description && (
                      <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-2 mb-4">
                        {n.description}
                      </p>
                    )}

                    {n.location && (
                      <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700 flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <MapPin className="w-4 h-4 shrink-0 text-rose-400" />
                        <span className="line-clamp-1">{n.location}</span>
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
