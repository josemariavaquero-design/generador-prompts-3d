
import React from 'react';

interface ActionButtonsProps {
    onGenerate: () => void;
    onRandomize: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onGenerate, onRandomize }) => {
    return (
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
                onClick={onRandomize}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
            >
                Random Total
            </button>
            <button
                onClick={onGenerate}
                className="w-full bg-gray-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-600 transform hover:-translate-y-0.5 transition-all duration-300"
            >
                Generate Prompt 3D
            </button>
        </div>
    );
};

export default ActionButtons;
