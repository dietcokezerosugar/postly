import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MockupState, Platform } from './types';

const INITIAL_STATE = {
  platform: 'instagram' as Platform,
  author: {
    displayName: 'Sarah Johnson',
    username: 'sarah.design',
    profilePicture: 'https://picsum.photos/200',
    jobTitle: 'Product Designer',
    verified: true,
  },
  content: {
    caption: 'Just shipped a new feature! 🚀 The design system is finally coming together. #uidesign #webdev #shipping',
    image: 'https://picsum.photos/800/600',
  },
  metrics: {
    likes: 1245,
    comments: 48,
    shares: 12,
    reactions: 856,
    retweets: 154,
    replies: 23,
    views: 12500,
  },
  appearance: {
    darkMode: false,
    transparentBackground: false,
  },
  isAppDarkMode: true,
};

export const useStore = create<MockupState>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,
      setPlatform: (platform) => set({ platform }),
      updateAuthor: (data) =>
        set((state) => ({ author: { ...state.author, ...data } })),
      updateContent: (data) =>
        set((state) => ({ content: { ...state.content, ...data } })),
      updateMetrics: (data) =>
        set((state) => ({ metrics: { ...state.metrics, ...data } })),
      updateAppearance: (data) =>
        set((state) => ({ appearance: { ...state.appearance, ...data } })),
      toggleAppDarkMode: () =>
        set((state) => {
          const newMode = !state.isAppDarkMode;
          return {
            isAppDarkMode: newMode,
            appearance: { ...state.appearance, darkMode: newMode }
          };
        }),
      reset: () => set(INITIAL_STATE),
    }),
    {
      name: 'postly-storage-v1',
    }
  )
);