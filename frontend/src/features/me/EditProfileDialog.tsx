import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { type FormEvent, useState } from 'react';
import { CityAutocomplete } from '@/features/auth/CityAutocomplete';
import { ApiError } from '@/shared/api/ApiError';
import type { SessionUser } from '@/shared/domain/types';
import { useToast } from '@/shared/ui/ToastProvider';
import { useUpdateProfile } from './api';

interface EditProfileDialogProps {
  user: SessionUser;
  open: boolean;
  onClose: () => void;
}

export function EditProfileDialog({ user, open, onClose }: EditProfileDialogProps) {
  const [displayName, setDisplayName] = useState(user.displayName);
  const [cityId, setCityId] = useState<number | null>(user.city.id);
  const [university, setUniversity] = useState(user.university ?? '');
  const update = useUpdateProfile();
  const toast = useToast();
  const errors = update.error instanceof ApiError ? update.error.fieldErrors : {};

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    update.mutate(
      { displayName, cityId: cityId ?? 0, university },
      {
        onSuccess: () => {
          toast('Profilin güncellendi ✨');
          onClose();
        },
      },
    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs"
      slotProps={{ paper: { component: 'form', onSubmit, noValidate: true } as object }}>
      <DialogTitle sx={{ fontWeight: 800 }}>Profilini düzenle</DialogTitle>
      <DialogContent sx={{ display: 'grid', gap: 2.25, pt: '8px !important' }}>
        {update.isError && Object.keys(errors).length === 0 && <Alert severity="error">{update.error.message}</Alert>}
        <TextField label="Ad soyad" value={displayName} onChange={(e) => setDisplayName(e.target.value)}
          error={Boolean(errors.displayName)} helperText={errors.displayName} required />
        <CityAutocomplete value={cityId} onChange={setCityId} error={errors.cityId} />
        <TextField label="Üniversite" value={university} onChange={(e) => setUniversity(e.target.value)}
          error={Boolean(errors.university)} helperText={errors.university} />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={onClose} variant="text">Vazgeç</Button>
        <Button type="submit" variant="contained" disabled={update.isPending}>
          {update.isPending ? 'Kaydediliyor…' : 'Kaydet'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
