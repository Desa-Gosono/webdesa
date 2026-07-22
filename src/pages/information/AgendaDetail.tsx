import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageHero } from '@/components/ui/PageHero';
import { CalendarDays, MapPin, Clock, ArrowLeft } from 'lucide-react';
import { supabase } from '@/config/supabase';
import { Agenda } from '@/models/types';

export default function AgendaDetail() {
  const { id } = useParams<{ id: string }>();
  const [agenda, setAgenda] = useState<Agenda | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAgenda() {
      if (!id) return;
      try {
        const { data, error } = await supabase
          .from('agenda')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setAgenda(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAgenda();
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

  if (error || !agenda) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 pt-20">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Agenda tidak ditemukan</h2>
          <Link to="/agenda" className="text-sky-600 hover:underline inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Agenda
          </Link>
        </div>
      </div>
    );
  }

  const eventDate = agenda.event_date ? new Date(agenda.event_date) : null;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <PageHero 
        title="Detail Agenda" 
        description={agenda.title}
        icon={CalendarDays}
      />
      
      <div className="container mx-auto px-4 py-12 relative z-10 max-w-4xl">
        <Link to="/agenda" className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 font-medium mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Agenda</span>
        </Link>
        
        <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700">
          {agenda.image_url && (
            <div className="w-full h-64 md:h-96 relative">
              <img src={agenda.image_url} alt={agenda.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
          )}
          
          <div className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-6">
              {agenda.title}
            </h1>
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-8">
              {eventDate && (
                <>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 px-4 py-3 rounded-xl border border-slate-100 dark:border-slate-600">
                    <CalendarDays className="w-5 h-5 text-sky-500" />
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Tanggal</p>
                      <p className="font-medium">{eventDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 px-4 py-3 rounded-xl border border-slate-100 dark:border-slate-600">
                    <Clock className="w-5 h-5 text-amber-500" />
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Waktu</p>
                      <p className="font-medium">{eventDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB</p>
                    </div>
                  </div>
                </>
              )}
              
              {agenda.location && (
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 px-4 py-3 rounded-xl border border-slate-100 dark:border-slate-600">
                  <MapPin className="w-5 h-5 text-rose-500" />
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Lokasi</p>
                    <p className="font-medium">{agenda.location}</p>
                  </div>
                </div>
              )}
            </div>
            
            {agenda.description && (
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="whitespace-pre-line text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                  {agenda.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
