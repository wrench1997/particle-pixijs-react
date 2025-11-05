// src/components/Particles/ParticleBehaviorSystem.ts
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
export enum BehaviorPriority {
  // 生成行为（如形状生成）：优先级 0-9
  SPAWN = 0,
  
  // 变换行为（如旋转、缩放）：优先级 10-19
  TRANSFORM = 10,
  
  // 移动行为（如速度、加速度）：优先级 20-29
  MOVEMENT = 20,
  
  // 外观行为（如颜色、透明度）：优先级 30-39
  APPEARANCE = 30,
  
  // 特殊行为（如碰撞、生命周期）：优先级 40-49
  SPECIAL = 40
}



export interface IBehavior {
  type: string;
  order: number; 
  init(particle: any, config: any): void;
  update(particle: any, deltaTime: number, progress: number): void;
  
  // 添加批量初始化方法
  initParticles?(first: any): void;
}


// 行为注册系统
class BehaviorRegistry {
  private behaviors: Map<string, new () => IBehavior> = new Map();

  // 注册行为
  register(type: string, behaviorClass: new () => IBehavior): void {
    this.behaviors.set(type, behaviorClass);
  }

  // 获取行为实例
  create(type: string): IBehavior | null {
    const BehaviorClass = this.behaviors.get(type);
    if (BehaviorClass) {
      return new BehaviorClass();
    }
    return null;
  }

  // 检查行为是否已注册
  has(type: string): boolean {
    return this.behaviors.has(type);
  }
}

// 创建全局行为注册表实例
export const behaviorRegistry = new BehaviorRegistry();

// 对象池实现
export class ObjectPool<T> {
  private pool: T[] = [];
  private createFn: () => T;
  private resetFn: (obj: T) => void;
  private maxSize: number;

  constructor(createFn: () => T, resetFn: (obj: T) => void, initialSize = 0, maxSize = 1000) {
    this.createFn = createFn;
    this.resetFn = resetFn;
    this.maxSize = maxSize;

    // 预创建对象
    for (let i = 0; i < initialSize; i++) {
      this.pool.push(this.createFn());
    }
  }

  // 获取对象
  get(): T {
    if (this.pool.length > 0) {
      return this.pool.pop()!;
    }
    return this.createFn();
  }

  // 释放对象
  release(obj: T): void {
    this.resetFn(obj);
    if (this.pool.length < this.maxSize) {
      this.pool.push(obj);
    }
  }

  // 清空池
  clear(): void {
    this.pool = [];
  }

  // 获取池大小
  get size(): number {
    return this.pool.length;
  }
}