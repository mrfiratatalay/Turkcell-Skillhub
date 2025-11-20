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
import {
  EmojiEvents as TrophyIcon,
  Leaderboard as LeaderboardIconMui,
  FilterList as FilterIcon,
  Star as StarIcon,
} from '@mui/icons-material';
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

  const getRankGradient = (rank: number) => {
    switch (rank) {
      case 1:
        return 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'; // Gold
      case 2:
        return 'linear-gradient(135deg, #C0C0C0 0%, #A8A8A8 100%)'; // Silver
      case 3:
        return 'linear-gradient(135deg, #CD7F32 0%, #B8753F 100%)'; // Bronze
      default:
        return 'linear-gradient(135deg, #64748B 0%, #475569 100%)';
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
        return null;
    }
  };

  if (isLoading) {
    return <LeaderboardSkeleton />;
  }

  // Backend'den duplicate veriler gelebiliyor - unique yap (userId bazlı)
  const uniqueLeaderboard = leaderboard?.filter((entry, index, self) =>
    index === self.findIndex((e) => e.userId === entry.userId)
  ).sort((a, b) => (a.rank || 0) - (b.rank || 0));

  const userRank = uniqueLeaderboard?.findIndex((entry) => entry.userId === user?.userId);
  const userEntry = userRank !== undefined && userRank >= 0 ? uniqueLeaderboard?.[userRank] : null;

  return (
    <Box sx={{ pb: 4 }}>
      {/* Modern Header */}
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
          },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
            <Box
              sx={{
                width: { xs: 48, sm: 56 },
                height: { xs: 48, sm: 56 },
                borderRadius: 3,
                background: 'linear-gradient(135deg, #FFC900 0%, #FFD740 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(255, 201, 0, 0.35)',
                mr: 2,
              }}
            >
              <TrophyIcon sx={{ fontSize: { xs: 28, sm: 32 }, color: '#000' }} />
            </Box>
            <Box>
              <Typography
                variant="h3"
                fontWeight="800"
                sx={{
                  color: '#FFF',
                  fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
                  lineHeight: 1.2,
                }}
              >
                Liderlik Tablosu
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: alpha('#FFF', 0.9),
                  fontWeight: 500,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                }}
              >
                En başarılı kullanıcılar • {uniqueLeaderboard?.length || 0} yarışmacı
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* User's Rank Card */}
      {userEntry && (
        <Card
          elevation={0}
          sx={{
            mb: 4,
            borderRadius: 4,
            overflow: 'hidden',
            border: `3px solid #FFC900`,
            background: alpha('#FFC900', 0.08),
          }}
        >
          <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
            <Typography variant="overline" fontWeight={700} color="text.secondary" sx={{ mb: 1 }}>
              Senin Sıralaman: #{userEntry.rank || '?'}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  minWidth: { xs: 60, sm: 70 },
                  height: { xs: 60, sm: 70 },
                  borderRadius: 3,
                  background: getRankGradient(userEntry.rank || 99),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                }}
              >
                <Typography variant="h4" fontWeight="900" color="#FFF">
                  {getRankEmoji(userEntry.rank || 99) || userEntry.rank}
                </Typography>
              </Box>

              <Avatar
                sx={{
                  width: { xs: 50, sm: 60 },
                  height: { xs: 50, sm: 60 },
                  bgcolor: '#003D7A',
                  fontSize: { xs: '1.5rem', sm: '1.75rem' },
                  fontWeight: 700,
                  border: `3px solid ${alpha('#003D7A', 0.2)}`,
                }}
              >
                {userEntry.userId?.charAt(1)?.toUpperCase() || 'U'}
              </Avatar>

              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight="700" gutterBottom>
                  {userEntry.userId} (Sen)
                </Typography>
                <Chip
                  label={userEntry.city || 'Bilinmiyor'}
                  size="small"
                  sx={{
                    bgcolor: alpha('#003D7A', 0.1),
                    color: '#003D7A',
                    fontWeight: 600,
                  }}
                />
              </Box>

              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="h4" fontWeight="900" color="primary">
                  {userEntry.totalPoints || 0}
                </Typography>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  Puan
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Filter */}
      <Card
        elevation={0}
        sx={{
          mb: 3,
          borderRadius: 4,
          border: `2px solid ${alpha('#000', 0.08)}`,
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
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
                  <FilterIcon sx={{ fontSize: 22, color: '#FFF' }} />
                </Box>
                <Typography variant="h6" fontWeight="700">
                  Filtreleme
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small">
                <InputLabel>Şehir Seç</InputLabel>
                <Select
                  value={cityFilter}
                  label="Şehir Seç"
                  onChange={(e) => setCityFilter(e.target.value)}
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="">Tüm Şehirler</MenuItem>
                  {cities.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Leaderboard Table */}
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          overflow: 'hidden',
          border: `2px solid ${alpha('#000', 0.08)}`,
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: alpha('#003D7A', 0.05) }}>
                <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem' }}>Sıra</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem' }}>Kullanıcı ID</TableCell>
                <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem' }}>Şehir</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, fontSize: '0.875rem' }}>
                  Puan
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {uniqueLeaderboard?.map((entry) => {
                const isCurrentUser = entry.userId === user?.userId;
                const rankEmoji = getRankEmoji(entry.rank || 99);

                return (
                  <TableRow
                    key={entry.userId}
                    sx={{
                      bgcolor: isCurrentUser ? alpha('#FFC900', 0.08) : 'transparent',
                      borderLeft: isCurrentUser ? `4px solid #FFC900` : 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: isCurrentUser
                          ? alpha('#FFC900', 0.12)
                          : alpha('#003D7A', 0.04),
                      },
                    }}
                  >
                    <TableCell>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: 2.5,
                          background: getRankGradient(entry.rank || 99),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: (entry.rank || 99) <= 3 ? '0 4px 12px rgba(0, 0, 0, 0.2)' : 'none',
                        }}
                      >
                        <Typography variant="h6" fontWeight="900" color="#FFF">
                          {rankEmoji || entry.rank}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar
                          sx={{
                            width: 44,
                            height: 44,
                            bgcolor: (entry.rank || 99) <= 3 ? '#003D7A' : alpha('#64748B', 0.2),
                            fontSize: '1.125rem',
                            fontWeight: 700,
                            border: (entry.rank || 99) <= 3 ? `2px solid ${alpha('#003D7A', 0.2)}` : 'none',
                          }}
                        >
                          {entry.userId?.charAt(1)?.toUpperCase() || 'U'}
                        </Avatar>
                        <Box>
                          <Typography variant="body1" fontWeight={700}>
                            {entry.userId}
                            {isCurrentUser && (
                              <Chip
                                label="Sen"
                                size="small"
                                sx={{
                                  ml: 1,
                                  bgcolor: '#FFC900',
                                  color: '#000',
                                  fontWeight: 700,
                                  fontSize: '0.7rem',
                                  height: 20,
                                }}
                              />
                            )}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" fontWeight={500}>
                            Rank: {entry.rank}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={entry.city || 'Bilinmiyor'}
                        size="small"
                        sx={{
                          bgcolor: alpha('#3B82F6', 0.1),
                          color: '#3B82F6',
                          fontWeight: 600,
                          fontSize: '0.875rem',
                        }}
                      />
                    </TableCell>

                    <TableCell align="right">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 0.5 }}>
                        <StarIcon sx={{ fontSize: 20, color: '#FFC900' }} />
                        <Typography variant="h6" fontWeight="800" color="primary">
                          {entry.totalPoints || 0}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {uniqueLeaderboard?.length === 0 && (
          <Box sx={{ p: 8, textAlign: 'center' }}>
            <Typography variant="h2" sx={{ mb: 2 }}>
              🏆
            </Typography>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Henüz yarışmacı yok
            </Typography>
            <Typography variant="body2" color="text.secondary">
              İlk sıralamaya giren sen olabilirsin!
            </Typography>
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default Leaderboard;
