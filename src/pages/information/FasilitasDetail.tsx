import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHero } from '@/components/ui/PageHero';
import { Building2, MapPin, ArrowLeft } from 'lucide-react';
import { supabase } from '@/config/supabase';
import { Facility } from '@/models/types';
import { GoogleMapsWidget } from '@/components/features/GoogleMapsWidget';

export default function FasilitasDetail() {
  const { id } = useParams<{ id: string }>();
  const [facility, setFacility] = useState<Facility | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFacility() {
      if (!id) return;
      try {
        const { data, error } = await supabase
          .from('facilities')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setFacility(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFacility();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 pt-20">
        <div className="flex justify-center items-center flex-grow">
          <div className="w-10 h-10 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error || !facility) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 pt-20">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Fasilitas tidak ditemukan</h2>
          <Link to="/profil" className="text-sky-600 hover:underline inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Profil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <PageHero 
        title="Detail Fasilitas" 
        description={facility.name || 'Fasilitas Umum'}
        icon={Building2}
      />
      
      <div className="container mx-auto px-4 py-12 relative z-10 max-w-5xl">
        <Link to="/profil" className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 font-medium mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Fasilitas</span>
        </Link>
        
        <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700">
          {facility.image_url && (
            <div className="w-full h-64 md:h-96 relative">
              <img src={facility.image_url} alt={facility.name || 'Fasilitas'} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              {facility.category && (
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider shadow-sm">
                    {facility.category}
                  </span>
                </div>
              )}
            </div>
          )}
          
          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-6">
              {facility.name}
            </h1>
            
            <div className="flex flex-col gap-6 mb-8">
              {facility.address && (
                <div className="flex items-start gap-3 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 px-5 py-4 rounded-xl border border-slate-100 dark:border-slate-600">
                  <MapPin className="w-6 h-6 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-1">Alamat Lengkap</p>
                    <p className="font-medium text-lg">{facility.address}</p>
                  </div>
                </div>
              )}
            </div>
            
            {facility.description && (
              <div className="prose prose-slate dark:prose-invert max-w-none mb-10">
                <p className="whitespace-pre-line text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                  {facility.description}
                </p>
              </div>
            )}
            
            {facility.latitude && facility.longitude && (
              <div className="mt-8 rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 h-[400px]">
                <GoogleMapsWidget 
                  latitude={facility.latitude} 
                  longitude={facility.longitude} 
                  title={facility.name || 'Lokasi Fasilitas'} 
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
