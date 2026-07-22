import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/config/supabase';
import { Facility } from '@/models/types';
import toast from 'react-hot-toast';

export type InsertFacility = Omit<Facility, 'id' | 'created_at' | 'updated_at'>;
export type UpdateFacility = Partial<InsertFacility>;

export function useFacilities() {
  const queryClient = useQueryClient();
  const queryKey = ['facilities'];

  const useFetchFacilities = () => {
    return useQuery({
      queryKey,
      queryFn: async () => {
        const { data, error } = await supabase
          .from('facilities')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          toast.error('Gagal memuat data: ' + error.message);
          throw error;
        }
        return data as Facility[];
      },
    });
  };

  const useCreateFacility = () => {
    return useMutation({
      mutationFn: async (newData: InsertFacility) => {
        const { data, error } = await supabase
          .from('facilities')
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

  const useUpdateFacility = () => {
    return useMutation({
      mutationFn: async ({ id, updates }: { id: string; updates: UpdateFacility }) => {
        const { data, error } = await supabase
          .from('facilities')
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

  const useDeleteFacility = () => {
    return useMutation({
      mutationFn: async (id: string) => {
        const { error } = await supabase
          .from('facilities')
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
    useFetchFacilities,
    useCreateFacility,
    useUpdateFacility,
    useDeleteFacility,
  };
}
