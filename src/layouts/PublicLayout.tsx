import React, { Suspense } from 'react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import logoDesa from '@/assets/logo-desa.png';
import { Link, Outlet, ScrollRestoration } from 'react-router-dom';
import { Navbar } from '@/components/ui/Navbar';

import { FloatingContact } from '@/components/features/FloatingContact';
import { BackToTop } from '@/components/features/BackToTop';
import { AccessibilityMenu } from '@/components/features/AccessibilityMenu';
import { VisitorCounter } from '@/components/features/VisitorCounter';
import { useSettingsContext } from '@/contexts/SettingsContext';

export function PublicLayout() {
  const { settings } = useSettingsContext();

  return (
    <div className="flex flex-col min-h-screen relative transition-colors duration-300">
      {/* Global Anti-Gravity Background */}
      <div className="fixed inset-0 z-[-1]">
        <img
          src="https://images.unsplash.com/photo-1592651036329-87a3233827ec?auto=format&fit=crop&w=2000&q=80"
          alt="Village Background"
          className="w-full h-full object-cover opacity-40 dark:opacity-20"
        />
        <div className="absolute inset-0 bg-white/70 dark:bg-gray-950/80 backdrop-blur-md" />
      </div>

      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        }>
          <Outlet />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-auto pt-12 md:pt-16 pb-8">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12 mb-12">

            {/* Column 1: About */}
            <div className="space-y-6 lg:col-span-2 lg:pr-16">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-md p-1 flex items-center justify-center shrink-0">
                  <img src={settings.website_logo || logoDesa} alt="Logo Desa" className="w-full h-full object-contain" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                </div>
                <div>
                  <h3 className="font-bold text-xl">{settings.website_name || 'Desa Gosono'}</h3>
                  <p className="text-gray-400 text-sm">Kab. Boyolali, Jawa Tengah</p>
                </div>
              </div>
              <p className="text-justify text-gray-400 text-sm leading-relaxed pr-8">
                {settings.footer_description || 'Portal resmi Pemerintah Desa Gosono. Bersama membangun desa yang mandiri, bersih, dan berdaya saing untuk generasi mendatang.'}
              </p>

              <div className="flex gap-4">
                {settings.social_facebook && (
                  <a href={settings.social_facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <FaFacebookF className="w-4 h-4 text-gray-300" />
                  </a>
                )}
                {settings.social_instagram && (
                  <a href={settings.social_instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <FaInstagram className="w-4 h-4 text-gray-300" />
                  </a>
                )}
                {settings.social_youtube && (
                  <a href={settings.social_youtube} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <FaYoutube className="w-4 h-4 text-gray-300" />
                  </a>
                )}
                {settings.social_tiktok && (
                  <a href={settings.social_tiktok} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 448 512"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" /></svg>
                  </a>
                )}
              </div>
            </div>

            {/* Column 2: Tautan Cepat */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Tautan Cepat</h4>
              <ul className="space-y-3">
                <li><Link to="/profil" className="text-gray-400 hover:text-white transition-colors text-sm">Profil Desa</Link></li>
                <li><Link to="/pemerintahan" className="text-gray-400 hover:text-white transition-colors text-sm">Perangkat Desa</Link></li>
                <li><Link to="/kategori/potensi" className="text-gray-400 hover:text-white transition-colors text-sm">Potensi & Pariwisata</Link></li>
                <li><Link to="/kategori/berita" className="text-gray-400 hover:text-white transition-colors text-sm">Berita Desa</Link></li>
                <li><Link to="/kontak" className="text-gray-400 hover:text-white transition-colors text-sm">Kontak</Link></li>
              </ul>
            </div>

            {/* Column 3: Layanan */}
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Layanan</h4>
              <ul className="space-y-3">
                <li><Link to="/pengelolaan-sampah" className="text-gray-400 hover:text-white transition-colors text-sm">Bank Sampah</Link></li>
                <li><Link to="/posyandu" className="text-gray-400 hover:text-white transition-colors text-sm">Posyandu</Link></li>
                <li><Link to="/kategori/umkm" className="text-gray-400 hover:text-white transition-colors text-sm">UMKM Desa</Link></li>
                <li><Link to="/kategori/fasilitas" className="text-gray-400 hover:text-white transition-colors text-sm">Fasilitas Umum</Link></li>
                <li><Link to="/kontak" className="text-gray-400 hover:text-white transition-colors text-sm">Pengaduan Warga</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>
              {settings.footer_copyright || '© 2026 Pemerintah Desa Gosono. Semua hak cipta dilindungi.'}
            </p>
            <p>
              Gosono Digital Village — KKN Teknik Komputer
            </p>
          </div>
        </div>
      </footer>

      {/* Global Interactive Widgets */}
      <FloatingContact />
      <BackToTop />
      <AccessibilityMenu />
      <ScrollRestoration />
    </div>
  );
}
