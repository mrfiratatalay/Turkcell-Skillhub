import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
  alpha,
  CircularProgress,
  Chip,
  Alert,
} from '@mui/material';
import {
  Psychology as BrainIcon,
  AutoAwesome as SparklesIcon,
  Send as SendIcon,
  TipsAndUpdates as IdeaIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useUserProgress, useLessons } from '../hooks/useQueries';
import { getAIRecommendations, getMockRecommendations } from '../services/geminiApi';
import { GeminiRecommendation } from '../services/geminiApi';

const AIAssistant = () => {
  const { user } = useAuth();
  const { data: userProgress, isLoading: progressLoading } = useUserProgress(user?.userId || '');
  const { data: lessons, isLoading: lessonsLoading } = useLessons();

  const [recommendations, setRecommendations] = useState<GeminiRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUsingGemini, setIsUsingGemini] = useState(false);

  // Debug: API key kontrolü
  console.log('🔑 VITE_GEMINI_API_KEY:', import.meta.env.VITE_GEMINI_API_KEY ? 'Mevcut' : 'YOK!');
  console.log('📊 User Progress:', progressLoading ? 'Yükleniyor...' : userProgress ? 'Hazır' : 'Yok');
  console.log('📚 Lessons:', lessonsLoading ? 'Yükleniyor...' : lessons ? `Hazır (${lessons.length} ders)` : 'Yok');

  const handleGetRecommendations = async () => {
    if (!userProgress || !lessons) {
      setError('Kullanıcı verisi yükleniyor, lütfen bekleyin...');
      return;
    }

    console.log('🤖 AI Öneri işlemi başlatılıyor...');
    setLoading(true);
    setError(null);
    setRecommendations([]);

    // Minimum loading süresi (kullanıcı görsün diye)
    const minLoadingTime = new Promise(resolve => setTimeout(resolve, 1000));

    try {
      // Gemini API'yi dene
      console.log('📡 Gemini API çağrılıyor...');
      const geminiRecs = await getAIRecommendations(userProgress, lessons);
      
      // Minimum loading süresini bekle
      await minLoadingTime;
      
      console.log('✅ Gemini başarılı:', geminiRecs);
      setRecommendations(geminiRecs);
      setIsUsingGemini(true);
    } catch (err) {
      console.error('❌ Gemini başarısız, fallback kullanılıyor:', err);
      
      // Minimum loading süresini bekle
      await minLoadingTime;
      
      // Fallback: Mock öneriler
      const mockRecs = getMockRecommendations(userProgress, userProgress.completedLessons);
      console.log('💡 Fallback öneriler:', mockRecs);
      setRecommendations(mockRecs);
      setIsUsingGemini(false);
      setError('AI servisi geçici olarak kullanılamıyor. Akıllı öneriler gösteriliyor.');
    } finally {
      setLoading(false);
      console.log('🏁 AI Öneri işlemi tamamlandı');
    }
  };

  const getPriorityColor = (priority: number) => {
    if (priority >= 5) return '#EF4444';
    if (priority >= 4) return '#F59E0B';
    if (priority >= 3) return '#3B82F6';
    return '#10B981';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'motivation':
        return '🔥';
      case 'lesson':
        return '📚';
      case 'category':
        return '🎯';
      case 'skill':
        return '⚡';
      default:
        return '💡';
    }
  };

  return (
    <Box sx={{ pb: 4 }}>
      {/* Hero Section */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 5 },
          mb: 4,
          borderRadius: 5,
          background: 'linear-gradient(135deg, #7C3AED 0%, #9333EA 50%, #C026D3 100%)',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            right: '-20%',
            width: '60%',
            height: '200%',
            background: `radial-gradient(circle at center, ${alpha('#FFF', 0.15)}, transparent)`,
            pointerEvents: 'none',
          },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Box
              sx={{
                width: { xs: 50, sm: 60 },
                height: { xs: 50, sm: 60 },
                borderRadius: 3,
                background: alpha('#FFF', 0.2),
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              }}
            >
              <BrainIcon sx={{ fontSize: { xs: 30, sm: 36 }, color: '#FFF' }} />
            </Box>
            <Box>
              <Typography
                variant="h3"
                fontWeight="800"
                sx={{
                  color: '#FFF',
                  fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.5rem' },
                  textShadow: '0 2px 20px rgba(0,0,0,0.2)',
                }}
              >
                AI Asistan 🤖
              </Typography>
              <Chip
                icon={<SparklesIcon sx={{ fontSize: 16, color: '#7C3AED !important' }} />}
                label={isUsingGemini ? 'Powered by Gemini AI' : 'Akıllı Öneri Sistemi'}
                size="small"
                sx={{
                  mt: 1,
                  bgcolor: alpha('#FFF', 0.95),
                  color: '#7C3AED',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                }}
              />
            </Box>
          </Box>

          <Typography
            variant="h6"
            sx={{
              color: alpha('#FFF', 0.95),
              fontWeight: 500,
              fontSize: { xs: '0.95rem', sm: '1.1rem' },
              maxWidth: 700,
            }}
          >
            Kişiselleştirilmiş öğrenme önerileri almak için AI asistanını kullan! 🚀
          </Typography>
        </Box>
      </Paper>

      {/* Main Content */}
      <Box sx={{ maxWidth: 900, mx: 'auto' }}>
        {/* Info Card */}
        {recommendations.length === 0 && !loading && (
          <Paper
            elevation={0}
            sx={{
              p: 4,
              mb: 3,
              borderRadius: 4,
              border: `1px solid ${alpha('#7C3AED', 0.15)}`,
              bgcolor: alpha('#7C3AED', 0.02),
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <IdeaIcon
                sx={{
                  fontSize: 64,
                  color: '#7C3AED',
                  mb: 2,
                  opacity: 0.8,
                }}
              />
              <Typography variant="h5" fontWeight="700" gutterBottom color="text.primary">
                AI Destekli Kişisel Öneriler
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 600, mx: 'auto' }}>
                Öğrenme geçmişin, seviyenve başarı oranına göre sana özel oluşturulmuş önerileri görmek için
                butona tıkla!
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  justifyContent: 'center',
                  mt: 3,
                  mb: 3,
                }}
              >
                <Chip label="🎯 Kişiselleştirilmiş" sx={{ fontWeight: 600 }} />
                <Chip label="📊 Veri Bazlı" sx={{ fontWeight: 600 }} />
                <Chip label="🚀 Motivasyon Artırıcı" sx={{ fontWeight: 600 }} />
                <Chip label="💡 Akıllı Strateji" sx={{ fontWeight: 600 }} />
              </Box>

              <Button
                variant="contained"
                size="large"
                startIcon={<SendIcon />}
                onClick={handleGetRecommendations}
                disabled={!userProgress || !lessons || progressLoading || lessonsLoading}
                sx={{
                  mt: 2,
                  py: 1.5,
                  px: 4,
                  borderRadius: 3,
                  fontSize: '1rem',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #7C3AED 0%, #9333EA 100%)',
                  boxShadow: '0 8px 24px rgba(124, 58, 237, 0.35)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #6D28D9 0%, #7C3AED 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 32px rgba(124, 58, 237, 0.45)',
                  },
                  '&:disabled': {
                    background: 'linear-gradient(135deg, #9CA3AF 0%, #6B7280 100%)',
                    color: '#FFF',
                    opacity: 0.6,
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {progressLoading || lessonsLoading ? 'Yükleniyor...' : 'Öneri Al'}
              </Button>
              
              {(progressLoading || lessonsLoading) && (
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Veriler hazırlanıyor, lütfen bekleyin...
                </Typography>
              )}
            </Box>
          </Paper>
        )}

        {/* Error Alert */}
        {error && (
          <Alert severity="warning" sx={{ mb: 3, borderRadius: 3 }}>
            {error}
          </Alert>
        )}

        {/* Loading State */}
        {loading && (
          <Paper
            elevation={0}
            sx={{
              p: 5,
              borderRadius: 4,
              textAlign: 'center',
              border: `1px solid ${alpha('#000', 0.08)}`,
            }}
          >
            <CircularProgress size={60} thickness={4} sx={{ color: '#7C3AED', mb: 3 }} />
            <Typography variant="h6" fontWeight="600" color="text.primary" gutterBottom>
              AI düşünüyor... 🧠
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Senin için en iyi önerileri hazırlıyorum
            </Typography>
          </Paper>
        )}

        {/* Recommendations List */}
        {recommendations.length > 0 && !loading && (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" fontWeight="700" color="text.primary">
                Öneriler ({recommendations.length})
              </Typography>
              <Button
                variant="outlined"
                size="small"
                startIcon={<SendIcon />}
                onClick={handleGetRecommendations}
                sx={{
                  borderRadius: 2,
                  borderColor: alpha('#7C3AED', 0.3),
                  color: '#7C3AED',
                  '&:hover': {
                    borderColor: '#7C3AED',
                    bgcolor: alpha('#7C3AED', 0.05),
                  },
                }}
              >
                Yenile
              </Button>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {recommendations.map((rec, index) => (
                <Card
                  key={index}
                  elevation={0}
                  sx={{
                    borderRadius: 4,
                    border: `2px solid ${alpha(getPriorityColor(rec.priority), 0.2)}`,
                    bgcolor: alpha(getPriorityColor(rec.priority), 0.02),
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateX(8px)',
                      boxShadow: `0 8px 24px ${alpha(getPriorityColor(rec.priority), 0.15)}`,
                      borderColor: alpha(getPriorityColor(rec.priority), 0.4),
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      {/* Icon */}
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: 2.5,
                          bgcolor: alpha(getPriorityColor(rec.priority), 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.5rem',
                          flexShrink: 0,
                        }}
                      >
                        {getTypeIcon(rec.type)}
                      </Box>

                      {/* Content */}
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                          <Typography variant="h6" fontWeight="700" color="text.primary">
                            {rec.title}
                          </Typography>
                          <Chip
                            label={`Öncelik: ${rec.priority}`}
                            size="small"
                            sx={{
                              bgcolor: getPriorityColor(rec.priority),
                              color: '#FFF',
                              fontWeight: 600,
                              fontSize: '0.7rem',
                              height: 22,
                            }}
                          />
                        </Box>

                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{ mb: 1.5, lineHeight: 1.6 }}
                        >
                          {rec.description}
                        </Typography>

                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            p: 1.5,
                            borderRadius: 2,
                            bgcolor: alpha('#000', 0.02),
                            border: `1px solid ${alpha('#000', 0.06)}`,
                          }}
                        >
                          <SparklesIcon sx={{ fontSize: 18, color: getPriorityColor(rec.priority) }} />
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontStyle: 'italic', fontSize: '0.875rem' }}
                          >
                            {rec.reason}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AIAssistant;

