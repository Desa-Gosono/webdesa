import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight, FileText, Map, Phone, HelpCircle, Newspaper, Image as ImageIcon, Briefcase, Building, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Mock searchable items for KKN
const searchableItems = [
  { title: 'Profil Desa', type: 'halaman', path: '/profil', icon: <Building className="w-4 h-4" /> },
  { title: 'Pemerintahan Desa', type: 'halaman', path: '/pemerintahan', icon: <Briefcase className="w-4 h-4" /> },
  { title: 'Potensi', type: 'potensi', path: '/kategori/potensi', icon: <Leaf className="w-4 h-4" /> },
  { title: 'Potensi UMKM', type: 'potensi', path: '/kategori/umkm', icon: <Briefcase className="w-4 h-4" /> },
  { title: 'Galeri Foto & Video', type: 'halaman', path: '/kategori/galeri', icon: <ImageIcon className="w-4 h-4" /> },
  { title: 'Berita Terbaru', type: 'halaman', path: '/kategori/berita', icon: <Newspaper className="w-4 h-4" /> },
  { title: 'Peta Desa', type: 'halaman', path: '/peta', icon: <Map className="w-4 h-4" /> },
  { title: 'Kontak', type: 'halaman', path: '/kontak', icon: <Phone className="w-4 h-4" /> },
  { title: 'FAQ', type: 'halaman', path: '/faq', icon: <HelpCircle className="w-4 h-4" /> },
];

export function GlobalSearch({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(searchableItems);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setQuery('');
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults(searchableItems);
      return;
    }
    const lowerQuery = query.toLowerCase();
    const filtered = searchableItems.filter(item => 
      item.title.toLowerCase().includes(lowerQuery) || 
      item.type.toLowerCase().includes(lowerQuery)
    );
    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 bg-gray-900/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-800">
          <Search className="w-6 h-6 text-gray-400 mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            id="global-search-input"
            type="text"
            placeholder="Cari halaman, berita, atau informasi desa..."
            className="flex-grow bg-transparent border-none outline-none text-lg text-gray-900 dark:text-white placeholder-gray-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {results.length > 0 ? (
            <ul className="space-y-2">
              {results.map((r, i) => (
                <li key={i}>
                  <button 
                    onClick={() => {
                      navigate(r.path);
                      onClose();
                    }}
                    className="w-full flex items-center p-3 rounded-xl hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary text-left"
                  >
                    <div className="mr-3 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-500">
                      {r.icon}
                    </div>
                    <div>
                      <div className="font-medium">{r.title}</div>
                      <div className="text-xs text-gray-500 capitalize">{r.type}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                  </button>
                </li>
              ))}
            </ul>
          ) : query ? (
            <div className="text-center py-12 text-gray-500">
              Tidak ditemukan hasil untuk "{query}"
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Mulai mengetik untuk mencari informasi
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
