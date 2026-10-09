import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRounded from '@mui/icons-material/ArrowForwardRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect } from 'react';
import { fonts, glow, gold, ink, neon, night } from '@/app/theme/tokens';
import type { Quiz } from './api';

const LETTERS = ['A', 'B', 'C', 'D'];

interface QuestionStepProps {
  quiz: Quiz;
  index: number;
  answers: Record<number, number>;
  submitting: boolean;
  onAnswer: (questionId: number, optionId: number) => void;
  onIndexChange: (index: number) => void;
  onFinish: () => void;
}

export function QuestionStep({ quiz, index, answers, submitting, onAnswer, onIndexChange, onFinish }: QuestionStepProps) {
  const reduceMotion = useReducedMotion();
  const question = quiz.questions[index];
  const isLast = index === quiz.questions.length - 1;
  const answered = answers[question.id] !== undefined;
  const allAnswered = quiz.questions.every((q) => answers[q.id] !== undefined);
  const next = () => (isLast ? allAnswered && onFinish() : answered && onIndexChange(index + 1));

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLElement && ['INPUT', 'TEXTAREA'].includes(event.target.tagName)) return;
      const key = event.key.toUpperCase();
      const choice = ['1', '2', '3', '4'].indexOf(key) >= 0 ? Number(key) - 1 : LETTERS.indexOf(key);
      if (choice >= 0 && question.options[choice]) onAnswer(question.id, question.options[choice].id);
      else if (event.key === 'Enter') next();
      else if (event.key === 'ArrowLeft' && index > 0) onIndexChange(index - 1);
      else if (event.key === 'ArrowRight' && answered && !isLast) onIndexChange(index + 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography sx={{ fontFamily: fonts.mono, color: neon[300], fontWeight: 700 }}>
          SORU {index + 1}/{quiz.questions.length}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }} aria-hidden>
          {quiz.questions.map((q, i) => (
            <Box key={q.id} sx={{ width: i === index ? 28 : 10, height: 10, borderRadius: 99, transition: 'all .25s',
              background: answers[q.id] !== undefined ? gold : 'rgba(172,227,253,.18)',
              boxShadow: i === index ? `0 0 0 2px ${neon[300]}` : 'none' }} />
          ))}
        </Box>
      </Box>
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={reduceMotion ? false : { opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, x: -40 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          <Card sx={{ p: { xs: 3, md: 4 } }}>
            <Typography id={`q-${question.id}`} variant="h5" component="h2" sx={{ fontSize: { xs: 21, md: 26 }, lineHeight: 1.35 }}>
              {question.prompt}
            </Typography>
            <Box role="radiogroup" aria-labelledby={`q-${question.id}`} sx={{ display: 'grid', gap: 1.5, mt: 3 }}>
              {question.options.map((option, i) => {
                const selected = answers[question.id] === option.id;
                return (
                  <ButtonBase
                    key={option.id}
                    role="radio"
                    aria-checked={selected}
                    onClick={() => onAnswer(question.id, option.id)}
                    sx={{
                      justifyContent: 'flex-start', gap: 2, p: 2, borderRadius: '16px', textAlign: 'left',
                      background: selected ? 'rgba(253,196,11,.10)' : 'rgba(1,13,60,.45)',
                      boxShadow: selected ? glow.gold : `0 0 0 1px rgba(92,163,238,.30)`,
                      transition: 'box-shadow .15s, background .15s, transform .1s',
                      '&:hover': { boxShadow: selected ? glow.gold : glow.neon },
                      '&:active': { transform: 'scale(.99)' },
                      '&:focus-visible': { outline: `3px solid ${gold}`, outlineOffset: 2 },
                    }}
                  >
                    <Box sx={{ width: 36, height: 36, flexShrink: 0, borderRadius: '11px', display: 'grid', placeItems: 'center',
                      fontWeight: 800, fontFamily: fonts.mono, background: selected ? gold : 'rgba(92,163,238,.16)',
                      color: selected ? night[900] : neon[100] }}>
                      {LETTERS[i]}
                    </Box>
                    <Typography sx={{ fontSize: 17, fontWeight: selected ? 700 : 500, color: selected ? '#fff' : ink.primary }}>
                      {option.label}
                    </Typography>
                  </ButtonBase>
                );
              })}
            </Box>
          </Card>
        </motion.div>
      </AnimatePresence>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, gap: 2 }}>
        <Button variant="outlined" startIcon={<ArrowBackRounded />} disabled={index === 0}
          onClick={() => onIndexChange(index - 1)}>
          Önceki
        </Button>
        <Typography variant="body2" sx={{ color: ink.muted, display: { xs: 'none', md: 'block' } }}>
          1–4 ile seç · Enter ile ilerle
        </Typography>
        <Button variant="contained" endIcon={!isLast && <ArrowForwardRounded />}
          disabled={isLast ? !allAnswered || submitting : !answered} onClick={next}>
          {isLast ? (submitting ? 'Puanlanıyor…' : 'Quiz’i bitir') : 'Sonraki'}
        </Button>
      </Box>
    </Box>
  );
}
