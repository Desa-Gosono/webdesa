import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/config/supabase';
import { Official } from '@/models/types';
import toast from 'react-hot-toast';

export type InsertOfficial = Omit<Official, 'id' | 'created_at' | 'updated_at'>;
export type UpdateOfficial = Partial<InsertOfficial>;
export type { Official };

export function useOfficials() {
  const queryClient = useQueryClient();
  const queryKey = ['officials'];

  const useFetchOfficials = () => {
    return useQuery({
      queryKey,
      queryFn: async () => {
        const { data, error } = await supabase
          .from('officials')
          .select('*')
          .order('order_number', { ascending: true })
          .order('created_at', { ascending: true });

        if (error) {
          toast.error(`Gagal memuat perangkat desa: ${error.message}`);
          throw error;
        }
        return data as Official[];
      },
    });
  };

  const useCreateOfficial = () => {
    return useMutation({
      mutationFn: async (newOfficial: InsertOfficial) => {
        const { data, error } = await supabase
          .from('officials')
          .insert([newOfficial])
          .select()
          .single();

        if (error) throw error;
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
        toast.success('Data perangkat desa berhasil ditambahkan!');
      },
      onError: (error) => {
        toast.error(`Gagal menambah data: ${error.message}`);
      }
    });
  };

  const useUpdateOfficial = () => {
    return useMutation({
      mutationFn: async ({ id, updates }: { id: string; updates: UpdateOfficial }) => {
        const { data, error } = await supabase
          .from('officials')
          .update({ ...updates, updated_at: new Date().toISOString() })
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
        toast.success('Data berhasil diperbarui!');
      },
      onError: (error) => {
        toast.error(`Gagal memperbarui data: ${error.message}`);
      }
    });
  };

  const useDeleteOfficial = () => {
    return useMutation({
      mutationFn: async (id: string) => {
        const { error } = await supabase
          .from('officials')
          .delete()
          .eq('id', id);

        if (error) throw error;
        return id;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
        toast.success('Data berhasil dihapus!');
      },
      onError: (error) => {
        toast.error(`Gagal menghapus data: ${error.message}`);
      }
    });
  };

  return {
    useFetchOfficials,
    useCreateOfficial,
    useUpdateOfficial,
    useDeleteOfficial,
  };
}
