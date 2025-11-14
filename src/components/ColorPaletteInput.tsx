import React, { useCallback } from 'react';
import type { PromptState, Action } from '../types';

interface ColorOption {
  id: string;
  es: string;
  en: string;
  hex: string;
}

interface ColorPaletteInputProps {
  id: keyof PromptState;
  label: string;
  options: ColorOption[];
  state: PromptState;
  dispatch: React.Dispatch<Action>;
  colSpan?: number;
}

const ColorPaletteInput: React.FC<ColorPaletteInputProps> = ({ id, label, options, state, dispatch, colSpan = 2 }) => {
  const selectedValue = state[id];

  const handleSelect = useCallback((value: string) => {
    dispatch({ type: 'SET_VALUE', payload: { key: id, value } });
  }, [dispatch, id]);

  return (
    <div className={`col-span-1 sm:col-span-${colSpan}`}>
      <label className="block text-xs font-medium text-gray-400 mb-2">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => handleSelect(option.id)}
            className={`w-8 h-8 rounded-full transition-transform duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 ${selectedValue === option.id ? 'ring-2 ring-offset-2 ring-offset-gray-900 ring-white' : ''}`}
            style={{ backgroundColor: option.hex }}
            title={option.es}
            aria-label={option.es}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPaletteInput;