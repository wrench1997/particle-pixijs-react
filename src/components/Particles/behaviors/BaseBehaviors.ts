// src/components/Particles/behaviors/BaseBehaviors.ts
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { IBehavior } from '../ParticleBehaviorSystem';
import { BehaviorPriority } from '../ParticleBehaviorSystem';

// Alpha行为
export class AlphaBehavior implements IBehavior {
  type = 'alpha';
  order = BehaviorPriority.APPEARANCE; // 优先级 30
  
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
  type = 'scale';
  order = BehaviorPriority.TRANSFORM + 1; // 优先级 11
  
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
  type = 'color';
  order = BehaviorPriority.APPEARANCE + 1; // 优先级 31
  
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
  type = 'rotationStatic';
  order = BehaviorPriority.TRANSFORM + 2; // 优先级 12
  
  init(particle: any, config: any): void {
    if (config.min !== undefined && config.max !== undefined) {
      particle.rotation = (config.min + Math.random() * (config.max - config.min)) * (Math.PI / 180);
    }
  }

  update(particle: any, deltaTime: number, progress: number): void {
    // 静态旋转不需要更新
  }
}

// 纹理行为
export class TextureBehavior implements IBehavior {
  type = 'textureSingle';
  order = BehaviorPriority.APPEARANCE + 3; // 优先级 33
  
  init(particle: any, config: any): void {
    if (config.texture) {
      particle.texture = config.texture;
    }
  }

  update(particle: any, deltaTime: number, progress: number): void {
    // 纹理不需要更新
  }
}