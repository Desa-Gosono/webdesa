import React from 'react';
import { Newspaper } from 'lucide-react';

const news = [
  "Pembangunan jembatan penghubung dusun telah mencapai 80%",
  "Rapat Musdes perencanaan tahun depan akan diadakan minggu ini",
  "Vaksinasi massal tahap 3 di Puskesmas desa hari Sabtu",
  "Festival Panen Raya sukses diselenggarakan dengan 1000+ pengunjung"
];

export function NewsTicker() {
  return (
    <div className="bg-primary text-white text-sm py-2 overflow-hidden flex items-center">
      <div className="container mx-auto px-4 flex items-center">
        <div className="flex items-center gap-2 font-bold bg-primary z-10 pr-4 whitespace-nowrap">
          <Newspaper className="w-4 h-4" /> INFO TERKINI:
        </div>
        <div className="flex-grow overflow-hidden relative">
          <div className="animate-marquee whitespace-nowrap inline-block">
            {news.map((item, index) => (
              <span key={index} className="mx-8">
                • {item}
              </span>
            ))}
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
    </div>
  );
}
