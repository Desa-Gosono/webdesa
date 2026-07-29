import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Clock } from 'lucide-react';
import { useNews } from '@/hooks/useNews';

export default function BeritaDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { useFetchNewsBySlug } = useNews();
  const { data: news, isLoading, error } = useFetchNewsBySlug(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Berita tidak ditemukan</h2>
        <Link to="/kategori/berita" className="text-emerald-500 hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Berita
        </Link>
      </div>
    );
  }

  const isPublished = news.status === 'published';

  return (
    <div className="pt-24 pb-16 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/kategori/berita" className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Berita
        </Link>

        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden"
        >
          {news.thumbnail_url && (
            <div className="w-full h-[400px] sm:h-[500px] relative">
              <img src={news.thumbnail_url} alt={news.title} className="w-full h-full object-cover" />
              {!isPublished && (
                <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
                  {news.status}
                </div>
              )}
            </div>
          )}

          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-6 leading-tight">
              {news.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-8 pb-8 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-500" />
                <span className="font-medium text-slate-700 dark:text-slate-300">{news.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-sky-500" />
                <span>
                  {news.published_at 
                    ? new Date(news.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
                    : 'Belum dipublikasi'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>{new Date(news.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</span>
              </div>
            </div>

            <div className="prose prose-slate dark:prose-invert max-w-none prose-emerald prose-p:leading-relaxed prose-headings:font-bold prose-img:rounded-2xl">
              {/* If content is rich text HTML, use dangerouslySetInnerHTML, else just paragraph splitting */}
              <div dangerouslySetInnerHTML={{ __html: news.content.replace(/\n/g, '<br/>') }} />
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
