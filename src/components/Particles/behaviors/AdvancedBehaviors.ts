// src/components/Particles/behaviors/AdvancedBehaviors.ts
import type { IBehavior } from '../ParticleBehaviorSystem';
import * as PIXI from 'pixi.js';
import { BehaviorPriority } from '../ParticleBehaviorSystem';

// 路径跟随行为
export class PathFollowBehavior implements IBehavior {
  type = 'pathFollow';
  order = BehaviorPriority.TRANSFORM + 5; // 优先级 15
  private pathFn: Function | null = null;

  init(particle: any, config: any): void {
    if (config.path) {
      // 支持预定义路径或自定义函数
      if (typeof config.path === 'string') {
        this.setupPredefinedPath(particle, config.path, config);
      } else if (typeof config.path === 'function') {
        this.pathFn = config.path;
      }
      
      // 初始化路径参数
      particle.pathProgress = 0;
      particle.pathSpeed = config.speed || 0.5;
      particle.pathLoop = config.loop !== undefined ? config.loop : false;
      particle.initialX = particle.x;
      particle.initialY = particle.y;
    }
  }

  update(particle: any, deltaTime: number, progress: number): void {
    if (this.pathFn) {
      // 更新路径进度
      particle.pathProgress += particle.pathSpeed * deltaTime;
      
      // 处理循环
      if (particle.pathLoop) {
        particle.pathProgress %= 1;
      } else if (particle.pathProgress > 1) {
        particle.pathProgress = 1;
      }
      
      // 计算新位置
      const pos = this.pathFn(particle.pathProgress, particle);
      particle.x = particle.initialX + pos.x;
      particle.y = particle.initialY + pos.y;
    }
  }

  private setupPredefinedPath(particle: any, pathType: string, config: any): void {
    switch (pathType) {
      case 'circle':
        { const radius = config.radius || 50;
        this.pathFn = (t: number) => ({
          x: Math.cos(t * Math.PI * 2) * radius,
          y: Math.sin(t * Math.PI * 2) * radius
        });
        break; }
        
      case 'sine':
        { const amplitude = config.amplitude || 50;
        const frequency = config.frequency || 1;
        this.pathFn = (t: number) => ({
          x: t * 100,
          y: Math.sin(t * Math.PI * 2 * frequency) * amplitude
        });
        break; }
        
      case 'spiral':
        { const growFactor = config.growFactor || 10;
        this.pathFn = (t: number) => ({
          x: Math.cos(t * Math.PI * 10) * (t * growFactor),
          y: Math.sin(t * Math.PI * 10) * (t * growFactor)
        });
        break; }
        
      case 'custom':
        if (config.expression) {
          try {
            // 使用 Function 构造函数创建自定义路径函数
            // 注意：在生产环境中应谨慎使用，可能存在安全风险
            this.pathFn = new Function('t', 'p', `
              const sin = Math.sin;
              const cos = Math.cos;
              const tan = Math.tan;
              const PI = Math.PI;
              const pow = Math.pow;
              const sqrt = Math.sqrt;
              ${config.expression}
            `);
          } catch (e) {
            console.error('Invalid path expression:', e);
          }
        }
        break;
    }
  }
}

// 动画帧行为
export class AnimatedTextureBehavior implements IBehavior {
  type = 'animatedTexture';
  order = BehaviorPriority.APPEARANCE + 4; // 优先级 34
  
  init(particle: any, config: any): void {
    if (config.textures && Array.isArray(config.textures)) {
      particle.textureFrames = config.textures;
      particle.currentFrame = 0;
      particle.animationSpeed = config.speed || 0.1;
      particle.animationElapsed = 0;
      particle.loop = config.loop !== undefined ? config.loop : true;
      
      // 设置初始纹理
      if (particle.textureFrames.length > 0) {
        particle.texture = particle.textureFrames[0];
      }
    }
  }

  update(particle: any, deltaTime: number, progress: number): void {
    if (particle.textureFrames && particle.textureFrames.length > 0) {
      particle.animationElapsed += deltaTime;
      
      if (particle.animationElapsed >= particle.animationSpeed) {
        particle.animationElapsed = 0;
        particle.currentFrame++;
        
        if (particle.currentFrame >= particle.textureFrames.length) {
          if (particle.loop) {
            particle.currentFrame = 0;
          } else {
            particle.currentFrame = particle.textureFrames.length - 1;
          }
        }
        
        particle.texture = particle.textureFrames[particle.currentFrame];
      }
    }
  }
}


