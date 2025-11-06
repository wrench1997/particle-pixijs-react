// src/components/Particles/behaviors/SpeedBehaviors.ts
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type { IBehavior } from '../ParticleBehaviorSystem';
import * as PIXI from 'pixi.js';
import { rotatePoint, normalize, scaleBy, length } from '../ParticleUtils';
import { BehaviorPriority } from '../ParticleBehaviorSystem';

/**
 * 静态速度行为 - 为粒子提供恒定速度
 * 
 * 示例配置:
 * ```javascript
 * {
 *     type: 'moveSpeedStatic',
 *     config: {
 *         min: 100,
 *         max: 150
 *     }
 * }
 * ```
 */

// 静态移动速度行为
export class MoveSpeedStaticBehavior implements IBehavior {
    type = 'moveSpeedStatic';
    order = BehaviorPriority.MOVEMENT; 
    updateGlobal: any;

    private min: number = 0;
    private max: number = 0;
  
    constructor() {
      // 空构造函数，符合 new () => IBehavior 要求
    }
  cleanup: any;
  initParticles?(first: any): void {
    throw new Error('Method not implemented.');
  }
  
    init(particle: any, config: any): void {
      // 在init方法中处理配置
      this.min = config.min || 0;
      this.max = config.max || 0;
      
      // 随机生成速度值
      const speed = (Math.random() * (this.max - this.min)) + this.min;
      
      // 确保 particle.velocity 存在且只有 x 和 y 属性
      if (!particle.velocity) {
        particle.velocity = { x: speed, y: 0 };
      } else {
        particle.velocity.x = speed;
        particle.velocity.y = 0;
      }
      
      // 根据粒子旋转角度旋转速度向量
      rotatePoint(particle.rotation, particle.velocity);
    }
  
    update(particle: any, deltaTime: number, progress: number): void {
      // 更新粒子位置
      particle.x += particle.velocity.x * deltaTime;
      particle.y += particle.velocity.y * deltaTime;
    }
  }

/**
 * 动态速度行为 - 根据粒子生命周期插值速度
 * 
 * 示例配置:
 * ```javascript
 * {
 *     type: 'moveSpeed',
 *     config: {
 *         speed: {
 *             list: [{value: 10, time: 0}, {value: 100, time: 0.25}, {value: 0, time: 1}],
 *         },
 *         minMult: 0.8
 *     }
 * }
 * ```
 */
export class MoveSpeedBehavior implements IBehavior {
  type = 'moveSpeed';
  updateGlobal: any;
  order = BehaviorPriority.MOVEMENT + 1; 
  

  private speedList: {value: number, time: number}[] = [];
  private minMult: number = 1;
  private isStepped: boolean = false;

  constructor() {
    // 空构造函数，符合 new () => IBehavior 要求
  }
  cleanup: any;
  initParticles?(first: any): void {
    throw new Error('Method not implemented.');
  }

  init(particle: any, config: any): void {
    // 在init方法中处理配置
    this.speedList = config.speed?.list || [];
    this.minMult = config.minMult || 1;
    this.isStepped = config.speed?.isStepped || false;
    
    // 应用随机乘数
    const mult = (Math.random() * (1 - this.minMult)) + this.minMult;
    particle.speedMult = mult;
    
    // 获取初始速度
    const initialSpeed = this.speedList.length > 0 ? this.speedList[0].value * mult : 0;
    
    // 初始化速度向量 - 确保它只有 x 和 y 属性
    if (!particle.velocity) {
      particle.velocity = { x: initialSpeed, y: 0 };
    } else {
      particle.velocity.x = initialSpeed;
      particle.velocity.y = 0;
    }
    
    // 根据粒子旋转角度旋转速度向量
    rotatePoint(particle.rotation, particle.velocity);
  }

  update(particle: any, deltaTime: number, progress: number): void {
    // 插值计算当前速度
    const speed = this.interpolateSpeed(progress) * particle.speedMult;
    
    // 保持方向，更新速度大小
    const vel = particle.velocity;
    const currentLength = Math.sqrt(vel.x * vel.x + vel.y * vel.y);
    
    if (currentLength > 0) {
      // 归一化向量
      const normalizedX = vel.x / currentLength;
      const normalizedY = vel.y / currentLength;
      
      // 应用新速度
      vel.x = normalizedX * speed;
      vel.y = normalizedY * speed;
    } else {
      // 如果速度为0，则设置为默认方向
      vel.x = speed;
      vel.y = 0;
    }
    
    // 更新粒子位置
    particle.x += vel.x * deltaTime;
    particle.y += vel.y * deltaTime;
  }

  // 根据生命周期进度插值计算速度
  private interpolateSpeed(progress: number): number {
    if (this.speedList.length === 0) return 0;
    if (this.speedList.length === 1) return this.speedList[0].value;
    
    // 阶梯式插值
    if (this.isStepped) {
      // 找到当前进度对应的值
      let currentValue = this.speedList[0].value;
      for (let i = 0; i < this.speedList.length; i++) {
        if (this.speedList[i].time <= progress) {
          currentValue = this.speedList[i].value;
        } else {
          break;
        }
      }
      return currentValue;
    }
    
    // 线性插值
    // 找到当前进度所在的区间
    let startIndex = 0;
    for (let i = 0; i < this.speedList.length; i++) {
      if (this.speedList[i].time > progress) {
        break;
      }
      startIndex = i;
    }
    
    const endIndex = Math.min(startIndex + 1, this.speedList.length - 1);
    
    if (startIndex === endIndex) {
      return this.speedList[startIndex].value;
    }
    
    // 计算区间内的插值
    const startValue = this.speedList[startIndex].value;
    const endValue = this.speedList[endIndex].value;
    const startTime = this.speedList[startIndex].time;
    const endTime = this.speedList[endIndex].time;
    
    const t = (progress - startTime) / (endTime - startTime);
    
    return startValue + (endValue - startValue) * t;
  }
}

/**
 * 加速度行为 - 为粒子提供持续加速度
 * 
 * 示例配置:
 * ```javascript
 * {
 *     type: 'moveAcceleration',
 *     config: {
 *         accel: {
 *             x: 0,
 *             y: 200
 *         },
 *         minStart: 100,
 *         maxStart: 200,
 *         rotate: true,
 *         maxSpeed: 300
 *     }
 * }
 * ```
 */
export class AccelerationBehavior implements IBehavior {
    type = 'moveAcceleration';
    updateGlobal: any;
    order = BehaviorPriority.MOVEMENT + 2;
  
    private minStart: number = 0;
    private maxStart: number = 0;
    private accel: {x: number, y: number} = {x: 0, y: 0};
    private rotate: boolean = false;
    private maxSpeed: number = 0;
  
    constructor() {
      // 空构造函数，符合 new () => IBehavior 要求
    }
  cleanup: any;
  initParticles?(first: any): void {
    throw new Error('Method not implemented.');
  }
  
    init(particle: any, config: any): void {
      // 在init方法中处理配置
      this.minStart = config.minStart || 0;
      this.maxStart = config.maxStart || 0;
      this.accel = config.accel || { x: 0, y: 0 };
      this.rotate = !!config.rotate;
      this.maxSpeed = config.maxSpeed || 0;
      
      const speed = (Math.random() * (this.maxStart - this.minStart)) + this.minStart;
      
      // 确保 particle.velocity 存在且只有 x 和 y 属性
      if (!particle.velocity) {
        particle.velocity = { x: speed, y: 0 };
      } else {
        particle.velocity.x = speed;
        particle.velocity.y = 0;
      }
      
      rotatePoint(particle.rotation, particle.velocity);
    }
  
    update(particle: any, deltaTime: number, progress: number): void {
      const vel = particle.velocity;
      const oldVX = vel.x;
      const oldVY = vel.y;
      
      vel.x += this.accel.x * deltaTime;
      vel.y += this.accel.y * deltaTime;
      
      if (this.maxSpeed) {
        const currentSpeed = Math.sqrt(vel.x * vel.x + vel.y * vel.y);
        if (currentSpeed > this.maxSpeed) {
          const ratio = this.maxSpeed / currentSpeed;
          vel.x *= ratio;
          vel.y *= ratio;
        }
      }
      
      particle.x += (oldVX + vel.x) / 2 * deltaTime;
      particle.y += (oldVY + vel.y) / 2 * deltaTime;
      
      if (this.rotate) {
        particle.rotation = Math.atan2(vel.y, vel.x);
      }
    }
  }

/**
 * 阻力行为 - 为粒子提供速度衰减
 * 
 * 示例配置:
 * ```javascript
 * {
 *     type: 'drag',
 *     config: {
 *         factor: 0.98
 *     }
 * }
 * ```
 */
export class DragBehavior implements IBehavior {
  type = 'drag';
  order = BehaviorPriority.MOVEMENT + 4; 
  updateGlobal: any;
  private factor: number = 0.95;

  constructor() {
    // 空构造函数，符合 new () => IBehavior 要求
  }
  cleanup: any;
  initParticles?(first: any): void {
    throw new Error('Method not implemented.');
  }

  init(particle: any, config: any): void {
    // 在init方法中处理配置
    this.factor = config.factor || 0.95;
  }

  update(particle: any, deltaTime: number, progress: number): void {
    // 应用阻力因子，使速度随时间衰减
    if (particle.velocity) {
      particle.velocity.x *= Math.pow(this.factor, deltaTime * 10);
      particle.velocity.y *= Math.pow(this.factor, deltaTime * 10);
    }
  }
}

/**
 * 重力行为 - 为粒子提供重力加速度
 * 
 * 示例配置:
 * ```javascript
 * {
 *     type: 'gravity',
 *     config: {
 *         x: 0,
 *         y: 500
 *     }
 * }
 * ```
 */
export class GravityBehavior implements IBehavior {
  type = 'gravity';
  order = BehaviorPriority.MOVEMENT + 5; 
  updateGlobal: any;
  private gravity: {x: number, y: number} = {x: 0, y: 98};

  constructor() {
    // 空构造函数，符合 new () => IBehavior 要求
  }
  cleanup: any;
  initParticles?(first: any): void {
    throw new Error('Method not implemented.');
  }

  init(particle: any, config: any): void {
    // 在init方法中处理配置
    this.gravity = {x: config.x || 0, y: config.y || 98};
  }

  update(particle: any, deltaTime: number, progress: number): void {
    // 应用重力加速度
    if (particle.velocity) {
      particle.velocity.x += this.gravity.x * deltaTime;
      particle.velocity.y += this.gravity.y * deltaTime;
    }
  }
}