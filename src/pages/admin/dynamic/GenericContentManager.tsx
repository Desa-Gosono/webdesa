import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import { categoriesConfig } from '@/config/categoriesConfig';
import { useDynamicCrud } from '@/hooks/useDynamicCrud';
import { uploadImage } from '@/utils/storage';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function GenericContentManager() {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  if (!categoryId || !categoriesConfig[categoryId]) {
    return <Navigate to="/admin" replace />;
  }
  
  const config = categoriesConfig[categoryId];
  const Icon = config.icon;

  const { useFetchAll, useCreate, useUpdate, useDelete } = useDynamicCrud(config.collectionName);
  const { data: items = [], isLoading } = useFetchAll();
  const createMutation = useCreate();
  const updateMutation = useUpdate();
  const deleteMutation = useDelete();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  
  // File uploads state per field name
  const [fileFiles, setFileFiles] = useState<Record<string, File | null>>({});
  const [filePreviews, setFilePreviews] = useState<Record<string, string | null>>({});

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const formValues = watch();

  // Reset form when modal opens or category changes
  useEffect(() => {
    if (!isModalOpen) {
      reset();
      setFileFiles({});
      setFilePreviews({});
    }
  }, [isModalOpen, reset, categoryId]);

  const openCreateModal = () => {
    setSelectedId(null);
    const defaultValues: Record<string, any> = {};
    config.fields.forEach(f => {
      if (f.type === 'select' && f.options?.length) {
        defaultValues[f.name] = f.options[0].value;
      }
    });
    reset(defaultValues);
    setIsModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setSelectedId(item.id);
    const previews: Record<string, string | null> = {};
    config.fields.forEach(f => {
      if (f.type === 'image' && item[f.name]) {
        previews[f.name] = item[f.name];
      }
    });
    setFilePreviews(previews);
    reset(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus data ini?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileFiles(prev => ({ ...prev, [fieldName]: file }));
      setFilePreviews(prev => ({ ...prev, [fieldName]: URL.createObjectURL(file) }));
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const payload = { ...data };

      // Handle uploads
      for (const field of config.fields) {
        if (field.type === 'image') {
          if (fileFiles[field.name]) {
            payload[field.name] = await uploadImage(fileFiles[field.name]!, config.collectionName);
          } else if (filePreviews[field.name]) {
            payload[field.name] = filePreviews[field.name];
          }
        }
      }

      if (selectedId) {
        await updateMutation.mutateAsync({ id: selectedId, updates: payload });
      } else {
        await createMutation.mutateAsync(payload);
      }
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(error.message || 'Gagal menyimpan data');
    }
  };

  const themeClass = `text-emerald-600 dark:text-emerald-400`;
  const bgThemeClass = `bg-emerald-600 hover:bg-emerald-700`;

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/30`}>
              <Icon className={`w-6 h-6 ${themeClass}`} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-white">{config.title}</h1>
              <p className="text-slate-500 text-sm mt-1">{config.description}</p>
            </div>
          </div>
          <button 
            onClick={openCreateModal}
            className={`px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-lg text-white ${bgThemeClass}`}
          >
            <Plus className="w-5 h-5" /> Tambah Data
          </button>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 overflow-x-auto">
          {isLoading ? (
            <div className="py-12 text-center">
              <div className={`inline-block w-8 h-8 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin`}></div>
            </div>
          ) : items.length > 0 ? (
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-700 text-left">
                  {config.columns.map(col => (
                    <th key={col.key} className="pb-4 font-bold text-slate-600 dark:text-slate-400">{col.label}</th>
                  ))}
                  <th className="pb-4 font-bold text-slate-600 dark:text-slate-400 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item: any) => (
                  <tr key={item.id} className="border-b border-slate-50 dark:border-slate-700/50 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    {config.columns.map(col => (
                      <td key={col.key} className="py-4">
                        {col.type === 'image' ? (
                          <div className="w-16 h-16 rounded-lg bg-slate-100 dark:bg-slate-700 overflow-hidden flex items-center justify-center">
                            {item[col.key] ? (
                              <img src={item[col.key]} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <ImageIcon className="w-6 h-6 text-slate-400" />
                            )}
                          </div>
                        ) : col.type === 'badge' ? (
                          <span className={`px-3 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full text-xs font-bold`}>
                            {item[col.key]}
                          </span>
                        ) : col.type === 'date' ? (
                          <span className="text-sm text-slate-600 dark:text-slate-300">
                            {item[col.key] ? new Date(item[col.key]).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}
                          </span>
                        ) : (
                          <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                            {item[col.key]}
                          </span>
                        )}
                      </td>
                    ))}
                    <td className="py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openEditModal(item)} className="p-2 bg-sky-100 text-sky-600 hover:bg-sky-200 rounded-lg transition-colors"><Edit className="w-4 h-4"/></button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 bg-rose-100 text-rose-600 hover:bg-rose-200 rounded-lg transition-colors"><Trash2 className="w-4 h-4"/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-12 text-center text-slate-500">
              Belum ada data tersedia.
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 shrink-0">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                  {selectedId ? 'Edit Data' : 'Tambah Data'}
                </h2>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 overflow-y-auto flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {config.fields.map(field => {
                    if (field.dependsOn) {
                      if (formValues[field.dependsOn.field] !== field.dependsOn.value) {
                        return null;
                      }
                    }
                    
                    return (
                      <div key={field.name} className={field.gridSpan === 2 ? 'md:col-span-2' : 'col-span-1'}>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">{field.label}</label>
                        
                        {field.type === 'text' || field.type === 'number' || field.type === 'date' ? (
                          <div>
                            <input 
                              type={field.type} 
                              placeholder={field.placeholder}
                              {...register(field.name, { required: field.required })} 
                              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-emerald-500 text-slate-700 dark:text-slate-200" 
                            />
                            {errors[field.name] && <span className="text-rose-500 text-xs">Wajib diisi</span>}
                          </div>
                        ) : field.type === 'textarea' || field.type === 'richtext' ? (
                          <textarea 
                            rows={4} 
                            placeholder={field.placeholder}
                            {...register(field.name, { required: field.required })} 
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-emerald-500 text-slate-700 dark:text-slate-200 resize-none" 
                          />
                        ) : field.type === 'location' ? (
                          <div className="flex flex-col gap-3">
                            <input 
                              type="text" 
                              placeholder={field.placeholder || "Masukkan alamat atau nama lokasi (misal: Desa Gosono)"}
                              {...register(field.name, { required: field.required })} 
                              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-emerald-500 text-slate-700 dark:text-slate-200" 
                            />
                            {formValues[field.name] && (
                              <div className="w-full h-48 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 flex items-center justify-center">
                                <iframe 
                                  src={`https://maps.google.com/maps?q=${encodeURIComponent(formValues[field.name])}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                                  width="100%" 
                                  height="100%" 
                                  frameBorder="0" 
                                  style={{ border: 0 }} 
                                  allowFullScreen
                                />
                              </div>
                            )}
                          </div>
                        ) : field.type === 'select' ? (
                          <select 
                            {...register(field.name, { required: field.required })} 
                            className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-emerald-500 text-slate-700 dark:text-slate-200"
                          >
                            {field.options?.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        ) : field.type === 'image' ? (
                          <div className="flex flex-col items-start gap-3">
                            <div className="w-full max-w-[200px] h-32 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-600">
                              {filePreviews[field.name] ? (
                                <img src={filePreviews[field.name]!} alt="Preview" className="w-full h-full object-cover" />
                              ) : (
                                <ImageIcon className="w-8 h-8 text-slate-400" />
                              )}
                            </div>
                            <label className={`cursor-pointer text-sm font-bold hover:underline ${themeClass}`}>
                              Upload Foto
                              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, field.name)} />
                            </label>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-3 sticky bottom-0 bg-white dark:bg-slate-800 pb-2">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-slate-600 font-bold hover:bg-slate-100 rounded-xl transition-colors">Batal</button>
                  <button type="submit" disabled={createMutation.isPending || updateMutation.isPending} className={`px-6 py-2.5 text-white font-bold rounded-xl shadow-lg transition-colors ${bgThemeClass} disabled:opacity-50`}>
                    Simpan Data
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
