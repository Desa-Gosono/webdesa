import React, { useState, useEffect, useRef } from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { Map as MapIcon, Maximize, Navigation, Layers, MapPin, Building2 } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useFacilities } from '@/hooks/useFacilities';
import { useProfile } from '@/hooks/useProfile';
import { Button } from '@/components/ui/Button';
import { useSettingsContext } from '@/contexts/SettingsContext';

// Fix Leaflet default icon path issues in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function LocateControl() {
  const map = useMap();
  const handleLocate = () => {
    map.locate().on('locationfound', function (e) {
      map.flyTo(e.latlng, map.getZoom());
      L.marker(e.latlng).addTo(map)
        .bindPopup('Lokasi Anda saat ini').openPopup();
    }).on('locationerror', function () {
      alert("Gagal mendapatkan lokasi Anda.");
    });
  };

  return (
    <button 
      onClick={handleLocate}
      className="absolute bottom-6 right-6 z-[400] p-3 bg-white text-slate-700 shadow-md rounded-xl hover:bg-slate-50 focus:outline-none"
      title="Temukan Lokasi Saya"
    >
      <Navigation className="w-5 h-5 text-sky-600" />
    </button>
  );
}

export default function PetaPage() {
  const { settings } = useSettingsContext();
  const { useFetchFacilities } = useFacilities();
  const { data: facilities = [], isLoading: facilitiesLoading } = useFetchFacilities();
  
  const { useFetchProfile } = useProfile();
  const { data: profile, isLoading: profileLoading } = useFetchProfile();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const mapWrapperRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      mapWrapperRef.current?.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const createCustomIcon = (color: string, iconHtml: string) => {
    return L.divIcon({
      html: `<div style="background-color: ${color}; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.3); border: 2px solid white; color: white;">${iconHtml}</div>`,
      className: '',
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      popupAnchor: [0, -18],
    });
  };

  const villageCenter: [number, number] = [
    profile?.latitude || -7.311394,
    profile?.longitude || 110.742337
  ];

  if (facilitiesLoading || profileLoading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 font-medium">Memuat Peta Desa...</p>
      </div>
    );
  }

  // Filter fasilitas yang memiliki koordinat
  const mappedFacilities = facilities.filter(f => f.latitude && f.longitude);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <PageHero 
        title="Peta Desa" 
        description={`Sistem Informasi Geografis terpadu ${profile?.village_name || 'Desa Gosono'}.`}
        icon={MapIcon}
        backgroundImage={settings.bg_peta && !settings.bg_peta.endsWith('.mp4') ? settings.bg_peta : undefined}
        backgroundVideoUrl={settings.bg_peta?.endsWith('.mp4') ? settings.bg_peta : undefined}
        illustrationUrl={settings.ill_peta}
      />
      
      <div className="container mx-auto px-4 py-12 relative z-10 flex-grow flex flex-col md:flex-row gap-6 max-w-7xl">
        
        {/* Sidebar */}
        <div className="w-full md:w-80 flex-shrink-0 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-700">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-slate-700 pb-4">
              <Layers className="w-5 h-5 text-emerald-500" /> Legenda Peta
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 shadow-md">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-white">Kantor Desa (Pusat)</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Titik pusat koordinat desa</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center shrink-0 shadow-md">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800 dark:text-white">Fasilitas Umum</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{mappedFacilities.length} lokasi terpetakan</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div 
          ref={mapWrapperRef} 
          className={`flex-grow rounded-3xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 relative bg-slate-100 ${isFullscreen ? 'h-screen w-screen z-50 rounded-none border-none' : 'h-[600px]'}`}
        >
          <button 
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 z-[400] p-3 bg-white text-slate-700 shadow-md rounded-xl hover:bg-slate-50 focus:outline-none"
            title="Layar Penuh"
          >
            <Maximize className="w-5 h-5" />
          </button>
          
          <MapContainer 
            center={villageCenter} 
            zoom={15} 
            scrollWheelZoom={true} 
            style={{ height: '100%', width: '100%', zIndex: 1 }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Marker Pusat Desa */}
            <Marker 
              position={villageCenter}
              icon={createCustomIcon('#10b981', '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/></svg>')}
            >
              <Popup className="rounded-xl overflow-hidden">
                <div className="p-2 text-center">
                  <h4 className="font-bold text-slate-900 text-base mb-1">Kantor {profile?.village_name || 'Desa'}</h4>
                  <p className="text-sm text-slate-600 mb-3">{profile?.address}</p>
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${villageCenter[0]},${villageCenter[1]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-bold transition-colors"
                  >
                    Rute ke Lokasi
                  </a>
                </div>
              </Popup>
            </Marker>

            {/* Marker Fasilitas Umum */}
            {mappedFacilities.map((point) => (
              <Marker 
                key={point.id} 
                position={[point.latitude!, point.longitude!]}
                icon={createCustomIcon('#0ea5e9', '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>')}
              >
                <Popup className="rounded-xl overflow-hidden">
                  <div className="p-1 max-w-[220px]">
                    {point.image_url && (
                      <img src={point.image_url} alt={point.name || ''} className="w-full h-24 object-cover rounded-lg mb-2" />
                    )}
                    <h4 className="font-bold text-slate-900 text-base mb-1">{point.name}</h4>
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold text-white mb-2 bg-sky-500">
                      Fasilitas Umum
                    </span>
                    {point.description && <p className="text-sm text-slate-600 mb-3">{point.description}</p>}
                    
                    <a 
                      href={`https://www.google.com/maps/dir/?api=1&destination=${point.latitude},${point.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-sm font-bold transition-colors"
                    >
                      Arahkan via Google Maps
                    </a>
                  </div>
                </Popup>
              </Marker>
            ))}
            
            <LocateControl />
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
