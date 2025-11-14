
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

// Add keyframes to tailwind.config.js if you had one, but for CDN we just use a style tag or a simple css file.
// For simplicity in this single-file setup, let's add the animation CSS inline in index.html or rely on a simple fade in/out that tailwind can do.
// A simple fade in/out can be done with transition classes, but for enter/exit animations, a library like framer-motion or a custom keyframe is better.
// Let's assume a keyframe is defined in a style block somewhere or use CSS-in-JS.
// Here's an example of how you'd define it in a style tag in index.html
/*
@keyframes fadeInOut {
  0% { opacity: 0; transform: translateY(20px) translateX(-50%); }
  20% { opacity: 1; transform: translateY(0) translateX(-50%); }
  80% { opacity: 1; transform: translateY(0) translateX(-50%); }
  100% { opacity: 0; transform: translateY(20px) translateX(-50%); }
}
.animate-fade-in-out {
  animation: fadeInOut 2s ease-in-out forwards;
}
*/
// For this project, we'll keep it simple and assume a fade effect.
// The effect is better managed by a library, but this component structure is sound.

export default Toast;
