import React, { useEffect } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { PreviewPanel } from './components/PreviewPanel';
import { useStore } from './store';
import { Button } from './components/ui-lib';

const App = () => {
  const { isAppDarkMode, toggleAppDarkMode } = useStore();

  useEffect(() => {
    // Apply dark mode class to body element as per requirement
    if (isAppDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isAppDarkMode]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground transition-colors duration-300">
      {/* Left Sidebar - Control Panel */}
      <aside className="w-[400px] shrink-0 h-full border-r border-border z-10 shadow-sm bg-background">
        <div className="h-16 flex items-center justify-between px-6 border-b border-border bg-background">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-lg">P</div>
            <h1 className="text-xl font-bold tracking-tight">Postly</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleAppDarkMode} title="Toggle Dark Mode">
            {isAppDarkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2" /><path d="M12 21v2" /><path d="M4.22 4.22l1.42 1.42" /><path d="M18.36 18.36l1.42 1.42" /><path d="M1 12h2" /><path d="M21 12h2" /><path d="M4.22 19.78l1.42-1.42" /><path d="M18.36 5.64l1.42-1.42" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
            )}
          </Button>
        </div>
        <div className="h-[calc(100%-64px)]">
          <ControlPanel />
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