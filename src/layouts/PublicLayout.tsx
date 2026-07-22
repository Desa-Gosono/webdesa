import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/ui/Navbar';
import { NewsTicker } from '@/components/features/NewsTicker';
import { FloatingContact } from '@/components/features/FloatingContact';
import { BackToTop } from '@/components/features/BackToTop';
import { AccessibilityMenu } from '@/components/features/AccessibilityMenu';
import { VisitorCounter } from '@/components/features/VisitorCounter';
import { useSettingsContext } from '@/contexts/SettingsContext';

export function PublicLayout() {
  const { settings } = useSettingsContext();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <NewsTicker />
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
          </div>
        }>
          <Outlet />
        </Suspense>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="font-display font-semibold text-xl mb-2">{settings.website_name || 'Desa Gosono'}</h3>
              <p className="text-gray-400 text-sm">{settings.footer_description || 'Portal Informasi Resmi Pemerintahan Desa Gosono.'}</p>
            </div>
            <div className="w-full md:w-auto">
              <VisitorCounter />
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-800 text-center text-sm text-gray-500">
            {settings.footer_copyright || '© 2026 Desa Gosono. All rights reserved.'}
          </div>
        </div>
      </footer>

      {/* Global Interactive Widgets */}
      <FloatingContact />
      <BackToTop />
      <AccessibilityMenu />
    </div>
  );
}
