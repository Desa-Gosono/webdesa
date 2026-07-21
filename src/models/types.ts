export interface BaseModel {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProfilDesa extends BaseModel {
  nama: string;
  deskripsi: string;
  alamat: string;
  telepon: string;
  email: string;
  logoUrl?: string;
}

export interface SejarahDesa extends BaseModel {
  konten: string;
}

export interface VisiMisi extends BaseModel {
  visi: string;
  misi: string[];
}

export interface PemerintahanDesa extends BaseModel {
  namaInstansi: string;
  deskripsi: string;
}

export interface PerangkatDesa extends BaseModel {
  nama: string;
  jabatan: string;
  fotoUrl?: string;
  tugas?: string;
}

export type KategoriPotensi = 'UMKM' | 'Pertanian' | 'Peternakan' | 'Budaya';

export interface PotensiDesa extends BaseModel {
  kategori: KategoriPotensi;
  judul: string;
  deskripsi: string;
  gambarUrl?: string;
}

export interface Berita extends BaseModel {
  judul: string;
  konten: string;
  penulis: string;
  gambarUrl?: string;
  kategori: string;
  status: 'Draft' | 'Published';
}

export interface Agenda extends BaseModel {
  judul: string;
  deskripsi: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  lokasi: string;
  penyelenggara: string;
}

export interface GaleriFoto extends BaseModel {
  judul: string;
  deskripsi?: string;
  gambarUrl: string;
}

export interface GaleriVideo extends BaseModel {
  judul: string;
  deskripsi?: string;
  videoUrl: string; // YouTube or external link
}

export interface FasilitasUmum extends BaseModel {
  nama: string;
  kategori: string;
  deskripsi?: string;
  gambarUrl?: string;
  lokasi: string;
}

export interface Kontak extends BaseModel {
  nama: string;
  email: string;
  subjek: string;
  pesan: string;
  status: 'Unread' | 'Read' | 'Replied';
}

export interface PengaturanWebsite extends BaseModel {
  namaWebsite: string;
  deskripsiWebsite: string;
  warnaUtama: string;
  warnaSekunder: string;
}
