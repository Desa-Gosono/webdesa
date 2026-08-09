import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { LoadingScreen } from '@/components/ui/LoadingScreen';

import { SettingsProvider } from '@/contexts/SettingsContext';
import { Suspense } from 'react';

function App() {
  const initializeAuth = useAuthStore(state => state.initialize);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <SettingsProvider>
      <LoadingScreen />
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-slate-50 dark:bg-slate-950">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary-600"></div>
          <p className="text-gray-500 font-medium animate-pulse">Memuat aplikasi...</p>
        </div>
      }>
        <RouterProvider router={router} />
      </Suspense>
    </SettingsProvider>
  );
}

export default App;
