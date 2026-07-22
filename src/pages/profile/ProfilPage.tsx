import React from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { Building2, Map, BookOpen, Target } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';

export default function ProfilPage() {
  const { useFetchProfile } = useProfile();
  const { data: profile, isLoading } = useFetchProfile();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
      <PageHero 
        title={`Profil ${profile?.village_name || 'Desa'}`} 
        description="Mengenal lebih dekat sejarah, visi misi, dan kondisi desa kami."
        icon={Building2}
      />
      <div className="container mx-auto px-4 py-12 relative z-10 flex-grow max-w-4xl">
        <div className="space-y-8">
          
          <div className="rounded-3xl border border-slate-100 bg-white p-8 md:p-10 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <h2 className="font-display text-2xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-3 border-b border-slate-100 dark:border-slate-700 pb-4">
              <BookOpen className="text-emerald-500" /> Sejarah Desa
            </h2>
            <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 prose-p:leading-relaxed">
              {profile?.history ? (
                <div dangerouslySetInnerHTML={{ __html: profile.history.replace(/\n/g, '<br/>') }} />
              ) : (
                <p className="italic text-slate-500">Informasi sejarah belum ditambahkan.</p>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white p-8 md:p-10 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <h2 className="font-display text-2xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-3 border-b border-slate-100 dark:border-slate-700 pb-4">
              <Target className="text-sky-500" /> Visi & Misi
            </h2>
            <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
              <h3 className="font-bold text-xl text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 flex items-center justify-center text-sm">V</span> 
                Visi
              </h3>
              {profile?.vision ? (
                <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl italic font-medium text-emerald-700 dark:text-emerald-400 border-l-4 border-emerald-500 text-lg">
                  "{profile.vision}"
                </div>
              ) : (
                <p className="italic text-slate-500">Visi belum ditambahkan.</p>
              )}
              
              <h3 className="font-bold text-xl mt-8 mb-4 text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 dark:bg-sky-900/50 flex items-center justify-center text-sm">M</span> 
                Misi
              </h3>
              {profile?.mission ? (
                <div className="space-y-3">
                  {profile.mission.split('\n').filter(Boolean).map((m, i) => (
                    <div key={i} className="flex gap-4 items-start bg-slate-50 dark:bg-slate-900/30 p-4 rounded-xl">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center text-xs font-bold">{i + 1}</span>
                      <p className="m-0 leading-relaxed text-slate-700 dark:text-slate-300">{m.replace(/^\d+\.\s*/, '')}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="italic text-slate-500">Misi belum ditambahkan.</p>
              )}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white p-8 md:p-10 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <h2 className="font-display text-2xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-3 border-b border-slate-100 dark:border-slate-700 pb-4">
              <Map className="text-amber-500" /> Profil Umum
            </h2>
            <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300">
              {profile?.description ? (
                <div dangerouslySetInnerHTML={{ __html: profile.description.replace(/\n/g, '<br/>') }} />
              ) : (
                <p className="italic text-slate-500">Deskripsi desa belum ditambahkan.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
