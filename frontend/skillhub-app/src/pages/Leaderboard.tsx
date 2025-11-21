import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Avatar,
  Chip,
  FormControl,
  Select,
  MenuItem,
  Divider,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Place as PlaceIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';
import { useLeaderboard } from '../hooks/useQueries';
import { useAuth } from '../contexts/AuthContext';
import { LeaderboardSkeleton } from '../components/LoadingSkeletons';

const Leaderboard = () => {
  const { user } = useAuth();
  const [cityFilter, setCityFilter] = useState<string>('');
  
  // Backend'den tüm veriyi al (filtreyi frontend'de yapacağız)
  const { data: leaderboard, isLoading } = useLeaderboard();

  // Backend'den gelen unique şehirleri al
  const cities = Array.from(
    new Set(leaderboard?.map((entry) => entry.city).filter(Boolean))
  ).sort();

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return '#FFD700'; // Gold
      case 2:
        return '#C0C0C0'; // Silver
      case 3:
        return '#CD7F32'; // Bronze
      default:
        return '#E0E0E0'; // Gray
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return rank;
    }
  };

  if (isLoading) {
    return <LeaderboardSkeleton />;
  }

  // Backend'den duplicate veriler gelebiliyor - unique yap (userId bazlı)
  const uniqueLeaderboard = leaderboard
    ?.filter((entry, index, self) =>
      index === self.findIndex((e) => e.userId === entry.userId)
    )
    // City filter uygula (case-insensitive)
    .filter((entry) => {
      if (!cityFilter) return true;
      return entry.city?.toLowerCase() === cityFilter.toLowerCase();
    })
    .sort((a, b) => (a.rank || 0) - (b.rank || 0));

  const userRank = uniqueLeaderboard?.findIndex((entry) => entry.userId === user?.userId);
  const userEntry = userRank !== undefined && userRank >= 0 ? uniqueLeaderboard?.[userRank] : null;

  return (
    <Box sx={{ pb: 6, bgcolor: '#F5F7FA', minHeight: '100vh' }}>
      {/* MINIMAL PROFESSIONAL HEADER */}
      <Box
        sx={{
          bgcolor: '#FFF',
          py: { xs: 4, sm: 5 },
          px: { xs: 3, sm: 4 },
          mb: 3,
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <TrophyIcon sx={{ fontSize: 28, color: '#003D7A' }} />
          <Typography
            variant="h4"
            fontWeight="700"
            sx={{
              color: '#1A1A1A',
              fontSize: { xs: '1.5rem', sm: '1.75rem' },
            }}
          >
            Liderlik Tablosu
          </Typography>
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: '#64748B',
            fontSize: '0.9375rem',
            fontWeight: 500,
          }}
        >
          En yüksek puana sahip {uniqueLeaderboard?.length || 0} kullanıcı
        </Typography>
      </Box>

      {/* USER RANK CARD - CLEAN & PROFESSIONAL */}
      {userEntry && (
        <Card
          elevation={0}
          sx={{
            mb: 3,
            borderRadius: '12px',
            bgcolor: '#FFF',
            border: '2px solid #003D7A',
            boxShadow: '0 2px 8px rgba(0,61,122,0.12)',
          }}
        >
          <Box sx={{ p: { xs: 2.5, sm: 3 } }}>
            <Typography
              variant="caption"
              sx={{
                color: '#64748B',
                fontWeight: 600,
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                mb: 1.5,
                display: 'block',
              }}
            >
              Senin Sıralaman
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '8px',
                  bgcolor: getRankColor(userEntry.rank || 99),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Typography variant="h6" fontWeight="700" sx={{ color: '#FFF', fontSize: '1.125rem' }}>
                  {getRankIcon(userEntry.rank || 99)}
                </Typography>
              </Box>

              <Avatar
                sx={{
                  width: 44,
                  height: 44,
                  bgcolor: '#E8F0FE',
                  color: '#003D7A',
                  fontWeight: 700,
                  fontSize: '1rem',
                }}
              >
                {userEntry.userId?.charAt(1)?.toUpperCase() || 'U'}
              </Avatar>

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="body1" fontWeight="700" sx={{ color: '#1A1A1A', fontSize: '0.9375rem' }}>
                  {userEntry.userId}
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B', fontSize: '0.8125rem' }}>
                  {userEntry.city || 'Bilinmiyor'}
                </Typography>
              </Box>

              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="h6" fontWeight="700" sx={{ color: '#003D7A', fontSize: '1.25rem' }}>
                  {userEntry.totalPoints || 0}
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B', fontSize: '0.75rem' }}>
                  puan
                </Typography>
              </Box>
            </Box>
          </Box>
        </Card>
      )}

      {/* MINIMAL FILTER BAR */}
      <Box
        sx={{
          bgcolor: '#FFF',
          p: 2,
          mb: 2,
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterIcon sx={{ fontSize: 20, color: '#64748B' }} />
          <Typography variant="body2" fontWeight="600" sx={{ color: '#64748B', fontSize: '0.875rem' }}>
            Filtrele:
          </Typography>
        </Box>

        <FormControl size="small" sx={{ minWidth: 200, flex: { xs: '1 1 100%', sm: 'none' } }}>
          <Select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            displayEmpty
            sx={{
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: 600,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#E2E8F0',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#CBD5E1',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#003D7A',
                borderWidth: '1px',
              },
            }}
          >
            <MenuItem value="">
              <Typography fontSize="0.875rem" fontWeight={600}>
                Tüm Şehirler
              </Typography>
            </MenuItem>
            {cities.map((city) => (
              <MenuItem key={city} value={city}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PlaceIcon sx={{ fontSize: 16, color: '#64748B' }} />
                  <Typography fontSize="0.875rem" fontWeight={600}>
                    {city?.charAt(0).toUpperCase() + city?.slice(1)}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {cityFilter && (
          <Chip
            label={`${uniqueLeaderboard?.length || 0} sonuç`}
            size="small"
            sx={{
              bgcolor: '#E8F0FE',
              color: '#003D7A',
              fontWeight: 700,
              fontSize: '0.75rem',
            }}
          />
        )}
      </Box>

      {/* LEADERBOARD LIST - CLEAN & PROFESSIONAL */}
      <Card
        elevation={0}
        sx={{
          borderRadius: '12px',
          bgcolor: '#FFF',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          overflow: 'hidden',
        }}
      >
        {uniqueLeaderboard && uniqueLeaderboard.length > 0 ? (
          <>
            {uniqueLeaderboard.map((entry, index) => {
              const isCurrentUser = entry.userId === user?.userId;
              const isTopThree = (entry.rank || 99) <= 3;

              return (
                <Box key={`${entry.userId}-${index}`}>
                  <Box
                    sx={{
                      p: { xs: 2, sm: 2.5 },
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      bgcolor: isCurrentUser ? '#F0F9FF' : 'transparent',
                      borderLeft: isCurrentUser ? '3px solid #003D7A' : '3px solid transparent',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: isCurrentUser ? '#E0F2FE' : '#F8FAFC',
                      },
                    }}
                  >
                    {/* Rank Badge */}
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '8px',
                        bgcolor: getRankColor(entry.rank || 99),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Typography
                        variant="body2"
                        fontWeight="700"
                        sx={{
                          color: '#FFF',
                          fontSize: isTopThree ? '1.125rem' : '0.9375rem',
                        }}
                      >
                        {getRankIcon(entry.rank || 99)}
                      </Typography>
                    </Box>

                    {/* Avatar */}
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: isTopThree ? '#E8F0FE' : '#F1F5F9',
                        color: isTopThree ? '#003D7A' : '#64748B',
                        fontWeight: 700,
                        fontSize: '0.9375rem',
                      }}
                    >
                      {entry.userId?.charAt(1)?.toUpperCase() || 'U'}
                    </Avatar>

                    {/* User Info */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="body1"
                        fontWeight="700"
                        sx={{
                          color: '#1A1A1A',
                          fontSize: '0.9375rem',
                          mb: 0.25,
                        }}
                      >
                        {entry.userId}
                        {isCurrentUser && (
                          <Chip
                            label="Sen"
                            size="small"
                            sx={{
                              ml: 1,
                              bgcolor: '#003D7A',
                              color: '#FFF',
                              fontWeight: 700,
                              fontSize: '0.6875rem',
                              height: 20,
                            }}
                          />
                        )}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: '#64748B',
                          fontSize: '0.8125rem',
                        }}
                      >
                        {entry.city || 'Bilinmiyor'}
                      </Typography>
                    </Box>

                    {/* Points */}
                    <Box sx={{ textAlign: 'right', minWidth: 70 }}>
                      <Typography
                        variant="h6"
                        fontWeight="700"
                        sx={{
                          color: isTopThree ? '#003D7A' : '#1A1A1A',
                          fontSize: '1.125rem',
                        }}
                      >
                        {entry.totalPoints || 0}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: '#64748B',
                          fontSize: '0.75rem',
                        }}
                      >
                        puan
                      </Typography>
                    </Box>
                  </Box>
                  {index < uniqueLeaderboard.length - 1 && <Divider />}
                </Box>
              );
            })}
          </>
        ) : (
          <Box sx={{ p: { xs: 4, sm: 6 }, textAlign: 'center' }}>
            <Typography variant="h2" sx={{ mb: 2, fontSize: '3rem' }}>
              🏆
            </Typography>
            <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#1A1A1A' }}>
              Henüz yarışmacı yok
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B' }}>
              İlk sıralamaya giren sen olabilirsin!
            </Typography>
          </Box>
        )}
      </Card>
    </Box>
  );
};

export default Leaderboard;
