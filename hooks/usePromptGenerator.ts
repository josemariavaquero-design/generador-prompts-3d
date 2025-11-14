
import { useReducer, useMemo, useCallback, useEffect } from 'react';
import type { PromptState, Action, Option } from '../types';
import * as C from '../constants';

const initialState: PromptState = {
  gBase: 'sphere', gPerfil: 'compact', gSim: 'sym', gDef: 'none', gDefInt: 50, gEje: 'vertical',
  gBool: 'none', gBoolPrim: 'sphere', gRep: 'none', gCount: 1, gFusion: 'separate', gBalance: 'rest',
  posX: 0, posY: 0, posZ: 0.5,
  rotX: 0, rotY: 0, rotZ: 0, rotPreset: '0',
  scaleX: 100, scaleY: 100, scaleZ: 100,
  defX: 0, defY: 0, defZ: 0,
  mTipo: 'steel-polished', mBrillo: 'semi', mTex: 'smooth', mColor: 'grey', mDisp: 'none', mSSS: 'none',
  luzEsquema: 'studio', luzKey: 'angled', luzRim: 'subtle', luzHDRI: 'studio', luzContraste: 'mid', luzColor: 'none',
  envFondo: 'grad', envPlano: 'reflect', envEfx: 'none',
  camPlano: 'medium', camPersp: 'real', camDOF: 'medium', camLente: '35', camAlt: 1.6, camComp: 'center',
  rMotor: 'octane', rRes: '4k', rSamples: 'med', rPost: 'bloom', rNoise: 'denoise', rLook: 'photoreal'
};

function reducer(state: PromptState, action: Action): PromptState {
  switch (action.type) {
    case 'SET_VALUE':
      return { ...state, [action.payload.key]: action.payload.value };
    case 'SET_STATE':
        return { ...state, ...action.payload };
    default:
      return state;
  }
}

function findOption(arr: Option[], id: string) {
    return arr.find(x => x.id === id);
}

function pick<T,>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export const usePromptGenerator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Memoize dependent state values for the useCallback dependency array.
  const { camPersp, camLente, camPlano, camDOF, envFondo, luzContraste, luzHDRI } = state;
  
  const adjustCoherence = useCallback(() => {
    const updates: Partial<PromptState> = {};

    if (camPersp === 'ortho' && camLente === 'macro') {
      updates.camLente = '35';
    }
    if (camPlano === 'macro') {
      if (camDOF !== 'shallow') updates.camDOF = 'shallow';
      if (camLente !== 'macro') updates.camLente = 'macro';
    }
    if (envFondo === 'black' && luzContraste === 'high' && luzHDRI === 'soft') {
      updates.luzHDRI = 'studio';
    }
    if (Object.keys(updates).length > 0) {
      dispatch({ type: 'SET_STATE', payload: updates });
    }
  }, [dispatch, camPersp, camLente, camPlano, camDOF, envFondo, luzContraste, luzHDRI]);
  
  // Effect to automatically adjust settings for coherence.
  useEffect(() => {
    adjustCoherence();
  }, [adjustCoherence]);


  // Effect to handle rotation presets.
  useEffect(() => {
    let payload: Partial<PromptState> | null = null;
    switch (state.rotPreset) {
      case '0': // User selected 'None'
        // Only dispatch if values are not already 0 to prevent loops.
        if (state.rotX !== 0 || state.rotY !== 0 || state.rotZ !== 0) {
          payload = { rotX: 0, rotY: 0, rotZ: 0 };
        }
        break;
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
    if (payload) {
      dispatch({ type: 'SET_STATE', payload });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.rotPreset, dispatch]);


  const generatedPrompts = useMemo(() => {
    const s = state;
    
    const buildBlock = (parts: (string | undefined | null | false)[]) => parts.filter(Boolean).join(', ');

    const getOpt = (lang: 'es' | 'en', arr: Option[], id: string, skipIfId?: string | string[]) => {
        if (skipIfId && (Array.isArray(skipIfId) ? skipIfId.includes(id) : skipIfId === id)) return null;
        const option = findOption(arr, id);
        return option?.[lang] ? option[lang].toLowerCase() : null;
    }
    
    const buildTransform = (lang: 'es' | 'en') => {
        const px = s.posX.toFixed(1); const py = s.posY.toFixed(1); const pz = s.posZ.toFixed(1);
        const rx = s.rotX; const ry = s.rotY; const rz = s.rotZ;
        const sx = s.scaleX; const sy = s.scaleY; const sz = s.scaleZ;
        const dx = s.defX; const dy = s.defY; const dz = s.defZ;
        
        let parts: string[] = [];

        if (px !== '0.0' || py !== '0.0' || pz !== '0.5') parts.push(lang === 'es' ? `posición X:${px}m, Y:${py}m, Z:${pz}m` : `position X:${px}m, Y:${py}m, Z:${pz}m`);
        if (rx !== 0 || ry !== 0 || rz !== 0) parts.push(lang === 'es' ? `rotación X:${rx}°, Y:${ry}°, Z:${rz}°` : `rotation X:${rx}°, Y:${ry}°, Z:${rz}°`);
        if (sx !== 100 || sy !== 100 || sz !== 100) parts.push(lang === 'es' ? `escalado X:${sx}%, Y:${sy}%, Z:${sz}%` : `scale X:${sx}%, Y:${sy}%, Z:${sz}%`);
        if (dx !== 0 || dy !== 0 || dz !== 0) parts.push(lang === 'es' ? `deformación X:${dx>0?'+':''}${dx}%, Y:${dy>0?'+':''}${dy}%, Z:${dz>0?'+':''}${dz}%` : `deformation X:${dx>0?'+':''}${dx}%, Y:${dy>0?'+':''}${dy}%, Z:${dz>0?'+':''}${dz}%`);
        
        return parts.join(', ');
    }
    
    const buildForma = (lang: 'es' | 'en') => {
        const getIntensityWord = (lang: 'es' | 'en', value: number): string => {
            if (value === 0) return '';
            if (value <= 10) return lang === 'es' ? 'casi imperceptible' : 'almost imperceptible';
            if (value <= 33) return lang === 'es' ? 'sutil' : 'subtle';
            if (value <= 66) return lang === 'es' ? 'media' : 'medium';
            if (value <= 90) return lang === 'es' ? 'fuerte' : 'strong';
            return lang === 'es' ? 'extrema' : 'extreme';
        }

        const ops: string[] = [];
        if (s.gDef !== 'none') {
            const intensity = getIntensityWord(lang, s.gDefInt);
            const def = getOpt(lang, C.GDef, s.gDef);
            const eje = getOpt(lang, C.GEje, s.gEje);
            ops.push(lang === 'es' 
                ? `${def} ${intensity} en eje ${eje}` 
                : `${def} ${intensity} along ${eje} axis`);
        }
        if (s.gBool !== 'none') {
            const bool = getOpt(lang, C.GBool, s.gBool);
            const bprim = getOpt(lang, C.GBoolPrim, s.gBoolPrim);
            ops.push(lang === 'es' ? `${bool} con ${bprim}`: `${bool} with ${bprim}`);
        }
        if (s.gRep !== 'none') {
            const rep = getOpt(lang, C.GRep, s.gRep);
            if(rep) ops.push(rep);
        }
        
        const opsTxt = ops.join(', ');
        const trans = buildTransform(lang);
        const base = getOpt(lang, C.GBase, s.gBase);
        
        const mainDesc = buildBlock([
            getOpt(lang, C.GPerfil, s.gPerfil),
            getOpt(lang, C.GSim, s.gSim)
        ]);

        const groupDesc = s.gCount > 1
          ? buildBlock([
              `${s.gCount} ${lang === 'es' ? 'objetos' : 'objects'}`,
              getOpt(lang, C.GFusion, s.gFusion),
              getOpt(lang, C.GBalance, s.gBalance)
            ])
          : getOpt(lang, C.GBalance, s.gBalance, 'rest');
        
        const parts = [
            lang === 'es' ? `base ${base}` : `${base} base`,
            mainDesc,
            opsTxt,
            groupDesc,
            trans,
        ];
        return parts.filter(Boolean).join(' ** ');
    }
    
    const buildMaterial = (lang: 'es' | 'en') => buildBlock([
        getOpt(lang, C.MTipo, s.mTipo),
        getOpt(lang, C.MBrillo, s.mBrillo),
        getOpt(lang, C.MTex, s.mTex, 'smooth'),
        getOpt(lang, C.MColor, s.mColor),
        getOpt(lang, C.MDisp, s.mDisp, 'none'),
        getOpt(lang, C.MSSS, s.mSSS, 'none'),
    ]);

    const buildLuz = (lang: 'es' | 'en') => {
        const details = buildBlock([
            lang === 'es' ? `clave ${getOpt(lang, C.LKey, s.luzKey)}` : `key ${getOpt(lang, C.LKey, s.luzKey)}`, 
            getOpt(lang, C.LRim, s.luzRim, 'none'), 
            getOpt(lang, C.LHDRI, s.luzHDRI, 'none'), 
            lang === 'es' ? `contraste ${getOpt(lang, C.LContraste, s.luzContraste)}` : `${getOpt(lang, C.LContraste, s.luzContraste)} contrast`, 
            getOpt(lang, C.LColor, s.luzColor, 'none') ? (lang === 'es' ? `color ${getOpt(lang, C.LColor, s.luzColor)}` : `${getOpt(lang, C.LColor, s.luzColor)} color`) : false
        ]);
        return `${getOpt(lang, C.LEsquema, s.luzEsquema)} — ${details}`;
    }

    const buildEntorno = (lang: 'es' | 'en') => buildBlock([
        getOpt(lang, C.EFondo, s.envFondo),
        getOpt(lang, C.EPlano, s.envPlano, 'none'),
        getOpt(lang, C.EEfx, s.envEfx, 'none')
    ]);
    
    const buildCamara = (lang: 'es' | 'en') => {
        const part1 = buildBlock([
            getOpt(lang, C.CPlano, s.camPlano), 
            getOpt(lang, C.CPersp, s.camPersp), 
            getOpt(lang, C.CDOF, s.camDOF)
        ]);
        const part2 = buildBlock([
            getOpt(lang, C.CLente, s.camLente), 
            lang === 'es' ? `cámara a ${s.camAlt.toFixed(1)} m` : `camera at ${s.camAlt.toFixed(1)} m`, 
            lang === 'es' ? `composición ${getOpt(lang, C.CComp, s.camComp)}` : `${getOpt(lang, C.CComp, s.camComp)} composition`
        ]);
        return `${part1} ** ${part2}`;
    }

    const buildRender = (lang: 'es' | 'en') => buildBlock([
        getOpt(lang, C.RMotor, s.rMotor),
        getOpt(lang, C.RRes, s.rRes),
        getOpt(lang, C.RSamples, s.rSamples),
        getOpt(lang, C.RPost, s.rPost, 'none'),
        getOpt(lang, C.RNoise, s.rNoise),
        getOpt(lang, C.RLook, s.rLook)
    ].map(p => p && p.toUpperCase()));
    
    const es = [buildForma('es'), buildMaterial('es'), buildLuz('es'), buildEntorno('es'), buildCamara('es'), buildRender('es')].filter(Boolean).join(' ** ');
    const en = [buildForma('en'), buildMaterial('en'), buildLuz('en'), buildEntorno('en'), buildCamara('en'), buildRender('en')].filter(Boolean).join(' ** ');
    
    return { es, en };

  }, [state]);

  const handleRandomize = useCallback(() => {
    const newState: Partial<PromptState> = {
        gBase: pick(C.GBase).id, gPerfil: pick(C.GPerfil).id, gSim: pick(C.GSim).id, gDef: pick(C.GDef).id,
        gDefInt: Math.floor(Math.random() * 101), gEje: pick(C.GEje).id, gBool: pick(C.GBool).id, gBoolPrim: pick(C.GBoolPrim).id,
        gRep: pick(C.GRep).id, gCount: 1 + Math.floor(Math.random() * 3), gFusion: pick(C.GFusion).id, gBalance: pick(C.GBalance).id,
        mTipo: pick(C.MTipo).id, mBrillo: pick(C.MBrillo).id, mTex: pick(C.MTex).id, mColor: pick(C.MColor).id,
        mDisp: pick(C.MDisp).id, mSSS: pick(C.MSSS).id, luzEsquema: pick(C.LEsquema).id, luzKey: pick(C.LKey).id,
        luzRim: pick(C.LRim).id, luzHDRI: pick(C.LHDRI).id, luzContraste: pick(C.LContraste).id, luzColor: pick(C.LColor).id,
        envFondo: pick(C.EFondo).id, envPlano: pick(C.EPlano).id, envEfx: pick(C.EEfx).id, camPlano: pick(C.CPlano).id,
        camPersp: pick(C.CPersp).id, camDOF: pick(C.CDOF).id, camLente: pick(C.CLente).id, camAlt: parseFloat((Math.random() < 0.3 ? 0.6 : 1.6).toFixed(1)),
        camComp: pick(C.CComp).id, rMotor: pick(C.RMotor).id, rRes: pick(C.RRes).id, rSamples: pick(C.RSamples).id,
        rPost: pick(C.RPost).id, rNoise: pick(C.RNoise).id, rLook: pick(C.RLook).id,
        posX: parseFloat((Math.random() * 4 - 2).toFixed(1)),
        posY: parseFloat((Math.random() * 4 - 2).toFixed(1)),
        posZ: parseFloat((Math.random() * 2).toFixed(1)),
        rotX: Math.floor(Math.random() * 361),
        rotY: Math.floor(Math.random() * 361),
        rotZ: Math.floor(Math.random() * 361),
        scaleX: 50 + Math.floor(Math.random() * 200),
        scaleY: 50 + Math.floor(Math.random() * 200),
        scaleZ: 50 + Math.floor(Math.random() * 200),
        defX: parseFloat((Math.random() * 180 - 90).toFixed(0)),
        defY: parseFloat((Math.random() * 180 - 90).toFixed(0)),
        defZ: parseFloat((Math.random() * 180 - 90).toFixed(0)),
    };
    dispatch({ type: 'SET_STATE', payload: newState });
  }, []);
  
  const handleGenerate = useCallback(() => {
    // This function doesn't need to do much since the prompt is always live.
    // We can use it to trigger a "final" coherence check or other logic if needed.
    adjustCoherence();
  }, [adjustCoherence]);

  useEffect(() => {
      handleRandomize();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { state, dispatch, generatedPrompts, handleRandomize, handleGenerate };
};
