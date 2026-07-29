import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save, Image as ImageIcon, Link as LinkIcon, MapPin, Phone, Mail, Globe } from 'lucide-react';
import { useProfile, UpdateProfile } from '@/hooks/useProfile';
import { uploadImage } from '@/utils/storage';
import toast from 'react-hot-toast';

const profileSchema = z.object({
  village_name: z.string().min(3, 'Nama desa minimal 3 karakter'),
  district: z.string().min(3, 'Kecamatan wajib diisi'),
  regency: z.string().min(3, 'Kabupaten wajib diisi'),
  province: z.string().min(3, 'Provinsi wajib diisi'),
  description: z.string().nullable(),
  history: z.string().nullable(),
  vision: z.string().nullable(),
  mission: z.string().nullable(),
  address: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().email('Email tidak valid').or(z.literal('')).nullable(),
  website: z.string().url('URL tidak valid').or(z.literal('')).nullable(),
  mayor_name: z.string().nullable(),
  mayor_greeting: z.string().nullable(),
  population: z.number().nullable(),
  families: z.number().nullable(),
  area: z.number().nullable(),
  hamlets: z.number().nullable(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilDesaAdmin() {
  const { useFetchProfile, useUpdateProfile } = useProfile();
  const { data: profile, isLoading } = useFetchProfile();
  const updateMutation = useUpdateProfile();
  const location = useLocation();
  
  const isSejarah = location.pathname.includes('/sejarah');
  const isVisiMisi = location.pathname.includes('/visi-misi');
  const isGeneral = !isSejarah && !isVisiMisi;

  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isUploadingHero, setIsUploadingHero] = useState(false);
  const [isUploadingMayor, setIsUploadingMayor] = useState(false);

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
        village_name: profile.village_name,
        district: profile.district,
        regency: profile.regency,
        province: profile.province,
        description: profile.description,
        history: profile.history,
        vision: profile.vision,
        mission: profile.mission,
        address: profile.address,
        phone: profile.phone,
        email: profile.email,
        website: profile.website,
        mayor_name: profile.mayor_name,
        mayor_greeting: profile.mayor_greeting,
        population: profile.population,
        families: profile.families,
        area: profile.area,
        hamlets: profile.hamlets,
      });
    }
  }, [profile, reset]);

  const onSubmit = async (data: ProfileFormValues) => {
    if (!profile) return;
    try {
      const updates = {
        ...data,
        population: data.population ?? undefined,
        families: data.families ?? undefined,
        area: data.area ?? undefined,
        hamlets: data.hamlets ?? undefined,
      };
      await updateMutation.mutateAsync({ id: profile.id, updates });
    } catch (error) {
      // Error handled by hook
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'logo_url' | 'hero_image_url' | 'mayor_photo') => {
    if (!e.target.files || e.target.files.length === 0 || !profile) return;
    
    const file = e.target.files[0];
    const setUploading = field === 'logo_url' ? setIsUploadingLogo : field === 'hero_image_url' ? setIsUploadingHero : setIsUploadingMayor;
    
    setUploading(true);
    try {
      const url = await uploadImage(file, 'profile');
      await updateMutation.mutateAsync({ 
        id: profile.id, 
        updates: { [field]: url } 
      });
      toast.success(`${field === 'logo_url' ? 'Logo' : field === 'hero_image_url' ? 'Hero Image' : 'Foto Kepala Desa'} berhasil diupload!`);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  if (isLoading) {
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
            </div>
          </div>

          {/* Hero Image */}
          <div className="p-4 rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 flex flex-col items-center justify-center text-center gap-4 bg-slate-50 dark:bg-slate-900/50">
            <div className="w-full h-32 rounded-xl bg-white dark:bg-slate-800 shadow-sm overflow-hidden flex items-center justify-center border border-slate-200 dark:border-slate-700">
              {profile.hero_image_url ? (
                <img src={profile.hero_image_url} alt="Hero" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-8 h-8 text-slate-400" />
              )}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Banner / Hero Image</p>
              <p className="text-xs text-slate-500 mb-3">Format: JPG, PNG, WEBP. Rekomendasi rasio 16:9. Maks 5MB.</p>
              <label className="cursor-pointer bg-sky-100 hover:bg-sky-200 text-sky-600 dark:bg-sky-900/40 dark:text-sky-400 px-4 py-2 rounded-xl text-sm font-bold transition-colors inline-block">
                {isUploadingHero ? 'Mengunggah...' : 'Pilih Gambar Banner'}
                <input type="file" className="hidden" accept="image/jpeg,image/png,image/webp" onChange={(e) => handleImageUpload(e, 'hero_image_url')} disabled={isUploadingHero} />
              </label>
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
            </div>
            </div>
          </div>
        )}

        {/* Text Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Sejarah Desa</label>
                <textarea {...register('history')} rows={15} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-sky-500 outline-none text-slate-700 dark:text-slate-200 transition-shadow resize-none" />
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
    </div>
  );
}
