import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  alpha,
  Grid,
} from '@mui/material';
import { EmojiEvents as TrophyIcon, Leaderboard as LeaderboardIconMui } from '@mui/icons-material';
import { useLeaderboard } from '../hooks/useQueries';
import { useAuth } from '../contexts/AuthContext';
import { LeaderboardSkeleton } from '../components/LoadingSkeletons';

const Leaderboard = () => {
  const { user } = useAuth();
  const [cityFilter, setCityFilter] = useState<string>('');
  const { data: leaderboard, isLoading } = useLeaderboard(
    cityFilter ? { city: cityFilter } : undefined
  );

  const cities = ['Istanbul', 'Ankara', 'Izmir', 'Bursa', 'Antalya'];

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return '#FFD700'; // Gold
      case 2:
        return '#C0C0C0'; // Silver
      case 3:
        return '#CD7F32'; // Bronze
      default:
        return alpha('#757575', 0.1);
    }
  };

  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `${rank}`;
    }
  };

  if (isLoading) {
    return <LeaderboardSkeleton />;
  }

  const userRank = leaderboard?.findIndex((entry) => entry.userId === user?.userId);
  const userEntry = userRank !== undefined && userRank >= 0 ? leaderboard?.[userRank] : null;

  return (
    <Box sx={{ pb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LeaderboardIconMui sx={{ fontSize: 32, color: 'primary.main', mr: 1.5 }} />
          <Typography 
            variant="h4" 
            fontWeight="bold"
            sx={{ fontSize: { xs: '1.75rem', sm: '2rem', md: '2.125rem' } }}
          >
            Liderlik Tablosu
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
          En başarılı kullanıcılar ve puanları
        </Typography>
      </Box>

      {/* User's Rank Card */}
      {userEntry && (
        <Card
          sx={{
            mb: 3,
            background: `linear-gradient(135deg, #FFC900 0%, #FFD740 100%)`,
            color: '#000',
            boxShadow: '0 8px 24px rgba(255, 201, 0, 0.3)',
            borderRadius: 3,
          }}
        >
          <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Avatar
                  sx={{
                    width: { xs: 56, sm: 64 },
                    height: { xs: 56, sm: 64 },
                    bgcolor: 'rgba(0, 0, 0, 0.1)',
                    color: '#000',
                    fontSize: { xs: '1.25rem', sm: '1.5rem' },
                    fontWeight: 'bold',
                    border: '3px solid rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {getRankEmoji(userEntry.rank)}
                </Avatar>
              </Grid>
              <Grid item xs>
                <Typography 
                  variant="h6" 
                  fontWeight="bold"
                  sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
                >
                  Senin Sıran
                </Typography>
                <Typography 
                  variant="body2"
                  sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
                >
                  {userEntry.rank}. sıradasın! Toplam {userEntry.totalPoints} puan
                </Typography>
              </Grid>
              <Grid item>
                <TrophyIcon sx={{ fontSize: { xs: 40, sm: 48 } }} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card sx={{ 
        mb: 3,
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        borderRadius: 3,
      }}>
        <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Şehir Filtrele</InputLabel>
                <Select
                  value={cityFilter}
                  label="Şehir Filtrele"
                  onChange={(e) => setCityFilter(e.target.value)}
                  sx={{
                    borderRadius: 1.5,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: alpha('#FFC900', 0.2),
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: alpha('#FFC900', 0.4),
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#FFC900',
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>Tüm Şehirler</em>
                  </MenuItem>
                  {cities.map((city) => (
                    <MenuItem key={city} value={city}>
                      📍 {city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Chip
                label={
                  cityFilter
                    ? `${cityFilter} şehrindeki sıralama gösteriliyor`
                    : 'Tüm kullanıcılar gösteriliyor'
                }
                sx={{
                  bgcolor: alpha('#FFC900', 0.1),
                  color: '#000',
                  fontWeight: 600,
                  fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                  height: { xs: 28, sm: 32 },
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Leaderboard Table */}
      <Card sx={{ 
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        borderRadius: 3,
        overflow: 'hidden',
      }}>
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: alpha('#FFC900', 0.08) }}>
                <TableCell sx={{ py: { xs: 1.5, sm: 2 } }}>
                  <Typography variant="subtitle2" fontWeight="bold" sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>
                    Sıra
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: { xs: 1.5, sm: 2 } }}>
                  <Typography variant="subtitle2" fontWeight="bold" sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>
                    Kullanıcı
                  </Typography>
                </TableCell>
                <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' }, py: { xs: 1.5, sm: 2 } }}>
                  <Typography variant="subtitle2" fontWeight="bold" sx={{ fontSize: '0.875rem' }}>
                    Şehir
                  </Typography>
                </TableCell>
                <TableCell align="right" sx={{ py: { xs: 1.5, sm: 2 } }}>
                  <Typography variant="subtitle2" fontWeight="bold" sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>
                    Toplam Puan
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboard?.map((entry, index) => (
                <TableRow
                  key={entry.userId}
                  sx={{
                    bgcolor: entry.userId === user?.userId 
                      ? alpha('#FFC900', 0.15)
                      : index < 3 
                      ? alpha(getRankColor(entry.rank), 0.1)
                      : 'transparent',
                    borderLeft: entry.user_id === user?.user_id ? '4px solid' : 'none',
                    borderLeftColor: '#FFC900',
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: entry.userId === user?.userId 
                        ? alpha('#FFC900', 0.2)
                        : alpha('#f5f5f5', 0.8),
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  <TableCell sx={{ py: { xs: 1.5, sm: 2 } }}>
                    <Avatar
                      sx={{
                        bgcolor: getRankColor(entry.rank),
                        color: entry.rank <= 3 ? '#000' : '#757575',
                        width: { xs: 36, sm: 44 },
                        height: { xs: 36, sm: 44 },
                        fontWeight: 'bold',
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                        border: entry.rank <= 3 ? '2px solid rgba(0,0,0,0.1)' : 'none',
                      }}
                    >
                      {entry.rank <= 3 ? getRankEmoji(entry.rank) : entry.rank}
                    </Avatar>
                  </TableCell>
                  <TableCell sx={{ py: { xs: 1.5, sm: 2 } }}>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                        <Typography 
                          fontWeight={entry.userId === user?.userId ? 700 : 600}
                          sx={{ fontSize: { xs: '0.875rem', sm: '0.9375rem' } }}
                        >
                          {entry.name}
                        </Typography>
                        {entry.userId === user?.userId && (
                          <Chip 
                            label="Sen" 
                            size="small" 
                            sx={{
                              bgcolor: '#FFC900',
                              color: '#000',
                              fontWeight: 700,
                              height: 22,
                              fontSize: '0.7rem',
                            }}
                          />
                        )}
                      </Box>
                      <Typography 
                        variant="caption" 
                        color="text.secondary"
                        sx={{ 
                          display: { xs: 'block', sm: 'none' },
                          fontSize: '0.75rem',
                          mt: 0.5,
                        }}
                      >
                        📍 {entry.city}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' }, py: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      📍 {entry.city}
                    </Typography>
                  </TableCell>
                  <TableCell align="right" sx={{ py: { xs: 1.5, sm: 2 } }}>
                    <Chip
                      icon={<TrophyIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />}
                      label={`${entry.totalPoints}`}
                      sx={{
                        bgcolor: entry.rank <= 3 
                          ? alpha('#FFC900', 0.2)
                          : alpha('#757575', 0.08),
                        color: entry.rank <= 3 ? '#000' : 'text.secondary',
                        fontWeight: 700,
                        fontSize: { xs: '0.75rem', sm: '0.8125rem' },
                        height: { xs: 26, sm: 30 },
                        border: entry.rank <= 3 ? `1px solid ${alpha('#FFC900', 0.3)}` : 'none',
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {leaderboard?.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            🏅
          </Typography>
          <Typography variant="h6" color="text.secondary" fontWeight={500}>
            Henüz sıralama bulunmuyor
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Leaderboard;
