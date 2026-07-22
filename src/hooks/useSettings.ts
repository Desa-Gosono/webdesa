import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/config/supabase';
import { Setting } from '@/models/types';
import toast from 'react-hot-toast';

export type InsertSetting = Omit<Setting, 'id' | 'created_at' | 'updated_at'>;

export function useSettings() {
  const queryClient = useQueryClient();
  const queryKey = ['settings'];

  const useFetchSettings = () => {
    return useQuery({
      queryKey,
      queryFn: async () => {
        const { data, error } = await supabase
          .from('settings')
          .select('*');

        if (error) {
          console.error('Error fetching settings:', error);
          // Return empty array instead of throwing to prevent crashing if table is empty/missing
          return [] as Setting[];
        }
        return data as Setting[];
      },
    });
  };

  const useUpdateSettings = () => {
    return useMutation({
      mutationFn: async (settings: InsertSetting[]) => {
        // Upsert all settings based on key
        const { data, error } = await supabase
          .from('settings')
          .upsert(settings, { onConflict: 'key' })
          .select();

        if (error) throw error;
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
        toast.success('Pengaturan berhasil disimpan!');
      },
      onError: (error) => {
        toast.error('Gagal menyimpan pengaturan: ' + error.message);
      }
    });
  };

  return {
    useFetchSettings,
    useUpdateSettings,
  };
}
