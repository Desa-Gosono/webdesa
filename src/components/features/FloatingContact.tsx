import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useJsonData } from '@/hooks/useJsonData';

export function FloatingContact() {
  const { data: desaData } = useJsonData<any>('profile.json');

  const handleWhatsApp = () => {
    const phoneNumber = desaData?.telepon || '081234567890';
    const message = encodeURIComponent(`Halo Admin Desa ${desaData?.nama || 'Gosono'}, saya ingin bertanya seputar...`);
    const formattedNumber = phoneNumber.replace(/^0/, '62');
    window.open(`https://wa.me/${formattedNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsApp}
      className="fixed bottom-6 right-6 md:right-8 z-40 p-4 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-500/50 group"
      aria-label="Hubungi kami via WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat WhatsApp
      </span>
    </button>
  );
}
