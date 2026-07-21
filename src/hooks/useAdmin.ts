import { useCrud } from './useCrud';
import {
  beritaService,
  agendaService,
  profilService,
  sejarahService,
  visiMisiService,
  pemerintahanService,
  perangkatDesaService,
  potensiService,
  galeriFotoService,
  galeriVideoService,
  fasilitasUmumService,
  kontakService,
  pengaturanService,
} from '@/services';

export const useBerita = () => useCrud('berita', beritaService);
export const useAgenda = () => useCrud('agenda', agendaService);
export const useProfil = () => useCrud('profil', profilService);
export const useSejarah = () => useCrud('sejarah', sejarahService);
export const useVisiMisi = () => useCrud('visimisi', visiMisiService);
export const usePemerintahan = () => useCrud('pemerintahan', pemerintahanService);
export const usePerangkatDesa = () => useCrud('perangkatdesa', perangkatDesaService);
export const usePotensi = () => useCrud('potensi', potensiService);
export const useGaleriFoto = () => useCrud('galerifoto', galeriFotoService);
export const useGaleriVideo = () => useCrud('galerivideo', galeriVideoService);
export const useFasilitasUmum = () => useCrud('fasilitasumum', fasilitasUmumService);
export const useKontak = () => useCrud('kontak', kontakService);
export const usePengaturan = () => useCrud('pengaturan', pengaturanService);
