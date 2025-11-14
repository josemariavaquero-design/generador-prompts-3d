
import React, { useState, useCallback } from 'react';
import Toast from './Toast';

interface OutputPanelProps {
  prompts: {
    es: string;
    en: string;
  };
}

const OutputPanel: React.FC<OutputPanelProps> = ({ prompts }) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCopy = useCallback((text: string, message: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setToastMessage(message);
      setTimeout(() => setToastMessage(null), 2000);
    });
  }, []);

  return (
    <>
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-400 mb-1">ESPAÑOL (clic para copiar)</h3>
          <div 
            className="bg-black/30 p-3 rounded-lg text-sm text-gray-300 font-mono break-words cursor-pointer min-h-[96px] transition hover:bg-black/50"
            onClick={() => handleCopy(prompts.es, 'Prompt en español copiado!')}
          >
            {prompts.es}
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
        </div>
      </div>
      <Toast message={toastMessage} />
    </>
  );
};

export default OutputPanel;