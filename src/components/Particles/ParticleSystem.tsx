
// src/components/Particles/ParticleSystem.tsx
import { useRef, useEffect } from 'react';
import { Container, Graphics,Sprite } from 'pixi.js';
import { extend, useTick } from '@pixi/react';
import * as PIXI from 'pixi.js';

// 注册组件
extend({
  Container,
  Graphics,
  Sprite
});

// 粒子配置接口
export interface ParticleConfig {
  // 生命周期配置
  lifetime: {
    min: number;
    max: number;
  };
  // 发射频率 (秒)
  frequency: number;
  // 发射概率 (0-1)
  spawnChance: number;
  // 每波粒子数量
  particlesPerWave: number;
  // 发射器生命周期 (秒，0表示无限)
  emitterLifetime: number;
  // 最大粒子数量
  maxParticles: number;
  // 位置
  pos: {
    x: number;
    y: number;
  };
  // 是否在后面添加
  addAtBack: boolean;
  // 粒子行为
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

// 粒子类
class Particle {
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
  color: number;
  colorList: { value: string; time: number }[];
  scaleList: { value: number; time: number }[];
  alphaList: { value: number; time: number }[];
  speedList: { value: number; time: number }[];
  texture: PIXI.Texture | null;

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
    this.color = 0xffffff;
    this.colorList = [];
    this.scaleList = [];
    this.alphaList = [];
    this.speedList = [];
    this.texture = null;
  }

  // 更新粒子状态
  update(deltaTime: number): boolean {
    this.age += deltaTime;
    
    if (this.age >= this.lifetime) {
      return false; // 粒子生命周期结束
    }

    // 计算当前生命周期进度 (0-1)
    const progress = this.age / this.lifetime;
    
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

// 粒子发射器类
class ParticleEmitter {
  particles: Particle[];
  config: ParticleConfig;
  container: PIXI.Container;
  elapsed: number;
  emitterAge: number;
  nextSpawnTime: number;
  active: boolean;

  constructor(container: PIXI.Container, config: ParticleConfig) {
    this.particles = [];
    this.config = config;
    this.container = container;
    this.elapsed = 0;
    this.emitterAge = 0;
    this.nextSpawnTime = 0;
    this.active = true;
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
    
    // 更新现有粒子
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      const alive = particle.update(deltaTime);
      
      if (!alive) {
        // 移除死亡粒子
        this.container.removeChild(particle.graphic);
        this.particles.splice(i, 1);
      }
    }
    
    return true;
  }

  // 生成粒子
  spawnParticles() {
    // 检查是否达到最大粒子数
    if (this.particles.length >= this.config.maxParticles) {
      return;
    }
    
    const count = Math.min(
      this.config.particlesPerWave,
      this.config.maxParticles - this.particles.length
    );
    
    for (let i = 0; i < count; i++) {
      const particle = new Particle();
      
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
      
      // 添加到粒子列表
      this.particles.push(particle);
    }
  }

  // 应用行为
  applyBehaviors(particle: Particle) {
    for (const behavior of this.config.behaviors) {
      switch (behavior.type) {
        case 'alpha':
          if (behavior.config.alpha && behavior.config.alpha.list) {
            particle.alphaList = behavior.config.alpha.list;
          }
          break;
          
        case 'scale':
          if (behavior.config.scale && behavior.config.scale.list) {
            particle.scaleList = behavior.config.scale.list;
          }
          break;
          
        case 'color':
          if (behavior.config.color && behavior.config.color.list) {
            particle.colorList = behavior.config.color.list;
          }
          break;
          
        case 'moveSpeed':
          if (behavior.config.speed && behavior.config.speed.list) {
            particle.speedList = behavior.config.speed.list;
          }
          break;
          
        case 'rotationStatic':
          if (behavior.config.min !== undefined && behavior.config.max !== undefined) {
            particle.rotation = (behavior.config.min + Math.random() * (behavior.config.max - behavior.config.min)) * (Math.PI / 180);
          }
          break;
          
        case 'spawnShape':
          this.applySpawnShape(particle, behavior.config);
          break;
          
        case 'textureSingle':
          if (behavior.config.texture) {
            particle.texture = behavior.config.texture;
          }
          break;
      }
    }
    
    // 设置生命周期
    particle.lifetime = this.config.lifetime.min + Math.random() * (this.config.lifetime.max - this.config.lifetime.min);
  }

  // 应用生成形状
  applySpawnShape(particle: Particle, config: any) {
    if (!config.type) return;
    
    switch (config.type) {
      case 'torus':
      case 'circle':
        if (config.data && config.data.radius !== undefined) {
          const radius = config.data.radius;
          const angle = Math.random() * Math.PI * 2;
          
          if (config.type === 'torus') {
            // 环形
            particle.x += Math.cos(angle) * radius;
            particle.y += Math.sin(angle) * radius;
          } else {
            // 圆形
            const r = Math.sqrt(Math.random()) * radius;
            particle.x += Math.cos(angle) * r;
            particle.y += Math.sin(angle) * r;
          }
          
          // 设置初始速度方向（从中心向外）
          const speed = particle.speedList.length > 0 ? particle.speedList[0].value : 100;
          particle.velocity.x = Math.cos(angle) * speed;
          particle.velocity.y = Math.sin(angle) * speed;
        }
        break;
        
      case 'rect':
        if (config.data) {
          const { width, height } = config.data;
          particle.x += (Math.random() - 0.5) * width;
          particle.y += (Math.random() - 0.5) * height;
        }
        break;
    }
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
    for (const particle of this.particles) {
      this.container.removeChild(particle.graphic);
    }
    this.particles = [];
    this.active = false;
  }
}

export const ParticleSystem = ({ 
  config, 
  play = true, 
  position = [0, 0], 
  scale = 1,
  onComplete 
}: ParticleSystemProps) => {
  const containerRef = useRef<PIXI.Container | null>(null);
  const emitterRef = useRef<ParticleEmitter | null>(null);
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
    const emitter = new ParticleEmitter(containerRef.current, {
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
    
    // 更新发射器
    const active = emitterRef.current.update(deltaTime);
    
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
