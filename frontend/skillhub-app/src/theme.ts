import { createTheme, alpha } from '@mui/material/styles';

// 🎨 PROFESSIONAL TURKCELL SKILLHUB THEME
// Modern, Responsive, Attractive Design System

declare module '@mui/material/styles' {
  interface Palette {
    gradient: {
      primary: string;
      secondary: string;
      success: string;
      info: string;
      dark: string;
      light: string;
    };
  }
  interface PaletteOptions {
    gradient?: {
      primary: string;
      secondary: string;
      success: string;
      info: string;
      dark: string;
      light: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    // Turkcell Brand Colors
    primary: {
      main: '#FFC900', // Turkcell Yellow
      light: '#FFD740',
      dark: '#FFA000',
      contrastText: '#000000',
    },
    secondary: {
      main: '#003D7A', // Turkcell Blue
      light: '#1565C0',
      dark: '#001F3F',
      contrastText: '#FFFFFF',
    },
    success: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
    },
    error: {
      main: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
    },
    warning: {
      main: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706',
    },
    info: {
      main: '#3B82F6',
      light: '#60A5FA',
      dark: '#2563EB',
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1E293B',
      secondary: '#64748B',
      disabled: '#CBD5E1',
    },
    divider: alpha('#64748B', 0.12),
    // Custom Gradients
    gradient: {
      primary: 'linear-gradient(135deg, #FFC900 0%, #FFD740 100%)',
      secondary: 'linear-gradient(135deg, #003D7A 0%, #1565C0 100%)',
      success: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
      info: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
      dark: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
      light: 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)',
    },
  },
  
  // 🔤 Typography System - Inter Font
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 800,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.5,
      textTransform: 'none',
      letterSpacing: '0.02em',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      lineHeight: 1.5,
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
  },
  
  // 🎭 Shape System
  shape: {
    borderRadius: 16,
  },
  
  // 🎬 Custom Shadows
  shadows: [
    'none',
    '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    // Glassmorphism shadows
    '0 8px 32px 0 rgba(0, 61, 122, 0.15)',
    '0 8px 32px 0 rgba(255, 201, 0, 0.15)',
    // Elevated shadows
    '0 4px 16px rgba(0, 0, 0, 0.08)',
    '0 8px 24px rgba(0, 0, 0, 0.12)',
    '0 12px 32px rgba(0, 0, 0, 0.16)',
    '0 16px 48px rgba(0, 0, 0, 0.20)',
    // Colored shadows
    '0 8px 24px rgba(255, 201, 0, 0.25)',
    '0 8px 24px rgba(0, 61, 122, 0.25)',
    '0 8px 24px rgba(16, 185, 129, 0.25)',
    '0 8px 24px rgba(59, 130, 246, 0.25)',
    // Extra
    '0 20px 60px rgba(0, 0, 0, 0.3)',
    '0 24px 64px rgba(0, 0, 0, 0.35)',
    '0 32px 72px rgba(0, 0, 0, 0.40)',
    '0 40px 80px rgba(0, 0, 0, 0.45)',
    '0 48px 96px rgba(0, 0, 0, 0.50)',
    '0 56px 112px rgba(0, 0, 0, 0.55)',
    '0 64px 128px rgba(0, 0, 0, 0.60)',
    '0 72px 144px rgba(0, 0, 0, 0.65)',
  ],
  
  // 🎨 Component Overrides
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 28px',
          fontSize: '0.9375rem',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
            backgroundColor: alpha('#FFC900', 0.08),
          },
        },
        sizeLarge: {
          padding: '14px 32px',
          fontSize: '1rem',
        },
        sizeSmall: {
          padding: '8px 20px',
          fontSize: '0.875rem',
        },
      },
    },
    
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          border: '1px solid rgba(0, 0, 0, 0.04)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: 16,
        },
        elevation1: {
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        },
        elevation2: {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
        elevation3: {
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
        elevation4: {
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
      },
    },
    
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: 600,
          fontSize: '0.8125rem',
          height: 32,
        },
        filled: {
          backgroundColor: alpha('#003D7A', 0.1),
          color: '#003D7A',
          '&:hover': {
            backgroundColor: alpha('#003D7A', 0.15),
          },
        },
      },
    },
    
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: '#FFFFFF',
            transition: 'all 0.3s ease',
            '&:hover': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#FFC900',
                borderWidth: 2,
              },
            },
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#FFC900',
                borderWidth: 2,
              },
            },
          },
        },
      },
    },
    
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          height: 8,
          backgroundColor: alpha('#003D7A', 0.1),
        },
        bar: {
          borderRadius: 10,
          background: 'linear-gradient(90deg, #FFC900 0%, #FFD740 100%)',
        },
      },
    },
    
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: '1rem',
        },
      },
    },
    
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 8,
          padding: '8px 12px',
          fontSize: '0.875rem',
          fontWeight: 500,
          backgroundColor: alpha('#1E293B', 0.95),
        },
      },
    },
  },
});

export default theme;
