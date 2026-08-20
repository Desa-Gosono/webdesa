import React, { useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { categoriesConfig } from '@/config/categoriesConfig';
import { useDynamicCrud } from '@/hooks/useDynamicCrud';
import { PageHero } from '@/components/ui/PageHero';
import { Calendar, User, MapPin, Phone, Search, Filter, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';
import { motion, AnimatePresence } from 'framer-motion';
import { SkeletonCard } from '@/components/ui/Skeleton';

export default function DynamicCategoryTemplate() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { useFetchSettings } = useSettings();
  const { data: settings = [] } = useFetchSettings();

  const settingsMap = useMemo(() => {
    const map: Record<string, string> = {};
    settings.forEach((s: any) => {
      map[s.key] = s.value;
    });
    return map;
  }, [settings]);

  if (!categoryId || !categoriesConfig[categoryId]) {
    return <Navigate to="/" replace />;
  }

  const config = categoriesConfig[categoryId];
  const { useFetchAll } = useDynamicCrud(config.collectionName);
  const { data: items = [], isLoading } = useFetchAll(100);

  const [activeFilter, setActiveFilter] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedItem, setSelectedItem] = React.useState<any | null>(null);
  const ITEMS_PER_PAGE = categoryId === 'agenda' ? 10 : 6;

  React.useEffect(() => {
    // Parse URL params for filter
    const params = new URLSearchParams(window.location.search);
    const filterParam = params.get('filter');
    if (filterParam) {
      setActiveFilter(filterParam);
    } else {
      setActiveFilter(null);
    }
    setCurrentPage(1);
  }, [window.location.search]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    const url = new URL(window.location.href);
    if (val) {
      url.searchParams.set('filter', val);
    } else {
      url.searchParams.delete('filter');
    }
    window.history.pushState({}, '', url.toString());
    setActiveFilter(val || null);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const availableCategories = React.useMemo(() => {
    const cats = items.map((item: any) => item.category).filter(Boolean);
    return Array.from(new Set(cats)) as string[];
  }, [items]);

  // Use the same background for related categories
  const bgCategory = (categoryId === 'umkm' || categoryId === 'potensi') ? 'potensi' :
    (categoryId === 'agenda' || categoryId === 'berita') ? 'berita' : categoryId;
  const bgKey = `bg_${bgCategory}`;
  const illKey = `ill_${bgCategory}`;
  const backgroundImage = settingsMap[bgKey] || "https://images.unsplash.com/photo-1596423735880-5c62d08a5464?auto=format&fit=crop&w=2000&q=80";
  const illustrationUrl = settingsMap[illKey];

  const themeClass = `text-emerald-600 dark:text-emerald-400`;

  const displayItems = React.useMemo(() => {
    let result = items;
    if (activeFilter) {
      result = result.filter((item: any) => item.category === activeFilter);
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter((item: any) => {
        const titleCol = config.columns.find(c => c.key === 'title' || c.key === 'name')?.key;
        const title = titleCol ? item[titleCol] : '';
        return (title?.toLowerCase().includes(q)) || (item.description?.toLowerCase().includes(q));
      });
    }
    return result;
  }, [items, activeFilter, searchQuery, config]);

  const totalPages = Math.ceil(displayItems.length / ITEMS_PER_PAGE);
  const paginatedItems = displayItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <PageHero
        title={config.title}
        description={config.description}
        icon={config.icon}
        backgroundImage={backgroundImage}
        illustrationUrl={illustrationUrl}
      />

      <div className="container mx-auto px-4 py-8 relative z-10 max-w-7xl">
        {(categoryId === 'potensi' || categoryId === 'umkm') && (
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <Link
              to="/kategori/potensi"
              className={`px-6 py-2.5 rounded-full font-semibold transition-all shadow-sm ${categoryId === 'potensi' && !activeFilter ? 'bg-emerald-600 text-white ring-2 ring-emerald-600 ring-offset-2' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}
            >
              Potensi
            </Link>
            <Link
              to="/kategori/umkm"
              className={`px-6 py-2.5 rounded-full font-semibold transition-all shadow-sm ${categoryId === 'umkm' ? 'bg-emerald-600 text-white ring-2 ring-emerald-600 ring-offset-2' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}
            >
              UMKM
            </Link>
          </div>
        )}

        {(categoryId === 'berita' || categoryId === 'agenda') && (
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <Link
              to="/kategori/berita"
              className={`px-6 py-2.5 rounded-full font-semibold transition-all shadow-sm ${categoryId === 'berita' ? 'bg-emerald-600 text-white ring-2 ring-emerald-600 ring-offset-2' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}
            >
              Berita
            </Link>
            <Link
              to="/kategori/agenda"
              className={`px-6 py-2.5 rounded-full font-semibold transition-all shadow-sm ${categoryId === 'agenda' ? 'bg-emerald-600 text-white ring-2 ring-emerald-600 ring-offset-2' : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 border border-slate-200'}`}
            >
              Agenda
            </Link>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="relative w-full md:flex-1 max-w-md flex-shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder={`Cari ${config.title}...`}
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-emerald-500 text-slate-700 dark:text-slate-200 transition-colors"
            />
          </div>

          {availableCategories.length > 0 && (
            <div className="relative w-full md:w-64 flex-shrink-0">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <select
                value={activeFilter || ''}
                onChange={handleFilterChange}
                className="w-full pl-12 pr-10 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-emerald-500 text-slate-700 dark:text-slate-200 transition-colors appearance-none cursor-pointer"
              >
                <option value="">Semua Kategori</option>
                {availableCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className={categoryId === 'agenda' ? "flex flex-col gap-6" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"}>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : displayItems.length > 0 ? (
          <>
            <div className={categoryId === 'agenda' ? "flex flex-col gap-6" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"}>
              {paginatedItems.map((item: any, index: number) => {
                const imageCol = config.columns.find(c => c.type === 'image')?.key;
              const titleCol = config.columns.find(c => c.key === 'title' || c.key === 'name')?.key;
              const dateCol = config.columns.find(c => c.type === 'date')?.key;

              const imageUrl = imageCol ? item[imageCol] : null;
              const title = titleCol ? item[titleCol] : 'Item';

              const detailPath = `/${categoryId}/${item.slug || item.id}`;

              const cardContent = (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 dark:border-slate-700 h-full flex ${categoryId === 'agenda' ? 'flex-col sm:flex-row items-center sm:max-h-36' : 'flex-col'}`}
                >
                  <div className={`relative overflow-hidden bg-slate-100 dark:bg-slate-700 shrink-0 ${categoryId === 'agenda' ? 'w-full sm:w-48 h-32 sm:h-full sm:min-h-[9rem]' : 'h-56'}`}>
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <config.icon className="w-16 h-16 text-slate-300 dark:text-slate-600" />
                      </div>
                    )}

                    {item.category && (
                      <div className={`absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full text-xs font-bold shadow-sm ${themeClass}`}>
                        {item.category}
                      </div>
                    )}
                  </div>

                  <div className={`flex flex-col flex-grow ${categoryId === 'agenda' ? 'p-3 sm:p-4 justify-center w-full' : 'p-6'}`}>
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                      {dateCol && item[dateCol] && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(item[dateCol]).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                      )}
                      {item.author && (
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5" />
                          {item.author}
                        </div>
                      )}
                    </div>

                    <h3 className={`font-bold text-slate-800 dark:text-white mb-1.5 group-hover:text-sky-500 transition-colors line-clamp-2 ${categoryId === 'agenda' ? 'text-base leading-tight' : 'text-xl mb-3'}`}>
                      {title}
                    </h3>

                    {item.description && (
                      <p className={`text-slate-600 dark:text-slate-300 text-sm mb-2 text-justify ${categoryId === 'agenda' ? 'line-clamp-1' : 'line-clamp-3 mb-4'}`}>
                        {item.description}
                      </p>
                    )}

                    {categoryId === 'berita' && (
                      <div className="mt-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 group-hover:underline">
                        baca selengkapnya &gt;
                      </div>
                    )}

                    {(item.address || item.location || item.phone || item.contact) && (
                      <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-slate-100 dark:border-slate-700" onClick={(e) => e.stopPropagation()}>
                        {(item.address || item.location) && (
                          <div
                            className="flex items-start gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-rose-500 transition-colors cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault();
                              const loc = item.address || item.location;
                              const isUrl = loc.startsWith('http://') || loc.startsWith('https://');
                              if (isUrl) {
                                window.open(loc, '_blank');
                              } else {
                                window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc)}`, '_blank');
                              }
                            }}
                            title="Buka di Google Maps"
                          >
                            <MapPin className="w-4 h-4 shrink-0 text-rose-500" />
                            <span className="line-clamp-1">Lihat Lokasi</span>
                          </div>
                        )}
                        {(item.phone || item.contact) && (
                          <div
                            className="flex items-start gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-500 transition-colors cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault();
                              const ph = item.phone || item.contact;
                              const cleanPhone = ph.replace(/\D/g, '');
                              const waPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.substring(1) : cleanPhone;
                              window.open(`https://wa.me/${waPhone}`, '_blank');
                            }}
                            title="Hubungi via WhatsApp"
                          >
                            <Phone className="w-4 h-4 shrink-0 text-emerald-500" />
                            <span className="line-clamp-1">Hubungi Kontak</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              );

              if (categoryId === 'agenda' || categoryId === 'galeri') {
                return (
                  <div key={item.id} onClick={() => setSelectedItem(item)} className="group block cursor-pointer">
                    {cardContent}
                  </div>
                );
              }

              return (
                <Link to={detailPath} key={item.id} className="group block">
                  {cardContent}
                </Link>
              );
            })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 flex items-center justify-center rounded-xl font-medium transition-colors ${
                        currentPage === page
                          ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                          : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
            <config.icon className={`w-16 h-16 mx-auto mb-4 text-slate-300 dark:text-slate-600`} />
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Belum ada {config.title.toLowerCase()}</h3>
            <p className="text-slate-500 dark:text-slate-400">Data untuk halaman ini belum tersedia.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 max-w-4xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto ${categoryId === 'galeri' ? 'flex flex-col md:flex-row gap-6' : ''}`}
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-full text-slate-600 dark:text-slate-300 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
              
              {categoryId === 'galeri' ? (
                <>
                  <div className="w-full md:w-2/3 h-64 md:h-[60vh] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-700 shrink-0">
                    {config.columns.find(c => c.type === 'image') && selectedItem[config.columns.find(c => c.type === 'image')!.key] && (
                      <img 
                        src={selectedItem[config.columns.find(c => c.type === 'image')!.key]} 
                        alt={selectedItem[config.columns.find(c => c.key === 'title' || c.key === 'name')?.key || 'title']} 
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                  <div className="flex flex-col w-full md:w-1/3">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-4 leading-tight pr-8">
                      {selectedItem[config.columns.find(c => c.key === 'title' || c.key === 'name')?.key || 'title']}
                    </h2>
                    
                    <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-4">
                      {config.columns.find(c => c.type === 'date') && selectedItem[config.columns.find(c => c.type === 'date')!.key] && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-700/50 rounded-lg font-medium">
                          <Calendar className="w-4 h-4 text-emerald-500" />
                          {new Date(selectedItem[config.columns.find(c => c.type === 'date')!.key]).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                      )}
                      {selectedItem.author && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-700/50 rounded-lg font-medium">
                          <User className="w-4 h-4 text-sky-500" />
                          {selectedItem.author}
                        </div>
                      )}
                    </div>

                    {selectedItem.description && (
                      <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 text-justify mb-8 whitespace-pre-wrap">
                        {selectedItem.description}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-4">
                    {config.columns.find(c => c.type === 'date') && selectedItem[config.columns.find(c => c.type === 'date')!.key] && (
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-700/50 rounded-lg font-medium">
                        <Calendar className="w-4 h-4 text-emerald-500" />
                        {new Date(selectedItem[config.columns.find(c => c.type === 'date')!.key]).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                    )}
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-6 leading-tight pr-8">
                    {selectedItem[config.columns.find(c => c.key === 'title' || c.key === 'name')?.key || 'title']}
                  </h2>

                  {config.columns.find(c => c.type === 'image') && selectedItem[config.columns.find(c => c.type === 'image')!.key] && (
                    <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-6 bg-slate-100 dark:bg-slate-700">
                      <img 
                        src={selectedItem[config.columns.find(c => c.type === 'image')!.key]} 
                        alt="Cover" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {selectedItem.description && (
                    <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 text-justify mb-8 whitespace-pre-wrap">
                      {selectedItem.description}
                    </div>
                  )}

                  {(selectedItem.address || selectedItem.location || selectedItem.phone || selectedItem.contact) && (
                    <div className="flex flex-col gap-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                      <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Informasi Kontak & Lokasi</h4>
                      {(selectedItem.address || selectedItem.location) && (
                        <div
                          className="flex items-start gap-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-rose-500 transition-colors cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            const loc = selectedItem.address || selectedItem.location;
                            const isUrl = loc.startsWith('http://') || loc.startsWith('https://');
                            if (isUrl) {
                              window.open(loc, '_blank');
                            } else {
                              window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc)}`, '_blank');
                            }
                          }}
                          title="Buka di Google Maps"
                        >
                          <MapPin className="w-5 h-5 shrink-0 text-rose-500" />
                          <span className="mt-0.5">{selectedItem.address || selectedItem.location}</span>
                        </div>
                      )}
                      {(selectedItem.phone || selectedItem.contact) && (
                        <div
                          className="flex items-start gap-3 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-500 transition-colors cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            const ph = selectedItem.phone || selectedItem.contact;
                            const cleanPhone = ph.replace(/\D/g, '');
                            const waPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.substring(1) : cleanPhone;
                            window.open(`https://wa.me/${waPhone}`, '_blank');
                          }}
                          title="Hubungi via WhatsApp"
                        >
                          <Phone className="w-5 h-5 shrink-0 text-emerald-500" />
                          <span className="mt-0.5">{selectedItem.phone || selectedItem.contact}</span>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
