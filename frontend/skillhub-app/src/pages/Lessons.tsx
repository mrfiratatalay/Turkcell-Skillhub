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
  CircularProgress,
  alpha,
  Grid,
} from '@mui/material';
import { Timer as TimerIcon, PlayArrow as PlayIcon, School as SchoolIcon } from '@mui/icons-material';
import { useCategories, useLessons } from '../hooks/useQueries';

const Lessons = () => {
  const navigate = useNavigate();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: lessons, isLoading: lessonsLoading } = useLessons();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredLessons =
    selectedCategory === 'all'
      ? lessons
      : lessons?.filter((lesson) => lesson.category_id === selectedCategory);

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
      C1: '#2196F3',
      C2: '#9C27B0',
      C3: '#F44336',
      C4: '#FF9800',
    };
    return colors[categoryId] || '#757575';
  };

  if (categoriesLoading || lessonsLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ pb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <SchoolIcon sx={{ fontSize: 32, color: 'primary.main', mr: 1.5 }} />
          <Typography 
            variant="h4" 
            fontWeight="bold"
            sx={{ fontSize: { xs: '1.75rem', sm: '2rem', md: '2.125rem' } }}
          >
            Eğitim Kataloğu
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
          Kategorilere göre dersleri keşfet ve öğrenmeye başla
        </Typography>
      </Box>

      <Box 
        sx={{ 
          borderBottom: 1, 
          borderColor: 'divider', 
          mb: 4,
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            height: 6,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: alpha('#FFC900', 0.3),
            borderRadius: 3,
          },
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
              minHeight: { xs: 42, sm: 48 },
              px: { xs: 2, sm: 3 },
            },
            '& .Mui-selected': {
              color: 'primary.main',
            },
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: '3px 3px 0 0',
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
                key={category.category_id} 
                label={`${icons[category.category_id] || '📚'} ${category.name}`}
                value={category.category_id} 
              />
            );
          })}
        </Tabs>
      </Box>

      <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
        {filteredLessons?.map((lesson) => {
          const category = categories?.find((c) => c.category_id === lesson.category_id);
          
          return (
            <Grid item xs={12} sm={6} md={4} key={lesson.lesson_id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: '1px solid',
                  borderColor: 'transparent',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
                    borderColor: getCategoryColor(lesson.category_id),
                  },
                }}
              >
                <Box
                  sx={{
                    height: 6,
                    background: `linear-gradient(90deg, ${getCategoryColor(lesson.category_id)}, ${alpha(getCategoryColor(lesson.category_id), 0.6)})`,
                    borderRadius: '12px 12px 0 0',
                  }}
                />
                <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 2.5 } }}>
                  <Box sx={{ mb: 1.5, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip
                      label={category?.name}
                      size="small"
                      sx={{
                        bgcolor: alpha(getCategoryColor(lesson.category_id), 0.1),
                        color: getCategoryColor(lesson.category_id),
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        height: 26,
                        border: `1px solid ${alpha(getCategoryColor(lesson.category_id), 0.2)}`,
                      }}
                    />
                    <Chip
                      label={lesson.difficulty}
                      size="small"
                      color={getDifficultyColor(lesson.difficulty) as any}
                      variant="outlined"
                      sx={{ 
                        fontSize: '0.75rem',
                        height: 26,
                        fontWeight: 600,
                      }}
                    />
                  </Box>

                  <Typography 
                    variant="h6" 
                    fontWeight="bold" 
                    gutterBottom
                    sx={{
                      fontSize: { xs: '1rem', sm: '1.125rem' },
                      lineHeight: 1.3,
                      mb: 1.5,
                      minHeight: { xs: 'auto', sm: '2.6em' },
                    }}
                  >
                    {lesson.title}
                  </Typography>

                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{ 
                      mb: 2,
                      fontSize: { xs: '0.8125rem', sm: '0.875rem' },
                      lineHeight: 1.5,
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
                      gap: 0.5,
                      px: 1.5,
                      py: 0.75,
                      bgcolor: alpha('#f5f5f5', 0.6),
                      borderRadius: 1.5,
                      width: 'fit-content',
                    }}
                  >
                    <TimerIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography 
                      variant="caption" 
                      color="text.secondary"
                      fontWeight={600}
                      sx={{ fontSize: '0.75rem' }}
                    >
                      {lesson.duration_min} dakika
                    </Typography>
                  </Box>
                </CardContent>

                <CardActions sx={{ p: { xs: 1.5, sm: 2 }, pt: 0 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<PlayIcon />}
                    onClick={() => navigate(`/lesson/${lesson.lesson_id}`)}
                    sx={{
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 700,
                      py: 1.25,
                      fontSize: { xs: '0.875rem', sm: '0.9375rem' },
                      boxShadow: 'none',
                      '&:hover': {
                        boxShadow: '0 4px 12px rgba(255, 201, 0, 0.4)',
                      },
                    }}
                  >
                    Derse Git
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {filteredLessons?.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            📚
          </Typography>
          <Typography variant="h6" color="text.secondary" fontWeight={500}>
            Bu kategoride henüz ders bulunmuyor
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Lessons;
