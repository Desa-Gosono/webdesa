import React, { useState } from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { CalendarDays, MapPin, Clock, X, Calendar, Phone } from 'lucide-react';
import { useAgenda } from '@/hooks/useAgenda';
import { motion, AnimatePresence } from 'framer-motion';

export default function AgendaPage() {
  const { useFetchAgenda } = useAgenda();
  const { data: agendas = [], isLoading } = useFetchAgenda();
  const [selectedAgenda, setSelectedAgenda] = useState<any | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <PageHero 
        title="Agenda Kegiatan" 
        description="Jadwal acara, pertemuan, dan kegiatan penting di lingkungan Desa Gosono."
        icon={CalendarDays}
      />
      
      <div className="container mx-auto px-4 py-16 relative z-10 flex-grow max-w-5xl">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin"></div>
          </div>
        ) : agendas.length > 0 ? (
          <div className="space-y-6">
            {agendas.map((item, i) => {
              const eventDate = item.event_date ? new Date(item.event_date) : null;
              
              return (
                <div onClick={() => setSelectedAgenda(item)} key={item.id} className="block cursor-pointer">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row group hover:shadow-xl transition-all h-full"
                  >
                    <div className="md:w-64 shrink-0 bg-sky-50 dark:bg-slate-700 p-6 md:p-8 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-600">
                      {eventDate ? (
                        <>
                          <span className="text-sm font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest mb-1">
                            {eventDate.toLocaleDateString('id-ID', { month: 'short' })}
                          </span>
                          <span className="text-5xl md:text-6xl font-black text-slate-800 dark:text-white leading-none tracking-tighter mb-2 group-hover:scale-110 transition-transform">
                            {eventDate.getDate()}
                          </span>
                          <span className="text-sm font-medium text-slate-500">
                            {eventDate.toLocaleDateString('id-ID', { weekday: 'long' })}, {eventDate.getFullYear()}
                          </span>
                        </>
                      ) : (
                        <CalendarDays className="w-16 h-16 text-sky-300 dark:text-slate-500" />
                      )}
                    </div>
                    
                    <div className="p-6 md:p-8 flex flex-col justify-center flex-grow">
                      <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 group-hover:text-sky-600 transition-colors">
                        {item.title}
                      </h3>
                      
                      <div className="flex flex-wrap gap-4 mb-4">
                        {eventDate && (
                          <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
                            <Clock className="w-4 h-4 text-sky-500" />
                            {eventDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                          </div>
                        )}
                        
                        {item.location && (
                          <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
                            <MapPin className="w-4 h-4 text-rose-500" />
                            {item.location}
                          </div>
                        )}
                      </div>
                      
                      {item.description && (
                        <p className="text-slate-500 dark:text-slate-400 line-clamp-3">
                          {item.description}
                        </p>
                      )}
                    </div>
                    
                    {item.image_url && (
                      <div className="md:w-64 h-48 md:h-auto shrink-0 relative overflow-hidden hidden lg:block">
                        <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-slate-800 to-transparent"></div>
                      </div>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700">
            <CalendarDays className="w-20 h-20 text-slate-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Belum ada agenda</h3>
            <p className="text-slate-500 max-w-md mx-auto">Saat ini belum ada jadwal kegiatan atau acara dalam waktu dekat. Silakan pantau terus halaman ini.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedAgenda && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSelectedAgenda(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setSelectedAgenda(null)}
                className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-full text-slate-600 dark:text-slate-300 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-4">
                {(selectedAgenda.event_date || selectedAgenda.created_at) && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-700/50 rounded-lg font-medium">
                    <Calendar className="w-4 h-4 text-emerald-500" />
                    {new Date(selectedAgenda.event_date || selectedAgenda.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                )}
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-6 leading-tight pr-8">
                {selectedAgenda.title}
              </h2>

              {selectedAgenda.image_url && (
                <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-6 bg-slate-100 dark:bg-slate-700">
                  <img 
                    src={selectedAgenda.image_url} 
                    alt="Cover" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {selectedAgenda.description && (
                <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 text-justify mb-8 whitespace-pre-wrap">
                  {selectedAgenda.description}
                </div>
              )}

              {(selectedAgenda.location || selectedAgenda.contact) && (
                <div className="flex flex-col gap-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Informasi Kontak & Lokasi</h4>
                  {selectedAgenda.location && (
                    <div
                      className="flex items-start gap-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-rose-500 transition-colors cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        const isUrl = selectedAgenda.location.startsWith('http://') || selectedAgenda.location.startsWith('https://');
                        if (isUrl) {
                          window.open(selectedAgenda.location, '_blank');
                        } else {
                          window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedAgenda.location)}`, '_blank');
                        }
                      }}
                      title="Buka di Google Maps"
                    >
                      <MapPin className="w-5 h-5 shrink-0 text-rose-500" />
                      <span className="mt-0.5">{selectedAgenda.location}</span>
                    </div>
                  )}
                  {selectedAgenda.contact && (
                    <div
                      className="flex items-start gap-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-500 transition-colors cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        const cleanPhone = selectedAgenda.contact.replace(/\D/g, '');
                        const waPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.substring(1) : cleanPhone;
                        window.open(`https://wa.me/${waPhone}`, '_blank');
                      }}
                      title="Hubungi via WhatsApp"
                    >
                      <Phone className="w-5 h-5 shrink-0 text-emerald-500" />
                      <span className="mt-0.5">{selectedAgenda.contact}</span>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
