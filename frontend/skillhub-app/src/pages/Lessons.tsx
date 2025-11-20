import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  alpha,
  Grid,
  Paper,
} from '@mui/material';
import {
  Timer as TimerIcon,
  PlayArrow as PlayIcon,
  School as SchoolIcon,
  TrendingUp as TrendingIcon,
} from '@mui/icons-material';
import { useCategories, useLessons } from '../hooks/useQueries';
import { LessonsListSkeleton } from '../components/LoadingSkeletons';

const Lessons = () => {
  const navigate = useNavigate();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: lessons, isLoading: lessonsLoading } = useLessons();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredLessons =
    selectedCategory === 'all'
      ? lessons
      : lessons?.filter((lesson) => lesson.categoryId === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
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

  const getCategoryColor = (categoryId: string) => {
    const colors: Record<string, string> = {
      C1: '#3B82F6',
      C2: '#8B5CF6',
      C3: '#EF4444',
      C4: '#F59E0B',
    };
    return colors[categoryId] || '#64748B';
  };

  if (categoriesLoading || lessonsLoading) {
    return <LessonsListSkeleton />;
  }

  return (
    <Box sx={{ pb: 4 }}>
      {/* Modern Header */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 4 },
          mb: 4,
          borderRadius: 5,
          background: 'linear-gradient(135deg, #FFC900 0%, #FFD740 100%)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '40%',
            height: '100%',
            background: `radial-gradient(circle at center, ${alpha('#003D7A', 0.15)}, transparent)`,
            pointerEvents: 'none',
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
                background: 'linear-gradient(135deg, #003D7A 0%, #1565C0 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(0, 61, 122, 0.35)',
                mr: 2,
              }}
            >
              <SchoolIcon sx={{ fontSize: { xs: 28, sm: 32 }, color: '#FFC900' }} />
            </Box>
            <Box>
          <Typography 
                variant="h3"
                fontWeight="800"
                sx={{
                  color: '#000',
                  fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
                  lineHeight: 1.2,
                }}
          >
            Eğitim Kataloğu
          </Typography>
        <Typography 
                variant="h6"
          sx={{ 
                  color: alpha('#000', 0.7),
                  fontWeight: 500,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
          }}
        >
                {lessons?.length || 0} ders • {categories?.length || 0} kategori
        </Typography>
      </Box>
          </Box>
        </Box>
      </Paper>

      {/* Category Tabs */}
      <Paper
        elevation={0}
        sx={{ 
          mb: 4,
          borderRadius: 4,
          overflow: 'hidden',
          border: `1px solid ${alpha('#000', 0.08)}`,
        }}
      >
        <Tabs
          value={selectedCategory}
          onChange={(_, newValue) => setSelectedCategory(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: { xs: '0.875rem', sm: '0.9375rem' },
              minHeight: { xs: 48, sm: 56 },
              px: { xs: 2.5, sm: 3.5 },
              transition: 'all 0.3s ease',
            },
            '& .Mui-selected': {
              color: '#FFC900',
              backgroundColor: alpha('#FFC900', 0.1),
            },
            '& .MuiTabs-indicator': {
              height: 4,
              borderRadius: '4px 4px 0 0',
              backgroundColor: '#FFC900',
            },
          }}
        >
          <Tab label="🔥 Tümü" value="all" />
          {categories?.map((category) => {
            const icons: Record<string, string> = {
              C1: '💻',
              C2: '🤖',
              C3: '🔒',
              C4: '💼',
            };
            return (
              <Tab 
                key={category.categoryId}
                label={`${icons[category.categoryId] || '📚'} ${category.name}`}
                value={category.categoryId}
              />
            );
          })}
        </Tabs>
      </Paper>

      {/* Lessons Grid */}
      <Grid container spacing={{ xs: 2.5, sm: 3, md: 3.5 }}>
        {filteredLessons?.map((lesson) => {
          const category = categories?.find((c) => c.categoryId === lesson.categoryId);
          
          return (
            <Grid item xs={12} sm={6} lg={4} key={lesson.lessonId}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 4,
                  overflow: 'hidden',
                  border: `2px solid transparent`,
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 6,
                    background: `linear-gradient(90deg, ${getCategoryColor(lesson.categoryId)}, ${alpha(getCategoryColor(lesson.categoryId), 0.6)})`,
                  },
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 16px 48px ${alpha(getCategoryColor(lesson.categoryId), 0.25)}`,
                    borderColor: getCategoryColor(lesson.categoryId),
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: { xs: 2.5, sm: 3 }, pt: 3 }}>
                  <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip
                      label={category?.name}
                      size="small"
                      sx={{
                        bgcolor: alpha(getCategoryColor(lesson.categoryId), 0.12),
                        color: getCategoryColor(lesson.categoryId),
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        height: 28,
                        border: `1.5px solid ${alpha(getCategoryColor(lesson.categoryId), 0.3)}`,
                        borderRadius: 2,
                      }}
                    />
                    <Chip
                      label={lesson.difficulty}
                      size="small"
                      color={getDifficultyColor(lesson.difficulty) as any}
                      sx={{ 
                        fontSize: '0.75rem',
                        height: 28,
                        fontWeight: 700,
                        borderRadius: 2,
                      }}
                    />
                  </Box>

                  <Typography 
                    variant="h6" 
                    fontWeight="700"
                    gutterBottom
                    sx={{
                      fontSize: { xs: '1.05rem', sm: '1.15rem' },
                      lineHeight: 1.3,
                      mb: 1.5,
                      minHeight: { xs: 'auto', sm: '2.6em' },
                      color: 'text.primary',
                    }}
                  >
                    {lesson.title}
                  </Typography>

                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      mb: 2.5,
                      fontSize: { xs: '0.85rem', sm: '0.9rem' },
                      lineHeight: 1.6,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {lesson.description}
                  </Typography>

                  <Box 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 0.75,
                      px: 2,
                      py: 1,
                      bgcolor: alpha('#f5f5f5', 0.8),
                      borderRadius: 2,
                      width: 'fit-content',
                    }}
                  >
                    <TimerIcon sx={{ fontSize: 18, color: getCategoryColor(lesson.categoryId) }} />
                    <Typography 
                      variant="caption" 
                      fontWeight={700}
                      sx={{ fontSize: '0.8125rem', color: 'text.primary' }}
                    >
                      {lesson.durationMin} dakika
                    </Typography>
                  </Box>
                </CardContent>

                <CardActions sx={{ p: { xs: 2, sm: 2.5 }, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<PlayIcon />}
                    onClick={() => navigate(`/lesson/${lesson.lessonId}`)}
                    sx={{
                      borderRadius: 2.5,
                      fontWeight: 700,
                      py: 1.5,
                      fontSize: { xs: '0.9rem', sm: '0.95rem' },
                      background: `linear-gradient(135deg, ${getCategoryColor(lesson.categoryId)} 0%, ${alpha(getCategoryColor(lesson.categoryId), 0.8)} 100%)`,
                      boxShadow: `0 4px 12px ${alpha(getCategoryColor(lesson.categoryId), 0.3)}`,
                      '&:hover': {
                        background: `linear-gradient(135deg, ${alpha(getCategoryColor(lesson.categoryId), 0.9)} 0%, ${getCategoryColor(lesson.categoryId)} 100%)`,
                        boxShadow: `0 6px 20px ${alpha(getCategoryColor(lesson.categoryId), 0.4)}`,
                      },
                    }}
                  >
                    Derse Başla
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Empty State */}
      {filteredLessons?.length === 0 && (
        <Paper
          elevation={0}
          sx={{
            textAlign: 'center',
            py: 10,
            borderRadius: 4,
            border: `2px dashed ${alpha('#000', 0.1)}`,
          }}
        >
          <Typography variant="h2" sx={{ mb: 2 }}>
            📚
          </Typography>
          <Typography variant="h5" color="text.primary" fontWeight={700} sx={{ mb: 1 }}>
            Henüz ders yok
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Bu kategoride henüz ders bulunmuyor
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default Lessons;
