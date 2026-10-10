import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { LineChart, lineClasses } from '@mui/x-charts/LineChart';
import { gold, ink, line } from '@/app/theme/tokens';
import { AsyncView, SkeletonBlock } from '@/shared/ui/AsyncView';
import { useXpHistory } from './api';

const dayFormat = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'short' });

/** Cumulative XP over the last 30 days: the night clock's journey as a curve. */
export function XpChart() {
  const history = useXpHistory(30);
  return (
    <AsyncView query={history} skeleton={<SkeletonBlock height={280} />}>
      {(data) => (
        <Card sx={{ p: { xs: 1.5, sm: 2.5 } }}>
          <Typography variant="body2" color="text.secondary" sx={{ px: 1 }}>
            Son 30 günde {data.reduce((sum, d) => sum + d.xp, 0)} XP kazandın
          </Typography>
          <Box sx={{ minWidth: 0, overflow: 'hidden' }}>
          <LineChart
            height={260}
            xAxis={[{
              data: data.map((d) => new Date(d.date)),
              scaleType: 'time',
              valueFormatter: (value: Date) => dayFormat.format(value),
            }]}
            series={[{
              data: data.map((d) => d.cumulativeXp),
              area: true,
              showMark: false,
              curve: 'monotoneX',
              color: gold,
              label: 'Toplam XP',
            }]}
            grid={{ horizontal: true }}
            hideLegend
            sx={{
              [`& .${lineClasses.area}`]: { fill: 'url(#xp-area-gradient)' },
              [`& .${lineClasses.line}`]: { strokeWidth: 3 },
              '& .MuiChartsAxis-line, & .MuiChartsAxis-tick': { stroke: line.strong },
              '& .MuiChartsAxis-tickLabel': { fill: ink.secondary },
              '& .MuiChartsGrid-line': { stroke: line.default },
            }}
          >
            <defs>
              <linearGradient id="xp-area-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={gold} stopOpacity={0.28} />
                <stop offset="100%" stopColor={gold} stopOpacity={0} />
              </linearGradient>
            </defs>
          </LineChart>
          </Box>
        </Card>
      )}
    </AsyncView>
  );
}
