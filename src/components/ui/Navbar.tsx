import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, Sun, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { useSettingsContext } from '@/contexts/SettingsContext';
import { GlobalSearch } from '@/components/features/GlobalSearch';
import { LiveClockWeather } from '@/components/features/LiveClockWeather';
import logoDesa from '@/assets/logo-desa.png';

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { settings } = useSettingsContext();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: "/", label: "Beranda" },
    { to: "/profil", label: "Profil" },
    { to: "/pemerintahan", label: "Pemerintahan" },
    { to: "/pengelolaan-sampah", label: "Sampah" },
    { to: "/posyandu", label: "Posyandu" },
    { to: "/kategori/potensi", label: "Potensi" },
    { to: "/kategori/galeri", label: "Galeri" },
    { to: "/kategori/berita", label: "Berita" },
    { to: "/layanan", label: "Layanan" }
  ];

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
          <Link to="/" className="flex items-center gap-2 md:gap-3">
            <img
              src={settings.website_logo || logoDesa}
              alt="Logo Desa"
              className="h-10 md:h-12 w-auto drop-shadow-sm"
            />
            <div className="flex flex-col">
              <span className="font-display font-bold text-base text-gray-900 dark:text-white leading-tight">
                {settings.website_name || 'Desa Gosono'}
              </span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
                Kab. Boyolali, Jawa Tengah
              </span>
            </div>
          </Link>
          <nav className="hidden lg:flex gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
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
            <div className="lg:hidden ml-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-xl text-base font-medium transition-colors ${isActive ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-900'}`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
                <div className="h-px bg-gray-200 dark:bg-gray-800 my-2" />
                <Link to="/layanan" className="px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-xl">
                  Layanan Publik
                </Link>
                <Link to="/kontak" className="px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-xl">
                  Kontak Desa
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <GlobalSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
