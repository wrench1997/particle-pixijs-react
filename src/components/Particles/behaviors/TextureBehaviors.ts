// src/components/Particles/behaviors/TextureBehaviors.ts
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

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
      if (config.texture) {
        // 如果传入的是单个纹理
        this.textures = [config.texture];
      } else if (config.textures && Array.isArray(config.textures)) {
        // 如果传入的是纹理数组
        this.textures = config.textures;
      }
      
      // 为粒子分配随机纹理
      if (this.textures.length > 0) {
        const index = Math.floor(Math.random() * this.textures.length);
        particle.texture = this.textures[index];
      }
    }
  
    update(particle: any, deltaTime: number, progress: number): void {
      // 纹理不需要在更新阶段改变
    }
}

