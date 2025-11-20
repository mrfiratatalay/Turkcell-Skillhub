import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Divider,
} from '@mui/material';
import {
  Timer as TimerIcon,
  Quiz as QuizIcon,
  ArrowBack as BackIcon,
} from '@mui/icons-material';
import { useLesson, useCategories } from '../hooks/useQueries';

const LessonDetail = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { data: lesson, isLoading } = useLesson(lessonId || '');
  const { data: categories } = useCategories();

  const category = categories?.find((c) => c.categoryId === lesson?.categoryId);

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

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!lesson) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          Ders bulunamadı
        </Typography>
        <Button onClick={() => navigate('/lessons')} sx={{ mt: 2 }}>
          Derslere Dön
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Button startIcon={<BackIcon />} onClick={() => navigate('/lessons')} sx={{ mb: 3 }}>
        Derslere Dön
      </Button>

      <Card>
        <CardContent>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Chip label={category?.name} color="primary" />
              <Chip
                label={lesson.difficulty}
                color={getDifficultyColor(lesson.difficulty) as any}
                variant="outlined"
              />
              <Chip
                icon={<TimerIcon />}
                label={`${lesson.durationMin} dakika`}
                variant="outlined"
              />
            </Box>

            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {lesson.title}
            </Typography>

            <Typography variant="body1" color="text.secondary" paragraph>
              {lesson.description}
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Video Player */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              📺 Ders Videosu
            </Typography>
            <Paper
              elevation={0}
              sx={{
                position: 'relative',
                paddingTop: '56.25%',
                bgcolor: 'grey.900',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <iframe
                src={lesson.videoUrl}
                title={lesson.title}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Paper>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Quiz Section */}
          <Box
            sx={{
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              p: 3,
              borderRadius: 2,
              textAlign: 'center',
            }}
          >
            <QuizIcon sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Videoyu izledin mi?
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Öğrendiklerini pekiştirmek için quiz'e başla ve puan kazan!
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<QuizIcon />}
              onClick={() => navigate(`/quiz/${lesson.lessonId}`)}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'grey.100',
                },
              }}
            >
              Quiz'e Başla
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LessonDetail;

