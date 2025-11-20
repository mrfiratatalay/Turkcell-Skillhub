import { Box, Card, CardContent, Skeleton, Grid, Paper } from '@mui/material';

// Dashboard Skeleton
export const DashboardSkeleton = () => {
  return (
    <Box sx={{ pb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="text" width={200} height={50} />
        <Skeleton variant="text" width={300} height={30} />
      </Box>

      <Grid container spacing={3}>
        {[1, 2, 3].map((item) => (
          <Grid item xs={12} lg={4} key={item}>
            <Card sx={{ height: '100%', borderRadius: 3 }}>
              <CardContent>
                <Skeleton variant="text" width="60%" height={40} />
                <Skeleton variant="text" width="80%" height={25} sx={{ mt: 2 }} />
                <Skeleton variant="rectangular" height={150} sx={{ mt: 2, borderRadius: 2 }} />
                <Skeleton variant="text" width="100%" height={25} sx={{ mt: 2 }} />
                <Skeleton variant="text" width="90%" height={25} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// Lessons List Skeleton
export const LessonsListSkeleton = () => {
  return (
    <Box sx={{ pb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Skeleton variant="text" width={250} height={50} />
        <Skeleton variant="text" width={350} height={30} />
      </Box>

      <Skeleton variant="rectangular" height={60} sx={{ mb: 4, borderRadius: 2 }} />

      <Grid container spacing={3}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item}>
            <Card sx={{ borderRadius: 3 }}>
              <Skeleton variant="rectangular" height={6} />
              <CardContent>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Skeleton variant="rounded" width={80} height={26} />
                  <Skeleton variant="rounded" width={60} height={26} />
                </Box>
                <Skeleton variant="text" width="90%" height={35} />
                <Skeleton variant="text" width="100%" height={25} sx={{ mt: 1 }} />
                <Skeleton variant="text" width="95%" height={25} />
                <Skeleton variant="rounded" width={100} height={30} sx={{ mt: 2 }} />
                <Skeleton variant="rectangular" width="100%" height={45} sx={{ mt: 2, borderRadius: 2 }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// Profile Skeleton
export const ProfileSkeleton = () => {
  return (
    <Box sx={{ pb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Skeleton variant="text" width={200} height={50} />
        <Skeleton variant="text" width={300} height={30} />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Skeleton variant="circular" width={100} height={100} sx={{ mx: 'auto', mb: 2 }} />
                <Skeleton variant="text" width="60%" height={35} sx={{ mx: 'auto' }} />
                <Skeleton variant="rounded" width={80} height={28} sx={{ mx: 'auto', mt: 1 }} />
              </Box>
              <Skeleton variant="rectangular" height={1} sx={{ my: 2 }} />
              <Skeleton variant="rectangular" height={60} sx={{ mb: 2, borderRadius: 1.5 }} />
              <Skeleton variant="rectangular" height={60} sx={{ mb: 2, borderRadius: 1.5 }} />
              <Skeleton variant="rectangular" height={60} sx={{ borderRadius: 1.5 }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3, mb: 3 }}>
            <CardContent>
              <Skeleton variant="text" width={150} height={35} />
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {[1, 2, 3, 4].map((item) => (
                  <Grid item xs={6} sm={3} key={item}>
                    <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2.5 }} />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Skeleton variant="text" width={150} height={35} />
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {[1, 2, 3].map((item) => (
                  <Grid item xs={6} sm={4} key={item}>
                    <Skeleton variant="rectangular" height={140} sx={{ borderRadius: 2.5 }} />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

// Leaderboard Skeleton
export const LeaderboardSkeleton = () => {
  return (
    <Box sx={{ pb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Skeleton variant="text" width={250} height={50} />
        <Skeleton variant="text" width={350} height={30} />
      </Box>

      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 2 }} />
        </CardContent>
      </Card>

      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Skeleton variant="rounded" height={40} />
            </Grid>
            <Grid item xs={12} sm={8}>
              <Skeleton variant="rounded" height={40} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 3 }}>
        <Paper elevation={0}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <Box key={item} sx={{ p: 2, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Skeleton variant="circular" width={44} height={44} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="40%" height={25} />
                  <Skeleton variant="text" width="30%" height={20} />
                </Box>
                <Skeleton variant="rounded" width={80} height={32} />
              </Box>
            </Box>
          ))}
        </Paper>
      </Card>
    </Box>
  );
};

// Lesson Detail Skeleton
export const LessonDetailSkeleton = () => {
  return (
    <Box>
      <Skeleton variant="rounded" width={150} height={40} sx={{ mb: 3 }} />

      <Card>
        <CardContent>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Skeleton variant="rounded" width={100} height={32} />
              <Skeleton variant="rounded" width={80} height={32} />
              <Skeleton variant="rounded" width={120} height={32} />
            </Box>
            <Skeleton variant="text" width="60%" height={50} />
            <Skeleton variant="text" width="90%" height={30} sx={{ mt: 1 }} />
            <Skeleton variant="text" width="85%" height={30} />
          </Box>

          <Skeleton variant="rectangular" height={400} sx={{ my: 3, borderRadius: 2 }} />

          <Skeleton variant="rectangular" height={150} sx={{ borderRadius: 2 }} />
        </CardContent>
      </Card>
    </Box>
  );
};

// Quiz Skeleton
export const QuizSkeleton = () => {
  return (
    <Box>
      <Skeleton variant="rounded" width={150} height={40} sx={{ mb: 3 }} />

      <Card>
        <CardContent>
          <Box sx={{ mb: 4 }}>
            <Skeleton variant="text" width="50%" height={40} />
            <Skeleton variant="text" width="30%" height={25} sx={{ mt: 1 }} />
            <Skeleton variant="rectangular" height={8} sx={{ mt: 2, borderRadius: 4 }} />
          </Box>

          <Paper sx={{ p: 4, bgcolor: 'grey.50', borderRadius: 3 }}>
            <Skeleton variant="text" width="80%" height={35} sx={{ mb: 3 }} />
            {[1, 2, 3, 4].map((item) => (
              <Paper key={item} sx={{ mb: 1.5, p: 2 }}>
                <Skeleton variant="text" width="90%" height={25} />
              </Paper>
            ))}
          </Paper>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Skeleton variant="rounded" width={120} height={45} />
            <Skeleton variant="rounded" width={120} height={45} />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

