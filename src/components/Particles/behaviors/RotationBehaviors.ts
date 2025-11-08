/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/Particles/behaviors/RotationBehaviors.ts

import type { IBehavior } from '../ParticleBehaviorSystem';
import { BehaviorPriority } from '../ParticleBehaviorSystem';


// 动态旋转行为
export class RotationBehavior implements IBehavior {
  type = 'rotation';
  order = BehaviorPriority.TRANSFORM; // 优先级 10
  
  private minSpeed: number = 0;
  private maxSpeed: number = 0;
  private minStart: number = 0;
  private maxStart: number = 0;
  private accel: number = 0;

  constructor() {
    // 空构造函数，符合 new () => IBehavior 要求
  }

  init(particle: any, config: any): void {
    // 在init方法中处理配置
    this.minSpeed = config.minSpeed || 0;
    this.maxSpeed = config.maxSpeed || 0;
    this.minStart = config.minStart || 0;
    this.maxStart = config.maxStart || 0;
    this.accel = config.accel || 0;
    
    // 设置初始旋转
    if (this.minStart === this.maxStart) {
      particle.rotation += this.minStart * (Math.PI / 180);
    } else {
      particle.rotation += ((Math.random() * (this.maxStart - this.minStart)) + this.minStart) * (Math.PI / 180);
    }
    
    // 设置旋转速度
    particle.rotationSpeed = ((Math.random() * (this.maxSpeed - this.minSpeed)) + this.minSpeed) * (Math.PI / 180);
  }

  update(particle: any, deltaTime: number, _progress: number): void {
    if (this.accel) {
      const oldSpeed = particle.rotationSpeed;
      particle.rotationSpeed += this.accel * (Math.PI / 180) * deltaTime;
      particle.rotation += (particle.rotationSpeed + oldSpeed) / 2 * deltaTime;
    } else {
      particle.rotation += particle.rotationSpeed * deltaTime;
    }
  }
}