// Desa Interfaces
export interface IdentitasDesa {
  nama: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  kepalaDesa: string;
  luasWilayah: string;
  telepon: string;
  email: string;
  website: string;
  alamat: string;
}

export interface GeografiDesa {
  letak: string;
  batas: {
    utara: string;
    selatan: string;
    timur: string;
    barat: string;
  };
}

export interface DemografiDesa {
  penduduk: {
    total: number;
    lakiLaki: number;
    perempuan: number;
    kk: number;
  };
  pendidikan: { tingkat: string; jumlah: number }[];
  pekerjaan: { jenis: string; jumlah: number }[];
  agama: { agama: string; jumlah: number }[];
}

export interface PotensiDesa {
  pertanian: string;
  peternakan: string;
  umkm: { nama: string; produk: string; deskripsi: string }[];
  bumdes: { nama: string; tahunBerdiri: string; unitUsaha: string[]; deskripsi: string };
  pariwisata: string;
}

export interface SosialBudayaDesa {
  budaya: string;
  kesenian: string;
}

export interface InfrastrukturItem {
  fasilitas: string;
  status: string;
  detail: string;
}

export interface PemerintahDesa {
  visi: string;
  misi: string[];
  struktur: { nama: string; jabatan: string; foto?: string }[];
  rpjmdes: string;
  program: string[];
}

export interface DesaData {
  identitas: IdentitasDesa;
  sejarah: string;
  geografi: GeografiDesa;
  demografi: DemografiDesa;
  potensi: PotensiDesa;
  sosialBudaya: SosialBudayaDesa;
  infrastruktur: InfrastrukturItem[];
  pemerintah: PemerintahDesa;
}

// Statistics Interfaces
export interface StatistikPenduduk { tahun: string; lakiLaki: number; perempuan: number; }
export interface StatistikPendidikan { name: string; value: number; }
export interface StatistikMataPencaharian { profesi: string; jumlah: number; }
export interface StatistikApbdes { tahun: string; pendapatan: number; belanja: number; }
export interface StatistikSdgs { subject: string; A: number; fullMark: number; }
export interface StatistikPertanian { komoditas: string; luasLahan: number; produksi: number; }
export interface StatistikUmkm { kategori: string; jumlah: number; }

export interface StatisticsData {
  penduduk: StatistikPenduduk[];
  pendidikan: StatistikPendidikan[];
  mataPencaharian: StatistikMataPencaharian[];
  apbdes: StatistikApbdes[];
  sdgs: StatistikSdgs[];
  pertanian: StatistikPertanian[];
  umkm: StatistikUmkm[];
}

// Map Interfaces
export type PointCategory = 'Balai Desa' | 'Sekolah' | 'Masjid' | 'Posyandu' | 'Puskesmas' | 'Sawah' | 'Irigasi' | 'UMKM' | 'Wisata' | 'BUMDes';

export interface MapPoint {
  id: string;
  name: string;
  category: PointCategory;
  lat: number;
  lng: number;
  description: string;
}

export interface MapCategory {
  name: PointCategory;
  color: string;
  icon: string;
}

export interface MapData {
  center: { lat: number; lng: number };
  categories: MapCategory[];
  points: MapPoint[];
}
