import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Baby, Users, Calendar, Activity, Syringe, Heart } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { SEO } from '@/components/ui/SEO';
import { useSettingsContext } from '@/contexts/SettingsContext';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function PosyanduPage() {
  const { settings } = useSettingsContext();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <SEO
        title="Posyandu - Desa Gosono"
        description="Program Layanan Kesehatan Posyandu Desa Gosono"
      />

      <PageHero
        title="Posyandu Desa Gosono"
        description="Layanan Kesehatan Ibu dan Anak Terpadu."
        icon={HeartPulse}
        backgroundImage={settings.bg_posyandu}
        illustrationUrl={settings.ill_posyandu}
      />

      <div className="container mx-auto px-4 mt-12 max-w-7xl space-y-16">

        {/* Introduction */}
        <motion.section
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 text-center"
          {...fadeIn}
        >
          <div className="w-16 h-16 bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Pelayanan Kesehatan Terdekat</h2>
          <p className="text-justify text-gray-600 dark:text-gray-300 leading-relaxed max-w-6xl mx-auto">
            Posyandu (Pos Pelayanan Terpadu) merupakan wujud nyata kepedulian Desa Gosono terhadap kesehatan warga. Kami menyediakan akses layanan kesehatan dasar yang mudah dijangkau, dengan fokus utama pada pemantauan tumbuh kembang balita, kesehatan ibu hamil, serta kesejahteraan lansia. Bersama, kita wujudkan masyarakat yang lebih sehat.
          </p>
        </motion.section>

        {/* Layanan Kami */}
        <motion.section {...fadeIn} transition={{ delay: 0.2 }}>
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">Program & Layanan Kami</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Posyandu Balita */}
            <div className="bg-pink-50 dark:bg-pink-900/10 rounded-2xl p-6 border border-pink-200 dark:border-pink-800/30 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-pink-200 dark:bg-pink-800 text-pink-700 dark:text-pink-300 rounded-xl flex items-center justify-center mb-4">
                <Baby className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-pink-900 dark:text-pink-100 mb-2">Posyandu Balita</h3>
              <ul className="text-sm text-pink-800 dark:text-pink-200/80 space-y-2 mt-4 font-medium">
                <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 shrink-0" /> Penimbangan & Pengukuran</li>
                <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 shrink-0" /> Pemberian Imunisasi</li>
                <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 shrink-0" /> Vitamin A & Obat Cacing</li>
                <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 shrink-0" /> Konsultasi Gizi</li>
              </ul>
            </div>

            {/* Posyandu Ibu Hamil */}
            <div className="bg-purple-50 dark:bg-purple-900/10 rounded-2xl p-6 border border-purple-200 dark:border-purple-800/30 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-200 dark:bg-purple-800 text-purple-700 dark:text-purple-300 rounded-xl flex items-center justify-center mb-4">
                <Syringe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-purple-900 dark:text-purple-100 mb-2">Kesehatan Ibu</h3>
              <ul className="text-sm text-purple-800 dark:text-purple-200/80 space-y-2 mt-4 font-medium">
                <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" /> Pemeriksaan Kehamilan</li>
                <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" /> Pemberian Tablet Tambah Darah</li>
                <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" /> Edukasi Menyusui</li>
                <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" /> Pemantauan Nifas</li>
              </ul>
            </div>

            {/* Posyandu Lansia */}
            <div className="bg-teal-50 dark:bg-teal-900/10 rounded-2xl p-6 border border-teal-200 dark:border-teal-800/30 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-teal-200 dark:bg-teal-800 text-teal-700 dark:text-teal-300 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-teal-900 dark:text-teal-100 mb-2">Posyandu Lansia</h3>
              <ul className="text-sm text-teal-800 dark:text-teal-200/80 space-y-2 mt-4 font-medium">
                <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" /> Cek Tekanan Darah</li>
                <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" /> Cek Gula Darah & Kolesterol</li>
                <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" /> Senam Lansia Rutin</li>
                <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" /> Penyuluhan Kesehatan</li>
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Jadwal & Lokasi */}
        <motion.section
          className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700 p-8 md:p-12"
          {...fadeIn} transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/3 bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 text-center">
              <Calendar className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Jadwal Rutin</h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Diselenggarakan Setiap Bulan</p>
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Informasi Jadwal & Lokasi</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Kegiatan Posyandu dilaksanakan secara rutin setiap bulannya yang tersebar di beberapa titik dusun atau RT/RW untuk memudahkan akses warga. Untuk mengetahui jadwal pasti pada bulan ini, silakan hubungi kader Posyandu di lingkungan Anda atau ikuti pembaruan informasi di grup WhatsApp desa.
              </p>
              <div className="inline-flex items-start gap-3 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 px-5 py-4 rounded-xl text-sm font-semibold border border-yellow-200 dark:border-yellow-800/50">
                <Activity className="w-5 h-5 shrink-0 mt-0.5" />
                <span>Penting: Bawa selalu Buku KIA (Kesehatan Ibu dan Anak) Anda setiap kali berkunjung ke Posyandu.</span>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
