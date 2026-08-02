import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Store, User, ArrowLeft, Phone, MapPin, Tag, Package } from 'lucide-react';
import { useUmkm } from '@/hooks/useUmkm';

export default function UMKMDetail() {
  const { id } = useParams<{ id: string }>();
  const { useFetchUmkmById } = useUmkm();
  const { data: umkm, isLoading, error } = useFetchUmkmById(id);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !umkm) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Data UMKM tidak ditemukan</h2>
        <Link to="/kategori/umkm" className="text-emerald-500 hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar UMKM
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/kategori/umkm" className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Potensi
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden"
        >
          {umkm.image_url ? (
            <div className="w-full h-[400px] sm:h-[500px]">
              <img src={umkm.image_url} alt={umkm.name} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-full h-[300px] bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
              <Store className="w-24 h-24 text-slate-300 dark:text-slate-500" />
            </div>
          )}

          <div className="p-8 md:p-12">
            {umkm.category && (
              <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
                {umkm.category}
              </span>
            )}
            
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-8 leading-tight">
              {umkm.name}
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-slate-100 dark:border-slate-700">
              <div className="space-y-4">
                <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-emerald-500" /> Informasi Pemilik
                </h3>
                <p className="text-slate-600 dark:text-slate-400">{umkm.owner || 'Tidak tersedia'}</p>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <Tag className="w-5 h-5 text-indigo-500" /> Nomor Induk Berusaha (NIB)
                </h3>
                <p className="text-slate-600 dark:text-slate-400">{umkm.nib || 'Tidak tersedia'}</p>
              </div>
              
              
              <div className="space-y-4">
                <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <Package className="w-5 h-5 text-sky-500" /> Produk Unggulan
                </h3>
                <p className="text-slate-600 dark:text-slate-400">{umkm.product || 'Tidak tersedia'}</p>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <Phone className="w-5 h-5 text-rose-500" /> Kontak
                </h3>
                {umkm.phone ? (
                  <a href={`https://wa.me/${umkm.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-2">
                    {umkm.phone}
                  </a>
                ) : (
                  <p className="text-slate-600 dark:text-slate-400">Tidak tersedia</p>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-500" /> Alamat
                </h3>
                <p className="text-slate-600 dark:text-slate-400">{umkm.address || 'Tidak tersedia'}</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Deskripsi Usaha</h3>
              <div className="prose prose-slate dark:prose-invert max-w-none prose-p:leading-relaxed">
                {umkm.description ? (
                  <p>{umkm.description}</p>
                ) : (
                  <p className="text-slate-500 italic">Belum ada deskripsi untuk usaha ini.</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
