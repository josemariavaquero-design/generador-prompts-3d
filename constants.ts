
import type { Option } from './types';
import SelectInput from './components/SelectInput';
import NumberInput from './components/NumberInput';

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
export const LEsquema: Option[] = [{id:'studio',es:'Estudio básico',en:'Studio basic'},{id:'three',es:'Tres puntos',en:'Three-point'},{id:'dramatic',es:'Dramática alto contraste',en:'Dramatic high contrast'},{id:'rim',es:'Rim / contraluz',en:'Rim / backlight'}];
export const LKey: Option[] = [{id:'lateral',es:'Lateral',en:'Lateral'},{id:'top',es:'Cenital',en:'Top'},{id:'front',es:'Frontal suave',en:'Soft front'},{id:'angled',es:'Angulada 45°',en:'Angled 45°'}];
export const LRim: Option[] = [{id:'none',es:'Sin rim',en:'No rim'},{id:'subtle',es:'Rim sutil',en:'Subtle rim'},{id:'strong',es:'Rim marcado',en:'Strong rim'}];
export const LHDRI: Option[] = [{id:'none',es:'Sin HDRI',en:'No HDRI'},{id:'soft',es:'HDRI suave',en:'Soft HDRI'},{id:'studio',es:'HDRI estudio',en:'Studio HDRI'}];
export const LContraste: Option[] = [{id:'low',es:'Bajo',en:'Low'},{id:'mid',es:'Medio',en:'Medium'},{id:'high',es:'Alto',en:'High'}];
export const LColor: Option[] = [{id:'none',es:'Blanco neutro',en:'Neutral white'},{id:'amber',es:'Ámbar',en:'Amber'},{id:'blue',es:'Azul',en:'Blue'},{id:'magenta',es:'Magenta',en:'Magenta'}];
export const EFondo: Option[] = [{id:'black',es:'Negro puro',en:'Pure black'},{id:'white',es:'Blanco puro',en:'Pure white'},{id:'grey',es:'Gris neutro',en:'Neutral grey'},{id:'grad',es:'Backdrop con gradiente',en:'Gradient backdrop'}];
export const EPlano: Option[] = [{id:'none',es:'Sin plano (flotando)',en:'No plane (floating)'},{id:'matte',es:'Plano mate',en:'Matte plane'},{id:'reflect',es:'Plano reflectante',en:'Reflective plane'}];
export const EEfx: Option[] = [{id:'none',es:'Sin efecto',en:'No effect'},{id:'haze',es:'Bruma volumétrica sutil',en:'Subtle volumetric haze'},{id:'vignette',es:'Viñeteo leve',en:'Light vignette'}];
export const CPlano: Option[] = [{id:'macro',es:'Macro / close-up',en:'Macro / close-up'},{id:'medium',es:'Plano medio',en:'Medium shot'},{id:'full',es:'Escena completa',en:'Full scene'},{id:'top',es:'Vista superior',en:'Top view'},{id:'iso',es:'Isométrica',en:'Isometric'}];
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

export const CONTROL_SECTIONS = [
  {
    title: "Forma 3D",
    columns: 3,
    controls: [
      { id: "gBase", label: "Geometría base", options: GBase, component: SelectInput },
      { id: "gPerfil", label: "Perfil / proporción", options: GPerfil, component: SelectInput },
      { id: "gSim", label: "Simetría", options: GSim, component: SelectInput },
      { id: "gDef", label: "Deformación principal", options: GDef, component: SelectInput },
      { id: "gDefInt", label: "Intensidad deformación", min: 0, max: 100, step: 1, component: NumberInput },
      { id: "gEje", label: "Eje / dirección", options: GEje, component: SelectInput },
      { id: "gBool", label: "Operación booleana", options: GBool, component: SelectInput },
      { id: "gBoolPrim", label: "Primitiva auxiliar", options: GBoolPrim, component: SelectInput },
      { id: "gRep", label: "Repetición / arreglo", options: GRep, component: SelectInput },
      { id: "gCount", label: "Nº de objetos", min: 1, max: 7, value: 2, component: NumberInput },
      { id: "gFusion", label: "Grado de fusión", options: GFusion, component: SelectInput },
      { id: "gBalance", label: "Estado / balance", options: GBalance, component: SelectInput },
    ]
  },
  {
    title: "Posición absoluta (metros)",
    columns: 3,
    controls: [
      { id: "posX", label: "X (izq-der)", step: 0.1, component: NumberInput },
      { id: "posY", label: "Y (profundidad)", step: 0.1, component: NumberInput },
      { id: "posZ", label: "Z (altura)", step: 0.1, component: NumberInput },
    ]
  },
  {
    title: "Rotación exacta (grados)",
    columns: 3,
    controls: [
      { id: "rotX", label: "Rot X", min: 0, max: 360, component: NumberInput },
      { id: "rotY", label: "Rot Y", min: 0, max: 360, component: NumberInput },
      { id: "rotZ", label: "Rot Z", min: 0, max: 360, component: NumberInput },
      { id: "rotPreset", label: "Preset rotación", options: ROTATION_PRESETS, component: SelectInput, colSpan: 3 },
    ]
  },
  {
    title: "Escalado no uniforme (%)",
    columns: 3,
    controls: [
      { id: "scaleX", label: "Escala X %", min: 10, max: 500, step: 5, component: NumberInput },
      { id: "scaleY", label: "Escala Y %", min: 10, max: 500, step: 5, component: NumberInput },
      { id: "scaleZ", label: "Escala Z %", min: 10, max: 500, step: 5, component: NumberInput },
    ]
  },
  {
    title: "Deformación adicional (%)",
    columns: 3,
    controls: [
      { id: "defX", label: "Deform X %", min: -90, max: 200, step: 5, component: NumberInput },
      { id: "defY", label: "Deform Y %", min: -90, max: 200, step: 5, component: NumberInput },
      { id: "defZ", label: "Deform Z %", min: -90, max: 200, step: 5, component: NumberInput },
    ]
  },
  {
    title: "Material y superficie",
    columns: 3,
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
    title: "Iluminación",
    columns: 3,
    controls: [
        { id: "luzEsquema", label: "Esquema", options: LEsquema, component: SelectInput },
        { id: "luzKey", label: "Key light", options: LKey, component: SelectInput },
        { id: "luzRim", label: "Relleno / rim", options: LRim, component: SelectInput },
        { id: "luzHDRI", label: "HDRI / ambiente", options: LHDRI, component: SelectInput },
        { id: "luzContraste", label: "Contraste", options: LContraste, component: SelectInput },
        { id: "luzColor", label: "Color / gel", options: LColor, component: SelectInput },
    ]
  },
  {
    title: "Entorno y fondo",
    columns: 3,
    controls: [
        { id: "envFondo", label: "Fondo", options: EFondo, component: SelectInput },
        { id: "envPlano", label: "Plano de apoyo", options: EPlano, component: SelectInput },
        { id: "envEfx", label: "Efectos ambientales", options: EEfx, component: SelectInput },
    ]
  },
  {
    title: "Cámara y composición",
    columns: 3,
    controls: [
        { id: "camPlano", label: "Tipo de plano", options: CPlano, component: SelectInput },
        { id: "camPersp", label: "Perspectiva", options: CPersp, component: SelectInput },
        { id: "camDOF", label: "Profundidad de campo", options: CDOF, component: SelectInput },
        { id: "camLente", label: "Lente / POV", options: CLente, component: SelectInput },
        { id: "camAlt", label: "Altura de cámara (m)", min: 0.1, max: 120, step: 0.1, component: NumberInput },
        { id: "camComp", label: "Composición", options: CComp, component: SelectInput },
    ]
  },
  {
    title: "Motor y calidad de render",
    columns: 3,
    controls: [
        { id: "rMotor", label: "Motor", options: RMotor, component: SelectInput },
        { id: "rRes", label: "Resolución", options: RRes, component: SelectInput },
        { id: "rSamples", label: "Muestreo", options: RSamples, component: SelectInput },
        { id: "rPost", label: "Postproceso", options: RPost, component: SelectInput },
        { id: "rNoise", label: "Ruido / denoise", options: RNoise, component: SelectInput },
        { id: "rLook", label: "Realismo", options: RLook, component: SelectInput },
    ]
  }
];