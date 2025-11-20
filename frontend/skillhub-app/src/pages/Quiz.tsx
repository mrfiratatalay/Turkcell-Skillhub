import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  CircularProgress,
  Paper,
  LinearProgress,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  ArrowForward as NextIcon,
  Check as CheckIcon,
} from '@mui/icons-material';
import { useQuiz, useSubmitQuiz, useLesson } from '../hooks/useQueries';
import { useAuth } from '../contexts/AuthContext';
import QuizResult from '../components/quiz/QuizResult';
import { showQuizComplete, showBadgeEarned, showLoading, dismissToast, showError } from '../utils/toast';

const Quiz = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: questions, isLoading } = useQuiz(lessonId || '');
  const { data: lesson } = useLesson(lessonId || '');
  const submitQuizMutation = useSubmitQuiz();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [quizResult, setQuizResult] = useState<any>(null);

  const currentQuestion = questions?.[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / (questions?.length || 1)) * 100;

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < (questions?.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    if (!user || !lessonId) return;

    const loadingToast = showLoading('Quiz değerlendiriliyor...');

    try {
      // Backend QuizSubmitRequest formatına uygun şekilde hazırla
      const answersArray = Object.entries(answers).map(([questionId, answer]) => ({
        questionId,
        answer,
      }));

      const result = await submitQuizMutation.mutateAsync({
        userId: user.userId,
        lessonId,
        answers: answersArray,
      });
      
      dismissToast(loadingToast);
      
      // Show success message
      showQuizComplete(result.score);
      
      // Show badge earned if any
      if (result.newBadges && result.newBadges.length > 0) {
        setTimeout(() => {
          result.newBadges.forEach((badge, index) => {
            setTimeout(() => {
              showBadgeEarned(badge.name);
            }, index * 500);
          });
        }, 1000);
      }
      
      setQuizResult(result);
      setShowResult(true);
    } catch (error) {
      dismissToast(loadingToast);
      showError('Quiz gönderilemedi. Lütfen tekrar deneyin.');
      console.error('Quiz submission failed:', error);
    }
  };

  const isAnswered = currentQuestion ? !!answers[currentQuestion.questionId] : false;
  const allAnswered = questions?.every((q) => !!answers[q.questionId]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary">
          Bu ders için henüz quiz bulunmuyor
        </Typography>
        <Button onClick={() => navigate(`/lesson/${lessonId}`)} sx={{ mt: 2 }}>
          Derse Dön
        </Button>
      </Box>
    );
  }

  if (showResult && quizResult) {
    return <QuizResult result={quizResult} lessonId={lessonId || ''} />;
  }

  return (
    <Box>
      <Button
        startIcon={<BackIcon />}
        onClick={() => navigate(`/lesson/${lessonId}`)}
        sx={{ mb: 3 }}
      >
        Derse Dön
      </Button>

      <Card>
        <CardContent>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              🎯 {lesson?.title} - Quiz
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Soru {currentQuestionIndex + 1} / {questions.length}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ mt: 2, height: 8, borderRadius: 4 }}
            />
          </Box>

          {currentQuestion && (
            <Paper sx={{ p: 4, bgcolor: 'grey.50', borderRadius: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {currentQuestion.questionText}
              </Typography>

              <FormControl component="fieldset" sx={{ width: '100%', mt: 3 }}>
                <RadioGroup
                  value={answers[currentQuestion.questionId] || ''}
                  onChange={(e) =>
                    handleAnswerChange(currentQuestion.questionId, e.target.value)
                  }
                >
                  {currentQuestion.options.map((option, index) => (
                    <Paper
                      key={index}
                      sx={{
                        mb: 1.5,
                        transition: 'all 0.3s',
                        '&:hover': {
                          boxShadow: 2,
                        },
                      }}
                    >
                      <FormControlLabel
                        value={option}
                        control={<Radio />}
                        label={option}
                        sx={{
                          m: 0,
                          p: 2,
                          width: '100%',
                          '& .MuiFormControlLabel-label': {
                            fontSize: '1rem',
                            fontWeight: 500,
                          },
                        }}
                      />
                    </Paper>
                  ))}
                </RadioGroup>
              </FormControl>
            </Paper>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              variant="outlined"
              startIcon={<BackIcon />}
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              Önceki
            </Button>

            <Box sx={{ display: 'flex', gap: 2 }}>
              {currentQuestionIndex < questions.length - 1 ? (
                <Button
                  variant="contained"
                  endIcon={<NextIcon />}
                  onClick={handleNext}
                  disabled={!isAnswered}
                >
                  Sonraki
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<CheckIcon />}
                  onClick={handleSubmit}
                  disabled={!allAnswered || submitQuizMutation.isPending}
                >
                  {submitQuizMutation.isPending ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Quiz\'i Bitir'
                  )}
                </Button>
              )}
            </Box>
          </Box>

          {!allAnswered && currentQuestionIndex === questions.length - 1 && (
            <Typography
              variant="caption"
              color="error"
              sx={{ display: 'block', textAlign: 'right', mt: 1 }}
            >
              Tüm soruları cevapladığından emin ol
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Quiz;

