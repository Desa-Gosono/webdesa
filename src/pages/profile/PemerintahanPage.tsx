import React from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { Users, Briefcase } from 'lucide-react';
import { useJsonData } from '@/hooks/useJsonData';

export default function PemerintahanPage() {
  const { data: orgData, loading } = useJsonData<any>('organization.json');

  return (
    <div className="w-full">
      <PageHero 
        title="Pemerintahan Desa" 
        description="Struktur organisasi dan aparatur Pemerintah Desa Gosono."
        icon={Users}
      />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-8 text-center">
            Struktur Organisasi
          </h2>
          
          {loading ? (
            <div className="text-center py-8">Memuat data pemerintahan...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {orgData?.struktur?.map((person: any, index: number) => (
                <div key={index} className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 text-center hover:shadow-md transition-shadow">
                  <div className="w-20 h-20 mx-auto bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-4">
                    <Briefcase className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">{person.nama}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{person.jabatan}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
