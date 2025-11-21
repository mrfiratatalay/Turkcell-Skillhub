import { Box, Card, CardContent, Typography, Button, alpha, Chip, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Psychology as AIIcon, TrendingUp as TrendingIcon, AutoAwesome as SparkleIcon } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { AIRecommendation, AIRecommendationEngine } from '../../utils/aiRecommendations';
import { getGeminiRecommendations, getMockRecommendations, GeminiRecommendation } from '../../services/geminiApi';
import { useAuth } from '../../contexts/AuthContext';
import { useLessons, useUserProgress } from '../../hooks/useQueries';

export const AIRecommendations = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: lessonsData } = useLessons();
  const { data: progressData } = useUserProgress(user?.userId || '');

  const [recommendations, setRecommendations] = useState<GeminiRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [useGemini, setUseGemini] = useState(true); // Gemini kullan mı?

  useEffect(() => {
    if (!user || !lessonsData || !progressData) {
      return;
    }

    const fetchRecommendations = async () => {
      setLoading(true);
      
      const completedLessonIds = progressData.recentQuizResults?.map((qr) => qr.lessonId) || [];
      const completedLessonsCount = progressData.completedLessons || 0;

      // Gemini API dene
      if (useGemini) {
        try {
          const geminiRecs = await getGeminiRecommendations(
            progressData,
            lessonsData.lessons || [],
            lessonsData.categories || [],
            completedLessonIds
          );
          setRecommendations(geminiRecs);
        } catch (error) {
          console.warn('Gemini API failed, falling back to mock recommendations:', error);
          // Fallback: Mock recommendations
          const mockRecs = getMockRecommendations(progressData, completedLessonsCount);
          setRecommendations(mockRecs);
          setUseGemini(false); // Gelecek isteklerde mock kullan
        }
      } else {
        // Mock recommendations
        const mockRecs = getMockRecommendations(progressData, completedLessonsCount);
        setRecommendations(mockRecs);
      }

      setLoading(false);
    };

    fetchRecommendations();
  }, [user, lessonsData, progressData, useGemini]);

  if (!user || !lessonsData || !progressData) {
    return null;
  }

  if (loading) {
    return (
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
          p: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ textAlign: 'center', color: '#FFF' }}>
          <CircularProgress size={40} sx={{ color: '#FFF', mb: 2 }} />
          <Typography variant="body1" fontWeight={600}>
            AI önerileri hazırlanıyor...
          </Typography>
        </Box>
      </Card>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  const handleRecommendationClick = (recommendation: GeminiRecommendation) => {
    // Basit navigasyon mantığı
    if (recommendation.type === 'lesson') {
      navigate('/lessons');
    } else if (recommendation.type === 'category') {
      navigate('/lessons');
    } else if (recommendation.type === 'skill') {
      navigate('/profile');
    } else {
      navigate('/lessons');
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
        position: 'relative',
        boxShadow: '0 12px 40px rgba(124, 58, 237, 0.3)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -100,
          right: -100,
          width: 250,
          height: 250,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha('#FFF', 0.2)}, transparent)`,
          animation: 'float 8s ease-in-out infinite',
        },
        '@keyframes float': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(-30px, 30px)' },
        },
      }}
    >
      <CardContent sx={{ p: { xs: 3, sm: 4 }, position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Box
            sx={{
              width: 50,
              height: 50,
              borderRadius: 3,
              background: alpha('#FFF', 0.25),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)',
              animation: 'pulse 2s ease-in-out infinite',
              '@keyframes pulse': {
                '0%, 100%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.05)' },
              },
            }}
          >
            <AIIcon sx={{ fontSize: 28, color: '#FFF' }} />
          </Box>
          <Box>
            <Typography variant="h5" fontWeight="900" sx={{ color: '#FFF', mb: 0.5 }}>
              AI Önerileri
            </Typography>
            <Chip
              icon={<SparkleIcon sx={{ fontSize: 14, color: '#7C3AED !important' }} />}
              label={useGemini ? 'Gemini AI' : 'Akıllı Öneri'}
              size="small"
              sx={{
                bgcolor: '#FFF',
                color: '#7C3AED',
                fontWeight: 800,
                fontSize: '0.7rem',
                height: 22,
              }}
            />
          </Box>
        </Box>

        {/* Recommendations */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {recommendations.map((rec, index) => {
            // Recommendation type'a göre emoji
            const getIcon = (type: string) => {
              switch (type) {
                case 'lesson':
                  return '📚';
                case 'category':
                  return '🎯';
                case 'skill':
                  return '⚡';
                case 'motivation':
                  return '🚀';
                default:
                  return '💡';
              }
            };

            return (
              <Card
                key={index}
                elevation={0}
                sx={{
                  background: alpha('#FFF', 0.15),
                  backdropFilter: 'blur(10px)',
                  borderRadius: 3,
                  border: `2px solid ${alpha('#FFF', 0.2)}`,
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    background: alpha('#FFF', 0.25),
                    border: `2px solid ${alpha('#FFF', 0.4)}`,
                    transform: 'translateX(4px)',
                  },
                }}
                onClick={() => handleRecommendationClick(rec)}
              >
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Typography sx={{ fontSize: '2rem', lineHeight: 1 }}>{getIcon(rec.type)}</Typography>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        variant="body1"
                        fontWeight="800"
                        sx={{ color: '#FFF', mb: 0.5, fontSize: '1rem' }}
                      >
                        {rec.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: alpha('#FFF', 0.9),
                          fontWeight: 500,
                          fontSize: '0.875rem',
                          mb: 1,
                        }}
                      >
                        {rec.description}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: alpha('#FFF', 0.7),
                          fontSize: '0.75rem',
                          fontStyle: 'italic',
                        }}
                      >
                        {rec.reason}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            );
          })}
        </Box>

        {/* Footer */}
        <Box
          sx={{
            mt: 3,
            pt: 2,
            borderTop: `1px solid ${alpha('#FFF', 0.2)}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: alpha('#FFF', 0.8),
              fontWeight: 600,
              fontSize: '0.75rem',
              textAlign: 'center',
            }}
          >
            💡 Bu öneriler senin beceri seviyene ve ilerleme durumuna göre özelleştirildi
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

