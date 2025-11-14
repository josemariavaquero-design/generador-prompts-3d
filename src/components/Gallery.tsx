import React from 'react';
import type { SavedGeneration } from '../types';

interface GalleryProps {
  generations: SavedGeneration[];
  selectedGeneration: SavedGeneration | null;
  onSelect: (generation: SavedGeneration) => void;
}

const Gallery: React.FC<GalleryProps> = ({ generations, selectedGeneration, onSelect }) => {
    if (generations.length === 0) {
        return (
            <div className="text-center text-sm text-gray-500 py-4">
                No has guardado ninguna imagen todavía.
            </div>
        );
    }
    
    return (
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-5 gap-2 max-h-60 overflow-y-auto pr-2">
            {generations.map((gen) => (
                <button 
                    key={gen.id} 
                    className={`relative aspect-square group rounded-md focus:outline-none transition-all duration-200 ${selectedGeneration?.id === gen.id ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-gray-800' : 'ring-0'}`}
                    onClick={() => onSelect(gen)}
                    aria-label={`Seleccionar generación ${gen.id}`}
                >
                    <img 
                        src={gen.imageUrl}
                        alt={`Generated image ${gen.id}`}
                        className="w-full h-full object-cover rounded-md"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></div>
                </button>
            ))}
        </div>
    );
};

export default Gallery;