import { useReducer, useMemo, useCallback, useEffect, useState } from 'react';
import type { PromptState, Action, Option, SavedGeneration } from '../types';
import * as C from '../constants';
import { generateImage } from '../services/geminiService';

const initialState: PromptState = {
  gBase: 'sphere', gPerfil: 'compact', gSim: 'sym', gDef: 'none', gDefInt: 0, gEje: 'vertical',
  gBool: 'none', gBoolPrim: 'sphere', gRep: 'none', gCount: 1, gFusion: 'separate', gBalance: 'rest',
  posX: 0, posY: 0, posZ: 0.5,
  rotX: 0, rotY: 0, rotZ: 0, rotPreset: '0',
  scaleX: 100, scaleY: 100, scaleZ: 100,
  defX: 0, defY: 0, defZ: 0,
  mTipo: 'plastic-matte', mBrillo: 'satin', mTex: 'smooth', mColor: 'white', mDisp: 'none', mSSS: 'none',
  luzEsquema: 'studio', luzHDRI: 'studio', luzContraste: 'mid', luzColor: 'none',
  luzKeyPos: '45_right', luzFillInt: 'medium', luzBackType: 'none',
  envFondo: 'grey', envPlano: 'matte', envEfx: 'none',
  camShotType: 'ms', camMove: 'none', camDutch: 'none',
  camPersp: 'real', camDOF: 'medium', camLente: '35', camAlt: 1.6, camComp: 'center',
  rMotor: 'octane', rRes: '4k', rSamples: 'med', rPost: 'none', rNoise: 'denoise', rLook: 'photoreal',
  animActive: 'false', animEdit: 'none',
};

function reducer(state: PromptState, action: Action): PromptState {
  switch (action.type) {
    case 'SET_VALUE':
      if (action.payload.key === 'rotPreset' && typeof action.payload.value === 'string' && action.payload.value !== '0') {
        const newState = { ...state, rotPreset: action.payload.value };
        let payload: Partial<PromptState> | null = null;
        switch (action.payload.value) {
          case '45': {
            const a = Math.random() < 0.5 ? 45 : 315;
            payload = { rotX: a, rotY: a, rotZ: a };
            break;
          }
          case '90': {
            const a = Math.random() < 0.5 ? 90 : 270;
            payload = { rotX: a, rotY: a, rotZ: a };
            break;
          }
          case 'rand': {
            payload = {
              rotX: Math.floor(Math.random() * 361),
              rotY: Math.floor(Math.random() * 361),
              rotZ: Math.floor(Math.random() * 361),
            };
            break;
          }
        }
        return payload ? { ...newState, ...payload } : newState;
      }
      return { ...state, [action.payload.key]: action.payload.value };
    case 'SET_STATE':
        return { ...state, ...action.payload };
    case 'RESET':
        return initialState;
    default:
      return state;
  }
}

function findOption(arr: (Option | {id: string, es: string, en: string})[], id: string) {
    return arr.find(x => x.id === id);
}

function pick<T,>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

// FIX: Removed apiKey and clearApiKey parameters as API key is now handled by environment variables.
export const usePromptGenerator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState<boolean>(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [savedGenerations, setSavedGenerations] = useState<SavedGeneration[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // --- Gallery Persistence ---
  useEffect(() => {
    try {
      const storedGenerations = localStorage.getItem('savedGenerations');
      if (storedGenerations) {
        setSavedGenerations(JSON.parse(storedGenerations));
      }
    } catch (error) {
      console.error("Failed to load saved generations from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('savedGenerations', JSON.stringify(savedGenerations));
    } catch (error) {
      console.error("Failed to save generations to localStorage:", error);
    }
  }, [savedGenerations]);

  // --- Toast Helper ---
  const showToast = useCallback((message: string, duration: number = 2500) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), duration);
  }, []);

  // --- Gallery Handlers ---
  const handleSaveGeneration = useCallback(() => {
    if (!imageUrl) return;
    const newGeneration: SavedGeneration = {
      id: Date.now(),
      imageUrl,
      state: { ...state },
      timestamp: Date.now(),
    };
    setSavedGenerations(prev => [newGeneration, ...prev]);
    showToast("Imagen guardada en la galería");
  }, [imageUrl, state, showToast]);

  const handleRestoreGeneration = useCallback((stateToRestore: PromptState) => {
    dispatch({ type: 'SET_STATE', payload: stateToRestore });
    showToast("Estado del prompt restaurado");
  }, [showToast]);

  const handleDeleteGeneration = useCallback((id: number) => {
    setSavedGenerations(prev => prev.filter(gen => gen.id !== id));
    showToast("Imagen eliminada de la galería");
  }, [showToast]);


  const { camPersp, camLente, camDOF, envFondo, luzContraste, luzHDRI } = state;
  
  const adjustCoherence = useCallback(() => {
    const updates: Partial<PromptState> = {};
    if (camPersp === 'ortho' && camLente === 'macro') updates.camLente = '35';
    if (camLente === 'macro' && camDOF !== 'shallow') updates.camDOF = 'shallow';
    if (envFondo === 'black' && luzContraste === 'high' && luzHDRI === 'soft') updates.luzHDRI = 'studio';
    if (Object.keys(updates).length > 0) dispatch({ type: 'SET_STATE', payload: updates });
  }, [dispatch, camPersp, camLente, camDOF, envFondo, luzContraste, luzHDRI]);
  
  useEffect(() => { adjustCoherence(); }, [adjustCoherence]);

  const generatedPrompts = useMemo(() => {
    const s = state;
    
    const buildBlock = (parts: (string | undefined | null | false)[]) => parts.filter(Boolean).join(', ');

    const getOpt = (lang: 'es' | 'en', arr: (Option | {id: string, es: string, en: string})[], id: string, skipIfId?: string | string[]) => {
        if (!id || (skipIfId && (Array.isArray(skipIfId) ? skipIfId.includes(id) : skipIfId === id))) return null;
        const option = findOption(arr, id);
        return option?.[lang] ? option[lang].toLowerCase() : null;
    }
    
    const buildTransform = (lang: 'es' | 'en') => {
        const px = s.posX.toFixed(1); const py = s.posY.toFixed(1); const pz = s.posZ.toFixed(1);
        const rx = s.rotX; const ry = s.rotY; const rz = s.rotZ;
        const sx = s.scaleX; const sy = s.scaleY; const sz = s.scaleZ;
        const dx = s.defX; const dy = s.defY; const dz = s.defZ;
        
        let parts: string[] = [];
        if (px !== '0.0' || py !== '0.0' || pz !== '0.5') parts.push(lang === 'es' ? `posición X:${px}, Y:${py}, Z:${pz}` : `position X:${px}, Y:${py}, Z:${pz}`);
        if (rx !== 0 || ry !== 0 || rz !== 0) parts.push(lang === 'es' ? `rotación X:${rx}°, Y:${ry}°, Z:${rz}°` : `rotation X:${rx}°, Y:${ry}°, Z:${rz}°`);
        if (sx !== 100 || sy !== 100 || sz !== 100) parts.push(lang === 'es' ? `escalado X:${sx}%, Y:${sy}%, Z:${sz}%` : `scale X:${sx}%, Y:${sy}%, Z:${sz}%`);
        if (dx !== 0 || dy !== 0 || dz !== 0) parts.push(lang === 'es' ? `deformación X:${dx>0?'+':''}${dx}%, Y:${dy>0?'+':''}${dy}%, Z:${dz>0?'+':''}${dz}%` : `deformation X:${dx>0?'+':''}${dx}%, Y:${dy>0?'+':''}${dy}%, Z:${dz>0?'+':''}${dz}%`);
        
        return parts.join(', ');
    }
    
    const buildForma = (lang: 'es' | 'en') => {
        const getIntensityWord = (lang: 'es' | 'en', value: number): string => {
            if (value === 0) return ''; if (value <= 10) return lang === 'es' ? 'casi imperceptible' : 'almost imperceptible'; if (value <= 33) return lang === 'es' ? 'sutil' : 'subtle'; if (value <= 66) return lang === 'es' ? 'media' : 'medium'; if (value <= 90) return lang === 'es' ? 'fuerte' : 'strong'; return lang === 'es' ? 'extrema' : 'extreme';
        }
        const ops: string[] = [];
        if (s.gDef !== 'none') ops.push(`${getOpt(lang, C.GDef, s.gDef)} ${getIntensityWord(lang, s.gDefInt)} en eje ${getOpt(lang, C.GEje, s.gEje)}`);
        if (s.gBool !== 'none') ops.push(`${getOpt(lang, C.GBool, s.gBool)} con ${getOpt(lang, C.GBoolPrim, s.gBoolPrim)}`);
        if (s.gRep !== 'none') ops.push(getOpt(lang, C.GRep, s.gRep) || '');
        
        const intro = s.gCount > 1 ? (lang === 'es' ? `${s.gCount} objetos con base ${getOpt(lang, C.GBase, s.gBase)}` : `${s.gCount} objects with a ${getOpt(lang, C.GBase, s.gBase)} base`) : (lang === 'es' ? `Un objeto con base ${getOpt(lang, C.GBase, s.gBase)}`: `An object with a ${getOpt(lang, C.GBase, s.gBase)} base`);
        const groupDesc = s.gCount > 1 ? buildBlock([ getOpt(lang, C.GFusion, s.gFusion), getOpt(lang, C.GBalance, s.gBalance) ]) : getOpt(lang, C.GBalance, s.gBalance, 'rest');
        
        return [ intro, buildBlock([getOpt(lang, C.GPerfil, s.gPerfil), getOpt(lang, C.GSim, s.gSim)]), ops.join(', '), groupDesc, buildTransform(lang) ].filter(Boolean).join(' ** ');
    }
    
    const buildMaterial = (lang: 'es' | 'en') => buildBlock([ getOpt(lang, C.MTipo, s.mTipo), getOpt(lang, C.MBrillo, s.mBrillo), getOpt(lang, C.MTex, s.mTex, 'smooth'), getOpt(lang, C.MColor, s.mColor), getOpt(lang, C.MDisp, s.mDisp, 'none'), getOpt(lang, C.MSSS, s.mSSS, 'none') ]);

    const buildLuz = (lang: 'es' | 'en') => {
        const details = buildBlock([ lang === 'es' ? `clave ${getOpt(lang, C.CKeyLightPos, s.luzKeyPos)}` : `key light ${getOpt(lang, C.CKeyLightPos, s.luzKeyPos)}`, lang === 'es' ? `relleno ${getOpt(lang, C.CFillLightInt, s.luzFillInt)}` : `fill ${getOpt(lang, C.CFillLightInt, s.luzFillInt)}`, getOpt(lang, C.CBackLightType, s.luzBackType, 'none'), getOpt(lang, C.LHDRI, s.luzHDRI, 'none'), lang === 'es' ? `contraste ${getOpt(lang, C.LContraste, s.luzContraste)}` : `${getOpt(lang, C.LContraste, s.luzContraste)} contrast`, getOpt(lang, C.COLOR_PALETTE, s.luzColor, 'none') ? (lang === 'es' ? `color ${getOpt(lang, C.COLOR_PALETTE, s.luzColor)}` : `${getOpt(lang, C.COLOR_PALETTE, s.luzColor)} color`) : false ]);
        return `${getOpt(lang, C.LEsquema, s.luzEsquema)} — ${details}`;
    }

    const buildEntorno = (lang: 'es' | 'en') => buildBlock([ getOpt(lang, C.EFondo, s.envFondo), getOpt(lang, C.EPlano, s.envPlano, 'none'), getOpt(lang, C.EEfx, s.envEfx, 'none') ]);
    
    const buildCamara = (lang: 'es' | 'en') => {
        const part1 = buildBlock([ getOpt(lang, C.CShotType, s.camShotType, 'none'), getOpt(lang, C.CCameraMove, s.camMove, 'none'), getOpt(lang, C.CPersp, s.camPersp), getOpt(lang, C.CDOF, s.camDOF) ]);
        const part2 = buildBlock([ getOpt(lang, C.CLente, s.camLente), getOpt(lang, C.CDutchAngle, s.camDutch, 'none'), lang === 'es' ? `cámara a ${s.camAlt.toFixed(1)} m` : `camera at ${s.camAlt.toFixed(1)} m`, lang === 'es' ? `composición ${getOpt(lang, C.CComp, s.camComp)}` : `${getOpt(lang, C.CComp, s.camComp)} composition` ]);
        return `${part1} ** ${part2}`;
    }

    const buildRender = (lang: 'es' | 'en') => {
        const anim = s.animActive === 'true' ? buildBlock([ lang === 'es' ? `animación` : `animation`, getOpt(lang, C.CAnimEdit, s.animEdit, 'none') ]) : null;
        const post = buildBlock([ getOpt(lang, C.RPost, s.rPost, 'none'), getOpt(lang, C.RNoise, s.rNoise) ]);
        const base = buildBlock([ getOpt(lang, C.RMotor, s.rMotor), getOpt(lang, C.RRes, s.rRes), getOpt(lang, C.RSamples, s.rSamples), getOpt(lang, C.RLook, s.rLook) ]);
        
        return [base, post, anim].filter(Boolean).join(' ** ').toUpperCase();
    }
    
    const es = [buildForma('es'), buildMaterial('es'), buildLuz('es'), buildEntorno('es'), buildCamara('es'), buildRender('es')].filter(Boolean).join(' ** ');
    const en = [buildForma('en'), buildMaterial('en'), buildLuz('en'), buildEntorno('en'), buildCamara('en'), buildRender('en')].filter(Boolean).join(' ** ');
    
    return { es, en };

  }, [state]);

  const simpleEnglishPrompt = useMemo(() => {
    const s = state;
    const getOpt = (arr: (Option | {id: string, es: string, en: string})[], id: string, skipIfId?: string | string[]) => {
        const lang = 'en';
        if (!id || (skipIfId && (Array.isArray(skipIfId) ? skipIfId.includes(id) : skipIfId === id))) return null;
        const option = findOption(arr, id);
        return option?.[lang] ? option[lang] : null;
    };

    const objectDesc = `A ${getOpt(C.RLook, s.rLook)} image of ${s.gCount > 1 ? `${s.gCount} objects` : 'an object'} based on a ${getOpt(C.GBase, s.gBase)}, with a ${getOpt(C.GPerfil, s.gPerfil)} shape.`;
    const materialDesc = `The main material is ${getOpt(C.MTipo, s.mTipo)}, with a ${getOpt(C.MBrillo, s.mBrillo)} finish and a ${getOpt(C.MTex, s.mTex, 'smooth')} texture.`;
    const lightingDesc = `The scene is lit with a ${getOpt(C.LEsquema, s.luzEsquema)} setup, creating ${getOpt(C.LContraste, s.luzContraste)} contrast, with hints of ${getOpt(C.COLOR_PALETTE, s.luzColor, 'none')} color.`;
    const envDesc = `The setting is a ${getOpt(C.EFondo, s.envFondo)} background, and the object is ${s.envPlano !== 'none' ? `on a ${getOpt(C.EPlano, s.envPlano)} surface` : 'floating in space'}.`;
    const cameraDesc = `The camera is capturing a ${getOpt(C.CShotType, s.camShotType, 'none') || 'medium shot'}, using a ${getOpt(C.CLente, s.camLente)} lens, resulting in a ${getOpt(C.CDOF, s.camDOF)} depth of field. The composition follows the ${getOpt(C.CComp, s.camComp)} style.`;
    
    return [objectDesc, materialDesc, lightingDesc, envDesc, cameraDesc].join(' ');
  }, [state]);
  
  const handleGenerateImage = useCallback(async (mode: 'simple' | 'detailed') => {
      const englishPrompt = mode === 'simple' ? simpleEnglishPrompt : generatedPrompts.en;

      if (!englishPrompt) {
          setGenerationError("El prompt está vacío.");
          return;
      }
      setIsGeneratingImage(true);
      setGenerationError(null);
      setImageUrl(null);
      try {
        const result = await generateImage(englishPrompt);
        setImageUrl(result);
        if(!result) {
            setGenerationError("La API no devolvió una imagen.");
        }
      } catch (error) {
        console.error(error);
        const errorMessage = (error as Error).message || "Error al generar la imagen.";
        // FIX: Removed API key specific error handling as it's now managed via environment variables.
        setGenerationError(errorMessage);
      } finally {
        setIsGeneratingImage(false);
      }
  }, [generatedPrompts, simpleEnglishPrompt]);

  const handleRandomizeSection = useCallback((sectionTitle: string) => {
      const section = C.CONTROL_SECTIONS.find(s => s.title === sectionTitle);
      if (!section) return;

      const partialState: Partial<PromptState> = {};
      section.controls.forEach(control => {
          if (control.options) {
              (partialState as any)[control.id] = pick(control.options).id;
          } else if (typeof control.min !== 'undefined' && typeof control.max !== 'undefined') {
              const min = control.min;
              const max = control.max;
              const randomValue = min + Math.random() * (max - min);
              (partialState as any)[control.id] = parseFloat(randomValue.toFixed(control.step && control.step < 1 ? 2 : 0));
          }
      });
      dispatch({ type: 'SET_STATE', payload: partialState });

  }, []);

  const handleRandomize = useCallback(() => {
    const newState: Partial<PromptState> = {
        gBase: pick(C.GBase).id, gPerfil: pick(C.GPerfil).id, gSim: pick(C.GSim).id, gDef: pick(C.GDef).id,
        gDefInt: Math.floor(Math.random() * 101), gEje: pick(C.GEje).id, gBool: pick(C.GBool).id, gBoolPrim: pick(C.GBoolPrim).id,
        gRep: pick(C.GRep).id, gCount: 1 + Math.floor(Math.random() * 3), gFusion: pick(C.GFusion).id, gBalance: pick(C.GBalance).id,
        mTipo: pick(C.MTipo).id, mBrillo: pick(C.MBrillo).id, mTex: pick(C.MTex).id, mColor: pick(C.MColor).id,
        mDisp: pick(C.MDisp).id, mSSS: pick(C.MSSS).id, luzEsquema: pick(C.LEsquema).id,
        luzContraste: pick(C.LContraste).id, luzColor: pick(C.COLOR_PALETTE).id,
        luzKeyPos: pick(C.CKeyLightPos).id, luzFillInt: pick(C.CFillLightInt).id, luzBackType: pick(C.CBackLightType).id,
        envFondo: pick(C.EFondo).id, envPlano: pick(C.EPlano).id, envEfx: pick(C.EEfx).id,
        camShotType: pick(C.CShotType).id, camMove: pick(C.CCameraMove).id, camDutch: pick(C.CDutchAngle).id,
        camPersp: pick(C.CPersp).id, camDOF: pick(C.CDOF).id, camLente: pick(C.CLente).id, camAlt: parseFloat((0.2 + Math.random() * 4).toFixed(1)),
        camComp: pick(C.CComp).id, rMotor: pick(C.RMotor).id, rRes: pick(C.RRes).id, rSamples: pick(C.RSamples).id,
        rPost: pick(C.RPost).id, rNoise: pick(C.RNoise).id, rLook: pick(C.RLook).id,
        animActive: Math.random() > 0.8 ? 'true' : 'false', animEdit: pick(C.CAnimEdit).id,
        posX: parseFloat((Math.random() * 4 - 2).toFixed(1)), posY: parseFloat((Math.random() * 4 - 2).toFixed(1)), posZ: parseFloat((Math.random() * 2).toFixed(1)),
        rotPreset: 'rand',
        scaleX: 50 + Math.floor(Math.random() * 200), scaleY: 50 + Math.floor(Math.random() * 200), scaleZ: 50 + Math.floor(Math.random() * 200),
        defX: Math.floor(Math.random() * 201 - 100), defY: Math.floor(Math.random() * 201 - 100), defZ: Math.floor(Math.random() * 201 - 100),
    };
    dispatch({ type: 'SET_STATE', payload: newState });
  }, []);
  
  const handleReset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  useEffect(() => {
      handleRandomize();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { 
      state, 
      dispatch, 
      generatedPrompts, 
      handleRandomize,
      handleReset,
      handleGenerateImage,
      handleRandomizeSection,
      imageUrl,
      isGeneratingImage,
      generationError,
      savedGenerations,
      handleSaveGeneration,
      handleRestoreGeneration,
      handleDeleteGeneration,
      toastMessage,
      showToast,
  };
};
