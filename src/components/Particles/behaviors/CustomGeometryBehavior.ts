// src/components/Particles/behaviors/CustomGeometryBehavior.ts
import type { IBehavior } from '../ParticleBehaviorSystem';
import { BehaviorPriority } from '../ParticleBehaviorSystem';
import { Geometry, Mesh, Shader, Container } from 'pixi.js';

export class CustomGeometryBehavior implements IBehavior {
  type = 'customGeometry';
  order = BehaviorPriority.SPECIAL; // 优先级 40
  
  private mesh: Mesh | null = null;
  private container: Container | null = null;
  private time: number = 0;
  private active: boolean = false;
  
  // 几何体属性
  private vertices: number[] = [];
  private indices: number[] = [];
  private uvs: number[] = [];
  
  // 着色器属性
  private vertexShader: string = '';
  private fragmentShader: string = '';
  private uniforms: Record<string, any> = {};
  
  constructor() {
    // 空构造函数
  }
  
  init(particle: any, config: any): void {
    // 从配置中读取几何体数据
    if (config.geometry) {
      this.vertices = config.geometry.vertices || [];
      this.indices = config.geometry.indices || [];
      this.uvs = config.geometry.uvs || [];
    }
    
    // 从配置中读取着色器代码
    if (config.shader) {
      this.vertexShader = config.shader.vertex || this.getDefaultVertexShader();
      this.fragmentShader = config.shader.fragment || this.getDefaultFragmentShader();
    } else {
      this.vertexShader = this.getDefaultVertexShader();
      this.fragmentShader = this.getDefaultFragmentShader();
    }
    
    // 从配置中读取uniform值
    if (config.uniforms) {
      this.uniforms = { ...this.uniforms, ...config.uniforms };
    }
  }
  
  // 批量初始化方法，用于设置全局渲染器
  initParticles(container: Container): void {
    if (this.active) return; // 避免重复初始化
    
    this.container = container;
    this.time = 0;
    this.active = true;
    
    // 创建几何体
    const geometry = new Geometry({
      attributes: {
        aPosition: this.vertices.length ? this.vertices : [
          -1, -1, 0,  // 左下
           1, -1, 0,  // 右下
           1,  1, 0,  // 右上
          -1,  1, 0,  // 左上
        ],
        aUV: this.uvs.length ? this.uvs : [
          0, 0,
          1, 0,
          1, 1,
          0, 1
        ]
      },
      indexBuffer: this.indices.length ? this.indices : [0, 1, 2, 0, 2, 3]
    });
    
    // 创建着色器
    const shader = Shader.from({
      gl: {
        vertex: this.vertexShader,
        fragment: this.fragmentShader
      },
      resources: {
        uniforms: {
          u_time: { type: 'f32', value: 0.0 },
          u_resolution: { type: 'vec2<f32>', value: [800, 600] },
          ...this.uniforms
        }
      }
    });
    
    // 创建网格
    this.mesh = new Mesh({ geometry, shader });
    
    // 添加到容器
    container.addChild(this.mesh);
  }
  
  update(particle: any, deltaTime: number, progress: number): void {
    // 这个方法不会用于更新单个粒子
  }
  
  // 全局更新方法
  updateGlobal(deltaTime: number): void {
    if (!this.active || !this.mesh) return;
    
    // 更新时间
    this.time += deltaTime;
    
    // 更新着色器 uniforms
    this.mesh.shader.resources.uniforms.uniforms.u_time = this.time;
    
    // 如果容器大小改变，更新分辨率
    if (this.container) {
      const renderer = this.container.renderer;
      if (renderer) {
        this.mesh.shader.resources.uniforms.uniforms.u_resolution = [
          renderer.width,
          renderer.height
        ];
      }
    }
  }
  
  // 清理方法
  cleanup(): void {
    if (this.mesh && this.container) {
      this.container.removeChild(this.mesh);
      this.mesh = null;
    }
    this.active = false;
  }
  
  // 默认顶点着色器
  private getDefaultVertexShader(): string {
    return `
      precision mediump float;
      attribute vec3 aPosition;
      attribute vec2 aUV;
      varying vec2 vUV;
      
      void main() {
        gl_Position = vec4(aPosition, 1.0);
        vUV = aUV;
      }
    `;
  }
  
  // 默认片段着色器 - 绘制一个简单的圆形
  private getDefaultFragmentShader(): string {
    return `
      precision mediump float;
      
      uniform vec2 u_resolution;
      uniform float u_time;
      varying vec2 vUV;
      
      void main() {
        vec2 uv = vUV * 2.0 - 1.0;
        float dist = length(uv);
        
        // 创建一个圆形
        float circle = smoothstep(0.5, 0.48, dist);
        
        // 添加一些动画效果
        float pulse = 0.5 + 0.5 * sin(u_time * 3.0);
        vec3 color = mix(vec3(1.0, 0.5, 0.2), vec3(0.2, 0.5, 1.0), pulse);
        
        gl_FragColor = vec4(color * circle, circle);
      }
    `;
  }
}