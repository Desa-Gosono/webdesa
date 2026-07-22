import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Edit, Trash2, Search, ArrowLeft, Send } from 'lucide-react';
import { useNews, News, InsertNews } from '@/hooks/useNews';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Skema Validasi
const newsSchema = z.object({
  title: z.string().min(5, 'Judul berita minimal 5 karakter'),
  slug: z.string().min(3, 'Slug minimal 3 karakter').regex(/^[a-z0-9-]+$/, 'Slug hanya boleh huruf kecil, angka, dan strip'),
  content: z.string().min(20, 'Konten berita minimal 20 karakter'),
  thumbnail_url: z.string().url('URL gambar tidak valid').or(z.literal('')),
  author: z.string().min(3, 'Nama penulis minimal 3 karakter'),
  status: z.enum(['draft', 'published', 'archive']),
  published_at: z.string().optional(),
});

type NewsFormValues = z.infer<typeof newsSchema>;

export default function NewsManagement() {
  const { useFetchNews, useCreateNews, useUpdateNews, useDeleteNews } = useNews();
  const { data: newsList = [], isLoading } = useFetchNews();
  const createMutation = useCreateNews();
  const updateMutation = useUpdateNews();
  const deleteMutation = useDeleteNews();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<NewsFormValues>({
    resolver: zodResolver(newsSchema),
    defaultValues: {
      status: 'draft',
      thumbnail_url: '',
    },
  });

  const titleValue = watch('title');

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue('title', val, { shouldValidate: true });
    if (!selectedNewsId) {
      const generatedSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      setValue('slug', generatedSlug, { shouldValidate: true });
    }
  };

  const openCreateModal = () => {
    setSelectedNewsId(null);
    reset({
      title: '',
      slug: '',
      content: '',
      thumbnail_url: '',
      author: '',
      status: 'draft',
      published_at: new Date().toISOString(),
    });
    setIsModalOpen(true);
  };

  const openEditModal = (news: News) => {
    setSelectedNewsId(news.id);
    reset({
      title: news.title,
      slug: news.slug,
      content: news.content,
      thumbnail_url: news.thumbnail_url || '',
      author: news.author,
      status: news.status,
      published_at: news.published_at,
    });
    setIsModalOpen(true);
  };

  const openDeleteModal = (id: string) => {
    setSelectedNewsId(id);
    setIsDeleteModalOpen(true);
  };

  const onSubmit = async (data: NewsFormValues) => {
    const payload: InsertNews = {
      ...data,
      published_at: data.published_at || new Date().toISOString(),
    };

    if (selectedNewsId) {
      await updateMutation.mutateAsync({ id: selectedNewsId, updates: payload });
    } else {
      await createMutation.mutateAsync(payload);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    if (selectedNewsId) {
      await deleteMutation.mutateAsync(selectedNewsId);
      setIsDeleteModalOpen(false);
    }
  };

  const filteredNews = newsList.filter(news => 
    news.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    news.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-sky-50/50 dark:bg-slate-900 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header - Fresh Theme */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-sky-100 dark:border-slate-700">
          <div>
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 mb-2">
              <Link to="/admin" className="hover:underline flex items-center gap-1 text-sm font-medium">
                <ArrowLeft className="w-4 h-4" /> Dashboard
              </Link>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">Kabar Desa</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Publikasi cerita, kegiatan, dan berita terbaru dari desa.</p>
          </div>
          <button
            onClick={openCreateModal}
            className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <Plus className="w-5 h-5" /> Tulis Berita
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-2 rounded-2xl shadow-sm border border-sky-100 dark:border-slate-700">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari judul berita atau penulis..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-slate-700 dark:text-slate-200 transition-shadow"
            />
          </div>
          <div className="hidden sm:block px-4 text-sm font-medium text-slate-500 dark:text-slate-400">
            Total: <span className="text-sky-600 dark:text-sky-400 font-bold">{filteredNews.length}</span> Publikasi
          </div>
        </div>

        {/* Tabel Berita - Clean & Soft UI */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-sky-100 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-sky-50/50 dark:bg-slate-900/50">
                  <th className="py-4 px-6 font-semibold text-slate-600 dark:text-slate-300 border-b border-sky-100 dark:border-slate-700">Judul Berita</th>
                  <th className="py-4 px-6 font-semibold text-slate-600 dark:text-slate-300 border-b border-sky-100 dark:border-slate-700">Penulis</th>
                  <th className="py-4 px-6 font-semibold text-slate-600 dark:text-slate-300 border-b border-sky-100 dark:border-slate-700 text-center">Status</th>
                  <th className="py-4 px-6 font-semibold text-slate-600 dark:text-slate-300 border-b border-sky-100 dark:border-slate-700 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center">
                      <div className="inline-block w-8 h-8 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin"></div>
                    </td>
                  </tr>
                ) : filteredNews.length > 0 ? (
                  filteredNews.map((news) => (
                    <motion.tr 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      key={news.id} 
                      className="group border-b border-sky-50 dark:border-slate-700/50 hover:bg-sky-50/30 dark:hover:bg-slate-700/30 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="font-bold text-slate-800 dark:text-slate-100 mb-1">{news.title}</div>
                        <div className="text-xs text-slate-400 font-mono">{news.slug}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold text-sm uppercase">
                            {news.author.charAt(0)}
                          </div>
                          <span className="font-medium text-slate-700 dark:text-slate-300">{news.author}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
                          news.status === 'published' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' :
                          news.status === 'archive' ? 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300' :
                          'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'
                        }`}>
                          {news.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => openEditModal(news)}
                            className="p-2 bg-sky-100 hover:bg-sky-200 text-sky-600 dark:bg-sky-900/40 dark:text-sky-400 dark:hover:bg-sky-900/80 rounded-xl transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => openDeleteModal(news.id)}
                            className="p-2 bg-rose-100 hover:bg-rose-200 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400 dark:hover:bg-rose-900/80 rounded-xl transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-16 text-center">
                      <div className="text-slate-400 dark:text-slate-500 font-medium">Belum ada berita yang ditemukan.</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Form (Create/Update) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/80 flex items-center justify-between sticky top-0 z-10">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  {selectedNewsId ? <Edit className="w-5 h-5 text-sky-500" /> : <Plus className="w-5 h-5 text-emerald-500" />}
                  {selectedNewsId ? 'Edit Berita' : 'Tulis Berita Baru'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200/50 dark:bg-slate-700 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                  &times;
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                <form id="news-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Judul Berita</label>
                      <input 
                        {...register('title')}
                        onChange={handleTitleChange}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-slate-700 dark:text-slate-200 font-medium transition-shadow" 
                        placeholder="Masukkan judul yang menarik..." 
                      />
                      {errors.title && <p className="text-rose-500 text-xs mt-1.5 font-medium">{errors.title.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Slug URL</label>
                      <input 
                        {...register('slug')}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-slate-500 dark:text-slate-400 font-mono text-sm transition-shadow" 
                        placeholder="otomatis-dari-judul" 
                      />
                      {errors.slug && <p className="text-rose-500 text-xs mt-1.5 font-medium">{errors.slug.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Penulis</label>
                      <input 
                        {...register('author')}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-slate-700 dark:text-slate-200 font-medium transition-shadow" 
                        placeholder="Nama Penulis" 
                      />
                      {errors.author && <p className="text-rose-500 text-xs mt-1.5 font-medium">{errors.author.message}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">URL Thumbnail (Opsional)</label>
                      <input 
                        {...register('thumbnail_url')}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-slate-700 dark:text-slate-200 transition-shadow" 
                        placeholder="https://..." 
                      />
                      {errors.thumbnail_url && <p className="text-rose-500 text-xs mt-1.5 font-medium">{errors.thumbnail_url.message}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Konten Lengkap</label>
                      <textarea 
                        {...register('content')}
                        rows={8}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-slate-700 dark:text-slate-200 transition-shadow resize-none" 
                        placeholder="Tulis isi berita di sini..." 
                      />
                      {errors.content && <p className="text-rose-500 text-xs mt-1.5 font-medium">{errors.content.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Status Publikasi</label>
                      <select 
                        {...register('status')}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-slate-700 dark:text-slate-200 font-medium transition-shadow cursor-pointer appearance-none" 
                      >
                        <option value="draft">Draft (Simpan sementara)</option>
                        <option value="published">Published (Terbitkan)</option>
                        <option value="archive">Archive (Arsipkan)</option>
                      </select>
                      {errors.status && <p className="text-rose-500 text-xs mt-1.5 font-medium">{errors.status.message}</p>}
                    </div>
                  </div>
                </form>
              </div>

              <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/80 flex items-center justify-end gap-3 sticky bottom-0 z-10">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  form="news-form"
                  disabled={createMutation.isPending || updateMutation.isPending}
                  className="px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold shadow-lg shadow-sky-500/30 flex items-center gap-2 transition-all disabled:opacity-50"
                >
                  {(createMutation.isPending || updateMutation.isPending) ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    <>Simpan Publikasi <Send className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsDeleteModalOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-rose-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Hapus Berita?</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">Data yang dihapus tidak dapat dikembalikan. Anda yakin ingin melanjutkan?</p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold transition-colors"
                >
                  Batal
                </button>
                <button 
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending}
                  className="flex-1 px-4 py-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold shadow-lg shadow-rose-500/30 flex items-center justify-center transition-colors disabled:opacity-50"
                >
                  {deleteMutation.isPending ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : 'Hapus'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
