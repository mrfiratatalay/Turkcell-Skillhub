import { useLocation, useNavigate } from 'react-router';
import type { Session } from '@/shared/auth/sessionStore';
import { useSession } from '@/shared/auth/useSession';

/** After a successful login/register: store the session and continue where the learner was heading. */
export function useAuthRedirect() {
  const { signIn } = useSession();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from;
  return (session: Session) => {
    signIn(session);
    navigate(from && from !== '/giris' ? from : '/gokyuzu', { replace: true });
  };
}
