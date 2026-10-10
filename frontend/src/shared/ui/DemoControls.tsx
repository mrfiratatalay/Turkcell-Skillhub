import RestartAltRounded from '@mui/icons-material/RestartAltRounded';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useSession } from '@/shared/auth/useSession';
import { isDemoMode } from '@/shared/config/runtime';
import { useToast } from './ToastProvider';

/** A visitor can return to the original showcase after exploring the demo interactions. */
export function DemoControls() {
  const { signOut } = useSession();
  const toast = useToast();
  const [resetting, setResetting] = useState(false);
  if (!isDemoMode) return null;

  const reset = async () => {
    setResetting(true);
    try {
      // The build-time constant (not isDemoMode) lets API builds drop the demo state module entirely.
      if (import.meta.env.VITE_DATA_MODE !== 'api') {
        const { resetDemoData } = await import('@/demo/state');
        resetDemoData();
      }
      signOut();
      toast('Demo başlangıç durumuna döndü. Yeniden keşfedebilirsin.');
    } catch {
      toast('Demo sıfırlanamadı. Lütfen tekrar dene.', 'warning');
      setResetting(false);
    }
  };

  return (
    <Alert severity="info" sx={{ alignItems: 'center', '& .MuiAlert-message': { flex: 1 } }}
      action={
        <Button color="inherit" size="small" startIcon={<RestartAltRounded />} disabled={resetting} onClick={reset}>
          {resetting ? 'Sıfırlanıyor…' : 'Demoyu sıfırla'}
        </Button>
      }>
      Bu profil ve ilerleme yalnızca bu tarayıcıdaki demoya aittir. Sıfırlama, buradaki demo profillerini ve
      değişikliklerini temizleyerek seni giriş ekranına döndürür.
    </Alert>
  );
}
