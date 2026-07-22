import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Edit, Trash2, Image as ImageIcon, MapPin } from 'lucide-react';
import { useFacilities, InsertFacility, UpdateFacility } from '@/hooks/useFacilities';
import { Facility } from '@/models/types';
import { uploadImage } from '@/utils/storage';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const facilitySchema = z.object({
  name: z.string().min(3, 'Nama fasilitas minimal 3 karakter'),
  category: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  description: z.string().nullable(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
});

type FacilityFormValues = z.infer<typeof facilitySchema>;

export default function FasilitasAdmin() {
  const { useFetchFacilities, useCreateFacility, useUpdateFacility, useDeleteFacility } = useFacilities();
  const { data: facilities = [], isLoading } = useFetchFacilities();
  const createMutation = useCreateFacility();
  const updateMutation = useUpdateFacility();
  const deleteMutation = useDeleteFacility();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FacilityFormValues>({
    resolver: zodResolver(facilitySchema),
  });

  const openCreateModal = () => {
    setSelectedId(null);
    setPhotoFile(null);
    setPhotoPreview(null);
    reset({ name: '', description: '', latitude: null, longitude: null });
    setIsModalOpen(true);
  };

  const openEditModal = (item: Facility) => {
    setSelectedId(item.id);
    setPhotoFile(null);
    setPhotoPreview(item.image_url);
    reset({
      name: item.name || '',
      category: item.category || undefined,
      address: item.address || undefined,
      description: item.description,
      latitude: item.latitude,
      longitude: item.longitude,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus fasilitas ini?')) {
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

  const onSubmit = async (data: FacilityFormValues) => {
    try {
      let image_url = photoPreview;

      if (photoFile) {
        image_url = await uploadImage(photoFile, 'facilities');
      }

      const payload: InsertFacility = {
        name: data.name,
        category: data.category || null,
        address: data.address || null,
        description: data.description || null,
        latitude: isNaN(Number(data.latitude)) ? null : Number(data.latitude),
        longitude: isNaN(Number(data.longitude)) ? null : Number(data.longitude),
        image_url: image_url || null,
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

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Fasilitas Umum</h1>
            <p className="text-slate-500 text-sm mt-1">Kelola data sarana dan prasarana publik di desa.</p>
          </div>
          <button 
            onClick={openCreateModal}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-lg shadow-emerald-500/30"
          >
            <Plus className="w-5 h-5" /> Tambah Fasilitas
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full py-12 text-center">
              <div className="inline-block w-8 h-8 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
            </div>
          ) : facilities.length > 0 ? (
            facilities.map((item) => (
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
                    <img src={item.image_url} alt={item.name || ''} className="w-full h-full object-cover" />
                  ) : (
                    <MapPin className="w-10 h-10 text-slate-400" />
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{item.name}</h3>
                
                {(item.latitude && item.longitude) ? (
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longitude}`}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-lg mb-3 hover:bg-emerald-100 transition-colors w-max"
                  >
                    <MapPin className="w-3.5 h-3.5" /> Lihat di Peta
                  </a>
                ) : (
                  <span className="inline-block text-xs font-medium text-slate-400 mb-3">Koordinat belum diatur</span>
                )}
                
                {item.description && <p className="text-sm text-slate-500 line-clamp-3 mt-1">{item.description}</p>}
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-slate-500 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700">
              Belum ada data fasilitas umum.
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
                  {selectedId ? 'Edit Fasilitas' : 'Tambah Fasilitas'}
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
                    Upload Foto Fasilitas
                    <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Nama Fasilitas</label>
                  <input {...register('name')} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-emerald-500 text-slate-700 dark:text-slate-200" placeholder="Contoh: Balai Desa, Puskesmas" />
                  {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Latitude (Garis Lintang)</label>
                    <input type="number" step="any" {...register('latitude', { valueAsNumber: true })} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-emerald-500 text-slate-700 dark:text-slate-200" placeholder="Contoh: -7.12345" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Longitude (Garis Bujur)</label>
                    <input type="number" step="any" {...register('longitude', { valueAsNumber: true })} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-emerald-500 text-slate-700 dark:text-slate-200" placeholder="Contoh: 110.12345" />
                  </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 -mt-2">Gunakan Google Maps untuk mendapatkan titik koordinat.</p>

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
