import {
  LayoutDashboard,
  Info,
  History,
  Target,
  Building,
  Users,
  MapPin,
  Store,
  Tractor,
  Bird,
  Music,
  Newspaper,
  Calendar,
  Image as ImageIcon,
  Video,
  Building2,
  Phone,
  Settings,
} from 'lucide-react';

export const adminMenu = [
  {
    title: 'Dashboard',
    path: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Profil Desa',
    path: '/admin/profil',
    icon: Info,
    children: [
      { title: 'Sejarah Desa', path: '/admin/profil/sejarah', icon: History },
      { title: 'Visi & Misi', path: '/admin/profil/visi-misi', icon: Target },
    ],
  },
  {
    title: 'Pemerintahan',
    path: '/admin/pemerintahan',
    icon: Building,
    children: [
      { title: 'Pemerintahan Desa', path: '/admin/pemerintahan/desa', icon: Building },
      { title: 'Perangkat Desa', path: '/admin/pemerintahan/perangkat', icon: Users },
    ],
  },
  {
    title: 'Potensi Desa',
    path: '/admin/potensi',
    icon: MapPin,
    children: [
      { title: 'UMKM', path: '/admin/potensi/umkm', icon: Store },
      { title: 'Pertanian', path: '/admin/potensi/pertanian', icon: Tractor },
      { title: 'Peternakan', path: '/admin/potensi/peternakan', icon: Bird },
      { title: 'Budaya', path: '/admin/potensi/budaya', icon: Music },
    ],
  },
  {
    title: 'Informasi',
    path: '/admin/informasi',
    icon: Newspaper,
    children: [
      { title: 'Berita', path: '/admin/informasi/berita', icon: Newspaper },
      { title: 'Agenda', path: '/admin/informasi/agenda', icon: Calendar },
    ],
  },
  {
    title: 'Galeri',
    path: '/admin/galeri',
    icon: ImageIcon,
    children: [
      { title: 'Foto', path: '/admin/galeri/foto', icon: ImageIcon },
      { title: 'Video', path: '/admin/galeri/video', icon: Video },
    ],
  },
  {
    title: 'Fasilitas Umum',
    path: '/admin/fasilitas',
    icon: Building2,
  },
  {
    title: 'Kontak',
    path: '/admin/kontak',
    icon: Phone,
  },
  {
    title: 'Pengaturan',
    path: '/admin/pengaturan',
    icon: Settings,
  },
];
