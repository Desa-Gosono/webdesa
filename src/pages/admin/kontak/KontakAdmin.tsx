import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Phone, MapPin, Mail, Save, Code } from 'lucide-react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { useContacts, InsertContact } from '@/hooks/useContacts';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const contactSchema = z.object({
  address: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().email('Format email tidak valid').or(z.literal('')).nullable(),
  facebook: z.string().url('URL tidak valid').or(z.literal('')).nullable(),
  instagram: z.string().url('URL tidak valid').or(z.literal('')).nullable(),
  youtube: z.string().url('URL tidak valid').or(z.literal('')).nullable(),
  whatsapp: z.string().nullable(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function KontakAdmin() {
  const { useFetchContacts, useCreateContact, useUpdateContact } = useContacts();
  const { data: contacts = [], isLoading } = useFetchContacts();
  const createMutation = useCreateContact();
  const updateMutation = useUpdateContact();

  const [currentId, setCurrentId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    if (contacts.length > 0) {
      const contact = contacts[0];
      setCurrentId(contact.id);
      reset({
        address: contact.address || '',
        phone: contact.phone || '',
        email: contact.email || '',
        facebook: contact.facebook || '',
        instagram: contact.instagram || '',
        youtube: contact.youtube || '',
        whatsapp: contact.whatsapp || '',
      });
    }
  }, [contacts, reset]);

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const payload: InsertContact = {
        address: data.address || null,
        phone: data.phone || null,
        email: data.email || null,
        facebook: data.facebook || null,
        instagram: data.instagram || null,
        youtube: data.youtube || null,
        whatsapp: data.whatsapp || null,
      };

      if (currentId) {
        await updateMutation.mutateAsync({ id: currentId, updates: payload });
      } else {
        await createMutation.mutateAsync(payload);
      }
    } catch (error: any) {
      toast.error(error.message || 'Gagal menyimpan kontak');
    }
  };

  if (isLoading) {
    return (
      <div className="bg-slate-50 dark:bg-slate-900 min-h-screen p-6 flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Kontak Desa</h1>
          <p className="text-slate-500 text-sm mt-1">Kelola informasi kontak dan sosial media resmi desa.</p>
        </div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit(onSubmit)} 
          className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-700 space-y-8"
        >
          {/* Informasi Dasar */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-2">
              <Phone className="w-5 h-5 text-emerald-500" /> Informasi Dasar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-2"><MapPin className="w-4 h-4" /> Alamat Kantor Desa</label>
                <textarea {...register('address')} rows={3} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-emerald-500 text-slate-700 dark:text-slate-200 resize-none" placeholder="Jalan Raya Desa Gosono No. 1..." />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-2"><Phone className="w-4 h-4" /> Nomor Telepon / WA</label>
                <input {...register('phone')} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-emerald-500 text-slate-700 dark:text-slate-200" placeholder="08123456789" />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-2"><Mail className="w-4 h-4" /> Email Resmi</label>
                <input type="email" {...register('email')} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-emerald-500 text-slate-700 dark:text-slate-200" placeholder="pemdes@gosono.desa.id" />
                {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
            </div>
          </div>

          {/* Media Sosial */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-2">
              <FaFacebook className="w-5 h-5 text-blue-500" /> Media Sosial
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-2"><FaFacebook className="w-4 h-4 text-blue-500" /> Facebook</label>
                <input {...register('facebook')} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-emerald-500 text-slate-700 dark:text-slate-200" placeholder="https://facebook.com/..." />
                {errors.facebook && <p className="text-rose-500 text-xs mt-1">{errors.facebook.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-2"><FaInstagram className="w-4 h-4 text-pink-500" /> Instagram</label>
                <input {...register('instagram')} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-emerald-500 text-slate-700 dark:text-slate-200" placeholder="https://instagram.com/..." />
                {errors.instagram && <p className="text-rose-500 text-xs mt-1">{errors.instagram.message}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-2"><FaYoutube className="w-4 h-4 text-red-500" /> YouTube Channel</label>
                <input {...register('youtube')} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-emerald-500 text-slate-700 dark:text-slate-200" placeholder="https://youtube.com/c/..." />
                {errors.youtube && <p className="text-rose-500 text-xs mt-1">{errors.youtube.message}</p>}
              </div>
            </div>
          </div>

          {/* Peta Iframe */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-2">
              <Code className="w-5 h-5 text-orange-500" /> Google Maps (Iframe)
            </h2>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">HTML Iframe Embed</label>
              <textarea {...register('whatsapp')} rows={4} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-emerald-500 text-slate-700 dark:text-slate-200 font-mono text-sm" placeholder='<iframe src="https://www.google.com/maps/embed?..." width="600" height="450" ...></iframe>' />
              <p className="text-xs text-slate-500 mt-2">Buka Google Maps, cari lokasi desa, klik Bagikan - Sematkan Peta, lalu copy HTML-nya kesini.</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-end">
            <button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 disabled:opacity-50 flex items-center gap-2 transition-all">
              <Save className="w-5 h-5" /> Simpan Perubahan
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
