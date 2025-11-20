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
  MenuItem,
  InputAdornment,
  IconButton,
  alpha,
  Grid,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  School as SchoolIcon,
  LocationOn as LocationIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  HowToReg as RegisterIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { showSuccess, showError } from '../utils/toast';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    city: 'Istanbul',
    university: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      showError('Lütfen adınızı soyadınızı girin');
      return;
    }
    if (formData.name.length < 3) {
      showError('Ad soyad en az 3 karakter olmalı');
      return;
    }
    if (!formData.email.trim()) {
      showError('Lütfen e-posta adresinizi girin');
      return;
    }
    if (!formData.email.includes('@')) {
      showError('Lütfen geçerli bir e-posta adresi girin');
      return;
    }
    if (!formData.password.trim()) {
      showError('Lütfen bir şifre belirleyin');
      return;
    }
    if (formData.password.length < 6) {
      showError('Şifre en az 6 karakter olmalı');
      return;
    }
    if (!formData.university.trim()) {
      showError('Lütfen üniversitenizi girin');
      return;
    }

    setLoading(true);

    try {
      await register(formData);
      showSuccess('Kayıt başarılı! Hoş geldiniz 🎉');
      setTimeout(() => {
      navigate('/dashboard');
      }, 500);
    } catch (err) {
      showError('Kayıt başarısız. Bu e-posta zaten kullanılıyor olabilir.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FFC900 0%, #FFD740 50%, #003D7A 100%)',
        position: 'relative',
        overflow: 'hidden',
        py: 5,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 80% 20%, ${alpha('#003D7A', 0.2)} 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, ${alpha('#FFC900', 0.2)} 0%, transparent 50%),
            radial-gradient(circle at 60% 60%, ${alpha('#1565C0', 0.15)} 0%, transparent 50%)
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
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
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
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                mx: 'auto',
                mb: 3,
                borderRadius: 4,
                background: 'linear-gradient(135deg, #003D7A 0%, #1565C0 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(0, 61, 122, 0.35)',
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
              <RegisterIcon sx={{ fontSize: 40, color: '#FFC900' }} />
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
              Kayıt Ol
            </Typography>
            <Typography variant="body1" color="text.secondary" fontWeight={500}>
              SkillHub ailesine katıl ve öğrenmeye başla!
            </Typography>
          </Box>

          {/* Register Form */}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Ad Soyad"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                  autoFocus
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="E-posta Adresi"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Şifre"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  required
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
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Şehir"
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                >
                  <MenuItem value="Istanbul">İstanbul</MenuItem>
                  <MenuItem value="Ankara">Ankara</MenuItem>
                  <MenuItem value="Izmir">İzmir</MenuItem>
                  <MenuItem value="Bursa">Bursa</MenuItem>
                  <MenuItem value="Antalya">Antalya</MenuItem>
                  <MenuItem value="Adana">Adana</MenuItem>
                  <MenuItem value="Gaziantep">Gaziantep</MenuItem>
                  <MenuItem value="Konya">Konya</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Üniversite"
                  value={formData.university}
                  onChange={(e) => handleChange('university', e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SchoolIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                mt: 4,
                mb: 3,
                py: 1.75,
                fontSize: '1rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #003D7A 0%, #1565C0 100%)',
                color: '#FFC900',
                boxShadow: '0 8px 24px rgba(0, 61, 122, 0.35)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1565C0 0%, #003D7A 100%)',
                  boxShadow: '0 12px 32px rgba(0, 61, 122, 0.45)',
                },
                '&:disabled': {
                  background: alpha('#003D7A', 0.5),
                  color: alpha('#FFC900', 0.5),
                },
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: '#FFC900' }} /> : 'Kayıt Ol'}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Zaten hesabın var mı?{' '}
                <Link
                  to="/login"
                  style={{
                    color: '#003D7A',
                    textDecoration: 'none',
                    fontWeight: 700,
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#1565C0')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#003D7A')}
                >
                  Giriş Yap
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

export default Register;
