import React from 'react';

interface ToastProps {
  message: string | null;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold py-2 px-6 rounded-full shadow-2xl animate-fade-in-out">
      {message}
    </div>
  );
};

export default Toast;