import React from 'react';
import {
  Tabs, TabsList, TabsTrigger,
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  Label, Input, Textarea, Switch, Button, Separator
} from './ui-lib';
import { useStore } from '../store';
import { Platform } from '../types';

interface ControlPanelProps {
  onUpgradeTrigger: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ onUpgradeTrigger }) => {
  const {
    platform, author, content, metrics, appearance, isPro,
    setPlatform, updateAuthor, updateContent, updateMetrics, updateAppearance
  } = useStore();

  const [openAccordion, setOpenAccordion] = React.useState<string | null>("author");
  const [uploading, setUploading] = React.useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'profile' | 'post') => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setUploading(true);
        // Use local preview immediately for better UX while uploading?
        // For now, let's just upload. Or maybe do both?
        // Let's do direct upload to ensure persistence first.
        const { uploadImage } = await import('../src/lib/supabase'); // Dynamic import to avoid circular dependency issues if any
        const url = await uploadImage(file);

        if (field === 'profile') updateAuthor({ profilePicture: url });
        else updateContent({ image: url });
      } catch (error) {
        console.error('Upload failed:', error);
        alert('Failed to upload image. Please try again.');
      } finally {
        setUploading(false);
      }
    }
  };

  const handleProFeature = (action: () => void) => {
    if (isPro) {
      action();
    } else {
      onUpgradeTrigger();
    }
  };

  const accordionItems = [
    { id: 'author', title: 'Author Info' },
    { id: 'content', title: 'Post Content' },
    { id: 'metrics', title: 'Engagement Metrics' },
    { id: 'appearance', title: 'Appearance' },
  ];

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  const ProLock = () => (
    <div className="flex items-center text-xs text-amber-500 font-medium ml-2 cursor-pointer" onClick={onUpgradeTrigger}>
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
      PRO
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-background border-r border-border overflow-y-auto">
      <div className="p-6 pb-4 border-b border-border">
        <h2 className="text-lg font-semibold tracking-tight mb-4">Configuration</h2>
        <Tabs value={platform} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            {(['instagram', 'facebook', 'linkedin', 'x'] as Platform[]).map((p) => (
              <TabsTrigger
                key={p}
                value={p}
                activeValue={platform}
                onClick={() => setPlatform(p)}
                className="capitalize"
              >
                {p === 'x' ? 'X' : p}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <Accordion className="w-full px-6 py-2">
        {/* Author Section */}
        <AccordionItem>
          <AccordionTrigger isOpen={openAccordion === 'author'} onClick={() => toggleAccordion('author')}>
            Author Details
          </AccordionTrigger>
          <AccordionContent isOpen={openAccordion === 'author'}>
            <div className="space-y-4 pt-2">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  value={author.displayName}
                  onChange={(e) => updateAuthor({ displayName: e.target.value })}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={author.username}
                  onChange={(e) => updateAuthor({ username: e.target.value })}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="jobTitle">Job Title (LinkedIn)</Label>
                <Input
                  id="jobTitle"
                  value={author.jobTitle}
                  onChange={(e) => updateAuthor({ jobTitle: e.target.value })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Label htmlFor="verified">Verified Badge</Label>
                  {!isPro && <ProLock />}
                </div>
                <Switch
                  id="verified"
                  checked={author.verified}
                  onCheckedChange={(c) => handleProFeature(() => updateAuthor({ verified: c }))}
                // We don't strictly disable it to allow the click to trigger the modal check, 
                // but we could also disable and use a wrapper for the click.
                // For better UX, let the switch be clickable but intercept the change.
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="avatar">Profile Picture</Label>
                <Input id="avatar" type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'profile')} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Content Section */}
        <AccordionItem>
          <AccordionTrigger isOpen={openAccordion === 'content'} onClick={() => toggleAccordion('content')}>
            Post Content
          </AccordionTrigger>
          <AccordionContent isOpen={openAccordion === 'content'}>
            <div className="space-y-4 pt-2">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="caption">Caption</Label>
                <Textarea
                  id="caption"
                  className="min-h-[100px]"
                  value={content.caption}
                  onChange={(e) => updateContent({ caption: e.target.value })}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="postImage">Post Image</Label>
                <div className="flex gap-2 items-center">
                  <Input id="postImage" type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'post')} />
                  {content.image && (
                    <Button variant="outline" size="sm" onClick={() => updateContent({ image: null })}>Remove</Button>
                  )}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Metrics Section */}
        <AccordionItem>
          <AccordionTrigger isOpen={openAccordion === 'metrics'} onClick={() => toggleAccordion('metrics')}>
            Metrics
          </AccordionTrigger>
          <AccordionContent isOpen={openAccordion === 'metrics'}>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="grid items-center gap-1.5">
                <Label>Likes</Label>
                <Input type="number" value={metrics.likes} onChange={(e) => updateMetrics({ likes: parseInt(e.target.value) || 0 })} />
              </div>
              <div className="grid items-center gap-1.5">
                <Label>Comments</Label>
                <Input type="number" value={metrics.comments} onChange={(e) => updateMetrics({ comments: parseInt(e.target.value) || 0 })} />
              </div>
              <div className="grid items-center gap-1.5">
                <Label>Shares/Reposts</Label>
                <Input type="number" value={metrics.shares} onChange={(e) => updateMetrics({ shares: parseInt(e.target.value) || 0 })} />
              </div>
              <div className="grid items-center gap-1.5">
                <Label>Views</Label>
                <Input type="number" value={metrics.views} onChange={(e) => updateMetrics({ views: parseInt(e.target.value) || 0 })} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Appearance Section */}
        <AccordionItem>
          <AccordionTrigger isOpen={openAccordion === 'appearance'} onClick={() => toggleAccordion('appearance')}>
            Appearance
          </AccordionTrigger>
          <AccordionContent isOpen={openAccordion === 'appearance'}>
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center">
                    <Label htmlFor="darkMode">Mockup Dark Mode</Label>
                    {!isPro && <ProLock />}
                  </div>
                  <span className="text-xs text-muted-foreground">Applies dark theme to the generated post</span>
                </div>
                <Switch
                  id="darkMode"
                  checked={appearance.darkMode}
                  onCheckedChange={(c) => handleProFeature(() => updateAppearance({ darkMode: c }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center">
                    <Label htmlFor="transparentBg">Transparent Background</Label>
                    {!isPro && <ProLock />}
                  </div>
                  <span className="text-xs text-muted-foreground">Remove background for easy export</span>
                </div>
                <Switch
                  id="transparentBg"
                  checked={appearance.transparentBackground}
                  onCheckedChange={(c) => handleProFeature(() => updateAppearance({ transparentBackground: c }))}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <div className="pt-6">
          <Separator className="mb-4" />
          <div className="text-xs text-muted-foreground">
            Postly MVP v1.0 • Client-side generation
          </div>
        </div>

      </Accordion>
    </div>
  );
};