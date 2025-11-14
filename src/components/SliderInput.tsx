import React, { useCallback } from 'react';
import type { PromptState, Action } from '../types';

interface SliderInputProps {
  id: keyof PromptState;
  label: string;
  state: PromptState;
  dispatch: React.Dispatch<Action>;
  min?: number;
  max?: number;
  step?: number;
  colSpan?: number;
}

const SliderInput: React.FC<SliderInputProps> = ({ id, label, state, dispatch, min = 0, max = 100, step = 1, colSpan = 1 }) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_VALUE', payload: { key: id, value: parseFloat(e.target.value) } });
  }, [dispatch, id]);

  return (
    <div className={`col-span-1 sm:col-span-${colSpan} space-y-2`}>
      <label htmlFor={`${id}-number`} className="flex justify-between items-center text-xs font-medium text-gray-400">
        <span>{label}</span>
        <input
          id={`${id}-number`}
          type="number"
          value={state[id] as number}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          className="w-20 bg-gray-900/70 border border-gray-600 rounded-md py-1 px-2 text-gray-200 text-right focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
        />
      </label>
      <input
        type="range"
        id={id}
        name={id}
        value={state[id] as number}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        style={{accentColor: '#a855f7'}}
      />
    </div>
  );
};

export default SliderInput;