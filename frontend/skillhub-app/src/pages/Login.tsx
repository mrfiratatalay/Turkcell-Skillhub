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
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { showSuccess, showError } from '../utils/toast';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
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
      showSuccess('Giriş başarılı! Yönlendiriliyorsunuz...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } catch (err) {
      showError('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
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
        background: 'linear-gradient(135deg, #003D7A 0%, #1565C0 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h3" fontWeight="bold" color="primary" gutterBottom>
              Turkcell SkillHub
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Dijital Becerilerini Geliştir
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="E-posta"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              autoFocus
            />
            <TextField
              fullWidth
              label="Şifre"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Giriş Yap'}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Hesabın yok mu?{' '}
                <Link
                  to="/register"
                  style={{
                    color: '#FFC900',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  Kayıt Ol
                </Link>
              </Typography>
            </Box>
          </form>

          <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary">
              <strong>Demo Giriş:</strong> Herhangi bir e-posta ve şifre ile giriş yapabilirsiniz.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;

