/* eslint-disable react-refresh/only-export-components */
import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout } from '@/layouts/PublicLayout';

const NotFoundPage = lazy(() => import('@/pages/errors/NotFoundPage'));
const HomePage = lazy(() => import('@/pages/home/HomePage'));
const ProfilPage = lazy(() => import('@/pages/profile/ProfilPage'));
const PemerintahanPage = lazy(() => import('@/pages/profile/PemerintahanPage'));
const PotensiDetail = lazy(() => import('@/pages/potency/PotensiDetail'));
const UMKMDetail = lazy(() => import('@/pages/potency/UMKMDetail'));
const BeritaDetail = lazy(() => import('@/pages/information/BeritaDetail'));
const AgendaDetail = lazy(() => import('@/pages/information/AgendaDetail'));
const FasilitasDetail = lazy(() => import('@/pages/information/FasilitasDetail'));
const DynamicCategoryTemplate = lazy(() => import('@/pages/public/DynamicCategoryTemplate'));
const PetaPage = lazy(() => import('@/pages/data/PetaPage'));
const KontakPage = lazy(() => import('@/pages/contact/KontakPage'));
const FaqPage = lazy(() => import('@/pages/contact/FaqPage'));
const PengelolaanSampahPage = lazy(() => import('@/pages/program/PengelolaanSampahPage'));
const PosyanduPage = lazy(() => import('@/pages/program/PosyanduPage'));
const LayananPage = lazy(() => import('@/pages/program/LayananPage'));

// Auth Pages
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('@/pages/auth/ResetPasswordPage'));

// Admin Pages
import { AdminLayout } from '@/components/admin/layout/AdminLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
const GenericContentManager = lazy(() => import('@/pages/admin/dynamic/GenericContentManager'));
const DashboardAdminPage = lazy(() => import('@/pages/admin/dashboard/DashboardAdminPage'));
const ProfilDesaAdmin = lazy(() => import('@/pages/admin/profil/ProfilDesaAdmin'));
const PerangkatDesaAdmin = lazy(() => import('@/pages/admin/pemerintahan/PerangkatDesaAdmin'));
const DemografiAdmin = lazy(() => import('@/pages/admin/profil/DemografiAdmin'));
const AdminProfilePage = lazy(() => import('@/pages/admin/profil/AdminProfilePage'));

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
      { path: 'kategori/:categoryId', element: <DynamicCategoryTemplate /> },
      { path: 'potensi/:id', element: <PotensiDetail /> },
      { path: 'umkm/:id', element: <UMKMDetail /> },
      { path: 'berita/:slug', element: <BeritaDetail /> },
      { path: 'agenda/:id', element: <AgendaDetail /> },
      { path: 'fasilitas/:id', element: <FasilitasDetail /> },
      { path: 'peta', element: <PetaPage /> },
      { path: 'kontak', element: <KontakPage /> },
      { path: 'faq', element: <FaqPage /> },
      { path: 'pengelolaan-sampah', element: <PengelolaanSampahPage /> },
      { path: 'posyandu', element: <PosyanduPage /> },
      { path: 'layanan', element: <LayananPage /> },
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
          // Dynamic Content Manager
          { path: 'content/:categoryId', element: <GenericContentManager /> },

          // Profil
          { path: 'profil', element: <ProfilDesaAdmin /> },
          { path: 'profil/sejarah', element: <ProfilDesaAdmin /> },
          { path: 'profil/visi-misi', element: <ProfilDesaAdmin /> },
          { path: 'profil/demografi', element: <DemografiAdmin /> },

          // Pemerintahan
          { path: 'pemerintahan/perangkat', element: <PerangkatDesaAdmin /> },

          // Pengaturan
          { path: 'pengaturan', element: <PengaturanAdmin /> },
          { path: 'akun', element: <AdminProfilePage /> },

          { path: '*', element: <NotFoundPage /> }
        ]
      }
    ]
  }
]);
