import React from 'react';

interface ActionButtonsProps {
    mode: 'simple' | 'detailed';
    onGenerateImage: (mode: 'simple' | 'detailed') => void;
    onRandomize: () => void;
    onReset: () => void;
    onScrollToPrompts: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ mode, onGenerateImage, onRandomize, onReset, onScrollToPrompts }) => {
    return (
        <div className="flex flex-col gap-4">
            <button
                onClick={() => onGenerateImage(mode)}
                title={mode === 'simple' 
                    ? "Usa un prompt simplificado, más narrativo. Ideal para IAs de imagen generales."
                    : "Usa el prompt completo con todos los detalles técnicos. Ideal para motores de render 3D."
                }
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 text-base"
            >
                {mode === 'simple' ? 'Generar Imagen Sencilla' : 'Generar Imagen Detallada'}
            </button>
            
            {/* --- Utility Buttons --- */}
            <div className="grid grid-cols-3 gap-3 pt-2">
                 <button
                    onClick={onRandomize}
                    className="w-full bg-gray-700/60 text-gray-300 font-semibold py-2 px-2 rounded-md shadow-md hover:bg-gray-600/60 transform hover:-translate-y-px transition-all duration-200 text-sm"
                >
                    Random Total
                </button>
                <button
                    onClick={onReset}
                    className="w-full bg-gray-700/60 text-gray-300 font-semibold py-2 px-2 rounded-md shadow-md hover:bg-gray-600/60 transform hover:-translate-y-px transition-all duration-200 text-sm"
                >
                    Resetear
                </button>
                <button
                    onClick={onScrollToPrompts}
                    className="w-full bg-gray-700/60 text-gray-300 font-semibold py-2 px-2 rounded-md shadow-md hover:bg-gray-600/60 transform hover:-translate-y-px transition-all duration-200 text-sm"
                >
                    Ir a Prompts
                </button>
            </div>
        </div>
    );
};

export default ActionButtons;