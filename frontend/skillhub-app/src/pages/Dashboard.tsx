import { Box, Typography, Grid } from '@mui/material';
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
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          fontWeight="bold" 
          sx={{ 
            mb: 1,
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.125rem' }
          }}
        >
          Dashboard
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
        >
          Öğrenme yolculuğuna genel bakış
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
        {/* Left Panel - Active Lessons */}
        <Grid item xs={12} lg={4}>
          <ActiveLessons userProgress={userProgress} />
        </Grid>

        {/* Middle Panel - Progress & Quiz Results */}
        <Grid item xs={12} lg={4}>
          <ProgressPanel userProgress={userProgress} />
        </Grid>

        {/* Right Panel - Badges & Leaderboard */}
        <Grid item xs={12} lg={4}>
          <BadgesPanel userProgress={userProgress} leaderboard={leaderboard || []} currentUser={user} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
