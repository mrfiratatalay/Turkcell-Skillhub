import { Box, Typography, Grid, alpha, Paper } from '@mui/material';
import { TrendingUp as TrendingUpIcon, EmojiEvents as TrophyIcon, School as SchoolIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useUserProgress, useLeaderboard } from '../hooks/useQueries';
import ActiveLessons from '../components/dashboard/ActiveLessons';
import ProgressPanel from '../components/dashboard/ProgressPanel';
import BadgesPanel from '../components/dashboard/BadgesPanel';
import { DashboardSkeleton } from '../components/LoadingSkeletons';

const Dashboard = () => {
  const { user } = useAuth();
  const { data: userProgress, isLoading: progressLoading } = useUserProgress(user?.userId || '');
  const { data: leaderboard, isLoading: leaderboardLoading } = useLeaderboard();

  if (progressLoading || leaderboardLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <Box sx={{ pb: 4 }}>
      {/* Modern Header with Gradient */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 4 },
          mb: 4,
          borderRadius: 5,
          background: 'linear-gradient(135deg, #003D7A 0%, #1565C0 100%)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '40%',
            height: '100%',
            background: `radial-gradient(circle at center, ${alpha('#FFC900', 0.2)}, transparent)`,
            pointerEvents: 'none',
          },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography 
            variant="h3"
            fontWeight="800"
          sx={{ 
              color: '#FFF',
            mb: 1,
              fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
              display: 'flex',
              alignItems: 'center',
              gap: 2,
          }}
        >
            <Box
              sx={{
                width: { xs: 40, sm: 50 },
                height: { xs: 40, sm: 50 },
                borderRadius: 3,
                background: 'linear-gradient(135deg, #FFC900 0%, #FFD740 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(255, 201, 0, 0.35)',
              }}
            >
              <TrendingUpIcon sx={{ fontSize: { xs: 24, sm: 30 }, color: '#000' }} />
            </Box>
            Merhaba, {user?.name?.split(' ')[0] || 'Öğrenci'}! 👋
        </Typography>
        <Typography 
            variant="h6"
            sx={{
              color: alpha('#FFF', 0.9),
              fontWeight: 500,
              fontSize: { xs: '0.9rem', sm: '1.1rem' },
            }}
        >
            Öğrenme yolculuğuna devam etmeye hazır mısın?
        </Typography>
      </Box>
      </Paper>

      {/* Stats Cards Grid */}
      <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
        {/* Left Panel - Active Lessons */}
        <Grid item xs={12} lg={4}>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                mb: 2,
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2.5,
                  background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(59, 130, 246, 0.25)',
                }}
              >
                <SchoolIcon sx={{ fontSize: 24, color: '#FFF' }} />
              </Box>
              <Typography variant="h6" fontWeight="700" color="text.primary">
                Aktif Dersler
              </Typography>
            </Box>
          <ActiveLessons userProgress={userProgress} />
          </Box>
        </Grid>

        {/* Middle Panel - Progress & Quiz Results */}
        <Grid item xs={12} lg={4}>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                mb: 2,
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2.5,
                  background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(16, 185, 129, 0.25)',
                }}
              >
                <TrendingUpIcon sx={{ fontSize: 24, color: '#FFF' }} />
              </Box>
              <Typography variant="h6" fontWeight="700" color="text.primary">
                İlerleme
              </Typography>
            </Box>
          <ProgressPanel userProgress={userProgress} />
          </Box>
        </Grid>

        {/* Right Panel - Badges & Leaderboard */}
        <Grid item xs={12} lg={4}>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                mb: 2,
              }}
            >
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2.5,
                  background: 'linear-gradient(135deg, #FFC900 0%, #FFD740 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(255, 201, 0, 0.25)',
                }}
              >
                <TrophyIcon sx={{ fontSize: 24, color: '#000' }} />
              </Box>
              <Typography variant="h6" fontWeight="700" color="text.primary">
                Başarılar
              </Typography>
            </Box>
          <BadgesPanel userProgress={userProgress} leaderboard={leaderboard || []} currentUser={user} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
