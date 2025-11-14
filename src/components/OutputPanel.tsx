import React, { useState, useCallback } from 'react';
import Toast from './Toast';

interface OutputPanelProps {
  prompts: {
    es: string;
    en: string;
  };
}

const GeminiIcon: React.FC = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L9.17 9.17L2 12l7.17 2.83L12 22l2.83-7.17L22 12l-7.17-2.83L12 2z"/>
        <path d="M5 5L3.5 8.5L0 10l3.5 1.5L5 15l1.5-3.5L10 10l-3.5-1.5L5 5z"/>
    </svg>
);

const ChatGptIcon: React.FC = () => (
    <svg width="18" height="18" viewBox="0 0 41 41" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M35.2156 17.4334C35.2156 16.4632 34.4216 15.6692 33.4514 15.6692C32.4812 15.6692 31.6872 16.4632 31.6872 17.4334V20.1009C31.6872 20.5057 31.5273 20.8955 31.2407 21.1821L26.3314 26.0914C24.7823 27.6405 22.6109 28.5323 20.306 28.5323C15.5991 28.5323 11.751 24.7229 11.751 19.9773C11.751 15.2704 15.5604 11.4223 20.306 11.4223C22.6109 11.4223 24.7823 12.3141 26.3314 13.8632L28.1105 15.6423C28.4358 15.9676 28.9734 15.9676 29.2987 15.6423L31.202 13.739C31.5273 13.4137 31.5273 12.8761 31.202 12.5508L29.2987 10.6475C27.0325 8.38131 23.8242 7.04785 20.306 7.04785C13.292 7.04785 7.43701 12.9028 7.43701 19.9773C7.43701 27.0519 13.292 32.9069 20.306 32.9069C23.8242 32.9069 27.0325 31.5734 29.2987 29.2987L34.208 24.3894C34.7843 23.8131 35.1383 23.0964 35.2156 22.3024V17.4334Z"></path>
      <path d="M20.2673 24.2185C23.9427 24.2185 26.9209 21.2403 26.9209 17.5649C26.9209 13.8895 23.9427 10.9114 20.2673 10.9114C16.5919 10.9114 13.6138 13.8895 13.6138 17.5649C13.6138 21.2403 16.5919 24.2185 20.2673 24.2185Z"></path>
      <path d="M5.59609 23.4812C5.59609 24.4514 6.39009 25.2454 7.36029 25.2454C8.33049 25.2454 9.12449 24.4514 9.12449 23.4812V20.8137C9.12449 20.4089 9.28439 20.0191 9.57102 19.7325L14.4803 14.8232C15.352 13.9515 15.352 12.5508 14.4803 11.6791L12.6042 9.80299C12.2789 9.47769 11.7413 9.47769 11.416 9.80299L9.51269 11.7063C9.18739 12.0316 9.18739 12.5692 9.51269 12.8945L11.416 14.7978C12.015 15.3968 12.015 16.367 11.416 16.966L6.50669 21.8753C5.93039 22.4516 5.59609 22.9505 5.59609 23.4812Z"></path>
    </svg>
);

const GrokIcon: React.FC = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
);


const OutputPanel: React.FC<OutputPanelProps> = ({ prompts }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCopy = useCallback((text: string, message: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setToastMessage(message);
      setTimeout(() => setToastMessage(null), 2000);
    });
  }, []);
  
  const handleOpenIn = useCallback((platform: 'gemini' | 'chatgpt' | 'grok', text: string) => {
    switch(platform) {
        case 'gemini': {
            const url = `https://gemini.google.com/app?prompt=${encodeURIComponent(text)}`;
            window.open(url, '_blank', 'noopener,noreferrer');
            break;
        }
        case 'chatgpt': {
             navigator.clipboard.writeText(text).then(() => {
                setToastMessage('Prompt copiado! Abriendo ChatGPT...');
                setTimeout(() => setToastMessage(null), 2500);
                window.open('https://chat.openai.com', '_blank', 'noopener,noreferrer');
            });
            break;
        }
        case 'grok': {
            navigator.clipboard.writeText(text).then(() => {
                setToastMessage('Prompt copiado! Abriendo Grok...');
                setTimeout(() => setToastMessage(null), 2500);
                window.open('https://x.com/grok', '_blank', 'noopener,noreferrer');
            });
            break;
        }
    }
  }, []);

  return (
    <>
      <div id="output-panel" className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-400 mb-1">ESPAÑOL (clic para copiar)</h3>
          <div 
            className="bg-black/30 p-3 rounded-lg text-sm text-gray-300 font-mono break-words cursor-pointer min-h-[96px] transition hover:bg-black/50"
            onClick={() => handleCopy(prompts.es, 'Prompt en español copiado!')}
          >
            {prompts.es}
          </div>
           <div className="mt-2.5">
            <h4 className="text-xs font-semibold text-gray-500 mb-1.5">ABRIR EN:</h4>
            <div className="flex items-center gap-3">
                <button onClick={() => handleOpenIn('gemini', prompts.es)} title="Abrir en Gemini" className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white transition-all duration-200" aria-label="Abrir en Gemini"><GeminiIcon /></button>
                <button onClick={() => handleOpenIn('chatgpt', prompts.es)} title="Copiar y abrir en ChatGPT" className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white transition-all duration-200" aria-label="Copiar y abrir en ChatGPT"><ChatGptIcon /></button>
                <button onClick={() => handleOpenIn('grok', prompts.es)} title="Copiar y abrir en Grok" className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white transition-all duration-200" aria-label="Copiar y abrir en Grok"><GrokIcon /></button>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-400 mb-1">ENGLISH (click to copy)</h3>
          <div 
            className="bg-black/30 p-3 rounded-lg text-sm text-gray-300 font-mono break-words cursor-pointer min-h-[96px] transition hover:bg-black/50"
            onClick={() => handleCopy(prompts.en, 'English prompt copied!')}
          >
            {prompts.en}
          </div>
           <div className="mt-2.5">
            <h4 className="text-xs font-semibold text-gray-500 mb-1.5">OPEN IN:</h4>
            <div className="flex items-center gap-3">
                <button onClick={() => handleOpenIn('gemini', prompts.en)} title="Open in Gemini" className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white transition-all duration-200" aria-label="Open in Gemini"><GeminiIcon /></button>
                <button onClick={() => handleOpenIn('chatgpt', prompts.en)} title="Copy & Open in ChatGPT" className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white transition-all duration-200" aria-label="Copy & Open in ChatGPT"><ChatGptIcon /></button>
                <button onClick={() => handleOpenIn('grok', prompts.en)} title="Copy & Open in Grok" className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white transition-all duration-200" aria-label="Copy & Open in Grok"><GrokIcon /></button>
            </div>
          </div>
        </div>
      </div>
      <Toast message={toastMessage} />
    </>
  );
};

export default OutputPanel;