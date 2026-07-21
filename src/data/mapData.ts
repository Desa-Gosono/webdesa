export type PointCategory = 'Balai Desa' | 'Sekolah' | 'Masjid' | 'Posyandu' | 'Puskesmas' | 'Sawah' | 'Irigasi' | 'UMKM' | 'Wisata' | 'BUMDes';

export interface MapPoint {
  id: string;
  name: string;
  category: PointCategory;
  lat: number;
  lng: number;
  description: string;
}

// Center coordinates for Desa Gosono (mock/approximate)
export const MAP_CENTER = { lat: -7.64000, lng: 112.45000 };

export const mapCategories: { name: PointCategory; color: string; icon: string }[] = [
  { name: 'Balai Desa', color: '#ef4444', icon: '🏛️' }, // red
  { name: 'Sekolah', color: '#3b82f6', icon: '🏫' }, // blue
  { name: 'Masjid', color: '#10b981', icon: '🕌' }, // green
  { name: 'Posyandu', color: '#ec4899', icon: '🏥' }, // pink
  { name: 'Puskesmas', color: '#f43f5e', icon: '🚑' }, // rose
  { name: 'Sawah', color: '#84cc16', icon: '🌾' }, // lime
  { name: 'Irigasi', color: '#0ea5e9', icon: '💧' }, // sky
  { name: 'UMKM', color: '#f59e0b', icon: '🏪' }, // amber
  { name: 'Wisata', color: '#8b5cf6', icon: '🏕️' }, // violet
  { name: 'BUMDes', color: '#6366f1', icon: '🏢' }, // indigo
];

export const mapData: MapPoint[] = [
  {
    id: '1',
    name: 'Balai Desa Gosono',
    category: 'Balai Desa',
    lat: -7.64000,
    lng: 112.45000,
    description: 'Pusat pemerintahan dan pelayanan masyarakat Desa Gosono.',
  },
  {
    id: '2',
    name: 'SDN Gosono 1',
    category: 'Sekolah',
    lat: -7.63850,
    lng: 112.45100,
    description: 'Sekolah Dasar Negeri utama di desa.',
  },
  {
    id: '3',
    name: 'Masjid Jami Gosono',
    category: 'Masjid',
    lat: -7.64050,
    lng: 112.44950,
    description: 'Masjid raya dan pusat kegiatan keagamaan.',
  },
  {
    id: '4',
    name: 'Posyandu Mawar',
    category: 'Posyandu',
    lat: -7.64200,
    lng: 112.45200,
    description: 'Layanan kesehatan ibu dan anak Dusun Krajan.',
  },
  {
    id: '5',
    name: 'Puskesmas Pembantu',
    category: 'Puskesmas',
    lat: -7.63900,
    lng: 112.44800,
    description: 'Fasilitas kesehatan tingkat pertama desa.',
  },
  {
    id: '6',
    name: 'Area Persawahan Tani Makmur',
    category: 'Sawah',
    lat: -7.64500,
    lng: 112.45500,
    description: 'Hamparan sawah produktif kelompok tani desa.',
  },
  {
    id: '7',
    name: 'Saluran Irigasi Induk',
    category: 'Irigasi',
    lat: -7.64400,
    lng: 112.45400,
    description: 'Sistem pengairan utama untuk lahan pertanian.',
  },
  {
    id: '8',
    name: 'Sentra UMKM Kerajinan',
    category: 'UMKM',
    lat: -7.63700,
    lng: 112.45050,
    description: 'Pusat produksi kerajinan tangan lokal.',
  },
  {
    id: '9',
    name: 'Wisata Alam Banyu Biru',
    category: 'Wisata',
    lat: -7.63500,
    lng: 112.44500,
    description: 'Destinasi wisata unggulan dengan pemandangan alam.',
  },
  {
    id: '10',
    name: 'Toko BUMDes Sejahtera',
    category: 'BUMDes',
    lat: -7.64020,
    lng: 112.45050,
    description: 'Unit usaha perdagangan desa.',
  }
];
