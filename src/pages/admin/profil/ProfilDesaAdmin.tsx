import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save, Image as ImageIcon, Link as LinkIcon, MapPin, Phone, Mail, Globe, Video } from 'lucide-react';
import { useProfile, UpdateProfile } from '@/hooks/useProfile';
import { useSettings } from '@/hooks/useSettings';
import { uploadImage } from '@/utils/storage';
import { ConfirmDialog } from '@/components/admin/ui/ConfirmDialog';
import toast from 'react-hot-toast';

const profileSchema = z.object({
  village_name: z.string().min(3, 'Nama desa minimal 3 karakter'),
  district: z.string().min(3, 'Kecamatan wajib diisi'),
  regency: z.string().min(3, 'Kabupaten wajib diisi'),
  province: z.string().min(3, 'Provinsi wajib diisi'),
  history: z.string().nullable().optional(),
  vision: z.string().nullable().optional(),
  mission: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  email: z.string().email('Email tidak valid').or(z.literal('')).nullable().optional(),
  website: z.string().url('URL tidak valid').or(z.literal('')).nullable().optional(),
  youtube_video_url: z.string().url('URL YouTube tidak valid').or(z.literal('')).nullable().optional(),
  mayor_name: z.string().nullable().optional(),
  mayor_greeting: z.string().nullable().optional(),
  population: z.number().nullable().optional(),
  families: z.number().nullable().optional(),
  area: z.number().nullable().optional(),
  hamlets: z.number().nullable().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilDesaAdmin() {
  const { useFetchProfile, useUpdateProfile } = useProfile();
  const { data: profile, isLoading: isProfileLoading } = useFetchProfile();
  const updateMutation = useUpdateProfile();
  
  const { useFetchSettings, useUpdateSettings } = useSettings();
  const { data: settingsList, isLoading: isSettingsLoading } = useFetchSettings();
  const updateSettingsMutation = useUpdateSettings();

  const historyImageSetting = settingsList?.find(s => s.key === 'history_image')?.value || null;

  const location = useLocation();
  
  const isSejarah = location.pathname.includes('/sejarah');
  const isVisiMisi = location.pathname.includes('/visi-misi');
  const isGeneral = !isSejarah && !isVisiMisi;

  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isUploadingHero, setIsUploadingHero] = useState(false);
  const [isUploadingMayor, setIsUploadingMayor] = useState(false);
  const [isUploadingHistory, setIsUploadingHistory] = useState(false);
  
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{type: 'save' | 'delete_image', field?: string, data?: ProfileFormValues} | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (profile) {
      reset({
        village_name: profile.village_name || '',
        district: profile.district || '',
        regency: profile.regency || '',
        province: profile.province || '',
        history: profile.history || null,
        vision: profile.vision || null,
        mission: profile.mission || null,
        address: profile.address || null,
        phone: profile.phone || null,
        email: profile.email || null,
        website: profile.website || null,
        youtube_video_url: profile.youtube_video_url || null,
        mayor_name: profile.mayor_name || null,
        mayor_greeting: profile.mayor_greeting || null,
        population: profile.population || null,
        families: profile.families || null,
        area: profile.area || null,
        hamlets: profile.hamlets || null,
      });
    }
  }, [profile, reset]);

  const onSubmit = (data: ProfileFormValues) => {
    if (!profile) return;
    setConfirmAction({ type: 'save', data });
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    if (!confirmAction || !profile) return;
    
    if (confirmAction.type === 'save' && confirmAction.data) {
      try {
        const updates = {
          ...confirmAction.data,
          population: confirmAction.data.population ?? undefined,
          families: confirmAction.data.families ?? undefined,
          area: confirmAction.data.area ?? undefined,
          hamlets: confirmAction.data.hamlets ?? undefined,
        };
        await updateMutation.mutateAsync({ id: profile.id, updates });
      } catch (error) {
        // Error handled by hook
      }
    } else if (confirmAction.type === 'delete_image' && confirmAction.field) {
      if (confirmAction.field === 'history_image') {
        await updateSettingsMutation.mutateAsync([{ key: 'history_image', value: '' }]);
      } else {
        await updateMutation.mutateAsync({ id: profile.id, updates: { [confirmAction.field]: null } });
      }
    }
    
    setShowConfirm(false);
    setConfirmAction(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'logo_url' | 'hero_image_url' | 'mayor_photo' | 'history_image') => {
    if (!e.target.files || e.target.files.length === 0 || !profile) return;
    
    const file = e.target.files[0];
    const setUploading = field === 'logo_url' ? setIsUploadingLogo : 
                         field === 'hero_image_url' ? setIsUploadingHero : 
                         field === 'history_image' ? setIsUploadingHistory :
                         setIsUploadingMayor;
    
    setUploading(true);
    try {
      const url = await uploadImage(file, 'profile');
      
      if (field === 'history_image') {
        await updateSettingsMutation.mutateAsync([{ key: 'history_image', value: url }]);
      } else {
        await updateMutation.mutateAsync({ 
          id: profile.id, 
          updates: { [field]: url } 
        });
      }
      
      toast.success(`${field === 'logo_url' ? 'Logo' : field === 'hero_image_url' ? 'Hero Image' : field === 'history_image' ? 'Gambar Sejarah' : 'Foto Kepala Desa'} berhasil diupload!`);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  if (isProfileLoading || isSettingsLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="w-8 h-8 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!profile) {
    return <div className="p-6 text-center text-slate-500">Data profil tidak ditemukan. Pastikan data awal telah di-insert ke database.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
          {isGeneral ? 'Informasi Umum' : isSejarah ? 'Sejarah Desa' : 'Visi & Misi'}
        </h2>
        
        {/* Media Uploads - Only show on general info */}
        {isGeneral && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Logo */}
          <div className="p-4 rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 flex flex-col items-center justify-center text-center gap-4 bg-slate-50 dark:bg-slate-900/50">
            <div className="w-32 h-32 rounded-xl bg-white dark:bg-slate-800 shadow-sm overflow-hidden flex items-center justify-center border border-slate-200 dark:border-slate-700">
              {profile.logo_url ? (
                <img src={profile.logo_url} alt="Logo" className="w-full h-full object-contain p-2" />
              ) : (
                <ImageIcon className="w-8 h-8 text-slate-400" />
              )}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Logo Desa</p>
              <p className="text-xs text-slate-500 mb-3">Format: JPG, PNG, WEBP. Maks 5MB.</p>
              <label className="cursor-pointer bg-sky-100 hover:bg-sky-200 text-sky-600 dark:bg-sky-900/40 dark:text-sky-400 px-4 py-2 rounded-xl text-sm font-bold transition-colors inline-block">
                {isUploadingLogo ? 'Mengunggah...' : 'Pilih Logo'}
                <input type="file" className="hidden" accept="image/jpeg,image/png,image/webp" onChange={(e) => handleImageUpload(e, 'logo_url')} disabled={isUploadingLogo} />
              </label>
              {profile.logo_url && (
                <button
                  type="button"
                  onClick={() => {
                    setConfirmAction({ type: 'delete_image', field: 'logo_url' });
                    setShowConfirm(true);
                  }}
                  className="ml-3 text-sm font-bold text-rose-500 hover:text-rose-600 px-4 py-2"
                >
                  Hapus
                </button>
              )}
            </div>
          </div>


          {/* Mayor Photo */}
          <div className="p-4 rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 flex flex-col items-center justify-center text-center gap-4 bg-slate-50 dark:bg-slate-900/50">
            <div className="w-32 h-32 rounded-xl bg-white dark:bg-slate-800 shadow-sm overflow-hidden flex items-center justify-center border border-slate-200 dark:border-slate-700">
              {profile.mayor_photo ? (
                <img src={profile.mayor_photo} alt="Kepala Desa" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-8 h-8 text-slate-400" />
              )}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Foto Kepala Desa</p>
              <p className="text-xs text-slate-500 mb-3">Format: JPG, PNG, WEBP. Maks 5MB.</p>
              <label className="cursor-pointer bg-sky-100 hover:bg-sky-200 text-sky-600 dark:bg-sky-900/40 dark:text-sky-400 px-4 py-2 rounded-xl text-sm font-bold transition-colors inline-block">
                {isUploadingMayor ? 'Mengunggah...' : 'Pilih Foto Kades'}
                <input type="file" className="hidden" accept="image/jpeg,image/png,image/webp" onChange={(e) => handleImageUpload(e, 'mayor_photo')} disabled={isUploadingMayor} />
              </label>
              {profile.mayor_photo && (
                <button
                  type="button"
                  onClick={() => {
                    setConfirmAction({ type: 'delete_image', field: 'mayor_photo' });
                    setShowConfirm(true);
                  }}
                  className="ml-3 text-sm font-bold text-rose-500 hover:text-rose-600 px-4 py-2"
                >
                  Hapus
                </button>
              )}
            </div>
            </div>
          </div>
        )}

        {/* Text Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {Object.keys(errors).length > 0 && (
            <div className="p-4 bg-rose-50 text-rose-600 rounded-xl text-sm mb-4 border border-rose-200">
              <p className="font-bold mb-1">Tidak dapat menyimpan karena ada isian yang tidak valid:</p>
              <ul className="list-disc pl-5">
                {Object.entries(errors).map(([key, err]) => (
                  <li key={key}>{key}: {err?.message?.toString() || 'Data tidak valid'}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {isGeneral && (
              <>
                <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Nama Desa</label>
              <input {...register('village_name')} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-slate-700 dark:text-slate-200 transition-shadow" />
              {errors.village_name && <p className="text-rose-500 text-xs mt-1">{errors.village_name.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Kecamatan</label>
              <input {...register('district')} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-slate-700 dark:text-slate-200 transition-shadow" />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Kabupaten / Kota</label>
              <input {...register('regency')} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-slate-700 dark:text-slate-200 transition-shadow" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Provinsi</label>
              <input {...register('province')} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-slate-700 dark:text-slate-200 transition-shadow" />
            </div>

              </>
            )}
            
            {isSejarah && (
              <div className="md:col-span-2 space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-4">Gambar Sejarah (Opsional)</label>
                  <div className="flex items-start gap-6 bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <div className="w-48 h-32 rounded-xl bg-white dark:bg-slate-800 shadow-sm overflow-hidden flex items-center justify-center border border-slate-200 dark:border-slate-700 shrink-0">
                      {historyImageSetting ? (
                        <img src={historyImageSetting} alt="Sejarah" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="w-8 h-8 text-slate-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 mb-3">Tambahkan gambar ilustrasi atau foto bersejarah desa. Format: JPG, PNG, WEBP. Maks 5MB.</p>
                      <label className="cursor-pointer bg-sky-100 hover:bg-sky-200 text-sky-600 dark:bg-sky-900/40 dark:text-sky-400 px-4 py-2 rounded-xl text-sm font-bold transition-colors inline-block">
                        {isUploadingHistory ? 'Mengunggah...' : 'Pilih Gambar Sejarah'}
                        <input type="file" className="hidden" accept="image/jpeg,image/png,image/webp" onChange={(e) => handleImageUpload(e, 'history_image')} disabled={isUploadingHistory} />
                      </label>
                      {historyImageSetting && (
                        <button
                          type="button"
                          onClick={() => {
                            setConfirmAction({ type: 'delete_image', field: 'history_image' });
                            setShowConfirm(true);
                          }}
                          className="ml-3 text-sm font-bold text-rose-500 hover:text-rose-600 px-4 py-2"
                        >
                          Hapus
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Teks Sejarah Desa</label>
                  <textarea {...register('history')} rows={15} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-slate-700 dark:text-slate-200 transition-shadow resize-none" />
                </div>
              </div>
            )}

            {isVisiMisi && (
              <>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Visi</label>
                  <textarea {...register('vision')} rows={4} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-slate-700 dark:text-slate-200 transition-shadow resize-none" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Misi</label>
                  <textarea {...register('mission')} rows={8} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-slate-700 dark:text-slate-200 transition-shadow resize-none" />
                </div>
              </>
            )}

            {isGeneral && (
              <>
                <div className="md:col-span-2 pt-4 border-t border-slate-100 dark:border-slate-700">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Informasi Kontak & Lokasi</h3>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2"><MapPin className="w-4 h-4"/> Alamat Lengkap</label>
              <input {...register('address')} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-slate-700 dark:text-slate-200 transition-shadow" />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2"><Phone className="w-4 h-4"/> Telepon / HP</label>
              <input {...register('phone')} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-slate-700 dark:text-slate-200 transition-shadow" />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2"><Mail className="w-4 h-4"/> Email</label>
              <input {...register('email')} type="email" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-slate-700 dark:text-slate-200 transition-shadow" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2"><Globe className="w-4 h-4"/> Website Terkait (Opsional)</label>
              <input {...register('website')} type="url" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-slate-700 dark:text-slate-200 transition-shadow" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2"><Video className="w-4 h-4"/> Link Video YouTube (Opsional)</label>
              <input {...register('youtube_video_url')} type="url" placeholder="Contoh: https://www.youtube.com/watch?v=..." className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-slate-700 dark:text-slate-200 transition-shadow" />
            </div>

            <div className="md:col-span-2 pt-4 border-t border-slate-100 dark:border-slate-700">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Sambutan Kepala Desa</h3>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Nama Kepala Desa</label>
              <input {...register('mayor_name')} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-slate-700 dark:text-slate-200 transition-shadow" placeholder="Nama Lengkap dan Gelar" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Teks Sambutan</label>
              <textarea {...register('mayor_greeting')} rows={4} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-slate-700 dark:text-slate-200 transition-shadow resize-none" placeholder="Tuliskan kata sambutan Kepala Desa di sini..." />
            </div>

            <div className="md:col-span-2 pt-4 border-t border-slate-100 dark:border-slate-700">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Statistik Desa</h3>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Jumlah Penduduk</label>
              <input type="number" {...register('population', { valueAsNumber: true })} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-slate-700 dark:text-slate-200 transition-shadow" />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Jumlah Kepala Keluarga</label>
              <input type="number" {...register('families', { valueAsNumber: true })} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-slate-700 dark:text-slate-200 transition-shadow" />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Luas Wilayah (Hektar)</label>
              <input type="number" step="0.01" {...register('area', { valueAsNumber: true })} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-slate-700 dark:text-slate-200 transition-shadow" />
            </div>
            
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Jumlah Dusun</label>
                  <input type="number" {...register('hamlets', { valueAsNumber: true })} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-slate-700 dark:text-slate-200 transition-shadow" />
                </div>
              </>
            )}

          </div>
          
          <div className="pt-6 flex justify-end">
            <button 
              type="submit" 
              disabled={updateMutation.isPending}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold shadow-lg shadow-emerald-500/30 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {updateMutation.isPending ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <><Save className="w-5 h-5" /> Simpan Perubahan Profil</>
              )}
            </button>
          </div>
        </form>
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        title={confirmAction?.type === 'save' ? "Simpan Perubahan" : "Hapus Gambar"}
        message={confirmAction?.type === 'save' 
          ? "Apakah Anda yakin ingin menyimpan perubahan pada profil desa?" 
          : "Apakah Anda yakin ingin menghapus gambar ini?"}
        onConfirm={handleConfirm}
        onClose={() => setShowConfirm(false)}
        confirmText={confirmAction?.type === 'save' ? "Ya, Simpan" : "Ya, Hapus"}
        cancelText="Batal"
      />
    </div>
  );
}
