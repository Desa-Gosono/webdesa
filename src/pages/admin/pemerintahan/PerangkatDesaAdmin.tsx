import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Edit, Trash2, User } from 'lucide-react';
import { useOfficials, Official, InsertOfficial } from '@/hooks/useOfficials';
import { uploadImage } from '@/utils/storage';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { ConfirmDialog } from '@/components/admin/ui/ConfirmDialog';

const officialSchema = z.object({
  name: z.string().min(3, 'Nama minimal 3 karakter'),
  position: z.string().min(3, 'Jabatan wajib diisi'),
  description: z.string().nullable(),
  phone: z.string().nullable().optional(),
  order_number: z.number().min(0),
});

type OfficialFormValues = z.infer<typeof officialSchema>;

export default function PerangkatDesaAdmin() {
  const { useFetchOfficials, useCreateOfficial, useUpdateOfficial, useDeleteOfficial } = useOfficials();
  const { data: officials = [], isLoading } = useFetchOfficials();
  const createMutation = useCreateOfficial();
  const updateMutation = useUpdateOfficial();
  const deleteMutation = useDeleteOfficial();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOfficialId, setSelectedOfficialId] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{type: 'delete' | 'save', id?: string, data?: OfficialFormValues} | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OfficialFormValues>({
    resolver: zodResolver(officialSchema),
    defaultValues: {
      order_number: 0,
    }
  });

  const openCreateModal = () => {
    setSelectedOfficialId(null);
    setPhotoFile(null);
    setPhotoPreview(null);
    reset({ name: '', position: '', description: '', phone: '', order_number: 0 });
    setIsModalOpen(true);
  };

  const openEditModal = (official: Official) => {
    setSelectedOfficialId(official.id);
    setPhotoFile(null);
    setPhotoPreview(official.photo_url);
    reset({
      name: official.name,
      position: official.position,
      description: official.description,
      phone: official.phone || '',
      order_number: official.order_number,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setConfirmAction({ type: 'delete', id });
    setShowConfirm(true);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data: OfficialFormValues) => {
    setConfirmAction({ type: 'save', data });
    setShowConfirm(true);
  };

  const executeConfirmAction = async () => {
    if (!confirmAction) return;

    try {
      if (confirmAction.type === 'delete' && confirmAction.id) {
        await deleteMutation.mutateAsync(confirmAction.id);
      } else if (confirmAction.type === 'save' && confirmAction.data) {
        const data = confirmAction.data;
        let photo_url = photoPreview; // keep existing if no new file

        if (photoFile) {
          photo_url = await uploadImage(photoFile, 'officials');
        }

        const payload: InsertOfficial = {
          name: data.name,
          position: data.position,
          description: data.description || null,
          phone: data.phone || null,
          order_number: data.order_number,
          photo_url: photo_url || null,
        };

        if (selectedOfficialId) {
          await updateMutation.mutateAsync({ id: selectedOfficialId, updates: payload });
        } else {
          await createMutation.mutateAsync(payload);
        }
        setIsModalOpen(false);
      }
    } catch (error: any) {
      toast.error(error.message || 'Gagal menyimpan data');
    } finally {
      setShowConfirm(false);
      setConfirmAction(null);
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Pemerintahan Desa</h1>
            <p className="text-slate-500 text-sm mt-1">Kelola data kepala desa dan perangkat desa.</p>
          </div>
          <button 
            onClick={openCreateModal}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-lg shadow-emerald-500/30"
          >
            <Plus className="w-5 h-5" /> Tambah Perangkat
          </button>
        </div>

        {/* List Perangkat */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full py-12 text-center">
              <div className="inline-block w-8 h-8 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
            </div>
          ) : officials.length > 0 ? (
            officials.map((official) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={official.id} 
                className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center relative group"
              >
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <button onClick={() => openEditModal(official)} className="p-2 bg-sky-100 text-sky-600 hover:bg-sky-200 rounded-lg"><Edit className="w-4 h-4"/></button>
                  <button onClick={() => handleDelete(official.id)} className="p-2 bg-rose-100 text-rose-600 hover:bg-rose-200 rounded-lg"><Trash2 className="w-4 h-4"/></button>
                </div>
                
                <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-700 mb-4 flex items-center justify-center overflow-hidden border-4 border-emerald-50 dark:border-slate-700">
                  {official.photo_url ? (
                    <img src={official.photo_url} alt={official.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-10 h-10 text-slate-400" />
                  )}
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">{official.name}</h3>
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full text-xs font-bold mt-2">
                  {official.position}
                </span>
                {official.phone && (
                  <div className="mt-3 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    📞 {official.phone}
                  </div>
                )}
                {official.description && <p className="text-sm text-slate-500 mt-3 line-clamp-3">{official.description}</p>}
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 w-full text-xs text-slate-400 font-medium">
                  Urutan: {official.order_number}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-slate-500 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700">
              Belum ada data perangkat desa.
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
              className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                  {selectedOfficialId ? 'Edit Perangkat' : 'Tambah Perangkat'}
                </h2>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                
                <div className="flex flex-col items-center gap-3 mb-6">
                  <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-600">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-10 h-10 text-slate-400" />
                    )}
                  </div>
                  <label className="cursor-pointer text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
                    Upload Foto
                    <input type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Nama Lengkap</label>
                  <input {...register('name')} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-emerald-500 text-slate-700 dark:text-slate-200" />
                  {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Jabatan</label>
                  <input {...register('position')} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-emerald-500 text-slate-700 dark:text-slate-200" placeholder="Contoh: Kepala Desa" />
                  {errors.position && <p className="text-rose-500 text-xs mt-1">{errors.position.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">No. HP / WhatsApp (Opsional)</label>
                  <input {...register('phone')} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-emerald-500 text-slate-700 dark:text-slate-200" placeholder="Contoh: 081234567890" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">No. Urut (Untuk Urutan Tampil)</label>
                  <input type="number" {...register('order_number', { valueAsNumber: true })} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-emerald-500 text-slate-700 dark:text-slate-200" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Deskripsi Singkat</label>
                  <textarea {...register('description')} rows={3} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-emerald-500 text-slate-700 dark:text-slate-200 resize-none" />
                </div>

                <div className="pt-4 flex justify-end gap-3">
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

      <ConfirmDialog
        isOpen={showConfirm}
        title={confirmAction?.type === 'delete' ? "Hapus Perangkat" : "Simpan Perangkat"}
        message={confirmAction?.type === 'delete' 
          ? "Apakah Anda yakin ingin menghapus data perangkat desa ini?" 
          : "Apakah Anda yakin ingin menyimpan data perangkat desa ini?"}
        onConfirm={executeConfirmAction}
        onClose={() => setShowConfirm(false)}
        confirmText={confirmAction?.type === 'delete' ? "Ya, Hapus" : "Ya, Simpan"}
        cancelText="Batal"
      />
    </div>
  );
}
