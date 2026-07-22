import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/config/supabase';
import { Profile } from '@/models/types';
import toast from 'react-hot-toast';

export type UpdateProfile = Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>;

export function useProfile() {
  const queryClient = useQueryClient();
  const queryKey = ['profile'];

  const useFetchProfile = () => {
    return useQuery({
      queryKey,
      queryFn: async () => {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .limit(1)
          .single();

        if (error && error.code !== 'PGRST116') { // Ignore "No rows found"
          toast.error(`Gagal memuat profil: ${error.message}`);
          throw error;
        }
        return data as Profile | null;
      },
    });
  };

  const useUpdateProfile = () => {
    return useMutation({
      mutationFn: async ({ id, updates }: { id: string; updates: UpdateProfile }) => {
        const { data, error } = await supabase
          .from('profiles')
          .update({ ...updates, updated_at: new Date().toISOString() })
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
        toast.success('Profil berhasil diperbarui!');
      },
      onError: (error) => {
        toast.error(`Gagal memperbarui profil: ${error.message}`);
      }
    });
  };

  return {
    useFetchProfile,
    useUpdateProfile,
  };
}
