import React from 'react';
import type { SavedGeneration, PromptState } from '../types';

interface GalleryControlsProps {
  generation: SavedGeneration | null;
  onClose: () => void;
  onRestore: (state: PromptState) => void;
  onDelete: (id: number) => void;
  showToast: (message: string, duration?: number) => void;
}

// Icon Components
const RestoreIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M15.312 11.25a.75.75 0 01-.75.75h-3.313l1.06 1.06a4.5 4.5 0 01-6.364 6.364 1.5 1.5 0 012.121-2.121 1.5 1.5 0 00-2.121-2.121 4.5 4.5 0 016.364-6.364l1.06 1.06v-3.313a.75.75 0 01.75-.75zM4.688 8.75a.75.75 0 01.75-.75h3.313l-1.06-1.06a4.5 4.5 0 016.364-6.364 1.5 1.5 0 01-2.121 2.121 1.5 1.5 0 002.121 2.121 4.5 4.5 0 01-6.364 6.364l-1.06-1.06v3.313a.75.75 0 01-.75.75z" clipRule="evenodd" /></svg>
);
const DownloadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
);
const UpscaleIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L9 5.414V17a1 1 0 102 0V5.414l4.293 4.293a1 1 0 001.414-1.414l-7-7z" /></svg>
);
const DeleteIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
);
const CloseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
);

const GalleryControls: React.FC<GalleryControlsProps> = ({ generation, onClose, onRestore, onDelete, showToast }) => {
    if (!generation) {
        return null;
    }

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = generation.imageUrl;
        link.download = `generation-${generation.id}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleUpscale = () => {
        handleDownload();
        window.open('https://www.upscale.media/', '_blank', 'noopener,noreferrer');
        showToast("Imagen descargada, abriendo upscale.media...", 4000);
    };

    return (
        <div className="mt-4 p-3 bg-gray-900/50 border border-gray-700/50 rounded-lg">
            <div className="flex justify-between items-center mb-3">
                <p className="text-xs text-gray-400">
                    Seleccionado: {new Date(generation.timestamp).toLocaleString()}
                </p>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white transition-colors" title="Cerrar vista previa">
                    <CloseIcon />
                </button>
            </div>

            <div className="grid grid-cols-5 gap-3">
                <div className="col-span-2">
                    <img src={generation.imageUrl} alt={`Preview of ${generation.id}`} className="w-full h-full object-cover rounded-md" />
                </div>
                <div className="col-span-3 flex flex-col justify-center gap-2">
                    <button onClick={() => onRestore(generation.state)} className="flex items-center gap-2 w-full text-left p-2 rounded-md bg-gray-700/70 hover:bg-purple-600 text-sm font-semibold transition-colors">
                        <RestoreIcon /> Restaurar
                    </button>
                    <button onClick={handleDownload} className="flex items-center gap-2 w-full text-left p-2 rounded-md bg-gray-700/70 hover:bg-purple-600 text-sm font-semibold transition-colors">
                        <DownloadIcon /> Descargar
                    </button>
                    <button onClick={handleUpscale} className="flex items-center gap-2 w-full text-left p-2 rounded-md bg-gray-700/70 hover:bg-purple-600 text-sm font-semibold transition-colors">
                        <UpscaleIcon /> Super-Escalar
                    </button>
                    <button onClick={() => onDelete(generation.id)} className="flex items-center gap-2 w-full text-left p-2 rounded-md bg-red-800/50 hover:bg-red-600 text-sm font-semibold transition-colors">
                        <DeleteIcon /> Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GalleryControls;