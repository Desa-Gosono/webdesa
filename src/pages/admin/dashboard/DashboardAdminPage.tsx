import React from 'react';
import { PageHeader } from '@/components/admin/ui/PageHeader';
import { 
  Newspaper, 
  Image as ImageIcon, 
  Calendar, 
  Store, 
  MapPin, 
  Users 
} from 'lucide-react';
import {
  useBerita,
  useGaleriFoto,
  useAgenda,
  usePotensi,
  usePerangkatDesa,
} from '@/hooks/useAdmin';
import { motion } from 'framer-motion';

export default function DashboardAdminPage() {
  const { useGetAll: useGetAllBerita } = useBerita();
  const { useGetAll: useGetAllGaleri } = useGaleriFoto();
  const { useGetAll: useGetAllAgenda } = useAgenda();
  const { useGetAll: useGetAllPotensi } = usePotensi();
  const { useGetAll: useGetAllPerangkat } = usePerangkatDesa();

  const { data: beritaData = [] } = useGetAllBerita();
  const { data: galeriData = [] } = useGetAllGaleri();
  const { data: agendaData = [] } = useGetAllAgenda();
  const { data: potensiData = [] } = useGetAllPotensi();
  const { data: perangkatData = [] } = useGetAllPerangkat();

  const umkmCount = potensiData.filter(p => p.kategori === 'UMKM').length;

  const stats = [
    {
      title: 'Jumlah Berita',
      value: beritaData.length,
      icon: Newspaper,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      title: 'Jumlah Galeri',
      value: galeriData.length,
      icon: ImageIcon,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-600 dark:text-purple-400',
    },
    {
      title: 'Jumlah Agenda',
      value: agendaData.length,
      icon: Calendar,
      color: 'bg-amber-500',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
      textColor: 'text-amber-600 dark:text-amber-400',
    },
    {
      title: 'Jumlah UMKM',
      value: umkmCount,
      icon: Store,
      color: 'bg-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400',
    },
    {
      title: 'Jumlah Potensi',
      value: potensiData.length,
      icon: MapPin,
      color: 'bg-rose-500',
      bgColor: 'bg-rose-50 dark:bg-rose-900/20',
      textColor: 'text-rose-600 dark:text-rose-400',
    },
    {
      title: 'Perangkat Desa',
      value: perangkatData.length,
      icon: Users,
      color: 'bg-indigo-500',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      textColor: 'text-indigo-600 dark:text-indigo-400',
    },
  ];

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Selamat datang di panel administrasi Website Desa Gosono."
        breadcrumbs={[{ label: 'Dashboard' }]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.bgColor}`}>
              <stat.icon className={`w-7 h-7 ${stat.textColor}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-slate-400">{stat.title}</p>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Informasi Sistem</h3>
        <div className="prose dark:prose-invert max-w-none text-sm text-gray-600 dark:text-slate-400">
          <p>
            Dashboard Admin ini digunakan untuk mengelola seluruh konten pada website profil Desa Gosono. 
            Semua perubahan yang Anda lakukan di sini akan langsung terlihat pada halaman publik website.
          </p>
          <ul className="mt-2 space-y-1">
            <li>Gunakan menu di samping kiri untuk bernavigasi ke berbagai modul.</li>
            <li>Pastikan Anda menyimpan perubahan setiap kali menambah atau mengedit data.</li>
            <li>Fitur statistik di atas menampilkan jumlah data aktif di dalam sistem.</li>
          </ul>
        </div>
      </div>
    </>
  );
}
