/* eslint-disable react-refresh/only-export-components */
import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout } from '@/layouts/PublicLayout';

const NotFoundPage = lazy(() => import('@/pages/errors/NotFoundPage'));
const HomePage = lazy(() => import('@/pages/home/HomePage'));
const ProfilPage = lazy(() => import('@/pages/profile/ProfilPage'));
const PemerintahanPage = lazy(() => import('@/pages/profile/PemerintahanPage'));
const PotensiPage = lazy(() => import('@/pages/potency/PotensiPage'));
const BeritaPage = lazy(() => import('@/pages/information/BeritaPage'));
const AgendaPage = lazy(() => import('@/pages/information/AgendaPage'));
const GaleriPage = lazy(() => import('@/pages/information/GaleriPage'));
const PetaPage = lazy(() => import('@/pages/data/PetaPage'));
const KontakPage = lazy(() => import('@/pages/contact/KontakPage'));
const FaqPage = lazy(() => import('@/pages/contact/FaqPage'));

// Auth Pages
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('@/pages/auth/ResetPasswordPage'));

// Admin Pages
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
const DashboardAdminPage = lazy(() => import('@/pages/admin/dashboard/DashboardAdminPage'));
const BeritaAdminPage = lazy(() => import('@/pages/admin/berita/BeritaAdminPage'));
const PlaceholderAdminPage = lazy(() => import('@/pages/admin/PlaceholderAdminPage'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'forgot-password', element: <ForgotPasswordPage /> },
      { path: 'reset-password', element: <ResetPasswordPage /> },
      { path: 'profil', element: <ProfilPage /> },
      { path: 'pemerintahan', element: <PemerintahanPage /> },
      { path: 'potensi', element: <PotensiPage /> },
      { path: 'berita', element: <BeritaPage /> },
      { path: 'agenda', element: <AgendaPage /> },
      { path: 'galeri', element: <GaleriPage /> },
      { path: 'peta', element: <PetaPage /> },
      { path: 'kontak', element: <KontakPage /> },
      { path: 'faq', element: <FaqPage /> },
      { path: '*', element: <NotFoundPage /> }
    ]
  },
  {
    path: '/admin',
    element: <ProtectedRoute />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: <AdminLayout />,
        children: [
          { index: true, element: <DashboardAdminPage /> },
          { path: 'berita', element: <BeritaAdminPage /> },
      
      // Profil
      { path: 'profil/sejarah', element: <PlaceholderAdminPage moduleName="Profil Desa" title="Sejarah Desa" /> },
      { path: 'profil/visi-misi', element: <PlaceholderAdminPage moduleName="Profil Desa" title="Visi & Misi" /> },
      
      // Pemerintahan
      { path: 'pemerintahan/desa', element: <PlaceholderAdminPage moduleName="Pemerintahan" title="Pemerintahan Desa" /> },
      { path: 'pemerintahan/perangkat', element: <PlaceholderAdminPage moduleName="Pemerintahan" title="Perangkat Desa" /> },
      
      // Potensi
      { path: 'potensi/umkm', element: <PlaceholderAdminPage moduleName="Potensi Desa" title="UMKM" /> },
      { path: 'potensi/pertanian', element: <PlaceholderAdminPage moduleName="Potensi Desa" title="Pertanian" /> },
      { path: 'potensi/peternakan', element: <PlaceholderAdminPage moduleName="Potensi Desa" title="Peternakan" /> },
      { path: 'potensi/budaya', element: <PlaceholderAdminPage moduleName="Potensi Desa" title="Budaya" /> },
      
      // Informasi
      { path: 'informasi/berita', element: <BeritaAdminPage /> }, // Moved from root admin
      { path: 'informasi/agenda', element: <PlaceholderAdminPage moduleName="Informasi" title="Agenda" /> },
      
      // Galeri
      { path: 'galeri/foto', element: <PlaceholderAdminPage moduleName="Galeri" title="Galeri Foto" /> },
      { path: 'galeri/video', element: <PlaceholderAdminPage moduleName="Galeri" title="Galeri Video" /> },
      
      // Lainnya
      { path: 'fasilitas', element: <PlaceholderAdminPage moduleName="Lainnya" title="Fasilitas Umum" /> },
      { path: 'kontak', element: <PlaceholderAdminPage moduleName="Lainnya" title="Kontak" /> },
      { path: 'pengaturan', element: <PlaceholderAdminPage moduleName="Lainnya" title="Pengaturan Website" /> },
      
          { path: '*', element: <NotFoundPage /> }
        ]
      }
    ]
  }
]);
