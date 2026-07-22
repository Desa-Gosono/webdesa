import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Edit, Trash2, Image as ImageIcon, Video, Link as LinkIcon, PlayCircle } from 'lucide-react';
import { useGallery, InsertGallery } from '@/hooks/useGallery';
import { Gallery } from '@/models/types';
import { uploadImage } from '@/utils/storage';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const gallerySchema = z.object({
  title: z.string().nullable(),
  category: z.string().nullable(),
  description: z.string().nullable(),
  media_type: z.enum(['image', 'video']),
  video_url: z.string().url('URL video tidak valid').or(z.literal('')).nullable(),
});

type GalleryFormValues = z.infer<typeof gallerySchema>;

export default function GalleryAdmin() {
  const { useFetchGallery, useCreateGallery, useUpdateGallery, useDeleteGallery } = useGallery();
  const { data: items = [], isLoading } = useFetchGallery();
  const createMutation = useCreateGallery();
  const updateMutation = useUpdateGallery();
  const deleteMutation = useDeleteGallery();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<GalleryFormValues>({
    resolver: zodResolver(gallerySchema),
    defaultValues: { media_type: 'image' }
  });

  const mediaType = watch('media_type');

  const openCreateModal = () => {
    setSelectedId(null);
    setPhotoFile(null);
    setPhotoPreview(null);
    reset({ title: '', category: 'Kegiatan', description: '', media_type: 'image', video_url: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (item: Gallery) => {
    setSelectedId(item.id);
    setPhotoFile(null);
    setPhotoPreview(item.media_type === 'image' ? item.media_url : null);
    reset({
      title: item.title,
      category: item.category,
      description: item.description,
      media_type: item.media_type,
      video_url: item.media_type === 'video' ? item.media_url : '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus media ini?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: GalleryFormValues) => {
    try {
      let media_url = '';

      if (data.media_type === 'video') {
        if (!data.video_url) throw new Error('URL Video wajib diisi');
        media_url = data.video_url;
      } else {
        if (!photoFile && !photoPreview) throw new Error('Gambar wajib diupload');
        if (photoFile) {
          media_url = await uploadImage(photoFile, 'gallery');
        } else if (photoPreview) {
          media_url = photoPreview; // existing image
        }
      }

      const payload: InsertGallery = {
        title: data.title || null,
        category: data.category || null,
        description: data.description || null,
        media_type: data.media_type,
        media_url: media_url,
      };

      if (selectedId) {
        await updateMutation.mutateAsync({ id: selectedId, updates: payload });
      } else {
        await createMutation.mutateAsync(payload);
      }
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(error.message || 'Gagal menyimpan data');
    }
  };

  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Galeri Desa</h1>
            <p className="text-slate-500 text-sm mt-1">Kelola foto dan video dokumentasi desa.</p>
          </div>
          <button 
            onClick={openCreateModal}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-lg shadow-emerald-500/30"
          >
            <Plus className="w-5 h-5" /> Tambah Media
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full py-12 text-center">
              <div className="inline-block w-8 h-8 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
            </div>
          ) : items.length > 0 ? (
            items.map((item) => (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                key={item.id} 
                className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 relative group flex flex-col"
              >
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 z-20">
                  <button onClick={() => openEditModal(item)} className="p-2 bg-sky-100 text-sky-600 hover:bg-sky-200 rounded-lg backdrop-blur-md"><Edit className="w-4 h-4"/></button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 bg-rose-100 text-rose-600 hover:bg-rose-200 rounded-lg backdrop-blur-md"><Trash2 className="w-4 h-4"/></button>
                </div>
                
                <div className="w-full h-48 bg-slate-100 dark:bg-slate-700 relative flex items-center justify-center">
                  {item.media_type === 'image' ? (
                    <img src={item.media_url} alt={item.title || 'Gallery Image'} className="w-full h-full object-cover" />
                  ) : (
                    <div className="relative w-full h-full">
                      {getYouTubeId(item.media_url) ? (
                        <img src={`https://img.youtube.com/vi/${getYouTubeId(item.media_url)}/hqdefault.jpg`} className="w-full h-full object-cover" alt="Video Thumbnail" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-800"><Video className="w-12 h-12 text-slate-500" /></div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <PlayCircle className="w-12 h-12 text-white/80" />
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                    {item.media_type === 'video' ? <Video className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                    {item.category || item.media_type}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{item.title || 'Tanpa Judul'}</h3>
                  {item.description && <p className="text-sm text-slate-500 line-clamp-2">{item.description}</p>}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-slate-500 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700">
              Belum ada media di galeri.
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 shrink-0">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                  {selectedId ? 'Edit Media' : 'Tambah Media'}
                </h2>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 overflow-y-auto space-y-5">
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Tipe Media</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="image" {...register('media_type')} className="text-emerald-500 focus:ring-emerald-500" />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Gambar (Foto)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="video" {...register('media_type')} className="text-emerald-500 focus:ring-emerald-500" />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Video (YouTube)</span>
                    </label>
                  </div>
                </div>

                {mediaType === 'image' ? (
                  <div className="flex flex-col items-center gap-3 bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <div className="w-full h-40 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                      {photoPreview ? (
                        <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-10 h-10 text-slate-400" />
                      )}
                    </div>
                    <label className="cursor-pointer bg-sky-100 hover:bg-sky-200 text-sky-600 dark:bg-sky-900/40 dark:text-sky-400 px-4 py-2 rounded-xl text-sm font-bold transition-colors">
                      Pilih Gambar
                      <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
                    </label>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-2"><LinkIcon className="w-4 h-4" /> Link Video (YouTube)</label>
                    <input {...register('video_url')} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-emerald-500 text-slate-700 dark:text-slate-200" placeholder="https://youtube.com/watch?v=..." />
                    {errors.video_url && <p className="text-rose-500 text-xs mt-1">{errors.video_url.message}</p>}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Kategori</label>
                  <input {...register('category')} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-emerald-500 text-slate-700 dark:text-slate-200" placeholder="Contoh: Kegiatan, Pembangunan, Wisata" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Judul (Opsional)</label>
                  <input {...register('title')} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-emerald-500 text-slate-700 dark:text-slate-200" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Deskripsi Singkat (Opsional)</label>
                  <textarea {...register('description')} rows={2} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-emerald-500 text-slate-700 dark:text-slate-200 resize-none" />
                </div>

                <div className="pt-4 flex justify-end gap-3 sticky bottom-0 bg-white dark:bg-slate-800 pb-2">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-slate-600 font-bold hover:bg-slate-100 rounded-xl transition-colors">Batal</button>
                  <button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 disabled:opacity-50">
                    Simpan
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
