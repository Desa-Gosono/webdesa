import React, { useState } from 'react';
import { Share2, Printer, Bookmark, BookmarkCheck, Link as LinkIcon, Check } from 'lucide-react';
import { FaFacebook, FaTwitter } from 'react-icons/fa';

export function SharePrintBookmark() {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // In a real app, this would save to local storage or user profile
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = encodeURIComponent(window.location.href);

  return (
    <div className="flex items-center gap-2 mb-6">
      <div className="relative">
        <button 
          onClick={() => setShowShareMenu(!showShareMenu)}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
        >
          <Share2 className="w-4 h-4" /> Share
        </button>
        
        {showShareMenu && (
          <div className="absolute top-full mt-2 left-0 w-48 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-2 z-10 flex flex-col gap-1">
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg">
              <FaFacebook className="w-4 h-4 text-blue-600" /> Facebook
            </a>
            <a href={`https://twitter.com/intent/tweet?url=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg">
              <FaTwitter className="w-4 h-4 text-blue-400" /> Twitter
            </a>
            <button onClick={copyLink} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-lg w-full text-left">
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <LinkIcon className="w-4 h-4" />}
              {copied ? 'Tersalin!' : 'Copy Link'}
            </button>
          </div>
        )}
      </div>

      <button 
        onClick={handlePrint}
        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
      >
        <Printer className="w-4 h-4" /> Print
      </button>
      
      <button 
        onClick={handleBookmark}
        className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
          isBookmarked 
          ? 'text-primary bg-primary/10 hover:bg-primary/20' 
          : 'text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
        }`}
      >
        {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />} 
        {isBookmarked ? 'Tersimpan' : 'Simpan'}
      </button>
    </div>
  );
}
