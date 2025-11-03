// src/components/Particles/ParticleBehaviorSystem.ts

// 行为接口
export interface IBehavior {
  type: string;
  init(particle: any, config: any): void;
  update(particle: any, deltaTime: number, progress: number): void;
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