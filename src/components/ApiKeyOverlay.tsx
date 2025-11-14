import React from 'react';

interface ApiKeyOverlayProps {
    onSelectKey: () => void;
}

const ApiKeyOverlay: React.FC<ApiKeyOverlayProps> = ({ onSelectKey }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center mx-4">
                <div className="mx-auto w-16 h-16 text-purple-400 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Clave de API Requerida</h2>
                <p className="text-gray-400 mb-6">
                    Para generar imágenes con la API de Gemini, necesitas seleccionar una clave de API. Tu clave se maneja de forma segura y no se almacena en esta aplicación.
                </p>
                <button
                    onClick={onSelectKey}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 text-base"
                >
                    Seleccionar Clave de API
                </button>
                <p className="text-xs text-gray-500 mt-4">
                    El uso de la API puede incurrir en costos. Consulta la{' '}
                    <a 
                        href="https://ai.google.dev/gemini-api/docs/billing" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="underline hover:text-purple-400 transition-colors"
                    >
                        documentación de facturación de Google
                    </a> 
                    {' '}para más detalles.
                </p>
            </div>
        </div>
    );
};

export default ApiKeyOverlay;
