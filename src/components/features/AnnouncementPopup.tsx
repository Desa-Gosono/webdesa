import React, { useState, useEffect } from 'react';
import { Megaphone, X } from 'lucide-react';
import { Button } from '../ui/Button';

export function AnnouncementPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Only show once per session
    const hasSeen = sessionStorage.getItem('desa-gosono-announcement');
    if (!hasSeen) {
      const timer = setTimeout(() => setIsOpen(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('desa-gosono-announcement', 'true');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="bg-primary p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2 font-display font-semibold">
            <Megaphone className="w-5 h-5 animate-pulse" />
            Pengumuman Penting
          </div>
          <button onClick={handleClose} className="text-white/80 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Penyaluran BLT Dana Desa</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Pemberitahuan kepada seluruh warga Desa Gosono, penyaluran BLT Dana Desa tahap selanjutnya akan dilaksanakan pada hari Jumat di Balai Desa. Harap membawa persyaratan lengkap.
          </p>
          <Button className="w-full" onClick={handleClose}>Saya Mengerti</Button>
        </div>
      </div>
    </div>
  );
}
