import {
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Paper,
  Chip,
  alpha,
  Grid,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  EmojiEvents as TrophyIcon,
  CheckCircle as CheckIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import { UserProgress } from '../../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ProgressPanelProps {
  userProgress?: UserProgress;
}

const ProgressPanel = ({ userProgress }: ProgressPanelProps) => {
  const chartData = userProgress?.recentQuizResults.map((result, index) => ({
    name: `Quiz ${index + 1}`,
    score: result.score,
  })) || [];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 2.5, md: 3 } }}>
      {/* Overall Progress Card */}
      <Card sx={{ 
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        borderRadius: 3,
      }}>
        <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
            <AssessmentIcon sx={{ fontSize: 28, color: 'primary.main', mr: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Genel İlerleme
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: { xs: 1.5, sm: 2 },
                  background: `linear-gradient(135deg, ${alpha('#FFC900', 1)} 0%, ${alpha('#FFD740', 1)} 100%)`,
                  color: '#000',
                  textAlign: 'center',
                  borderRadius: 2.5,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <TrophyIcon sx={{ fontSize: { xs: 28, sm: 32 }, mb: 0.5 }} />
                <Typography 
                  variant="h4" 
                  fontWeight="bold"
                  sx={{ fontSize: { xs: '1.75rem', sm: '2rem' } }}
                >
                  {userProgress?.user.total_points || 0}
                </Typography>
                <Typography variant="caption" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                  Toplam Puan
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: { xs: 1.5, sm: 2 },
                  background: `linear-gradient(135deg, #003D7A 0%, #1565C0 100%)`,
                  color: 'white',
                  textAlign: 'center',
                  borderRadius: 2.5,
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CheckIcon sx={{ fontSize: { xs: 28, sm: 32 }, mb: 0.5 }} />
                <Typography 
                  variant="h4" 
                  fontWeight="bold"
                  sx={{ fontSize: { xs: '1.75rem', sm: '2rem' } }}
                >
                  {userProgress?.completedLessons || 0}
                </Typography>
                <Typography variant="caption" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                  Tamamlanan Ders
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, alignItems: 'center' }}>
              <Typography variant="body2" fontWeight="600" sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>
                Tamamlama Oranı
              </Typography>
              <Chip 
                label={`${Math.round(userProgress?.completionRate || 0)}%`}
                size="small"
                sx={{
                  bgcolor: alpha('#FFC900', 0.1),
                  color: '#FFC900',
                  fontWeight: 700,
                  fontSize: '0.8125rem',
                  height: 28,
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

          <Box sx={{ mt: 2.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, alignItems: 'center' }}>
              <Typography variant="body2" fontWeight="600" sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>
                Ortalama Başarı
              </Typography>
              <Chip 
                label={`${Math.round(userProgress?.averageScore || 0)}%`}
                size="small"
                sx={{
                  bgcolor: alpha('#4CAF50', 0.1),
                  color: '#4CAF50',
                  fontWeight: 700,
                  fontSize: '0.8125rem',
                  height: 28,
                }}
              />
            </Box>
            <LinearProgress
              variant="determinate"
              value={userProgress?.averageScore || 0}
              color="success"
              sx={{ 
                height: 10, 
                borderRadius: 5,
                bgcolor: alpha('#4CAF50', 0.1),
                '& .MuiLinearProgress-bar': {
                  borderRadius: 5,
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Quiz Performance Chart */}
      <Card sx={{ 
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        borderRadius: 3,
      }}>
        <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TrendingUpIcon sx={{ fontSize: 28, color: 'primary.main', mr: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              Quiz Performansı
            </Typography>
          </Box>

          {chartData.length > 0 ? (
            <>
              <Box sx={{ width: '100%', height: { xs: 180, sm: 200 }, mt: 2, minHeight: 180 }}>
                <ResponsiveContainer width="100%" height="100%" minHeight={180}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }}
                      stroke="#999"
                    />
                    <YAxis 
                      domain={[0, 100]} 
                      tick={{ fontSize: 12 }}
                      stroke="#999"
                    />
                    <Tooltip 
                      contentStyle={{
                        borderRadius: 8,
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#FFC900"
                      strokeWidth={3}
                      dot={{ fill: '#FFC900', r: 5, strokeWidth: 2, stroke: '#fff' }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>

              {userProgress?.recentQuizResults && userProgress.recentQuizResults.length > 0 && (
                <Box sx={{ mt: 2.5 }}>
                  <Typography variant="subtitle2" fontWeight="600" gutterBottom sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>
                    Son Quiz Sonucu
                  </Typography>
                  <Paper 
                    elevation={0}
                    sx={{ 
                      p: 2, 
                      bgcolor: alpha('#f5f5f5', 0.6),
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>
                        Quiz #{userProgress.recentQuizResults.length}
                      </Typography>
                      <Chip
                        label={`${userProgress.recentQuizResults[userProgress.recentQuizResults.length - 1].score}%`}
                        sx={{
                          fontWeight: 700,
                          bgcolor: userProgress.recentQuizResults[userProgress.recentQuizResults.length - 1].score >= 80
                            ? alpha('#4CAF50', 0.1)
                            : userProgress.recentQuizResults[userProgress.recentQuizResults.length - 1].score >= 60
                            ? alpha('#FF9800', 0.1)
                            : alpha('#F44336', 0.1),
                          color: userProgress.recentQuizResults[userProgress.recentQuizResults.length - 1].score >= 80
                            ? '#4CAF50'
                            : userProgress.recentQuizResults[userProgress.recentQuizResults.length - 1].score >= 60
                            ? '#FF9800'
                            : '#F44336',
                        }}
                      />
                    </Box>
                  </Paper>
                </Box>
              )}
            </>
          ) : (
            <Box sx={{ textAlign: 'center', py: { xs: 3, sm: 4 } }}>
              <Typography variant="h3" sx={{ mb: 1, fontSize: { xs: '2rem', sm: '3rem' } }}>
                📊
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Henüz quiz sonucu bulunmuyor
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProgressPanel;
