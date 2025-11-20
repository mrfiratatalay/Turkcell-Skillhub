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
  alpha,
  Chip,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  ArrowForward as NextIcon,
  Check as CheckIcon,
  Quiz as QuizIcon,
  LightbulbOutlined as LightbulbIcon,
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
      showQuizComplete(result.score);
      
      if (result.newBadges && result.newBadges.length > 0) {
        setTimeout(() => {
          result.newBadges.forEach((badge: any, index: number) => {
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
  const answeredCount = Object.keys(answers).length;

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!questions || questions.length === 0) {
    return (
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
          📝
        </Typography>
        <Typography variant="h5" color="text.primary" fontWeight={700} sx={{ mb: 1 }}>
          Quiz Yok
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Bu ders için henüz quiz bulunmuyor
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate(`/lesson/${lessonId}`)}
        >
          Derse Dön
        </Button>
      </Paper>
    );
  }

  if (showResult && quizResult) {
    return <QuizResult result={quizResult} lessonId={lessonId || ''} />;
  }

  return (
    <Box>
      {/* Back Button */}
      <Button
        variant="outlined"
        startIcon={<BackIcon />}
        onClick={() => navigate(`/lesson/${lessonId}`)}
        sx={{
          mb: 3,
          borderRadius: 2.5,
          borderWidth: 2,
          fontWeight: 600,
          '&:hover': {
            borderWidth: 2,
          },
        }}
      >
        Derse Dön
      </Button>

      {/* Quiz Card */}
      <Card
        elevation={0}
        sx={{
          borderRadius: 5,
          border: `2px solid ${alpha('#003D7A', 0.1)}`,
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #003D7A 0%, #1565C0 100%)',
            p: { xs: 3, sm: 4 },
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
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2.5,
                  background: 'linear-gradient(135deg, #FFC900 0%, #FFD740 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(255, 201, 0, 0.35)',
                  mr: 2,
                }}
              >
                <QuizIcon sx={{ fontSize: 28, color: '#000' }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="h5"
                  fontWeight="800"
                  sx={{ color: '#FFF', fontSize: { xs: '1.25rem', sm: '1.5rem' } }}
                >
                  {lesson?.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: alpha('#FFF', 0.9), fontWeight: 500, mt: 0.5 }}
                >
                  Quiz Zamanı! 🎯
            </Typography>
              </Box>
            </Box>

            {/* Progress Bar */}
            <Box sx={{ mt: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography
                  variant="body2"
                  fontWeight={700}
                  sx={{ color: alpha('#FFF', 0.95) }}
                >
              Soru {currentQuestionIndex + 1} / {questions.length}
            </Typography>
                <Typography
                  variant="body2"
                  fontWeight={700}
                  sx={{ color: '#FFC900' }}
                >
                  {answeredCount} / {questions.length} cevaplandı
                </Typography>
              </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  bgcolor: alpha('#FFF', 0.2),
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 5,
                    background: 'linear-gradient(90deg, #FFC900 0%, #FFD740 100%)',
                  },
                }}
            />
            </Box>
          </Box>
          </Box>

        {/* Question Content */}
        <CardContent sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
          {currentQuestion && (
            <Box>
              {/* Question Box */}
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, sm: 4 },
                  mb: 4,
                  bgcolor: alpha('#FFC900', 0.08),
                  border: `2px solid ${alpha('#FFC900', 0.2)}`,
                  borderRadius: 4,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #FFC900 0%, #FFD740 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      boxShadow: '0 4px 12px rgba(255, 201, 0, 0.3)',
                    }}
                  >
                    <LightbulbIcon sx={{ fontSize: 24, color: '#000' }} />
                  </Box>
                  <Typography
                    variant="h6"
                    fontWeight="700"
                    sx={{
                      color: 'text.primary',
                      fontSize: { xs: '1.05rem', sm: '1.2rem' },
                      lineHeight: 1.5,
                      flex: 1,
                    }}
                  >
                    {currentQuestion.questionText}
              </Typography>
                </Box>
              </Paper>

              {/* Options */}
              <FormControl component="fieldset" sx={{ width: '100%' }}>
                <RadioGroup
                  value={answers[currentQuestion.questionId] || ''}
                  onChange={(e) =>
                    handleAnswerChange(currentQuestion.questionId, e.target.value)
                  }
                >
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = answers[currentQuestion.questionId] === option;
                    const optionLabels = ['A', 'B', 'C', 'D'];

                    return (
                    <Paper
                      key={index}
                        elevation={0}
                      sx={{
                          mb: 2,
                          border: `2px solid ${isSelected ? '#003D7A' : alpha('#000', 0.1)}`,
                          borderRadius: 3,
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          bgcolor: isSelected ? alpha('#003D7A', 0.05) : '#FFF',
                          cursor: 'pointer',
                        '&:hover': {
                            borderColor: isSelected ? '#003D7A' : alpha('#FFC900', 0.5),
                            transform: 'translateX(4px)',
                            boxShadow: `0 4px 16px ${alpha(isSelected ? '#003D7A' : '#FFC900', 0.15)}`,
                        },
                      }}
                    >
                      <FormControlLabel
                        value={option}
                          control={
                            <Radio
                              sx={{
                                color: alpha('#000', 0.3),
                                '&.Mui-checked': {
                                  color: '#003D7A',
                                },
                              }}
                            />
                          }
                          label={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 0.5 }}>
                              <Chip
                                label={optionLabels[index]}
                                size="small"
                                sx={{
                                  bgcolor: isSelected ? '#003D7A' : alpha('#000', 0.08),
                                  color: isSelected ? '#FFC900' : 'text.secondary',
                                  fontWeight: 700,
                                  fontSize: '0.875rem',
                                  width: 32,
                                  height: 32,
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: { xs: '0.95rem', sm: '1rem' },
                                  fontWeight: isSelected ? 600 : 500,
                                  color: isSelected ? 'text.primary' : 'text.secondary',
                                }}
                              >
                                {option}
                              </Typography>
                            </Box>
                          }
                        sx={{
                          m: 0,
                          p: 2,
                          width: '100%',
                          '& .MuiFormControlLabel-label': {
                              width: '100%',
                          },
                        }}
                      />
                    </Paper>
                    );
                  })}
                </RadioGroup>
              </FormControl>
            </Box>
          )}

          {/* Navigation Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5, gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<BackIcon />}
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              sx={{
                borderRadius: 2.5,
                px: 3,
                py: 1.5,
                fontWeight: 600,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                },
              }}
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
                  sx={{
                    borderRadius: 2.5,
                    px: 4,
                    py: 1.5,
                    fontWeight: 700,
                    background: isAnswered
                      ? 'linear-gradient(135deg, #FFC900 0%, #FFD740 100%)'
                      : undefined,
                    color: isAnswered ? '#000' : undefined,
                    boxShadow: isAnswered ? '0 4px 12px rgba(255, 201, 0, 0.3)' : 'none',
                    '&:hover': {
                      background: isAnswered
                        ? 'linear-gradient(135deg, #FFD740 0%, #FFC900 100%)'
                        : undefined,
                    },
                  }}
                >
                  Sonraki
                </Button>
              ) : (
                <Button
                  variant="contained"
                  startIcon={<CheckIcon />}
                  onClick={handleSubmit}
                  disabled={!allAnswered || submitQuizMutation.isPending}
                  sx={{
                    borderRadius: 2.5,
                    px: 4,
                    py: 1.5,
                    fontWeight: 700,
                    background: allAnswered
                      ? 'linear-gradient(135deg, #10B981 0%, #34D399 100%)'
                      : undefined,
                    boxShadow: allAnswered ? '0 4px 12px rgba(16, 185, 129, 0.3)' : 'none',
                    '&:hover': {
                      background: allAnswered
                        ? 'linear-gradient(135deg, #34D399 0%, #10B981 100%)'
                        : undefined,
                    },
                  }}
                >
                  {submitQuizMutation.isPending ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Quiz'i Bitir"
                  )}
                </Button>
              )}
            </Box>
          </Box>

          {/* Warning Message */}
          {!allAnswered && currentQuestionIndex === questions.length - 1 && (
            <Paper
              elevation={0}
              sx={{
                mt: 3,
                p: 2,
                background: alpha('#EF4444', 0.08),
                border: `1px solid ${alpha('#EF4444', 0.2)}`,
                borderRadius: 2,
              }}
            >
            <Typography
                variant="body2"
                fontWeight={600}
                sx={{ color: '#EF4444', textAlign: 'center' }}
            >
                ⚠️ Tüm soruları cevapladığından emin ol ({answeredCount}/{questions.length})
            </Typography>
            </Paper>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Quiz;
