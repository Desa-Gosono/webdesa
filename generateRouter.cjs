const fs = require('fs');
const path = require('path');

const pages = [
  { group: 'home', name: 'HomePage', path: '/' },
  
  { group: 'profile', name: 'ProfilPage', path: 'profil' },
  { group: 'profile', name: 'SejarahPage', path: 'sejarah' },
  { group: 'profile', name: 'VisiMisiPage', path: 'visi-misi' },
  { group: 'profile', name: 'StrukturPage', path: 'struktur' },
  { group: 'profile', name: 'PerangkatPage', path: 'perangkat' },
  { group: 'profile', name: 'WilayahPage', path: 'wilayah' },
  { group: 'profile', name: 'DemografiPage', path: 'demografi' },
  
  { group: 'potency', name: 'PotensiPage', path: 'potensi' },
  { group: 'potency', name: 'PertanianPage', path: 'pertanian' },
  { group: 'potency', name: 'PeternakanPage', path: 'peternakan' },
  { group: 'potency', name: 'PerikananPage', path: 'perikanan' },
  { group: 'potency', name: 'UmkmPage', path: 'umkm' },
  { group: 'potency', name: 'BumdesPage', path: 'bumdes' },
  { group: 'potency', name: 'WisataPage', path: 'wisata' },
  { group: 'potency', name: 'BudayaPage', path: 'budaya' },
  
  { group: 'information', name: 'BeritaPage', path: 'berita' },
  { group: 'information', name: 'PengumumanPage', path: 'pengumuman' },
  { group: 'information', name: 'AgendaPage', path: 'agenda' },
  { group: 'information', name: 'GaleriPage', path: 'galeri' },
  
  { group: 'program', name: 'ProgramPage', path: 'program' },
  { group: 'program', name: 'PembangunanPage', path: 'pembangunan' },
  { group: 'program', name: 'SdgsPage', path: 'sdgs' },
  
  { group: 'data', name: 'StatistikPage', path: 'statistik' },
  { group: 'data', name: 'PetaPage', path: 'peta' },
  
  { group: 'services', name: 'LayananPage', path: 'layanan' },
  { group: 'services', name: 'DokumenPage', path: 'dokumen' },
  
  { group: 'contact', name: 'KontakPage', path: 'kontak' },
  { group: 'contact', name: 'FaqPage', path: 'faq' },
  { group: 'contact', name: 'PengaduanPage', path: 'pengaduan' },
  { group: 'contact', name: 'PpidPage', path: 'ppid' },
  
  { group: 'legal', name: 'PrivacyPolicyPage', path: 'privacy-policy' },
];

const imports = pages.map(p => `const ${p.name} = lazy(() => import('@/pages/${p.group}/${p.name}'));`).join('\n');
const routes = pages.map(p => `      { ${p.path === '/' ? 'index: true' : `path: '${p.path}'`}, element: <${p.name} /> },`).join('\n');

const routerFile = `import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PublicLayout } from '@/layouts/PublicLayout';

const NotFoundPage = lazy(() => import('@/pages/errors/NotFoundPage'));

${imports}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    errorElement: <NotFoundPage />,
    children: [
${routes}
      { path: '*', element: <NotFoundPage /> }
    ]
  }
]);
`;

fs.writeFileSync(path.join(__dirname, 'src', 'routes', 'index.tsx'), routerFile);
console.log('Router generated!');
