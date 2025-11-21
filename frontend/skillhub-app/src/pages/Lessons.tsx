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
} from '@mui/material';
import {
  Timer as TimerIcon,
  PlayArrow as PlayIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import { useCategories, useLessons } from '../hooks/useQueries';
import { LessonsListSkeleton } from '../components/LoadingSkeletons';
import { getLessonDescription } from '../utils/lessonDescriptions';

const Lessons = () => {
  const navigate = useNavigate();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: lessons, isLoading: lessonsLoading } = useLessons();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredLessons =
    selectedCategory === 'all'
      ? lessons
      : lessons?.filter((lesson) => lesson.categoryId === selectedCategory);

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
          <SchoolIcon sx={{ fontSize: 28, color: '#003D7A' }} />
          <Typography
            variant="h4"
            fontWeight="700"
            sx={{
              color: '#1A1A1A',
              fontSize: { xs: '1.5rem', sm: '1.75rem' },
            }}
          >
            Eğitim Kataloğu
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
          {lessons?.length || 0} ders • {categories?.length || 0} kategori
        </Typography>
      </Box>

      {/* MINIMAL FILTER BAR */}
      <Box
        sx={{
          bgcolor: '#FFF',
          p: 2,
          mb: 3,
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        }}
      >
        <Tabs
          value={selectedCategory}
          onChange={(_, newValue) => setSelectedCategory(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            minHeight: 'auto',
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.875rem',
              minHeight: 'auto',
              py: 1.25,
              px: 2,
              color: '#64748B',
              transition: 'all 0.2s ease',
              minWidth: 'auto',
            },
            '& .Mui-selected': {
              color: '#003D7A',
            },
            '& .MuiTabs-indicator': {
              height: 2,
              backgroundColor: '#003D7A',
            },
          }}
        >
          <Tab label="Tümü" value="all" />
          {categories?.map((category) => (
            <Tab 
              key={category.categoryId}
              label={category.name}
              value={category.categoryId}
            />
          ))}
        </Tabs>
      </Box>

      {/* PROFESSIONAL LESSONS GRID - FIXED SIZE CARDS */}
      <Grid container spacing={3}>
        {filteredLessons?.map((lesson) => {
          const category = categories?.find((c) => c.categoryId === lesson.categoryId);
          
          return (
            <Grid item xs={12} md={6} key={lesson.lessonId}>
              <Card
                elevation={0}
                sx={{
                  width: '100%',
                  height: 'auto', // ✅ İçeriğe göre ayarla!
                  minHeight: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  bgcolor: '#FFF',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                {/* Üst Kısım: Etiketler + Başlık + Description + Süre */}
                <CardContent sx={{ p: 2.5, pb: 1 }}> {/* Minimal bottom padding */}
                  {/* Etiketler - Tek Satır */}
                  <Box sx={{ mb: 1, display: 'flex', gap: 0.75, height: 22, overflow: 'hidden' }}> {/* mb azaltıldı */}
                    <Chip
                      label={category?.name}
                      size="small"
                      sx={{
                        bgcolor: alpha(getCategoryColor(lesson.categoryId), 0.1),
                        color: getCategoryColor(lesson.categoryId),
                        fontWeight: 600,
                        fontSize: '0.6875rem',
                        height: 22,
                        borderRadius: '6px',
                        '& .MuiChip-label': { px: 1 },
                      }}
                    />
                    <Chip
                      label={lesson.difficulty}
                      size="small"
                      sx={{
                        bgcolor: '#F1F5F9',
                        color: '#64748B',
                        fontWeight: 600,
                        fontSize: '0.6875rem',
                        height: 22,
                        borderRadius: '6px',
                        '& .MuiChip-label': { px: 1 },
                      }}
                    />
                  </Box>

                  {/* Başlık - Max 2 Satır, Sabit Yükseklik */}
                  <Typography 
                    variant="h6" 
                    fontWeight="700"
                    sx={{
                      fontSize: '1rem',
                      lineHeight: 1.4,
                      mb: 1, // Azaltıldı
                      color: '#1A1A1A',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      height: '2.8em',
                    }}
                  >
                    {lesson.title}
                  </Typography>

                  {/* Description Preview - Uzun */}
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '0.875rem',
                      lineHeight: 1.6,
                      mb: 1, // Minimal margin
                      color: '#64748B',
                      display: '-webkit-box',
                      WebkitLineClamp: 3, // Max 3 satır (uzun açıklama)
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      height: '4.2em', // 3 satır için (1.6 * 3 = 4.8em ama biraz kısalttık)
                    }}
                  >
                    {getLessonDescription(lesson.lessonId)}
                  </Typography>

                  {/* Süre */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <TimerIcon sx={{ fontSize: 16, color: '#64748B' }} />
                    <Typography 
                      variant="caption" 
                      fontWeight={600}
                      sx={{ fontSize: '0.8125rem', color: '#64748B' }}
                    >
                      {lesson.durationMin} dakika
                    </Typography>
                  </Box>
                </CardContent>

                {/* Alt Kısım: Buton */}
                <CardActions sx={{ px: 2.5, pb: 2, pt: 1 }}> {/* mt:'auto' kaldırıldı - gap yok artık! */}
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<PlayIcon sx={{ fontSize: 18 }} />}
                    onClick={() => navigate(`/lesson/${lesson.lessonId}`)}
                    sx={{
                      borderRadius: '8px',
                      fontWeight: 700,
                      py: 1.25,
                      fontSize: '0.875rem',
                      bgcolor: getCategoryColor(lesson.categoryId),
                      textTransform: 'none',
                      boxShadow: 'none',
                      '&:hover': {
                        bgcolor: getCategoryColor(lesson.categoryId),
                        opacity: 0.9,
                        boxShadow: 'none',
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
        <Card
          elevation={0}
          sx={{
            textAlign: 'center',
            py: 8,
            borderRadius: '12px',
            border: '2px dashed #E2E8F0',
            bgcolor: '#FFF',
          }}
        >
          <Typography variant="h2" sx={{ mb: 2, fontSize: '3rem' }}>
            📚
          </Typography>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 1, color: '#1A1A1A' }}>
            Henüz ders yok
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748B' }}>
            Bu kategoride henüz ders bulunmuyor
          </Typography>
        </Card>
      )}
    </Box>
  );
};

export default Lessons;
