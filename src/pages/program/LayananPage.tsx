import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  Baby, 
  FileMinus, 
  Truck, 
  Home, 
  CreditCard, 
  Users, 
  FolderOpen, 
  Mail, 
  FileSignature, 
  Car, 
  Search,
  BookOpen,
  Download,
  Phone,
  ChevronDown,
  X,
  Briefcase
} from 'lucide-react';
import { PageHero } from '@/components/ui/PageHero';
import { useSettingsContext } from '@/contexts/SettingsContext';
import { desaData } from '@/data/desa';

// Types
type ServiceItem = {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  requirements: string[];
  formName?: string;
  formSub?: string;
};

type ServiceCategory = {
  id: string;
  title: string;
  icon: React.ElementType;
  items: ServiceItem[];
};

export default function LayananPage() {
  const { settings } = useSettingsContext();
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  
  const categories: ServiceCategory[] = [
    {
      id: 'admin-duk',
      title: 'Layanan Administrasi Kependudukan',
      icon: Users,
      items: [
        {
          id: 'akta-kelahiran',
          title: 'Akta Kelahiran',
          icon: Baby,
          color: 'text-rose-500 bg-rose-50',
          requirements: [
            'Surat Keterangan Lahir dari Bidan/Rumah Sakit',
            'Buku Nikah / Akta Perkawinan orang tua',
            'Kartu Keluarga (KK) orang tua',
            'KTP orang tua',
            'KTP 2 orang saksi'
          ],
          formName: 'Formulir Akta Kelahiran',
          formSub: 'F-2.01 Akta Kelahiran.docx'
        },
        {
          id: 'akta-kematian',
          title: 'Akta Kematian',
          icon: FileMinus,
          color: 'text-slate-500 bg-slate-100',
          requirements: [
            'Surat Keterangan Kematian dari RS/Dokter/Desa',
            'KTP asli yang meninggal',
            'Kartu Keluarga (KK) asli yang meninggal',
            'KTP pelapor dan 2 orang saksi'
          ],
          formName: 'Formulir Akta Kematian',
          formSub: 'F-2.29 Akta Kematian.docx'
        },
        {
          id: 'pindah-keluar',
          title: 'Surat Pindah Keluar',
          icon: Truck,
          color: 'text-orange-500 bg-orange-50',
          requirements: [
            'Kartu Keluarga (KK) asli',
            'KTP asli pemohon',
            'Alamat lengkap tujuan pindah',
            'Pas foto 3x4 (2 lembar)'
          ],
          formName: 'Formulir Pindah WNI',
          formSub: 'F-1.03 Formulir Pindah.docx'
        },
        {
          id: 'pindah-datang',
          title: 'Surat Pindah Datang',
          icon: Home,
          color: 'text-emerald-500 bg-emerald-50',
          requirements: [
            'Surat Keterangan Pindah WNI (SKPWNI) dari daerah asal',
            'KTP asli',
            'Kartu Keluarga (KK) yang dituju (jika menumpang)'
          ]
        },
        {
          id: 'ktp',
          title: 'Kartu Tanda Penduduk (KTP)',
          icon: CreditCard,
          color: 'text-blue-500 bg-blue-50',
          requirements: [
            'Telah berusia 17 tahun / sudah menikah',
            'Fotokopi Kartu Keluarga (KK)',
            'Surat Pengantar dari RT/RW'
          ],
          formName: 'Formulir Permohonan KTP',
          formSub: 'F-1.21 Permohonan KTP.docx'
        },
        {
          id: 'kk',
          title: 'Kartu Keluarga (KK)',
          icon: Users,
          color: 'text-purple-500 bg-purple-50',
          requirements: [
            'Buku Nikah / Akta Perkawinan',
            'KTP Suami dan Istri',
            'Surat Keterangan Pindah (bagi penduduk pendatang)'
          ],
          formName: 'Formulir Permohonan KK',
          formSub: 'F-1.15 Permohonan KK.docx'
        },
        {
          id: 'dokumen-lain',
          title: 'Dokumen Pendukung Lainnya',
          icon: FolderOpen,
          color: 'text-amber-500 bg-amber-50',
          requirements: [
            'Persyaratan menyesuaikan dengan jenis dokumen yang diajukan',
            'Membawa KTP asli pemohon',
            'Membawa KK asli'
          ]
        }
      ]
    },
    {
      id: 'surat-umum',
      title: 'Surat Pengantar Umum',
      icon: BookOpen,
      items: [
        {
          id: 'pengantar-umum',
          title: 'Surat Pengantar Umum',
          icon: Mail,
          color: 'text-sky-500 bg-sky-50',
          requirements: [
            'Surat Pengantar dari RT/RW',
            'Fotokopi KTP',
            'Fotokopi Kartu Keluarga (KK)'
          ]
        },
        {
          id: 'sktm',
          title: 'Surat Keterangan Tidak Mampu (SKTM)',
          icon: FileSignature,
          color: 'text-teal-500 bg-teal-50',
          requirements: [
            'Surat Pengantar dari RT/RW',
            'Fotokopi KTP',
            'Fotokopi Kartu Keluarga (KK)',
            'Surat Pernyataan Tidak Mampu yang diketahui RT/RW'
          ]
        },
        {
          id: 'skck',
          title: 'Surat Keterangan Catatan Kepolisian (SKCK)',
          icon: Car,
          color: 'text-indigo-500 bg-indigo-50',
          requirements: [
            'Surat Pengantar dari RT/RW',
            'Fotokopi KTP',
            'Fotokopi Kartu Keluarga (KK)',
            'Fotokopi Akta Kelahiran'
          ]
        },
        {
          id: 'tanpa-data',
          title: 'Surat Tidak Punya Data Kependudukan',
          icon: Search,
          color: 'text-primary-700 bg-primary-50',
          requirements: [
            'Membawa KTP asli (jika ada) atau identitas lain yang dimiliki',
            'Membawa Kartu Keluarga (KK)',
            'Menyertakan keterangan dari RT/RW setempat',
            'Mengisi formulir permohonan di kantor desa',
            'Datang langsung ke kantor desa pada jam pelayanan'
          ],
          formName: 'Formulir Surat Tidak Punya Data Kependudukan',
          formSub: 'F-2.01 Akta Kelahiran 2023.docx'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
      <PageHero 
        title="Layanan Desa"
        description="Administrasi Kependudukan & Surat Pengantar"
        icon={Briefcase}
        backgroundImage={settings.bg_layanan}
      />

      <div className="container mx-auto px-4 max-w-6xl mt-8">
        {/* Service Hours Banner */}
        <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-900/50 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-sm text-primary-900 dark:text-primary-200 shadow-sm mb-10">
          <div className="flex items-center gap-2 font-semibold shrink-0">
            <Clock className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <span>Jam Pelayanan:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span>Senin–Jumat, 08.00–15.00 WIB</span>
            <span className="hidden sm:inline-block text-primary-300 dark:text-primary-700">•</span>
            <span>Kantor {desaData.identitas.nama}, {desaData.identitas.alamat}</span>
          </div>
        </div>

        {/* Layout Split */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Categories */}
          <div className="w-full lg:w-5/12 xl:w-4/12 flex flex-col gap-8">
            {categories.map((category) => (
              <div key={category.id}>
                <h2 className="flex items-center gap-3 font-bold text-slate-800 dark:text-white mb-4 text-lg">
                  <div className="p-2 bg-primary-700 rounded-lg text-white">
                    <category.icon className="w-5 h-5" />
                  </div>
                  {category.title}
                </h2>
                
                <div className="flex flex-col gap-3">
                  {category.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedService(item)}
                      className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                        selectedService?.id === item.id 
                          ? 'border-primary-600 ring-1 ring-primary-600 bg-white dark:bg-slate-800 shadow-md' 
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${item.color}`}>
                          <item.icon className="w-5 h-5" />
                        </div>
                        <span className={`font-semibold text-sm ${selectedService?.id === item.id ? 'text-primary-700 dark:text-primary-400' : 'text-slate-700 dark:text-slate-200'}`}>
                          {item.title}
                        </span>
                      </div>
                      <ChevronDown className={`w-4 h-4 transition-transform ${selectedService?.id === item.id ? 'rotate-180 text-primary-700' : 'text-slate-400'}`} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Details */}
          <div className="w-full lg:w-7/12 xl:w-8/12">
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-primary-100 dark:border-primary-900/30 border-dashed min-h-[500px] relative overflow-hidden transition-all duration-300 sticky top-24">
              <AnimatePresence mode="wait">
                {!selectedService ? (
                  <motion.div 
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                  >
                    <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 rounded-2xl flex items-center justify-center mb-6">
                      <BookOpen className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Pilih Layanan</h3>
                    <p className="text-slate-500 dark:text-slate-400 max-w-sm">
                      Klik salah satu tombol layanan di sebelah kiri untuk melihat syarat dan tata cara pengajuannya.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div 
                    key={selectedService.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col h-full bg-white dark:bg-slate-800 shadow-xl shadow-primary-900/5 rounded-2xl border border-slate-100 dark:border-slate-700 absolute inset-0 overflow-y-auto"
                  >
                    {/* Header */}
                    <div className="bg-primary-700 text-white p-6 relative">
                      <button 
                        onClick={() => setSelectedService(null)}
                        className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                          <selectedService.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-primary-100 text-xs font-semibold tracking-wider uppercase mb-1">Tata Cara Pengajuan</p>
                          <h3 className="text-2xl font-bold leading-tight pr-10">{selectedService.title}</h3>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 md:p-8 space-y-8">
                      {/* Syarat */}
                      <section>
                        <h4 className="flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-white mb-4">
                          <div className="w-6 h-6 rounded-full border-2 border-primary-600 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-primary-600" />
                          </div>
                          Syarat & Dokumen Pendukung
                        </h4>
                        <ul className="space-y-4">
                          {selectedService.requirements.map((req, idx) => (
                            <li key={idx} className="flex gap-4 text-slate-700 dark:text-slate-300">
                              <span className="shrink-0 w-6 h-6 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 text-xs font-bold flex items-center justify-center mt-0.5">
                                {idx + 1}
                              </span>
                              <span className="leading-relaxed">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </section>

                      {/* Formulir */}
                      {selectedService.formName && (
                        <section>
                          <p className="text-xs font-bold tracking-wider text-slate-400 dark:text-slate-500 uppercase mb-3">Formulir yang dibutuhkan</p>
                          <div className="border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
                            <div className="flex items-center gap-4 w-full">
                              <div className="w-10 h-10 bg-primary-700 text-white rounded-lg flex items-center justify-center shrink-0">
                                <FileSignature className="w-5 h-5" />
                              </div>
                              <div className="flex-grow">
                                <h5 className="font-bold text-slate-800 dark:text-white text-sm">{selectedService.formName}</h5>
                                {selectedService.formSub && (
                                  <p className="text-xs text-slate-500 mt-0.5">{selectedService.formSub}</p>
                                )}
                              </div>
                            </div>
                            <button className="w-full sm:w-auto shrink-0 px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                              <Download className="w-4 h-4" /> Unduh
                            </button>
                          </div>
                        </section>
                      )}

                      {/* Bantuan */}
                      <section className="bg-primary-50 dark:bg-primary-900/10 rounded-xl p-5 border border-primary-100 dark:border-primary-900/20">
                        <div className="flex gap-4">
                          <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center shrink-0">
                            <Phone className="w-5 h-5" />
                          </div>
                          <div>
                            <h5 className="font-bold text-slate-800 dark:text-white mb-1">Butuh Bantuan?</h5>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                              Datang langsung ke kantor desa atau hubungi kami pada jam pelayanan untuk informasi lebih lanjut.
                            </p>
                          </div>
                        </div>
                      </section>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
