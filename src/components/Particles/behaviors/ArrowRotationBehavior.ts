// src/components/Particles/behaviors/ArrowRotationBehavior.ts
import type { IBehavior } from '../ParticleBehaviorSystem';
import * as PIXI from 'pixi.js';
import { BehaviorPriority } from '../ParticleBehaviorSystem';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 箭矢旋转行为 - 通过序列帧动画模拟箭矢旋转
 */
export class ArrowRotationBehavior implements IBehavior {
  type = 'arrowRotation';
  order = BehaviorPriority.APPEARANCE + 5; // 优先级设置
  
  private textures: PIXI.Texture[] = [];
  private rotationSpeed: number = 0;
  
  constructor() {
    // 空构造函数，符合 new () => IBehavior 要求
  }
  
  init(particle: any, config: any): void {
    // 加载箭矢在不同角度的纹理
    this.textures = config.textures || [];
    this.rotationSpeed = config.speed || 0.1;
    
    // 初始化纹理索引和旋转计时器
    particle.textureIndex = 0;
    particle.texture = this.textures[0];
    particle.rotationElapsed = 0;
  }
  
  update(particle: any, deltaTime: number, progress: number): void {
    // 更新旋转计时器
    particle.rotationElapsed += deltaTime;
    
    // 计算当前应该显示的纹理索引
    const index = Math.floor(particle.rotationElapsed * this.rotationSpeed * this.textures.length) % this.textures.length;
    
    // 更新纹理
    if (particle.textureIndex !== index) {
      particle.textureIndex = index;
      particle.texture = this.textures[index];
    }
  }
}