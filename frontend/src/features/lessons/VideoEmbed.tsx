import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Chip from '@mui/material/Chip';
import { useState } from 'react';
import { gold, ink, line, shadow, surface } from '@/app/theme/tokens';

/**
 * Click-to-load YouTube player on the privacy-enhanced domain: until the learner chooses to watch,
 * only the static thumbnail image loads (no player scripts, no cookies).
 */
export function VideoEmbed({ videoId, title }: { videoId: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <Box sx={{ position: 'relative', aspectRatio: '16 / 9', borderRadius: '18px', overflow: 'hidden',
      border: `1px solid ${line.default}`, background: surface.sidebar }}>
      {playing ? (
        <Box
          component="iframe"
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
        />
      ) : (
        <ButtonBase
          onClick={() => setPlaying(true)}
          aria-label={`Videoyu oynat: ${title}`}
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(180deg, rgba(13,18,34,.1), rgba(13,18,34,.6)),
              url(https://i.ytimg.com/vi/${videoId}/hqdefault.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            '&:hover .play': { transform: 'scale(1.08)' },
          }}
        >
          <Box className="play" sx={{ width: 76, height: 76, borderRadius: '50%', display: 'grid', placeItems: 'center',
            background: gold, color: surface.canvas, boxShadow: shadow.goldButtonHover, transition: 'transform .2s' }}>
            <PlayArrowRounded sx={{ fontSize: 44 }} />
          </Box>
          <Chip label="İngilizce kaynak" size="small"
            sx={{ position: 'absolute', top: 14, left: 14, background: 'rgba(13,18,34,.8)', color: ink.primary }} />
        </ButtonBase>
      )}
    </Box>
  );
}
