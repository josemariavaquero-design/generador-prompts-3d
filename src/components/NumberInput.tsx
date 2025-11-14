import React, { useCallback } from 'react';
import type { PromptState, Action } from '../types';

interface NumberInputProps {
  id: keyof PromptState;
  label: string;
  state: PromptState;
  dispatch: React.Dispatch<Action>;
  min?: number;
  max?: number;
  step?: number;
  colSpan?: number;
}

const NumberInput: React.FC<NumberInputProps> = ({ id, label, state, dispatch, min, max, step, colSpan = 1 }) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_VALUE', payload: { key: id, value: parseFloat(e.target.value) } });
  }, [dispatch, id]);

  return (
    <div className={`col-span-1 sm:col-span-${colSpan}`}>
      <label htmlFor={id} className="block text-xs font-medium text-gray-400 mb-1.5">
        {label}
      </label>
      <input
        type="number"
        id={id}
        name={id}
        value={state[id] as number}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        className="w-full bg-gray-900/70 border border-gray-600 rounded-lg py-2 px-3 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
      />
    </div>
  );
};

export default NumberInput;