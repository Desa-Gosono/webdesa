import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/config/supabase';
import toast from 'react-hot-toast';

export function useDynamicCrud(collectionName: string) {
  const queryClient = useQueryClient();
  const queryKey = [collectionName];

  // FETCH: Ambil semua data
  const useFetchAll = () => {
    return useQuery({
      queryKey,
      queryFn: async () => {
        const { data, error } = await supabase
          .from(collectionName)
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          toast.error(`Gagal memuat data: ${error.message}`);
          throw error;
        }
        return data || [];
      },
    });
  };

  // FETCH: Ambil data berdasarkan id
  const useFetchById = (id: string | undefined) => {
    return useQuery({
      queryKey: [collectionName, id],
      queryFn: async () => {
        if (!id) throw new Error('ID is required');
        const { data, error } = await supabase
          .from(collectionName)
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        return data;
      },
      enabled: !!id,
    });
  };
  
  // FETCH: Ambil data berdasarkan slug (berguna untuk berita dll)
  const useFetchBySlug = (slug: string | undefined) => {
    return useQuery({
      queryKey: [collectionName, 'slug', slug],
      queryFn: async () => {
        if (!slug) throw new Error('Slug is required');
        const { data, error } = await supabase
          .from(collectionName)
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) throw error;
        return data;
      },
      enabled: !!slug,
    });
  };

  // CREATE
  const useCreate = () => {
    return useMutation({
      mutationFn: async (payload: any) => {
        const { data, error } = await supabase
          .from(collectionName)
          .insert([payload])
          .select()
          .single();

        if (error) throw error;
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
        toast.success('Data berhasil ditambahkan');
      },
      onError: (error: any) => {
        toast.error(`Gagal menambahkan data: ${error.message}`);
      }
    });
  };

  // UPDATE
  const useUpdate = () => {
    return useMutation({
      mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
        const { data, error } = await supabase
          .from(collectionName)
          .update(updates)
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
        toast.success('Data berhasil diperbarui');
      },
      onError: (error: any) => {
        toast.error(`Gagal memperbarui data: ${error.message}`);
      }
    });
  };

  // DELETE
  const useDelete = () => {
    return useMutation({
      mutationFn: async (id: string) => {
        const { error } = await supabase
          .from(collectionName)
          .delete()
          .eq('id', id);

        if (error) throw error;
        return id;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
        toast.success('Data berhasil dihapus');
      },
      onError: (error: any) => {
        toast.error(`Gagal menghapus data: ${error.message}`);
      }
    });
  };

  return {
    useFetchAll,
    useFetchById,
    useFetchBySlug,
    useCreate,
    useUpdate,
    useDelete,
  };
}
