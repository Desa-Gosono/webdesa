import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/config/supabase';
import toast from 'react-hot-toast';

export interface News {
  id: string;
  title: string;
  slug: string;
  content: string;
  thumbnail_url: string;
  author: string;
  status: 'draft' | 'published' | 'archive';
  published_at: string;
  created_at: string;
  updated_at: string;
}

export type InsertNews = Omit<News, 'id' | 'created_at' | 'updated_at'>;
export type UpdateNews = Partial<InsertNews>;

export function useNews() {
  const queryClient = useQueryClient();
  const queryKey = ['news'];

  // FETCH: Ambil semua berita (dengan opsi limit dan select spesifik)
  const useFetchNews = (limit?: number, select = '*') => {
    return useQuery({
      queryKey: limit ? ['news', { limit, select }] : ['news', { select }],
      queryFn: async () => {
        let query = supabase
          .from('news')
          .select(select)
          .order('created_at', { ascending: false });

        if (limit) {
          query = query.limit(limit);
        }

        const { data, error } = await query;

        if (error) {
          toast.error(`Gagal memuat berita: ${error.message}`);
          throw error;
        }
        return data as News[];
      },
    });
  };

  // FETCH: Ambil berita berdasarkan slug
  const useFetchNewsBySlug = (slug: string | undefined) => {
    return useQuery({
      queryKey: ['news', slug],
      queryFn: async () => {
        if (!slug) throw new Error('Slug is required');
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .eq('slug', slug)
          .single();

        if (error) {
          throw error;
        }
        return data as News;
      },
      enabled: !!slug,
    });
  };

  // CREATE: Tambah berita baru
  const useCreateNews = () => {
    return useMutation({
      mutationFn: async (newNews: InsertNews) => {
        const { data, error } = await supabase
          .from('news')
          .insert([newNews])
          .select()
          .single();

        if (error) throw error;
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
        toast.success('Berita berhasil ditambahkan! 🚀');
      },
      onError: (error) => {
        toast.error(`Gagal menambah berita: ${error.message}`);
      }
    });
  };

  // UPDATE: Ubah berita yang ada
  const useUpdateNews = () => {
    return useMutation({
      mutationFn: async ({ id, updates }: { id: string; updates: UpdateNews }) => {
        // Otomatis memperbarui kolom updated_at jika ada field di Supabase
        // Atau kita set manual dari frontend jika diperlukan
        const { data, error } = await supabase
          .from('news')
          .update(updates)
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
        toast.success('Berita berhasil diperbarui! ✨');
      },
      onError: (error) => {
        toast.error(`Gagal memperbarui berita: ${error.message}`);
      }
    });
  };

  // DELETE: Hapus berita
  const useDeleteNews = () => {
    return useMutation({
      mutationFn: async (id: string) => {
        const { error } = await supabase
          .from('news')
          .delete()
          .eq('id', id);

        if (error) throw error;
        return id;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey });
        toast.success('Berita berhasil dihapus! 🗑️');
      },
      onError: (error) => {
        toast.error(`Gagal menghapus berita: ${error.message}`);
      }
    });
  };

  return {
    useFetchNews,
    useFetchNewsBySlug,
    useCreateNews,
    useUpdateNews,
    useDeleteNews,
  };
}
