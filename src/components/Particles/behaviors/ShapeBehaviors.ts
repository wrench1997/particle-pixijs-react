
// src/components/Particles/behaviors/ShapeBehaviors.ts
import type { IBehavior } from '../ParticleBehaviorSystem';
import * as PIXI from 'pixi.js';
import { rotatePoint } from '../ParticleUtils';
import { BehaviorPriority } from '../ParticleBehaviorSystem';

// 点数据接口
interface IPointData {
  x: number;
  y: number;
}

// 线段接口
interface Segment {
  p1: IPointData;
  p2: IPointData;
  l: number; // 线段长度
}

// 多边形链类
export class PolygonalChain {
  type = 'polygonalChain';
  segments: Segment[] = [];
  totalLength: number = 0;
  countingLengths: number[] = [];

  constructor(data: IPointData[] | IPointData[][]) {
    // 处理空数据情况
    if (!data || (Array.isArray(data) && data.length === 0)) {
      // 创建一个默认段
      this.segments.push({
        p1: { x: 0, y: 0 },
        p2: { x: 0, y: 0 },
        l: 0
      });
      this.totalLength = 0;
      this.countingLengths = [0];
      return;
    }

    // 判断是单条折线还是多条折线
    if (!Array.isArray(data[0].x)) {
      // 单条折线
      this.processChain(data as IPointData[]);
    } else {
      // 多条折线
      for (const chain of data as IPointData[][]) {
        this.processChain(chain);
      }
    }

    // 预计算累计长度
    this.calculateLengths();
  }

  // 处理单条折线
  private processChain(points: IPointData[]): void {
    if (points.length < 2) return;

    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      
      // 计算段长度
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      
      // 添加段
      this.segments.push({
        p1: { x: p1.x, y: p1.y },
        p2: { x: p2.x, y: p2.y },
        l: length
      });
      
      this.totalLength += length;
    }
  }

  // 计算累计长度
  private calculateLengths(): void {
    let cumulative = 0;
    this.countingLengths = [];
    
    for (const seg of this.segments) {
      cumulative += seg.l;
      this.countingLengths.push(cumulative);
    }
  }

  // 获取随机位置
  getRandPos(out: IPointData = { x: 0, y: 0 }): IPointData {
    if (this.segments.length === 0 || this.totalLength === 0) {
      out.x = 0;
      out.y = 0;
      return out;
    }

    // 在总长度上随机取一个位置
    const rand = Math.random() * this.totalLength;
    
    // 找到对应的段
    let segmentIndex = 0;
    for (let i = 0; i < this.countingLengths.length; i++) {
      if (rand < this.countingLengths[i]) {
        segmentIndex = i;
        break;
      }
    }
    
    // 计算在段内的位置比例
    const segment = this.segments[segmentIndex];
    let previousCumulative = segmentIndex > 0 ? this.countingLengths[segmentIndex - 1] : 0;
    let lerp = (rand - previousCumulative) / segment.l;
    
    // 线性插值计算坐标
    out.x = segment.p1.x + lerp * (segment.p2.x - segment.p1.x);
    out.y = segment.p1.y + lerp * (segment.p2.y - segment.p1.y);
    
    return out;
  }
}



// getRandPos(particle) {
//   // place the particle at a random radius in the ring
//   if (this.innerRadius !== this.radius) {
//       particle.x = (Math.random() * (this.radius - this.innerRadius)) + this.innerRadius;
//   }
//   else {
//       particle.x = this.radius;
//   }
//   particle.y = 0;
//   // rotate the point to a random angle in the circle
//   const angle = Math.random() * Math.PI * 2;
//   if (this.rotation) {
//       particle.rotation += angle;
//   }
//   rotatePoint(angle, particle.position);
//   // now add in the center of the torus
//   particle.position.x += this.x;
//   particle.position.y += this.y;
// }

// 基础形状生成行为
export class SpawnShapeBehavior implements IBehavior {
  type = 'spawnShape';
  order = BehaviorPriority.SPAWN; // 优先级 0
  
  init(particle: any, config: any): void {
    if (!config.type) return;
    
    switch (config.type) {
      case 'torus':
        if (config.data && config.data.radius !== undefined) {
          const radius = config.data.radius;
          const innerRadius = config.data.innerRadius || 0;
          const x = config.data.x || 0;
          const y = config.data.y || 0;
          const angle = Math.random() * Math.PI * 2;
          
          // 设置粒子在环形上的随机位置
          if (innerRadius !== radius) {
            particle.x = (Math.random() * (radius - innerRadius)) + innerRadius;
          } else {
            particle.x = radius;
          }
          particle.y = 0;

          
          // 如果需要影响旋转，则设置粒子旋转
          if (config.data.affectRotation) {
            particle.rotation += angle;
          }
          
          // 旋转粒子位置
          rotatePoint(angle, particle);
          
          // 添加中心点偏移
          particle.x += x;
          particle.y += y;
          const speed = particle.speedList.length > 0 ? particle.speedList[0].value : 100;
          particle.velocity.x = speed;
          particle.velocity.y = speed;

        }
        break;
      case 'circle':
        if (config.data && config.data.radius !== undefined) {
          const radius = config.data.radius;
          const innerRadius = config.data.innerRadius || 0;
          const angle = Math.random() * Math.PI * 2;
          
          if (config.type === 'torus') {
            // 环形
            const r = innerRadius === radius ? radius : 
              innerRadius + Math.random() * (radius - innerRadius);
            particle.x += Math.cos(angle) * r;
            particle.y += Math.sin(angle) * r;
          } else {
            // 圆形
            const r = Math.sqrt(Math.random()) * radius;
            particle.x += Math.cos(angle) * r;
            particle.y += Math.sin(angle) * r;
          }
          
          // 设置初始速度方向（从中心向外）
          if (config.data.affectRotation) {
            particle.rotation = angle;
          }
          
          const speed = particle.speedList.length > 0 ? particle.speedList[0].value : 100;
          particle.velocity.x = Math.cos(angle) * speed;
          particle.velocity.y = Math.sin(angle) * speed;
        }
        break;
        
      case 'rect':
        if (config.data) {
          const { w, h, x, y } = config.data;
          particle.x += x + (Math.random() * w) - w/2;
          particle.y += y + (Math.random() * h) - h/2;
        }
        break;
    }
  }

  update(particle: any, deltaTime: number, progress: number): void {
    // 形状生成只在初始化时应用
  }
}

// 多边形形状行为
export class PolygonShapeBehavior implements IBehavior {
  type = 'polygonalChain';
  order = BehaviorPriority.SPAWN + 1; // 优先级 1
  

  private segments: any[] = [];
  private countingLengths: number[] = [];
  private totalLength: number = 0;

  init(particle: any, config: any): void {
    // 初始化多边形链
    this.segments = [];
    this.countingLengths = [];
    this.totalLength = 0;
    
    const data = config.data;
    
    if (!data || !data.length) {
      this.segments.push({ p1: { x: 0, y: 0 }, p2: { x: 0, y: 0 }, l: 0 });
    }
    else if (Array.isArray(data[0])) {
      // 多条链
      for (let i = 0; i < data.length; ++i) {
        const chain = data[i];
        let prevPoint = chain[0];
        for (let j = 1; j < chain.length; ++j) {
          const second = chain[j];
          this.segments.push({ p1: prevPoint, p2: second, l: 0 });
          prevPoint = second;
        }
      }
    }
    else {
      // 单条链
      let prevPoint = data[0];
      for (let i = 1; i < data.length; ++i) {
        const second = data[i];
        this.segments.push({ p1: prevPoint, p2: second, l: 0 });
        prevPoint = second;
      }
    }
    
    // 计算每段长度
    for (let i = 0; i < this.segments.length; ++i) {
      const { p1, p2 } = this.segments[i];
      const segLength = Math.sqrt(((p2.x - p1.x) * (p2.x - p1.x)) + ((p2.y - p1.y) * (p2.y - p1.y)));
      this.segments[i].l = segLength;
      this.totalLength += segLength;
      this.countingLengths.push(this.totalLength);
    }
    
    // 获取随机位置
    this.getRandPos(particle);
  }

  update(particle: any, deltaTime: number, progress: number): void {
    // 多边形形状只在初始化时应用
  }
  
  getRandPos(particle: any): void {
    // 选择随机线段位置
    const rand = Math.random() * this.totalLength;
    let chosenSeg;
    let lerp;
    
    // 如果只有一个线段，直接选择
    if (this.segments.length === 1) {
      chosenSeg = this.segments[0];
      lerp = rand;
    }
    else {
      // 否则，根据累积长度确定选择哪个线段
      for (let i = 0; i < this.countingLengths.length; ++i) {
        if (rand < this.countingLengths[i]) {
          chosenSeg = this.segments[i];
          lerp = i === 0 ? rand : rand - this.countingLengths[i - 1];
          break;
        }
      }
    }
    
    // 将lerp转换为0-1之间的值
    lerp /= chosenSeg.l || 1;
    
    const { p1, p2 } = chosenSeg;
    
    // 计算线段上的位置
    particle.x += p1.x + (lerp * (p2.x - p1.x));
    particle.y += p1.y + (lerp * (p2.y - p1.y));
    
    // 可选：设置粒子朝向线段方向
    if (chosenSeg.l > 0) {
      const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
      particle.rotation = angle;
      
      // 设置初始速度方向
      const speed = particle.speedList.length > 0 ? particle.speedList[0].value : 100;
      particle.velocity.x = Math.cos(angle) * speed;
      particle.velocity.y = Math.sin(angle) * speed;
    }
  }
}

// 图像形状行为（从图像数据生成粒子）
export class ImageShapeBehavior implements IBehavior {
  type = 'imageShape';
  order = BehaviorPriority.SPAWN + 2; // 优先级 2
  
  
  private pixels: {x: number, y: number, color: number}[] = [];
  
  init(particle: any, config: any): void {
    if (this.pixels.length === 0 && config.imageData) {
      this.processImageData(config.imageData, config.threshold || 128);
    }
    
    if (this.pixels.length > 0) {
      const pixelIndex = Math.floor(Math.random() * this.pixels.length);
      const pixel = this.pixels[pixelIndex];
      
      particle.x += pixel.x;
      particle.y += pixel.y;
      
      // 可选：使用像素颜色
      if (config.usePixelColor) {
        particle.color = pixel.color;
      }
    }
  }
  
  update(particle: any, deltaTime: number, progress: number): void {
    // 图像形状只在初始化时应用
  }
  
  private processImageData(imageData: ImageData, threshold: number): void {
    const { width, height, data } = imageData;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const alpha = data[index + 3];
        
        // 只处理非透明像素
        if (alpha > threshold) {
          const r = data[index];
          const g = data[index + 1];
          const b = data[index + 2];
          const color = (r << 16) | (g << 8) | b;
          
          this.pixels.push({
            x: x - width / 2,  // 居中
            y: y - height / 2, // 居中
            color
          });
        }
      }
    }
  }
}