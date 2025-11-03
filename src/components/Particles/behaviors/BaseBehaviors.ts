// src/components/Particles/behaviors/BaseBehaviors.ts
import type { IBehavior } from '../ParticleBehaviorSystem';

// Alpha行为
export class AlphaBehavior implements IBehavior {
  type = 'alpha';

  init(particle: unknown, config: unknown): void {
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

  init(particle: any, config: any): void {
    if (config.color && config.color.list) {
      particle.colorList = config.color.list;
    }
  }

  update(particle: any, deltaTime: number, progress: number): void {
    // 在Particle类中已实现
  }
}

// 移动速度行为
export class MoveSpeedBehavior implements IBehavior {
  type = 'moveSpeed';

  init(particle: any, config: any): void {
    if (config.speed && config.speed.list) {
      particle.speedList = config.speed.list;
    }
  }

  update(particle: any, deltaTime: number, progress: number): void {
    // 在Particle类中已实现
  }
}

// 静态旋转行为
export class RotationStaticBehavior implements IBehavior {
  type = 'rotationStatic';

  init(particle: any, config: any): void {
    if (config.min !== undefined && config.max !== undefined) {
      particle.rotation = (config.min + Math.random() * (config.max - config.min)) * (Math.PI / 180);
    }
  }

  update(particle: any, deltaTime: number, progress: number): void {
    // 静态旋转不需要更新
  }
}

// 动态旋转行为
export class RotationBehavior implements IBehavior {
  type = 'rotation';

  init(particle: any, config: any): void {
    particle.rotationSpeed = config.speed || 0;
  }

  update(particle: any, deltaTime: number, progress: number): void {
    particle.rotation += particle.rotationSpeed * deltaTime;
  }
}

// 纹理行为
export class TextureBehavior implements IBehavior {
  type = 'textureSingle';

  init(particle: any, config: any): void {
    if (config.texture) {
      particle.texture = config.texture;
    }
  }

  update(particle: any, deltaTime: number, progress: number): void {
    // 纹理不需要更新
  }
}