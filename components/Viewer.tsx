
import React, { useMemo, useState, useRef, MouseEvent } from 'react';
import type { PromptState } from '../types';

interface ViewerProps {
  state: PromptState;
  selectedObjectIndex: number | null;
  setSelectedObjectIndex: (index: number) => void;
}

const getMaterialStyle = (state: PromptState): React.CSSProperties => {
  const styles: React.CSSProperties = {};
  
  switch (state.mTipo) {
    case 'marble-white':
      styles.background = 'linear-gradient(135deg, #f8f8f8, #d8d8d8)';
      styles.boxShadow = 'inset 0 0 10px rgba(0,0,0,0.1)';
      break;
    case 'steel-polished':
      styles.background = 'linear-gradient(135deg, #e0e0e0, #a0a0a0, #e0e0e0)';
      break;
    case 'copper':
      styles.background = 'linear-gradient(135deg, #f0c0a0, #b87333, #f0c0a0)';
      break;
    case 'glass-clear':
      styles.background = 'rgba(255, 255, 255, 0.1)';
      styles.border = '1px solid rgba(255, 255, 255, 0.2)';
      styles.backdropFilter = 'blur(2px)';
      break;
    case 'plastic-matte':
       styles.background = '#4a4a4a';
       break;
    default:
      styles.background = 'linear-gradient(135deg, #999, #555)';
  }

  if (state.mBrillo === 'gloss') {
    styles.boxShadow = (styles.boxShadow || '') + ', inset -10px 10px 20px rgba(255,255,255,0.3)';
  }

  return styles;
};

const getShapeStyle = (state: PromptState): React.CSSProperties => {
    const styles: React.CSSProperties = {
        width: '100px',
        height: '100px',
    };
    switch(state.gBase) {
        case 'sphere':
            styles.borderRadius = '50%';
            break;
        case 'cube':
            styles.borderRadius = '8px';
            break;
        case 'cylinder':
            styles.borderRadius = '50px / 50px';
            styles.height = '150px';
            break;
        case 'cone':
            styles.width = '0';
            styles.height = '0';
            styles.borderLeft = '60px solid transparent';
            styles.borderRight = '60px solid transparent';
            styles.borderBottom = '120px solid #888'; // color is a placeholder, material will override
            styles.background = 'transparent';
            break;
        case 'torus':
            styles.borderRadius = '50%';
            styles.border = '25px solid #888'; // placeholder
            styles.background = 'transparent';
            break;
        default:
             styles.borderRadius = '8px';
    }
    return styles;
}

const Viewer: React.FC<ViewerProps> = ({ state, selectedObjectIndex, setSelectedObjectIndex }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [sceneRotation, setSceneRotation] = useState({ x: -20, y: -30 });
  const lastMousePos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: MouseEvent) => {
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    setSceneRotation(prev => ({
        x: prev.x - dy * 0.25,
        y: prev.y + dx * 0.25,
    }));
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const sceneStyle = useMemo((): React.CSSProperties => {
    return {
      position: 'relative',
      transform: `scale(0.8) rotateX(${sceneRotation.x}deg) rotateY(${sceneRotation.y}deg)`,
      transformStyle: 'preserve-3d',
      width: '1px',
      height: '1px',
      transition: 'transform 0.1s linear',
    };
  }, [sceneRotation]);
  
  const groundStyle = useMemo((): React.CSSProperties => {
    const styles: React.CSSProperties = {
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) translateY(100px) rotateX(90deg)',
        transition: 'background 0.3s ease',
    };
    if (state.envPlano === 'reflect') {
        styles.background = 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 60%)';
    } else if (state.envPlano === 'matte') {
        styles.background = 'radial-gradient(circle, #222 0%, #111 60%)';
    } else {
        styles.background = 'transparent';
    }
    return styles;
  }, [state.envPlano]);

  const objects = useMemo(() => {
    const objectCount = Math.max(1, state.gCount);
    
    return Array.from({ length: objectCount }, (_, i) => {
        const material = getMaterialStyle(state);
        const shape = getShapeStyle(state);

        const radius = objectCount > 1 ? (state.gFusion === 'separate' ? 80 : state.gFusion === 'touching' ? 55 : 25) : 0;
        const angle = objectCount > 1 ? (i / objectCount) * Math.PI * 2 : 0;
        
        const xOffset = Math.cos(angle) * radius;
        const zOffset = Math.sin(angle) * radius;

        const twistValue = state.gDef === 'twist' ? state.gDefInt : 0;
        const bendValue = state.gDef === 'bend' ? state.gDefInt : 0;

        const transform = `
            translateX(${state.posX * 50 + xOffset}px) 
            translateY(${state.posZ * -50}px) 
            translateZ(${state.posY * 50 + zOffset}px) 
            rotateX(${state.rotX}deg) 
            rotateY(${state.rotY}deg) 
            rotateZ(${state.rotZ}deg) 
            scaleX(${state.scaleX / 100}) 
            scaleY(${state.scaleY / 100}) 
            scaleZ(${state.scaleZ / 100})
            skewY(${twistValue / 4}deg)
            skewX(${bendValue / 4}deg)
            translate(-50%, -50%)
        `;
        
        const isSelected = i === selectedObjectIndex;
        const selectionStyle: React.CSSProperties = isSelected ? {
            boxShadow: `0 0 20px 5px #00ffff, inset 0 0 10px 2px #00ffff`,
        } : {};

        const style: React.CSSProperties = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            cursor: 'pointer',
            ...shape,
            ...material,
            ...selectionStyle,
            transform,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), background 0.4s ease, border-radius 0.4s ease, box-shadow 0.2s ease-in-out',
        };

        return <div key={i} style={style} onClick={() => setSelectedObjectIndex(i)}></div>;
    });

  }, [state, selectedObjectIndex, setSelectedObjectIndex]);

  const containerBg = useMemo(() => {
    switch(state.envFondo) {
        case 'black': return 'bg-black';
        case 'white': return 'bg-white';
        case 'grey': return 'bg-gray-700';
        case 'grad': return 'bg-gradient-to-b from-gray-800 to-gray-900';
        default: return 'bg-gray-900';
    }
  }, [state.envFondo]);

  return (
    <div className='flex flex-col h-full'>
      <div 
        className={`relative w-full flex-grow rounded-lg flex items-center justify-center overflow-hidden transition-colors duration-300 ${containerBg}`} 
        style={{ perspective: '1000px', cursor: isDragging ? 'grabbing' : 'grab' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        <div style={sceneStyle}>
          {state.envPlano !== 'none' && <div style={groundStyle}></div>}
          {objects}
        </div>
      </div>
      <div className="text-xs text-center text-gray-500 p-2 bg-gray-900/50 rounded-b-lg">
        <b>Click & Drag:</b> Rotate view | <b>Click Object:</b> Select | <b>Arrow Keys:</b> Move X/Y | <b>Shift+Arrows:</b> Move Z
      </div>
    </div>
  );
};

export default Viewer;