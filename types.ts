import { User } from '@supabase/supabase-js';

export type Platform = 'instagram' | 'facebook' | 'linkedin' | 'x';

export interface AuthorConfig {
  displayName: string;
  username: string;
  profilePicture: string | null;
  jobTitle: string;
  verified: boolean;
}

export interface PostContent {
  caption: string;
  image: string | null;
}

export interface MetricsConfig {
  likes: number;
  comments: number;
  shares: number;
  reactions: number;
  retweets: number;
  replies: number;
  views: number;
}

export interface AppearanceConfig {
  darkMode: boolean;
  transparentBackground: boolean;
}

export interface MockupState {
  platform: Platform;
  author: AuthorConfig;
  content: PostContent;
  metrics: MetricsConfig;
  appearance: AppearanceConfig;
  isAppDarkMode: boolean;
  isPro: boolean;
  user: User | null;
  setPlatform: (platform: Platform) => void;
  updateAuthor: (data: Partial<AuthorConfig>) => void;
  updateContent: (data: Partial<PostContent>) => void;
  updateMetrics: (data: Partial<MetricsConfig>) => void;
  updateAppearance: (data: Partial<AppearanceConfig>) => void;
  toggleAppDarkMode: () => void;
  togglePro: () => void;
  setUser: (user: User | null) => void;
  reset: () => void;
  setState: (state: Partial<MockupState>) => void;
}