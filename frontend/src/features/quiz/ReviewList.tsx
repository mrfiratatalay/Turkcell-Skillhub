import CancelRounded from '@mui/icons-material/CancelRounded';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ink, signal } from '@/app/theme/tokens';
import type { ReviewItem } from './api';

/** Every answer explained, so a failed attempt still teaches something. */
export function ReviewList({ review }: { review: ReviewItem[] }) {
  return (
    <Box>
      {review.map((item, i) => (
        <Accordion key={item.questionId} defaultExpanded={!item.correct}>
          <AccordionSummary expandIcon={<ExpandMoreRounded />}>
            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
              {item.correct
                ? <CheckCircleRounded sx={{ color: signal.success }} />
                : <CancelRounded sx={{ color: signal.error }} />}
              <Typography sx={{ fontWeight: 600 }}>
                {i + 1}. {item.prompt}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ display: 'grid', gap: 1 }}>
            {item.options.map((option) => {
              const isCorrect = option.id === item.correctOptionId;
              const isWrongPick = option.id === item.selectedOptionId && !item.correct;
              return (
                <Box key={option.id} sx={{ px: 1.5, py: 1, borderRadius: '10px',
                  color: isCorrect ? signal.success : isWrongPick ? signal.error : ink.secondary,
                  background: isCorrect ? signal.successTint : isWrongPick ? signal.errorTint : 'transparent',
                  fontWeight: isCorrect || isWrongPick ? 700 : 400 }}>
                  {option.label}
                  {isCorrect && ' · doğru cevap'}
                  {isWrongPick && ' · senin cevabın'}
                </Box>
              );
            })}
            <Typography sx={{ mt: 1, color: ink.secondary }}>💡 {item.explanation}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
