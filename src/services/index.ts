import { BaseService } from './BaseService';
import {
  Berita,
  Agenda,
  ProfilDesa,
  SejarahDesa,
  VisiMisi,
  PemerintahanDesa,
  PerangkatDesa,
  PotensiDesa,
  GaleriFoto,
  GaleriVideo,
  FasilitasUmum,
  Kontak,
  PengaturanWebsite,
} from '@/models/types';

export const beritaService = new BaseService<Berita>('berita');
export const agendaService = new BaseService<Agenda>('agenda');
export const profilService = new BaseService<ProfilDesa>('profil');
export const sejarahService = new BaseService<SejarahDesa>('sejarah');
export const visiMisiService = new BaseService<VisiMisi>('visimisi');
export const pemerintahanService = new BaseService<PemerintahanDesa>('pemerintahan');
export const perangkatDesaService = new BaseService<PerangkatDesa>('perangkatdesa');
export const potensiService = new BaseService<PotensiDesa>('potensi');
export const galeriFotoService = new BaseService<GaleriFoto>('galerifoto');
export const galeriVideoService = new BaseService<GaleriVideo>('galerivideo');
export const fasilitasUmumService = new BaseService<FasilitasUmum>('fasilitasumum');
export const kontakService = new BaseService<Kontak>('kontak');
export const pengaturanService = new BaseService<PengaturanWebsite>('pengaturan');
