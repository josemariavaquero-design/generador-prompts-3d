import React, { useCallback } from 'react';
import type { Option, PromptState, Action } from '../types';

interface SelectInputProps {
  id: keyof PromptState;
  label: string;
  options: Option[];
  state: PromptState;
  dispatch: React.Dispatch<Action>;
  colSpan?: number;
}

const SelectInput: React.FC<SelectInputProps> = ({ id, label, options, state, dispatch, colSpan = 1 }) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({ type: 'SET_VALUE', payload: { key: id, value: e.target.value } });
  }, [dispatch, id]);

  const value = state[id];

  return (
    <div className={`col-span-1 sm:col-span-${colSpan}`}>
      <label htmlFor={id} className="block text-xs font-medium text-gray-400 mb-1.5">
        {label}
      </label>
      <select
        id={id}
        name={id}
        value={typeof value === 'boolean' ? String(value) : (value as string | number)}
        onChange={handleChange}
        className="w-full bg-gray-900/70 border border-gray-600 rounded-lg py-2 px-3 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.es}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;