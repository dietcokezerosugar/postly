import React from 'react';
import { AuthorConfig, PostContent, MetricsConfig, AppearanceConfig } from '../types';
import { cn } from './ui-lib';

interface PreviewProps {
  author: AuthorConfig;
  content: PostContent;
  metrics: MetricsConfig;
  appearance: AppearanceConfig;
}

// --- Icons ---
const VerifiedIcon = () => (
  <svg viewBox="0 0 24 24" aria-label="Verified" className="w-4 h-4 text-blue-500 fill-current shrink-0">
    <g><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .495.083.965.238 1.4-1.272.65-2.147 2.02-2.147 3.6 0 1.432.716 2.69 1.796 3.457-.165.41-.256.86-.256 1.33 0 2.22 1.766 4.02 3.94 4.02.57 0 1.115-.125 1.615-.353C9.337 22.215 10.597 23 12 23s2.662-.785 3.37-1.996c.5.228 1.045.353 1.614.353 2.175 0 3.94-1.8 3.94-4.02 0-.47-.09-.92-.257-1.33 1.08-.767 1.797-2.025 1.797-3.457zM12 15.918l-3.535-3.535 1.414-1.414 2.12 2.12 4.243-4.242 1.415 1.415L12 15.918z"></path></g>
  </svg>
);

// --- Instagram ---
export const InstagramPost: React.FC<PreviewProps> = ({ author, content, metrics, appearance }) => {
  return (
    <div className={cn("w-full max-w-[400px] bg-white border border-gray-200 rounded-sm font-sans", appearance.darkMode && "bg-black text-white border-gray-800")}>
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <div className="p-[2px] bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-full shrink-0">
            <img src={author.profilePicture || ""} alt="avatar" className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 object-cover block" />
          </div>
          <div className="flex flex-col justify-center">
            {/* Replaced gap-1 with mr-1 for html2canvas stability */}
            <div className="flex items-center">
              <span className="text-sm font-semibold leading-tight mr-1">{author.username}</span>
              {author.verified && <VerifiedIcon />}
            </div>
            {author.jobTitle && <span className="text-xs text-gray-500 leading-tight mt-0.5">{author.jobTitle}</span>}
          </div>
        </div>
        <svg aria-label="More options" className={cn("w-6 h-6 shrink-0", appearance.darkMode ? "text-white" : "text-black")} fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
      </div>

      {/* Image */}
      {content.image && (
        <div className="w-full aspect-square bg-gray-100 overflow-hidden relative">
          <img src={content.image} alt="Post content" className="w-full h-full object-cover block" />
        </div>
      )}

      {/* Actions */}
      <div className="p-3">
        <div className="flex justify-between mb-2">
          <div className="flex gap-4">
            <svg aria-label="Like" className={cn("w-6 h-6 hover:opacity-50 cursor-pointer shrink-0", appearance.darkMode ? "text-white" : "text-black")} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            <svg aria-label="Comment" className={cn("w-6 h-6 hover:opacity-50 cursor-pointer shrink-0", appearance.darkMode ? "text-white" : "text-black")} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            <svg aria-label="Share Post" className={cn("w-6 h-6 hover:opacity-50 cursor-pointer shrink-0", appearance.darkMode ? "text-white" : "text-black")} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </div>
          <svg aria-label="Save" className={cn("w-6 h-6 hover:opacity-50 cursor-pointer shrink-0", appearance.darkMode ? "text-white" : "text-black")} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
        </div>

        {/* Likes */}
        <div className="font-semibold text-sm mb-1">{metrics.likes.toLocaleString()} likes</div>

        {/* Caption */}
        <div className="text-sm mb-1 leading-snug">
          <span className="font-semibold mr-2">{author.username}</span>
          <span dangerouslySetInnerHTML={{ __html: content.caption.replace(/\n/g, '<br/>') }} />
        </div>

        {/* Comments Link */}
        <div className="text-gray-500 text-sm mb-1 cursor-pointer">View all {metrics.comments} comments</div>

        {/* Timestamp */}
        <div className="text-[10px] text-gray-400 uppercase tracking-wide">36 MINUTES AGO</div>
      </div>
    </div>
  );
};

// --- Facebook ---
export const FacebookPost: React.FC<PreviewProps> = ({ author, content, metrics, appearance }) => {
  return (
    <div className={cn("w-full max-w-[500px] bg-white rounded-lg shadow-sm font-sans", appearance.darkMode && "bg-[#242526] text-[#E4E6EB] shadow-none")}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-2">
        <div className="flex items-center gap-2">
          <img src={author.profilePicture || ""} alt="avatar" className="w-10 h-10 rounded-full bg-gray-200 object-cover shrink-0 block" />
          <div className="leading-tight flex flex-col justify-center">
            {/* Use margins instead of gap */}
            <div className="font-semibold text-[15px] flex items-center">
              <span className="mr-1">{author.displayName}</span>
              {author.verified && <VerifiedIcon />}
            </div>
            <div className="text-xs text-gray-500 flex items-center mt-0.5">
              <span className="mr-1">36m</span>
              <span className="mr-1">·</span>
              <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" className="text-gray-500 shrink-0"><title>Shared with Public</title><g><path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z"></path><path d="M7.907 10.957A5.008 5.008 0 014.28 8.652c.264.444.577.854.928 1.216.592.61 1.303 1.088 2.699 1.088zm4.735-3.15c-.26-.432-.563-.829-.903-1.184-.582-.607-1.277-1.08-2.637-1.08-1.554 0-2.327.618-2.88 1.185-.563.578-.853 1.08-1.08 1.08-.225 0-.58-.396-1.125-1.185a.78.78 0 01.034-.963c.697-.88 1.942-1.621 3.518-1.621 1.63 0 2.87.828 3.535 1.706.136.18.324.28.528.28.16 0 .317-.062.433-.18a.73.73 0 01.58-.23c.238 0 .438.106.582.269.13.148.16.35.08.54a5.24 5.24 0 01-.161.383zM8 12.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9z"></path></g></svg>
            </div>
          </div>
        </div>
        <div className="text-gray-500">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" className="shrink-0"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>
        </div>
      </div>

      {/* Caption */}
      <div className="px-4 pb-2 text-[15px] whitespace-pre-wrap leading-normal">
        {content.caption}
      </div>

      {/* Image */}
      {content.image && (
        <div className="w-full bg-gray-100">
          <img src={content.image} alt="Post content" className="w-full h-auto max-h-[600px] object-cover block" />
        </div>
      )}

      {/* Metrics Row */}
      <div className="px-4 py-2 flex justify-between items-center text-gray-500 text-[13px] border-b border-gray-200 dark:border-gray-700 mx-0">
        <div className="flex items-center gap-1">
          <div className="flex -space-x-1">
            <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center border-2 border-white dark:border-[#242526] shrink-0">
              <svg className="w-2.5 h-2.5 text-white fill-current" viewBox="0 0 16 16"><path d="M8.854 11.146l-4-4a.5.5 0 01.708-.708L8.5 9.293l3.646-3.647a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0z" transform="rotate(180 8 8)" /></svg>
            </div>
            <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center border-2 border-white dark:border-[#242526] shrink-0">
              <svg className="w-2.5 h-2.5 text-white fill-current" viewBox="0 0 16 16"><path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13z" /></svg>
            </div>
          </div>
          <span>{metrics.likes}</span>
        </div>
        <div className="flex gap-3">
          <span>{metrics.comments} comments</span>
          <span>{metrics.shares} shares</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-2 py-1 flex justify-between text-gray-500 font-medium text-[14px]">
        <div className="flex-1 flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 py-2 rounded-md cursor-pointer transition-colors">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="shrink-0"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
          Like
        </div>
        <div className="flex-1 flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 py-2 rounded-md cursor-pointer transition-colors">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="shrink-0"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>
          Comment
        </div>
        <div className="flex-1 flex items-center justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 py-2 rounded-md cursor-pointer transition-colors">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="shrink-0"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
          Share
        </div>
      </div>
    </div>
  );
};

// --- LinkedIn ---
export const LinkedInPost: React.FC<PreviewProps> = ({ author, content, metrics, appearance }) => {
  return (
    <div className={cn("w-full max-w-[500px] bg-white rounded-lg shadow-sm border border-gray-200 font-sans", appearance.darkMode && "bg-[#1D2226] text-white border-gray-700")}>
      {/* Header */}
      <div className="flex p-3 gap-3 mb-1">
        <img src={author.profilePicture || ""} alt="avatar" className="w-12 h-12 rounded-full object-cover shrink-0 block" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="font-semibold text-sm hover:underline hover:text-blue-600 cursor-pointer flex items-center flex-wrap">
              <span className="mr-1">{author.displayName}</span>
              <span className="font-normal text-gray-500 dark:text-gray-400 text-xs flex items-center"> • 2nd</span>
            </div>
            <button className="text-blue-600 font-semibold text-sm flex items-center hover:bg-blue-50 px-2 py-1 rounded transition-colors shrink-0">
              <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" className="mr-1 shrink-0"><path d="M14 9H9v5H7V9H2V7h5V2h2v5h5z"></path></svg>
              Follow
            </button>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 leading-tight">{author.jobTitle}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center leading-tight mt-0.5">
            <span className="mr-1">37m</span>
            <span className="mr-1">•</span>
            <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" className="shrink-0"><path d="M8 1a7 7 0 107 7 7 7 0 00-7-7zM3 8a5 5 0 011-3l.55.55A1.5 1.5 0 015 6.62v1.07a.75.75 0 00.22.53l.56.56a.75.75 0 00.53.22H7v.69a.75.75 0 00.22.53l.56.56a.75.75 0 01.22.53V13a5 5 0 01-5-5zm6.24 4.83l2-2.46a.75.75 0 00.09-.8l-.58-1.16A.76.76 0 0010 8H9.5v-.527-.403A1.465 1.465 0 019.4 6.786 1.442 1.442 0 009.6 6.362a.75.75 0 00-.22-.53l-.56-.56a.75.75 0 01-.22-.53V3.53a4.992 4.992 0 013.9 7.9 14.28 14.28 0 01-3.66 1.4z"></path></svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-2 text-sm whitespace-pre-wrap mb-2 leading-relaxed">
        {content.caption} <span className="text-gray-500 hover:underline cursor-pointer">...see more</span>
      </div>

      {/* Image */}
      {content.image && (
        <div className="w-full bg-gray-100">
          <img src={content.image} alt="Post content" className="w-full h-auto object-cover block" />
        </div>
      )}

      {/* Metrics */}
      <div className="mx-4 py-2 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1">
          <div className="flex -space-x-1 items-center">
            <img src="https://static.licdn.com/aero-v1/sc/h/8ekq8gho1ruaf8i7f86vd1ftt" alt="like" className="w-4 h-4 shrink-0" />
            <img src="https://static.licdn.com/aero-v1/sc/h/b1dl5jk88euc7e9ri50xy5qo8" alt="heart" className="w-4 h-4 shrink-0" />
            <img src="https://static.licdn.com/aero-v1/sc/h/cpho5fghnpbn5537j9k9p0d84" alt="clap" className="w-4 h-4 shrink-0" />
          </div>
          <span className="ml-1 hover:underline hover:text-blue-600 cursor-pointer">{metrics.likes}</span>
        </div>
        <div className="hover:underline hover:text-blue-600 cursor-pointer">
          {metrics.comments} comments • {metrics.retweets} reposts
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-2 py-1 flex justify-between">
        <div className="flex items-center gap-1.5 px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors cursor-pointer text-gray-600 dark:text-gray-300 font-semibold text-sm">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
          <span>Like</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors cursor-pointer text-gray-600 dark:text-gray-300 font-semibold text-sm">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          <span>Comment</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors cursor-pointer text-gray-600 dark:text-gray-300 font-semibold text-sm">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M17 1l4 4-4 4"></path><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><path d="M7 23l-4-4 4-4"></path><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
          <span>Repost</span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors cursor-pointer text-gray-600 dark:text-gray-300 font-semibold text-sm">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          <span>Send</span>
        </div>
      </div>
    </div>
  );
};

// --- X (Twitter) ---
export const XPost: React.FC<PreviewProps> = ({ author, content, metrics, appearance }) => {
  return (
    <div className={cn("w-full max-w-[500px] bg-white border border-gray-100 p-4 font-sans", appearance.darkMode && "bg-black text-[#E7E9EA] border-gray-800")}>
      <div className="flex gap-3">
        <img src={author.profilePicture || ""} alt="avatar" className="w-10 h-10 rounded-full object-cover shrink-0 block" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            {/* Replaced gap-1 with margins for better html2canvas rendering */}
            <div className="flex items-center truncate text-[15px]">
              <span className={cn("font-bold truncate mr-1", appearance.darkMode ? "text-[#E7E9EA]" : "text-gray-900")}>{author.displayName}</span>
              {author.verified && <div className="mr-1"><VerifiedIcon /></div>}
              <span className="text-gray-500 truncate mr-1">@{author.username}</span>
              <span className="text-gray-500 mx-1">·</span>
              <span className="text-gray-500 hover:underline">27m</span>
            </div>
            <div className="text-gray-500">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="shrink-0"><circle cx="12" cy="12" r="2"></circle><circle cx="19" cy="12" r="2"></circle><circle cx="5" cy="12" r="2"></circle></svg>
            </div>
          </div>

          <div className={cn("mt-1 text-[15px] whitespace-pre-wrap leading-normal", appearance.darkMode ? "text-[#E7E9EA]" : "text-gray-900")}>
            {content.caption}
          </div>

          {content.image && (
            <div className="mt-3 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
              <img src={content.image} alt="Post content" className="w-full h-auto object-cover block" />
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between mt-3 text-gray-500 w-full max-w-full">
            {/* Main Metrics Group */}
            <div className="flex items-center justify-between grow pr-8">
              {/* Reply */}
              <div className="flex items-center group cursor-pointer hover:text-blue-500 transition-colors">
                <div className="p-2 rounded-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors -ml-2">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="shrink-0"><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></svg>
                </div>
                <span className="text-[13px] ml-0.5">{metrics.replies}</span>
              </div>

              {/* Retweet */}
              <div className="flex items-center group cursor-pointer hover:text-green-500 transition-colors">
                <div className="p-2 rounded-full group-hover:bg-green-50 dark:group-hover:bg-green-900/20 transition-colors">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="shrink-0"><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path></svg>
                </div>
                <span className="text-[13px] ml-0.5">{metrics.retweets}</span>
              </div>

              {/* Like */}
              <div className="flex items-center group cursor-pointer hover:text-pink-600 transition-colors">
                <div className="p-2 rounded-full group-hover:bg-pink-50 dark:group-hover:bg-pink-900/20 transition-colors">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="shrink-0"><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.605 3.01.894 1.81.846 4.17-.514 6.67z"></path></svg>
                </div>
                <span className="text-[13px] ml-0.5">{metrics.likes}</span>
              </div>

              {/* Views */}
              <div className="flex items-center group cursor-pointer hover:text-blue-500 transition-colors">
                <div className="p-2 rounded-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="shrink-0"><g><path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"></path></g></svg>
                </div>
                <span className="text-[13px] ml-0.5">{metrics.views}</span>
              </div>
            </div>

            {/* Right Side Actions: Bookmark & Share */}
            <div className="flex items-center gap-1">
              {/* Bookmark */}
              <div className="flex items-center group cursor-pointer hover:text-blue-500 transition-colors">
                <div className="p-2 rounded-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="shrink-0"><path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"></path></svg>
                </div>
              </div>

              {/* Share */}
              <div className="flex items-center group cursor-pointer hover:text-blue-500 transition-colors">
                <div className="p-2 -mr-2 rounded-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="shrink-0"><g><path d="M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.12 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"></path></g></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};