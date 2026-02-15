import React, { useEffect, useState } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { PreviewPanel } from './components/PreviewPanel';
import { useStore } from './store';
import { Button } from './components/ui-lib';
import { UpgradeModal } from './components/UpgradeModal';
import { AuthModal } from './components/AuthModal';
import { LandingPage } from './components/LandingPage';
import { AccountSettings } from './components/AccountSettings';
import { SavedPostsModal } from './components/SavedPostsModal';
import { supabase } from './src/lib/supabase';
import { MockupState } from './types';

const App = () => {
  const store = useStore();
  const { isAppDarkMode, toggleAppDarkMode, isPro, user, setUser, setState } = store;

  // Construct current state for saving, excluding helper functions
  const currentState = {
    platform: store.platform,
    author: store.author,
    content: store.content,
    metrics: store.metrics,
    appearance: store.appearance,
    isAppDarkMode: store.isAppDarkMode
  };
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAccountSettingsOpen, setIsAccountSettingsOpen] = useState(false);
  const [isSavedPostsOpen, setIsSavedPostsOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Routing State
  const [view, setView] = useState<'landing' | 'app'>('landing');

  // If user is logged in, auto-redirect to app? Or keep them on landing?
  // Let's redirect to app on first load if session exists
  useEffect(() => {
    if (user && view === 'landing') {
      setView('app');
    }
  }, [user]);

  useEffect(() => {
    // Apply dark mode class to body element as per requirement
    if (isAppDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isAppDarkMode]);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        setView('app');
      }
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  // Sync remote profile to local state when user logs in
  useEffect(() => {
    async function loadProfile() {
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (data && !error) {
        // Sync Pro status
        if (data.is_pro !== isPro) {
          // We can't directly set isPro to a specific value with toggle, 
          // but we can assume if it mismatches we toggle it. 
          // Ideally we would add setPro(boolean) to store, but for now:
          if (data.is_pro !== useStore.getState().isPro) {
            useStore.getState().togglePro();
          }
        }

        // Sync Author details if they exist remotely
        if (data.full_name) {
          useStore.getState().updateAuthor({
            displayName: data.full_name,
            // weak mapping for other fields since schema is simple
          });
        }
        if (data.avatar_url) {
          useStore.getState().updateAuthor({ profilePicture: data.avatar_url });
        }
      }
    }

    loadProfile();
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setView('landing'); // Go back to landing on logout
  };

  const handleSavePost = async () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }

    try {
      setSaving(true);

      // Extract relevant state to save (exclude user, isPro, helper functions)
      const contentToSave = {
        platform: currentState.platform,
        author: currentState.author,
        content: currentState.content,
        metrics: currentState.metrics,
        appearance: currentState.appearance,
        isAppDarkMode: currentState.isAppDarkMode // Optional: save app preference too?
      };

      const { error } = await supabase.from('saved_posts').insert({
        user_id: user.id,
        title: `${currentState.platform} Post - ${new Date().toLocaleTimeString()}`,
        content_json: contentToSave
      });

      if (error) throw error;
      alert('Post saved successfully!');
    } catch (error: any) {
      console.error('Save failed:', error);
      alert('Failed to save post.');
    } finally {
      setSaving(false);
    }
  };

  const handleLoadPost = (loadedState: Partial<MockupState>) => {
    setState(loadedState);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground transition-colors duration-300">
      <UpgradeModal isOpen={isUpgradeModalOpen} onClose={() => setIsUpgradeModalOpen(false)} />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />

      {/* Account Settings Overlay */}
      {isAccountSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl h-[80vh] overflow-y-auto rounded-lg border bg-background p-6 shadow-lg animate-in fade-in zoom-in-95 duration-200 relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
              onClick={() => setIsAccountSettingsOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </Button>
            <AccountSettings onUiClose={() => setIsAccountSettingsOpen(false)} />
          </div>
        </div>
      )}

      {/* Left Sidebar - Control Panel */}
      <aside className="w-[400px] shrink-0 h-full border-r border-border z-10 shadow-sm bg-background">
        <div className="h-16 flex items-center justify-between px-6 border-b border-border bg-background">
          <div className="flex items-center gap-2">
            {/* Back to Home Button/Logo */}
            <div
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setView('landing')}
              title="Back to Home"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-lg">P</div>
              <h1 className="text-xl font-bold tracking-tight">Postly</h1>
            </div>
            {isPro && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">PRO</span>}
          </div>
          <div className="flex items-center gap-2">
            {/* Save Button */}
            <Button variant="ghost" size="icon" onClick={handleSavePost} disabled={saving} title="Save Post">
              {saving ? (
                <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
              )}
            </Button>

            {/* My Posts Button */}
            {user && (
              <Button variant="ghost" size="icon" onClick={() => setIsSavedPostsOpen(true)} title="My Saved Posts">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </Button>
            )}

            {!isPro && (
              <Button size="sm" onClick={() => setIsUpgradeModalOpen(true)} className="h-8">
                Upgrade
              </Button>
            )}

            {user ? (
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" onClick={() => setIsAccountSettingsOpen(true)} title="Account Settings">
                  Account
                </Button>
                <Button variant="ghost" size="icon" onClick={handleLogout} title="Sign Out">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => setIsAuthModalOpen(true)}>
                Sign In
              </Button>
            )}

            <Button variant="ghost" size="icon" onClick={toggleAppDarkMode} title="Toggle Dark Mode">
              {isAppDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2" /><path d="M12 21v2" /><path d="M4.22 4.22l1.42 1.42" /><path d="M18.36 18.36l1.42 1.42" /><path d="M1 12h2" /><path d="M21 12h2" /><path d="M4.22 19.78l1.42-1.42" /><path d="M18.36 5.64l1.42-1.42" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
              )}
            </Button>
          </div>
        </div>
        <div className="h-[calc(100%-64px)]">
          <ControlPanel onUpgradeTrigger={() => setIsUpgradeModalOpen(true)} />
        </div>
      </aside>

      {/* Main Content - Preview Area */}
      <main className="flex-1 h-full relative">
        <PreviewPanel />
      </main>
    </div>
  );
};

export default App;