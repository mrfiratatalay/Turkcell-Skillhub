import { useState, useEffect } from 'react';
import { showWarning, showSuccess } from '../utils/toast';

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      showSuccess('Bağlantı yeniden kuruldu! 🌐');
    };

    const handleOffline = () => {
      setIsOnline(false);
      showWarning('İnternet bağlantısı kesildi! ⚠️');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};

