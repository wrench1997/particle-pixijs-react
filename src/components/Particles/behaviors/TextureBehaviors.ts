// src/components/Particles/behaviors/TextureBehaviors.ts
import type { IBehavior } from '../ParticleBehaviorSystem';
import * as PIXI from 'pixi.js';
import { BehaviorPriority } from '../ParticleBehaviorSystem';

// 随机纹理行为
export class TextureRandomBehavior implements IBehavior {
  type = 'textureRandom';
  private textures: PIXI.Texture[] = [];
  order = BehaviorPriority.APPEARANCE + 2; // 优先级 32

  constructor() {
    // 空构造函数，符合 new () => IBehavior 要求
  }

  init(particle: any, config: any): void {
    // 在init方法中处理配置
    if (config.textures && Array.isArray(config.textures)) {
      this.textures = config.textures;
    }
    
    if (this.textures.length > 0) {
      const index = Math.floor(Math.random() * this.textures.length);
      particle.texture = this.textures[index];
    }
  }

  update(particle: any, deltaTime: number, progress: number): void {
    // 纹理不需要更新
  }
}