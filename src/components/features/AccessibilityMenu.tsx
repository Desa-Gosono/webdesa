import React, { useState, useEffect } from 'react';
import { Accessibility, Type, Contrast, Keyboard, X } from 'lucide-react';

export function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  
  // States for accessibility features
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    
    // Apply Text Size
    root.classList.remove('text-size-normal', 'text-size-large', 'text-size-xlarge');
    root.classList.add(`text-size-${textSize}`);
    if (textSize === 'large') document.body.style.fontSize = '110%';
    else if (textSize === 'xlarge') document.body.style.fontSize = '120%';
    else document.body.style.fontSize = '100%';

    // Apply Contrast
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [textSize, highContrast]);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {isOpen && (
        <div className="absolute bottom-16 left-0 w-64 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-4 mb-2 animate-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between mb-4 border-b pb-2 dark:border-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-white">Aksesibilitas</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <Type className="w-4 h-4" /> Ukuran Teks
              </p>
              <div className="flex gap-2">
                <button onClick={() => setTextSize('normal')} className={`flex-1 py-1 text-sm rounded border ${textSize === 'normal' ? 'bg-primary text-white' : 'border-gray-300 dark:border-gray-700'}`}>A</button>
                <button onClick={() => setTextSize('large')} className={`flex-1 py-1 text-base rounded border ${textSize === 'large' ? 'bg-primary text-white' : 'border-gray-300 dark:border-gray-700'}`}>A</button>
                <button onClick={() => setTextSize('xlarge')} className={`flex-1 py-1 text-lg rounded border ${textSize === 'xlarge' ? 'bg-primary text-white' : 'border-gray-300 dark:border-gray-700'}`}>A</button>
              </div>
            </div>

            <div>
              <button 
                onClick={() => setHighContrast(!highContrast)} 
                className={`w-full flex items-center justify-between p-2 rounded border ${highContrast ? 'bg-primary/10 border-primary text-primary' : 'border-gray-300 dark:border-gray-700'}`}
              >
                <span className="flex items-center gap-2 text-sm"><Contrast className="w-4 h-4" /> Kontras Tinggi</span>
                <div className={`w-8 h-4 rounded-full transition-colors ${highContrast ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-700'} relative`}>
                  <div className={`absolute top-0.5 left-0.5 bg-white w-3 h-3 rounded-full transition-transform ${highContrast ? 'translate-x-4' : ''}`}></div>
                </div>
              </button>
            </div>
            
            <div className="pt-2">
               <p className="text-xs text-gray-500 dark:text-gray-400 flex items-start gap-2">
                 <Keyboard className="w-4 h-4 flex-shrink-0" />
                 Mendukung navigasi keyboard menggunakan tombol Tab.
               </p>
            </div>
          </div>
        </div>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
        aria-label="Menu Aksesibilitas"
      >
        <Accessibility className="w-6 h-6" />
      </button>
      
      {/* Basic high-contrast styles injected if active */}
      {highContrast && (
        <style dangerouslySetInnerHTML={{__html: `
          .high-contrast * {
            color: #000 !important;
            border-color: #000 !important;
          }
          .high-contrast, .high-contrast div:not(.bg-primary), .high-contrast section {
            background-color: #fff !important;
          }
          .high-contrast a, .high-contrast button:not(.bg-primary) {
            text-decoration: underline !important;
            font-weight: bold !important;
          }
        `}} />
      )}
    </div>
  );
}
