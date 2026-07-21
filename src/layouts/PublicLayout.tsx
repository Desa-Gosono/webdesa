import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/ui/Navbar';
import { NewsTicker } from '@/components/features/NewsTicker';
import { FloatingContact } from '@/components/features/FloatingContact';
import { BackToTop } from '@/components/features/BackToTop';
import { AccessibilityMenu } from '@/components/features/AccessibilityMenu';
import { AnnouncementPopup } from '@/components/features/AnnouncementPopup';
import { VisitorCounter } from '@/components/features/VisitorCounter';

export function PublicLayout() {
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
      
      {/* Footer (Temporary Placeholder with Visitor Counter) */}
      <footer className="bg-gray-900 text-white mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="font-display font-semibold text-xl mb-2">Desa Gosono</h3>
              <p className="text-gray-400 text-sm">Portal Informasi Resmi Pemerintahan Desa Gosono.</p>
            </div>
            <div className="w-full md:w-auto">
              <VisitorCounter />
            </div>
          </div>
        </div>
      </footer>

      {/* Global Interactive Widgets */}
      <AnnouncementPopup />
      <FloatingContact />
      <BackToTop />
      <AccessibilityMenu />
    </div>
  );
}
