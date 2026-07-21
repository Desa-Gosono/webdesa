const fs = require('fs');
const path = require('path');

const pages = [
  { group: 'home', name: 'HomePage', title: 'Beranda' },
  
  { group: 'profile', name: 'ProfilPage', title: 'Profil Desa' },
  { group: 'profile', name: 'SejarahPage', title: 'Sejarah Desa' },
  { group: 'profile', name: 'VisiMisiPage', title: 'Visi Misi' },
  { group: 'profile', name: 'StrukturPage', title: 'Struktur Organisasi' },
  { group: 'profile', name: 'PerangkatPage', title: 'Perangkat Desa' },
  { group: 'profile', name: 'WilayahPage', title: 'Wilayah Administrasi' },
  { group: 'profile', name: 'DemografiPage', title: 'Demografi' },
  
  { group: 'potency', name: 'PotensiPage', title: 'Potensi Desa' },
  { group: 'potency', name: 'PertanianPage', title: 'Pertanian' },
  { group: 'potency', name: 'PeternakanPage', title: 'Peternakan' },
  { group: 'potency', name: 'PerikananPage', title: 'Perikanan' },
  { group: 'potency', name: 'UmkmPage', title: 'UMKM' },
  { group: 'potency', name: 'BumdesPage', title: 'BUMDes' },
  { group: 'potency', name: 'WisataPage', title: 'Wisata' },
  { group: 'potency', name: 'BudayaPage', title: 'Budaya' },
  
  { group: 'information', name: 'BeritaPage', title: 'Berita' },
  { group: 'information', name: 'PengumumanPage', title: 'Pengumuman' },
  { group: 'information', name: 'AgendaPage', title: 'Agenda' },
  { group: 'information', name: 'GaleriPage', title: 'Galeri' },
  
  { group: 'program', name: 'ProgramPage', title: 'Program Desa' },
  { group: 'program', name: 'PembangunanPage', title: 'Pembangunan' },
  { group: 'program', name: 'SdgsPage', title: 'SDGs Desa' },
  
  { group: 'data', name: 'StatistikPage', title: 'Data Statistik' },
  { group: 'data', name: 'PetaPage', title: 'Peta Desa' },
  
  { group: 'services', name: 'LayananPage', title: 'Layanan Publik' },
  { group: 'services', name: 'DokumenPage', title: 'Download Dokumen' },
  
  { group: 'contact', name: 'KontakPage', title: 'Kontak' },
  { group: 'contact', name: 'FaqPage', title: 'FAQ' },
  { group: 'contact', name: 'PengaduanPage', title: 'Pengaduan' },
  { group: 'contact', name: 'PpidPage', title: 'PPID' },
  
  { group: 'legal', name: 'PrivacyPolicyPage', title: 'Privacy Policy' },
  
  { group: 'errors', name: 'NotFoundPage', title: '404 Not Found' }
];

const template = (name, title) => `import React from 'react';
import { PageHero } from '@/components/ui/PageHero';
import { Leaf } from 'lucide-react';

export default function ${name}() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHero 
        title="${title}" 
        description="Jelajahi informasi lengkap mengenai ${title.toLowerCase()} di Desa Gosono."
        icon={Leaf}
      />
      <div className="container mx-auto px-4 py-12 relative z-10 flex-grow">
        {/* TODO: Implement ${title} content here */}
        <div className="h-96 rounded-2xl border border-gray-200 bg-white/80 p-8 shadow-sm backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
          <h2 className="font-display text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Konten ${title}</h2>
          <p className="text-gray-500 dark:text-gray-400">Konten sedang dalam tahap pengembangan sesuai dengan Design System Modern Formal.</p>
        </div>
      </div>
    </div>
  );
}
`;

pages.forEach(page => {
  const dir = path.join(__dirname, 'src', 'pages', page.group);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const filePath = path.join(dir, `${page.name}.tsx`);
  fs.writeFileSync(filePath, template(page.name, page.title));
});

console.log('Successfully generated 33 pages!');
