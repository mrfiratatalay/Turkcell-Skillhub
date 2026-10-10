import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { ReactNode } from 'react';
import { useDocumentTitle } from '@/shared/lib/useDocumentTitle';
import { highlightSx } from './highlight';

interface PageHeaderProps {
  title: string;
  /** Word(s) of the title rendered in Code Night gold (a gold marker stroke by day). */
  highlight?: string;
  subtitle?: ReactNode;
  eyebrow?: ReactNode;
  actions?: ReactNode;
}

export function PageHeader({ title, highlight, subtitle, eyebrow, actions }: PageHeaderProps) {
  useDocumentTitle(highlight ? `${title} ${highlight}` : title);
  return (
    <Box
      component="header"
      sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 2, mb: 4 }}
    >
      <Box sx={{ minWidth: 0 }}>
        {eyebrow && <Box sx={{ mb: 1.5 }}>{eyebrow}</Box>}
        <Typography variant="h3" component="h1" sx={{ fontSize: { xs: 32, md: 44 } }}>
          {title}{' '}
          {highlight && (
            <Box component="span" sx={highlightSx}>
              {highlight}
            </Box>
          )}
        </Typography>
        {subtitle && (
          <Typography variant="subtitle1" sx={{ mt: 1, maxWidth: 680 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {actions && <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>{actions}</Box>}
    </Box>
  );
}
