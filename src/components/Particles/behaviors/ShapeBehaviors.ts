// src/components/Particles/behaviors/ShapeBehaviors.ts
import { IBehavior } from '../ParticleBehaviorSystem';

// 基础形状生成行为
export class SpawnShapeBehavior implements IBehavior {
  type = 'spawnShape';

  init(particle: any, config: any): void {
    if (!config.type) return;
    
    switch (config.type) {
      case 'torus':
      case 'circle':
        this.applyCircleShape(particle, config);
        break;
        
      case 'rect':
        this.applyRectShape(particle, config);
        break;
        
      case 'line':
        this.applyLineShape(particle, config);
        break;
        
      case 'burst':
        this.applyBurstShape(particle, config);
        break;
    }
  }

  update(particle: any, deltaTime: number, progress: number): void {
    // 形状生成只在初始化时应用
  }

  private applyCircleShape(particle: any, config: any): void {
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
      if (config.emitFromEdge) {
        const speed = particle.speedList && particle.speedList.length > 0 
          ? particle.speedList[0].value 
          : 100;
        particle.velocity.x = Math.cos(angle) * speed;
        particle.velocity.y = Math.sin(angle) * speed;
      }
    }
  }

  private applyRectShape(particle: any, config: any): void {
    if (config.data) {
      const { width, height } = config.data;
      
      if (config.data.edge) {
        // 从矩形边缘生成
        const side = Math.floor(Math.random() * 4); // 0-3 表示四条边
        let x = 0, y = 0;
        
        switch (side) {
          case 0: // 上边
            x = Math.random() * width - width/2;
            y = -height/2;
            break;
          case 1: // 右边
            x = width/2;
            y = Math.random() * height - height/2;
            break;
          case 2: // 下边
            x = Math.random() * width - width/2;
            y = height/2;
            break;
          case 3: // 左边
            x = -width/2;
            y = Math.random() * height - height/2;
            break;
        }
        
        particle.x += x;
        particle.y += y;
        
        // 设置速度方向（从边缘向外）
        if (config.emitFromEdge) {
          const speed = particle.speedList && particle.speedList.length > 0 
            ? particle.speedList[0].value 
            : 100;
          const angle = Math.atan2(y, x);
          particle.velocity.x = Math.cos(angle) * speed;
          particle.velocity.y = Math.sin(angle) * speed;
        }
      } else {
        // 从矩形内部随机生成
        particle.x += (Math.random() - 0.5) * width;
        particle.y += (Math.random() - 0.5) * height;
      }
    }
  }

  private applyLineShape(particle: any, config: any): void {
    if (config.data) {
      const { start, end } = config.data;
      const t = Math.random();
      
      // 线性插值
      particle.x += start.x + (end.x - start.x) * t;
      particle.y += start.y + (end.y - start.y) * t;
      
      // 设置速度方向（垂直于线）
      if (config.emitFromEdge) {
        const speed = particle.speedList && particle.speedList.length > 0 
          ? particle.speedList[0].value 
          : 100;
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const angle = Math.atan2(dy, dx) + Math.PI/2;
        particle.velocity.x = Math.cos(angle) * speed;
        particle.velocity.y = Math.sin(angle) * speed;
      }
    }
  }

  private applyBurstShape(particle: any, config: any): void {
    // 爆发形状 - 所有粒子从同一点发射，但速度方向不同
    const angle = Math.random() * Math.PI * 2;
    const speed = particle.speedList && particle.speedList.length > 0 
      ? particle.speedList[0].value 
      : 100;
    
    // 可以添加一些随机性到速度
    const speedVariance = config.data?.speedVariance || 0.2;
    const finalSpeed = speed * (1 + (Math.random() - 0.5) * speedVariance);
    
    particle.velocity.x = Math.cos(angle) * finalSpeed;
    particle.velocity.y = Math.sin(angle) * finalSpeed;
  }
}

// 多边形形状生成行为
export class PolygonShapeBehavior implements IBehavior {
  type = 'polygonShape';

  init(particle: any, config: any): void {
    if (!config.sides || config.sides < 3) return;
    
    const sides = config.sides;
    const radius = config.radius || 50;
    const rotation = config.rotation || 0;
    const index = Math.floor(Math.random() * sides);
    
    // 计算多边形顶点
    const angle1 = (index / sides * Math.PI * 2) + (rotation * Math.PI / 180);
    const angle2 = ((index + 1) / sides * Math.PI * 2) + (rotation * Math.PI / 180);
    
    // 在两个顶点之间随机选择一个点
    const t = Math.random();
    const x = radius * ((1 - t) * Math.cos(angle1) + t * Math.cos(angle2));
    const y = radius * ((1 - t) * Math.sin(angle1) + t * Math.sin(angle2));
    
    particle.x += x;
    particle.y += y;
    
    // 设置速度方向
    if (config.emitFromEdge) {
      const speed = particle.speedList && particle.speedList.length > 0 
        ? particle.speedList[0].value 
        : 100;
      const angle = Math.atan2(y, x);
      particle.velocity.x = Math.cos(angle) * speed;
      particle.velocity.y = Math.sin(angle) * speed;
    }
  }

  update(particle: any, deltaTime: number, progress: number): void {
    // 形状生成只在初始化时应用
  }
}

// 图像形状生成行为
export class ImageShapeBehavior implements IBehavior {
  type = 'imageShape';
  private pixels: {x: number, y: number, alpha: number}[] = [];

  init(particle: any, config: any): void {
    // 如果已经有像素数据，直接使用
    if (config.pixels && config.pixels.length > 0) {
      this.pixels = config.pixels;
      this.applyImageShape(particle);
      return;
    }
    
    // 否则，需要从图像中提取像素数据
    if (config.image && config.image instanceof HTMLImageElement) {
      this.extractPixels(config.image, config.threshold || 0.5, config.scale || 1);
      this.applyImageShape(particle);
    }
  }

  update(particle: any, deltaTime: number, progress: number): void {
    // 形状生成只在初始化时应用
  }

  private extractPixels(image: HTMLImageElement, threshold: number, scale: number): void {
    // 创建临时canvas来提取像素数据
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = image.width;
    canvas.height = image.height;
    
    // 绘制图像
    ctx.drawImage(image, 0, 0);
    
    // 获取像素数据
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    this.pixels = [];
    
    // 遍历像素
    for (let y = 0; y < canvas.height; y += 1) {
      for (let x = 0; x < canvas.width; x += 1) {
        const index = (y * canvas.width + x) * 4;
        const alpha = data[index + 3] / 255;
        
        // 只保留alpha值大于阈值的像素
        if (alpha > threshold) {
          this.pixels.push({
            x: (x - canvas.width / 2) * scale,
            y: (y - canvas.height / 2) * scale,
            alpha
          });
        }
      }
    }
  }

  private applyImageShape(particle: any): void {
    if (this.pixels.length === 0) return;
    
    // 随机选择一个像素位置
    const pixel = this.pixels[Math.floor(Math.random() * this.pixels.length)];
    
    particle.x += pixel.x;
    particle.y += pixel.y;
    particle.alpha *= pixel.alpha; // 可选：根据像素透明度调整粒子透明度
  }
}