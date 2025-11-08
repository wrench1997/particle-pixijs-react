// src/index.ts
// 主组件
export { ParticleSystemEnhanced, type ParticleConfig, type ParticleBehavior } from './components/Particles/ParticleSystemEnhanced';
export { MultiEmitterSystem } from './components/Particles/ParticleDemo';

// 行为系统
export { behaviorRegistry, type IBehavior, BehaviorPriority } from './components/Particles/ParticleBehaviorSystem';

// 预设效果
export {
  fireEffect,
  waterEffect,
  edgeEffect,
  magicEffect,
  arrowParticleEffect,
  createTextureEffect
} from './components/Particles/ParticlePresets';

// 工具类
export { TextureManager } from './components/Particles/ParticleBehaviorSystem';
export * from './components/Particles/ParticleUtils';

// 行为导出
export * from './components/Particles/behaviors/BaseBehaviors';
export * from './components/Particles/behaviors/AdvancedBehaviors';
export * from './components/Particles/behaviors/ShapeBehaviors';
export * from './components/Particles/behaviors/TextureBehaviors';
export * from './components/Particles/behaviors/RotationBehaviors';
export * from './components/Particles/behaviors/SpeedBehaviors';
export * from './components/Particles/behaviors/GLSLArrowBehavior';
export * from './components/Particles/behaviors/DistortionBehavior';