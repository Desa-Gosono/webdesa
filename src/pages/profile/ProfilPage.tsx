import React, { useState } from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { Building2, Map, BookOpen, Target, MapPin, Users } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import { useFacilities } from '@/hooks/useFacilities';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettingsContext } from '@/contexts/SettingsContext';
import { VillageGISMap } from '@/features/home/components/VillageGISMap';
import { VillageStats } from '@/features/home/components/VillageStats';

export default function ProfilPage() {
  const { settings } = useSettingsContext();
  const { useFetchProfile } = useProfile();
  const { data: profile, isLoading } = useFetchProfile();

  const { useFetchFacilities } = useFacilities();
  const { data: facilities = [], isLoading: isLoadingFacilities } = useFetchFacilities();

  const [activeTab, setActiveTab] = useState('sejarah');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  const tabs = [
    { id: 'sejarah', label: 'Sejarah', icon: BookOpen },
    { id: 'visi-misi', label: 'Visi & Misi', icon: Target },
    { id: 'batas-wilayah', label: 'Batas Wilayah', icon: Map },
    { id: 'demografi', label: 'Demografi', icon: Users },
    { id: 'fasilitas', label: 'Fasilitas Umum', icon: Building2 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <PageHero
        title={`Profil ${profile?.village_name || 'Desa'}`}
        description="Mengenal lebih dekat sejarah, visi misi, dan kondisi desa kami."
        icon={Building2}
        backgroundImage={settings.bg_profil && !settings.bg_profil.endsWith('.mp4') ? settings.bg_profil : "https://images.unsplash.com/photo-1596423735880-5c62d08a5464?auto=format&fit=crop&w=2000&q=80"}
        backgroundVideoUrl={settings.bg_profil?.endsWith('.mp4') ? settings.bg_profil : undefined}
        illustrationUrl={settings.ill_profil}
      />
      <div className="container mx-auto px-4 py-12 relative z-10 flex-grow">



        {/* Submenu / Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all shadow-sm border ${isActive
                  ? 'bg-emerald-600 text-white border-emerald-600 ring-2 ring-emerald-600 ring-offset-2'
                  : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border-slate-200'
                  }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="space-y-8 min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeTab === 'sejarah' && (
              <motion.div key="sejarah" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="rounded-3xl border border-slate-100 bg-white p-8 md:p-10 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                <h2 className="font-display text-2xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-3 border-b border-slate-100 dark:border-slate-700 pb-4">
                  <BookOpen className="text-emerald-500" /> Sejarah Desa
                </h2>
                <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 prose-p:leading-relaxed text-justify">
                  {profile?.history ? (
                    <div dangerouslySetInnerHTML={{ __html: profile.history.replace(/\n/g, '<br/>') }} />
                  ) : (
                    <p className="italic text-slate-500">Informasi sejarah belum ditambahkan.</p>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'visi-misi' && (
              <motion.div key="visi-misi" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="rounded-3xl border border-slate-100 bg-white p-8 md:p-10 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                <h2 className="font-display text-2xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-3 border-b border-slate-100 dark:border-slate-700 pb-4">
                  <Target className="text-sky-500" /> Visi & Misi
                </h2>
                <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
                  <h3 className="font-bold text-xl text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 flex items-center justify-center text-sm">V</span>
                    Visi
                  </h3>
                  {profile?.vision ? (
                    <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl italic font-medium text-emerald-700 dark:text-emerald-400 border-l-4 border-emerald-500 text-lg">
                      "{profile.vision}"
                    </div>
                  ) : (
                    <p className="italic text-slate-500">Visi belum ditambahkan.</p>
                  )}

                  <h3 className="font-bold text-xl mt-8 mb-4 text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 dark:bg-sky-900/50 flex items-center justify-center text-sm">M</span>
                    Misi
                  </h3>
                  {profile?.mission ? (
                    <div className="space-y-3">
                      {profile.mission.split('\n').filter(Boolean).map((m, i) => (
                        <div key={i} className="flex gap-4 items-start bg-slate-50 dark:bg-slate-900/30 p-4 rounded-xl">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs font-bold">{i + 1}</span>
                          <p className="m-0 leading-relaxed text-slate-700 dark:text-slate-300">{m.replace(/^\d+\.\s*/, '')}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="italic text-slate-500">Misi belum ditambahkan.</p>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'batas-wilayah' && (
              <motion.div key="batas-wilayah" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="w-full -mt-12">
                <VillageGISMap />
              </motion.div>
            )}

            {activeTab === 'demografi' && (
              <motion.div key="demografi" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="w-full space-y-6">
                <VillageStats variant="card" />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


                  {/* Jenis Kelamin */}
                  <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                    <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-2">Penduduk Berdasarkan Jenis Kelamin</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 dark:bg-slate-700/50">
                            <th className="p-3 font-semibold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-600 rounded-tl-xl">Jenis Kelamin</th>
                            <th className="p-3 font-semibold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-600 rounded-tr-xl">Jumlah</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-100 dark:border-slate-700">
                            <td className="p-3 text-slate-600 dark:text-slate-400">Laki-laki</td>
                            <td className="p-3 font-medium text-slate-800 dark:text-slate-200">{profile?.demografi_laki ?? 0} Jiwa</td>
                          </tr>
                          <tr className="border-b border-slate-100 dark:border-slate-700">
                            <td className="p-3 text-slate-600 dark:text-slate-400">Perempuan</td>
                            <td className="p-3 font-medium text-slate-800 dark:text-slate-200">{profile?.demografi_perempuan ?? 0} Jiwa</td>
                          </tr>
                          <tr className="bg-slate-50 dark:bg-slate-700/30">
                            <td className="p-3 font-bold text-slate-700 dark:text-slate-300 rounded-bl-xl">Total</td>
                            <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400 rounded-br-xl">
                              {(profile?.demografi_laki ?? 0) + (profile?.demografi_perempuan ?? 0)} Jiwa
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Tingkat Pendidikan */}
                  <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                    <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-2">Tingkat Pendidikan</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 dark:bg-slate-700/50">
                            <th className="p-3 font-semibold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-600 rounded-tl-xl">Pendidikan</th>
                            <th className="p-3 font-semibold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-600 rounded-tr-xl">Jumlah</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-100 dark:border-slate-700">
                            <td className="p-3 text-slate-600 dark:text-slate-400">Belum / Tidak Sekolah</td>
                            <td className="p-3 font-medium text-slate-800 dark:text-slate-200">{profile?.demografi_pend_belum_sekolah ?? 0} Jiwa</td>
                          </tr>
                          <tr className="border-b border-slate-100 dark:border-slate-700">
                            <td className="p-3 text-slate-600 dark:text-slate-400">SD / Sederajat</td>
                            <td className="p-3 font-medium text-slate-800 dark:text-slate-200">{profile?.demografi_pend_sd ?? 0} Jiwa</td>
                          </tr>
                          <tr className="border-b border-slate-100 dark:border-slate-700">
                            <td className="p-3 text-slate-600 dark:text-slate-400">SMP / Sederajat</td>
                            <td className="p-3 font-medium text-slate-800 dark:text-slate-200">{profile?.demografi_pend_smp ?? 0} Jiwa</td>
                          </tr>
                          <tr className="border-b border-slate-100 dark:border-slate-700">
                            <td className="p-3 text-slate-600 dark:text-slate-400">SMA / Sederajat</td>
                            <td className="p-3 font-medium text-slate-800 dark:text-slate-200">{profile?.demografi_pend_sma ?? 0} Jiwa</td>
                          </tr>
                          <tr className="border-b border-slate-100 dark:border-slate-700">
                            <td className="p-3 text-slate-600 dark:text-slate-400">Diploma / Sarjana</td>
                            <td className="p-3 font-medium text-slate-800 dark:text-slate-200">{profile?.demografi_pend_sarjana ?? 0} Jiwa</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Mata Pencaharian */}
                  <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800 lg:col-span-2">
                    <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-2">Mata Pencaharian</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 dark:bg-slate-700/50">
                            <th className="p-3 font-semibold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-600 rounded-tl-xl">Pekerjaan</th>
                            <th className="p-3 font-semibold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-600 rounded-tr-xl">Jumlah</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-100 dark:border-slate-700">
                            <td className="p-3 text-slate-600 dark:text-slate-400">Petani / Pekebun</td>
                            <td className="p-3 font-medium text-slate-800 dark:text-slate-200">{profile?.demografi_pek_petani ?? 0} Jiwa</td>
                          </tr>
                          <tr className="border-b border-slate-100 dark:border-slate-700">
                            <td className="p-3 text-slate-600 dark:text-slate-400">Wiraswasta / Pedagang</td>
                            <td className="p-3 font-medium text-slate-800 dark:text-slate-200">{profile?.demografi_pek_wiraswasta ?? 0} Jiwa</td>
                          </tr>
                          <tr className="border-b border-slate-100 dark:border-slate-700">
                            <td className="p-3 text-slate-600 dark:text-slate-400">Karyawan Swasta</td>
                            <td className="p-3 font-medium text-slate-800 dark:text-slate-200">{profile?.demografi_pek_karyawan ?? 0} Jiwa</td>
                          </tr>
                          <tr className="border-b border-slate-100 dark:border-slate-700">
                            <td className="p-3 text-slate-600 dark:text-slate-400">PNS / TNI / POLRI</td>
                            <td className="p-3 font-medium text-slate-800 dark:text-slate-200">{profile?.demografi_pek_pns ?? 0} Jiwa</td>
                          </tr>
                          <tr className="border-b border-slate-100 dark:border-slate-700">
                            <td className="p-3 text-slate-600 dark:text-slate-400">Pelajar / Mahasiswa</td>
                            <td className="p-3 font-medium text-slate-800 dark:text-slate-200">{profile?.demografi_pek_pelajar ?? 0} Jiwa</td>
                          </tr>
                          <tr className="border-b border-slate-100 dark:border-slate-700">
                            <td className="p-3 text-slate-600 dark:text-slate-400">Lainnya / Belum Bekerja</td>
                            <td className="p-3 font-medium text-slate-800 dark:text-slate-200">{profile?.demografi_pek_lainnya ?? 0} Jiwa</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

              </motion.div>
            )}
            {activeTab === 'fasilitas' && (
              <motion.div key="fasilitas" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="w-full">
                <div className="rounded-3xl border border-slate-100 bg-white p-8 md:p-10 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                  <h2 className="font-display text-2xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-3 border-b border-slate-100 dark:border-slate-700 pb-4">
                    <Building2 className="text-purple-500" /> Fasilitas Umum
                  </h2>

                  {isLoadingFacilities ? (
                    <div className="flex justify-center py-8">
                      <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin"></div>
                    </div>
                  ) : facilities && facilities.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                      {facilities.map((item, i) => (
                        <Link to={`/fasilitas/${item.id}`} key={item.id} className="block group">
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 h-full flex flex-col group-hover:shadow-lg transition-all"
                          >
                            <div className="h-40 relative overflow-hidden bg-slate-200 dark:bg-slate-700">
                              {item.image_url ? (
                                <img src={item.image_url} alt={item.name || ''} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Building2 className="w-10 h-10 text-slate-400 dark:text-slate-500" />
                                </div>
                              )}
                              {item.category && (
                                <div className="absolute top-3 left-3">
                                  <span className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider shadow-sm">
                                    {item.category}
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className="p-4 flex flex-col flex-grow">
                              <h3 className="font-bold text-slate-800 dark:text-white mb-2 group-hover:text-purple-600 transition-colors">
                                {item.name}
                              </h3>

                              {item.address && (
                                <div className="flex items-start gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-auto">
                                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                                  <p className="line-clamp-2">{item.address}</p>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                      <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500">Data fasilitas umum saat ini belum tersedia.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
