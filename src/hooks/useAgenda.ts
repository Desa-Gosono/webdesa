import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/config/supabase';
import { Agenda } from '@/models/types';
import toast from 'react-hot-toast';

export type InsertAgenda = Omit<Agenda, 'id' | 'created_at' | 'updated_at'>;
export type UpdateAgenda = Partial<InsertAgenda>;

export function useAgenda() {
  const queryClient = useQueryClient();
  const queryKey = ['agenda'];

  const useFetchAgenda = () => {
    return useQuery({
      queryKey,
      queryFn: async () => {
        const { data, error } = await supabase
          .from('agenda')
          .select('*')
          .order('event_date', { ascending: false });

        if (error) {
          toast.error('Gagal memuat data: ' + error.message);
          throw error;
        }
        return data as Agenda[];
      },
    });
  };

  const useCreateAgenda = () => {
    return useMutation({
      mutationFn: async (newData: InsertAgenda) => {
        const { data, error } = await supabase
          .from('agenda')
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

  const useUpdateAgenda = () => {
    return useMutation({
      mutationFn: async ({ id, updates }: { id: string; updates: UpdateAgenda }) => {
        const { data, error } = await supabase
          .from('agenda')
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

  const useDeleteAgenda = () => {
    return useMutation({
      mutationFn: async (id: string) => {
        const { error } = await supabase
          .from('agenda')
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
    useFetchAgenda,
    useCreateAgenda,
    useUpdateAgenda,
    useDeleteAgenda,
  };
}
