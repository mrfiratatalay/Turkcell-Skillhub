import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  Paper,
  alpha,
  Grid,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Leaderboard as LeaderboardIcon,
} from '@mui/icons-material';
import { UserProgress, LeaderboardEntry, User } from '../../types';
import { getDisplayName, getAvatarLetter } from '../../utils/mockNames';

interface BadgesPanelProps {
  userProgress?: UserProgress;
  leaderboard: LeaderboardEntry[];
  currentUser: User | null;
}

const BadgesPanel = ({ userProgress, leaderboard, currentUser }: BadgesPanelProps) => {
  const navigate = useNavigate();

  const getBadgeIcon = (badgeName: string) => {
    if (badgeName.includes('Motivasyon')) return '🎯';
    if (badgeName.includes('Uzman')) return '⭐';
    if (badgeName.includes('Lider')) return '👑';
    return '🏆';
  };

  // Backend'den duplicate veriler gelebiliyor - unique yap
  const uniqueLeaderboard = leaderboard.filter(
    (entry, index, self) => index === self.findIndex((e) => e.userId === entry.userId)
  );

  const userRank = uniqueLeaderboard.findIndex((entry) => entry.userId === currentUser?.userId) + 1;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 2.5, md: 3 } }}>
      {/* Badges Card */}
      <Card sx={{ 
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        borderRadius: 3,
      }}>
        <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
            <TrophyIcon sx={{ fontSize: 28, color: 'primary.main', mr: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Rozetlerim
            </Typography>
          </Box>

          {userProgress?.badges && userProgress.badges.length > 0 ? (
            <Grid container spacing={1.5}>
              {userProgress.badges.map((badge) => (
                <Grid item xs={6} key={badge.badgeId}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 1.5, sm: 2 },
                      textAlign: 'center',
                      background: `linear-gradient(135deg, #FFC900 0%, #FFD740 100%)`,
                      color: '#000',
                      borderRadius: 2.5,
                      transition: 'all 0.3s',
                      cursor: 'pointer',
                      border: '2px solid transparent',
                      '&:hover': {
                        transform: 'translateY(-4px) scale(1.02)',
                        boxShadow: '0 8px 24px rgba(255, 201, 0, 0.4)',
                        border: '2px solid #FFD740',
                      },
                    }}
                  >
                    <Typography sx={{ fontSize: { xs: 32, sm: 40 }, mb: 0.5 }}>
                      {getBadgeIcon(badge.name)}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      fontWeight="bold" 
                      display="block"
                      sx={{ 
                        fontSize: { xs: '0.7rem', sm: '0.75rem' },
                        lineHeight: 1.2,
                      }}
                    >
                      {badge.name}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: 'center', py: { xs: 2, sm: 3 } }}>
              <Typography variant="h3" sx={{ mb: 1, fontSize: { xs: '2rem', sm: '3rem' } }}>
                🏆
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight={500} sx={{ mb: 0.5 }}>
                Henüz rozet kazanmadın
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Dersleri tamamlayarak rozet kazan!
              </Typography>
            </Box>
          )}

          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate('/profile')}
            sx={{ 
              mt: 2,
              borderRadius: 1.5,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Tüm Rozetleri Gör
          </Button>
        </CardContent>
      </Card>

      {/* Leaderboard Card */}
      <Card sx={{ 
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        borderRadius: 3,
      }}>
        <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LeaderboardIcon sx={{ fontSize: 28, color: 'primary.main', mr: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Liderlik Tablosu
            </Typography>
          </Box>

          {userRank > 0 && (
            <Paper
              elevation={0}
              sx={{
                p: { xs: 1.5, sm: 2 },
                mb: 2,
                background: `linear-gradient(135deg, #FFC900 0%, #FFD740 100%)`,
                color: '#000',
                borderRadius: 2,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" fontWeight="bold" sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>
                  Senin Sıran
                </Typography>
                <Chip
                  label={`#${userRank}`}
                  sx={{
                    bgcolor: 'rgba(0, 0, 0, 0.1)',
                    color: '#000',
                    fontWeight: 700,
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    height: { xs: 28, sm: 32 },
                  }}
                />
              </Box>
            </Paper>
          )}

          <Typography 
            variant="subtitle2" 
            fontWeight="600" 
            gutterBottom 
            sx={{ 
              mt: 2,
              mb: 1.5,
              fontSize: { xs: '0.8125rem', sm: '0.875rem' },
            }}
          >
            En Aktif Kullanıcılar
          </Typography>

          <List disablePadding>
            {uniqueLeaderboard.slice(0, 5).map((entry, index) => (
              <ListItem
                key={`${entry.userId}-${index}`}
                sx={{
                  bgcolor: index < 3 ? alpha('#f5f5f5', 0.6) : 'transparent',
                  borderRadius: 1.5,
                  mb: 1,
                  px: { xs: 1, sm: 1.5 },
                  py: { xs: 0.75, sm: 1 },
                  border: entry.userId === currentUser?.userId ? '2px solid' : '1px solid',
                  borderColor: entry.userId === currentUser?.userId ? 'primary.main' : 'transparent',
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor:
                        index === 0
                          ? '#FFD700'
                          : index === 1
                          ? '#C0C0C0'
                          : index === 2
                          ? '#CD7F32'
                          : alpha('#757575', 0.1),
                      color: index < 3 ? '#000' : '#757575',
                      fontWeight: 'bold',
                      width: { xs: 36, sm: 40 },
                      height: { xs: 36, sm: 40 },
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                    }}
                  >
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : entry.rank}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="body2" fontWeight="600" sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>
                      {entry.name}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                      {entry.city}
                    </Typography>
                  }
                />
                <Chip
                  label={`${entry.totalPoints}`}
                  size="small"
                  icon={<TrophyIcon sx={{ fontSize: 14 }} />}
                  sx={{
                    bgcolor: index < 3 ? alpha('#FFC900', 0.2) : alpha('#757575', 0.1),
                    color: index < 3 ? '#000' : 'text.secondary',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    height: { xs: 24, sm: 28 },
                  }}
                />
              </ListItem>
            ))}
          </List>

          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate('/leaderboard')}
            sx={{ 
              mt: 1.5,
              borderRadius: 1.5,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Tüm Sıralamayı Gör
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default BadgesPanel;
