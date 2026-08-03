import React, { useState } from 'react';
import { User, Lock, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/stores/useAuthStore';
import { ConfirmDialog } from '@/components/admin/ui/ConfirmDialog';

export default function AdminProfilePage() {
  const { user } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Admin',
    email: user?.email || 'admin@desa.id',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState<'profile' | 'password' | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmAction('profile');
    setShowConfirm(true);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Password baru dan konfirmasi password tidak cocok');
      return;
    }
    if (formData.newPassword.length < 6) {
      toast.error('Password minimal 6 karakter');
      return;
    }
    
    setConfirmAction('password');
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setIsSubmitting(true);
    setShowConfirm(false);
    
    if (confirmAction === 'profile') {
      // Simulate API call
      setTimeout(() => {
        toast.success('Profil berhasil diperbarui');
        setIsSubmitting(false);
        setConfirmAction(null);
      }, 1000);
    } else if (confirmAction === 'password') {
      // Simulate API call
      setTimeout(() => {
        toast.success('Password berhasil diubah');
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
        setIsSubmitting(false);
        setConfirmAction(null);
      }, 1000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Profil Admin</h1>
          <p className="text-slate-500 dark:text-slate-400">Kelola informasi akun dan kata sandi Anda</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mb-4 border-4 border-white dark:border-slate-800 shadow-sm">
                <User className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">{formData.name}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">{formData.email}</p>
              <div className="mt-4 px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-semibold">
                Superadmin
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {/* Edit Profile Form */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <User className="w-5 h-5 text-slate-400" />
              <h2 className="font-bold text-slate-800 dark:text-white">Informasi Dasar</h2>
            </div>
            <form onSubmit={handleSaveProfile} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nama</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-white"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4" /> Simpan Profil
                </button>
              </div>
            </form>
          </div>

          {/* Change Password Form */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <Lock className="w-5 h-5 text-slate-400" />
              <h2 className="font-bold text-slate-800 dark:text-white">Ubah Password</h2>
            </div>
            <form onSubmit={handleChangePassword} className="p-6">
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password Saat Ini</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password Baru</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Konfirmasi Password Baru</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:text-white"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-start">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" /> Perbarui Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <ConfirmDialog
        isOpen={showConfirm}
        title={confirmAction === 'profile' ? "Simpan Profil" : "Ubah Password"}
        message={confirmAction === 'profile' 
          ? "Apakah Anda yakin ingin menyimpan perubahan profil admin ini?" 
          : "Apakah Anda yakin ingin mengubah password admin ini?"}
        onConfirm={handleConfirm}
        onClose={() => {
          setShowConfirm(false);
          setConfirmAction(null);
        }}
        confirmText="Ya, Simpan"
        cancelText="Batal"
      />
    </div>
  );
}
