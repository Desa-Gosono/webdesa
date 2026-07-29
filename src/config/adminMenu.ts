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
    path: '/admin/content/perangkat',
    icon: Users,
  },
  {
    title: 'Potensi',
    path: '/admin/content/potensi',
    icon: MapPin,
    children: [
      { title: 'Pertanian', path: '/admin/content/potensi', icon: Tractor },
      { title: 'UMKM', path: '/admin/content/umkm', icon: Store },
    ],
  },
  {
    title: 'Informasi',
    path: '/admin/content/berita',
    icon: Newspaper,
    children: [
      { title: 'Berita', path: '/admin/content/berita', icon: Newspaper },
      { title: 'Agenda', path: '/admin/content/agenda', icon: Calendar },
    ],
  },
  {
    title: 'Galeri',
    path: '/admin/content/galeri',
    icon: ImageIcon,
  },
  {
    title: 'Fasilitas Umum',
    path: '/admin/content/fasilitas',
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
