export interface BaseModel {
  id: string;
  created_at?: string;
  updated_at?: string;
}

export interface Profile extends BaseModel {
  id: string;
  village_name: string;
  district: string;
  regency: string;
  province: string;
  description: string | null;
  history: string | null;
  vision: string | null;
  mission: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  logo_url: string | null;
  hero_image_url: string | null;
  mayor_name?: string | null;
  mayor_photo?: string | null;
  mayor_greeting?: string | null;
  population?: number;
  families?: number;
  area?: number;
  hamlets?: number;
  rt?: number;
  demografi_laki?: number;
  demografi_perempuan?: number;
  demografi_pend_belum_sekolah?: number;
  demografi_pend_sd?: number;
  demografi_pend_smp?: number;
  demografi_pend_sma?: number;
  demografi_pend_sarjana?: number;
  demografi_pek_petani?: number;
  demografi_pek_wiraswasta?: number;
  demografi_pek_karyawan?: number;
  demografi_pek_pns?: number;
  demografi_pek_pelajar?: number;
  demografi_pek_lainnya?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Official {
  id: string;
  name: string;
  position: string;
  photo_url: string | null;
  description: string | null;
  order_number: number;
  created_at?: string;
  updated_at?: string;
}

export interface Potential {
  id: string;
  title: string;
  category: string;
  description: string | null;
  address: string | null;
  image_url: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Umkm {
  id: string;
  name: string;
  owner: string | null;
  category: string | null;
  description: string | null;
  nib: string | null;
  product: string | null;
  phone: string | null;
  address: string | null;
  image_url: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface News {
  id: string;
  title: string;
  slug: string | null;
  content: string;
  thumbnail_url: string | null;
  author: string | null;
  status: 'draft' | 'published' | 'archive';
  published_at: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Agenda {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  event_date: string | null;
  image_url: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Gallery {
  id: string;
  title: string | null;
  category: string | null;
  description: string | null;
  media_type: 'image' | 'video';
  media_url: string;
  created_at?: string;
}

export interface Facility {
  id: string;
  name: string | null;
  category: string | null;
  description: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  image_url: string | null;
  created_at?: string;
}

export interface Contact {
  id: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  instagram: string | null;
  facebook: string | null;
  youtube: string | null;
  whatsapp: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface Setting {
  id: string;
  key: string;
  value: string | null;
  created_at?: string;
  updated_at?: string;
}

export type Berita = News;
export type ProfilDesa = Profile;
export type SejarahDesa = Profile; // Fallback
export type VisiMisi = Profile; // Fallback
export type PemerintahanDesa = Profile; // Fallback
export type PerangkatDesa = Official;
export type PotensiDesa = Potential;
export type GaleriFoto = Gallery;
export type GaleriVideo = Gallery;
export type FasilitasUmum = Facility;
export type Kontak = Contact;
export type PengaturanWebsite = Setting;
export interface GenericCategoryItem extends Record<string, any> {
  id: string;
  title: string;
  created_at?: string;
  updated_at?: string;
}