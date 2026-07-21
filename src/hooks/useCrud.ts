import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { BaseService } from '@/services/BaseService';
import { BaseModel } from '@/models/types';
import toast from 'react-hot-toast';

export function useCrud<T extends BaseModel>(queryKey: string, service: BaseService<T>) {
  const queryClient = useQueryClient();

  const useGetAll = () => {
    return useQuery({
      queryKey: [queryKey],
      queryFn: () => service.getAll(),
    });
  };

  const useGetById = (id: string) => {
    return useQuery({
      queryKey: [queryKey, id],
      queryFn: () => service.getById(id),
      enabled: !!id,
    });
  };

  const useCreate = () => {
    return useMutation({
      mutationFn: (item: Omit<T, 'id' | 'createdAt' | 'updatedAt'>) => service.create(item),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        toast.success('Data berhasil ditambahkan');
      },
      onError: (error) => {
        toast.error(`Gagal menambahkan data: ${error.message}`);
      }
    });
  };

  const useUpdate = () => {
    return useMutation({
      mutationFn: ({ id, item }: { id: string; item: Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>> }) => 
        service.update(id, item),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        toast.success('Data berhasil diperbarui');
      },
      onError: (error) => {
        toast.error(`Gagal memperbarui data: ${error.message}`);
      }
    });
  };

  const useDelete = () => {
    return useMutation({
      mutationFn: (id: string) => service.delete(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        toast.success('Data berhasil dihapus');
      },
      onError: (error) => {
        toast.error(`Gagal menghapus data: ${error.message}`);
      }
    });
  };

  return {
    useGetAll,
    useGetById,
    useCreate,
    useUpdate,
    useDelete,
  };
}
