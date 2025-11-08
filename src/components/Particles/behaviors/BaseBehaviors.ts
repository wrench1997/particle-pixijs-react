// src/components/Particles/behaviors/BaseBehaviors.ts
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { IBehavior } from '../ParticleBehaviorSystem';
import { BehaviorPriority } from '../ParticleBehaviorSystem';

// Alpha行为
export class AlphaBehavior implements IBehavior {
  cleanup: any;
  updateGlobal: any;
  initParticles?(first: any): void {
    throw new Error('Method not implemented.');
  }
  type = 'alpha';
  order = BehaviorPriority.APPEARANCE; 
  
  
  init(particle: any, config: any): void {
    if (config.alpha && config.alpha.list) {
      particle.alphaList = config.alpha.list;
    }
  }

  update(particle: any, deltaTime: number, progress: number): void {
    // 在Particle类中已实现
  }
}

// 缩放行为
export class ScaleBehavior implements IBehavior {
  cleanup: any;
  updateGlobal: any;
  initParticles?(first: any): void {
    throw new Error('Method not implemented.');
  }
  type = 'scale';
  order = BehaviorPriority.TRANSFORM + 1; 
  
  init(particle: any, config: any): void {
    if (config.scale && config.scale.list) {
      particle.scaleList = config.scale.list;
    }
  }

  update(particle: any, deltaTime: number, progress: number): void {
    // 在Particle类中已实现
  }
}

// 颜色行为
export class ColorBehavior implements IBehavior {
  cleanup: any;
  updateGlobal: any;
  initParticles?(first: any): void {
    throw new Error('Method not implemented.');
  }
  type = 'color';
  order = BehaviorPriority.APPEARANCE + 1; 
  
  init(particle: any, config: any): void {
    if (config.color && config.color.list) {
      particle.colorList = config.color.list;
    }
  }

  update(particle: any, deltaTime: number, progress: number): void {
    // 在Particle类中已实现
  }
}


// 静态旋转行为
export class RotationStaticBehavior implements IBehavior {
  cleanup: any;
  updateGlobal: any;
  initParticles?(first: any): void {
    throw new Error('Method not implemented.');
  }
  type = 'rotationStatic';
  order = BehaviorPriority.TRANSFORM + 2;
  
  init(particle: any, config: any): void {
    if (config.min !== undefined && config.max !== undefined) {
      particle.rotation = (config.min + Math.random() * (config.max - config.min)) * (Math.PI / 180);
    }
  }

  update(particle: any, deltaTime: number, progress: number): void {
    // 静态旋转不需要更新
  }
}

