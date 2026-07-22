import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/config/supabase';
import { Contact } from '@/models/types';
import toast from 'react-hot-toast';

export type InsertContact = Omit<Contact, 'id' | 'created_at' | 'updated_at'>;
export type UpdateContact = Partial<InsertContact>;

export function useContacts() {
  const queryClient = useQueryClient();
  const queryKey = ['contacts'];

  const useFetchContacts = () => {
    return useQuery({
      queryKey,
      queryFn: async () => {
        const { data, error } = await supabase
          .from('contacts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          toast.error('Gagal memuat data: ' + error.message);
          throw error;
        }
        return data as Contact[];
      },
    });
  };

  const useCreateContact = () => {
    return useMutation({
      mutationFn: async (newData: InsertContact) => {
        const { data, error } = await supabase
          .from('contacts')
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

  const useUpdateContact = () => {
    return useMutation({
      mutationFn: async ({ id, updates }: { id: string; updates: UpdateContact }) => {
        const { data, error } = await supabase
          .from('contacts')
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

  const useDeleteContact = () => {
    return useMutation({
      mutationFn: async (id: string) => {
        const { error } = await supabase
          .from('contacts')
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
    useFetchContacts,
    useCreateContact,
    useUpdateContact,
    useDeleteContact,
  };
}
