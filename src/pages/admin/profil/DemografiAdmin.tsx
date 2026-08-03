import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PageHeader } from '@/components/admin/ui/PageHeader';
import { Users, Save } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';
import { ConfirmDialog } from '@/components/admin/ui/ConfirmDialog';

const demografiSchema = z.object({
  rt: z.number().nullable(),
  demografi_laki: z.number().nullable(),
  demografi_perempuan: z.number().nullable(),
  demografi_pend_belum_sekolah: z.number().nullable(),
  demografi_pend_sd: z.number().nullable(),
  demografi_pend_smp: z.number().nullable(),
  demografi_pend_sma: z.number().nullable(),
  demografi_pend_sarjana: z.number().nullable(),
  demografi_pek_petani: z.number().nullable(),
  demografi_pek_wiraswasta: z.number().nullable(),
  demografi_pek_karyawan: z.number().nullable(),
  demografi_pek_pns: z.number().nullable(),
  demografi_pek_pelajar: z.number().nullable(),
  demografi_pek_lainnya: z.number().nullable(),
});

type DemografiFormValues = z.infer<typeof demografiSchema>;

export default function DemografiAdmin() {
  const { useFetchProfile, useUpdateProfile } = useProfile();
  const { data: profile, isLoading } = useFetchProfile();
  const updateMutation = useUpdateProfile();
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingData, setPendingData] = useState<DemografiFormValues | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DemografiFormValues>({
    resolver: zodResolver(demografiSchema),
  });

  useEffect(() => {
    if (profile) {
      reset({
        rt: profile.rt ?? null,
        demografi_laki: profile.demografi_laki ?? null,
        demografi_perempuan: profile.demografi_perempuan ?? null,
        demografi_pend_belum_sekolah: profile.demografi_pend_belum_sekolah ?? null,
        demografi_pend_sd: profile.demografi_pend_sd ?? null,
        demografi_pend_smp: profile.demografi_pend_smp ?? null,
        demografi_pend_sma: profile.demografi_pend_sma ?? null,
        demografi_pend_sarjana: profile.demografi_pend_sarjana ?? null,
        demografi_pek_petani: profile.demografi_pek_petani ?? null,
        demografi_pek_wiraswasta: profile.demografi_pek_wiraswasta ?? null,
        demografi_pek_karyawan: profile.demografi_pek_karyawan ?? null,
        demografi_pek_pns: profile.demografi_pek_pns ?? null,
        demografi_pek_pelajar: profile.demografi_pek_pelajar ?? null,
        demografi_pek_lainnya: profile.demografi_pek_lainnya ?? null,
      });
    }
  }, [profile, reset]);

  const onSubmit = (data: DemografiFormValues) => {
    if (!profile) return;
    setPendingData(data);
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    if (!profile || !pendingData) return;
    try {
      const updates = {
        rt: pendingData.rt ?? undefined,
        demografi_laki: pendingData.demografi_laki ?? undefined,
        demografi_perempuan: pendingData.demografi_perempuan ?? undefined,
        demografi_pend_belum_sekolah: pendingData.demografi_pend_belum_sekolah ?? undefined,
        demografi_pend_sd: pendingData.demografi_pend_sd ?? undefined,
        demografi_pend_smp: pendingData.demografi_pend_smp ?? undefined,
        demografi_pend_sma: pendingData.demografi_pend_sma ?? undefined,
        demografi_pend_sarjana: pendingData.demografi_pend_sarjana ?? undefined,
        demografi_pek_petani: pendingData.demografi_pek_petani ?? undefined,
        demografi_pek_wiraswasta: pendingData.demografi_pek_wiraswasta ?? undefined,
        demografi_pek_karyawan: pendingData.demografi_pek_karyawan ?? undefined,
        demografi_pek_pns: pendingData.demografi_pek_pns ?? undefined,
        demografi_pek_pelajar: pendingData.demografi_pek_pelajar ?? undefined,
        demografi_pek_lainnya: pendingData.demografi_pek_lainnya ?? undefined,
      };
      await updateMutation.mutateAsync({ id: profile.id, updates });
    } catch (error) {
      // Error is handled by hook
    } finally {
      setShowConfirm(false);
      setPendingData(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!profile) {
    return <div className="p-6 text-center text-slate-500">Data profil tidak ditemukan.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader 
          title="Demografi Desa" 
          description="Kelola data kependudukan dan statistik desa"
          breadcrumbs={[
            { label: 'Admin', path: '/admin' },
            { label: 'Profil', path: '/admin/profil' },
            { label: 'Demografi' }
          ]}
        />
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Wilayah */}
            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 md:col-span-2">
              <h4 className="font-bold text-lg mb-4 text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-slate-600 pb-2">Wilayah Administratif</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Jumlah RT (Rukun Tetangga)</label>
                  <input type="number" {...register('rt', { valueAsNumber: true })} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sky-500 outline-none text-slate-800 dark:text-white" placeholder="Misal: 45" />
                </div>
              </div>
            </div>

            {/* Jenis Kelamin */}
            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-lg mb-4 text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-slate-600 pb-2">Jenis Kelamin</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Laki-laki</label>
                  <input type="number" {...register('demografi_laki', { valueAsNumber: true })} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sky-500 outline-none text-slate-800 dark:text-white" placeholder="Misal: 1250" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Perempuan</label>
                  <input type="number" {...register('demografi_perempuan', { valueAsNumber: true })} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sky-500 outline-none text-slate-800 dark:text-white" placeholder="Misal: 1300" />
                </div>
              </div>
            </div>

            {/* Pendidikan */}
            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
              <h4 className="font-bold text-lg mb-4 text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-slate-600 pb-2">Tingkat Pendidikan</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Belum / Tidak Sekolah</label>
                  <input type="number" {...register('demografi_pend_belum_sekolah', { valueAsNumber: true })} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sky-500 outline-none text-slate-800 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">SD / Sederajat</label>
                  <input type="number" {...register('demografi_pend_sd', { valueAsNumber: true })} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sky-500 outline-none text-slate-800 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">SMP / Sederajat</label>
                  <input type="number" {...register('demografi_pend_smp', { valueAsNumber: true })} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sky-500 outline-none text-slate-800 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">SMA / Sederajat</label>
                  <input type="number" {...register('demografi_pend_sma', { valueAsNumber: true })} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sky-500 outline-none text-slate-800 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Diploma / Sarjana</label>
                  <input type="number" {...register('demografi_pend_sarjana', { valueAsNumber: true })} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sky-500 outline-none text-slate-800 dark:text-white" />
                </div>
              </div>
            </div>

            {/* Pekerjaan */}
            <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 md:col-span-2">
              <h4 className="font-bold text-lg mb-4 text-slate-700 dark:text-slate-200 border-b border-slate-200 dark:border-slate-600 pb-2">Mata Pencaharian</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Petani / Pekebun</label>
                  <input type="number" {...register('demografi_pek_petani', { valueAsNumber: true })} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sky-500 outline-none text-slate-800 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Wiraswasta / Pedagang</label>
                  <input type="number" {...register('demografi_pek_wiraswasta', { valueAsNumber: true })} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sky-500 outline-none text-slate-800 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Karyawan Swasta</label>
                  <input type="number" {...register('demografi_pek_karyawan', { valueAsNumber: true })} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sky-500 outline-none text-slate-800 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">PNS / TNI / POLRI</label>
                  <input type="number" {...register('demografi_pek_pns', { valueAsNumber: true })} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sky-500 outline-none text-slate-800 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Pelajar / Mahasiswa</label>
                  <input type="number" {...register('demografi_pek_pelajar', { valueAsNumber: true })} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sky-500 outline-none text-slate-800 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Lainnya / Belum Bekerja</label>
                  <input type="number" {...register('demografi_pek_lainnya', { valueAsNumber: true })} className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 focus:ring-2 focus:ring-sky-500 outline-none text-slate-800 dark:text-white" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-700">
            <button 
              type="submit" 
              disabled={updateMutation.isPending}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/30 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {updateMutation.isPending ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <><Save className="w-5 h-5" /> Simpan Data Demografi</>
              )}
            </button>
          </div>
        </form>
      </div>
      <ConfirmDialog
        isOpen={showConfirm}
        title="Simpan Data Demografi"
        message="Apakah Anda yakin ingin menyimpan perubahan pada data demografi desa?"
        onConfirm={handleConfirm}
        onClose={() => setShowConfirm(false)}
        confirmText="Ya, Simpan"
        cancelText="Batal"
      />
    </div>
  );
}
