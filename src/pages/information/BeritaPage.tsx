import React from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { Newspaper, Calendar, User, ArrowRight } from 'lucide-react';
import { useNews } from '@/hooks/useNews';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function BeritaPage() {
  const { useFetchNews } = useNews();
  const { data: allNews = [], isLoading } = useFetchNews();

  // Filter only published news for public
  const publishedNews = allNews.filter(n => n.status === 'published');

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <PageHero 
        title="Kabar Desa" 
        description="Ikuti terus informasi, pengumuman, dan berita terbaru seputar Desa Gosono."
        icon={Newspaper}
      />
      
      <div className="container mx-auto px-4 py-16 relative z-10 flex-grow max-w-6xl">
        {isLoading ? (
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
                className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col group hover:shadow-xl transition-all"
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
                  <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3 mb-6 flex-grow">
                    {newsItem.content.replace(/<[^>]*>?/gm, '')}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                      <User className="w-4 h-4" /> {newsItem.author}
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
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700">
            <Newspaper className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Belum ada berita</h3>
            <p className="text-slate-500">Berita dan informasi terbaru akan segera hadir.</p>
          </div>
        )}
      </div>
    </div>
  );
}
