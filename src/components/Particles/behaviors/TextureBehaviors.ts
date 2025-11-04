// src/components/Particles/behaviors/TextureBehaviors.ts
import type { IBehavior } from '../ParticleBehaviorSystem';
import * as PIXI from 'pixi.js';
import { BehaviorPriority } from '../ParticleBehaviorSystem';

// 随机纹理行为配置接口
interface RandomTextureBehaviorConfig {
  textures: (PIXI.Texture | string)[];
}

/**
 * 随机纹理行为 - 为每个粒子随机分配一个纹理
 */
export class TextureRandomBehavior implements IBehavior {
  type = 'textureRandom';
  order = BehaviorPriority.APPEARANCE + 2; // 优先级 32
  
  private textures: PIXI.Texture[] = [];
  
  constructor() {
    // 空构造函数，符合 new () => IBehavior 要求
  }

  init(particle: any, config: any): void {
    // 在init方法中处理纹理列表
    if (config.textures && Array.isArray(config.textures)) {
      this.textures = config.textures.map(tex => 
        typeof tex === 'string' ? PIXI.Texture.from(tex) : tex
      );
    }
    
    // 为粒子分配随机纹理
    if (this.textures.length > 0) {
      const index = Math.floor(Math.random() * this.textures.length);
      particle.texture = this.textures[index];
    }
  }

  initParticles(first: any): void {
    // 遍历链表中的所有粒子
    let next = first;
    while (next) {
      // 只有当纹理列表非空时才分配纹理
      if (this.textures.length > 0) {
        const index = Math.floor(Math.random() * this.textures.length);
        next.texture = this.textures[index];
      }
      next = next.next;
    }
  }

  update(particle: any, deltaTime: number, progress: number): void {
    // 纹理不需要在更新阶段改变
  }
}