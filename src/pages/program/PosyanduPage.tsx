import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Activity, Syringe, Heart, MapPin, Phone, AlertTriangle, Stethoscope, Hospital, Info } from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { SEO } from '@/components/ui/SEO';
import { useSettingsContext } from '@/contexts/SettingsContext';
import { useDynamicCrud } from '@/hooks/useDynamicCrud';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

export default function PosyanduPage() {
  const { settings } = useSettingsContext();
  const { useFetchAll } = useDynamicCrud('health_stats');
  const { data: healthStats, isLoading } = useFetchAll();

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

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {isLoading ? (
                <div className="col-span-full text-center py-10 text-slate-500 animate-pulse">Memuat data statistik yang menakjubkan...</div>
              ) : healthStats && healthStats.length > 0 ? (
                healthStats.map((stat: any) => (
                  <motion.div 
                    key={stat.id} 
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group relative overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300 border border-emerald-100 dark:border-emerald-800/50"
                  >
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
                    <div className="relative z-10">
                      <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 mb-2 drop-shadow-sm">{stat.value}</div>
                      <div className="text-sm font-bold tracking-widest uppercase text-emerald-800/70 dark:text-emerald-200/70">{stat.name}</div>
                    </div>
                  </motion.div>
                ))
              ) : (
                [
                  { value: '104', name: 'Balita' },
                  { value: '310', name: 'Lansia' },
                  { value: '8', name: 'Ibu Hamil' },
                  { value: '1.270', name: 'Peserta BPJS' },
                  { value: '6', name: 'Posyandu' },
                  { value: '35', name: 'Kader' },
                ].map((stat, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group relative overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300 border border-emerald-100 dark:border-emerald-800/50"
                  >
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
                    <div className="relative z-10">
                      <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 mb-2 drop-shadow-sm">{stat.value}</div>
                      <div className="text-sm font-bold tracking-widest uppercase text-emerald-800/70 dark:text-emerald-200/70">{stat.name}</div>
                    </div>
                  </motion.div>
                ))
              )}
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
            <motion.div whileHover={{ y: -5 }} className="group bg-white/70 backdrop-blur-xl dark:bg-slate-800/70 p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-800">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                <Activity className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Posyandu (6 Pos)</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-justify mb-3">
                Terdapat 6 pos pelayanan terpadu yang diberi nama Pos 1 hingga Pos 6 Mawar Gosono, tersebar di beberapa titik dusun strategis untuk memudahkan akses warga.
              </p>
            </motion.div>

            {/* PKD */}
            <motion.div whileHover={{ y: -5 }} className="group bg-white/70 backdrop-blur-xl dark:bg-slate-800/70 p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-800">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                <Stethoscope className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Pos Kesehatan Desa (PKD)</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 text-justify leading-relaxed">
                Berlokasi di Pucungan, Gosono (Depan Balai Desa Gosono). Siap melayani pemeriksaan kesehatan dasar warga setiap hari kerja.
              </p>
              <a href="https://maps.app.goo.gl/zc3zes4xWdVzkFTz5?g_st=aw" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/30 text-sm font-bold text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-800/50 transition-colors">
                <MapPin className="w-4 h-4" /> Lihat di Peta
              </a>
            </motion.div>

            {/* Rumah Sakit */}
            <motion.div whileHover={{ y: -5 }} className="group bg-white/70 backdrop-blur-xl dark:bg-slate-800/70 p-8 rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700 hover:border-emerald-200 dark:hover:border-emerald-800">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                <Hospital className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Rumah Sakit Terdekat</h3>
              <p className="font-semibold text-emerald-600 dark:text-emerald-400 text-sm mb-2">RS Karanggede Sisma Medika</p>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-6 text-justify leading-relaxed">
                Jl. Raya Karanggede - Kedungjati Solo KM 1, Dusun 2, Kebonan, Kec. Karanggede.
              </p>
              <div className="flex gap-3">
                <a href="https://wa.me/6282136228747" target="_blank" rel="noreferrer" className="flex-1 inline-flex justify-center items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white text-sm font-bold rounded-lg hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-600/20">
                  <Phone className="w-4 h-4" /> Hubungi
                </a>
                <a href="https://maps.app.goo.gl/KXrdnEQyBioYoHXw7?g_st=aw" target="_blank" rel="noreferrer" className="flex-1 inline-flex justify-center items-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                  <MapPin className="w-4 h-4" /> Lokasi
                </a>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Program & Permasalahan */}
        <div className="grid md:grid-cols-2 gap-10">

          <motion.section {...fadeIn}>
            <div className="mb-6 border-b border-slate-200 dark:border-slate-700 pb-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Program Kegiatan</h2>
            </div>
            <div className="grid gap-4">
              {[
                { title: 'Jadwal Posyandu', desc: 'Rutin diselenggarakan setiap bulan untuk Balita, Usia Produktif, dan Lansia.' },
                { title: 'Kelas Ibu Balita', desc: 'Dilaksanakan sebelum jadwal imunisasi untuk edukasi tumbuh kembang anak.' },
                { title: 'Imunisasi', desc: 'Tersedia setiap tanggal 13 setiap bulan di Pos Kesehatan Desa.' },
                { title: 'Kelas Ibu Hamil', desc: 'Tersedia setiap tanggal 15 setiap bulan untuk memantau kesehatan kandungan.' },
                { title: 'Senam Kesehatan', desc: 'Setiap hari sabtu, satu minggu sekali bersama warga desa.' },
                { title: 'Program Tambahan', desc: 'Program BIAS, Pertemuan Kader, dan Pemberian Makanan Tambahan (PMT) rutin.' },
              ].map((prog, idx) => (
                <div key={idx} className="group flex items-start gap-4 bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 hover:border-emerald-200 dark:hover:border-emerald-800">
                  <div className="mt-1 w-3 h-3 rounded-full bg-emerald-500 group-hover:scale-150 transition-transform shadow-sm shadow-emerald-500/50 shrink-0" />
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-200 mb-1">{prog.title}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{prog.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section {...fadeIn}>
            <div className="mb-6 border-b border-slate-200 dark:border-slate-700 pb-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Fokus & Tindak Lanjut</h2>
            </div>
            <div className="grid gap-5">
              {[
                { title: 'Diabetes & Hipertensi', desc: 'Mengaktifkan kembali posyandu remaja/lansia dan melakukan screening rutin di setiap pertemuan masyarakat.' },
                { title: 'Bumil Resiko Tinggi (Resti)', desc: 'Pendampingan oleh Tim Pendamping Keluarga (TPK), serta kunjungan khusus ke rumah ibu hamil, balita, dan ibu nifas.' },
                { title: 'Tuberculosis (TBC)', desc: 'Pendampingan pasien secara langsung dan screening dini di posyandu maupun pertemuan warga desa.' },
                { title: 'Balita Bermasalah Gizi', desc: 'Pemberian Makanan Tambahan (PMT), bantuan pemulihan asupan gizi, serta penyuluhan secara intensif.' },
                { title: 'ODGJ', desc: 'Pendampingan dan pengawasan berkelanjutan bagi pasien yang tidak berobat secara rutin bersama dinas sosial.' },
              ].map((issue, idx) => (
                <div key={idx} className="bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-500 p-5 rounded-r-2xl hover:bg-amber-100/80 dark:hover:bg-amber-900/20 transition-colors">
                  <h3 className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" /> {issue.title}
                  </h3>
                  <p className="text-sm text-amber-800/80 dark:text-amber-200/70 pl-7 leading-relaxed">{issue.desc}</p>
                </div>
              ))}
            </div>
          </motion.section>

        </div>

        {/* Kontak Darurat Premium */}
        <motion.section {...fadeIn}>
          <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 rounded-[2.5rem] p-10 md:p-14 text-white shadow-2xl shadow-emerald-900/20 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[150%] bg-white/10 rotate-12 blur-3xl rounded-full"></div>
              <div className="absolute top-[60%] -right-[10%] w-[40%] h-[100%] bg-emerald-300/20 -rotate-12 blur-3xl rounded-full"></div>
            </div>

            <div className="text-left md:max-w-xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-wider uppercase mb-6 text-emerald-50 border border-white/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                Siaga 24/7
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">Butuh Bantuan Medis<br/>Darurat?</h2>
              <p className="text-emerald-100 text-lg leading-relaxed opacity-90">
                Jangan ragu. Tim medis dan bidan Desa Gosono siap siaga untuk membantu kondisi darurat Anda secepatnya.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto relative z-10 shrink-0">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="tel:112" 
                className="flex items-center justify-center gap-3 bg-white text-emerald-700 px-8 py-5 rounded-2xl font-bold shadow-xl shadow-black/10 hover:shadow-2xl transition-all"
              >
                <Phone className="w-6 h-6 animate-pulse text-red-500" /> Hubungi Ambulans
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/6281393148036" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center justify-center gap-3 bg-emerald-800/40 backdrop-blur-md text-white px-8 py-5 rounded-2xl font-bold border border-white/20 hover:bg-emerald-800/60 transition-all"
              >
                <Syringe className="w-6 h-6" /> WhatsApp Bidan
              </motion.a>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
