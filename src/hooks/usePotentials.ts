import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/config/supabase';
import { Potential } from '@/models/types';
import toast from 'react-hot-toast';

export type InsertPotential = Omit<Potential, 'id' | 'created_at' | 'updated_at'>;
export type UpdatePotential = Partial<InsertPotential>;

export function usePotentials() {
  const queryClient = useQueryClient();
  const queryKey = ['potentials'];

  const useFetchPotentials = () => {
    return useQuery({
      queryKey,
      queryFn: async () => {
        const { data, error } = await supabase
          .from('potentials')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          toast.error('Gagal memuat data: ' + error.message);
          throw error;
        }
        return data as Potential[];
      },
    });
  };

  const useFetchPotentialById = (id: string | undefined) => {
    return useQuery({
      queryKey: ['potentials', id],
      queryFn: async () => {
        if (!id) throw new Error('ID is required');
        const { data, error } = await supabase
          .from('potentials')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }
        return data as Potential;
      },
      enabled: !!id,
    });
  };

  const useCreatePotential = () => {
    return useMutation({
      mutationFn: async (newData: InsertPotential) => {
        const { data, error } = await supabase
          .from('potentials')
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

  const useUpdatePotential = () => {
    return useMutation({
      mutationFn: async ({ id, updates }: { id: string; updates: UpdatePotential }) => {
        const { data, error } = await supabase
          .from('potentials')
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

  const useDeletePotential = () => {
    return useMutation({
      mutationFn: async (id: string) => {
        const { error } = await supabase
          .from('potentials')
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
    useFetchPotentials,
    useFetchPotentialById,
    useCreatePotential,
    useUpdatePotential,
    useDeletePotential,
  };
}
