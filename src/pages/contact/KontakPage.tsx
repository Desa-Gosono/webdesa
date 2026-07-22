import React from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { Phone, MapPin, Mail, Send } from 'lucide-react';
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useSettingsContext } from '@/contexts/SettingsContext';

export default function KontakPage() {
  const { settings, isLoading } = useSettingsContext();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <PageHero 
        title="Hubungi Kami" 
        description="Layanan informasi, pengaduan, dan komunikasi dengan Pemerintah Desa."
        icon={Phone}
        backgroundImage={settings.bg_kontak && !settings.bg_kontak.endsWith('.mp4') ? settings.bg_kontak : undefined}
        backgroundVideoUrl={settings.bg_kontak?.endsWith('.mp4') ? settings.bg_kontak : undefined}
        illustrationUrl={settings.ill_kontak}
      />
      
      <div className="container mx-auto px-4 py-16 relative z-10 flex-grow max-w-7xl">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Informasi Kontak */}
            <div className="lg:col-span-5 space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700"
              >
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Informasi Kontak</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-slate-700 flex items-center justify-center shrink-0 border border-emerald-100 dark:border-slate-600">
                      <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 dark:text-white mb-1">Alamat Kantor</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {settings.contact_address || 'Alamat belum ditambahkan.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-sky-50 dark:bg-slate-700 flex items-center justify-center shrink-0 border border-sky-100 dark:border-slate-600">
                      <Phone className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 dark:text-white mb-1">Telepon</h3>
                      {settings.contact_phone ? (
                        <a href={`tel:${settings.contact_phone.replace(/[^0-9]/g, '')}`} className="text-sky-600 hover:underline font-medium text-sm">
                          {settings.contact_phone}
                        </a>
                      ) : (
                        <p className="text-slate-500 text-sm">Belum tersedia.</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-slate-700 flex items-center justify-center shrink-0 border border-green-100 dark:border-slate-600">
                      <Send className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 dark:text-white mb-1">WhatsApp</h3>
                      {settings.contact_whatsapp ? (
                        <a href={`https://wa.me/${settings.contact_whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-green-600 hover:underline font-medium text-sm">
                          {settings.contact_whatsapp}
                        </a>
                      ) : (
                        <p className="text-slate-500 text-sm">Belum tersedia.</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-slate-700 flex items-center justify-center shrink-0 border border-rose-100 dark:border-slate-600">
                      <Mail className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 dark:text-white mb-1">Email Resmi</h3>
                      {settings.contact_email ? (
                        <a href={`mailto:${settings.contact_email}`} className="text-rose-600 hover:underline font-medium text-sm">
                          {settings.contact_email}
                        </a>
                      ) : (
                        <p className="text-slate-500 text-sm">Belum tersedia.</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700"
              >
                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Media Sosial</h2>
                <div className="flex flex-wrap gap-4">
                  {settings.social_facebook && (
                    <a href={settings.social_facebook} target="_blank" rel="noreferrer" className="flex items-center justify-center w-12 h-12 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-full transition-all border border-blue-100">
                      <FaFacebook className="w-5 h-5" />
                    </a>
                  )}
                  {settings.social_instagram && (
                    <a href={settings.social_instagram} target="_blank" rel="noreferrer" className="flex items-center justify-center w-12 h-12 bg-pink-50 text-pink-600 hover:bg-pink-600 hover:text-white rounded-full transition-all border border-pink-100">
                      <FaInstagram className="w-5 h-5" />
                    </a>
                  )}
                  {settings.social_youtube && (
                    <a href={settings.social_youtube} target="_blank" rel="noreferrer" className="flex items-center justify-center w-12 h-12 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-full transition-all border border-red-100">
                      <FaYoutube className="w-5 h-5" />
                    </a>
                  )}
                  {settings.social_tiktok && (
                    <a href={settings.social_tiktok} target="_blank" rel="noreferrer" className="flex items-center justify-center w-12 h-12 bg-black/5 text-black hover:bg-black hover:text-white dark:bg-white/10 dark:text-white dark:hover:bg-white dark:hover:text-black rounded-full transition-all border border-black/10 dark:border-white/10">
                      <FaTiktok className="w-5 h-5" />
                    </a>
                  )}
                  {!settings.social_facebook && !settings.social_instagram && !settings.social_youtube && !settings.social_tiktok && (
                    <p className="text-slate-500 text-sm">Media sosial belum ditambahkan.</p>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Peta Lokasi (Iframe) */}
            <div className="lg:col-span-7">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden h-full min-h-[400px] flex flex-col"
              >
                <div className="p-6 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
                  <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-emerald-500" /> Lokasi pada Peta
                  </h2>
                </div>
                
                <div className="flex-grow w-full h-full relative">
                  {settings.location_map_url ? (
                    <div 
                      className="w-full h-full min-h-[400px]" 
                      dangerouslySetInnerHTML={{ __html: settings.location_map_url.replace(/width=".*?"/, 'width="100%"').replace(/height=".*?"/, 'height="100%"') }} 
                    />
                  ) : (
                    <div className="w-full h-full min-h-[400px] flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-700/50 p-6 text-center">
                      <MapPin className="w-16 h-16 text-slate-300 mb-4" />
                      <p className="text-slate-500 font-medium max-w-sm">Peta Google Maps belum ditambahkan oleh admin.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}
