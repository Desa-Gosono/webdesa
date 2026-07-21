import React from 'react';
import { MapPin } from 'lucide-react';

interface GoogleMapsWidgetProps {
  mapUrl?: string;
  title?: string;
}

export function GoogleMapsWidget({ 
  mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126442.92348564177!2d112.5190695!3d-7.9620401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78825c93c14a4b%3A0xc34cf1f158524a87!2sGosono%2C%20Kec.%20Gondang%2C%20Kabupaten%20Mojokerto%2C%20Jawa%20Timur!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid",
  title = "Peta Lokasi Desa"
}: GoogleMapsWidgetProps) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>
      <div className="w-full h-[400px]">
        <iframe 
          src={mapUrl}
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title={title}
        ></iframe>
      </div>
    </div>
  );
}
