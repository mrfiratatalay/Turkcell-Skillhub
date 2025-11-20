// Toast Notification Utility
import toast from 'react-hot-toast';

// Success toast
export const showSuccess = (message: string) => {
  toast.success(message, {
    duration: 3000,
    position: 'top-right',
    style: {
      background: '#4CAF50',
      color: '#fff',
      fontWeight: 600,
    },
    icon: '✅',
  });
};

// Error toast
export const showError = (message: string) => {
  toast.error(message, {
    duration: 4000,
    position: 'top-right',
    style: {
      background: '#f44336',
      color: '#fff',
      fontWeight: 600,
    },
    icon: '❌',
  });
};

// Info toast
export const showInfo = (message: string) => {
  toast(message, {
    duration: 3000,
    position: 'top-right',
    style: {
      background: '#2196F3',
      color: '#fff',
      fontWeight: 600,
    },
    icon: 'ℹ️',
  });
};

// Warning toast
export const showWarning = (message: string) => {
  toast(message, {
    duration: 3500,
    position: 'top-right',
    style: {
      background: '#ff9800',
      color: '#fff',
      fontWeight: 600,
    },
    icon: '⚠️',
  });
};

// Loading toast
export const showLoading = (message: string) => {
  return toast.loading(message, {
    position: 'top-right',
    style: {
      background: '#003D7A',
      color: '#fff',
      fontWeight: 600,
    },
  });
};

// Dismiss specific toast
export const dismissToast = (toastId: string) => {
  toast.dismiss(toastId);
};

// Dismiss all toasts
export const dismissAll = () => {
  toast.dismiss();
};

// Custom toast for badge earned
export const showBadgeEarned = (badgeName: string) => {
  toast.success(`Yeni rozet kazandın: ${badgeName}!`, {
    duration: 5000,
    position: 'top-center',
    style: {
      background: 'linear-gradient(135deg, #FFC900 0%, #FFD740 100%)',
      color: '#000',
      fontWeight: 700,
      fontSize: '1.1rem',
      padding: '16px 24px',
      borderRadius: '12px',
      boxShadow: '0 8px 24px rgba(255, 201, 0, 0.4)',
    },
    icon: '🏆',
  });
};

// Custom toast for quiz completion
export const showQuizComplete = (score: number) => {
  const emoji = score >= 80 ? '🎉' : score >= 60 ? '👍' : '💪';
  const message = score >= 80 
    ? `Harika! ${score}% başarı!` 
    : score >= 60 
    ? `İyi! ${score}% başarı!` 
    : `${score}% - Tekrar dene!`;
  
  toast.success(message, {
    duration: 4000,
    position: 'top-center',
    style: {
      background: score >= 80 ? '#4CAF50' : score >= 60 ? '#FF9800' : '#f44336',
      color: '#fff',
      fontWeight: 700,
      fontSize: '1.1rem',
      padding: '16px 24px',
      borderRadius: '12px',
    },
    icon: emoji,
  });
};

