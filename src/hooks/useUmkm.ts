import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/config/supabase';
import { Umkm } from '@/models/types';
import toast from 'react-hot-toast';

export type InsertUmkm = Omit<Umkm, 'id' | 'created_at' | 'updated_at'>;
export type UpdateUmkm = Partial<InsertUmkm>;
export type { Umkm };

export function useUmkm() {
  const queryClient = useQueryClient();
  const queryKey = ['umkm'];

  const useFetchUmkm = () => {
    return useQuery({
      queryKey,
      queryFn: async () => {
        const { data, error } = await supabase
          .from('umkm')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          toast.error('Gagal memuat data: ' + error.message);
          throw error;
        }
        return data as Umkm[];
      },
    });
  };

  const useFetchUmkmById = (id: string | undefined) => {
    return useQuery({
      queryKey: ['umkm', id],
      queryFn: async () => {
        if (!id) throw new Error('ID is required');
        const { data, error } = await supabase
          .from('umkm')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }
        return data as Umkm;
      },
      enabled: !!id,
    });
  };

  const useCreateUmkm = () => {
    return useMutation({
      mutationFn: async (newData: InsertUmkm) => {
        const { data, error } = await supabase
          .from('umkm')
          .insert([newData])
          .select()
          .single();

        if (error) throw error;
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
        toast.success('Data berhasil ditambahkan!');
      },
      onError: (error) => {
        toast.error('Gagal menambah data: ' + error.message);
      }
    });
  };

  const useUpdateUmkm = () => {
    return useMutation({
      mutationFn: async ({ id, updates }: { id: string; updates: UpdateUmkm }) => {
        const { data, error } = await supabase
          .from('umkm')
          .update(updates)
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
        toast.error('Gagal memperbarui data: ' + error.message);
      }
    });
  };

  const useDeleteUmkm = () => {
    return useMutation({
      mutationFn: async (id: string) => {
        const { error } = await supabase
          .from('umkm')
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
        toast.error('Gagal menghapus data: ' + error.message);
      }
    });
  };

  return {
    useFetchUmkm,
    useFetchUmkmById,
    useCreateUmkm,
    useUpdateUmkm,
    useDeleteUmkm,
  };
}
