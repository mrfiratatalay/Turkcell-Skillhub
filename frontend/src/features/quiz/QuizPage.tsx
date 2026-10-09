import CloseRounded from '@mui/icons-material/CloseRounded';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router';
import { glass } from '@/app/theme/tokens';
import { useDocumentTitle } from '@/shared/lib/useDocumentTitle';
import { AsyncView, SkeletonBlock } from '@/shared/ui/AsyncView';
import { NightSky } from '@/shared/ui/NightSky';
import { useQuiz, useSubmitAttempt } from './api';
import { QuestionStep } from './QuestionStep';
import { QuizResult } from './QuizResult';

/** Focus mode: no navigation chrome, just the question and the night sky. */
export default function QuizPage() {
  const { slug = '' } = useParams();
  const quiz = useQuiz(slug);
  const submit = useSubmitAttempt(slug);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [index, setIndex] = useState(0);
  useDocumentTitle(quiz.data ? `Quiz · ${quiz.data.lessonTitle}` : 'Quiz');

  const restart = () => {
    submit.reset();
    setAnswers({});
    setIndex(0);
    quiz.refetch();
  };

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative' }}>
      <NightSky rain={0.05} />
      <Box component="header" sx={{ position: 'sticky', top: 0, zIndex: 5, display: 'flex', alignItems: 'center', gap: 2,
        px: { xs: 2, md: 4 }, height: 68, background: 'rgba(1, 11, 75, 0.72)', backdropFilter: 'blur(14px)',
        boxShadow: `0 1px 0 ${glass.hairline}` }}>
        <Tooltip title="Quiz'den çık">
          <IconButton component={RouterLink} to={`/dersler/${slug}`} aria-label="Quiz'den çık">
            <CloseRounded />
          </IconButton>
        </Tooltip>
        <Typography sx={{ fontWeight: 700 }} noWrap>
          {quiz.data?.lessonTitle ?? 'Quiz'}
        </Typography>
      </Box>
      <Box component="main" sx={{ position: 'relative', zIndex: 1, maxWidth: 780, mx: 'auto', px: 2, py: { xs: 3, md: 6 } }}>
        {submit.data ? (
          <QuizResult result={submit.data} onRetry={restart} />
        ) : (
          <AsyncView query={quiz} skeleton={<SkeletonBlock height={420} />}>
            {(data) => (
              <>
                {submit.isError && <Alert severity="error" sx={{ mb: 2 }}>{submit.error.message}</Alert>}
                <QuestionStep
                  quiz={data}
                  index={index}
                  answers={answers}
                  submitting={submit.isPending}
                  onAnswer={(questionId, optionId) => setAnswers((prev) => ({ ...prev, [questionId]: optionId }))}
                  onIndexChange={setIndex}
                  onFinish={() => submit.mutate(answers)}
                />
              </>
            )}
          </AsyncView>
        )}
      </Box>
    </Box>
  );
}
