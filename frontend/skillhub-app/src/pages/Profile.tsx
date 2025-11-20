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
        return 'success';
      case 'Intermediate':
        return 'warning';
      case 'Advanced':
        return 'error';
      default:
        return 'default';
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

  return (
    <Box sx={{ pb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <PersonIcon sx={{ fontSize: 32, color: 'primary.main', mr: 1.5 }} />
          <Typography 
            variant="h4" 
            fontWeight="bold"
            sx={{ fontSize: { xs: '1.75rem', sm: '2rem', md: '2.125rem' } }}
          >
            Profilim
          </Typography>
        </Box>
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ 
            ml: { xs: 0, sm: 5.5 },
            fontSize: { xs: '0.875rem', sm: '1rem' },
          }}
        >
          Öğrenme istatistiklerin ve başarıların
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
        {/* Profile Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ 
            height: '100%',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            borderRadius: 3,
          }}>
            <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Avatar
                  sx={{
                    width: { xs: 90, sm: 100 },
                    height: { xs: 90, sm: 100 },
                    mx: 'auto',
                    mb: 2,
                    background: `linear-gradient(135deg, #FFC900 0%, #FFD740 100%)`,
                    fontSize: { xs: '2rem', sm: '2.5rem' },
                    fontWeight: 'bold',
                    color: '#000',
                    boxShadow: '0 8px 24px rgba(255, 201, 0, 0.3)',
                  }}
                >
                  {user?.name.charAt(0).toUpperCase()}
                </Avatar>
                <Typography 
                  variant="h5" 
                  fontWeight="bold"
                  sx={{ 
                    mb: 1,
                    fontSize: { xs: '1.25rem', sm: '1.5rem' },
                  }}
                >
                  {user?.name}
                </Typography>
                <Chip
                  label={getSkillLevelText(user?.skillLevel || '')}
                  color={getSkillLevelColor(user?.skillLevel || '') as any}
                  sx={{ 
                    fontWeight: 600,
                    fontSize: '0.8125rem',
                  }}
                />
              </Box>

              <Divider sx={{ my: 2.5 }} />

              <Stack spacing={2}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    p: 1.5,
                    bgcolor: alpha('#f5f5f5', 0.6),
                    borderRadius: 1.5,
                  }}
                >
                  <LocationIcon sx={{ mr: 1.5, color: 'text.secondary', fontSize: 20 }} />
                  <Typography variant="body2" fontWeight={500}>
                    {user?.city}
                  </Typography>
                </Box>

                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    p: 1.5,
                    bgcolor: alpha('#f5f5f5', 0.6),
                    borderRadius: 1.5,
                  }}
                >
                  <SchoolIcon sx={{ mr: 1.5, color: 'text.secondary', fontSize: 20 }} />
                  <Typography variant="body2" fontWeight={500}>
                    {user?.university}
                  </Typography>
                </Box>

                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    p: 1.5,
                    bgcolor: alpha('#FFC900', 0.1),
                    borderRadius: 1.5,
                    border: `1px solid ${alpha('#FFC900', 0.2)}`,
                  }}
                >
                  <TrophyIcon sx={{ mr: 1.5, color: '#FFC900', fontSize: 20 }} />
                  <Typography variant="body2" fontWeight={600} color="#FFC900">
                    {user?.badgeCount} Rozet
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Stats and Badges */}
        <Grid item xs={12} md={8}>
          <Stack spacing={{ xs: 2, sm: 2.5, md: 3 }}>
            {/* Stats Card */}
            <Card sx={{ 
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              borderRadius: 3,
            }}>
              <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  📊 İstatistikler
                </Typography>

                <Grid container spacing={{ xs: 1.5, sm: 2 }} sx={{ mt: 0.5 }}>
                  <Grid item xs={6} sm={3}>
                    <Paper 
                      elevation={0}
                      sx={{ 
                        p: { xs: 1.5, sm: 2 },
                        textAlign: 'center', 
                        background: `linear-gradient(135deg, #FFC900 0%, #FFD740 100%)`,
                        color: '#000',
                        borderRadius: 2.5,
                        transition: 'transform 0.3s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                        },
                      }}
                    >
                      <TrophyIcon sx={{ fontSize: { xs: 28, sm: 32 }, mb: 0.5 }} />
                      <Typography 
                        variant="h5" 
                        fontWeight="bold"
                        sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem' } }}
                      >
                        {user?.totalPoints}
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                        Toplam Puan
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={6} sm={3}>
                    <Paper 
                      elevation={0}
                      sx={{ 
                        p: { xs: 1.5, sm: 2 },
                        textAlign: 'center', 
                        bgcolor: '#4CAF50',
                        color: 'white',
                        borderRadius: 2.5,
                        transition: 'transform 0.3s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                        },
                      }}
                    >
                      <SchoolIcon sx={{ fontSize: { xs: 28, sm: 32 }, mb: 0.5 }} />
                      <Typography 
                        variant="h5" 
                        fontWeight="bold"
                        sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem' } }}
                      >
                        {userProgress?.completedLessons}
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                        Tamamlanan Ders
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={6} sm={3}>
                    <Paper 
                      elevation={0}
                      sx={{ 
                        p: { xs: 1.5, sm: 2 },
                        textAlign: 'center', 
                        bgcolor: '#003D7A',
                        color: 'white',
                        borderRadius: 2.5,
                        transition: 'transform 0.3s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                        },
                      }}
                    >
                      <TrendingUpIcon sx={{ fontSize: { xs: 28, sm: 32 }, mb: 0.5 }} />
                      <Typography 
                        variant="h5" 
                        fontWeight="bold"
                        sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem' } }}
                      >
                        {Math.round(userProgress?.averageScore || 0)}%
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                        Ortalama Başarı
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={6} sm={3}>
                    <Paper 
                      elevation={0}
                      sx={{ 
                        p: { xs: 1.5, sm: 2 },
                        textAlign: 'center', 
                        bgcolor: '#FF9800',
                        color: 'white',
                        borderRadius: 2.5,
                        transition: 'transform 0.3s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                        },
                      }}
                    >
                      <TrophyIcon sx={{ fontSize: { xs: 28, sm: 32 }, mb: 0.5 }} />
                      <Typography 
                        variant="h5" 
                        fontWeight="bold"
                        sx={{ fontSize: { xs: '1.5rem', sm: '1.75rem' } }}
                      >
                        {user?.badgeCount}
                      </Typography>
                      <Typography variant="caption" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                        Rozet
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" fontWeight="600">
                      Tamamlama Oranı
                    </Typography>
                    <Chip
                      label={`${Math.round(userProgress?.completionRate || 0)}%`}
                      size="small"
                      sx={{
                        bgcolor: alpha('#FFC900', 0.1),
                        color: '#FFC900',
                        fontWeight: 700,
                      }}
                    />
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={userProgress?.completionRate || 0}
                    sx={{ 
                      height: 10, 
                      borderRadius: 5,
                      bgcolor: alpha('#FFC900', 0.1),
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 5,
                        background: 'linear-gradient(90deg, #FFC900 0%, #FFD740 100%)',
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>

            {/* Badges Card */}
            <Card sx={{ 
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              borderRadius: 3,
            }}>
              <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  🏆 Rozetlerim
                </Typography>

                {badges && badges.length > 0 ? (
                  <Grid container spacing={{ xs: 1.5, sm: 2 }} sx={{ mt: 0.5 }}>
                    {badges.map((badge) => (
                      <Grid item xs={6} sm={4} key={badge.badgeId}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: { xs: 2, sm: 2.5 },
                            textAlign: 'center',
                            background: `linear-gradient(135deg, #FFC900 0%, #FFD740 100%)`,
                            color: '#000',
                            borderRadius: 2.5,
                            transition: 'all 0.3s',
                            border: '2px solid transparent',
                            '&:hover': {
                              transform: 'translateY(-6px) scale(1.02)',
                              boxShadow: '0 12px 32px rgba(255, 201, 0, 0.4)',
                              border: '2px solid #FFD740',
                            },
                          }}
                        >
                          <Typography sx={{ fontSize: { xs: 40, sm: 48 }, mb: 1 }}>
                            {getBadgeIcon(badge.name)}
                          </Typography>
                          <Typography variant="body2" fontWeight="bold" sx={{ mb: 0.5 }}>
                            {badge.name}
                          </Typography>
                          <Typography variant="caption" color="rgba(0,0,0,0.6)">
                            {new Date(badge.awardedAt).toLocaleDateString('tr-TR')}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Box sx={{ textAlign: 'center', py: { xs: 3, sm: 4 } }}>
                    <Typography variant="h2" sx={{ mb: 1.5, fontSize: { xs: '3rem', sm: '4rem' } }}>
                      🏆
                    </Typography>
                    <Typography variant="body1" color="text.secondary" fontWeight={500} sx={{ mb: 0.5 }}>
                      Henüz rozet kazanmadın
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Dersleri tamamlayarak rozetler kazan!
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
