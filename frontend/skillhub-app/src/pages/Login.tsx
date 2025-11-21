import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  CircularProgress,
  InputAdornment,
  IconButton,
  alpha,
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Login as LoginIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { showSuccess, showError } from '../utils/toast';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!email.trim()) {
      showError('Lütfen e-posta adresinizi girin');
      return;
    }
    if (!password.trim()) {
      showError('Lütfen şifrenizi girin');
      return;
    }
    if (password.length < 3) {
      showError('Şifre en az 3 karakter olmalı');
      return;
    }

    setLoading(true);

    try {
      await login(email, password);
      showSuccess('Hoş geldiniz! Yönlendiriliyorsunuz...');
      setTimeout(() => {
      navigate('/dashboard');
      }, 500);
    } catch (err) {
      showError('E-posta veya şifre hatalı!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #003D7A 0%, #001F3F 50%, #FFC900 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 50%, ${alpha('#FFC900', 0.2)} 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, ${alpha('#1565C0', 0.2)} 0%, transparent 50%),
            radial-gradient(circle at 40% 20%, ${alpha('#FFC900', 0.15)} 0%, transparent 50%)
          `,
          animation: 'gradientShift 15s ease infinite',
        },
        '@keyframes gradientShift': {
          '0%, 100%': {
            opacity: 1,
          },
          '50%': {
            opacity: 0.8,
          },
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 6,
            backgroundColor: alpha('#FFFFFF', 0.95),
            backdropFilter: 'blur(20px)',
            border: `1px solid ${alpha('#FFFFFF', 0.3)}`,
            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.25)',
            animation: 'fadeInUp 0.6s ease-out',
            '@keyframes fadeInUp': {
              from: {
                opacity: 0,
                transform: 'translateY(30px)',
              },
              to: {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
          }}
        >
          {/* Logo & Title */}
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                mx: 'auto',
                mb: 3,
                borderRadius: 4,
                background: 'linear-gradient(135deg, #FFC900 0%, #FFD740 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(255, 201, 0, 0.35)',
                animation: 'bounce 2s infinite',
                '@keyframes bounce': {
                  '0%, 100%': {
                    transform: 'translateY(0)',
                  },
                  '50%': {
                    transform: 'translateY(-10px)',
                  },
                },
              }}
            >
              <LoginIcon sx={{ fontSize: 40, color: '#000' }} />
            </Box>
            <Typography
              variant="h3"
              fontWeight="800"
              sx={{
                background: 'linear-gradient(135deg, #003D7A 0%, #1565C0 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
              }}
            >
              Giriş Yap
            </Typography>
            <Typography variant="body1" color="text.secondary" fontWeight={500}>
              Turkcell SkillHub'a hoş geldin!
            </Typography>
          </Box>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="E-posta Adresi"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Şifre"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Demo Credentials Info */}
            <Paper
              elevation={0}
              sx={{
                p: 2,
                mb: 3,
                background: alpha('#FFC900', 0.08),
                borderRadius: 3,
                border: `1px solid ${alpha('#FFC900', 0.2)}`,
              }}
            >
              <Typography variant="caption" color="text.secondary" display="block" gutterBottom fontWeight={600}>
                🔑 Demo Hesaplar (Database Kullanıcıları):
              </Typography>
              <Typography variant="body2" fontWeight={500} color="text.primary" sx={{ mb: 0.5 }}>
                <strong>Zeynep:</strong> zeynep@skillhub.com / 123456
              </Typography>
              <Typography variant="body2" fontWeight={500} color="text.primary" sx={{ mb: 0.5 }}>
                <strong>Ayşe:</strong> ayse@skillhub.com / 123456
              </Typography>
              <Typography variant="body2" fontWeight={500} color="text.primary">
                <strong>Can:</strong> can@skillhub.com / 123456
              </Typography>
            </Paper>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                mb: 3,
                py: 1.75,
                fontSize: '1rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #FFC900 0%, #FFD740 100%)',
                color: '#000',
                boxShadow: '0 8px 24px rgba(255, 201, 0, 0.35)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #FFD740 0%, #FFC900 100%)',
                  boxShadow: '0 12px 32px rgba(255, 201, 0, 0.45)',
                },
                '&:disabled': {
                  background: alpha('#FFC900', 0.5),
                  color: alpha('#000', 0.5),
                },
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: '#000' }} /> : 'Giriş Yap'}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Henüz hesabın yok mu?{' '}
                <Link
                  to="/register"
                  style={{
                    color: '#003D7A',
                    textDecoration: 'none',
                    fontWeight: 700,
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#1565C0')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#003D7A')}
                >
                  Kayıt Ol
                </Link>
              </Typography>
            </Box>
          </form>
        </Paper>

        {/* Footer */}
        <Typography
          variant="body2"
          color="white"
          align="center"
          sx={{ mt: 4, fontWeight: 500, opacity: 0.9 }}
        >
          © 2024 Turkcell SkillHub. Tüm hakları saklıdır.
        </Typography>
      </Container>
    </Box>
  );
};

export default Login;
