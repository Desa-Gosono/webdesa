import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/config/supabase';
import { Gallery } from '@/models/types';
import toast from 'react-hot-toast';

export type InsertGallery = Omit<Gallery, 'id' | 'created_at' | 'updated_at'>;
export type UpdateGallery = Partial<InsertGallery>;

export function useGallery() {
  const queryClient = useQueryClient();
  const queryKey = ['gallery'];

  const useFetchGallery = (limit?: number, select = '*') => {
    return useQuery({
      queryKey: limit ? ['gallery', { limit, select }] : ['gallery', { select }],
      queryFn: async () => {
        let query = supabase
          .from('gallery')
          .select(select)
          .order('created_at', { ascending: false });

        if (limit) {
          query = query.limit(limit);
        }

        const { data, error } = await query;

        if (error) {
          toast.error('Gagal memuat data: ' + error.message);
          throw error;
        }
        return data as Gallery[];
      },
    });
  };

  const useCreateGallery = () => {
    return useMutation({
      mutationFn: async (newData: InsertGallery) => {
        const { data, error } = await supabase
          .from('gallery')
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

  const useUpdateGallery = () => {
    return useMutation({
      mutationFn: async ({ id, updates }: { id: string; updates: UpdateGallery }) => {
        const { data, error } = await supabase
          .from('gallery')
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

  const useDeleteGallery = () => {
    return useMutation({
      mutationFn: async (id: string) => {
        const { error } = await supabase
          .from('gallery')
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
    useFetchGallery,
    useCreateGallery,
    useUpdateGallery,
    useDeleteGallery,
  };
}
