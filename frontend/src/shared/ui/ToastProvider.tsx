import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { createContext, type ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { shadow } from '@/app/theme/tokens';

type Severity = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: number;
  message: string;
  severity: Severity;
}

const ToastContext = createContext<((message: string, severity?: Severity) => void) | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);
  const show = useCallback((message: string, severity: Severity = 'success') => {
    setToast({ id: Date.now(), message, severity });
  }, []);
  const value = useMemo(() => show, [show]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Snackbar
        key={toast?.id}
        open={toast !== null}
        autoHideDuration={4000}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        {toast ? (
          <Alert severity={toast.severity} variant="standard" onClose={() => setToast(null)}
            sx={{ minWidth: 280, boxShadow: shadow.floating }}>
            {toast.message}
          </Alert>
        ) : undefined}
      </Snackbar>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used inside ToastProvider');
  return context;
}
