import React, { useState } from 'react';
import { PageHeader } from '@/components/admin/ui/PageHeader';
import { DataTable } from '@/components/admin/ui/DataTable';
import { Modal } from '@/components/admin/ui/Modal';
import { ConfirmDialog } from '@/components/admin/ui/ConfirmDialog';
import { useBerita } from '@/hooks/useAdmin';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Berita } from '@/models/types';
import { ColumnDef } from '@tanstack/react-table';

const beritaSchema = z.object({
  judul: z.string().min(3, 'Judul minimal 3 karakter'),
  konten: z.string().min(10, 'Konten minimal 10 karakter'),
  penulis: z.string().min(3, 'Penulis minimal 3 karakter'),
  kategori: z.string().min(1, 'Kategori harus diisi'),
  status: z.enum(['Draft', 'Published']),
  gambarUrl: z.string().optional(),
});

type BeritaFormValues = z.infer<typeof beritaSchema>;

export default function BeritaAdminPage() {
  const { useGetAll, useCreate, useUpdate, useDelete } = useBerita();
  const { data: beritaData = [], isLoading } = useGetAll();
  const createMutation = useCreate();
  const updateMutation = useUpdate();
  const deleteMutation = useDelete();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BeritaFormValues>({
    resolver: zodResolver(beritaSchema),
    defaultValues: {
      status: 'Draft',
    },
  });

  const handleOpenCreate = () => {
    setSelectedId(null);
    reset({
      judul: '',
      konten: '',
      penulis: '',
      kategori: '',
      status: 'Draft',
      gambarUrl: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (data: Berita) => {
    setSelectedId(data.id);
    reset({
      judul: data.judul,
      konten: data.konten,
      penulis: data.penulis,
      kategori: data.kategori,
      status: data.status,
      gambarUrl: data.gambarUrl || '',
    });
    setIsModalOpen(true);
  };

  const handleOpenDelete = (id: string) => {
    setSelectedId(id);
    setIsConfirmOpen(true);
  };

  const onSubmit = async (data: BeritaFormValues) => {
    if (selectedId) {
      await updateMutation.mutateAsync({ id: selectedId, item: data });
    } else {
      await createMutation.mutateAsync(data);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    if (selectedId) {
      await deleteMutation.mutateAsync(selectedId);
      setIsConfirmOpen(false);
    }
  };

  const columns: ColumnDef<Berita>[] = [
    {
      accessorKey: 'judul',
      header: 'Judul Berita',
      cell: ({ row }) => (
        <div className="font-medium text-gray-900 dark:text-white">
          {row.getValue('judul')}
        </div>
      ),
    },
    {
      accessorKey: 'kategori',
      header: 'Kategori',
    },
    {
      accessorKey: 'penulis',
      header: 'Penulis',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              status === 'Published'
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
            }`}
          >
            {status}
          </span>
        );
      },
    },
    {
      id: 'actions',
      header: 'Aksi',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleOpenEdit(row.original)}
            className="p-1.5 text-blue-600 bg-blue-50 rounded hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40 transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleOpenDelete(row.original.id)}
            className="p-1.5 text-red-600 bg-red-50 rounded hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Kelola Berita"
        description="Manajemen publikasi berita dan artikel desa."
        breadcrumbs={[
          { label: 'Dashboard', path: '/admin' },
          { label: 'Informasi' },
          { label: 'Berita' },
        ]}
        action={
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            Tambah Berita
          </button>
        }
      />

      {isLoading ? (
        <div className="flex justify-center p-12">
          <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      ) : (
        <DataTable data={beritaData} columns={columns} searchPlaceholder="Cari berita..." />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedId ? 'Edit Berita' : 'Tambah Berita'}
        maxWidth="2xl"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Judul</label>
            <input
              {...register('judul')}
              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
              placeholder="Masukkan judul berita"
            />
            {errors.judul && <p className="text-red-500 text-sm mt-1">{errors.judul.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Kategori</label>
              <input
                {...register('kategori')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                placeholder="Contoh: Pengumuman"
              />
              {errors.kategori && <p className="text-red-500 text-sm mt-1">{errors.kategori.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Penulis</label>
              <input
                {...register('penulis')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                placeholder="Nama penulis"
              />
              {errors.penulis && <p className="text-red-500 text-sm mt-1">{errors.penulis.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Konten</label>
            <textarea
              {...register('konten')}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
              placeholder="Tulis konten berita disini..."
            />
            {errors.konten && <p className="text-red-500 text-sm mt-1">{errors.konten.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Status</label>
              <select
                {...register('status')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
              {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">URL Gambar (Opsional)</label>
              <input
                {...register('gambarUrl')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2"
            >
              {(createMutation.isPending || updateMutation.isPending) && (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              )}
              Simpan
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Hapus Berita"
        message="Apakah Anda yakin ingin menghapus berita ini? Tindakan ini tidak dapat dibatalkan."
        isLoading={deleteMutation.isPending}
      />
    </>
  );
}
