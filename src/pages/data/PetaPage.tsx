import React, { useState, useEffect, useRef } from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { Map as MapIcon, Maximize, Navigation, Layers, Filter, Loader2 } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { PointCategory } from '@/types';
import { useJsonData } from '@/hooks/useJsonData';
import { Button } from '@/components/ui/Button';

// Fix Leaflet default icon path issues in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to handle Locate User
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
      className="absolute bottom-6 right-6 z-[400] p-3 bg-white text-gray-700 shadow-md rounded-full hover:bg-gray-50 focus:outline-none"
      title="Temukan Lokasi Saya"
    >
      <Navigation className="w-5 h-5 text-blue-600" />
    </button>
  );
}

export default function PetaPage() {
  const { data: mapData, loading: mapLoading } = useJsonData<any>('map.json');
  const { data: desaData, loading: desaLoading } = useJsonData<any>('profile.json');
  
  // We need to initialize state once data is loaded, or handle it dynamically
  const [activeCategories, setActiveCategories] = useState<Set<PointCategory>>(new Set());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const mapWrapperRef = useRef<HTMLDivElement>(null);

  // Initialize categories when data loads
  useEffect(() => {
    if (mapData) {
      setActiveCategories(new Set(mapData.categories.map((c: any) => c.name)));
    }
  }, [mapData]);

  const toggleCategory = (category: PointCategory) => {
    const newCategories = new Set(activeCategories);
    if (newCategories.has(category)) {
      newCategories.delete(category);
    } else {
      newCategories.add(category);
    }
    setActiveCategories(newCategories);
  };

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

  const createCustomIcon = (color: string, icon: string) => {
    return L.divIcon({
      html: `<div style="background-color: ${color}; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.3); border: 2px solid white; font-size: 18px;">${icon}</div>`,
      className: '',
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      popupAnchor: [0, -18],
    });
  };

  if (mapLoading || desaLoading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="mt-4 text-gray-500">Memuat Peta Desa...</p>
      </div>
    );
  }

  if (!mapData || !desaData) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <p className="text-red-500 font-medium">Gagal memuat data peta.</p>
      </div>
    );
  }

  const filteredData = mapData.points.filter((point: any) => activeCategories.has(point.category));

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <PageHero 
        title="Peta Interaktif Desa" 
        description={`Sistem Informasi Geografis (GIS) ${desaData.nama} terpadu.`}
        icon={MapIcon}
      />
      
      <div className="container mx-auto px-4 py-8 relative z-10 flex-grow flex flex-col md:flex-row gap-6">
        
        {/* Sidebar Controls */}
        <div className="w-full md:w-72 flex-shrink-0 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <h3 className="font-display font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-primary" /> Filter Kategori
            </h3>
            <div className="space-y-3">
              {mapData.categories.map((cat: any) => (
                <label key={cat.name} className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      className="sr-only" 
                      checked={activeCategories.has(cat.name)}
                      onChange={() => toggleCategory(cat.name)}
                    />
                    <div className={`w-5 h-5 rounded border ${activeCategories.has(cat.name) ? 'bg-primary border-primary' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700'} flex items-center justify-center transition-colors`}>
                       {activeCategories.has(cat.name) && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{backgroundColor: cat.color}}>{cat.icon}</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">{cat.name}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
            <h3 className="font-display font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
              <Layers className="w-5 h-5 text-secondary" /> Legenda
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Menampilkan {filteredData.length} lokasi aktif pada peta.</p>
            <div className="grid grid-cols-2 gap-2">
               {mapData.categories.map((cat: any) => (
                 <div key={`legend-${cat.name}`} className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full" style={{backgroundColor: cat.color}}></div>
                   <span className="text-xs text-gray-600 dark:text-gray-400 truncate">{cat.name}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div 
          ref={mapWrapperRef} 
          className={`flex-grow rounded-2xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-800 relative ${isFullscreen ? 'h-screen w-screen bg-gray-100 z-50' : 'h-[600px]'}`}
        >
          <button 
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 z-[400] p-2 bg-white text-gray-700 shadow-md rounded-lg hover:bg-gray-50 focus:outline-none"
            title="Toggle Fullscreen"
          >
            <Maximize className="w-5 h-5" />
          </button>
          
          <MapContainer 
            center={[mapData.center.lat, mapData.center.lng]} 
            zoom={15} 
            scrollWheelZoom={true} 
            style={{ height: '100%', width: '100%', zIndex: 1 }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {filteredData.map((point: any) => {
              const category = mapData.categories.find((c: any) => c.name === point.category);
              if (!category) return null;
              
              return (
                <Marker 
                  key={point.id} 
                  position={[point.lat, point.lng]}
                  icon={createCustomIcon(category.color, category.icon)}
                >
                  <Popup className="rounded-xl overflow-hidden">
                    <div className="p-1 max-w-[200px]">
                      <h4 className="font-bold text-gray-900 text-base mb-1">{point.name}</h4>
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold text-white mb-2" style={{backgroundColor: category.color}}>
                        {point.category}
                      </span>
                      <p className="text-sm text-gray-600 mb-3">{point.description}</p>
                      
                      <a 
                        href={`https://www.google.com/maps/dir/?api=1&destination=${point.lat},${point.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        Arahkan via Google Maps
                      </a>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
            
            <LocateControl />
          </MapContainer>
        </div>
        
      </div>
    </div>
  );
}
