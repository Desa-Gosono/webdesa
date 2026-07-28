import React, { useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { categoriesConfig } from '@/config/categoriesConfig';
import { useDynamicCrud } from '@/hooks/useDynamicCrud';
import { PageHero } from '@/components/ui/PageHero';
import { Calendar, User, MapPin } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';
import { motion } from 'framer-motion';

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
  const { data: items = [], isLoading } = useFetchAll();

  // Settings background key convention: bg_berita, bg_potensi, etc.
  const bgKey = `bg_${categoryId}`;
  const illKey = `ill_${categoryId}`;
  const backgroundImage = settingsMap[bgKey] || "https://images.unsplash.com/photo-1596423735880-5c62d08a5464?auto=format&fit=crop&w=2000&q=80";
  const illustrationUrl = settingsMap[illKey];

  const themeClass = `text-${config.themeColor}-600 dark:text-${config.themeColor}-400`;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <PageHero 
        title={config.title}
        description={config.description}
        icon={config.icon}
        backgroundImage={backgroundImage}
        illustrationUrl={illustrationUrl}
      />

      <div className="container mx-auto px-4 py-12 relative z-10 max-w-7xl">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className={`w-12 h-12 border-4 border-${config.themeColor}-200 border-t-${config.themeColor}-500 rounded-full animate-spin`}></div>
          </div>
        ) : items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item: any, index: number) => {
              const imageCol = config.columns.find(c => c.type === 'image')?.key;
              const titleCol = config.columns.find(c => c.key === 'title' || c.key === 'name')?.key;
              const dateCol = config.columns.find(c => c.type === 'date')?.key;
              
              const imageUrl = imageCol ? item[imageCol] : null;
              const title = titleCol ? item[titleCol] : 'Item';
              
              const detailPath = `/${categoryId}/${item.slug || item.id}`;

              return (
                <Link to={detailPath} key={item.id} className="group block">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 h-full flex flex-col"
                  >
                    <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-700">
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
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-3">
                        {dateCol && item[dateCol] && (
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {new Date(item[dateCol]).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </div>
                        )}
                        {item.author && (
                          <div className="flex items-center gap-1.5">
                            <User className="w-4 h-4" />
                            {item.author}
                          </div>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-sky-500 transition-colors line-clamp-2">
                        {title}
                      </h3>
                      
                      {item.description && (
                        <p className="text-slate-600 dark:text-slate-300 text-sm line-clamp-3 mb-4">
                          {item.description}
                        </p>
                      )}
                      
                      {item.address && (
                        <div className="flex items-start gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
                          <MapPin className="w-4 h-4 shrink-0 text-rose-500" />
                          <span className="line-clamp-2">{item.address}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
            <config.icon className={`w-16 h-16 mx-auto mb-4 text-slate-300 dark:text-slate-600`} />
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Belum ada {config.title.toLowerCase()}</h3>
            <p className="text-slate-500 dark:text-slate-400">Data untuk halaman ini belum tersedia.</p>
          </div>
        )}
      </div>
    </div>
  );
}
