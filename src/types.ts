export interface Option {
  id: string;
  es: string;
  en: string;
}

export interface PromptState {
  gBase: string;
  gPerfil: string;
  gSim: string;
  gDef: string;
  gDefInt: number;
  gEje: string;
  gBool: string;
  gBoolPrim: string;
  gRep: string;
  gCount: number;
  gFusion: string;
  gBalance: string;
  posX: number;
  posY: number;
  posZ: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  rotPreset: string;
  scaleX: number;
  scaleY: number;
  scaleZ: number;
  defX: number;
  defY: number;
  defZ: number;
  mTipo: string;
  mBrillo: string;
  mTex: string;
  mColor: string;
  mDisp: string;
  mSSS: string;
  luzEsquema: string;
  luzHDRI: string;
  luzContraste: string;
  luzColor: string;
  luzKeyPos: string;
  luzFillInt: string;
  luzBackType: string;
  envFondo: string;
  envPlano: string;
  envEfx: string;
  camShotType: string;
  camMove: string;
  camDutch: string;
  camPersp: string;
  camDOF: string;
  camLente: string;
  camAlt: number;
  camComp: string;
  rMotor: string;
  rRes: string;
  rSamples: string;
  rPost: string;
  rNoise: string;
  rLook: string;
  animActive: string;
  animEdit: string;
}

export type Action = 
  // FIX: Removed `boolean` from value type as no state property is a boolean.
  | { type: 'SET_VALUE'; payload: { key: keyof PromptState; value: string | number } }
  | { type: 'SET_STATE'; payload: Partial<PromptState> }
  | { type: 'RESET' };

export interface SavedGeneration {
  id: number;
  imageUrl: string;
  state: PromptState;
  timestamp: number;
}