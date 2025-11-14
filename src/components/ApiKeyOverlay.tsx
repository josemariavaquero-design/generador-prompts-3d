import React, { useState } from 'react';

interface ApiKeyOverlayProps {
    onSetKey: (key: string) => void;
}

const ApiKeyOverlay: React.FC<ApiKeyOverlayProps> = ({ onSetKey }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onSetKey(inputValue.trim());
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center mx-4">
                <div className="mx-auto w-16 h-16 text-purple-400 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Introduce tu Clave de API</h2>
                <p className="text-gray-400 mb-6">
                    Para generar imágenes, pega tu clave de la API de Google Gemini. Tu clave se guarda localmente en tu navegador y no se envía a nuestros servidores.
                </p>
                <input
                    type="password"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Pega tu clave de API aquí"
                    className="w-full bg-gray-900/70 border border-gray-600 rounded-lg py-3 px-4 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition mb-4"
                    required
                    autoFocus
                />
                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 text-base"
                >
                    Guardar y Continuar
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
            </form>
        </div>
    );
};

export default ApiKeyOverlay;