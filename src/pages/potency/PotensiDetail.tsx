import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Image as ImageIcon, MapPin } from 'lucide-react';
import { usePotentials } from '@/hooks/usePotentials';

export default function PotensiDetail() {
  const { id } = useParams<{ id: string }>();
  const { useFetchPotentialById } = usePotentials();
  const { data: potensi, isLoading, error } = useFetchPotentialById(id);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !potensi) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Data Potensi tidak ditemukan</h2>
        <Link to="/kategori/potensi" className="text-emerald-500 hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Potensi
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/kategori/potensi" className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Potensi
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden"
        >
          {potensi.image_url ? (
            <div className="w-full h-[400px] sm:h-[500px]">
              <img src={potensi.image_url} alt={potensi.title} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-full h-[300px] bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
              <ImageIcon className="w-24 h-24 text-slate-300 dark:text-slate-500" />
            </div>
          )}

          <div className="p-8 md:p-12">
            {potensi.category && (
              <span className="inline-block px-4 py-1.5 bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-400 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
                {potensi.category}
              </span>
            )}
            
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-8 leading-tight">
              {potensi.title}
            </h1>
            
            <div className="prose prose-slate dark:prose-invert max-w-none prose-p:leading-relaxed prose-lg text-justify">
              {potensi.description ? (
                <div dangerouslySetInnerHTML={{ __html: potensi.description.replace(/\n/g, '<br/>') }} />
              ) : (
                <p className="text-slate-500 italic">Belum ada deskripsi mendetail untuk potensi ini.</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
