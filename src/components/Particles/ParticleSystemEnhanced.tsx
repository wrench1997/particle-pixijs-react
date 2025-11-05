
// src/components/Particles/ParticleSystemEnhanced.tsx
import { useRef, useEffect } from 'react';
import { Container, Graphics, Sprite } from 'pixi.js';
import { extend, useTick } from '@pixi/react';
import * as PIXI from 'pixi.js';
import { behaviorRegistry, ObjectPool, type IBehavior } from './ParticleBehaviorSystem';
import { rotatePoint, normalize, scaleBy, length } from './ParticleUtils';


import { 
  AlphaBehavior, ScaleBehavior, ColorBehavior, 
   RotationStaticBehavior,
  TextureBehavior 
} from './behaviors/BaseBehaviors';

import {
  PathFollowBehavior, AnimatedTextureBehavior,
} from './behaviors/AdvancedBehaviors';

// 导入形状行为
import { SpawnShapeBehavior, PolygonShapeBehavior, ImageShapeBehavior } from './behaviors/ShapeBehaviors';

// 导入其他行为，并使用别名避免冲突
import { TextureRandomBehavior } from './behaviors/TextureBehaviors';
import { RotationBehavior } from './behaviors/RotationBehaviors';
import {
  MoveSpeedStaticBehavior,
  MoveSpeedBehavior,
  AccelerationBehavior,
  DragBehavior,
  GravityBehavior
} from './behaviors/SpeedBehaviors';

import { ArrowRotationBehavior } from './behaviors/ArrowRotationBehavior';




// 注册组件
extend({
  Container,
  Graphics,
  Sprite
});

// 注册所有行为
function registerBehaviors() {
  // 基础行为
  behaviorRegistry.register('alpha', AlphaBehavior);
  behaviorRegistry.register('scale', ScaleBehavior);
  behaviorRegistry.register('color', ColorBehavior);
  behaviorRegistry.register('moveSpeed', MoveSpeedBehavior);
  behaviorRegistry.register('rotationStatic', RotationStaticBehavior);
  behaviorRegistry.register('textureSingle', TextureBehavior);
  
  // 高级行为
  behaviorRegistry.register('pathFollow', PathFollowBehavior);
  behaviorRegistry.register('animatedTexture', AnimatedTextureBehavior);
  behaviorRegistry.register('gravity', GravityBehavior);
  behaviorRegistry.register('drag', DragBehavior);
  
  // 形状行为
  behaviorRegistry.register('spawnShape', SpawnShapeBehavior);
  behaviorRegistry.register('polygonalChain', PolygonShapeBehavior);
  behaviorRegistry.register('imageShape', ImageShapeBehavior);
  // 速度行为
  behaviorRegistry.register('moveSpeedStatic', MoveSpeedStaticBehavior);
  behaviorRegistry.register('moveAcceleration', AccelerationBehavior);
  
  // 纹理行为
  behaviorRegistry.register('textureRandom', TextureRandomBehavior);
  
  // 使用从 RotationBehaviors.ts 导入的 RotationBehavior
  behaviorRegistry.register('rotation', RotationBehavior);

  // 注册箭矢旋转行为
  behaviorRegistry.register('arrowRotation', ArrowRotationBehavior);
}

// 确保行为只注册一次
let behaviorsRegistered = false;
if (!behaviorsRegistered) {
  registerBehaviors();
  behaviorsRegistered = true;
}

// 粒子配置接口
export interface ParticleConfig {
  lifetime: {
    min: number;
    max: number;
  };
  frequency: number;
  spawnChance: number;
  particlesPerWave: number;
  emitterLifetime: number;
  maxParticles: number;
  pos: {
    x: number;
    y: number;
  };
  addAtBack: boolean;
  behaviors: ParticleBehavior[];
}

// 粒子行为接口
export interface ParticleBehavior {
  type: string;
  config: any;
}

// 粒子系统属性
interface ParticleSystemProps {
  config: ParticleConfig;
  play?: boolean;
  position?: [number, number];
  scale?: number;
  onComplete?: () => void;
}

// 增强的粒子类
class EnhancedParticle {
  graphic: PIXI.Graphics;
  sprite: PIXI.Sprite | null;
  x: number;
  y: number;
  scale: number;
  alpha: number;
  rotation: number;
  velocity: { x: number; y: number };
  acceleration: { x: number; y: number };
  lifetime: number;
  age: number;
  agePercent: number;
  color: number;
  colorList: { value: string; time: number }[];
  scaleList: { value: number; time: number }[];
  alphaList: { value: number; time: number }[];
  speedList: { value: number; time: number }[];
  texture: PIXI.Texture | null;
  behaviors: IBehavior[];
  
  // 链表支持
  next: EnhancedParticle | null = null;
  prev: EnhancedParticle | null = null;
  
  // 额外属性
  config: any = {};
  
  // 额外属性，用于支持高级行为
  rotationSpeed: number;
  gravity: { x: number; y: number };
  drag: number;
  pathProgress: number;
  pathSpeed: number;
  pathLoop: boolean;
  initialX: number;
  initialY: number;
  textureFrames: PIXI.Texture[];
  currentFrame: number;
  animationSpeed: number;
  animationElapsed: number;
  loop: boolean;

  constructor() {
    this.graphic = new PIXI.Graphics();
    this.sprite = null;
    this.x = 0;
    this.y = 0;
    this.scale = 1;
    this.alpha = 1;
    this.rotation = 0;
    this.velocity = { x: 0, y: 0 };
    this.acceleration = { x: 0, y: 0 };
    this.lifetime = 1;
    this.age = 0;
    this.agePercent = 0;
    this.color = 0xffffff;
    this.colorList = [];
    this.scaleList = [];
    this.alphaList = [];
    this.speedList = [];
    this.texture = null;
    this.behaviors = [];
    
    // 高级行为属性初始化
    this.rotationSpeed = 0;
    this.gravity = { x: 0, y: 0 };
    this.drag = 1;
    this.pathProgress = 0;
    this.pathSpeed = 0;
    this.pathLoop = false;
    this.initialX = 0;
    this.initialY = 0;
    this.textureFrames = [];
    this.currentFrame = 0;
    this.animationSpeed = 0;
    this.animationElapsed = 0;
    this.loop = true;
  }

  // 重置粒子状态，用于对象池
  reset(): void {
    this.x = 0;
    this.y = 0;
    this.scale = 1;
    this.alpha = 1;
    this.rotation = 0;
    this.velocity = { x: 0, y: 0 };
    this.acceleration = { x: 0, y: 0 };
    this.lifetime = 1;
    this.age = 0;
    this.agePercent = 0;
    this.color = 0xffffff;
    this.colorList = [];
    this.scaleList = [];
    this.alphaList = [];
    this.speedList = [];
    this.texture = null;
    this.behaviors = [];
    this.next = null;
    this.prev = null;
    this.config = {};
    
    // 重置高级行为属性
    this.rotationSpeed = 0;
    this.gravity = { x: 0, y: 0 };
    this.drag = 1;
    this.pathProgress = 0;
    this.pathSpeed = 0;
    this.pathLoop = false;
    this.initialX = 0;
    this.initialY = 0;
    this.textureFrames = [];
    this.currentFrame = 0;
    this.animationSpeed = 0;
    this.animationElapsed = 0;
    this.loop = true;
    
    // 清除图形
    this.graphic.clear();
    
    // 移除精灵
    if (this.sprite) {
      this.graphic.removeChild(this.sprite);
      this.sprite = null;
    }
  }

  // 更新粒子状态
  update(deltaTime: number): boolean {
    this.age += deltaTime;
    
    if (this.age >= this.lifetime) {
      return false; // 粒子生命周期结束
    }

    // 计算当前生命周期进度 (0-1)
    this.agePercent = this.age / this.lifetime;
    const progress = this.agePercent;
    
    // 更新颜色
    if (this.colorList.length > 0) {
      this.color = this.interpolateColor(progress);
    }
    
    // 更新缩放
    if (this.scaleList.length > 0) {
      this.scale = this.interpolateValue(progress, this.scaleList);
    }
    
    // 更新透明度
    if (this.alphaList.length > 0) {
      this.alpha = this.interpolateValue(progress, this.alphaList);
    }
    
    // 更新速度
    if (this.speedList.length > 0) {
      const speed = this.interpolateValue(progress, this.speedList);
      const currentSpeed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
      if (currentSpeed > 0) {
        const ratio = speed / currentSpeed;
        this.velocity.x *= ratio;
        this.velocity.y *= ratio;
      }
    }
    
    // 应用所有行为
    for (const behavior of this.behaviors) {
      behavior.update(this, deltaTime, progress);
    }
    
    // 更新位置
    this.x += this.velocity.x * deltaTime;
    this.y += this.velocity.y * deltaTime;
    
    // 更新速度 (加速度)
    this.velocity.x += this.acceleration.x * deltaTime;
    this.velocity.y += this.acceleration.y * deltaTime;
    
    // 更新图形
    this.updateGraphic();
    
    return true; // 粒子仍然活跃
  }

  // 更新图形显示
  updateGraphic() {
    if (this.texture) {
      // 清除之前的图形内容
      this.graphic.clear();
      
      // 如果当前图形不是精灵，则创建一个精灵
      if (!this.sprite) {
        this.sprite = new PIXI.Sprite(this.texture);
        this.sprite.anchor.set(0.5); // 设置锚点为中心
        this.graphic.addChild(this.sprite);
      } else {
        // 更新精灵纹理
        this.sprite.texture = this.texture;
      }
      
      // 更新精灵属性
      this.sprite.alpha = this.alpha;
      this.sprite.tint = this.color;
      this.sprite.scale.set(this.scale);
    } else {
      // 如果有精灵，移除它
      if (this.sprite) {
        this.graphic.removeChild(this.sprite);
        this.sprite = null;
      }
      
      // 绘制圆形
      this.graphic.clear();
      this.graphic.beginFill(this.color, this.alpha);
      this.graphic.drawCircle(0, 0, 10);
      this.graphic.endFill();
    }
    
    // 更新图形位置和旋转
    this.graphic.x = this.x;
    this.graphic.y = this.y;
    this.graphic.scale.set(this.scale);
    this.graphic.rotation = this.rotation;
  }

  // 颜色插值
  interpolateColor(progress: number): number {
    if (this.colorList.length === 0) return 0xffffff;
    if (this.colorList.length === 1) return parseInt(this.colorList[0].value, 16);
    
    // 找到当前进度对应的颜色区间
    let startIndex = 0;
    for (let i = 0; i < this.colorList.length; i++) {
      if (this.colorList[i].time > progress) {
        break;
      }
      startIndex = i;
    }
    
    const endIndex = Math.min(startIndex + 1, this.colorList.length - 1);
    
    if (startIndex === endIndex) {
      return parseInt(this.colorList[startIndex].value, 16);
    }
    
    // 计算区间内的插值
    const startColor = parseInt(this.colorList[startIndex].value, 16);
    const endColor = parseInt(this.colorList[endIndex].value, 16);
    const startTime = this.colorList[startIndex].time;
    const endTime = this.colorList[endIndex].time;
    
    const t = (progress - startTime) / (endTime - startTime);
    
    // 分解RGB通道并插值
    const r1 = (startColor >> 16) & 0xff;
    const g1 = (startColor >> 8) & 0xff;
    const b1 = startColor & 0xff;
    
    const r2 = (endColor >> 16) & 0xff;
    const g2 = (endColor >> 8) & 0xff;
    const b2 = endColor & 0xff;
    
    const r = Math.round(r1 + (r2 - r1) * t);
    const g = Math.round(g1 + (g2 - g1) * t);
    const b = Math.round(b1 + (b2 - b1) * t);
    
    return (r << 16) | (g << 8) | b;
  }

  // 值插值
  interpolateValue(progress: number, list: { value: number; time: number }[]): number {
    if (list.length === 0) return 1;
    if (list.length === 1) return list[0].value;
    
    // 找到当前进度对应的值区间
    let startIndex = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i].time > progress) {
        break;
      }
      startIndex = i;
    }
    
    const endIndex = Math.min(startIndex + 1, list.length - 1);
    
    if (startIndex === endIndex) {
      return list[startIndex].value;
    }
    
    // 计算区间内的插值
    const startValue = list[startIndex].value;
    const endValue = list[endIndex].value;
    const startTime = list[startIndex].time;
    const endTime = list[endIndex].time;
    
    const t = (progress - startTime) / (endTime - startTime);
    
    return startValue + (endValue - startValue) * t;
  }
}

// 增强的粒子发射器类
class EnhancedParticleEmitter {
  // 链表管理
  _activeParticlesFirst: EnhancedParticle | null = null;
  _activeParticlesLast: EnhancedParticle | null = null;
  _poolFirst: EnhancedParticle | null = null;
  
  // 位置插值
  _prevEmitterPos: PIXI.Point = new PIXI.Point();
  _prevPosIsValid: boolean = false;
  _posChanged: boolean = false;
  
  // 其他属性
  particles: EnhancedParticle[] = [];
  config: ParticleConfig;
  container: PIXI.Container;
  elapsed: number = 0;
  emitterAge: number = 0;
  nextSpawnTime: number = 0;
  active: boolean = true;
  particlePool: ObjectPool<EnhancedParticle>;
  behaviorInstances: Map<string, IBehavior> = new Map();
  particleCount: number = 0;
  customEase: Function | null = null;

  constructor(container: PIXI.Container, config: ParticleConfig) {
    this.particles = [];
    this.config = config;
    this.container = container;
    this.elapsed = 0;
    this.emitterAge = 0;
    this.nextSpawnTime = 0;
    this.active = true;
    
    // 创建粒子对象池
    this.particlePool = new ObjectPool<EnhancedParticle>(
      () => new EnhancedParticle(),
      (particle) => particle.reset(),
      50, // 初始大小
      config.maxParticles * 2 // 最大大小
    );
    
    // 创建行为实例缓存
    this.behaviorInstances = new Map();
    
    // 初始化位置
    this._prevEmitterPos.x = config.pos.x;
    this._prevEmitterPos.y = config.pos.y;
  }

  // 更新发射器
  update(deltaTime: number): boolean {
    if (!this.active) return false;
    
    this.elapsed += deltaTime;
    this.emitterAge += deltaTime;
    
    // 检查发射器生命周期
    if (this.config.emitterLifetime > 0 && this.emitterAge >= this.config.emitterLifetime) {
      this.active = false;
      // 如果所有粒子都消失，返回false表示发射器完成
      return this.particles.length > 0;
    }
    
    // 生成新粒子
    if (this.elapsed >= this.nextSpawnTime) {
      this.elapsed = 0;
      this.nextSpawnTime = this.config.frequency;
      
      if (Math.random() <= this.config.spawnChance) {
        this.spawnParticles();
      }
    }
    
    // 更新现有粒子 - 使用链表遍历
    let particle = this._activeParticlesFirst;
    while (particle) {
      const nextParticle = particle.next; // 保存下一个粒子引用
      
      const alive = particle.update(deltaTime);
      
      if (!alive) {
        // 回收死亡粒子
        this.recycle(particle);
      }
      
      particle = nextParticle;
    }
    
    // 更新位置状态
    if (this._posChanged) {
      this._prevEmitterPos.x = this.config.pos.x;
      this._prevEmitterPos.y = this.config.pos.y;
      this._prevPosIsValid = true;
      this._posChanged = false;
    }
    
    return true;
  }

  // 生成粒子
  spawnParticles() {
    // 检查是否达到最大粒子数
    if (this.particleCount >= this.config.maxParticles) {
      return;
    }
    
    const count = Math.min(
      this.config.particlesPerWave,
      this.config.maxParticles - this.particleCount
    );
    
    for (let i = 0; i < count; i++) {
      // 从对象池获取粒子
      const particle = this.particlePool.get();
      
      // 设置初始位置
      particle.x = this.config.pos.x;
      particle.y = this.config.pos.y;
      
      // 应用行为
      this.applyBehaviors(particle);
      
      // 添加到容器
      if (this.config.addAtBack) {
        this.container.addChildAt(particle.graphic, 0);
      } else {
        this.container.addChild(particle.graphic);
      }
      
      // 更新图形
      particle.updateGraphic();
      
      // 添加到链表
      if (!this._activeParticlesFirst) {
        this._activeParticlesFirst = particle;
        this._activeParticlesLast = particle;
      } else if (this._activeParticlesLast) {
        this._activeParticlesLast.next = particle;
        particle.prev = this._activeParticlesLast;
        this._activeParticlesLast = particle;
      }
      
      // 添加到粒子列表 (保留兼容性)
      this.particles.push(particle);
      this.particleCount++;
    }
  }

  // 应用行为
  applyBehaviors(particle: EnhancedParticle) {
    particle.behaviors = [];
    
    for (const behaviorConfig of this.config.behaviors) {
      // 获取或创建行为实例
      let behavior = this.behaviorInstances.get(behaviorConfig.type);
      
      if (!behavior) {
        behavior = behaviorRegistry.create(behaviorConfig.type);
        
        if (behavior) {
          this.behaviorInstances.set(behaviorConfig.type, behavior);
        }
      }
      
      if (behavior) {
        // 初始化行为
        behavior.init(particle, behaviorConfig.config);
        
        // 添加到粒子的行为列表
        particle.behaviors.push(behavior);
      }
    }
    
    // 根据优先级排序行为
    particle.behaviors.sort((a, b) => a.order - b.order);
    
    // 设置生命周期
    particle.lifetime = this.config.lifetime.min + Math.random() * (this.config.lifetime.max - this.config.lifetime.min);
  }

  // 回收粒子
  recycle(particle: EnhancedParticle): void {
    // 从链表中移除
    if (particle.prev) {
      particle.prev.next = particle.next;
    } else {
      this._activeParticlesFirst = particle.next;
    }
    
    if (particle.next) {
      particle.next.prev = particle.prev;
    } else {
      this._activeParticlesLast = particle.prev;
    }
    
    // 从容器中移除
    this.container.removeChild(particle.graphic);
    
    // 从数组中移除 (保留兼容性)
    const index = this.particles.indexOf(particle);
    if (index !== -1) {
      this.particles.splice(index, 1);
    }
    
    // 减少计数
    this.particleCount--;
    
    // 返回到对象池
    this.particlePool.release(particle);
  }

  // 更新位置
  updatePosition(x: number, y: number): void {
    this._posChanged = true;
    this.config.pos.x = x;
    this.config.pos.y = y;
  }

  // 停止发射器
  stop() {
    this.active = false;
  }

  // 启动发射器
  start() {
    this.active = true;
    this.emitterAge = 0;
  }

  // 销毁发射器
  destroy() {
    // 移除所有粒子
    let particle = this._activeParticlesFirst;
    while (particle) {
      const nextParticle = particle.next;
      this.container.removeChild(particle.graphic);
      this.particlePool.release(particle);
      particle = nextParticle;
    }
    
    // 重置链表
    this._activeParticlesFirst = null;
    this._activeParticlesLast = null;
    
    // 清空数组 (保留兼容性)
    this.particles = [];
    this.particleCount = 0;
    this.active = false;
    
    // 清空对象池
    this.particlePool.clear();
  }
}

export const ParticleSystemEnhanced = ({ 
  config, 
  play = true, 
  position = [0, 0], 
  scale = 1,
  onComplete 
}: ParticleSystemProps) => {
  const containerRef = useRef<PIXI.Container | null>(null);
  const emitterRef = useRef<EnhancedParticleEmitter | null>(null);
  const lastTimeRef = useRef<number>(Date.now());
  const completedRef = useRef<boolean>(false);

  // 初始化发射器
  useEffect(() => {
    if (!containerRef.current) return;
    
    // 清理旧的发射器
    if (emitterRef.current) {
      emitterRef.current.destroy();
    }
    
    // 创建新的发射器
    const emitter = new EnhancedParticleEmitter(containerRef.current, {
      ...config,
      pos: {
        x: 0, // 相对于容器的位置
        y: 0
      }
    });
    
    emitterRef.current = emitter;
    
    // 设置发射器状态
    if (play) {
      emitter.start();
    } else {
      emitter.stop();
    }
    
    return () => {
      if (emitterRef.current) {
        emitterRef.current.destroy();
      }
    };
  }, [config]);

  // 处理播放状态变化
  useEffect(() => {
    if (!emitterRef.current) return;
    
    if (play) {
      emitterRef.current.start();
      completedRef.current = false;
    } else {
      emitterRef.current.stop();
    }
  }, [play]);

  // 使用 useTick 更新粒子
  useTick(() => {
    if (!emitterRef.current) return;
    
    const now = Date.now();
    const deltaTime = (now - lastTimeRef.current) / 1000; // 转换为秒
    lastTimeRef.current = now;
    
    // 限制最大帧时间，防止大延迟导致粒子跳跃
    const clampedDelta = Math.min(deltaTime, 0.1);
    
    // 更新发射器
    const active = emitterRef.current.update(clampedDelta);
    
    // 检查是否完成
    if (!active && !completedRef.current && onComplete) {
      completedRef.current = true;
      onComplete();
    }
  });

  return (
    <pixiContainer 
      ref={(container) => {
        containerRef.current = container;
      }}
      position={{x: position[0], y: position[1]}}
      scale={{x: scale, y: scale}}
    />
  );
};
