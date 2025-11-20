import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  MenuItem,
  Grid,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    city: 'Istanbul',
    university: '',
    skill_level: 'Beginner' as 'Beginner' | 'Intermediate' | 'Advanced',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError('Kayıt başarısız. Lütfen tekrar deneyin.');
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
        background: 'linear-gradient(135deg, #003D7A 0%, #1565C0 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="md">
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
              Yeni Hesap Oluştur
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Ad Soyad"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                  autoFocus
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="E-posta"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Şifre"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Şehir"
                  value={formData.city}
                  onChange={(e) => handleChange('city', e.target.value)}
                >
                  <MenuItem value="Istanbul">İstanbul</MenuItem>
                  <MenuItem value="Ankara">Ankara</MenuItem>
                  <MenuItem value="Izmir">İzmir</MenuItem>
                  <MenuItem value="Bursa">Bursa</MenuItem>
                  <MenuItem value="Antalya">Antalya</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Üniversite"
                  value={formData.university}
                  onChange={(e) => handleChange('university', e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Beceri Seviyesi"
                  value={formData.skill_level}
                  onChange={(e) => handleChange('skill_level', e.target.value)}
                >
                  <MenuItem value="Beginner">Başlangıç</MenuItem>
                  <MenuItem value="Intermediate">Orta</MenuItem>
                  <MenuItem value="Advanced">İleri</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Kayıt Ol'}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Zaten hesabın var mı?{' '}
                <Link
                  to="/login"
                  style={{
                    color: '#FFC900',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  Giriş Yap
                </Link>
              </Typography>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;

