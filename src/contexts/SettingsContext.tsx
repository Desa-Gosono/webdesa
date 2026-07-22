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

  return (
    <SettingsContext.Provider value={{ settings, isLoading }}>
      {children}
    </SettingsContext.Provider>
  );
};
