import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useNews } from '@/hooks/useNews';
import { Link } from 'react-router-dom';
import { SkeletonCard } from '@/components/ui/Skeleton';

export function LatestNews() {
  const { useFetchNews } = useNews();
  const { data: allNews = [], isLoading } = useFetchNews(undefined, 'id, title, slug, thumbnail_url, created_at, published_at, status');
  const publishedNews = allNews.filter(n => n.status === 'published').slice(0, 3);

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
            <Link to="/kategori/berita">
              <Button variant="outline" className="rounded-full cursor-pointer z-20 relative">Lihat Semua <ArrowRight className="ml-2 w-4 h-4" /></Button>
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {isLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : publishedNews.length > 0 ? publishedNews.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group block cursor-pointer"
            >
              <Link to={`/berita/${n.slug}`} className="block">
              <div className="relative h-60 rounded-3xl overflow-hidden mb-6 shadow-lg shadow-gray-200/50 dark:shadow-none bg-slate-100 dark:bg-slate-800">
                {n.thumbnail_url ? (
                  <img src={n.thumbnail_url} alt={n.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">Tidak ada gambar</div>
                )}
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
                  Berita
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
                <Calendar className="w-4 h-4" /> {new Date(n.published_at || n.created_at || '').toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                {n.title}
              </h3>
              </Link>
            </motion.div>
          )) : (
            <div className="col-span-full py-12 text-center text-gray-500">
              Belum ada berita yang dipublikasikan.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}