
import React from 'react';

interface ControlCardProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  isCollapsible?: boolean;
}

const ControlCard: React.FC<ControlCardProps> = ({ title, children, isOpen, onToggle, isCollapsible = false }) => {
  const isViewerCard = title === 'Real-time Viewer';

  if (!isCollapsible) {
    // This logic handles the non-collapsible cards (Viewer, Actions, Prompts).
    // The viewer card is singled out to receive h-full and flex-grow properties
    // to ensure it correctly fills the layout space assigned to it by the grid.
    return (
        <div className={`bg-gray-800/50 border border-gray-700/50 rounded-xl shadow-lg flex flex-col ${isViewerCard ? 'h-full' : ''}`}>
            <div className="flex justify-between items-center p-4 sm:p-5 border-b border-gray-700/50">
                <h2 className="text-lg font-bold text-purple-300">{title}</h2>
            </div>
            <div className={`p-4 sm:p-5 ${isViewerCard ? 'flex-grow' : ''}`}>
                {children}
            </div>
        </div>
    );
  }

  // This logic handles all the collapsible control sections.
  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl shadow-lg">
      <div
        className={`flex justify-between items-center p-4 sm:p-5 transition-colors cursor-pointer hover:bg-gray-700/30 ${isOpen ? 'rounded-t-xl' : 'rounded-xl'}`}
        onClick={onToggle}
        title={"Click to toggle"}
      >
        <h2 className="text-lg font-bold text-purple-300">{title}</h2>
        <span className={`transition-transform duration-300 text-purple-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </span>
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