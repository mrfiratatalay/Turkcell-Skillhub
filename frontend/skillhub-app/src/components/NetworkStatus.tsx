import { Box, Paper, Typography, Slide } from '@mui/material';
import { SignalWifiOff as OfflineIcon } from '@mui/icons-material';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

const NetworkStatus = () => {
  const isOnline = useNetworkStatus();

  return (
    <Slide direction="down" in={!isOnline} mountOnEnter unmountOnExit>
      <Paper
        elevation={4}
        sx={{
          position: 'fixed',
          top: 70,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 9999,
          px: 3,
          py: 1.5,
          bgcolor: 'error.main',
          color: 'white',
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          boxShadow: '0 8px 24px rgba(244, 67, 54, 0.4)',
        }}
      >
        <OfflineIcon />
        <Typography variant="body2" fontWeight={600}>
          İnternet bağlantısı yok
        </Typography>
      </Paper>
    </Slide>
  );
};

export default NetworkStatus;

