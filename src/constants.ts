import type { FC } from 'react';
import type { Option, PromptState } from './types';
import SelectInput from './components/SelectInput';
import NumberInput from './components/NumberInput';
import SliderInput from './components/SliderInput';
import ColorPaletteInput from './components/ColorPaletteInput';

export const GBase: Option[] = [{id:'sphere',es:'Esfera / elipsoide',en:'Sphere / ellipsoid'},{id:'cube',es:'Cubo / caja',en:'Cube / box'},{id:'cylinder',es:'Cilindro / cápsula',en:'Cylinder / capsule'},{id:'cone',es:'Cono / pirámide',en:'Cone / pyramid'},{id:'torus',es:'Torus / donut',en:'Torus / donut'},{id:'blob',es:'Blob / metaball',en:'Blob / metaball'}];
export const GPerfil: Option[] = [{id:'compact',es:'Compacta',en:'Compact'},{id:'elongated',es:'Alargada',en:'Elongated'},{id:'flattened',es:'Aplanada',en:'Flattened'},{id:'slender',es:'Esbelta',en:'Slender'},{id:'segmented',es:'Segmentada',en:'Segmented'},{id:'irregular',es:'Irregular',en:'Irregular'}];
export const GSim: Option[] = [{id:'sym',es:'Simétrica',en:'Symmetrical'},{id:'asym',es:'Asimétrica leve',en:'Slightly asymmetric'},{id:'mirror',es:'Doble por espejo',en:'Mirrored duplicate'}];
export const GDef: Option[] = [{id:'none',es:'Sin deformación',en:'No deformation'},{id:'stretch',es:'Estirar / escalar no uniforme',en:'Non-uniform stretch'},{id:'twist',es:'Torsión',en:'Twist'},{id:'bend',es:'Curvar',en:'Bend'},{id:'smoothNoise',es:'Ruido suave (perlin)',en:'Smooth noise (perlin)'},{id:'fractalNoise',es:'Ruido fractal',en:'Fractal noise'},{id:'inflate',es:'Hinchado / presión',en:'Inflated / pressure'},{id:'soften',es:'Suavizado / chamfer',en:'Soften / chamfer'}];
export const GEje: Option[] = [{id:'vertical',es:'Vertical',en:'Vertical'},{id:'horizontal',es:'Horizontal',en:'Horizontal'},{id:'diagonal',es:'Diagonal',en:'Diagonal'},{id:'curved',es:'Curva / S-curve',en:'Curved / S-curve'}];
export const GBool: Option[] = [{id:'none',es:'Ninguna',en:'None'},{id:'union',es:'Unión (fusión)',en:'Union (merge)'},{id:'intersect',es:'Intersección',en:'Intersection'},{id:'difference',es:'Diferencia / corte',en:'Difference / cut'}];
export const GBoolPrim: Option[] = [{id:'sphere',es:'Esfera',en:'Sphere'},{id:'cube',es:'Cubo',en:'Cube'},{id:'cylinder',es:'Cilindro',en:'Cylinder'},{id:'torus',es:'Torus',en:'Torus'}];
export const GRep: Option[] = [{id:'none',es:'Sin repetición',en:'No repetition'},{id:'array',es:'Array lineal',en:'Linear array'},{id:'radial',es:'Radial / circular',en:'Radial / circular'},{id:'stack',es:'Apilado',en:'Stacked'}];
export const GFusion: Option[] = [{id:'separate',es:'Separadas',en:'Separated'},{id:'touching',es:'En contacto',en:'Touching'},{id:'fused',es:'Fusionadas (metaball)',en:'Fused (metaball)'}];
export const GBalance: Option[] = [{id:'rest',es:'Apoyadas en superficie',en:'Resting on a surface'},{id:'floating',es:'Suspendidas / flotando',en:'Suspended / floating'},{id:'balanced',es:'Equilibrio precario',en:'Precariously balanced'}];
export const MTipo: Option[] = [{id:'marble-white',es:'Mármol blanco',en:'White marble'},{id:'marble-black',es:'Mármol negro',en:'Black marble'},{id:'steel-brushed',es:'Acero cepillado',en:'Brushed steel'},{id:'steel-polished',es:'Acero pulido / cromo',en:'Polished steel / chrome'},{id:'aluminum-anodized',es:'Aluminio anodizado',en:'Anodized aluminum'},{id:'bronze',es:'Bronce',en:'Bronze'},{id:'copper',es:'Cobre',en:'Copper'},{id:'metallic-paint',es:'Pintura metálica',en:'Metallic paint'},{id:'plastic-matte',es:'Plástico mate',en:'Matte plastic'},{id:'plastic-satin',es:'Plástico satinado',en:'Satin plastic'},{id:'rubber',es:'Goma / silicona',en:'Rubber / silicone'},{id:'glass-frosted',es:'Vidrio esmerilado',en:'Frosted glass'},{id:'glass-clear',es:'Vidrio claro',en:'Clear glass'}];
export const MBrillo: Option[] = [{id:'ultraMatte',es:'Ultramate',en:'Ultra-matte'},{id:'satin',es:'Satinado',en:'Satin'},{id:'semi',es:'Semibrillante',en:'Semi-gloss'},{id:'gloss',es:'Brillante',en:'Gloss'}];
export const MTex: Option[] = [{id:'smooth',es:'Liso',en:'Smooth'},{id:'fineGrain',es:'Granulado fino',en:'Fine grain'},{id:'rough',es:'Rugoso',en:'Rough'},{id:'brushed',es:'Cepillado',en:'Brushed'},{id:'hammered',es:'Martillado',en:'Hammered'}];
export const MColor: Option[] = [{id:'grey',es:'Gris metálico',en:'Metallic grey'},{id:'black',es:'Negro',en:'Black'},{id:'white',es:'Blanco',en:'White'},{id:'steel',es:'Acero azulado',en:'Blued steel'},{id:'bronze',es:'Bronce',en:'Bronze'},{id:'copper',es:'Cobre',en:'Copper'}];
export const MDisp: Option[] = [{id:'none',es:'Sin desplazamiento',en:'No displacement'},{id:'micro',es:'Microrelieve',en:'Micro displacement'},{id:'mid',es:'Desplazamiento medio',en:'Mid displacement'},{id:'strong',es:'Desplazamiento fuerte',en:'Strong displacement'}];
export const MSSS: Option[] = [{id:'none',es:'Sin SSS',en:'No SSS'},{id:'low',es:'SSS bajo',en:'Low SSS'},{id:'mid',es:'SSS medio',en:'Mid SSS'},{id:'high',es:'SSS alto',en:'High SSS'}];
export const LEsquema: Option[] = [
    {id:'studio',es:'Estudio básico',en:'Studio basic'},
    {id:'three',es:'Tres puntos',en:'Three-point'},
    {id:'dramatic',es:'Dramática alto contraste',en:'Dramatic high contrast'},
    {id:'rim',es:'Rim / contraluz',en:'Rim / backlight'},
    {id:'rembrandt',es:'Iluminación Rembrandt',en:'Rembrandt lighting'},
    {id:'cinematic',es:'Cinemático (complementarios)',en:'Cinematic (complementary colors)'},
    {id:'softbox',es:'Softbox',en:'Softbox'},
    {id:'hard_sun',es:'Luz solar dura',en:'Hard sunlight'}
];
export const LHDRI: Option[] = [{id:'none',es:'Sin HDRI',en:'No HDRI'},{id:'soft',es:'HDRI suave',en:'Soft HDRI'},{id:'studio',es:'HDRI estudio',en:'Studio HDRI'}];
export const LContraste: Option[] = [{id:'low',es:'Bajo',en:'Low'},{id:'mid',es:'Medio',en:'Medium'},{id:'high',es:'Alto',en:'High'}];
export const COLOR_PALETTE: {id: string; es: string; en: string; hex: string}[] = [
    {id:'none',es:'Blanco neutro',en:'Neutral white', hex: '#FFFFFF'},
    {id:'amber',es:'Ámbar',en:'Amber', hex: '#FFBF00'},
    {id:'warm_white',es:'Blanco cálido',en:'Warm white', hex: '#FFF4E0'},
    {id:'blue',es:'Azul frío',en:'Cool blue', hex: '#A3D5FF'},
    {id:'cyan',es:'Cian',en:'Cyan', hex: '#00FFFF'},
    {id:'magenta',es:'Magenta',en:'Magenta', hex: '#FF00FF'},
    {id:'red',es:'Rojo dramático',en:'Dramatic red', hex: '#E50000'},
    {id:'green',es:'Verde',en:'Green', hex: '#00FF00'},
];
export const EFondo: Option[] = [{id:'black',es:'Negro puro',en:'Pure black'},{id:'white',es:'Blanco puro',en:'Pure white'},{id:'grey',es:'Gris neutro',en:'Neutral grey'},{id:'grad',es:'Backdrop con gradiente',en:'Gradient backdrop'}];
export const EPlano: Option[] = [{id:'none',es:'Sin plano (flotando)',en:'No plane (floating)'},{id:'matte',es:'Plano mate',en:'Matte plane'},{id:'reflect',es:'Plano reflectante',en:'Reflective plane'}];
export const EEfx: Option[] = [{id:'none',es:'Sin efecto',en:'No effect'},{id:'haze',es:'Bruma volumétrica sutil',en:'Subtle volumetric haze'},{id:'vignette',es:'Viñeteo leve',en:'Light vignette'}];
export const CPersp: Option[] = [{id:'real',es:'Perspectiva realista',en:'Perspective'},{id:'ortho',es:'Ortográfica',en:'Orthographic'}];
export const CDOF: Option[] = [{id:'shallow',es:'DOF bajo (bokeh)',en:'Shallow DOF'},{id:'medium',es:'DOF medio',en:'Medium DOF'},{id:'deep',es:'DOF profundo',en:'Deep DOF'}];
export const CLente: Option[] = [{id:'35',es:'35–50mm estándar',en:'35–50mm standard'},{id:'85',es:'85–105mm tele corto',en:'85–105mm short tele'},{id:'16',es:'16–24mm gran angular',en:'16–24mm wide'},{id:'macro',es:'Lente macro',en:'Macro lens'}];
export const CComp: Option[] = [{id:'center',es:'Centrado minimal',en:'Centered minimal'},{id:'tercios',es:'Regla de tercios',en:'Rule of thirds'},{id:'negativo',es:'Espacio negativo',en:'Negative space'}];
export const RMotor: Option[] = [{id:'octane',es:'Octane',en:'Octane'},{id:'cycles',es:'Cycles',en:'Cycles'},{id:'redshift',es:'Redshift',en:'Redshift'},{id:'arnold',es:'Arnold',en:'Arnold'}];
export const RRes: Option[] = [{id:'8k',es:'8K',en:'8K'},{id:'4k',es:'4K',en:'4K'},{id:'2k',es:'2K',en:'2K'}];
export const RSamples: Option[] = [{id:'ultra',es:'Sampling alto (ultra-clean)',en:'High sampling (ultra-clean)'},{id:'med',es:'Sampling medio',en:'Medium sampling'}];
export const RPost: Option[] = [{id:'none',es:'Sin postproceso',en:'No post'},{id:'bloom',es:'Bloom sutil',en:'Subtle bloom'},{id:'glow',es:'Glow leve',en:'Light glow'},{id:'aberr',es:'Aberración cromática sutil',en:'Subtle chromatic aberration'}];
export const RNoise: Option[] = [{id:'denoise',es:'Denoise limpio',en:'Clean denoise'},{id:'natural',es:'Ruido natural leve',en:'Natural slight noise'}];
export const RLook: Option[] = [{id:'photoreal',es:'Fotorrealista',en:'Photorealistic'},{id:'design',es:'Diseño de producto',en:'Product design'},{id:'sculpt',es:'Escultórico',en:'Sculptural'}];

export const ROTATION_PRESETS: Option[] = [
    {id: '0', es: 'Ninguno', en: 'None'},
    {id: '45', es: '45° aleatorio', en: 'Random 45°'},
    {id: '90', es: '90° aleatorio', en: 'Random 90°'},
    {id: 'rand', es: 'Total aleatorio', en: 'Full Random'},
];

// --- NEW CINEMATOGRAPHY OPTIONS ---
export const CShotType: Option[] = [
    {id: 'none', es: 'Ninguno', en: 'None'},
    {id: 'els', es: 'Plano general extremo (ELS)', en: 'Extreme Long Shot (ELS)'},
    {id: 'ls', es: 'Plano general (LS)', en: 'Long Shot (LS)'},
    {id: 'fs', es: 'Plano entero (FS)', en: 'Full Shot (FS)'},
    {id: 'ms', es: 'Plano medio (MS)', en: 'Medium Shot (MS)'},
    {id: 'cu', es: 'Primer plano (CU)', en: 'Close-Up (CU)'},
    {id: 'ecu', es: 'Plano detalle (ECU)', en: 'Extreme Close-Up (ECU)'},
];
export const CCameraMove: Option[] = [
    {id: 'none', es: 'Estática', en: 'Static'},
    {id: 'pan', es: 'Panorámica (Pan)', en: 'Pan'},
    {id: 'tilt', es: 'Inclinación (Tilt)', en: 'Tilt'},
    {id: 'dolly_in', es: 'Dolly In', en: 'Dolly In'},
    {id: 'dolly_out', es: 'Dolly Out', en: 'Dolly Out'},
    {id: 'truck', es: 'Trucking / Travelling', en: 'Trucking / Travelling'},
    {id: 'handheld', es: 'Cámara en mano', en: 'Handheld'},
    {id: 'steadicam', es: 'Steadicam', en: 'Steadicam'},
];
export const CDutchAngle: Option[] = [
    {id: 'none', es: 'Ninguno', en: 'None'},
    {id: 'subtle_left', es: 'Inclinación sutil izq.', en: 'Subtle left tilt'},
    {id: 'subtle_right', es: 'Inclinación sutil der.', en: 'Subtle right tilt'},
    {id: 'strong_left', es: 'Inclinación fuerte izq.', en: 'Strong left tilt'},
    {id: 'strong_right', es: 'Inclinación fuerte der.', en: 'Strong right tilt'},
];
export const CKeyLightPos: Option[] = [
    {id: '45_right', es: '45° Derecha', en: '45° Right'},
    {id: '45_left', es: '45° Izquierda', en: '45° Left'},
    {id: 'top', es: 'Cenital', en: 'Top Light'},
    {id: 'front', es: 'Frontal', en: 'Front Light'},
];
export const CFillLightInt: Option[] = [
    {id: 'low', es: 'Baja (alto contraste)', en: 'Low (high contrast)'},
    {id: 'medium', es: 'Media (equilibrado)', en: 'Medium (balanced)'},
    {id: 'high', es: 'Alta (bajo contraste)', en: 'High (low contrast)'},
];
export const CBackLightType: Option[] = [
    {id: 'none', es: 'Ninguna', en: 'None'},
    {id: 'rim', es: 'Luz de contorno (Rim)', en: 'Rim light'},
    {id: 'hair', es: 'Luz de pelo (Hair)', en: 'Hair light'},
    {id: 'kicker', es: 'Kicker', en: 'Kicker'},
];
export const CAnimActive: Option[] = [
    {id: 'false', es: 'No', en: 'No'},
    {id: 'true', es: 'Sí', en: 'Yes'},
];
export const CAnimEdit: Option[] = [
    {id: 'none', es: 'Corte simple', en: 'Simple Cut'},
    {id: 'cut_on_action', es: 'Corte en acción', en: 'Cut on Action'},
    {id: 'match_cut', es: 'Corte de raccord', en: 'Match Cut'},
    {id: 'jump_cut', es: 'Jump Cut', en: 'Jump Cut'},
    {id: 'dissolve', es: 'Disolución', en: 'Dissolve'},
];

// --- STRUCTURED CONTROL SECTIONS ---
export type Control = {
  id: keyof PromptState;
  label: string;
  component: FC<any>;
  colSpan?: number;
  options?: any[]; // Lo suficientemente flexible para Option[] y ColorOption[]
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  condition?: (state: PromptState) => boolean;
};
export type Section = {
  title: string;
  columns: number;
  controls: Control[];
};

export const CONTROL_SECTIONS: Section[] = [
  {
    title: "Forma 3D",
    columns: 2,
    controls: [
      { id: "gBase", label: "Geometría base", options: GBase, component: SelectInput },
      { id: "gPerfil", label: "Perfil / proporción", options: GPerfil, component: SelectInput },
      { id: "gSim", label: "Simetría", options: GSim, component: SelectInput },
      { id: "gDef", label: "Deformación principal", options: GDef, component: SelectInput },
      { id: "gDefInt", label: "Intensidad deformación", min: 0, max: 100, step: 1, component: SliderInput, colSpan: 2 },
      { id: "gEje", label: "Eje / dirección", options: GEje, component: SelectInput },
      { id: "gBool", label: "Operación booleana", options: GBool, component: SelectInput },
      { id: "gBoolPrim", label: "Primitiva auxiliar", options: GBoolPrim, component: SelectInput },
      { id: "gRep", label: "Repetición / arreglo", options: GRep, component: SelectInput },
      { id: "gCount", label: "Nº de objetos", min: 1, max: 7, step: 1, component: NumberInput },
      { id: "gFusion", label: "Grado de fusión", options: GFusion, component: SelectInput },
      { id: "gBalance", label: "Estado / balance", options: GBalance, component: SelectInput },
    ]
  },
  {
    title: "Cámara y Cinematografía",
    columns: 2,
    controls: [
        { id: "camShotType", label: "Tipo de plano", options: CShotType, component: SelectInput },
        { id: "camMove", label: "Movimiento de cámara", options: CCameraMove, component: SelectInput },
        { id: "camPersp", label: "Perspectiva", options: CPersp, component: SelectInput },
        { id: "camDOF", label: "Profundidad de campo", options: CDOF, component: SelectInput },
        { id: "camLente", label: "Lente / POV", options: CLente, component: SelectInput },
        { id: "camDutch", label: "Ángulo holandés", options: CDutchAngle, component: SelectInput },
        { id: "camComp", label: "Composición", options: CComp, component: SelectInput },
        { id: "camAlt", label: "Altura de cámara (m)", min: -10, max: 50, step: 0.1, component: SliderInput, colSpan: 2 },
    ]
  },
  {
    title: "Posición absoluta (metros)",
    columns: 1,
    controls: [
      { id: "posX", label: "X (izq-der)", min: -10, max: 10, step: 0.1, component: SliderInput },
      { id: "posY", label: "Y (profundidad)", min: -10, max: 10, step: 0.1, component: SliderInput },
      { id: "posZ", label: "Z (altura)", min: -10, max: 10, step: 0.1, component: SliderInput },
    ]
  },
  {
    title: "Rotación exacta (grados)",
    columns: 1,
    controls: [
      { id: "rotX", label: "Rot X", min: 0, max: 360, component: SliderInput },
      { id: "rotY", label: "Rot Y", min: 0, max: 360, component: SliderInput },
      { id: "rotZ", label: "Rot Z", min: 0, max: 360, component: SliderInput },
      { id: "rotPreset", label: "Preset rotación", options: ROTATION_PRESETS, component: SelectInput },
    ]
  },
  {
    title: "Escalado no uniforme (%)",
    columns: 1,
    controls: [
      { id: "scaleX", label: "Escala X %", min: 10, max: 500, step: 5, component: SliderInput },
      { id: "scaleY", label: "Escala Y %", min: 10, max: 500, step: 5, component: SliderInput },
      { id: "scaleZ", label: "Escala Z %", min: 10, max: 500, step: 5, component: SliderInput },
    ]
  },
  {
    title: "Deformación adicional (%)",
    columns: 1,
    controls: [
      { id: "defX", label: "Deform X %", min: -100, max: 100, step: 1, component: SliderInput },
      { id: "defY", label: "Deform Y %", min: -100, max: 100, step: 1, component: SliderInput },
      { id: "defZ", label: "Deform Z %", min: -100, max: 100, step: 1, component: SliderInput },
    ]
  },
  {
    title: "Material y superficie",
    columns: 2,
    controls: [
        { id: "mTipo", label: "Tipo de material", options: MTipo, component: SelectInput },
        { id: "mBrillo", label: "Reflectancia / brillo", options: MBrillo, component: SelectInput },
        { id: "mTex", label: "Textura / microdetalle", options: MTex, component: SelectInput },
        { id: "mColor", label: "Color principal", options: MColor, component: SelectInput },
        { id: "mDisp", label: "Desplazamiento / relieve", options: MDisp, component: SelectInput },
        { id: "mSSS", label: "Subsurface / translucidez", options: MSSS, component: SelectInput },
    ]
  },
  {
    title: "Iluminación Detallada",
    columns: 2,
    controls: [
        { id: "luzEsquema", label: "Esquema general", options: LEsquema, component: SelectInput },
        { id: "luzHDRI", label: "HDRI / ambiente", options: LHDRI, component: SelectInput },
        { id: "luzKeyPos", label: "Posición Key Light", options: CKeyLightPos, component: SelectInput },
        { id: "luzFillInt", label: "Intensidad Fill Light", options: CFillLightInt, component: SelectInput },
        { id: "luzBackType", label: "Tipo Backlight", options: CBackLightType, component: SelectInput },
        { id: "luzContraste", label: "Contraste", options: LContraste, component: SelectInput },
        { id: "luzColor", label: "Color / gel", options: COLOR_PALETTE, component: ColorPaletteInput, colSpan: 2 },
    ]
  },
  {
    title: "Entorno y Render",
    columns: 2,
    controls: [
        { id: "envFondo", label: "Fondo", options: EFondo, component: SelectInput },
        { id: "envPlano", label: "Plano de apoyo", options: EPlano, component: SelectInput },
        { id: "envEfx", label: "Efectos ambientales", options: EEfx, component: SelectInput },
        { id: "rMotor", label: "Motor", options: RMotor, component: SelectInput },
        { id: "rRes", label: "Resolución", options: RRes, component: SelectInput },
        { id: "rNoise", label: "Ruido / denoise", options: RNoise, component: SelectInput },
        { id: "rLook", label: "Estilo", options: RLook, component: SelectInput },
    ]
  },
  {
    title: "Animación y Postproceso",
    columns: 2,
    controls: [
        { id: "animActive", label: "Animación", options: CAnimActive, component: SelectInput },
        { id: "animEdit", label: "Tipo de corte/transición", options: CAnimEdit, component: SelectInput, condition: (s) => s.animActive === 'true' },
        { id: "rPost", label: "Efectos de postproceso", options: RPost, component: SelectInput },
        { id: "rSamples", label: "Muestreo", options: RSamples, component: SelectInput },
    ]
  }
];

// IDs for the "Simple Mode" controls
export const SIMPLE_CONTROL_IDS: (keyof PromptState)[] = [
    'gBase', 'gPerfil', 'gCount', 'rLook',
    'mTipo', 'mBrillo', 'mTex', 'mColor',
    'luzEsquema', 'luzContraste', 'luzColor',
    'envFondo', 'envPlano',
    'camShotType', 'camLente', 'camDOF', 'camComp'
];

// Filtered sections for "Simple Mode"
export const SIMPLE_CONTROL_SECTIONS: Section[] = CONTROL_SECTIONS
    .map(section => ({
        ...section,
        controls: section.controls.filter(control => SIMPLE_CONTROL_IDS.includes(control.id))
    }))
    .filter(section => section.controls.length > 0);