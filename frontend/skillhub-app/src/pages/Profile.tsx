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
  alpha,
  Grid,
} from '@mui/material';
import {
  Person as PersonIcon,
  School as SchoolIcon,
  LocationOn as LocationIcon,
  EmojiEvents as TrophyIcon,
  CheckCircle as CheckIcon,
  Assessment as AssessmentIcon,
  WorkspacePremium as BadgeIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useUserProgress, useBadges } from '../hooks/useQueries';
import { ProfileSkeleton } from '../components/LoadingSkeletons';

const Profile = () => {
  const { user } = useAuth();
  const { data: userProgress, isLoading: progressLoading } = useUserProgress(user?.userId || '');
  const { data: badges } = useBadges(user?.userId || '');

  const getSkillLevelColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'beginner':
        return '#10B981';
      case 'intermediate':
        return '#F59E0B';
      case 'advanced':
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
    switch (level?.toLowerCase()) {
      case 'beginner':
        return 'Başlangıç';
      case 'intermediate':
        return 'Orta';
      case 'advanced':
        return 'İleri';
      default:
        return level || 'Başlangıç';
    }
  };

  if (progressLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <Box sx={{ pb: 4, bgcolor: '#F5F7FA', minHeight: '100vh' }}>
      {/* MINIMAL PROFESSIONAL HEADER */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          fontWeight="800"
          sx={{
            color: '#1A1A1A',
            mb: 0.5,
            fontSize: { xs: '1.75rem', sm: '2rem' },
          }}
        >
          Profilim
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748B', fontSize: '0.9375rem' }}>
          Kişisel bilgileriniz, istatistikleriniz ve kazanılan rozetleriniz
        </Typography>
      </Box>

      {/* USER INFO CARD - FULL WIDTH */}
      <Card
        elevation={0}
        sx={{
          mb: 3,
          borderRadius: 3,
          border: `1px solid ${alpha('#000', 0.08)}`,
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
            {/* Avatar */}
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: '#003D7A',
                fontSize: '2rem',
                fontWeight: 800,
                boxShadow: '0 4px 12px rgba(0,61,122,0.2)',
              }}
            >
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </Avatar>

            {/* User Info */}
            <Box sx={{ flex: 1, minWidth: 200 }}>
              <Typography variant="h5" fontWeight="700" sx={{ mb: 0.5, color: '#1A1A1A' }}>
                {user?.name}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1.5 }}>
                <Chip
                  icon={<PersonIcon sx={{ fontSize: 16 }} />}
                  label={user?.userId}
                  size="small"
                  sx={{
                    bgcolor: alpha('#003D7A', 0.08),
                    color: '#003D7A',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    height: 26,
                  }}
                />
                <Chip
                  label={getSkillLevelText(user?.skillLevel)}
                  size="small"
                  sx={{
                    bgcolor: alpha(getSkillLevelColor(user?.skillLevel), 0.1),
                    color: getSkillLevelColor(user?.skillLevel),
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    height: 26,
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <SchoolIcon sx={{ fontSize: 16, color: '#64748B' }} />
                  <Typography variant="body2" sx={{ color: '#64748B', fontSize: '0.8125rem' }}>
                    {user?.university}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <LocationIcon sx={{ fontSize: 16, color: '#64748B' }} />
                  <Typography variant="body2" sx={{ color: '#64748B', fontSize: '0.8125rem' }}>
                    {user?.city}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* STATS GRID - 4 COLUMNS */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Toplam Puan */}
        <Grid item xs={6} sm={6} md={3}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: `1px solid ${alpha('#000', 0.08)}`,
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              },
            }}
          >
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 2,
                  bgcolor: alpha('#FFC900', 0.1),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <TrophyIcon sx={{ fontSize: 28, color: '#FFC900' }} />
              </Box>
              <Typography variant="h3" fontWeight="800" sx={{ mb: 0.5, color: '#1A1A1A' }}>
                {userProgress?.user?.totalPoints || 0}
              </Typography>
              <Typography variant="caption" fontWeight={600} sx={{ color: '#64748B', fontSize: '0.8125rem' }}>
                Toplam Puan
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Tamamlanan Ders */}
        <Grid item xs={6} sm={6} md={3}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: `1px solid ${alpha('#000', 0.08)}`,
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              },
            }}
          >
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 2,
                  bgcolor: alpha('#10B981', 0.1),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <CheckIcon sx={{ fontSize: 28, color: '#10B981' }} />
              </Box>
              <Typography variant="h3" fontWeight="800" sx={{ mb: 0.5, color: '#1A1A1A' }}>
                {userProgress?.completedLessons || 0}
              </Typography>
              <Typography variant="caption" fontWeight={600} sx={{ color: '#64748B', fontSize: '0.8125rem' }}>
                Tamamlanan Ders
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Ortalama Başarı */}
        <Grid item xs={6} sm={6} md={3}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: `1px solid ${alpha('#000', 0.08)}`,
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              },
            }}
          >
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 2,
                  bgcolor: alpha('#3B82F6', 0.1),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <AssessmentIcon sx={{ fontSize: 28, color: '#3B82F6' }} />
              </Box>
              <Typography variant="h3" fontWeight="800" sx={{ mb: 0.5, color: '#1A1A1A' }}>
                %{Math.round(userProgress?.averageScore || 0)}
              </Typography>
              <Typography variant="caption" fontWeight={600} sx={{ color: '#64748B', fontSize: '0.8125rem' }}>
                Ortalama Başarı
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Rozet Sayısı */}
        <Grid item xs={6} sm={6} md={3}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              border: `1px solid ${alpha('#000', 0.08)}`,
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              },
            }}
          >
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 2,
                  bgcolor: alpha('#8B5CF6', 0.1),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <BadgeIcon sx={{ fontSize: 28, color: '#8B5CF6' }} />
              </Box>
              <Typography variant="h3" fontWeight="800" sx={{ mb: 0.5, color: '#1A1A1A' }}>
                {badges?.length || 0}
              </Typography>
              <Typography variant="caption" fontWeight={600} sx={{ color: '#64748B', fontSize: '0.8125rem' }}>
                Kazanılan Rozet
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* PROGRESS CARD */}
      <Card
        elevation={0}
        sx={{
          mb: 3,
          borderRadius: 3,
          border: `1px solid ${alpha('#000', 0.08)}`,
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight="700" sx={{ mb: 3, color: '#1A1A1A' }}>
            İlerleme Durumu
          </Typography>

          <Grid container spacing={3}>
            {/* Tamamlanma Oranı */}
            <Grid item xs={12} md={6}>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" fontWeight={600} sx={{ color: '#64748B' }}>
                    Tamamlanma Oranı
                  </Typography>
                  <Typography variant="body2" fontWeight={700} sx={{ color: '#FFC900' }}>
                    %{Math.round(userProgress?.completionRate || 0)}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={userProgress?.completionRate || 0}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: alpha('#FFC900', 0.1),
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 4,
                      bgcolor: '#FFC900',
                    },
                  }}
                />
                <Typography variant="caption" sx={{ color: '#64748B', mt: 0.5, display: 'block' }}>
                  {userProgress?.completedLessons || 0} / {userProgress?.totalLessons || 0} ders tamamlandı
                </Typography>
              </Box>
            </Grid>

            {/* Başarı Oranı */}
            <Grid item xs={12} md={6}>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" fontWeight={600} sx={{ color: '#64748B' }}>
                    Quiz Başarı Oranı
                  </Typography>
                  <Typography variant="body2" fontWeight={700} sx={{ color: '#10B981' }}>
                    %{Math.round(userProgress?.averageScore || 0)}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={userProgress?.averageScore || 0}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: alpha('#10B981', 0.1),
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 4,
                      bgcolor: '#10B981',
                    },
                  }}
                />
                <Typography variant="caption" sx={{ color: '#64748B', mt: 0.5, display: 'block' }}>
                  Ortalama quiz başarısı
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* BADGES CARD */}
      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          border: `1px solid ${alpha('#000', 0.08)}`,
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <BadgeIcon sx={{ fontSize: 24, color: '#8B5CF6' }} />
            <Typography variant="h6" fontWeight="700" sx={{ color: '#1A1A1A' }}>
              Kazanılan Rozetler
            </Typography>
            <Chip
              label={badges?.length || 0}
              size="small"
              sx={{
                bgcolor: alpha('#8B5CF6', 0.1),
                color: '#8B5CF6',
                fontWeight: 700,
                fontSize: '0.75rem',
                height: 24,
              }}
            />
          </Box>

          {badges && badges.length > 0 ? (
            <Grid container spacing={2}>
              {badges.map((badge) => (
                <Grid item xs={12} sm={6} md={4} key={badge.badgeId}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.5,
                      borderRadius: 3,
                      border: `1px solid ${alpha('#000', 0.08)}`,
                      bgcolor: '#FFF',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                        borderColor: alpha('#8B5CF6', 0.3),
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      {/* Badge Icon */}
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 2,
                          bgcolor: alpha('#8B5CF6', 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.75rem',
                          flexShrink: 0,
                        }}
                      >
                        {getBadgeIcon(badge.name)}
                      </Box>

                      {/* Badge Info */}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          variant="body2"
                          fontWeight={700}
                          sx={{
                            mb: 0.5,
                            color: '#1A1A1A',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {badge.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: '#64748B',
                            display: 'block',
                            fontSize: '0.75rem',
                            lineHeight: 1.4,
                          }}
                        >
                          {badge.description || 'Tebrikler! Bu rozeti kazandınız.'}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: '#8B5CF6',
                            display: 'block',
                            fontSize: '0.7rem',
                            mt: 0.5,
                            fontWeight: 600,
                          }}
                        >
                          {new Date(badge.awardedAt).toLocaleDateString('tr-TR', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </Typography>
                      </Box>
                    </Box>
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
                bgcolor: alpha('#F5F7FA', 0.5),
              }}
            >
              <Typography variant="h2" sx={{ mb: 2, fontSize: '3.5rem' }}>
                🏆
              </Typography>
              <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#1A1A1A' }}>
                Henüz rozet kazanmadınız
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B', maxWidth: 400, mx: 'auto' }}>
                Dersleri tamamlayıp quiz'leri çözerek rozetler kazanabilir ve başarılarınızı
                profilinizde gösterebilirsiniz!
              </Typography>
            </Paper>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
