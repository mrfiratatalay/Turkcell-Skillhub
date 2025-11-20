import {
  Box,
  Typography,
  Card,
  CardContent,
  Paper,
  Chip,
  Avatar,
  LinearProgress,
  Divider,
  Stack,
  alpha,
  Grid,
} from '@mui/material';
import {
  Person as PersonIcon,
  School as SchoolIcon,
  LocationOn as LocationIcon,
  EmojiEvents as TrophyIcon,
  TrendingUp as TrendingUpIcon,
  Star as StarIcon,
  LocalFireDepartment as FireIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useUserProgress, useBadges } from '../hooks/useQueries';
import { ProfileSkeleton } from '../components/LoadingSkeletons';

const Profile = () => {
  const { user } = useAuth();
  const { data: userProgress, isLoading: progressLoading } = useUserProgress(user?.userId || '');
  const { data: badges, isLoading: badgesLoading } = useBadges(user?.userId || '');

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return '#10B981';
      case 'Intermediate':
        return '#F59E0B';
      case 'Advanced':
        return '#EF4444';
      default:
        return '#64748B';
    }
  };

  const getBadgeIcon = (badgeName: string) => {
    if (badgeName.includes('Motivasyon')) return '🎯';
    if (badgeName.includes('Uzman')) return '⭐';
    if (badgeName.includes('Lider')) return '👑';
    return '🏆';
  };

  const getSkillLevelText = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'Başlangıç';
      case 'Intermediate':
        return 'Orta';
      case 'Advanced':
        return 'İleri';
      default:
        return level;
    }
  };

  if (progressLoading || badgesLoading) {
    return <ProfileSkeleton />;
  }

  const levelProgress = ((userProgress?.totalPoints || 0) % 100);

  return (
    <Box sx={{ pb: 4 }}>
      {/* Modern Header */}
      <Paper
        elevation={0}
          sx={{ 
          p: { xs: 3, sm: 4 },
          mb: 4,
          borderRadius: 5,
          background: `linear-gradient(135deg, ${getSkillLevelColor(user?.level || 'Beginner')} 0%, ${alpha(getSkillLevelColor(user?.level || 'Beginner'), 0.7)} 100%)`,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '40%',
            height: '100%',
            background: `radial-gradient(circle at center, ${alpha('#FFF', 0.15)}, transparent)`,
          },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: 3 }}>
                <Avatar
                  sx={{
              width: { xs: 80, sm: 100 },
              height: { xs: 80, sm: 100 },
              bgcolor: '#FFF',
              color: getSkillLevelColor(user?.level || 'Beginner'),
                    fontSize: { xs: '2rem', sm: '2.5rem' },
              fontWeight: 800,
              border: `4px solid ${alpha('#FFF', 0.3)}`,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                  }}
                >
            {user?.name?.charAt(0).toUpperCase() || 'U'}
                </Avatar>
          <Box sx={{ flex: 1 }}>
                <Typography 
              variant="h3"
              fontWeight="800"
                  sx={{ 
                color: '#FFF',
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.25rem' },
                    mb: 1,
                  }}
                >
                  {user?.name}
                </Typography>
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              <Chip
                label={getSkillLevelText(user?.level || 'Beginner')}
                sx={{
                  bgcolor: alpha('#FFF', 0.25),
                  color: '#FFF',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  backdropFilter: 'blur(10px)',
                  border: `2px solid ${alpha('#FFF', 0.3)}`,
                }}
              />
                <Chip
                icon={<FireIcon sx={{ color: '#FFF !important' }} />}
                label={`${userProgress?.totalPoints || 0} Puan`}
                  sx={{ 
                  bgcolor: alpha('#FFF', 0.25),
                  color: '#FFF',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  backdropFilter: 'blur(10px)',
                  border: `2px solid ${alpha('#FFF', 0.3)}`,
                  }}
                />
              </Box>
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={{ xs: 2.5, sm: 3 }}>
        {/* Left - User Info Card */}
        <Grid item xs={12} md={4}>
          <Card
            elevation={0}
            sx={{
              height: '100%',
              borderRadius: 4,
              border: `2px solid ${alpha('#000', 0.08)}`,
            }}
          >
            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
              <Typography variant="h6" fontWeight="700" gutterBottom sx={{ mb: 3 }}>
                Profil Bilgileri
              </Typography>

              <Stack spacing={2.5}>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <Box 
                  sx={{ 
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
                    display: 'flex', 
                    alignItems: 'center',
                        justifyContent: 'center',
                  }}
                >
                      <PersonIcon sx={{ fontSize: 22, color: '#FFF' }} />
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary" fontWeight={600}>
                        Kullanıcı ID
                      </Typography>
                      <Typography variant="body2" fontWeight={700}>
                        {user?.userId}
                  </Typography>
                    </Box>
                  </Box>
                </Box>

                <Divider />

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <Box 
                  sx={{ 
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                    display: 'flex', 
                    alignItems: 'center',
                        justifyContent: 'center',
                  }}
                >
                      <SchoolIcon sx={{ fontSize: 22, color: '#FFF' }} />
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary" fontWeight={600}>
                        Üniversite
                      </Typography>
                      <Typography variant="body2" fontWeight={700}>
                    {user?.university}
                  </Typography>
                    </Box>
                  </Box>
                </Box>

                <Divider />

                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <Box 
                  sx={{ 
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)',
                    display: 'flex', 
                    alignItems: 'center',
                        justifyContent: 'center',
                  }}
                >
                      <LocationIcon sx={{ fontSize: 22, color: '#FFF' }} />
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary" fontWeight={600}>
                        Şehir
                      </Typography>
                      <Typography variant="body2" fontWeight={700}>
                        {user?.city}
                  </Typography>
                    </Box>
                  </Box>
                </Box>
              </Stack>

              <Divider sx={{ my: 3 }} />

              {/* Level Progress */}
              <Box>
                <Typography variant="body2" fontWeight={700} gutterBottom>
                  Seviye İlerlemesi
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="caption" fontWeight={600}>
                      {getSkillLevelText(user?.level || 'Beginner')}
                    </Typography>
                    <Typography variant="caption" fontWeight={600} color="primary">
                      {levelProgress}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={levelProgress}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      bgcolor: alpha(getSkillLevelColor(user?.level || 'Beginner'), 0.15),
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 5,
                        background: `linear-gradient(90deg, ${getSkillLevelColor(user?.level || 'Beginner')} 0%, ${alpha(getSkillLevelColor(user?.level || 'Beginner'), 0.7)} 100%)`,
                      },
                    }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right - Stats & Badges */}
        <Grid item xs={12} md={8}>
          {/* Stats Cards */}
          <Grid container spacing={{ xs: 2, sm: 2.5 }} sx={{ mb: 3 }}>
                  <Grid item xs={6} sm={3}>
                    <Paper 
                      elevation={0}
                      sx={{ 
                  p: 2.5,
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, #FFC900 0%, #FFD740 100%)',
                  border: `2px solid ${alpha('#FFC900', 0.3)}`,
                        textAlign: 'center', 
                }}
                    >
                <TrophyIcon sx={{ fontSize: 36, color: '#000', mb: 1 }} />
                <Typography variant="h4" fontWeight="800" color="#000">
                  {userProgress?.totalPoints || 0}
                      </Typography>
                <Typography variant="caption" fontWeight={600} color={alpha('#000', 0.7)}>
                        Toplam Puan
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={6} sm={3}>
                    <Paper 
                      elevation={0}
                      sx={{ 
                  p: 2.5,
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
                  border: `2px solid ${alpha('#10B981', 0.3)}`,
                        textAlign: 'center', 
                      }}
                    >
                <StarIcon sx={{ fontSize: 36, color: '#FFF', mb: 1 }} />
                <Typography variant="h4" fontWeight="800" color="#FFF">
                  {userProgress?.completedLessons || 0}
                      </Typography>
                <Typography variant="caption" fontWeight={600} color={alpha('#FFF', 0.9)}>
                  Tamamlanan
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={6} sm={3}>
                    <Paper 
                      elevation={0}
                      sx={{ 
                  p: 2.5,
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
                  border: `2px solid ${alpha('#3B82F6', 0.3)}`,
                        textAlign: 'center', 
                      }}
                    >
                <TrendingUpIcon sx={{ fontSize: 36, color: '#FFF', mb: 1 }} />
                <Typography variant="h4" fontWeight="800" color="#FFF">
                  {userProgress?.quizResults?.length || 0}
                      </Typography>
                <Typography variant="caption" fontWeight={600} color={alpha('#FFF', 0.9)}>
                  Quiz Sayısı
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={6} sm={3}>
                    <Paper 
                      elevation={0}
                      sx={{ 
                  p: 2.5,
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                  border: `2px solid ${alpha('#8B5CF6', 0.3)}`,
                        textAlign: 'center', 
                      }}
                    >
                <Box sx={{ fontSize: 36, mb: 1 }}>🏆</Box>
                <Typography variant="h4" fontWeight="800" color="#FFF">
                  {badges?.length || 0}
                      </Typography>
                <Typography variant="caption" fontWeight={600} color={alpha('#FFF', 0.9)}>
                        Rozet
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>

          {/* Badges Section */}
          <Card
            elevation={0}
                      sx={{
              borderRadius: 4,
              border: `2px solid ${alpha('#000', 0.08)}`,
                    }}
          >
            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
              <Typography variant="h6" fontWeight="700" gutterBottom sx={{ mb: 3 }}>
                Kazanılan Rozetler 🏆
                </Typography>

                {badges && badges.length > 0 ? (
                <Grid container spacing={2.5}>
                    {badges.map((badge) => (
                    <Grid item xs={6} sm={4} md={3} key={badge.badgeId}>
                        <Paper
                          elevation={0}
                          sx={{
                          p: 2.5,
                            textAlign: 'center',
                          borderRadius: 3,
                          border: `2px solid ${alpha('#FFC900', 0.3)}`,
                          background: alpha('#FFC900', 0.05),
                          transition: 'all 0.3s ease',
                            '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: `0 8px 24px ${alpha('#FFC900', 0.25)}`,
                            borderColor: '#FFC900',
                          },
                        }}
                      >
                        <Box
                          sx={{
                            fontSize: 48,
                            mb: 1,
                            filter: 'drop-shadow(0 4px 8px rgba(255, 201, 0, 0.3))',
                          }}
                        >
                            {getBadgeIcon(badge.name)}
                        </Box>
                        <Typography variant="body2" fontWeight={700} gutterBottom>
                            {badge.name}
                          </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                          {badge.description}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                <Paper
                  elevation={0}
                  sx={{
                    p: 5,
                    textAlign: 'center',
                    borderRadius: 3,
                    border: `2px dashed ${alpha('#000', 0.1)}`,
                  }}
                >
                  <Typography variant="h2" sx={{ mb: 1 }}>
                      🏆
                    </Typography>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Henüz rozet yok
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Dersleri tamamlayıp quiz'leri çözerek rozet kazanabilirsin!
                    </Typography>
                </Paper>
                )}
              </CardContent>
            </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
