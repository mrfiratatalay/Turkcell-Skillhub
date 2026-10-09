import RocketLaunchRounded from '@mui/icons-material/RocketLaunchRounded';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { type FormEvent, useState } from 'react';
import { Link as RouterLink } from 'react-router';
import { fonts, neon } from '@/app/theme/tokens';
import { ApiError } from '@/shared/api/ApiError';
import { isDemoMode } from '@/shared/config/runtime';
import { useDocumentTitle } from '@/shared/lib/useDocumentTitle';
import { DEMO_CREDENTIALS, type LoginRequest, useLogin } from './api';
import { AuthLayout } from './AuthLayout';
import { PasswordField } from './PasswordField';
import { useAuthRedirect } from './useAuthRedirect';

export default function LoginPage() {
  useDocumentTitle('Giriş');
  const [form, setForm] = useState<LoginRequest>({ email: '', password: '' });
  const login = useLogin();
  const onSuccess = useAuthRedirect();
  const fieldErrors = login.error instanceof ApiError ? login.error.fieldErrors : {};

  const submit = (credentials: LoginRequest) => login.mutate(credentials, { onSuccess });
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    submit(form);
  };

  return (
    <AuthLayout>
      <Card component="form" onSubmit={onSubmit} noValidate sx={{ p: { xs: 3, sm: 4 }, display: 'grid', gap: 2.5 }}>
        <Box>
          <Typography variant="h4" component="h1">
            {isDemoMode ? 'SkillHub’u keşfet' : 'Tekrar hoş geldin'}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            {isDemoMode ? 'Bir tıkla gökyüzüne katıl, tüm modülleri deneyimle.' : 'Gökyüzün seni bekliyor. Kaldığın yıldızdan devam et.'}
          </Typography>
        </Box>
        {login.isError && <Alert severity="error">{login.error.message}</Alert>}
        {isDemoMode && (
          <>
            <Button
              type="button"
              variant="contained"
              size="large"
              startIcon={<RocketLaunchRounded />}
              disabled={login.isPending}
              onClick={() => submit(DEMO_CREDENTIALS)}
              fullWidth
            >
              {login.isPending ? 'Gökyüzün hazırlanıyor…' : 'Demoyu keşfet'}
            </Button>
            <Typography variant="body2" color="text.secondary">
              Kurgusal örnek verilerle keşfedersin. Yaptığın değişiklikler bu tarayıcıda saklanır.
            </Typography>
            <Divider sx={{ color: 'text.secondary', fontSize: 13 }}>ya da demo profiline giriş yap</Divider>
          </>
        )}
        <TextField
          label="E-posta"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={Boolean(fieldErrors.email)}
          helperText={fieldErrors.email}
          required
          fullWidth
        />
        <PasswordField
          label="Şifre"
          autoComplete="current-password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          error={Boolean(fieldErrors.password)}
          helperText={fieldErrors.password}
          required
          fullWidth
        />
        <Button type="submit" variant={isDemoMode ? 'outlined' : 'contained'} size="large" disabled={login.isPending} fullWidth>
          {login.isPending ? 'Yıldızlar hizalanıyor…' : isDemoMode ? 'Demo profiline giriş yap' : 'Gece başlasın'}
        </Button>
        {!isDemoMode && (
          <>
            <Divider sx={{ color: 'text.secondary', fontSize: 13 }}>ya da</Divider>
            <Button
              type="button"
              variant="outlined"
              size="large"
              startIcon={<RocketLaunchRounded />}
              disabled={login.isPending}
              onClick={() => submit(DEMO_CREDENTIALS)}
              fullWidth
            >
              Demo hesabıyla keşfet
            </Button>
          </>
        )}
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontFamily: fonts.mono, fontSize: 12 }}>
          {DEMO_CREDENTIALS.email} · {DEMO_CREDENTIALS.password}
        </Typography>
        <Typography sx={{ textAlign: 'center' }} color="text.secondary">
          {isDemoMode ? 'Kendi demo profilini ister misin?' : 'Hesabın yok mu?'}{' '}
          <Link component={RouterLink} to="/kayit" sx={{ color: neon[100], fontWeight: 700 }}>
            {isDemoMode ? 'Profil oluştur' : 'Gökyüzüne katıl'}
          </Link>
        </Typography>
      </Card>
    </AuthLayout>
  );
}
