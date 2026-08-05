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
  formLink?: string;
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
      id: 'surat-keterangan',
      title: 'Surat Keterangan',
      icon: FileSignature,
      items: [
        {
          id: 'sk-domisili-tinggal',
          title: 'Keterangan Domisili Tempat Tinggal',
          icon: Home,
          color: 'text-blue-500 bg-blue-50',
          requirements: [
            'Fotokopi KTP',
            'Fotokopi Kartu Keluarga (KK)',
            'Surat Pengantar dari RT/RW'
          ],
          formName: 'Template Surat',
          formSub: 'surat keterangan domisili tempat tinggal.docx',
          formLink: 'https://docs.google.com/document/d/1gIZds03Sj2Yziom8Pk9iX2cgAPnufdaC/edit?usp=drive_link&ouid=111677914652829227106&rtpof=true&sd=true'
        },
        {
          id: 'sk-domisili-usaha',
          title: 'Keterangan Domisili Usaha',
          icon: Briefcase,
          color: 'text-amber-500 bg-amber-50',
          requirements: [
            'Fotokopi KTP Pemohon',
            'Fotokopi Kartu Keluarga (KK)',
            'Surat Pengantar dari RT/RW',
            'Keterangan Jenis Usaha'
          ],
          formName: 'Template Surat',
          formSub: 'surat keterangan domisili usaha.docx',
          formLink: 'https://docs.google.com/document/d/1zRNaF-wGAod50FyL8Rx8OwRwVuHeiJDd/edit?usp=drive_link&ouid=111677914652829227106&rtpof=true&sd=true'
        },
        {
          id: 'sk-tidak-mampu',
          title: 'Keterangan Tidak Mampu',
          icon: FileMinus,
          color: 'text-rose-500 bg-rose-50',
          requirements: [
            'Fotokopi KTP',
            'Fotokopi Kartu Keluarga (KK)',
            'Surat Pengantar dari RT/RW',
            'Surat Pernyataan Tidak Mampu'
          ],
          formName: 'Template Surat',
          formSub: 'surat keterangan tidak mampu.docx',
          formLink: 'https://docs.google.com/document/d/16rrYkjpMn0ISkplXMO6EBXk3_F_a0N_I/edit?usp=drive_link&ouid=111677914652829227106&rtpof=true&sd=true'
        },
        {
          id: 'sk-usaha',
          title: 'Keterangan Usaha',
          icon: Briefcase,
          color: 'text-emerald-500 bg-emerald-50',
          requirements: [
            'Fotokopi KTP',
            'Fotokopi Kartu Keluarga (KK)',
            'Surat Pengantar dari RT/RW'
          ],
          formName: 'Template Surat',
          formSub: 'surat keterangan usaha.docx',
          formLink: 'https://docs.google.com/document/d/1IA-i9DpOMv3YFVDlMAaU1FhOTOxmuRBf/edit?usp=drive_link&ouid=111677914652829227106&rtpof=true&sd=true'
        }
      ]
    },
    {
      id: 'surat-pemberitahuan',
      title: 'Surat Pemberitahuan',
      icon: Mail,
      items: [
        {
          id: 'sp-individu',
          title: 'Pemberitahuan (Keperluan Individu)',
          icon: Users,
          color: 'text-purple-500 bg-purple-50',
          requirements: [
            'Fotokopi KTP',
            'Surat Pengantar dari RT/RW',
            'Detail keperluan pemberitahuan'
          ],
          formName: 'Template Surat',
          formSub: 'surat pemberitahuan (keperluan individu).docx',
          formLink: 'https://docs.google.com/document/d/1BFm2OAO9rukgDQ_Sf_LXRKFaNGQSdlqy/edit?usp=drive_link&ouid=111677914652829227106&rtpof=true&sd=true'
        }
      ]
    },
    {
      id: 'surat-pengantar',
      title: 'Surat Pengantar',
      icon: BookOpen,
      items: [
        {
          id: 'sp-skck',
          title: 'Pengantar Catatan Kepolisian (SKCK)',
          icon: Car,
          color: 'text-indigo-500 bg-indigo-50',
          requirements: [
            'Surat Pengantar dari RT/RW',
            'Fotokopi KTP',
            'Fotokopi Kartu Keluarga (KK)',
            'Fotokopi Akta Kelahiran'
          ],
          formName: 'Template Surat',
          formSub: 'surat pengantar catatan kepolisian.docx',
          formLink: 'https://docs.google.com/document/d/1mPhG7fngazcpACenJ9d6lFQQxJoC2_NO/edit?usp=drive_link&ouid=111677914652829227106&rtpof=true&sd=true'
        },
        {
          id: 'sp-izin-keramaian',
          title: 'Pengantar Ijin Keramaian',
          icon: Users,
          color: 'text-orange-500 bg-orange-50',
          requirements: [
            'Surat Pengantar dari RT/RW',
            'Fotokopi KTP Penanggung Jawab',
            'Fotokopi Kartu Keluarga (KK)'
          ],
          formName: 'Template Surat',
          formSub: 'surat pengantar ijin keramaian.docx',
          formLink: 'https://docs.google.com/document/d/1N4r5L_PJzYvOvTmzJMxNOlp5-_qZ7bGu/edit?usp=drive_link&ouid=111677914652829227106&rtpof=true&sd=true'
        },
        {
          id: 'sp-umum',
          title: 'Pengantar Umum',
          icon: Mail,
          color: 'text-sky-500 bg-sky-50',
          requirements: [
            'Surat Pengantar dari RT/RW',
            'Fotokopi KTP',
            'Fotokopi Kartu Keluarga (KK)'
          ],
          formName: 'Template Surat',
          formSub: 'surat pengantar umum.docx',
          formLink: 'https://docs.google.com/document/d/1W_kNroeQEzHfwOehyxozWN-nyF_4swGP/edit?usp=drive_link&ouid=111677914652829227106&rtpof=true&sd=true'
        }
      ]
    },
    {
      id: 'surat-pernyataan',
      title: 'Surat Pernyataan',
      icon: FolderOpen,
      items: [
        {
          id: 's-pernyataan-ahli-waris',
          title: 'Pernyataan Ahli Waris',
          icon: Users,
          color: 'text-teal-500 bg-teal-50',
          requirements: [
            'Surat Keterangan Kematian',
            'Fotokopi KTP dan KK Ahli Waris',
            'Surat Pengantar dari RT/RW',
            'Meterai'
          ],
          formName: 'Template Surat',
          formSub: 'surat pernyataan ahli waris.docx',
          formLink: 'https://docs.google.com/document/d/1jrwqUSZP83KwvXVB4fpOTE2q8wGPsH-e/edit?usp=drive_link&ouid=111677914652829227106&rtpof=true&sd=true'
        },
        {
          id: 's-pernyataan-domisili',
          title: 'Pernyataan Domisili Tempat Tinggal',
          icon: Home,
          color: 'text-blue-500 bg-blue-50',
          requirements: [
            'Fotokopi KTP',
            'Fotokopi Kartu Keluarga (KK)',
            'Surat Pengantar dari RT/RW'
          ],
          formName: 'Template Surat',
          formSub: 'surat pernyataan domisili tempat tinggal.docx',
          formLink: 'https://docs.google.com/document/d/1JR8l4d0vUPA5WI08MSJDD3aWKN2Erifd/edit?usp=drive_link&ouid=111677914652829227106&rtpof=true&sd=true'
        },
        {
          id: 's-pernyataan-umum',
          title: 'Pernyataan Umum',
          icon: FileMinus,
          color: 'text-slate-500 bg-slate-100',
          requirements: [
            'Fotokopi KTP',
            'Surat Pengantar dari RT/RW'
          ],
          formName: 'Template Surat',
          formSub: 'surat pernyataan umum.docx',
          formLink: 'https://docs.google.com/document/d/1pU84yNb0dB-wK87-4WbVpVe4ufFs3jwB/edit?usp=drive_link&ouid=111677914652829227106&rtpof=true&sd=true'
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
                            {selectedService.formLink ? (
                              <a href={selectedService.formLink} target="_blank" rel="noreferrer" className="w-full sm:w-auto shrink-0 px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                                <Download className="w-4 h-4" /> Unduh
                              </a>
                            ) : (
                              <button className="w-full sm:w-auto shrink-0 px-5 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                                <Download className="w-4 h-4" /> Unduh
                              </button>
                            )}
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
