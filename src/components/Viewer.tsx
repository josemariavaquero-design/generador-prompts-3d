import React from 'react';

interface ViewerProps {
  imageUrl: string | null;
  isGeneratingImage: boolean;
  generationError: string | null;
  onSave: () => void;
}

const LoadingState: React.FC = () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-800/50">
        <div className="w-2/3 text-center">
            <div className="animate-pulse">
                <div className="w-12 h-12 mx-auto rounded-full bg-purple-500/30"></div>
                <div className="w-full h-3 mt-4 rounded-full bg-purple-500/20"></div>
                <div className="w-3/4 h-3 mt-2 mx-auto rounded-full bg-purple-500/20"></div>
            </div>
            <p className="mt-4 text-sm font-semibold text-purple-300">Generando imagen...</p>
            <p className="text-xs text-gray-400">Esto puede tardar unos segundos.</p>
        </div>
    </div>
);

const ErrorState: React.FC<{ message: string }> = ({ message }) => (
    <div className="w-full h-full flex items-center justify-center bg-red-900/20 text-center p-4">
        <div>
            <div className="w-12 h-12 mx-auto text-red-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
            </div>
            <p className="mt-2 font-semibold text-red-300">Error de Generación</p>
            <p className="text-xs text-red-400">{message}</p>
        </div>
    </div>
);

const InitialState: React.FC = () => (
     <div className="w-full h-full flex items-center justify-center bg-gray-800/50">
        <div className="w-2/3 text-center">
             <div className="w-12 h-12 mx-auto text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
            </div>
            <p className="mt-4 text-sm font-semibold text-gray-400">El visor está listo</p>
            <p className="text-xs text-gray-500">La imagen generada por IA aparecerá aquí.</p>
        </div>
    </div>
);


const Viewer: React.FC<ViewerProps> = ({ imageUrl, isGeneratingImage, generationError, onSave }) => {
  const canSave = !isGeneratingImage && imageUrl;

  return (
    <div className="relative w-full aspect-square rounded-lg flex items-center justify-center overflow-hidden bg-black transition-colors duration-300 group">
      {isGeneratingImage && <LoadingState />}

      {!isGeneratingImage && generationError && (
        <ErrorState message={generationError} />
      )}
      
      {!isGeneratingImage && !generationError && imageUrl && (
        <img 
            src={imageUrl} 
            alt="Generated 3D object preview" 
            className="w-full h-full object-cover"
        />
      )}
      
      {!isGeneratingImage && !generationError && !imageUrl && (
        <InitialState />
      )}

      {canSave && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <button 
                onClick={onSave}
                className="bg-black/50 backdrop-blur-sm text-white font-semibold py-2 px-5 rounded-lg shadow-lg hover:bg-purple-600/80 transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v12l-5-3-5 3V4z" />
                </svg>
                Guardar
            </button>
        </div>
      )}
    </div>
  );
};

export default Viewer;