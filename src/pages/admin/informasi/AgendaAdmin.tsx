import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Edit, Trash2, Image as ImageIcon, Calendar as CalendarIcon, MapPin } from 'lucide-react';
import { useAgenda, InsertAgenda } from '@/hooks/useAgenda';
import { Agenda } from '@/models/types';
import { uploadImage } from '@/utils/storage';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const agendaSchema = z.object({
  title: z.string().min(3, 'Judul minimal 3 karakter'),
  description: z.string().nullable(),
  location: z.string().nullable(),
  event_date: z.string().nullable(),
});

type AgendaFormValues = z.infer<typeof agendaSchema>;

export default function AgendaAdmin() {
  const { useFetchAgenda, useCreateAgenda, useUpdateAgenda, useDeleteAgenda } = useAgenda();
  const { data: agendas = [], isLoading } = useFetchAgenda();
  const createMutation = useCreateAgenda();
  const updateMutation = useUpdateAgenda();
  const deleteMutation = useDeleteAgenda();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AgendaFormValues>({
    resolver: zodResolver(agendaSchema),
  });

  const openCreateModal = () => {
    setSelectedId(null);
    setPhotoFile(null);
    setPhotoPreview(null);
    reset({ title: '', description: '', location: '', event_date: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (item: Agenda) => {
    setSelectedId(item.id);
    setPhotoFile(null);
    setPhotoPreview(item.image_url);
    reset({
      title: item.title,
      description: item.description,
      location: item.location,
      event_date: item.event_date ? new Date(item.event_date).toISOString().slice(0, 16) : '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus agenda ini?')) {
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

  const onSubmit = async (data: AgendaFormValues) => {
    try {
      let image_url = photoPreview;

      if (photoFile) {
        image_url = await uploadImage(photoFile, 'agenda');
      }

      const payload: InsertAgenda = {
        title: data.title,
        description: data.description,
        location: data.location,
        event_date: data.event_date ? new Date(data.event_date).toISOString() : null,
        image_url: image_url || null,
      };

      if (selectedId) {
        await updateMutation.mutateAsync({ id: selectedId, updates: payload });
      } else {
        await createMutation.mutateAsync(payload);
      }
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(error.message || 'Gagal menyimpan agenda');
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Agenda Desa</h1>
            <p className="text-slate-500 text-sm mt-1">Kelola jadwal kegiatan dan acara desa.</p>
          </div>
          <button 
            onClick={openCreateModal}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-lg shadow-emerald-500/30"
          >
            <Plus className="w-5 h-5" /> Tambah Agenda
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full py-12 text-center">
              <div className="inline-block w-8 h-8 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
            </div>
          ) : agendas.length > 0 ? (
            agendas.map((item) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={item.id} 
                className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col relative group"
              >
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 z-10">
                  <button onClick={() => openEditModal(item)} className="p-2 bg-sky-100 text-sky-600 hover:bg-sky-200 rounded-lg"><Edit className="w-4 h-4"/></button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 bg-rose-100 text-rose-600 hover:bg-rose-200 rounded-lg"><Trash2 className="w-4 h-4"/></button>
                </div>
                
                <div className="w-full h-40 rounded-xl bg-slate-100 dark:bg-slate-700 mb-4 flex items-center justify-center overflow-hidden">
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <CalendarIcon className="w-10 h-10 text-slate-400" />
                  )}
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3">{item.title}</h3>
                
                <div className="space-y-2 mb-3">
                  {item.event_date && (
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <CalendarIcon className="w-4 h-4 text-emerald-500" />
                      {new Date(item.event_date).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })}
                    </div>
                  )}
                  {item.location && (
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <MapPin className="w-4 h-4 text-rose-500" />
                      {item.location}
                    </div>
                  )}
                </div>
                
                {item.description && <p className="text-sm text-slate-500 mt-2 line-clamp-2">{item.description}</p>}
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-slate-500 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700">
              Belum ada data agenda.
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
                  {selectedId ? 'Edit Agenda' : 'Tambah Agenda'}
                </h2>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 overflow-y-auto space-y-4">
                
                <div className="flex flex-col items-center gap-3 mb-4">
                  <div className="w-full h-40 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-600">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-10 h-10 text-slate-400" />
                    )}
                  </div>
                  <label className="cursor-pointer text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
                    Upload Pamflet / Gambar (Opsional)
                    <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Judul Kegiatan</label>
                  <input {...register('title')} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-emerald-500 text-slate-700 dark:text-slate-200" />
                  {errors.title && <p className="text-rose-500 text-xs mt-1">{errors.title.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Waktu Pelaksanaan</label>
                    <input type="datetime-local" {...register('event_date')} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-emerald-500 text-slate-700 dark:text-slate-200" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Lokasi</label>
                    <input {...register('location')} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-emerald-500 text-slate-700 dark:text-slate-200" placeholder="Contoh: Balai Desa" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Deskripsi Singkat</label>
                  <textarea {...register('description')} rows={3} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-emerald-500 text-slate-700 dark:text-slate-200 resize-none" />
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
