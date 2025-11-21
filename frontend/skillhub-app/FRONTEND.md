# 🎨 SkillHub Frontend - Tam Dokümantasyon

> **Turkcell SkillHub** - Gençler İçin Dijital Beceri Gelişim Platformu  
> React + TypeScript + Material-UI ile geliştirilmiş modern, responsive frontend

---

## 📋 İçindekiler

1. [Genel Bakış](#genel-bakış)
2. [Teknoloji Stack](#teknoloji-stack)
3. [Proje Yapısı](#proje-yapısı)
4. [Rotalar ve Sayfalar](#rotalar-ve-sayfalar)
5. [Tasarım Sistemi](#tasarım-sistemi)
6. [Componentler](#componentler)
7. [State Yönetimi](#state-yönetimi)
8. [API Entegrasyonu](#api-entegrasyonu)
9. [Özellikler](#özellikler)
10. [Kurulum ve Çalıştırma](#kurulum-ve-çalıştırma)

---

## 🌟 Genel Bakış

### Proje Amacı
Gençlerin dijital becerilerini geliştirmesine yardımcı olan eğitim platformu. Kullanıcılar:
- 📚 Video dersler izleyebilir
- 📝 Quiz'ler çözebilir
- 🏆 Rozet kazanabilir
- 📊 İlerleme takibi yapabilir
- 🏅 Liderlik tablosunda yarışabilir
- 🤖 AI destekli kişisel öneriler alabilir

### Temel Özellikler
- ✅ Modern, responsive tasarım
- ✅ Material-UI tabanlı UI
- ✅ TypeScript ile tip güvenliği
- ✅ React Query ile veri yönetimi
- ✅ LocalStorage bazlı mock authentication
- ✅ Backend API entegrasyonu
- ✅ Gemini AI entegrasyonu
- ✅ Error boundary ve loading states
- ✅ Toast notifications
- ✅ Network status monitoring

---

## 🛠 Teknoloji Stack

### Core
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server

### UI Framework
- **Material-UI (MUI) v6** - Component library
- **Emotion** - CSS-in-JS styling
- **React Icons** - Icon library

### State & Data
- **React Query (TanStack Query)** - Server state management
- **React Router v6** - Routing
- **Axios** - HTTP client

### Additional Libraries
- **React Hot Toast** - Toast notifications
- **Recharts** - Data visualization (quiz performance charts)

### AI Integration
- **Google Gemini API** - AI-powered recommendations

---

## 📁 Proje Yapısı

```
frontend/skillhub-app/
├── public/                      # Static files
├── src/
│   ├── components/             # Reusable components
│   │   ├── dashboard/          # Dashboard-specific components
│   │   │   ├── ActiveLessons.tsx
│   │   │   ├── AIRecommendations.tsx
│   │   │   ├── BadgesPanel.tsx
│   │   │   └── ProgressPanel.tsx
│   │   ├── quiz/               # Quiz components
│   │   │   └── QuizResult.tsx
│   │   ├── ErrorBoundary.tsx   # Error handling
│   │   ├── LoadingSkeletons.tsx
│   │   ├── NetworkStatus.tsx
│   │   └── ProtectedRoute.tsx
│   │
│   ├── contexts/               # React contexts
│   │   └── AuthContext.tsx     # Authentication state
│   │
│   ├── hooks/                  # Custom hooks
│   │   ├── useNetworkStatus.ts
│   │   └── useQueries.ts       # React Query hooks
│   │
│   ├── layouts/                # Layout components
│   │   └── DashboardLayout.tsx # Main app layout
│   │
│   ├── pages/                  # Page components
│   │   ├── AIAssistant.tsx     # AI recommendations page
│   │   ├── Dashboard.tsx       # Main dashboard
│   │   ├── Leaderboard.tsx     # Rankings
│   │   ├── LessonDetail.tsx    # Single lesson view
│   │   ├── Lessons.tsx         # Lessons catalog
│   │   ├── Login.tsx           # Login page
│   │   ├── Profile.tsx         # User profile
│   │   ├── Quiz.tsx            # Quiz interface
│   │   └── Register.tsx        # Registration
│   │
│   ├── services/               # API services
│   │   ├── api.ts              # Backend API calls
│   │   └── geminiApi.ts        # Gemini AI API
│   │
│   ├── types/                  # TypeScript types
│   │   └── index.ts            # All type definitions
│   │
│   ├── utils/                  # Utility functions
│   │   ├── lessonDescriptions.ts # Lesson descriptions map
│   │   ├── lessonVideos.ts     # Video URLs map
│   │   ├── mockAuth.ts         # Mock authentication
│   │   └── toast.ts            # Toast notifications
│   │
│   ├── App.tsx                 # Root component
│   ├── main.tsx                # Entry point
│   └── theme.ts                # MUI theme configuration
│
├── .env                        # Environment variables
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🗺 Rotalar ve Sayfalar

### Public Routes (Giriş Gerekmez)

#### 1. `/login` - Login Sayfası
**Dosya:** `src/pages/Login.tsx`

**Özellikler:**
- Animasyonlu gradient background
- Glassmorphism kart efekti
- Floating logo animasyonu
- Email + password form
- LocalStorage bazlı authentication
- "Kayıt Ol" linki ile Register'a yönlendirme

**Form Fields:**
- Email (required)
- Password (required)

**Demo Kullanıcılar:**
```javascript
Email: user@test.com
Password: password123

Email: ahmet@turkcell.com
Password: ahmet123
```

---

#### 2. `/register` - Kayıt Sayfası
**Dosya:** `src/pages/Register.tsx`

**Özellikler:**
- Reversed gradient (Login'in tersi renk)
- Icon-based form fields
- Responsive layout
- Form validation
- LocalStorage'a kullanıcı kaydı

**Form Fields:**
- Ad Soyad (required)
- Email (required)
- Şehir (required)
- Üniversite (required)
- Seviye (beginner/intermediate/advanced)
- Şifre (required)

---

### Protected Routes (Giriş Gerekli)

Tüm protected route'lar `DashboardLayout` içinde render edilir.

---

#### 3. `/` veya `/dashboard` - Ana Sayfa
**Dosya:** `src/pages/Dashboard.tsx`

**Layout:** 3 kolon (MUI Grid: `md={4}`)

**Bölümler:**

##### Sol Panel - Aktif Dersler
- Component: `ActiveLessons.tsx`
- Son tamamlanmamış dersler
- "Derse Devam Et" butonları
- Boş state: "Henüz derse başlamadın"

##### Orta Panel - İlerleme
- Component: `ProgressPanel.tsx`
- **Puan Kartı:** Toplam puan
- **Tamamlanan Ders:** Sayı
- **Tamamlanma Oranı:** Progress bar
- **Ortalama Başarı:** Progress bar
- **Quiz Performansı:** Recharts line chart
- **Son Quiz Sonucu:** Chip ile gösterim

##### Sağ Panel - Rozetler & Liderlik
- Component: `BadgesPanel.tsx`
- **Rozetler:** Grid layout, emoji icons
- **Top 5 Liderlik Tablosu:** Mini liste
- "Tümünü Gör" butonları

**Header:**
- Kişiselleştirilmiş selamlama: "Merhaba, {firstName}!"
- Gradient background
- Responsive typography

---

#### 4. `/ai-assistant` - AI Asistan
**Dosya:** `src/pages/AIAssistant.tsx`

**Özellikler:**
- Gemini 2.5 Flash AI entegrasyonu
- "Öneri Al" butonuna basınca AI çalışır
- Kişiselleştirilmiş 3-4 öneri
- Priority-based sıralama (1-5)
- Type badges: motivation/lesson/category/skill
- Fallback: Mock öneriler (AI çalışmazsa)

**AI Prompt Bilgileri:**
- Kullanıcı seviyesi
- Tamamlanan ders sayısı
- Quiz başarısı
- Rozet sayısı

**UI States:**
- Initial: Bilgilendirme kartı + "Öneri Al" butonu
- Loading: Spinner + "AI düşünüyor..."
- Success: Öneriler listesi + "Yenile" butonu
- Error: Warning alert + fallback öneriler

**Badge Types:**
- ✅ "Gemini AI" - Gerçek AI yanıtı
- ⚠️ "Akıllı Öneri" - Fallback önerileri

---

#### 5. `/lessons` - Eğitimler Kataloğu
**Dosya:** `src/pages/Lessons.tsx`

**Layout:** 2 kolon grid (`md={6}`)

**Özellikler:**
- Tab-based kategori filtreleme
- "Tümü", "Software Development", "Artificial Intelligence", "Cybersecurity", "Entrepreneurship"
- Professional white cards
- Thin grey border + light shadow
- 12px border radius
- Standardized card height (auto)

**Kart İçeriği (Yukarıdan Aşağıya):**
1. **Etiketler:** Kategori + Seviye
2. **Başlık:** Max 2 satır, truncate
3. **Açıklama:** Max 3 satır, truncate (~140 karakter)
4. **Süre:** Icon + dakika
5. **"Derse Başla" Butonu:** Kategori renginde

**Boş State:**
- "Henüz ders yok" mesajı
- Dashed border card

---

#### 6. `/lesson/:lessonId` - Ders Detay
**Dosya:** `src/pages/LessonDetail.tsx`

**Üst Kısım:**
- "Derslere Dön" back button
- Kategori + Seviye + Süre chips
- Ders başlığı (h4)
- Uzun açıklama (description map'ten)

**Video Bölümü:**
- YouTube badge
- 16:9 aspect ratio video player
- Embed format: `https://www.youtube.com/embed/{videoId}`
- Full screen support
- "Videoyu tam ekran modunda izleyebilirsiniz" ipucu

**Alt Kısım:**
- Quiz teşvik kartı (primary color background)
- "Videoyu izledin mi?" başlık
- "Quiz'e Başla" butonu

**Video Map:** `src/utils/lessonVideos.ts`
- 12 ders için güncel YouTube videoları
- Fallback mekanizması

---

#### 7. `/quiz/:lessonId` - Quiz Sayfası
**Dosya:** `src/pages/Quiz.tsx`

**UI States:**

##### Loading State:
- Circular progress spinner

##### Quiz Active State:
- **Header:** Ders başlığı
- **Progress Bar:** Linear progress (completed/total questions)
- **Soru Kartı:**
  - Soru numarası + soru metni
  - 4 seçenek (radio buttons)
  - "Önceki" ve "Sonraki" butonlar
  - Son soruda "Quiz'i Bitir" butonu

##### Result State:
- Component: `QuizResult.tsx`
- **Başarı Durumu:**
  - ✅ %80+ → "Harika! Başardın!" (success)
  - ⚠️ %60-79 → "İyi" (warning)
  - ❌ <60 → "Daha Fazla Çalışmalısın" (error)
- **Skorlar:**
  - Doğru sayısı / Toplam
  - Yüzde
  - Kazanılan puan
- **Butonlar:**
  - "Derslere Dön"
  - "Tekrar Dene"

**Backend Format:**
```typescript
Request: {
  userId: string,
  lessonId: string,
  answers: [
    { questionId: string, answer: string }
  ]
}

Response: {
  resultId: string,
  score: number,
  correctAnswers: number,
  totalQuestions: number,
  pointsEarned: number,
  passed: boolean,
  badges: BadgeDTO[]
}
```

---

#### 8. `/profile` - Profil Sayfası
**Dosya:** `src/pages/Profile.tsx`

**Bölümler:**

##### Header:
- Avatar (ilk harf)
- Kullanıcı adı
- Şehir + Üniversite
- Seviye badge

##### İstatistikler (3 Grid):
1. **Toplam Puan:** TrophyIcon
2. **Tamamlanan Ders:** CheckIcon
3. **Rozet Sayısı:** StarIcon

##### İlerleme Kartı:
- Tamamlanma oranı bar
- Ortalama başarı bar

##### Rozetler Showcase:
- Grid layout (3 columns on md+)
- Emoji + isim + tarih
- "Motivasyon Rozeti", "Uzman Rozeti" vb.

**Empty State:** "Henüz rozet kazanmadın"

---

#### 9. `/leaderboard` - Liderlik Tablosu
**Dosya:** `src/pages/Leaderboard.tsx`

**Üst Kısım:**
- Minimal header
- "Şehre Göre Filtrele" dropdown
- Unique city listesi (backend'den dinamik)

**Kullanıcı Kartı (Mevcut Kullanıcı):**
- Sol: Rank badge + avatar
- Orta: UserId + şehir
- Sağ: Puan

**Liderlik Listesi:**
- Tek büyük beyaz card içinde
- Her entry:
  - Medal emojisi (🥇🥈🥉 top 3 için)
  - Rank numarası
  - Avatar (userId'nin 2. harfi)
  - UserId + şehir
  - Puan chip
- **Duplicate Filtering:** UserId bazında unique
- **Sorting:** Rank bazında ascending

**City Filter:**
- Case-insensitive
- "Tümü" seçeneği
- Dinamik city listesi

**Empty State:** Filtreleme sonucu boşsa "Sonuç bulunamadı"

---

## 🎨 Tasarım Sistemi

### Renk Paleti

#### Primary Colors
```javascript
primary: {
  main: '#003D7A',      // Turkcell Mavi
  light: '#1565C0',
  dark: '#002F5F',
  contrastText: '#FFF',
}
```

#### Secondary Colors
```javascript
secondary: {
  main: '#FFC900',      // Turkcell Sarı
  light: '#FFD740',
  dark: '#FFA000',
  contrastText: '#000',
}
```

#### Kategori Renkleri
```javascript
C1 (Python/Software): '#3B82F6'      // Blue
C2 (AI/ML): '#8B5CF6'                // Purple
C3 (Cybersecurity): '#EF4444'        // Red
C4 (Entrepreneurship): '#F59E0B'     // Amber
```

#### Neutral Colors
```javascript
Background:
  default: '#F5F7FA'  // Light grey page background
  paper: '#FFFFFF'    // White card background

Text:
  primary: '#1A1A1A'
  secondary: '#64748B'
```

---

### Typography

**Font Family:** 'Inter', sans-serif (Google Fonts)

**Font Weights:**
- Regular: 400
- Medium: 500
- SemiBold: 600
- Bold: 700
- ExtraBold: 800

**Variants:**
```javascript
h3: {
  fontSize: '2.5rem',     // 40px
  fontWeight: 800,
  '@media (max-width:600px)': {
    fontSize: '1.75rem'   // 28px mobile
  }
}

h4: {
  fontSize: '2rem',       // 32px
  fontWeight: 700,
}

h5: {
  fontSize: '1.5rem',     // 24px
  fontWeight: 700,
}

h6: {
  fontSize: '1.25rem',    // 20px
  fontWeight: 700,
}

body1: {
  fontSize: '1rem',       // 16px
  lineHeight: 1.6,
}

body2: {
  fontSize: '0.875rem',   // 14px
  lineHeight: 1.5,
}
```

---

### Spacing System

**Base Unit:** 8px

```javascript
spacing: (factor) => `${8 * factor}px`

Örnek:
spacing(1) = 8px
spacing(2) = 16px
spacing(3) = 24px
spacing(4) = 32px
```

**Common Paddings:**
- Card padding: `24px` (3)
- Section margin: `32px` (4)
- Button padding Y: `10px` (1.25)
- Button padding X: `24px` (3)

---

### Shadows

```javascript
Custom Shadows:
  card: '0 4px 12px rgba(0,0,0,0.08)'
  cardHover: '0 8px 24px rgba(0,0,0,0.12)'
  button: '0 8px 24px rgba(0,0,0,0.25)'
  
MUI Elevation:
  elevation={0}: No shadow (most cards use this)
```

---

### Border Radius

```javascript
Standard Values:
  Cards: 12px (3 in MUI)
  Buttons: 8px (2 in MUI)
  Chips/Tags: 6px (1.5 in MUI)
  Input Fields: 8px (2 in MUI)
```

---

### Breakpoints

```javascript
xs: 0px        // Mobile
sm: 600px      // Tablet portrait
md: 900px      // Tablet landscape
lg: 1200px     // Desktop
xl: 1536px     // Large desktop
```

**Responsive Grid:**
- Mobile (xs): 1 column
- Tablet (md): 2 columns
- Desktop (lg): 3-4 columns

---

### Component Styling Guidelines

#### Cards
```javascript
sx={{
  borderRadius: 3,                              // 12px
  border: '1px solid rgba(0,0,0,0.08)',        // Thin grey
  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',   // Light shadow
  '&:hover': {
    transform: 'translateY(-4px)',             // Lift effect
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
  },
  transition: 'all 0.3s ease',
}}
```

#### Buttons
```javascript
sx={{
  borderRadius: 2,                              // 8px
  fontWeight: 600,
  py: 1.25,                                    // 10px vertical
  px: 3,                                       // 24px horizontal
  textTransform: 'none',                        // Preserve case
  boxShadow: 'none',                           // No default shadow
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
}}
```

#### Typography Truncation (Multi-line)
```javascript
sx={{
  display: '-webkit-box',
  WebkitLineClamp: 2,              // Max lines
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  height: '2.8em',                 // Fixed height for 2 lines
}}
```

---

## 🧩 Componentler

### Dashboard Components

#### `ActiveLessons.tsx`
**Props:**
```typescript
interface ActiveLessonsProps {
  userProgress?: UserProgress;
}
```

**Özellikler:**
- Son 3 tamamlanmamış dersi gösterir
- Her ders için: title, duration, "Devam Et" butonu
- Loading skeleton support
- Empty state

---

#### `ProgressPanel.tsx`
**Props:**
```typescript
interface ProgressPanelProps {
  userProgress?: UserProgress;
}
```

**Özellikler:**
- Puan ve ders kartları (gradient backgrounds)
- Progress bars (completion rate, average score)
- Recharts line chart (quiz performance)
- Responsive heights

**Chart Config:**
```javascript
<LineChart data={chartData}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis domain={[0, 100]} />
  <Tooltip />
  <Line 
    type="monotone" 
    dataKey="score" 
    stroke="#FFC900" 
    strokeWidth={3}
  />
</LineChart>
```

---

#### `BadgesPanel.tsx`
**Props:**
```typescript
interface BadgesPanelProps {
  userProgress?: UserProgress;
  leaderboard: LeaderboardEntry[];
  currentUser?: User;
}
```

**Özellikler:**
- Badge grid (2 columns on xs, 3 on md+)
- Unique leaderboard filtering (userId bazında)
- Top 5 liderlik snippet
- "Tümünü Gör" butonları

---

#### `AIRecommendations.tsx`
**Props:** Yok (kendi context'inden veriyi çeker)

**Özellikler:**
- Gemini API entegrasyonu
- "Öneri Al" butonu
- 3 state: initial, loading, success
- Fallback mekanizması
- Priority-based sorting
- Type-based coloring

**API Call:**
```typescript
const recommendations = await getAIRecommendations(
  userProgress,
  lessons
);
```

---

### Quiz Components

#### `QuizResult.tsx`
**Props:**
```typescript
interface QuizResultProps {
  result: QuizSubmitResponse;
  lessonId: string;
  onRetry: () => void;
}
```

**Özellikler:**
- Success/warning/error states
- Score display (circular progress)
- Badge notifications
- Action buttons

---

### Layout Components

#### `DashboardLayout.tsx`

**Özellikler:**
- Persistent sidebar (desktop)
- Temporary drawer (mobile)
- Top app bar with user info
- Menu items: Dashboard, AI Asistan, Eğitimler, Rozetlerim, Liderlik Tablosu
- Profile menu (dropdown)
- Active route highlighting

**Sidebar Width:** 260px

**Menu Structure:**
```typescript
[
  { text: 'Dashboard', icon: DashboardIcon, path: '/dashboard' },
  { text: 'AI Asistan', icon: BrainIcon, path: '/ai-assistant' },
  { text: 'Eğitimler', icon: SchoolIcon, path: '/lessons' },
  { text: 'Rozetlerim', icon: TrophyIcon, path: '/profile' },
  { text: 'Liderlik Tablosu', icon: LeaderboardIcon, path: '/leaderboard' },
]
```

---

### Utility Components

#### `ErrorBoundary.tsx`
```typescript
class ErrorBoundary extends Component {
  state = { hasError: false, error: null };
  
  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary caught:', error, errorInfo);
    this.setState({ hasError: true, error });
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorDisplay error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

---

#### `LoadingSkeletons.tsx`

**Exported Skeletons:**
- `DashboardSkeleton` - 3 column grid
- `LessonsListSkeleton` - Card grid
- `CardSkeleton` - Single card
- `ProfileSkeleton` - Profile layout

**Usage:**
```typescript
if (isLoading) return <DashboardSkeleton />;
```

---

#### `NetworkStatus.tsx`

**Özellikler:**
- Online/offline detection
- Toast notification on status change
- useNetworkStatus hook

---

#### `ProtectedRoute.tsx`

**Özellikler:**
- Authentication check
- Redirect to /login if not authenticated
- Wraps authenticated routes

```typescript
<Route path="/" element={
  <ProtectedRoute>
    <DashboardLayout />
  </ProtectedRoute>
}>
```

---

## 🔄 State Yönetimi

### React Query (TanStack Query)

**Config:** `src/App.tsx`
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});
```

### Custom Hooks (`src/hooks/useQueries.ts`)

#### User & Progress
```typescript
useUser(userId: string)
useUserProgress(userId: string)
```

#### Lessons & Categories
```typescript
useCategories()
useLessons()
useLesson(lessonId: string)
```

#### Quiz
```typescript
useQuizQuestions(lessonId: string)
useSubmitQuiz() // Mutation
```

#### Leaderboard & Badges
```typescript
useLeaderboard(city?: string)
useBadges(userId: string)
```

**Example Usage:**
```typescript
const { data: userProgress, isLoading } = useUserProgress(user?.userId || '');
const submitMutation = useSubmitQuiz();

await submitMutation.mutateAsync({ userId, lessonId, answers });
```

---

### Context API

#### `AuthContext.tsx`

**State:**
```typescript
{
  user: User | null,
  loading: boolean,
}
```

**Methods:**
```typescript
login(email: string, password: string): Promise<void>
register(userData: RegisterData): Promise<void>
logout(): Promise<void>
```

**Usage:**
```typescript
const { user, login, logout } = useAuth();

await login('user@test.com', 'password123');
```

**Storage:** LocalStorage (`skillhub_users`, `skillhub_current_user`)

---

## 🌐 API Entegrasyonu

### Backend API (`src/services/api.ts`)

**Base URL:** `http://localhost:8080/api`

#### Authentication
```typescript
authAPI.login(email, password)
authAPI.register(userData)
authAPI.logout()
```

#### Users
```typescript
userAPI.getUserById(userId)
userAPI.getUserProgress(userId)
```

#### Lessons
```typescript
lessonAPI.getAllCategories()
lessonAPI.getAllLessons()
lessonAPI.getLessonById(lessonId)
```

#### Quiz
```typescript
quizAPI.getQuizQuestions(lessonId)
quizAPI.submitQuiz({ userId, lessonId, answers })
```

#### Leaderboard & Badges
```typescript
leaderboardAPI.getLeaderboard(city?)
badgeAPI.getUserBadges(userId)
```

**Interceptors:**
- **Request:** Adds auth token
- **Response:** Handles 401 (auto logout), error formatting

---

### Gemini AI API (`src/services/geminiApi.ts`)

**Model:** `gemini-2.5-flash`

**Endpoint:** `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`

**Authentication:** Header-based
```javascript
headers: {
  'x-goog-api-key': API_KEY,
  'Content-Type': 'application/json',
}
```

**Request Format:**
```typescript
{
  contents: [
    {
      parts: [
        { text: prompt }
      ]
    }
  ],
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 8192,
    responseMimeType: 'application/json',
  }
}
```

**Response Format:**
```typescript
{
  candidates: [
    {
      content: {
        parts: [
          { text: "[{...}]" }  // JSON array
        ]
      },
      finishReason: "STOP" | "MAX_TOKENS" | "SAFETY"
    }
  ]
}
```

**Functions:**
```typescript
getAIRecommendations(userProgress, lessons): Promise<GeminiRecommendation[]>
getMockRecommendations(userProgress, completedLessons): GeminiRecommendation[]
```

**Fallback:** Mock öneriler (API başarısız olursa)

---

## ✨ Özellikler

### 1. Mock Authentication

**Location:** `src/utils/mockAuth.ts`

**Özellikler:**
- LocalStorage bazlı
- Şifre hashleme yok (demo amaçlı)
- Email bazlı unique kullanıcılar
- Auto-generated userId

**Demo Users:**
```javascript
{
  email: 'user@test.com',
  password: 'password123',
  userId: 'U1'
}
```

**Register:**
```typescript
mockAuth.register({
  name, email, password, city, university, skillLevel
})
```

---

### 2. Lesson Descriptions

**Location:** `src/utils/lessonDescriptions.ts`

**12 ders için 140-200 karakter uzunluğunda Türkçe açıklamalar**

**Example:**
```typescript
L1: 'Python programlama diline sıfırdan başlayın. Değişkenler, veri tipleri, koşullu ifadeler, döngüler ve fonksiyonlar gibi temel programlama kavramlarını pratik örneklerle öğrenin...'
```

---

### 3. Lesson Videos

**Location:** `src/utils/lessonVideos.ts`

**12 ders için güncel YouTube embed videoları**

**Format:**
```typescript
L1: 'https://www.youtube.com/embed/kqtD5dpn9C8'
```

**Features:**
- Embed format (oynatılabilir)
- Güncel ve çalışan linkler
- Fallback mekanizması
- Helper functions (isValid, convertToEmbed)

---

### 4. Toast Notifications

**Location:** `src/utils/toast.ts`

**Wrapper:** react-hot-toast

**Functions:**
```typescript
showToast.success('İşlem başarılı!')
showToast.error('Bir hata oluştu')
showToast.loading('Yükleniyor...')
showToast.promise(promise, messages)
```

**Usage:**
```typescript
import { showToast } from '../utils/toast';

await login(email, password);
showToast.success('Giriş başarılı!');
```

---

### 5. Network Status

**Hook:** `useNetworkStatus()`

**Returns:**
```typescript
{
  isOnline: boolean
}
```

**Component:** `NetworkStatus.tsx`
- Displays toast on offline/online

---

### 6. Error Handling

**Error Boundary:** Catches React errors
**API Errors:** Formatted with status codes
**Network Errors:** "Bağlantı hatası" message
**Loading States:** Skeletons everywhere

---

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Node.js 18+
- npm veya yarn

### 1. Kurulum
```bash
cd frontend/skillhub-app
npm install
```

### 2. Environment Variables
`.env` dosyası oluştur:
```env
VITE_GEMINI_API_KEY=your_api_key_here
VITE_API_BASE_URL=http://localhost:8080/api
```

### 3. Development Server
```bash
npm run dev
```

**URL:** http://localhost:5173

### 4. Build
```bash
npm run build
```

**Output:** `dist/` folder

### 5. Preview Build
```bash
npm run preview
```

---

## 📱 Responsive Breakpoints

### Mobile (xs: 0-599px)
- 1 column grid
- Stacked layout
- Mobile drawer menu
- Smaller typography
- Full-width buttons

### Tablet (sm: 600-899px, md: 900-1199px)
- 2 column grid (lessons, leaderboard)
- 3 column dashboard
- Persistent sidebar (md+)
- Medium typography

### Desktop (lg: 1200px+)
- 3-4 column grids
- Full sidebar
- Large typography
- Hover effects

---

## 🎯 Best Practices

### 1. Component Structure
```typescript
// Imports
import { ... } from '@mui/material';

// Types
interface Props { ... }

// Component
const ComponentName = ({ props }: Props) => {
  // Hooks
  const navigate = useNavigate();
  const { data, isLoading } = useQuery();
  
  // States
  const [state, setState] = useState();
  
  // Effects
  useEffect(() => { ... }, []);
  
  // Handlers
  const handleClick = () => { ... };
  
  // Early returns
  if (isLoading) return <Skeleton />;
  
  // Main render
  return (
    <Box>...</Box>
  );
};

export default ComponentName;
```

### 2. TypeScript
- ✅ Tüm componentler typed
- ✅ Props interfaces
- ✅ API response types
- ✅ No `any` types

### 3. Styling
- ✅ MUI `sx` prop
- ✅ Theme-aware (colors, spacing)
- ✅ Responsive values: `{ xs: 1, md: 2 }`
- ✅ Reusable constants

### 4. Performance
- ✅ React Query caching
- ✅ Lazy loading (if needed)
- ✅ Memoization (React.memo)
- ✅ Optimistic updates

---

## 📝 TypeScript Types

**Location:** `src/types/index.ts`

### Key Interfaces

```typescript
// User & Auth
interface User {
  userId: string;
  name: string;
  email: string;
  city: string;
  university: string;
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  totalPoints: number;
  badgeCount: number;
}

// Lessons
interface Category {
  categoryId: string;
  name: string;
  description: string;
}

interface LessonDTO {
  lessonId: string;
  categoryId: string;
  title: string;
  durationMin: number;
  difficulty: string;
  videoUrl?: string;
  description?: string;
}

// Quiz
interface QuizQuestion {
  questionId: string;
  lessonId: string;
  questionText: string;
  correctAnswer: string;
  options: string[];
}

interface QuizSubmitRequest {
  userId: string;
  lessonId: string;
  answers: Array<{
    questionId: string;
    answer: string;
  }>;
}

interface QuizSubmitResponse {
  resultId: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  pointsEarned: number;
  passed: boolean;
  badges: BadgeDTO[];
}

// Progress & Badges
interface UserProgress {
  user: User;
  completedLessons: number;
  totalLessons: number;
  completionRate: number;
  averageScore: number;
  recentQuizResults: QuizResult[];
  badges: Badge[];
}

interface Badge {
  badgeId: string;
  name: string;
  description: string;
  icon: string;
  awardedAt: string;
}

// Leaderboard
interface LeaderboardEntry {
  userId: string;
  rank: number;
  totalPoints: number;
  city: string;
}

// AI Recommendations
interface GeminiRecommendation {
  title: string;
  description: string;
  reason: string;
  priority: number; // 1-5
  type: 'lesson' | 'category' | 'skill' | 'motivation';
}
```

---

## 🔐 Security Notes

### Current Implementation (Demo)
- ⚠️ **LocalStorage authentication** - Not production-ready
- ⚠️ **No password hashing** - Plain text storage
- ⚠️ **No HTTPS enforcement** - Development only
- ⚠️ **API key in client** - Gemini key exposed

### Production Recommendations
- ✅ JWT tokens with httpOnly cookies
- ✅ Backend authentication service
- ✅ HTTPS only
- ✅ Gemini API calls via backend proxy
- ✅ CSRF protection
- ✅ Rate limiting

---

## 🐛 Known Issues & Limitations

### 1. Authentication
- Mock system, LocalStorage bazlı
- Production için backend auth gerekli

### 2. Video Playback
- YouTube embed kullanıyor
- Bazı videolar bölgesel olarak engellenebilir

### 3. AI Recommendations
- Gemini API quota limiti: 1500 request/day
- Fallback: Mock öneriler

### 4. Data Persistence
- LocalStorage bazlı (browser-specific)
- Tarayıcı değişirse data kaybolur

### 5. Backend Dependency
- Backend çalışmıyorsa tüm data endpoints fail
- Error handling mevcut ama UX etkilenir

---

## 📚 Additional Resources

### Documentation
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Material-UI Docs](https://mui.com)
- [React Query Docs](https://tanstack.com/query/latest)
- [Gemini API Docs](https://ai.google.dev/gemini-api/docs)

### Backend API
- Backend Swagger: `http://localhost:8080/swagger-ui.html`
- Backend Docs: `backend/README.md`

---

## 👨‍💻 Development Tips

### Hot Reload
Vite auto-reloads on file changes. No manual refresh needed.

### Console Debugging
Check browser console (F12) for:
- API request logs
- Error messages
- React Query cache state

### React DevTools
Install React DevTools extension:
- Component tree
- Props inspection
- Hooks state

### Network Tab
Monitor API calls:
- Request/response payloads
- Status codes
- Timing

---

## ✅ Checklist: Özellik Tamamlama

### Core Features
- [x] Login & Register
- [x] Dashboard (3 panel)
- [x] Lessons catalog
- [x] Lesson detail with video
- [x] Quiz interface
- [x] Quiz results
- [x] Profile page
- [x] Leaderboard
- [x] AI Assistant (Gemini)

### UI/UX
- [x] Responsive design
- [x] Loading states
- [x] Error boundaries
- [x] Toast notifications
- [x] Skeleton loaders
- [x] Empty states
- [x] Network status

### Data & Integration
- [x] Backend API integration
- [x] React Query setup
- [x] LocalStorage auth
- [x] Lesson descriptions
- [x] Video URLs
- [x] Gemini AI API

### Polish
- [x] Professional design
- [x] Turkcell branding
- [x] Icon consistency
- [x] Typography system
- [x] Color palette
- [x] Spacing standards

---

## 🎉 Sonuç

**SkillHub Frontend** tam özellikli, modern bir eğitim platformu arayüzüdür:

✅ **Professional Design** - Corporate ve genç kitleye hitap eden  
✅ **Full Responsive** - Mobile, tablet, desktop optimized  
✅ **Type-Safe** - TypeScript ile %100 typed  
✅ **Performance** - React Query caching, optimizations  
✅ **AI-Powered** - Gemini entegrasyonu  
✅ **User-Friendly** - Intuitive navigation, clear feedback  
✅ **Extensible** - Modular yapı, kolay geliştirme  

**Backend uyumlu**, **API-driven**, **production-ready** (auth hariç) bir sistemdir.

---

**Frontend Hazır! 🚀**  
**Dokümantasyon Eksiksiz! 📚**  
**Sunum Yapmaya Hazırsın! 🎯**

