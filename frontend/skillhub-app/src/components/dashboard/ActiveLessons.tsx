import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Stack,
  alpha,
} from '@mui/material';
import { PlayArrow as PlayIcon, Timer as TimerIcon, School as SchoolIcon } from '@mui/icons-material';
import { UserProgress } from '../../types';
import { useLessons } from '../../hooks/useQueries';

interface ActiveLessonsProps {
  userProgress?: UserProgress;
}

const ActiveLessons = ({ userProgress }: ActiveLessonsProps) => {
  const navigate = useNavigate();
  const { data: allLessons } = useLessons();

  const completedLessonIds = userProgress?.recentQuizResults.map((r) => r.lessonId) || [];
  const activeLessons = allLessons?.filter((lesson) => !completedLessonIds.includes(lesson.lessonId)) || [];

  const getCategoryColor = (categoryId: string) => {
    const colors: Record<string, string> = {
      C1: '#2196F3',
      C2: '#9C27B0',
      C3: '#F44336',
      C4: '#FF9800',
    };
    return colors[categoryId] || '#757575';
  };

  const getCategoryName = (categoryId: string) => {
    const names: Record<string, string> = {
      C1: 'Yazılım',
      C2: 'Yapay Zeka',
      C3: 'Siber Güvenlik',
      C4: 'Girişimcilik',
    };
    return names[categoryId] || 'Kategori';
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 2.5, md: 3 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2.5 }}>
          <SchoolIcon sx={{ fontSize: 28, color: 'primary.main', mr: 1 }} />
          <Typography variant="h6" fontWeight="bold">
            Aktif Derslerim
          </Typography>
        </Box>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ mb: 3, fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}
        >
          Devam etmek için bir ders seç
        </Typography>

        <Stack spacing={2}>
          {activeLessons.slice(0, 4).map((lesson) => (
            <Card
              key={lesson.lessonId}
              sx={{
                borderRadius: 2.5,
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  transform: 'translateY(-4px)',
                  borderColor: getCategoryColor(lesson.categoryId),
                },
              }}
            >
              <Box
                sx={{
                  height: 4,
                  background: `linear-gradient(90deg, ${getCategoryColor(lesson.categoryId)}, ${alpha(getCategoryColor(lesson.categoryId), 0.6)})`,
                  borderRadius: '8px 8px 0 0',
                }}
              />
              <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 1.5, flexWrap: 'wrap' }}>
                  <Chip
                    label={getCategoryName(lesson.categoryId)}
                    size="small"
                    sx={{
                      bgcolor: alpha(getCategoryColor(lesson.categoryId), 0.1),
                      color: getCategoryColor(lesson.categoryId),
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      height: 24,
                    }}
                  />
                  <Chip
                    label={lesson.difficulty}
                    size="small"
                    variant="outlined"
                    sx={{ 
                      fontSize: '0.75rem',
                      height: 24,
                    }}
                  />
                </Box>

                <Typography 
                  variant="subtitle2" 
                  fontWeight="600" 
                  gutterBottom
                  sx={{ 
                    fontSize: { xs: '0.875rem', sm: '0.9375rem' },
                    lineHeight: 1.4,
                    mb: 1,
                  }}
                >
                  {lesson.title}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                  <TimerIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    {lesson.durationMin} dakika
                  </Typography>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<PlayIcon />}
                  onClick={() => navigate(`/lesson/${lesson.lessonId}`)}
                  size="small"
                  sx={{
                    borderRadius: 1.5,
                    textTransform: 'none',
                    fontWeight: 600,
                    py: 1,
                  }}
                >
                  Derse Başla
                </Button>
              </CardContent>
            </Card>
          ))}

          {activeLessons.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h3" sx={{ mb: 1 }}>
                🎉
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Tüm dersleri tamamladın!
              </Typography>
            </Box>
          )}
        </Stack>

        {activeLessons.length > 0 && (
          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate('/lessons')}
            sx={{ 
              mt: 2, 
              borderRadius: 1.5,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Tüm Dersleri Gör
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ActiveLessons;
