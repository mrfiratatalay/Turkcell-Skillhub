// Mock data based on CSV seed files
import { User, Category, Lesson, QuizQuestion, QuizResult, Badge, LeaderboardEntry } from '../types';

export const mockUsers: User[] = [
  {
    user_id: 'U1',
    name: 'Ayşe',
    city: 'Istanbul',
    university: 'ITU',
    skill_level: 'Beginner',
    total_points: 120,
    badge_count: 2,
  },
  {
    user_id: 'U2',
    name: 'Ali',
    city: 'Ankara',
    university: 'METU',
    skill_level: 'Intermediate',
    total_points: 250,
    badge_count: 3,
  },
  {
    user_id: 'U3',
    name: 'Deniz',
    city: 'Izmir',
    university: 'Ege University',
    skill_level: 'Advanced',
    total_points: 400,
    badge_count: 4,
  },
];

export const mockCategories: Category[] = [
  {
    category_id: 'C1',
    name: 'Yazılım',
    description: 'Programming languages and tools.',
  },
  {
    category_id: 'C2',
    name: 'Yapay Zeka',
    description: 'Machine learning and data science.',
  },
  {
    category_id: 'C3',
    name: 'Siber Güvenlik',
    description: 'Network and system security.',
  },
  {
    category_id: 'C4',
    name: 'Girişimcilik',
    description: 'Business models and innovation.',
  },
];

export const mockLessons: Lesson[] = [
  {
    lesson_id: 'L1',
    category_id: 'C1',
    title: 'Introduction to Python',
    duration_min: 45,
    difficulty: 'Beginner',
    video_url: 'https://www.youtube.com/embed/rfscVS0vtbw',
    description: 'Learn the basics of Python programming language, including syntax, variables, and data types.',
  },
  {
    lesson_id: 'L2',
    category_id: 'C2',
    title: 'Machine Learning Basics',
    duration_min: 60,
    difficulty: 'Intermediate',
    video_url: 'https://www.youtube.com/embed/ukzFI9rgwfU',
    description: 'Introduction to machine learning concepts, algorithms, and practical applications.',
  },
  {
    lesson_id: 'L3',
    category_id: 'C3',
    title: 'Fundamentals of Cybersecurity',
    duration_min: 50,
    difficulty: 'Intermediate',
    video_url: 'https://www.youtube.com/embed/inWWhr5tnEA',
    description: 'Understanding network security, encryption, and protection against cyber threats.',
  },
  {
    lesson_id: 'L4',
    category_id: 'C4',
    title: 'Startup Fundamentals',
    duration_min: 40,
    difficulty: 'Beginner',
    video_url: 'https://www.youtube.com/embed/CBYhVcO4WgI',
    description: 'Essential knowledge for starting and growing a successful business.',
  },
];

export const mockQuizzes: QuizQuestion[] = [
  {
    question_id: 'Q1',
    lesson_id: 'L1',
    question_text: 'What is Python used for?',
    correct_answer: 'All of the above',
    options: ['Web', 'Data Science', 'Automation', 'All of the above'],
  },
  {
    question_id: 'Q2',
    lesson_id: 'L2',
    question_text: 'Which library is used for ML?',
    correct_answer: 'scikit-learn',
    options: ['TensorFlow', 'scikit-learn', 'Flask', 'NumPy'],
  },
  {
    question_id: 'Q3',
    lesson_id: 'L3',
    question_text: 'What does a firewall do?',
    correct_answer: 'Monitors network traffic',
    options: ['Encrypts files', 'Monitors network traffic', 'Deletes viruses', 'Runs programs'],
  },
];

export const mockQuizResults: QuizResult[] = [
  {
    result_id: 'R1',
    user_id: 'U1',
    lesson_id: 'L1',
    score: 80,
    completed_at: '2025-11-09T10:00:00Z',
  },
  {
    result_id: 'R2',
    user_id: 'U2',
    lesson_id: 'L2',
    score: 90,
    completed_at: '2025-11-09T10:30:00Z',
  },
  {
    result_id: 'R3',
    user_id: 'U3',
    lesson_id: 'L3',
    score: 100,
    completed_at: '2025-11-09T11:00:00Z',
  },
];

export const mockBadges: Badge[] = [
  {
    badge_id: 'B1',
    user_id: 'U1',
    name: 'Motivasyon Rozeti',
    awarded_at: '2025-11-09T12:00:00Z',
  },
  {
    badge_id: 'B2',
    user_id: 'U2',
    name: 'Uzman Rozeti',
    awarded_at: '2025-11-09T12:30:00Z',
  },
  {
    badge_id: 'B3',
    user_id: 'U3',
    name: 'Lider Rozeti',
    awarded_at: '2025-11-09T13:00:00Z',
  },
];

export const mockLeaderboard: LeaderboardEntry[] = [
  {
    user_id: 'U3',
    rank: 1,
    total_points: 400,
    city: 'Izmir',
    name: 'Deniz',
  },
  {
    user_id: 'U2',
    rank: 2,
    total_points: 250,
    city: 'Ankara',
    name: 'Ali',
  },
  {
    user_id: 'U1',
    rank: 3,
    total_points: 120,
    city: 'Istanbul',
    name: 'Ayşe',
  },
];

