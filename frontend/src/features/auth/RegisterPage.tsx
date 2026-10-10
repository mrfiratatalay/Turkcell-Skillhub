import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { type FormEvent, useState } from 'react';
import { Link as RouterLink } from 'react-router';
import { ApiError } from '@/shared/api/ApiError';
import { isDemoMode } from '@/shared/config/runtime';
import { useDocumentTitle } from '@/shared/lib/useDocumentTitle';
import { useRegister } from './api';
import { AuthLayout } from './AuthLayout';
import { CityAutocomplete } from './CityAutocomplete';
import { PasswordField } from './PasswordField';
import { useAuthRedirect } from './useAuthRedirect';

interface Form {
  displayName: string;
  email: string;
  password: string;
  cityId: number | null;
  university: string;
}

export default function RegisterPage() {
  useDocumentTitle('Kayıt');
  const [form, setForm] = useState<Form>({ displayName: '', email: '', password: '', cityId: null, university: '' });
  const register = useRegister();
  const onSuccess = useAuthRedirect();
  const errors = register.error instanceof ApiError ? register.error.fieldErrors : {};
  const showGeneralError = register.isError && Object.keys(errors).length === 0;

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    register.mutate({ ...form, cityId: form.cityId ?? 0 }, { onSuccess });
  };

  return (
    <AuthLayout>
      <Box component="form" onSubmit={onSubmit} noValidate sx={{ display: 'grid', gap: 2.25 }}>
        <Box>
          <Typography variant="h3" component="h1" sx={{ fontSize: { xs: 30, sm: 36 } }}>
            {isDemoMode ? 'Demo profilini oluştur' : 'Gökyüzüne katıl'}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            {isDemoMode
              ? 'Bu profil yalnızca bu tarayıcıda saklanır. Gerçek ad, e-posta veya kişisel şifreni kullanmana gerek yok.'
              : 'İlk yıldızını yakmana bir form kaldı. Saat 17:00, gece yeni başlıyor.'}
          </Typography>
        </Box>
        {showGeneralError && <Alert severity="error">{register.error?.message}</Alert>}
        <TextField
          label={isDemoMode ? 'Görünen ad' : 'Ad soyad'}
          autoComplete={isDemoMode ? 'off' : 'name'}
          value={form.displayName}
          onChange={(e) => setForm({ ...form, displayName: e.target.value })}
          error={Boolean(errors.displayName)}
          helperText={errors.displayName}
          required
        />
        <TextField
          label={isDemoMode ? 'Örnek e-posta' : 'E-posta'}
          type="email"
          autoComplete={isDemoMode ? 'off' : 'email'}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={Boolean(errors.email)}
          helperText={errors.email}
          required
        />
        <PasswordField
          label="Şifre"
          autoComplete={isDemoMode ? 'off' : 'new-password'}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          error={Boolean(errors.password)}
          helperText={errors.password ?? (isDemoMode ? 'En az 8 karakter. Günlük kullandığın şifreyi yazma.' : 'En az 8 karakter.')}
          required
        />
        <CityAutocomplete value={form.cityId} onChange={(cityId) => setForm({ ...form, cityId })} error={errors.cityId} />
        <TextField
          label="Üniversite (isteğe bağlı)"
          value={form.university}
          onChange={(e) => setForm({ ...form, university: e.target.value })}
          error={Boolean(errors.university)}
          helperText={errors.university}
        />
        <Button type="submit" variant="contained" size="large" disabled={register.isPending} fullWidth>
          {register.isPending ? 'Gökyüzün hazırlanıyor…' : isDemoMode ? 'Demo profilimi oluştur' : 'İlk yıldızımı yak'}
        </Button>
        <Typography sx={{ textAlign: 'center' }} color="text.secondary">
          Zaten hesabın var mı?{' '}
          <Link component={RouterLink} to="/giris" color="secondary" sx={{ fontWeight: 700 }}>
            Giriş yap
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
}
