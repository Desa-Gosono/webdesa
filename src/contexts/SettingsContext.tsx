import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/config/supabase';

interface SettingsContextType {
  settings: Record<string, string>;
  isLoading: boolean;
}

const SettingsContext = createContext<SettingsContextType>({
  settings: {},
  isLoading: true,
});

export const useSettingsContext = () => useContext(SettingsContext);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const { data, error } = await supabase.from('settings').select('*');
        if (error) {
          console.error('Error fetching settings for context:', error);
          return;
        }
        
        if (data) {
          const settingsMap: Record<string, string> = {};
          data.forEach(item => {
            settingsMap[item.key] = item.value || '';
          });
          setSettings(settingsMap);
        }
      } catch (err) {
        console.error('Failed to load settings:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSettings();

    // Setup realtime subscription for settings changes
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'settings' },
        (payload) => {
          const newRecord = payload.new as Record<string, any>;
          if (newRecord && 'key' in newRecord) {
            setSettings(prev => ({
              ...prev,
              [newRecord.key]: newRecord.value || ''
            }));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (settings.website_name) {
      document.title = settings.website_name;
    }
    
    if (settings.website_favicon) {
      let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.href = settings.website_favicon;
    }
  }, [settings.website_name, settings.website_favicon]);

  return (
    <SettingsContext.Provider value={{ settings, isLoading }}>
      {children}
    </SettingsContext.Provider>
  );
};
