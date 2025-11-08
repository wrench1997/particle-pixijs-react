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
    updateGlobal: any;
    private textures: PIXI.Texture[] = [];
    
    constructor() {
      // 空构造函数，符合 new () => IBehavior 要求
    }
    cleanup: any;
    initParticles?(first: any): void {
      throw new Error('Method not implemented.');
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

/**
 * 单一纹理行为 - 为所有粒子分配同一个纹理
 */
export class TextureBehavior implements IBehavior {
  cleanup: any;
  updateGlobal: any;
  initParticles?(first: any): void {
    throw new Error('Method not implemented.');
  }
  type = 'textureSingle';
  private texture: PIXI.Texture | null = null;
  order = BehaviorPriority.APPEARANCE + 3;
  
  init(particle: any, config: any): void {
    // 处理不同的纹理配置方式
    if (config.texture) {
      // 如果传入的是单个纹理
      this.texture = config.texture;
    } 
    
    // 将纹理应用到粒子
    if (this.texture) {
      particle.texture = this.texture;
    }
  }

  update(particle: any, deltaTime: number, progress: number): void {
    // 纹理不需要更新
  }
}