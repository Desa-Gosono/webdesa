import React from 'react';
import { PageHeader } from '@/components/admin/ui/PageHeader';
import { Settings } from 'lucide-react';

interface PlaceholderAdminPageProps {
  title: string;
  description?: string;
  moduleName: string;
}

export default function PlaceholderAdminPage({ title, description, moduleName }: PlaceholderAdminPageProps) {
  return (
    <>
      <PageHeader
        title={title}
        description={description || `Manajemen data untuk modul ${title}`}
        breadcrumbs={[
          { label: 'Dashboard', path: '/admin' },
          { label: moduleName },
          { label: title },
        ]}
      />
      
      <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 border-dashed text-center">
        <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
          <Settings className="w-8 h-8 text-gray-400 dark:text-slate-500 animate-spin-slow" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Modul Sedang Dalam Pengembangan</h3>
        <p className="text-gray-500 dark:text-slate-400 max-w-md">
          Halaman untuk mengelola {title} sedang dalam tahap pengembangan. Konsep CRUD (Create, Read, Update, Delete) akan diterapkan serupa dengan modul Berita.
        </p>
      </div>
    </>
  );
}
