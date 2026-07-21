import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Search, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { GlobalSearch } from '@/components/features/GlobalSearch';
import { LiveClockWeather } from '@/components/features/LiveClockWeather';

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <div className="bg-gray-900 text-white border-b border-gray-800 hidden md:block">
        <div className="container mx-auto px-4 py-1.5 flex justify-between items-center">
          <LiveClockWeather />
          <div className="flex items-center gap-4 text-xs font-medium text-white/80">
            <Link to="/layanan" className="hover:text-white transition-colors">Layanan Publik</Link>
            <Link to="/kontak" className="hover:text-white transition-colors">Kontak Desa</Link>
          </div>
        </div>
      </div>
      
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-950/70 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary-600 dark:text-primary-500" />
            <span className="font-display font-bold text-xl text-gray-900 dark:text-white">Desa Gosono</span>
          </Link>
          <nav className="hidden lg:flex gap-6">
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors">Beranda</Link>
            <Link to="/profil" className="text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors">Profil</Link>
            <Link to="/pemerintahan" className="text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors">Pemerintahan</Link>
            <Link to="/potensi" className="text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors">Potensi</Link>
            <Link to="/galeri" className="text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors">Galeri</Link>
            <Link to="/berita" className="text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors">Berita</Link>
          </nav>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
              aria-label="Cari"
            >
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="md:hidden">
              {/* Mobile menu toggle goes here */}
            </div>
          </div>
        </div>
      </header>

      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
