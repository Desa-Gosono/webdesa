const fs = require('fs');
const path = require('path');

const hooks = [
  { name: 'Potentials', table: 'potentials', singular: 'Potential' },
  { name: 'Umkm', table: 'umkm', singular: 'Umkm' },
  { name: 'Agenda', table: 'agenda', singular: 'Agenda' },
  { name: 'Gallery', table: 'gallery', singular: 'Gallery' },
  { name: 'Facilities', table: 'facilities', singular: 'Facility' },
  { name: 'Contacts', table: 'contacts', singular: 'Contact' },
];

const template = (name, table, singular) => `import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/config/supabase';
import { ${singular} } from '@/models/types';
import toast from 'react-hot-toast';

export type Insert${singular} = Omit<${singular}, 'id' | 'created_at' | 'updated_at'>;
export type Update${singular} = Partial<Insert${singular}>;

export function use${name}() {
  const queryClient = useQueryClient();
  const queryKey = ['${table}'];

  const useFetch${name} = () => {
    return useQuery({
      queryKey,
      queryFn: async () => {
        const { data, error } = await supabase
          .from('${table}')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          toast.error('Gagal memuat data: ' + error.message);
          throw error;
        }
        return data as ${singular}[];
      },
    });
  };

  const useCreate${singular} = () => {
    return useMutation({
      mutationFn: async (newData: Insert${singular}) => {
        const { data, error } = await supabase
          .from('${table}')
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

  const useUpdate${singular} = () => {
    return useMutation({
      mutationFn: async ({ id, updates }: { id: string; updates: Update${singular} }) => {
        const { data, error } = await supabase
          .from('${table}')
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

  const useDelete${singular} = () => {
    return useMutation({
      mutationFn: async (id: string) => {
        const { error } = await supabase
          .from('${table}')
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
    useFetch${name},
    useCreate${singular},
    useUpdate${singular},
    useDelete${singular},
  };
}
`;

hooks.forEach((hook) => {
  const name = hook.name;
  const filePath = path.join(__dirname, 'src', 'hooks', 'use' + name + '.ts');
  fs.writeFileSync(filePath, template(name, hook.table, hook.singular));
  console.log('Generated ' + filePath);
});
