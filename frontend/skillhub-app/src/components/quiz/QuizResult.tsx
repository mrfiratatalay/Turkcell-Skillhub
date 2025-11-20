import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Paper,
  Grid,
  Chip,
  Divider,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Home as HomeIcon,
  School as LessonsIcon,
  Celebration as CelebrationIcon,
} from '@mui/icons-material';

interface QuizResultProps {
  result: {
    score: number;
    correctCount: number;
    totalQuestions: number;
    earnedPoints: number;
    newBadges: Array<{
      badge_id: string;
      name: string;
      awarded_at: string;
    }>;
  };
  lessonId: string;
}

const QuizResult = ({ result, lessonId }: QuizResultProps) => {
  const navigate = useNavigate();
  const { score, correctCount, totalQuestions, earnedPoints, newBadges } = result;

  const getPerformanceMessage = () => {
    if (score >= 90) return { text: 'Mükemmel! 🎉', color: 'success.main' };
    if (score >= 80) return { text: 'Harika! ⭐', color: 'success.main' };
    if (score >= 70) return { text: 'İyi İş! 👍', color: 'primary.main' };
    if (score >= 60) return { text: 'Fena Değil! 💪', color: 'warning.main' };
    return { text: 'Tekrar Dene! 📚', color: 'error.main' };
  };

  const performanceMessage = getPerformanceMessage();

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Card
        sx={{
          textAlign: 'center',
          background: 'linear-gradient(135deg, #FFC900 0%, #FFD740 100%)',
          color: '#000',
        }}
      >
        <CardContent sx={{ py: 6 }}>
          <TrophyIcon sx={{ fontSize: 80, mb: 2 }} />
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Quiz Tamamlandı!
          </Typography>
          <Typography variant="h6">
            {performanceMessage.text}
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'background.paper' }}>
            <Typography variant="h2" fontWeight="bold" color={performanceMessage.color}>
              {score}%
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Başarı Oranı
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'background.paper' }}>
            <Typography variant="h2" fontWeight="bold" color="primary">
              +{earnedPoints}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Kazandığın Puan
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                📊 Quiz Özeti
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Toplam Soru
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {totalQuestions}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Doğru Cevap
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" color="success.main">
                    {correctCount}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Yanlış Cevap
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" color="error.main">
                    {totalQuestions - correctCount}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Kazanılan Puan
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" color="primary.main">
                    {earnedPoints}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {newBadges && newBadges.length > 0 && (
          <Grid item xs={12}>
            <Card
              sx={{
                background: 'linear-gradient(135deg, #2196F3 0%, #1565C0 100%)',
                color: 'white',
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CelebrationIcon sx={{ fontSize: 32, mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Yeni Rozet Kazandın!
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  {newBadges.map((badge) => (
                    <Chip
                      key={badge.badge_id}
                      label={badge.name}
                      icon={<TrophyIcon />}
                      sx={{
                        bgcolor: 'white',
                        color: 'primary.main',
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        p: 2,
                      }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<HomeIcon />}
          onClick={() => navigate('/dashboard')}
        >
          Dashboard'a Dön
        </Button>
        <Button
          fullWidth
          variant="contained"
          startIcon={<LessonsIcon />}
          onClick={() => navigate('/lessons')}
        >
          Diğer Derslere Geç
        </Button>
      </Box>
    </Box>
  );
};

export default QuizResult;

