import React from 'react';
import { motion } from 'framer-motion';
import { Recycle, Leaf, Smartphone, TrendingUp, AlertTriangle } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { SEO } from '@/components/ui/SEO';
import { useSettingsContext } from '@/contexts/SettingsContext';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function PengelolaanSampahPage() {
  const { settings } = useSettingsContext();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <SEO
        title="Pengelolaan Sampah - Desa Gosono"
        description="Program Pengelolaan Sampah Masyarakat Desa Gosono"
      />

      <PageHero
        title="Pengelolaan Sampah"
        description="Bersama wujudkan lingkungan yang bersih, asri, dan bernilai guna."
        icon={Recycle}
        backgroundImage={settings.bg_pengelolaan_sampah}
        illustrationUrl={settings.ill_pengelolaan_sampah}
      />

      <div className="container mx-auto px-4 mt-12 max-w-7xl space-y-16">

        {/* Introduction */}
        <motion.section
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 text-center"
          {...fadeIn}
        >
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <Leaf className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Tentang Program Pengelolaan Sampah Masyarakat</h2>
          <p className="text-justify text-gray-600 dark:text-gray-300 leading-relaxed max-w-6xl mx-auto">
            Program Pengelolaan Sampah Masyarakat di Desa Gosono hadir sebagai wujud komitmen nyata kita untuk menjaga kelestarian lingkungan dan kesehatan keluarga. Program inovatif dan multidisiplin ini bukan hanya sekadar membuang sampah pada tempatnya, melainkan tentang <strong>memberdayakan masyarakat</strong>. Tujuan utama kami adalah mengubah cara pandang terhadap sampah—dari barang sisa menjadi produk bernilai guna tinggi, menjaga kebersihan, dan meningkatkan kesejahteraan warga.
          </p>
        </motion.section>

        {/* Waste Sorting Guide */}
        <motion.section {...fadeIn} transition={{ delay: 0.2 }}>
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">Panduan Mudah Memilah Sampah</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Organik */}
            <div className="bg-green-50 dark:bg-green-900/10 rounded-2xl p-6 border border-green-200 dark:border-green-800/30 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-200 dark:bg-green-800 text-green-700 dark:text-green-300 rounded-xl flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-2">Organik (Dapat Terurai)</h3>
              <p className="text-sm text-green-700 dark:text-green-300/80 mb-3 font-medium">Contoh: Sisa makanan, dedaunan, sayuran busuk, kulit buah.</p>
              <p className="text-green-800 dark:text-green-200 text-sm">
                <strong>Cara Kelola:</strong> Kumpulkan untuk diolah kembali menjadi kompos alami penyubur tanaman.
              </p>
            </div>

            {/* Anorganik */}
            <div className="bg-blue-50 dark:bg-blue-900/10 rounded-2xl p-6 border border-blue-200 dark:border-blue-800/30 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-300 rounded-xl flex items-center justify-center mb-4">
                <Recycle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-2">Anorganik (Daur Ulang)</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300/80 mb-3 font-medium">Contoh: Botol plastik, kresek, kardus, kertas, kaleng.</p>
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                <strong>Cara Kelola:</strong> Bersihkan, lipat, dan kumpulkan. Sampah ini memiliki nilai jual dan bisa didaur ulang.
              </p>
            </div>

            {/* B3 */}
            <div className="bg-red-50 dark:bg-red-900/10 rounded-2xl p-6 border border-red-200 dark:border-red-800/30 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-200 dark:bg-red-800 text-red-700 dark:text-red-300 rounded-xl flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-red-900 dark:text-red-100 mb-2">B3 (Bahan Berbahaya)</h3>
              <p className="text-sm text-red-700 dark:text-red-300/80 mb-3 font-medium">Contoh: Baterai bekas, lampu neon, kaleng obat nyamuk.</p>
              <p className="text-red-800 dark:text-red-200 text-sm">
                <strong>Cara Kelola:</strong> Pisahkan dari sampah lain dan buang ke penampungan khusus karena butuh penanganan aman.
              </p>
            </div>
          </div>
        </motion.section>

        {/* QR Code Integration */}
        <motion.section
          className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700"
          {...fadeIn} transition={{ delay: 0.3 }}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center p-8 md:p-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium text-sm mb-6">
                <Smartphone className="w-4 h-4" />
                <span>Inovasi Digital Desa</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Pindai & Pelajari Lebih Lanjut!</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Informasi pengelolaan sampah yang tepat kini ada di genggaman Anda! Desa Gosono menghadirkan sistem <strong>QR Code untuk Panduan Pemilahan Sampah</strong>. Cukup gunakan kamera smartphone Anda untuk mengakses:
              </p>
              <ul className="space-y-3 mb-8">
                {['Basis Data Sampah Digital', 'Poster Edukasi Dwibahasa', 'SOP Pengelolaan Sampah'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                    <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center items-center bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-dashed border-gray-300 dark:border-gray-600">
              <div className="text-center">
                <div className="w-48 h-48 bg-white p-2 rounded-xl shadow-sm mx-auto mb-4 flex items-center justify-center border border-gray-200">
                  {/* Placeholder for QR Code */}
                  <div className="w-full h-full bg-gray-100 border-2 border-gray-300 border-dashed rounded-lg flex items-center justify-center flex-col gap-2">
                    <Smartphone className="w-8 h-8 text-gray-400" />
                    <span className="text-xs text-gray-500 font-medium text-center px-2">Area QR Code akan ditampilkan di sini</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                  Pindai QR Code menggunakan kamera HP Anda
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Financial Value */}
        <motion.section
          className="bg-primary-600 dark:bg-primary-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden"
          {...fadeIn} transition={{ delay: 0.4 }}
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <TrendingUp className="w-48 h-48" />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Daur Ulang Bernilai Jual: Ubah Sampah Jadi Berkah</h2>
            <p className="text-primary-100 mb-6 text-lg leading-relaxed">
              Tahukah Anda bahwa sampah yang dipilah dengan benar bukan lagi kotoran, melainkan <strong>aset</strong>? Sampah anorganik memiliki nilai jual ekonomi yang nyata.
            </p>
            <p className="text-primary-100/80 mb-8">
              Dengan memilah sampah, Anda membuka peluang tambahan penghasilan bagi rumah tangga. Kami juga menyediakan fasilitas <strong>pendampingan pencatatan penjualan sampah</strong>, agar manfaat ekonomi dapat terkelola secara optimal.
            </p>
            <button className="bg-white text-primary-600 hover:bg-primary-50 px-6 py-3 rounded-xl font-semibold transition-colors shadow-sm">
              Mulai Pilah Sampah Sekarang
            </button>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
