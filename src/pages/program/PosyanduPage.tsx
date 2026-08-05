import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Activity, Syringe, Heart, MapPin, Phone, AlertTriangle, Stethoscope, Hospital, Info } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { SEO } from '@/components/ui/SEO';
import { useSettingsContext } from '@/contexts/SettingsContext';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

export default function PosyanduPage() {
  const { settings } = useSettingsContext();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
      <SEO
        title="Posyandu & Kesehatan - Desa Gosono"
        description="Informasi Layanan Kesehatan, Posyandu, dan Profil Kesehatan Desa Gosono"
      />

      <PageHero
        title="Kesehatan & Posyandu"
        description="Pusat informasi layanan kesehatan dan profil kesehatan Desa Gosono."
        icon={HeartPulse}
        backgroundImage={settings.bg_posyandu}
        illustrationUrl={settings.ill_posyandu}
      />

      <div className="container mx-auto px-4 mt-12 max-w-7xl space-y-20">

        {/* Pengantar Kesehatan */}
        <motion.section {...fadeIn} className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center shrink-0">
              <Heart className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">Bersama Membangun Desa yang Sehat</h2>
              <div className="space-y-3 text-slate-600 dark:text-slate-300 leading-relaxed text-justify">
                <p>
                  Kesehatan merupakan pilar utama dalam membangun kemajuan dan kesejahteraan masyarakat Desa Gosono. Melalui program kesehatan terpadu dan Posyandu, kami berkomitmen untuk memastikan setiap warga, mulai dari balita hingga lansia, mendapatkan pemantauan dan layanan kesehatan dasar yang layak.
                </p>
                <p>
                  Pos Pelayanan Terpadu (Posyandu) menjadi garda terdepan dalam memantau tumbuh kembang anak, menjaga kesehatan ibu hamil, serta mendampingi lansia agar tetap produktif dan sehat. Peran aktif kader kesehatan dan partisipasi seluruh elemen masyarakat sangatlah penting dalam mewujudkan generasi penerus yang cerdas, kuat, dan tangguh di masa depan.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Profil Kesehatan Desa - Minimalist */}
        <motion.section {...fadeIn}>
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Profil Kesehatan Desa</h2>
              <p className="text-slate-500 dark:text-slate-400">Data dan statistik terkini pelayanan kesehatan di Desa Gosono.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">104</div>
                <div className="text-xs font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400">Balita</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">310</div>
                <div className="text-xs font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400">Lansia</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">8</div>
                <div className="text-xs font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400">Ibu Hamil</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">1.270</div>
                <div className="text-xs font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400">Peserta BPJS</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">6</div>
                <div className="text-xs font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400">Posyandu</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">35</div>
                <div className="text-xs font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400">Kader</div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Fasilitas Pelayanan */}
        <motion.section {...fadeIn}>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Fasilitas Pelayanan</h2>
            <p className="text-slate-600 dark:text-slate-400">Akses layanan kesehatan yang tersedia dan dapat dimanfaatkan oleh warga desa.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Posyandu List */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Posyandu (6 Pos)</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify mb-3">
                Terdapat 6 pos pelayanan terpadu yang diberi nama Pos 1 hingga Pos 6 Mawar Gosono, tersebar di beberapa titik dusun.
              </p>
            </div>

            {/* PKD */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Pos Kesehatan Desa (PKD)</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-3 text-justify">
                Berlokasi di Pucungan, Gosono (Depan Balai Desa Gosono). Melayani pemeriksaan kesehatan dasar warga.
              </p>
              <a href="https://maps.app.goo.gl/zc3zes4xWdVzkFTz5?g_st=aw" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 mt-2">
                <MapPin className="w-4 h-4" /> Lihat Lokasi di Peta
              </a>
            </div>

            {/* Rumah Sakit */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 rounded-xl flex items-center justify-center mb-4">
                <Hospital className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Rumah Sakit Terdekat</h3>
              <p className="font-medium text-slate-800 dark:text-slate-200 text-sm mb-1">RS Karanggede Sisma Medika</p>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 text-justify">
                Jl. Raya Karanggede - Kedungjati Solo KM 1, Dusun 2, Kebonan, Kec. Karanggede.
              </p>
              <div className="flex gap-4">
                <a href="https://wa.me/6282136228747" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700">
                  <Phone className="w-4 h-4" /> Hubungi
                </a>
                <a href="https://maps.app.goo.gl/KXrdnEQyBioYoHXw7?g_st=aw" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700">
                  <MapPin className="w-4 h-4" /> Lokasi
                </a>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Program & Permasalahan */}
        <div className="grid md:grid-cols-2 gap-10">

          <motion.section {...fadeIn}>
            <div className="mb-6 border-b border-slate-200 dark:border-slate-700 pb-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Program Kegiatan</h2>
            </div>
            <ul className="space-y-5">
              <li className="flex gap-4">
                <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Jadwal Posyandu (Balita, Usia Produktif, Lansia)</p>
                  <p className="text-sm text-slate-500">Rutin diselenggarakan setiap bulan.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Kelas Ibu Balita</p>
                  <p className="text-sm text-slate-500">Dilaksanakan sebelum jadwal imunisasi.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Imunisasi</p>
                  <p className="text-sm text-slate-500">Tersedia setiap tanggal 13 setiap bulan.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Kelas Ibu Hamil</p>
                  <p className="text-sm text-slate-500">Tersedia setiap tanggal 15 setiap bulan.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Senam Kesehatan</p>
                  <p className="text-sm text-slate-500">Setiap hari sabtu, satu minggu sekali.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Program Tambahan</p>
                  <p className="text-sm text-slate-500">Program BIAS, Pertemuan Kader Bulanan, dan Pemberian Makanan Tambahan (PMT) setiap hari.</p>
                </div>
              </li>
            </ul>
          </motion.section>

          <motion.section {...fadeIn}>
            <div className="mb-6 border-b border-slate-200 dark:border-slate-700 pb-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Fokus & Tindak Lanjut</h2>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-amber-500" /> Diabetes & Hipertensi
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 pl-6">Mengaktifkan kembali posyandu remaja/lansia dan melakukan screening rutin di setiap pertemuan masyarakat.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-amber-500" /> Bumil Resiko Tinggi (Resti)
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 pl-6">Pendampingan oleh Tim Pendamping Keluarga (TPK), serta kunjungan khusus ke rumah ibu hamil, balita, dan ibu nifas.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-amber-500" /> Tuberculosis (TBC)
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 pl-6">Pendampingan pasien secara langsung dan screening dini di posyandu maupun pertemuan warga desa.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-amber-500" /> Balita Bermasalah Gizi
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 pl-6">Pemberian Makanan Tambahan (PMT), bantuan pemulihan asupan gizi, serta penyuluhan secara intensif.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-amber-500" /> ODGJ
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 pl-6">Pendampingan dan pengawasan berkelanjutan bagi pasien yang tidak berobat secara rutin.</p>
              </div>
            </div>
          </motion.section>

        </div>

        {/* Kontak Darurat Minimalist */}
        <motion.section {...fadeIn}>
          <div className="bg-emerald-600 rounded-3xl p-8 md:p-12 text-center text-white flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left md:max-w-md">
              <h2 className="text-2xl font-bold mb-2">Kontak Darurat Kesehatan</h2>
              <p className="text-emerald-100 text-sm leading-relaxed">
                Segera hubungi tim medis atau bidan desa jika Anda atau keluarga mengalami kondisi darurat yang membutuhkan penanganan medis secepatnya.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <a href="tel:112" className="flex items-center justify-center gap-3 bg-white text-emerald-600 px-6 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-colors">
                <Phone className="w-5 h-5" /> Ambulans (112)
              </a>
              <a href="https://wa.me/6281393148036" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 bg-emerald-700 text-white px-6 py-4 rounded-xl font-bold border border-emerald-500 hover:bg-emerald-800 transition-colors">
                <Syringe className="w-5 h-5" /> WhatsApp Bidan Desa
              </a>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
