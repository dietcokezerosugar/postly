import React, { useRef } from 'react';
import { toPng } from 'html-to-image';
import { useStore } from '../store';
import { InstagramPost, FacebookPost, LinkedInPost, XPost } from './PlatformPreviews';
import { Button } from './ui-lib';

export const PreviewPanel = () => {
  const { platform, author, content, metrics, appearance } = useStore();
  const previewRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = React.useState(false);

  const handleExport = async () => {
    if (!previewRef.current) {
      alert("Preview not ready.");
      return;
    }

    // Find the actual post element - it's the first child div (the post component itself)
    const postElement = previewRef.current.querySelector(':scope > div') as HTMLElement;

    if (!postElement) {
      alert("Could not find preview element to export.");
      return;
    }

    setIsExporting(true);

    try {
      // Small delay to ensure everything is fully rendered
      await new Promise(resolve => setTimeout(resolve, 100));

      const dataUrl = await toPng(postElement, {
        cacheBust: true,
        pixelRatio: 2, // 2x for Retina-like quality
        backgroundColor: appearance.transparentBackground ? undefined : (appearance.darkMode ? '#000000' : '#ffffff'),
      });

      // Download
      const link = document.createElement('a');
      link.download = `postly-${platform}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();

    } catch (err) {
      console.error("Export failed:", err);
      alert("Failed to export image. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const renderPlatform = () => {
    const props = { author, content, metrics, appearance };
    switch (platform) {
      case 'instagram': return <InstagramPost {...props} />;
      case 'facebook': return <FacebookPost {...props} />;
      case 'linkedin': return <LinkedInPost {...props} />;
      case 'x': return <XPost {...props} />;
      default: return null;
    }
  };

  return (
    <div className="h-full bg-secondary/30 dark:bg-background relative flex flex-col overflow-hidden transition-colors duration-300">
      {/* Header for Preview Panel */}
      <div className="h-16 border-b border-border bg-background flex items-center justify-between px-6 shrink-0">
        <h3 className="font-medium text-foreground">Live Preview</h3>
        <Button onClick={handleExport} disabled={isExporting}>
          {isExporting ? 'Exporting...' : 'Download PNG'}
        </Button>
      </div>

      {/* Canvas Area */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-8 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat bg-slate-100/50 dark:bg-slate-900/50">
        <div className="transform transition-all duration-300 ease-in-out scale-100 origin-center">
          {/* Wrapper for capture that includes padding/shadow if needed */}
          <div
            ref={previewRef}
            className="p-8 shadow-2xl rounded-xl transition-colors duration-300"
            style={{ background: appearance.transparentBackground ? 'transparent' : 'transparent' }}
          >
            {renderPlatform()}
          </div>
        </div>
      </div>

      {/* Floating hints */}
      <div className="absolute bottom-6 left-6 text-xs text-muted-foreground">
        Preview scales automatically to fit
      </div>
    </div>
  );
};