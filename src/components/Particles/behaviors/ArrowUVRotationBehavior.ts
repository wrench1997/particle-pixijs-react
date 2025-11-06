/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/Particles/behaviors/ArrowUVRotationBehavior.ts
import type { IBehavior } from '../ParticleBehaviorSystem';
import * as PIXI from 'pixi.js';
import { BehaviorPriority } from '../ParticleBehaviorSystem';

/**
 * 箭矢UV旋转行为 - 通过UV坐标变换实现箭矢旋转效果
 */
export class ArrowUVRotationBehavior implements IBehavior {
  type = 'arrowUVRotation';
  order = BehaviorPriority.APPEARANCE + 5; // 优先级设置
  
  private texture: PIXI.Texture | null = null;
  private rotationSpeed: number = 0;
  private framesX: number = 1;
  private framesY: number = 1;
  private totalFrames: number = 1;
  private loop: boolean = true;
  
  constructor() {
    // 空构造函数，符合 new () => IBehavior 要求
  }
  
  init(particle: any, config: any): void {
    // 获取配置参数
    this.texture = config.texture || null;
    this.rotationSpeed = config.speed || 0.1;
    this.framesX = config.framesX || 1;
    this.framesY = config.framesY || 1;
    this.totalFrames = config.totalFrames || (this.framesX * this.framesY);
    this.loop = config.loop !== undefined ? config.loop : true;
    
    // 初始化粒子属性
    particle.uvRotationElapsed = 0;
    particle.currentUVFrame = 0;
    
    // 设置初始纹理
    if (this.texture) {
      // 创建一个新的纹理，它将引用原始纹理但有自己的UV矩形
      particle.texture = new PIXI.Texture(
        this.texture,
        this.getUVRect(0)
      );
    }
  }
  
  update(particle: any, deltaTime: number, progress: number): void {
    if (!this.texture) return;
    if (progress)
    // 更新旋转计时器
    particle.uvRotationElapsed += deltaTime;
    
    // 计算当前帧索引
    let frameIndex;
    if (this.loop) {
      frameIndex = Math.floor(particle.uvRotationElapsed * this.rotationSpeed * this.totalFrames) % this.totalFrames;
    } else {
      frameIndex = Math.min(
        Math.floor(particle.uvRotationElapsed * this.rotationSpeed * this.totalFrames),
        this.totalFrames - 1
      );
    }
    
    // 只有当帧索引变化时才更新UV
    if (particle.currentUVFrame !== frameIndex) {
      particle.currentUVFrame = frameIndex;
      
      // 更新纹理的UV矩形
      particle.texture.frame = this.getUVRect(frameIndex);
    }
  }
  
  // 计算指定帧索引的UV矩形
  private getUVRect(frameIndex: number): PIXI.Rectangle {
    if (!this.texture) return new PIXI.Rectangle(0, 0, 1, 1);
    
    const baseTexture = this.texture;
    const frameWidth = baseTexture.width / this.framesX;
    const frameHeight = baseTexture.height / this.framesY;
    
    // 计算帧在精灵表中的行列位置
    const column = frameIndex % this.framesX;
    const row = Math.floor(frameIndex / this.framesX) % this.framesY;
    
    // 返回对应的UV矩形
    return new PIXI.Rectangle(
      column * frameWidth,
      row * frameHeight,
      frameWidth,
      frameHeight
    );
  }
}