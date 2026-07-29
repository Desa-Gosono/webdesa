import { CategoryConfig } from '@/models/dynamicTypes';
import { Newspaper, Calendar, Store, MapPin, Image as ImageIcon, Users, Building2 } from 'lucide-react';

export const categoriesConfig: Record<string, CategoryConfig> = {
  berita: {
    id: 'berita',
    title: 'Berita & Artikel',
    description: 'Kelola publikasi berita, artikel, dan pengumuman desa.',
    icon: Newspaper,
    collectionName: 'news',
    themeColor: 'blue',
    columns: [
      { key: 'thumbnail_url', label: 'Foto', type: 'image' },
      { key: 'title', label: 'Judul', type: 'text', sortable: true },
      { key: 'status', label: 'Status', type: 'badge' },
      { key: 'published_at', label: 'Tanggal', type: 'date', sortable: true }
    ],
    fields: [
      { name: 'title', label: 'Judul Berita', type: 'text', required: true, gridSpan: 2 },
      { name: 'slug', label: 'Slug (URL)', type: 'text', required: true },
      {
        name: 'status', label: 'Status', type: 'select', required: true,
        options: [
          { label: 'Draft', value: 'draft' },
          { label: 'Published', value: 'published' },
          { label: 'Archive', value: 'archive' }
        ]
      },
      { name: 'author', label: 'Penulis', type: 'text', required: true },
      { name: 'thumbnail_url', label: 'Thumbnail', type: 'image', gridSpan: 2 },
      { name: 'content', label: 'Konten Berita', type: 'richtext', required: true, gridSpan: 2 }
    ]
  },
  agenda: {
    id: 'agenda',
    title: 'Agenda Kegiatan',
    description: 'Kelola jadwal kegiatan dan acara desa.',
    icon: Calendar,
    collectionName: 'agenda',
    themeColor: 'amber',
    columns: [
      { key: 'image_url', label: 'Poster', type: 'image' },
      { key: 'title', label: 'Nama Kegiatan', type: 'text', sortable: true },
      { key: 'event_date', label: 'Tanggal', type: 'date', sortable: true },
      { key: 'location', label: 'Lokasi', type: 'text' }
    ],
    fields: [
      { name: 'title', label: 'Nama Kegiatan', type: 'text', required: true, gridSpan: 2 },
      { name: 'event_date', label: 'Tanggal & Waktu', type: 'date', required: true },
      { name: 'location', label: 'Lokasi', type: 'text', required: true },
      { name: 'image_url', label: 'Poster Kegiatan', type: 'image', gridSpan: 2 },
      { name: 'description', label: 'Deskripsi', type: 'textarea', gridSpan: 2 }
    ]
  },
  potensi: {
    id: 'potensi',
    title: 'Potensi Desa',
    description: 'Kelola data potensi alam, budaya, dan sumber daya desa.',
    icon: MapPin,
    collectionName: 'potentials',
    themeColor: 'emerald',
    columns: [
      { key: 'image_url', label: 'Foto', type: 'image' },
      { key: 'title', label: 'Nama Potensi', type: 'text', sortable: true },
      { key: 'category', label: 'Kategori', type: 'badge', sortable: true }
    ],
    fields: [
      { name: 'title', label: 'Nama Potensi', type: 'text', required: true, gridSpan: 2 },
      {
        name: 'category', label: 'Kategori', type: 'select', required: true,
        options: [
          { label: 'Pertanian', value: 'Pertanian' },
          { label: 'Peternakan', value: 'Peternakan' },
          { label: 'Perikanan', value: 'Perikanan' },
          { label: 'Wisata', value: 'Wisata' },
          { label: 'Budaya', value: 'Budaya' },
          { label: 'Lainnya', value: 'Lainnya' }
        ]
      },
      { name: 'address', label: 'Lokasi (Alamat atau Link GMaps)', type: 'location', gridSpan: 2 },
      { name: 'image_url', label: 'Foto Potensi', type: 'image', gridSpan: 2 },
      { name: 'description', label: 'Deskripsi', type: 'textarea', gridSpan: 2 }
    ]
  },
  umkm: {
    id: 'umkm',
    title: 'Data UMKM',
    description: 'Kelola data Usaha Mikro, Kecil, dan Menengah (UMKM) warga.',
    icon: Store,
    collectionName: 'umkm',
    themeColor: 'orange',
    columns: [
      { key: 'image_url', label: 'Foto', type: 'image' },
      { key: 'name', label: 'Nama UMKM', type: 'text', sortable: true },
      { key: 'owner', label: 'Pemilik', type: 'text' },
      { key: 'category', label: 'Kategori', type: 'badge' }
    ],
    fields: [
      { name: 'name', label: 'Nama UMKM', type: 'text', required: true, gridSpan: 2 },
      { name: 'owner', label: 'Nama Pemilik', type: 'text', required: true },
      {
        name: 'category', label: 'Kategori', type: 'select', required: true,
        options: [
          { label: 'Makanan/Minuman', value: 'Makanan/Minuman' },
          { label: 'Kerajinan', value: 'Kerajinan' },
          { label: 'Pakaian', value: 'Pakaian' },
          { label: 'Jasa', value: 'Jasa' },
          { label: 'Pertanian', value: 'Pertanian' },
          { label: 'Lainnya', value: 'Lainnya' }
        ]
      },
      { name: 'product', label: 'Produk Utama', type: 'text' },
      { name: 'phone', label: 'Nomor Telepon/WA', type: 'text' },
      { name: 'address', label: 'Lokasi (Alamat atau Link GMaps)', type: 'location', gridSpan: 2 },
      { name: 'image_url', label: 'Foto Produk/Usaha', type: 'image', gridSpan: 2 },
      { name: 'description', label: 'Deskripsi Usaha', type: 'textarea', gridSpan: 2 }
    ]
  },
  galeri: {
    id: 'galeri',
    title: 'Galeri Media',
    description: 'Kelola dokumentasi foto dan video desa.',
    icon: ImageIcon,
    collectionName: 'gallery',
    themeColor: 'purple',
    columns: [
      { key: 'media_url', label: 'Media', type: 'image' },
      { key: 'title', label: 'Judul', type: 'text', sortable: true }
    ],
    fields: [
      { name: 'title', label: 'Judul Media', type: 'text', required: true, gridSpan: 2 },
      { name: 'category', label: 'Kategori/Album', type: 'text' },
      { name: 'media_url', label: 'Upload Foto Media', type: 'image', gridSpan: 2 },
      { name: 'description', label: 'Keterangan', type: 'textarea', gridSpan: 2 }
    ]
  },
  fasilitas: {
    id: 'fasilitas',
    title: 'Fasilitas Umum',
    description: 'Kelola data fasilitas umum dan infrastruktur desa.',
    icon: Building2,
    collectionName: 'facilities',
    themeColor: 'indigo',
    columns: [
      { key: 'image_url', label: 'Foto', type: 'image' },
      { key: 'name', label: 'Nama Fasilitas', type: 'text', sortable: true },
      { key: 'category', label: 'Kategori', type: 'badge' }
    ],
    fields: [
      { name: 'name', label: 'Nama Fasilitas', type: 'text', required: true, gridSpan: 2 },
      {
        name: 'category', label: 'Kategori', type: 'select', required: true,
        options: [
          { label: 'Pendidikan', value: 'Pendidikan' },
          { label: 'Kesehatan', value: 'Kesehatan' },
          { label: 'Ibadah', value: 'Ibadah' },
          { label: 'Olahraga', value: 'Olahraga' },
          { label: 'Transportasi', value: 'Transportasi' },
          { label: 'Layanan Publik', value: 'Layanan Publik' }
        ]
      },
      { name: 'address', label: 'Alamat', type: 'text', gridSpan: 2 },
      { name: 'latitude', label: 'Latitude (Garis Lintang)', type: 'text', placeholder: 'Contoh: -7.123456' },
      { name: 'longitude', label: 'Longitude (Garis Bujur)', type: 'text', placeholder: 'Contoh: 112.123456' },
      { name: 'image_url', label: 'Foto Fasilitas', type: 'image', gridSpan: 2 },
      { name: 'description', label: 'Deskripsi', type: 'textarea', gridSpan: 2 }
    ]
  },
  perangkat: {
    id: 'perangkat',
    title: 'Perangkat Desa',
    description: 'Kelola data perangkat desa dan struktur organisasi.',
    icon: Users,
    collectionName: 'officials',
    themeColor: 'cyan',
    columns: [
      { key: 'photo_url', label: 'Foto', type: 'image' },
      { key: 'name', label: 'Nama Lengkap', type: 'text', sortable: true },
      { key: 'position', label: 'Jabatan', type: 'text', sortable: true },
      { key: 'order_number', label: 'Urutan', type: 'text', sortable: true }
    ],
    fields: [
      { name: 'name', label: 'Nama Lengkap', type: 'text', required: true, gridSpan: 2 },
      { name: 'position', label: 'Jabatan', type: 'text', required: true },
      { name: 'order_number', label: 'Nomor Urut', type: 'number', required: true },
      { name: 'photo_url', label: 'Foto', type: 'image', gridSpan: 2 },
      { name: 'description', label: 'Tugas Pokok & Fungsi', type: 'textarea', gridSpan: 2 }
    ]
  }
};
