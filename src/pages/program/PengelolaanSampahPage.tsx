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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Halo Warga Desa Gosono!</h2>
          <p className="text-justify text-gray-600 dark:text-gray-300 leading-relaxed max-w-6xl mx-auto mb-4">
            Mari bersama-sama kita wujudkan lingkungan yang lebih bersih, sehat, dan asri! Kebersihan lingkungan bermula dari rumah kita sendiri. Melalui pemilahan sampah yang tepat, kita tidak hanya mencegah berbagai penyakit dan pencemaran, namun juga bisa mendatangkan manfaat ekonomi yang nyata bagi kesejahteraan keluarga kita di Desa Gosono.
          </p>
          <p className="text-justify text-gray-600 dark:text-gray-300 leading-relaxed max-w-6xl mx-auto">
            Program Pengelolaan Sampah Masyarakat di Desa Gosono hadir sebagai wujud komitmen nyata kita untuk menjaga kelestarian lingkungan. Tujuan utama kami adalah mengubah cara pandang terhadap sampah—dari barang sisa menjadi produk bernilai guna tinggi.
          </p>
        </motion.section>

        {/* Waste Sorting Guide */}
        <motion.section {...fadeIn} transition={{ delay: 0.2 }}>
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">Panduan Mudah Memilah Sampah</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Tong Hijau */}
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-6 border-2 border-emerald-400 dark:border-emerald-500 hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Leaf className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">Tong Hijau</h3>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Organik</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 font-medium">Isi dengan: Sisa makanan, daun, ranting.</p>
              <div className="bg-emerald-100 dark:bg-emerald-800/50 p-3 rounded-xl">
                <p className="text-emerald-800 dark:text-emerald-200 text-sm font-semibold text-center">
                  ✨ Akan diolah menjadi kompos untuk pertanian!
                </p>
              </div>
            </div>

            {/* Tong Kuning */}
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-6 border-2 border-amber-400 dark:border-amber-500 hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-amber-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <Recycle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-400 mb-2">Tong Kuning</h3>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Anorganik / Daur Ulang</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 font-medium">Isi dengan: Botol plastik, kardus, kaleng.</p>
              <div className="bg-amber-100 dark:bg-amber-800/50 p-3 rounded-xl">
                <p className="text-amber-800 dark:text-amber-200 text-sm font-semibold text-center">
                  💰 Sampah bernilai ekonomis, kumpulkan dan setorkan!
                </p>
              </div>
            </div>

            {/* Tong Merah */}
            <div className="bg-rose-50 dark:bg-rose-900/20 rounded-2xl p-6 border-2 border-rose-400 dark:border-rose-500 hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-rose-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-rose-600 dark:text-rose-400 mb-2">Tong Merah</h3>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">B3 / Berbahaya</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 font-medium">Isi dengan: Baterai, lampu kaca, bekas obat.</p>
              <div className="bg-rose-100 dark:bg-rose-800/50 p-3 rounded-xl">
                <p className="text-rose-800 dark:text-rose-200 text-sm font-semibold text-center">
                  ⚠️ Penanganan khusus agar tidak mencemari lingkungan.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Waste Sorting SOP */}
        <motion.section
          className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700 p-8"
          {...fadeIn} transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-4 mb-8 justify-center">
            <div className="bg-primary-100 dark:bg-primary-900/50 p-3 rounded-full text-primary-600 dark:text-primary-400">
              <Recycle className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">SOP Pemilahan Sampah Praktis</h2>
          </div>
          
          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 text-amber-600 font-bold flex items-center justify-center text-xl">1</div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Bilas Sisa Makanan & Minuman</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Cara mencuci botol plastik atau gelas plastik dari sisa minuman manis sebelum dibuang sangat penting agar tidak menimbulkan bau dan mengundang semut.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-100 text-amber-600 font-bold flex items-center justify-center text-xl">2</div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Remukkan Botol Plastik & Kardus</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Pipihkan atau remukkan botol air mineral dan lipat kardus bekas untuk menghemat ruang di tempat sampah Anda.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 font-bold flex items-center justify-center text-xl">3</div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Sisa Makanan Jadi Kompos</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Jangan campurkan sisa makanan dengan plastik. Pisahkan di kantong berbeda untuk diolah menjadi pupuk alami.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-rose-100 text-rose-600 font-bold flex items-center justify-center text-xl">4</div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Simpan Limbah B3 di Wadah Tertutup</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Kumpulkan baterai bekas, lampu rusak, atau bekas obat di toples/wadah terpisah sebelum dibuang agar racunnya tidak menyebar.</p>
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
