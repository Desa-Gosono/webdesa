import React, { useState } from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { Newspaper, Calendar, User, ArrowRight, CalendarDays, Clock, MapPin } from 'lucide-react';
import { useNews } from '@/hooks/useNews';
import { useAgenda } from '@/hooks/useAgenda';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { useSettingsContext } from '@/contexts/SettingsContext';

export default function BeritaPage() {
  const { settings } = useSettingsContext();
  const [activeTab, setActiveTab] = useState<'news' | 'agenda'>('news');
  
  const { useFetchNews } = useNews();
  const { data: allNews = [], isLoading: isLoadingNews } = useFetchNews();
  const publishedNews = allNews.filter(n => n.status === 'published');

  const { useFetchAgenda } = useAgenda();
  const { data: agendas = [], isLoading: isLoadingAgenda } = useFetchAgenda();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <PageHero 
        title="Informasi Publik" 
        description="Ikuti terus berita, pengumuman, dan agenda kegiatan terbaru seputar Desa Gosono."
        icon={Newspaper}
        backgroundImage={settings.bg_berita && !settings.bg_berita.endsWith('.mp4') ? settings.bg_berita : "https://images.unsplash.com/photo-1577563908411-50cb98976fea?auto=format&fit=crop&w=2000&q=80"}
        backgroundVideoUrl={settings.bg_berita?.endsWith('.mp4') ? settings.bg_berita : undefined}
        illustrationUrl={settings.ill_berita}
      />
      
      <div className="container mx-auto px-4 py-12 relative z-10 flex-grow max-w-6xl">
        {/* Tabs Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white dark:bg-slate-800 p-1.5 rounded-full shadow-sm border border-slate-100 dark:border-slate-700 flex max-w-md w-full relative">
            <button
              onClick={() => setActiveTab('news')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full font-bold text-sm transition-all duration-300 z-10",
                activeTab === 'news' ? "text-white" : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              )}
            >
              <Newspaper className="w-4 h-4" />
              Berita Desa
            </button>
            <button
              onClick={() => setActiveTab('agenda')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full font-bold text-sm transition-all duration-300 z-10",
                activeTab === 'agenda' ? "text-white" : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              )}
            >
              <CalendarDays className="w-4 h-4" />
              Agenda Kegiatan
            </button>
            
            {/* Animated Tab Background */}
            <div 
              className={cn(
                "absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-emerald-500 rounded-full transition-transform duration-300 ease-spring shadow-md z-0",
                activeTab === 'news' ? "left-1.5 translate-x-0" : "left-1.5 translate-x-full"
              )}
            />
          </div>
        </div>

        {/* Tab Content: News */}
        {activeTab === 'news' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {isLoadingNews ? (
              <div className="flex justify-center py-12">
                <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
              </div>
            ) : publishedNews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {publishedNews.map((newsItem, i) => (
                  <motion.article 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    key={newsItem.id} 
                    className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="h-48 relative overflow-hidden bg-slate-100 dark:bg-slate-700">
                      {newsItem.thumbnail_url ? (
                        <img src={newsItem.thumbnail_url} alt={newsItem.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center"><Newspaper className="w-12 h-12 text-slate-300" /></div>
                      )}
                      <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-lg">
                        <Calendar className="w-4 h-4 text-emerald-500" />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          {newsItem.published_at ? new Date(newsItem.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) : 'Baru'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                        <Link to={`/berita/${newsItem.slug}`}>{newsItem.title}</Link>
                      </h3>
                      
                      {/* Hapus tag HTML dari konten untuk preview */}
                      <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                        {newsItem.content.replace(/<[^>]*>?/gm, '')}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700/50 px-2 py-1 rounded-md">
                          <User className="w-3.5 h-3.5" /> {newsItem.author}
                        </div>
                        <Link to={`/berita/${newsItem.slug}`} className="flex items-center gap-1 text-sm font-bold text-emerald-600 dark:text-emerald-400 group-hover:gap-2 transition-all">
                          Baca <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
                <div className="w-20 h-20 bg-slate-50 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Newspaper className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Belum ada berita</h3>
                <p className="text-slate-500 max-w-md mx-auto">Berita dan informasi terbaru akan segera hadir. Pantau terus halaman ini.</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Tab Content: Agenda */}
        {activeTab === 'agenda' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {isLoadingAgenda ? (
              <div className="flex justify-center py-12">
                <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
              </div>
            ) : agendas.length > 0 ? (
              <div className="space-y-6 max-w-4xl mx-auto">
                {agendas.map((item, i) => {
                  const eventDate = item.event_date ? new Date(item.event_date) : null;
                  
                  return (
                    <Link to={`/agenda/${item.id}`} key={item.id} className="block group">
                      <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row group-hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full"
                      >
                        <div className="md:w-56 shrink-0 bg-emerald-50 dark:bg-slate-700/50 p-6 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-600 relative overflow-hidden">
                          {/* Decorative circle */}
                          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100 dark:bg-emerald-900/20 rounded-bl-full -mr-8 -mt-8 z-0"></div>
                          
                          {eventDate ? (
                            <div className="relative z-10">
                              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-1 block">
                                {eventDate.toLocaleDateString('id-ID', { month: 'short' })}
                              </span>
                              <span className="text-5xl font-black text-slate-800 dark:text-white leading-none tracking-tighter mb-2 block group-hover:scale-110 transition-transform">
                                {eventDate.getDate()}
                              </span>
                              <span className="text-xs font-medium text-slate-500 bg-white dark:bg-slate-800 px-3 py-1 rounded-full shadow-sm mt-2 inline-block">
                                {eventDate.toLocaleDateString('id-ID', { weekday: 'long' })}, {eventDate.getFullYear()}
                              </span>
                            </div>
                          ) : (
                            <CalendarDays className="w-16 h-16 text-emerald-300 dark:text-slate-500 relative z-10" />
                          )}
                        </div>
                        
                        <div className="p-6 md:p-8 flex flex-col justify-center flex-grow">
                          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 group-hover:text-emerald-600 transition-colors">
                            {item.title}
                          </h3>
                          
                          <div className="flex flex-wrap gap-3 mb-4">
                            {eventDate && (
                              <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-600">
                                <Clock className="w-4 h-4 text-emerald-500" />
                                {eventDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
                              </div>
                            )}
                            
                            {item.location && (
                              <div className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-600">
                                <MapPin className="w-4 h-4 text-rose-500" />
                                {item.location}
                              </div>
                            )}
                          </div>
                          
                          {item.description && (
                            <p className="text-slate-500 dark:text-slate-400 line-clamp-2 text-sm leading-relaxed">
                              {item.description}
                            </p>
                          )}
                        </div>
                        
                        {item.image_url && (
                          <div className="md:w-48 shrink-0 relative overflow-hidden hidden lg:block">
                            <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-r from-white dark:from-slate-800 to-transparent"></div>
                          </div>
                        )}
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm max-w-3xl mx-auto">
                <div className="w-20 h-20 bg-slate-50 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CalendarDays className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Belum ada agenda</h3>
                <p className="text-slate-500 max-w-md mx-auto">Saat ini belum ada jadwal kegiatan atau acara dalam waktu dekat. Silakan pantau terus halaman ini.</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
