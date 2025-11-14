
import React, { useState, useEffect, useCallback } from 'react';
import { usePromptGenerator } from './hooks/usePromptGenerator';
import { CONTROL_SECTIONS } from './constants';
import Viewer from './components/Viewer';
import ControlCard from './components/ControlCard';
import OutputPanel from './components/OutputPanel';
import Header from './components/Header';
import ActionButtons from './components/ActionButtons';

export default function App(): React.ReactElement {
  const { state, dispatch, generatedPrompts, handleRandomize, handleGenerate } = usePromptGenerator();
  const [selectedObjectIndex, setSelectedObjectIndex] = useState<number>(0);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const handleToggleSection = (title: string) => {
    setOpenSections(prev => ({ ...prev, [title]: !prev[title] }));
  };


  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Prevent keyboard controls when typing in an input
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement) {
        return;
    }
      
    if (selectedObjectIndex === null) return;

    const step = event.shiftKey ? 1 : 0.1;
    let handled = false;

    switch (event.key) {
      case 'ArrowUp':
        if (event.shiftKey) {
            dispatch({ type: 'SET_VALUE', payload: { key: 'posZ', value: parseFloat((state.posZ + step).toFixed(2)) } });
        } else {
            dispatch({ type: 'SET_VALUE', payload: { key: 'posY', value: parseFloat((state.posY - step).toFixed(2)) } });
        }
        handled = true;
        break;
      case 'ArrowDown':
        if (event.shiftKey) {
            dispatch({ type: 'SET_VALUE', payload: { key: 'posZ', value: parseFloat((state.posZ - step).toFixed(2)) } });
        } else {
            dispatch({ type: 'SET_VALUE', payload: { key: 'posY', value: parseFloat((state.posY + step).toFixed(2)) } });
        }
        handled = true;
        break;
      case 'ArrowLeft':
        dispatch({ type: 'SET_VALUE', payload: { key: 'posX', value: parseFloat((state.posX - step).toFixed(2)) } });
        handled = true;
        break;
      case 'ArrowRight':
        dispatch({ type: 'SET_VALUE', payload: { key: 'posX', value: parseFloat((state.posX + step).toFixed(2)) } });
        handled = true;
        break;
    }

    if (handled) {
      event.preventDefault();
    }
  }, [selectedObjectIndex, dispatch, state.posX, state.posY, state.posZ]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  
  // Ensure selected object index is valid when object count changes
  useEffect(() => {
    if (selectedObjectIndex >= state.gCount) {
        setSelectedObjectIndex(Math.max(0, state.gCount - 1));
    }
  }, [state.gCount, selectedObjectIndex]);


  return (
    <div className="bg-gray-900 min-h-screen text-gray-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="lg:col-span-1">
            <ControlCard title="Real-time Viewer">
                <Viewer 
                  state={state} 
                  selectedObjectIndex={selectedObjectIndex}
                  setSelectedObjectIndex={setSelectedObjectIndex}
                />
            </ControlCard>
          </div>
          <div className="lg:col-span-1 space-y-6">
             <ControlCard title="Actions">
                <ActionButtons onGenerate={handleGenerate} onRandomize={handleRandomize} />
             </ControlCard>
             <ControlCard title="Generated Prompts">
                <OutputPanel prompts={generatedPrompts} />
             </ControlCard>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {CONTROL_SECTIONS.map((section) => (
            <ControlCard 
                key={section.title} 
                title={section.title}
                isOpen={!!openSections[section.title]}
                onToggle={() => handleToggleSection(section.title)}
                isCollapsible={true}
            >
              <div className={`grid grid-cols-1 ${section.columns === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} gap-4`}>
                {section.controls.map((control) => {
                  const ControlComponent = control.component;
                  return <ControlComponent key={control.id} {...control} state={state} dispatch={dispatch} />;
                })}
              </div>
            </ControlCard>
          ))}
        </div>
        
        <footer className="text-center mt-12 pb-4 text-gray-500">
          <p>&copy; 2024 Advanced 3D Prompt Generator. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}