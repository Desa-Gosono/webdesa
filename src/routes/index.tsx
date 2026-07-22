/* eslint-disable react-refresh/only-export-components */
import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout } from '@/layouts/PublicLayout';

const NotFoundPage = lazy(() => import('@/pages/errors/NotFoundPage'));
const HomePage = lazy(() => import('@/pages/home/HomePage'));
const ProfilPage = lazy(() => import('@/pages/profile/ProfilPage'));
const PemerintahanPage = lazy(() => import('@/pages/profile/PemerintahanPage'));
const PotensiPage = lazy(() => import('@/pages/potency/PotensiPage'));
const PotensiDetail = lazy(() => import('@/pages/potency/PotensiDetail'));
const UMKMDetail = lazy(() => import('@/pages/potency/UMKMDetail'));
const BeritaPage = lazy(() => import('@/pages/information/BeritaPage'));
const BeritaDetail = lazy(() => import('@/pages/information/BeritaDetail'));
const AgendaDetail = lazy(() => import('@/pages/information/AgendaDetail'));
const GaleriPage = lazy(() => import('@/pages/information/GaleriPage'));
const FasilitasDetail = lazy(() => import('@/pages/information/FasilitasDetail'));
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
const NewsManagement = lazy(() => import('@/pages/admin/berita/NewsManagement'));
const ProfilDesaAdmin = lazy(() => import('@/pages/admin/profil/ProfilDesaAdmin'));
const PerangkatDesaAdmin = lazy(() => import('@/pages/admin/pemerintahan/PerangkatDesaAdmin'));
const PotensiAdmin = lazy(() => import('@/pages/admin/potensi/PotensiAdmin'));
const UmkmAdmin = lazy(() => import('@/pages/admin/potensi/UmkmAdmin'));
const AgendaAdmin = lazy(() => import('@/pages/admin/informasi/AgendaAdmin'));
const GalleryAdmin = lazy(() => import('@/pages/admin/informasi/GalleryAdmin'));
const FasilitasAdmin = lazy(() => import('@/pages/admin/fasilitas/FasilitasAdmin'));
const KontakAdmin = lazy(() => import('@/pages/admin/kontak/KontakAdmin'));
const PengaturanAdmin = lazy(() => import('@/pages/admin/pengaturan/PengaturanAdmin'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'profil', element: <ProfilPage /> },
      { path: 'pemerintahan', element: <PemerintahanPage /> },
      { path: 'potensi', element: <PotensiPage /> },
      { path: 'potensi/:id', element: <PotensiDetail /> },
      { path: 'umkm/:id', element: <UMKMDetail /> },
      { path: 'berita', element: <BeritaPage /> },
      { path: 'berita/:slug', element: <BeritaDetail /> },
      { path: 'agenda/:id', element: <AgendaDetail /> },
      { path: 'fasilitas/:id', element: <FasilitasDetail /> },
      { path: 'galeri', element: <GaleriPage /> },
      { path: 'peta', element: <PetaPage /> },
      { path: 'kontak', element: <KontakPage /> },
      { path: 'faq', element: <FaqPage /> },
      { path: '*', element: <NotFoundPage /> }
    ]
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { path: '/reset-password', element: <ResetPasswordPage /> },
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
          { path: 'berita', element: <NewsManagement /> },
      
      // Profil
      { path: 'profil', element: <ProfilDesaAdmin /> },
      { path: 'profil/sejarah', element: <ProfilDesaAdmin /> },
      { path: 'profil/visi-misi', element: <ProfilDesaAdmin /> },
      
      // Pemerintahan
      { path: 'pemerintahan/perangkat', element: <PerangkatDesaAdmin /> },
      
      // Potensi
      { path: 'potensi', element: <PotensiAdmin /> },
      { path: 'potensi/umkm', element: <UmkmAdmin /> },
      
      // Informasi
      { path: 'informasi/berita', element: <NewsManagement /> }, // Moved from root admin
      { path: 'informasi/agenda', element: <AgendaAdmin /> },
      
      // Galeri
      { path: 'galeri', element: <GalleryAdmin /> },
      { path: 'galeri/foto', element: <GalleryAdmin /> },
      { path: 'galeri/video', element: <GalleryAdmin /> },
      
      // Lainnya
      { path: 'fasilitas', element: <FasilitasAdmin /> },
      { path: 'kontak', element: <KontakAdmin /> },
      { path: 'pengaturan', element: <PengaturanAdmin /> },
      
          { path: '*', element: <NotFoundPage /> }
        ]
      }
    ]
  }
]);
