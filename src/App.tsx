import { RouterProvider } from 'react-router-dom';
import { router } from '@/routes';
import { useEffect } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { LoadingScreen } from '@/components/ui/LoadingScreen';

import { SettingsProvider } from '@/contexts/SettingsContext';

function App() {
  const initializeAuth = useAuthStore(state => state.initialize);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <SettingsProvider>
      <LoadingScreen />
      <RouterProvider router={router} />
    </SettingsProvider>
  );
}

export default App;
