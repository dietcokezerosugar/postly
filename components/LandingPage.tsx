import React from 'react';
import { Button } from './ui-lib';

export interface LandingPageProps {
    onGetStarted: () => void;
    onSignIn: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted, onSignIn }) => {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground animate-in fade-in duration-500">
            <header className="px-6 h-16 flex items-center justify-between border-b border-border/50 sticky top-0 bg-background/80 backdrop-blur z-50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-lg">P</div>
                    <span className="text-xl font-bold tracking-tight">Postly</span>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" onClick={onSignIn} className="text-sm font-medium">Log in</Button>
                    <Button onClick={onGetStarted} className="text-sm font-medium">Get Started</Button>
                </div>
            </header>

            <main className="flex-1">
                <section className="py-24 sm:py-32 lg:pb-40 text-center px-4">
                    <div className="mx-auto max-w-4xl space-y-8">
                        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
                            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                            New: Pro Plan with Dark Mode
                        </div>

                        <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                            Create Stunning <br />
                            Social Share Images
                        </h1>

                        <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
                            Turn your tweets, posts, and thoughts into beautiful, shareable images for LinkedIn, Instagram, and more. No design skills needed.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Button size="lg" className="h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow" onClick={onGetStarted}>
                                Start Creating for Free
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-5 w-5"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                            </Button>
                            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full" onClick={() => window.open('https://github.com/zenpay/postly', '_blank')}>
                                View on GitHub
                            </Button>
                        </div>
                    </div>

                    {/* Mockup Preview */}
                    <div className="mt-16 flow-root sm:mt-24">
                        <div className="mx-auto max-w-5xl rounded-xl border bg-background/50 p-2 shadow-2xl ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl lg:p-4">
                            <div className="rounded-lg bg-slate-900/5 aspect-[16/9] w-full overflow-hidden relative flex items-center justify-center border border-dashed border-slate-300 dark:border-slate-700">
                                <div className="text-center space-y-2">
                                    <p className="text-sm font-medium text-muted-foreground">App Preview</p>
                                    <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center text-primary animate-pulse">
                                        <div className="w-8 h-8 bg-current rounded" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-muted/30 border-y border-border">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl lg:text-center">
                            <h2 className="text-base font-semibold leading-7 text-primary">Deploy faster</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to showcase your content</p>
                        </div>
                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                                <div className="flex flex-col items-start">
                                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                                        <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg>
                                        </div>
                                        Multi-Platform
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                                        <p className="flex-auto">Optimized layouts for X (Twitter), LinkedIn, Instagram Stories, and Facebook posts.</p>
                                    </dd>
                                </div>
                                <div className="flex flex-col items-start">
                                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                                        <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                                        </div>
                                        Instant Preview
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                                        <p className="flex-auto">See your changes in real-time. What you see is exactly what you get when you export.</p>
                                    </dd>
                                </div>
                                <div className="flex flex-col items-start">
                                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7">
                                        <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                                        </div>
                                        High-Res Export
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                                        <p className="flex-auto">Download crisp, high-resolution PNGs ready for immediate sharing on any platform.</p>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t border-border py-12 text-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} Postly. Made with ❤️ by ZenPay Team.</p>
            </footer>
        </div>
    );
};
