import React, { useState, useEffect } from 'react';
import { Clock, CloudSun, MapPin, Loader2 } from 'lucide-react';
import { useJsonData } from '@/hooks/useJsonData';

export function LiveClockWeather() {
  const { data: desaData, loading } = useJsonData<any>('profile.json');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="flex items-center gap-4 text-xs font-medium text-white/90">
      <div className="hidden md:flex items-center gap-1.5">
        {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <MapPin className="w-3.5 h-3.5 text-primary-400" />}
        <span>{loading ? 'Memuat...' : `${desaData?.nama || 'Desa Gosono'}, ${desaData?.kabupaten || 'Boyolali'}`}</span>
      </div>

      <div className="flex items-center gap-1.5 border-l border-white/20 pl-4">
        <Clock className="w-3.5 h-3.5" />
        <span>{formatDate(time)} • {formatTime(time)}</span>
      </div>
    </div>
  );
}
