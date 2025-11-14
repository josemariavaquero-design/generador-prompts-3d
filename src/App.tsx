import React, { useRef, useState, useEffect, useCallback } from 'react';
import { usePromptGenerator } from './hooks/usePromptGenerator';
import { CONTROL_SECTIONS, SIMPLE_CONTROL_SECTIONS } from './constants';
import Viewer from './components/Viewer';
import ControlCard from './components/ControlCard';
import OutputPanel from './components/OutputPanel';
import Header from './components/Header';
import ActionButtons from './components/ActionButtons';
import ApiKeyOverlay from './components/ApiKeyOverlay';

// AI Studio functions may not exist in all environments
// FIX: The global declaration for window.aistudio has been moved to src/vite-env.d.ts to resolve type conflicts.

export default function App(): React.ReactElement {
  const [isApiKeySelected, setIsApiKeySelected] = useState(false);
  
  const { 
    state, 
    dispatch, 
    generatedPrompts, 
    handleRandomize, 
    handleReset,
    handleGenerateImage,
    handleRandomizeSection,
    imageUrl,
    isGeneratingImage,
    generationError
  } = usePromptGenerator(setIsApiKeySelected);
  
  const outputPanelRef = useRef<HTMLDivElement>(null);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ [CONTROL_SECTIONS[0].title]: true });
  const [mode, setMode] = useState<'simple' | 'detailed'>('detailed');

  useEffect(() => {
    const checkApiKey = async () => {
        if (window.aistudio) {
            const hasKey = await window.aistudio.hasSelectedApiKey();
            setIsApiKeySelected(hasKey);
        } else {
            // Fallback for environments where aistudio is not available
            console.warn("aistudio environment not detected. API key functionality will be limited.");
            // For local dev without the aistudio SDK, we can assume a key is present via .env
            setIsApiKeySelected(true); 
        }
    };
    checkApiKey();
  }, []);

  const handleSelectKey = useCallback(async () => {
      if (window.aistudio) {
          await window.aistudio.openSelectKey();
          // Optimistically set to true to handle race condition
          setIsApiKeySelected(true);
      }
  }, []);

  const handleToggleSection = (title: string) => {
    setOpenSections(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const handleScrollToPrompts = () => {
      outputPanelRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sectionsToShow = mode === 'detailed' ? CONTROL_SECTIONS : SIMPLE_CONTROL_SECTIONS;

  return (
    <>
      {!isApiKeySelected && <ApiKeyOverlay onSelectKey={handleSelectKey} />}
      <div className={`bg-gray-900 min-h-screen text-gray-200 font-sans p-4 sm:p-6 lg:p-8 ${!isApiKeySelected ? 'blur-sm pointer-events-none' : ''}`}>
        <div className="max-w-screen-2xl mx-auto">
          <Header />
          
          <main className="grid grid-cols-1 md:grid-cols-5 gap-6">
            
            {/* Columna Izquierda (Visor y Acciones) */}
            <div className="md:col-span-2 space-y-6">
              <ControlCard title="Visor de IA">
                <Viewer 
                  imageUrl={imageUrl} 
                  isGeneratingImage={isGeneratingImage} 
                  generationError={generationError}
                />
              </ControlCard>
              <ControlCard title="Acciones">
                <ActionButtons 
                  mode={mode}
                  onGenerateImage={handleGenerateImage} 
                  onRandomize={handleRandomize} 
                  onReset={handleReset}
                  onScrollToPrompts={handleScrollToPrompts}
                />
              </ControlCard>
              <div ref={outputPanelRef}>
                  <ControlCard title="Prompts Generados">
                      <OutputPanel prompts={generatedPrompts} />
                  </ControlCard>
              </div>
            </div>
            
            {/* Columna Derecha (Controles) */}
            <div className="md:col-span-3 space-y-6">
              {/* Mode Selector */}
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-2 flex items-center space-x-2">
                  <button
                      onClick={() => setMode('simple')}
                      className={`flex-1 text-center font-semibold py-2 rounded-lg transition-colors duration-200 ${mode === 'simple' ? 'bg-purple-600 text-white shadow-md' : 'bg-transparent text-gray-400 hover:bg-gray-700/50'}`}
                  >
                      Sencillo
                  </button>
                  <button
                      onClick={() => setMode('detailed')}
                      className={`flex-1 text-center font-semibold py-2 rounded-lg transition-colors duration-200 ${mode === 'detailed' ? 'bg-purple-600 text-white shadow-md' : 'bg-transparent text-gray-400 hover:bg-gray-700/50'}`}
                  >
                      Detallado
                  </button>
              </div>
              
              {sectionsToShow.map((section) => (
                <ControlCard 
                  key={section.title} 
                  title={section.title}
                  isOpen={!!openSections[section.title]}
                  onToggle={() => handleToggleSection(section.title)}
                  isCollapsible={true}
                  onRandomize={() => handleRandomizeSection(section.title)}
                >
                  <div className={`grid grid-cols-1 sm:grid-cols-${section.columns} gap-4`}>
                    {section.controls.map((control) => {
                      if (control.condition && !control.condition(state)) {
                          return null;
                      }
                      const ControlComponent = control.component;
                      return <ControlComponent key={control.id} {...control} state={state} dispatch={dispatch} />;
                    })}
                  </div>
                </ControlCard>
              ))}
            </div>
          </main>
          
          <footer className="text-center mt-12 pb-4 text-gray-500">
            <p>&copy; 2024 Generador Avanzado de Prompts 3D. Derechos Reservados.</p>
          </footer>
        </div>
      </div>
    </>
  );
}