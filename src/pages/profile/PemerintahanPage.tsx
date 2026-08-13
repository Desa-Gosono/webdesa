import React from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { Users, User, Phone } from 'lucide-react';
import { useOfficials } from '@/hooks/useOfficials';
import { motion } from 'framer-motion';
import { useSettingsContext } from '@/contexts/SettingsContext';

export default function PemerintahanPage() {
  const { settings } = useSettingsContext();
  const { useFetchOfficials } = useOfficials();
  const { data: officials = [], isLoading } = useFetchOfficials();

  // Sort by order_number
  const sortedOfficials = [...officials].sort((a, b) => a.order_number - b.order_number);

  const kepalaDesa = sortedOfficials.find(p => p.position.toLowerCase().includes('kepala desa'));
  const sekretaris = sortedOfficials.find(p => p.position.toLowerCase().includes('sekretaris') || p.position.toLowerCase().includes('sekretariat'));
  const kaur = sortedOfficials.filter(p => p.position.toLowerCase().includes('urusan') || p.position.toLowerCase().includes('kaur'));
  const kasi = sortedOfficials.filter(p => p.position.toLowerCase().includes('seksi') || p.position.toLowerCase().includes('kasi'));
  const kadus = sortedOfficials.filter(p => p.position.toLowerCase().includes('dusun') || p.position.toLowerCase().includes('kadus') || p.position.toLowerCase().includes('kamituwo'));
  const staff = sortedOfficials.filter(p => p.position.toLowerCase().includes('staf') || p.position.toLowerCase().includes('staff') || p.position.toLowerCase().includes('admin'));
  const bawahan = [...kasi, ...kadus];

  const OfficialCard = ({ person }: { person: any }) => {
    const position = person.position?.toLowerCase() || '';
    const isKepalaDesa = position.includes('kepala desa');
    const isSekretaris = position.includes('sekretaris') || position.includes('sekretariat');
    
    let borderStyle = 'border-2 border-emerald-100 dark:border-slate-600 hover:shadow-md hover:border-emerald-200';
    if (isKepalaDesa) {
      borderStyle = 'border-[3px] border-emerald-500 dark:border-emerald-400 shadow-md shadow-emerald-500/20';
    } else if (isSekretaris) {
      borderStyle = 'border-2 border-emerald-400 dark:border-emerald-500 shadow-sm shadow-emerald-400/20';
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`bg-white/90 dark:bg-slate-800/90 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 text-center flex flex-col items-center group transition-all duration-300 w-full hover:-translate-y-1 ${borderStyle}`}
      >
        <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto bg-slate-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center mb-2 sm:mb-3 overflow-hidden border-[2px] sm:border-[3px] border-emerald-50 dark:border-slate-600 transition-transform duration-300 group-hover:scale-105 shadow-sm">
          {person.photo_url ? (
            <img src={person.photo_url} alt={person.name} className="w-full h-full object-cover" />
          ) : (
            <User className="w-6 h-6 sm:w-8 sm:h-8 text-slate-300 dark:text-slate-500" />
          )}
        </div>
        <h3 className="font-bold text-xs sm:text-sm md:text-base text-slate-800 dark:text-white mb-1 sm:mb-1.5 leading-tight">{person.name}</h3>
        <span className="inline-block px-2 py-0.5 sm:px-2.5 sm:py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full text-[10px] sm:text-[11px] font-semibold">
          {person.position}
        </span>
      </motion.div>
    );
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-900 min-h-screen">
      <PageHero
        title="Pemerintahan Desa"
        description="Struktur organisasi dan aparatur Pemerintah Desa Gosono."
        icon={Users}
        backgroundImage={settings.bg_pemerintahan && !settings.bg_pemerintahan.endsWith('.mp4') ? settings.bg_pemerintahan : undefined}
        backgroundVideoUrl={settings.bg_pemerintahan?.endsWith('.mp4') ? settings.bg_pemerintahan : undefined}
        illustrationUrl={settings.ill_pemerintahan}
      />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
              Aparatur Desa
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
              Mengenal lebih dekat struktur organisasi dan para pelayan masyarakat yang berdedikasi membangun Desa Gosono.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center">
              <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
            </div>
          ) : sortedOfficials.length > 0 ? (
            <div className="w-full">
              {/* Mobile View - Vertical Tree */}
              <div className="lg:hidden flex flex-col items-center w-full relative pt-4 pb-8">
                {kepalaDesa && (
                  <div className="w-full max-w-[200px] sm:max-w-[220px] relative z-10">
                    <OfficialCard person={kepalaDesa} />
                  </div>
                )}
                
                {sekretaris && (
                  <div className="w-full max-w-[200px] sm:max-w-[220px] flex flex-col items-center relative z-10">
                    <div className="w-0.5 h-6 border-l-2 border-dashed border-slate-300 dark:border-slate-600"></div>
                    <OfficialCard person={sekretaris} />
                  </div>
                )}
                
                {kaur.length > 0 && (
                  <div className="w-full max-w-xl flex flex-col items-center relative mt-0">
                    <div className="w-0.5 h-6 border-l-2 border-dashed border-slate-300 dark:border-slate-600"></div>
                    <div className="w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)] border-t-2 border-dashed border-slate-300 dark:border-slate-600 relative">
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-6">
                            {kaur.map(p => (
                                <div key={p.id} className="relative flex flex-col items-center">
                                    <div className="absolute -top-6 w-0.5 h-6 border-l-2 border-dashed border-slate-300 dark:border-slate-600"></div>
                                    <div className="w-full"><OfficialCard person={p} /></div>
                                </div>
                            ))}
                        </div>
                    </div>
                  </div>
                )}
                
                {bawahan.length > 0 && (
                  <div className="w-full flex flex-col items-center relative mt-0">
                    <div className="w-0.5 h-8 border-l-2 border-dashed border-slate-300 dark:border-slate-600"></div>
                    <div className="w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] border-t-2 border-dashed border-slate-300 dark:border-slate-600 relative">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pt-8">
                            {bawahan.map(p => (
                                <div key={p.id} className="relative flex flex-col items-center">
                                    <div className="absolute -top-8 w-0.5 h-8 border-l-2 border-dashed border-slate-300 dark:border-slate-600"></div>
                                    <div className="w-full"><OfficialCard person={p} /></div>
                                </div>
                            ))}
                        </div>
                    </div>
                  </div>
                )}
                
                {/* Staff Section (Mobile) */}
                {staff.length > 0 && (
                  <div className="w-full flex flex-col items-center mt-12 w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] border-t-2 border-dashed border-slate-200 dark:border-slate-700 pt-8 relative">
                     <h3 className="text-[10px] sm:text-xs font-bold text-slate-500 mb-6 uppercase tracking-widest bg-slate-50 dark:bg-slate-900 px-4 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">Staf Pemerintahan</h3>
                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 w-full">
                         {staff.map(p => (
                             <div key={p.id} className="w-full"><OfficialCard person={p} /></div>
                         ))}
                     </div>
                  </div>
                )}
              </div>

              {/* Desktop View Org Chart */}
              <div className="hidden lg:flex w-full justify-center overflow-x-auto pb-12">
                <div className="w-[1100px] min-w-[1100px] max-w-[1100px] flex flex-col items-center pt-8 shrink-0">

                  {/* KEPALA DESA */}
                  <div className="w-[220px] relative z-10">
                    {kepalaDesa && <OfficialCard person={kepalaDesa} />}
                  </div>

                  {/* MAIN TRUNK & SEKRETARIS BRANCH */}
                  <div className="flex w-full relative pt-[40px]">
                    {/* Main vertical trunk */}
                    <div className="absolute top-0 left-1/2 w-0.5 h-[calc(100%+40px)] border-l-2 border-dashed border-slate-300 dark:border-slate-600 -translate-x-1/2"></div>

                    {/* Branch to Sekretaris */}
                    <div className="absolute top-[40px] left-1/2 w-[25%] border-t-2 border-dashed border-slate-300 dark:border-slate-600"></div>

                    <div className="w-1/2"></div> {/* Left half empty */}

                    {/* Right half containing Sekretaris */}
                    <div className="w-1/2 flex flex-col items-center relative">
                      <div className="w-full max-w-[520px] flex flex-col items-center relative pt-[40px]">
                        {/* Drop line for Sekretaris */}
                        <div className="absolute top-0 left-1/2 w-0.5 h-[40px] border-l-2 border-dashed border-slate-300 dark:border-slate-600 -translate-x-1/2"></div>

                        <div className="w-[220px]">
                          {sekretaris && <OfficialCard person={sekretaris} />}
                        </div>

                        {/* KAUR SECTION */}
                        {kaur.length > 0 && (
                          <div className="relative w-full pt-[40px] mt-4">
                            {/* Trunk from Sekretaris */}
                            <div className="absolute top-0 left-1/2 w-0.5 h-[40px] border-l-2 border-dashed border-slate-300 dark:border-slate-600 -translate-x-1/2"></div>

                            {/* Horizontal line for Kaur */}
                            <div
                              className="absolute top-[40px] h-0.5 border-t-2 border-dashed border-slate-300 dark:border-slate-600"
                              style={{ left: `${100 / (2 * kaur.length)}%`, right: `${100 / (2 * kaur.length)}%` }}
                            ></div>

                            <div className="grid w-full pt-[40px]" style={{ gridTemplateColumns: `repeat(${kaur.length}, minmax(0, 1fr))` }}>
                              {kaur.map(p => (
                                <div key={p.id} className="w-full flex justify-center relative">
                                  {/* Drop line */}
                                  <div className="absolute top-0 left-1/2 w-0.5 h-[40px] border-l-2 border-dashed border-slate-300 dark:border-slate-600 -translate-x-1/2 -mt-[40px]"></div>
                                  <div className="w-[240px]">
                                    <OfficialCard person={p} />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* BOTTOM LEVEL (Kasi & Kadus) */}
                  <div className="relative w-full max-w-[1100px] mt-[40px]">
                    {bawahan.length > 0 && (
                      <>
                        {/* Horizontal line connecting centers of first and last child */}
                        <div
                          className="absolute top-0 h-0.5 border-t-2 border-dashed border-slate-300 dark:border-slate-600"
                          style={{ left: `${100 / (2 * bawahan.length)}%`, right: `${100 / (2 * bawahan.length)}%` }}
                        ></div>

                        <div className="grid w-full pt-[40px]" style={{ gridTemplateColumns: `repeat(${bawahan.length}, minmax(0, 1fr))` }}>
                          {bawahan.map(p => (
                            <div key={p.id} className="w-full flex justify-center relative">
                              <div className="absolute top-0 left-1/2 w-0.5 h-[40px] border-l-2 border-dashed border-slate-300 dark:border-slate-600 -translate-x-1/2 -mt-[40px]"></div>
                              <div className="w-[90%] max-w-[210px]">
                                <OfficialCard person={p} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* STAFF SECTION - UNCONNECTED (Desktop) */}
                  {staff.length > 0 && (
                    <div className="w-full max-w-[1100px] mt-24 mb-8 flex flex-col items-center border-t-2 border-dashed border-slate-200 dark:border-slate-700 pt-12 relative">
                       <h3 className="text-xs font-bold text-slate-500 mb-8 uppercase tracking-widest bg-slate-50 dark:bg-slate-900 px-6 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">Staf Pemerintahan</h3>
                       <div className="flex flex-wrap justify-center gap-6 w-full px-8">
                         {staff.map(p => (
                            <div key={p.id} className="w-full max-w-[210px] flex justify-center">
                              <OfficialCard person={p} />
                            </div>
                         ))}
                       </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md rounded-3xl border border-slate-100 dark:border-slate-700 shadow-lg">
              <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">Belum ada data aparatur desa.</p>
            </div>
          )}

          {/* Direktori Perangkat Desa */}
          {!isLoading && sortedOfficials.length > 0 && (
            <div className="mt-24 pt-16 border-t border-slate-200 dark:border-slate-800">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
                  Direktori Perangkat Desa
                </h2>
                <p className="text-slate-500 max-w-2xl mx-auto">
                  Data lengkap seluruh perangkat Desa Gosono beserta informasi kontak.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedOfficials.map(person => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    key={`dir-${person.id}`}
                    className="bg-white dark:bg-slate-800/80 p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-row gap-4 sm:gap-5 items-start hover:shadow-md transition-shadow group"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-700 shrink-0 border-2 border-emerald-50 dark:border-slate-600 shadow-sm transition-transform duration-300 group-hover:scale-105">
                      {person.photo_url ? (
                        <img src={person.photo_url} alt={person.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User className="w-8 h-8 sm:w-10 sm:h-10 text-slate-300 dark:text-slate-500" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 w-full">
                      <h4 className="font-bold text-slate-800 dark:text-white text-sm sm:text-base mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{person.name}</h4>
                      <div className="inline-block px-2 py-0.5 sm:px-2.5 sm:py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-md text-[9px] sm:text-[11px] font-semibold mb-2 sm:mb-2.5">
                        {person.position}
                      </div>

                      <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                        {person.phone && (
                          <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700/50 w-fit px-2 sm:px-2.5 py-1 rounded-lg">
                            <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500" />
                            <span className="font-semibold text-[10px] sm:text-[11px]">{person.phone}</span>
                          </div>
                        )}
                        {person.description ? (
                          <p className="leading-relaxed whitespace-pre-wrap">{person.description}</p>
                        ) : (
                          <p className="italic text-slate-400 dark:text-slate-500">Belum ada deskripsi profil.</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
