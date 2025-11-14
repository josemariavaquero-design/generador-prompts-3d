import React from 'react';

interface ControlCardProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  isCollapsible?: boolean;
  onRandomize?: () => void;
}

const DiceIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 3.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm-3.5 4a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm7 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm-7 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm3.5 4a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm3.5-4a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
        <path fillRule="evenodd" d="M2 5a3 3 0 013-3h10a3 3 0 013 3v10a3 3 0 01-3-3H5a3 3 0 01-3-3V5zm3-1a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V5a1 1 0 00-1-1H5z" clipRule="evenodd" />
    </svg>
);

const ChevronIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);


const ControlCard: React.FC<ControlCardProps> = ({ title, children, isOpen, onToggle, isCollapsible = false, onRandomize }) => {

  if (!isCollapsible) {
    return (
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl shadow-lg flex flex-col">
            <div className="flex justify-between items-center p-4 sm:p-5 border-b border-gray-700/50">
                <h2 className="text-lg font-bold text-purple-300">{title}</h2>
            </div>
            <div className="p-4 sm:p-5">
                {children}
            </div>
        </div>
    );
  }

  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl shadow-lg">
      <div
        className={`flex justify-between items-center p-4 sm:p-5 transition-colors cursor-pointer hover:bg-gray-700/30 ${isOpen ? 'rounded-t-xl' : 'rounded-xl'}`}
        onClick={onToggle}
        title={"Click para expandir/contraer"}
      >
        <h2 className="text-lg font-bold text-purple-300">{title}</h2>
        <div className="flex items-center space-x-3">
            {onRandomize && (
              <button 
                onClick={(e) => { e.stopPropagation(); onRandomize(); }} 
                title="Aleatorizar esta sección"
                className="p-2 rounded-full bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white transition-all duration-200"
              >
                  <DiceIcon />
              </button>
            )}
            <span className={`transition-transform duration-300 text-purple-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                <ChevronIcon />
            </span>
        </div>
      </div>
      
      <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[1000px]' : 'max-h-0'}`}
      >
          <div className={`p-4 sm:p-5 border-t border-gray-700/50`}>
              {children}
          </div>
      </div>
    </div>
  );
};

export default ControlCard;