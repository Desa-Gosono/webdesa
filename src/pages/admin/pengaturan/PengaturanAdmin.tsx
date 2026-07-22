import React, { useEffect, useState, useRef } from 'react';
import { PageHeader } from '@/components/admin/ui/PageHeader';
import { Settings, Globe, Phone, Share2, MapPin, Search, LayoutTemplate, Monitor, Save, Upload, Image as ImageIcon } from 'lucide-react';
import { useSettings, InsertSetting } from '@/hooks/useSettings';
import { uploadImage } from '@/utils/storage';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';
import { ConfirmDialog } from '@/components/admin/ui/ConfirmDialog';

type Tab = 'general' | 'contact' | 'social' | 'location' | 'seo' | 'footer' | 'homepage' | 'system';

export default function PengaturanAdmin() {
  const { useFetchSettings, useUpdateSettings } = useSettings();
  const { data: settings = [], isLoading } = useFetchSettings();
  const updateSettings = useUpdateSettings();
  
  const [activeTab, setActiveTab] = useState<Tab>('general');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // File input refs
  const logoInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);
  const heroImageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (settings.length > 0) {
      const initialData: Record<string, string> = {};
      settings.forEach(setting => {
        initialData[setting.key] = setting.value || '';
      });
      setFormData(initialData);
    }
  }, [settings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked ? 'true' : 'false' }));
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldKey: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const url = await uploadImage(file, 'settings');
      if (url) {
        setFormData(prev => ({ ...prev, [fieldKey]: url }));
        toast.success(`Berhasil mengunggah file`);
      }
    } catch (error: any) {
      toast.error('Gagal mengunggah file: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = () => {
    setShowConfirm(true);
  };

  const confirmSave = async () => {
    setIsSaving(true);
    setShowConfirm(false);
    
    try {
      const settingsArray: InsertSetting[] = Object.entries(formData).map(([key, value]) => ({
        key,
        value
      }));
      
      await updateSettings.mutateAsync(settingsArray);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: 'general', label: 'Umum', icon: Globe },
    { id: 'contact', label: 'Kontak', icon: Phone },
    { id: 'social', label: 'Sosial Media', icon: Share2 },
    { id: 'location', label: 'Lokasi', icon: MapPin },
    { id: 'seo', label: 'SEO', icon: Search },
    { id: 'footer', label: 'Footer', icon: LayoutTemplate },
    { id: 'homepage', label: 'Beranda', icon: Monitor },
    { id: 'system', label: 'Sistem', icon: Settings },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-10 h-10 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader 
          title="Pengaturan Website" 
          description="Kelola konfigurasi, identitas, dan preferensi website Anda"
          breadcrumbs={[
            { label: 'Admin', path: '/admin' },
            { label: 'Pengaturan' }
          ]}
        />
        
        <Button 
          onClick={handleSave} 
          disabled={isSaving || isUploading}
          className="flex items-center gap-2"
        >
          {isSaving ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Save className="w-5 h-5" />
          )}
          Simpan Perubahan
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as Tab)}
                    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap lg:whitespace-normal text-left
                      ${activeTab === tab.id 
                        ? 'bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 border-b-2 lg:border-b-0 lg:border-l-2 border-sky-500' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                      }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
            
            {/* General Tab */}
            {activeTab === 'general' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 border-b pb-2 dark:border-slate-700">Pengaturan Umum</h3>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Nama Website</label>
                    <input 
                      type="text" 
                      name="website_name" 
                      value={formData.website_name || ''} 
                      onChange={handleChange}
                      placeholder="Misal: Desa Gosono"
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Tagline Website</label>
                    <input 
                      type="text" 
                      name="website_tagline" 
                      value={formData.website_tagline || ''} 
                      onChange={handleChange}
                      placeholder="Misal: Maju dan Sejahtera"
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Deskripsi Website</label>
                    <textarea 
                      name="website_description" 
                      value={formData.website_description || ''} 
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t dark:border-slate-700">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Logo Website</label>
                      <div className="flex items-start gap-4">
                        <div className="w-24 h-24 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center bg-slate-50 dark:bg-slate-800 overflow-hidden shrink-0">
                          {formData.website_logo ? (
                            <img src={formData.website_logo} alt="Logo" className="w-full h-full object-contain" />
                          ) : (
                            <ImageIcon className="w-8 h-8 text-slate-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <input 
                            type="file" 
                            ref={logoInputRef}
                            className="hidden" 
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, 'website_logo')}
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => logoInputRef.current?.click()}
                            disabled={isUploading}
                            className="w-full justify-center mb-2"
                          >
                            <Upload className="w-4 h-4 mr-2" /> Upload Logo
                          </Button>
                          <p className="text-xs text-slate-500">Format: PNG, JPG (Disarankan resolusi 200x200px)</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Favicon Website</label>
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center bg-slate-50 dark:bg-slate-800 overflow-hidden shrink-0">
                          {formData.website_favicon ? (
                            <img src={formData.website_favicon} alt="Favicon" className="w-full h-full object-contain" />
                          ) : (
                            <ImageIcon className="w-6 h-6 text-slate-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <input 
                            type="file" 
                            ref={faviconInputRef}
                            className="hidden" 
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, 'website_favicon')}
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => faviconInputRef.current?.click()}
                            disabled={isUploading}
                            className="w-full justify-center mb-2"
                          >
                            <Upload className="w-4 h-4 mr-2" /> Upload Favicon
                          </Button>
                          <p className="text-xs text-slate-500">Format: PNG, ICO (Disarankan 32x32px)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === 'contact' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 border-b pb-2 dark:border-slate-700">Kontak Desa</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Alamat Lengkap</label>
                    <textarea 
                      name="contact_address" 
                      value={formData.contact_address || ''} 
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Nomor Telepon</label>
                    <input 
                      type="text" 
                      name="contact_phone" 
                      value={formData.contact_phone || ''} 
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Alamat Email</label>
                    <input 
                      type="email" 
                      name="contact_email" 
                      value={formData.contact_email || ''} 
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Nomor WhatsApp</label>
                    <input 
                      type="text" 
                      name="contact_whatsapp" 
                      value={formData.contact_whatsapp || ''} 
                      onChange={handleChange}
                      placeholder="Format: 628123456789"
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Social Media Tab */}
            {activeTab === 'social' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 border-b pb-2 dark:border-slate-700">Sosial Media</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">URL Facebook</label>
                    <input 
                      type="text" 
                      name="social_facebook" 
                      value={formData.social_facebook || ''} 
                      onChange={handleChange}
                      placeholder="https://facebook.com/..."
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">URL Instagram</label>
                    <input 
                      type="text" 
                      name="social_instagram" 
                      value={formData.social_instagram || ''} 
                      onChange={handleChange}
                      placeholder="https://instagram.com/..."
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">URL YouTube</label>
                    <input 
                      type="text" 
                      name="social_youtube" 
                      value={formData.social_youtube || ''} 
                      onChange={handleChange}
                      placeholder="https://youtube.com/..."
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">URL TikTok</label>
                    <input 
                      type="text" 
                      name="social_tiktok" 
                      value={formData.social_tiktok || ''} 
                      onChange={handleChange}
                      placeholder="https://tiktok.com/@..."
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Location Tab */}
            {activeTab === 'location' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 border-b pb-2 dark:border-slate-700">Peta & Lokasi</h3>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Google Maps Embed URL</label>
                    <textarea 
                      name="location_map_url" 
                      value={formData.location_map_url || ''} 
                      onChange={handleChange}
                      rows={4}
                      placeholder="<iframe src='...' ></iframe>"
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-sky-500 font-mono text-sm"
                    />
                    <p className="text-xs text-slate-500 mt-2">Paste kode iframe atau URL dari Google Maps</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Latitude</label>
                      <input 
                        type="text" 
                        name="location_lat" 
                        value={formData.location_lat || ''} 
                        onChange={handleChange}
                        placeholder="-7.xxxxx"
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Longitude</label>
                      <input 
                        type="text" 
                        name="location_lng" 
                        value={formData.location_lng || ''} 
                        onChange={handleChange}
                        placeholder="110.xxxxx"
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SEO Tab */}
            {activeTab === 'seo' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 border-b pb-2 dark:border-slate-700">Search Engine Optimization (SEO)</h3>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Meta Title</label>
                    <input 
                      type="text" 
                      name="seo_title" 
                      value={formData.seo_title || ''} 
                      onChange={handleChange}
                      placeholder="Title untuk Search Engine"
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Meta Description</label>
                    <textarea 
                      name="seo_description" 
                      value={formData.seo_description || ''} 
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Meta Keywords</label>
                    <input 
                      type="text" 
                      name="seo_keywords" 
                      value={formData.seo_keywords || ''} 
                      onChange={handleChange}
                      placeholder="desa, gosono, website desa, dll"
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Footer Tab */}
            {activeTab === 'footer' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 border-b pb-2 dark:border-slate-700">Pengaturan Footer</h3>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Deskripsi Footer</label>
                    <textarea 
                      name="footer_description" 
                      value={formData.footer_description || ''} 
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Copyright Text</label>
                    <input 
                      type="text" 
                      name="footer_copyright" 
                      value={formData.footer_copyright || ''} 
                      onChange={handleChange}
                      placeholder="© 2026 Desa Gosono. All rights reserved."
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Homepage Tab */}
            {activeTab === 'homepage' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 border-b pb-2 dark:border-slate-700">Tampilan Beranda</h3>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Hero Image / Background</label>
                    <div className="flex flex-col gap-4">
                      {formData.hero_image && (
                        <div className="h-48 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                          <img src={formData.hero_image} alt="Hero" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div>
                        <input 
                          type="file" 
                          ref={heroImageInputRef}
                          className="hidden" 
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'hero_image')}
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => heroImageInputRef.current?.click()}
                          disabled={isUploading}
                        >
                          <Upload className="w-4 h-4 mr-2" /> Ganti Gambar Hero
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Hero Title</label>
                    <input 
                      type="text" 
                      name="hero_title" 
                      value={formData.hero_title || ''} 
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Hero Subtitle</label>
                    <input 
                      type="text" 
                      name="hero_subtitle" 
                      value={formData.hero_subtitle || ''} 
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Hero Description</label>
                    <textarea 
                      name="hero_description" 
                      value={formData.hero_description || ''} 
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Call to Action (CTA) Text</label>
                      <input 
                        type="text" 
                        name="cta_text" 
                        value={formData.cta_text || ''} 
                        onChange={handleChange}
                        placeholder="Contoh: Lihat Profil"
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">CTA URL</label>
                      <input 
                        type="text" 
                        name="cta_url" 
                        value={formData.cta_url || ''} 
                        onChange={handleChange}
                        placeholder="/profil"
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* System Tab */}
            {activeTab === 'system' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 border-b pb-2 dark:border-slate-700">Pengaturan Sistem</h3>
                <div className="grid grid-cols-1 gap-6">
                  
                  <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <div>
                      <h4 className="font-medium text-slate-800 dark:text-white">Maintenance Mode</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Aktifkan untuk menutup akses publik ke website sementara waktu.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="maintenance_mode" 
                        checked={formData.maintenance_mode === 'true'} 
                        onChange={handleToggle}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-sky-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-sky-600"></div>
                    </label>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Jumlah Berita di Beranda</label>
                      <input 
                        type="number" 
                        name="display_news_count" 
                        value={formData.display_news_count || '3'} 
                        onChange={handleChange}
                        min="1" max="10"
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Jumlah Galeri di Beranda</label>
                      <input 
                        type="number" 
                        name="display_gallery_count" 
                        value={formData.display_gallery_count || '6'} 
                        onChange={handleChange}
                        min="1" max="20"
                        className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={confirmSave}
        title="Simpan Pengaturan"
        message="Apakah Anda yakin ingin menyimpan perubahan pengaturan ini? Perubahan akan langsung diterapkan ke website publik."
        confirmText="Ya, Simpan"
        cancelText="Batal"
      />
    </div>
  );
}
