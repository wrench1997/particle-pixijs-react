// src/components/Particles/behaviors/GLSLArrowBehavior.ts
import type { IBehavior } from '../ParticleBehaviorSystem';
import { BehaviorPriority } from '../ParticleBehaviorSystem';
import { 
  Mesh, 
  Geometry, 
  Shader, 
  Container 
} from 'pixi.js';

export class GLSLArrowBehavior implements IBehavior {
  type = 'glslArrow';
  order = BehaviorPriority.SPECIAL; // 优先级 40
  
  private mesh: Mesh | null = null;
  private container: Container | null = null;
  private time: number = 0;
  private active: boolean = false;
  
  // 箭矢方向的属性
  private arrowDirection: { x: number, y: number, z: number } = { x: 0, y: 0, z: 1 };
  private arrowRotationSpeed: number = 10; // 默认旋转速度
  private autoRotate: boolean = true; // 是否自动旋转
  
  // 箭矢缩放属性
  private arrowScale: number = 0.6; // 默认缩放值
  
  // 相机设置
  private cameraPosition: { x: number, y: number, z: number } = { x: 0, y: 6, z: -2.1 };
  private cameraDirection: { x: number, y: number, z: number } = { x: 0, y: -6, z: 2 };
  private trackTarget: boolean = true; // 是否跟踪目标
  private trackSpeed: number = 0.1; // 跟踪速度
  private targetPosition: { x: number, y: number, z: number } = { x: 0, y: 0, z: 0 };
  
  // 2D目标点
  private target2D: { x: number, y: number } = { x:0 , y:0 };
  
  constructor() {
    // 空构造函数
  }
  
  init(particle: any, config: any): void {
    // 从配置中读取方向设置
    if (config.direction) {
      this.arrowDirection = { ...this.arrowDirection, ...config.direction };
    }
    
    // 处理2D目标点 - 新增
    if (config.target) {
      this.target2D = { ...this.target2D, ...config.target };
      // 根据2D目标点调整相机位置和方向
      this.adjustCameraBasedOnTarget();
    }
    
    if (config.rotationSpeed !== undefined) {
      this.arrowRotationSpeed = config.rotationSpeed;
    }
    
    if (config.autoRotate !== undefined) {
      this.autoRotate = config.autoRotate;
    }
    
    // 读取缩放设置
    if (config.scale !== undefined) {
      this.arrowScale = config.scale;
    }
    
    // 读取相机设置 - 只有在没有target时才直接使用配置的相机设置
    if (!config.target) {
      if (config.cameraPosition) {
        this.cameraPosition = { ...this.cameraPosition, ...config.cameraPosition };
      }
      
      if (config.cameraDirection) {
        this.cameraDirection = { ...this.cameraDirection, ...config.cameraDirection };
      }
    }
    
    // 读取目标跟踪设置
    if (config.trackTarget !== undefined) {
      this.trackTarget = config.trackTarget;
    }
    
    if (config.trackSpeed !== undefined) {
      this.trackSpeed = config.trackSpeed;
    }
    
    if (config.targetPosition) {
      this.targetPosition = { ...this.targetPosition, ...config.targetPosition };
    }
  }
  

// 新增：根据2D目标点调整相机位置和方向
private adjustCameraBasedOnTarget(): void {
  // 根据目标点的位置调整相机位置
  const targetMagnitude = Math.sqrt(this.target2D.x * this.target2D.x + this.target2D.y * this.target2D.y);
  const targetAngle = Math.atan2(this.target2D.y, this.target2D.x);
  
  // 调整相机位置 - 使相机位置随目标点变化
  this.cameraPosition = {
    x: 3 * Math.sin(targetAngle),
    y: 6 + targetMagnitude * 0.1, // 目标越远，相机位置越高
    z: -2.1 - targetMagnitude * 0.1 // 目标越远，相机位置越后
  };
  
  // 调整相机方向 - 始终指向目标点的方向
  this.cameraDirection = {
    x: -this.cameraPosition.x,
    y: -this.cameraPosition.y + targetMagnitude * 0.2, // 调整垂直方向
    z: 2 + targetMagnitude * 0.1 // 调整深度方向
  };
}

  // 批量初始化方法，用于设置全局箭头渲染器
  initParticles(container: Container): void {
    if (this.active) return; // 避免重复初始化
    
    this.container = container;
    this.time = 0;
    this.active = true;
    
    // 创建全屏四边形几何体
    const geometry = new Geometry({
      attributes: {
        aPosition: [
          -1, -1,  // 左下
           1, -1,  // 右下
           1,  1,  // 右上
          -1,  1,  // 左上
        ],
        aUV: [
          0, 0,
          1, 0,
          1, 1,
          0, 1
        ]
      },
      indexBuffer: [0, 1, 2, 0, 2, 3]
    });
    
    // 创建着色器
    const shader = Shader.from({
      gl: {
        vertex: this.getVertexShader(),
        fragment: this.getFragmentShader()
      },
      resources: {
        uniforms: {
          u_time: { type: 'f32', value: 0.0 },
          u_resolution: { type: 'vec2<f32>', value: [800, 600] },
          u_direction: { type: 'vec3<f32>', value: [this.arrowDirection.x, this.arrowDirection.y, this.arrowDirection.z] },
          u_rotationSpeed: { type: 'f32', value: this.arrowRotationSpeed },
          u_autoRotate: { type: 'f32', value: this.autoRotate ? 1.0 : 0.0 },
          u_arrowScale: { type: 'f32', value: this.arrowScale },
          u_cameraPosition: { type: 'vec3<f32>', value: [this.cameraPosition.x, this.cameraPosition.y, this.cameraPosition.z] },
          u_cameraDirection: { type: 'vec3<f32>', value: [this.cameraDirection.x, this.cameraDirection.y, this.cameraDirection.z] },
          u_trackTarget: { type: 'f32', value: this.trackTarget ? 1.0 : 0.0 },
          u_trackSpeed: { type: 'f32', value: this.trackSpeed },
          u_targetPosition: { type: 'vec3<f32>', value: [this.targetPosition.x, this.targetPosition.y, this.targetPosition.z] }
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
  
  // 全局更新方法，用于更新箭头渲染器
  updateGlobal(deltaTime: number): void {
    if (!this.active || !this.mesh) return;
    

    // // 将2D目标点转换为3D方向向量
    // this.convertTargetToDirection();

    // 根据2D目标点调整相机位置和方向
    this.adjustCameraBasedOnTarget();
    // 更新时间
    this.time += deltaTime;
    
    // 更新着色器 uniforms
    this.mesh.shader.resources.uniforms.uniforms.u_time = this.time;
    this.mesh.shader.resources.uniforms.uniforms.u_direction = [
      this.arrowDirection.x, 
      this.arrowDirection.y, 
      this.arrowDirection.z
    ];
    this.mesh.shader.resources.uniforms.uniforms.u_rotationSpeed = this.arrowRotationSpeed;
    this.mesh.shader.resources.uniforms.uniforms.u_autoRotate = this.autoRotate ? 1.0 : 0.0;
    
    // 更新箭矢缩放
    this.mesh.shader.resources.uniforms.uniforms.u_arrowScale = this.arrowScale;
    
    // 更新相机设置
    this.mesh.shader.resources.uniforms.uniforms.u_cameraPosition = [
      this.cameraPosition.x,
      this.cameraPosition.y,
      this.cameraPosition.z
    ];
    this.mesh.shader.resources.uniforms.uniforms.u_cameraDirection = [
      this.cameraDirection.x,
      this.cameraDirection.y,
      this.cameraDirection.z
    ];
    this.mesh.shader.resources.uniforms.uniforms.u_trackTarget = this.trackTarget ? 1.0 : 0.0;
    this.mesh.shader.resources.uniforms.uniforms.u_trackSpeed = this.trackSpeed;
    this.mesh.shader.resources.uniforms.uniforms.u_targetPosition = [
      this.targetPosition.x,
      this.targetPosition.y,
      this.targetPosition.z
    ];
    
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
  
  // 设置2D目标点的方法 - 修改为同时更新相机位置和方向
  setTarget(x: number, y: number): void {
    this.target2D = { x, y };
    this.convertTargetToDirection();
    this.adjustCameraBasedOnTarget(); // 添加这一行

    // 如果着色器已经创建，立即更新uniform
    if (this.mesh && this.mesh.shader) {
      this.mesh.shader.resources.uniforms.uniforms.u_direction = [
        this.arrowDirection.x,
        this.arrowDirection.y,
        this.arrowDirection.z
      ];
      
      // 更新相机位置和方向
      this.mesh.shader.resources.uniforms.uniforms.u_cameraPosition = [
        this.cameraPosition.x,
        this.cameraPosition.y,
        this.cameraPosition.z
      ];
      this.mesh.shader.resources.uniforms.uniforms.u_cameraDirection = [
        this.cameraDirection.x,
        this.cameraDirection.y,
        this.cameraDirection.z
      ];
    }
  }
  
  // 设置箭矢方向的方法
  setDirection(x: number, y: number, z: number): void {
    this.arrowDirection = { x, y, z };
    
    // 如果着色器已经创建，立即更新uniform
    if (this.mesh && this.mesh.shader) {
      this.mesh.shader.resources.uniforms.uniforms.u_direction = [x, y, z];
    }
  }
  
  // 设置旋转速度的方法
  setRotationSpeed(speed: number): void {
    this.arrowRotationSpeed = speed;
    
    // 如果着色器已经创建，立即更新uniform
    if (this.mesh && this.mesh.shader) {
      this.mesh.shader.resources.uniforms.uniforms.u_rotationSpeed = speed;
    }
  }
  
  // 设置是否自动旋转的方法
  setAutoRotate(autoRotate: boolean): void {
    this.autoRotate = autoRotate;
    
    // 如果着色器已经创建，立即更新uniform
    if (this.mesh && this.mesh.shader) {
      this.mesh.shader.resources.uniforms.uniforms.u_autoRotate = autoRotate ? 1.0 : 0.0;
    }
  }
  
  // 设置箭矢缩放的方法
  setScale(scale: number): void {
    this.arrowScale = scale;
    
    // 如果着色器已经创建，立即更新uniform
    if (this.mesh && this.mesh.shader) {
      this.mesh.shader.resources.uniforms.uniforms.u_arrowScale = scale;
    }
  }
  
  // 设置相机位置的方法
  setCameraPosition(x: number, y: number, z: number): void {
    this.cameraPosition = { x, y, z };
    
    // 如果着色器已经创建，立即更新uniform
    if (this.mesh && this.mesh.shader) {
      this.mesh.shader.resources.uniforms.uniforms.u_cameraPosition = [x, y, z];
    }
  }
  
  // 设置相机方向的方法
  setCameraDirection(x: number, y: number, z: number): void {
    this.cameraDirection = { x, y, z };
    
    // 如果着色器已经创建，立即更新uniform
    if (this.mesh && this.mesh.shader) {
      this.mesh.shader.resources.uniforms.uniforms.u_cameraDirection = [x, y, z];
    }
  }
  
  // 设置目标位置的方法
  setTargetPosition(x: number, y: number, z: number): void {
    this.targetPosition = { x, y, z };
    
    // 如果着色器已经创建，立即更新uniform
    if (this.mesh && this.mesh.shader) {
      this.mesh.shader.resources.uniforms.uniforms.u_targetPosition = [x, y, z];
    }
  }
  
  // 设置是否跟踪目标的方法
  setTrackTarget(trackTarget: boolean): void {
    this.trackTarget = trackTarget;
    
    // 如果着色器已经创建，立即更新uniform
    if (this.mesh && this.mesh.shader) {
      this.mesh.shader.resources.uniforms.uniforms.u_trackTarget = trackTarget ? 1.0 : 0.0;
    }
  }
  
  // 设置跟踪速度的方法
  setTrackSpeed(speed: number): void {
    this.trackSpeed = speed;
    
    // 如果着色器已经创建，立即更新uniform
    if (this.mesh && this.mesh.shader) {
      this.mesh.shader.resources.uniforms.uniforms.u_trackSpeed = speed;
    }
  }
  
  // 顶点着色器代码
  private getVertexShader(): string {
    return `
      precision mediump float;
      attribute vec2 aPosition;
      attribute vec2 aUV;
      varying vec2 vUV;
      
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
        vUV = aUV;
      }
    `;
  }
  
  // 片段着色器代码
  private getFragmentShader(): string {
    return `
      precision mediump float;
      
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec3 u_direction;
      uniform float u_rotationSpeed;
      uniform float u_autoRotate;
      
      // 箭矢缩放 uniform
      uniform float u_arrowScale;
      
      // 相机控制 uniforms
      uniform vec3 u_cameraPosition;
      uniform vec3 u_cameraDirection;
      uniform float u_trackTarget;
      uniform float u_trackSpeed;
      uniform vec3 u_targetPosition;
      
      // 2D 旋转矩阵函数
      mat2 rotate2D(float angle) {
          float c = cos(angle);
          float s = sin(angle);
          return mat2(
              c, -s,
              s, c
          );
      }
      
      // 将2D旋转应用到3D向量的XY分量
      vec3 applyRotation(vec3 p, float angle) {
          mat2 rot = rotate2D(angle);
          vec2 rotatedXY = rot * p.xy;
          return vec3(rotatedXY.x, rotatedXY.y, p.z);
      }
      
      // 计算点到线段的距离
      float distToLine(vec3 p, vec3 a, vec3 b) {
          vec3 pa = p - a;
          vec3 ba = b - a;
          float t = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
          return length(pa - ba * t);
      }
      
      // 计算点到盒子的距离
      float distToBox(vec3 p, vec3 center, vec3 size) {
          vec3 d = abs(p - center) - size * 0.5;
          return min(max(d.x, max(d.y, d.z)), 0.0) + length(max(d, 0.0));
      }
      
      // 计算点到三角形的距离
      float distToTriangle(vec3 p, vec3 a, vec3 b, vec3 c) {
          vec3 ba = b - a;
          vec3 ca = c - a;
          vec3 pa = p - a;
          
          vec3 normal = normalize(cross(ba, ca));
          float dist = abs(dot(pa, normal));
          
          // 投影到三角形平面
          vec3 projected = p - normal * dist;
          
          // 检查投影点是否在三角形内
          vec3 n1 = cross(ba, normal);
          vec3 n2 = cross(ca, normal);
          vec3 n3 = cross(c - b, normal);
          
          if (dot(projected - a, n1) > 0.0 && 
              dot(projected - a, n2) < 0.0 && 
              dot(projected - b, n3) > 0.0) {
              return dist;
          }
          
          // 如果不在三角形内，计算到边的最小距离
          float d1 = distToLine(p, a, b);
          float d2 = distToLine(p, a, c);
          float d3 = distToLine(p, b, c);
          
          return min(min(d1, d2), d3);
      }
      
      // 卡通箭矢 SDF - 支持缩放
      float arrowSDF(vec3 p) {
          // 应用缩放 - 将点坐标除以缩放因子，使箭矢变小
          p = p / u_arrowScale;
          
          // 箭杆
          vec3 shaftCenter = vec3(0.0, 0.0, -0.15);
          vec3 shaftSize = vec3(0.05, 0.05, 0.6);
          float shaft = distToBox(p, shaftCenter, shaftSize);
          
          // 箭头
          vec3 tip = vec3(0.0, 0.0, 0.3);
          vec3 base1 = vec3(0.1, 0.0, 0.1);
          vec3 base2 = vec3(-0.1, 0.0, 0.1);
          vec3 base3 = vec3(0.0, 0.1, 0.1);
          
          float head1 = distToTriangle(p, tip, base1, base2);
          float head2 = distToTriangle(p, tip, base2, base3);
          float head3 = distToTriangle(p, tip, base3, base1);
          float head = min(min(head1, head2), head3) - 0.005;
          
          // 羽毛部分
          vec3 feather1Center = vec3(-0.08, 0.0, -0.4);
          vec3 feather1Size = vec3(0.08, 0.02, 0.15);
          float feather1 = distToBox(p, feather1Center, feather1Size);
          
          vec3 feather2Center = vec3(0.08, 0.0, -0.4);
          vec3 feather2Size = vec3(0.08, 0.02, 0.15);
          float feather2 = distToBox(p, feather2Center, feather2Size);
          
          // 组合结果
          float arrowShape = min(min(shaft, head), min(feather1, feather2));
      
          // 将距离乘以缩放因子，以保持SDF的正确性
          return arrowShape * u_arrowScale - 0.01;
      }
      
      // 计算从一个向量到另一个向量的旋转矩阵
      mat3 rotationMatrix(vec3 from, vec3 to) {
          from = normalize(from);
          to = normalize(to);
          
          float cosTheta = dot(from, to);
          vec3 axis;
          
          // 如果向量几乎平行，使用任意垂直轴
          if (cosTheta > 0.99999) {
              return mat3(1.0); // 单位矩阵，无旋转
          } else if (cosTheta < -0.99999) {
              // 向量相反方向，使用任意垂直轴
              axis = cross(vec3(1.0, 0.0, 0.0), from);
              if (length(axis) < 0.00001)
                  axis = cross(vec3(0.0, 1.0, 0.0), from);
              axis = normalize(axis);
              float angle = 3.14159265359; // 180度
              
              // 罗德里格斯旋转公式
              float c = cos(angle);
              float s = sin(angle);
              float t = 1.0 - c;
              
              return mat3(
                  t * axis.x * axis.x + c, t * axis.x * axis.y - s * axis.z, t * axis.x * axis.z + s * axis.y,
                  t * axis.x * axis.y + s * axis.z, t * axis.y * axis.y + c, t * axis.y * axis.z - s * axis.x,
                  t * axis.x * axis.z - s * axis.y, t * axis.y * axis.z + s * axis.x, t * axis.z * axis.z + c
              );
          } else {
              // 正常情况，计算叉积作为旋转轴
              axis = cross(from, to);
              axis = normalize(axis);
              float angle = acos(cosTheta);
              
              // 罗德里格斯旋转公式
              float c = cos(angle);
              float s = sin(angle);
              float t = 1.0 - c;
              
              return mat3(
                  t * axis.x * axis.x + c, t * axis.x * axis.y - s * axis.z, t * axis.x * axis.z + s * axis.y,
                  t * axis.x * axis.y + s * axis.z, t * axis.y * axis.y + c, t * axis.y * axis.z - s * axis.x,
                  t * axis.x * axis.z - s * axis.y, t * axis.y * axis.z + s * axis.x, t * axis.z * axis.z + c
              );
          }
      }
      
      // 计算目标方向
      vec3 calculateTargetDirection(vec3 currentDir, vec3 targetDir, float trackSpeed) {
          // 计算当前方向和目标方向之间的插值
          vec3 result = normalize(mix(currentDir, targetDir, trackSpeed));
          return result;
      }
      
      void main() {
          // 标准化坐标
          vec2 uv = gl_FragCoord.xy / u_resolution.xy * 2.0 - 1.0;
          uv.x *= u_resolution.x / u_resolution.y;
      
          // 相机设置 - 使用传入的相机位置和方向
          vec3 ro = u_cameraPosition;
          vec3 rd;
          
          // 如果启用了目标跟踪
          if (u_trackTarget > 0.5) {
              // 计算从相机位置到目标位置的方向
              vec3 targetDir = normalize(u_targetPosition - ro);
              
              // 平滑过渡到目标方向
              vec3 currentDir = normalize(u_cameraDirection + vec3(uv.x, uv.y, 0.0));
              rd = calculateTargetDirection(currentDir, targetDir, u_trackSpeed);
          } else {
              // 使用传入的相机方向
              rd = normalize(u_cameraDirection + vec3(uv.x, uv.y, 0.0));
          }
          
          // 计算旋转角度 - 根据是否自动旋转决定
          float angle = u_autoRotate > 0.5 ? u_time * u_rotationSpeed : 0.0;
          
          // 默认箭头方向是z轴正方向
          vec3 defaultDir = vec3(0.0, 0.0, 1.0);
          
          // 计算从默认方向到目标方向的旋转矩阵
          mat3 dirRotation = rotationMatrix(defaultDir, u_direction);
          
          // 光线追踪
          float t = 0.0;
          float tMax = 50.0;
          float d = 0.0;
          vec3 p;
          
          for (int i = 0; i < 64; i++) {
              p = ro + rd * t;
              
              // 首先应用方向旋转，然后应用动画旋转
              vec3 rotatedP = p;
              
              // 应用方向旋转
              rotatedP = dirRotation * rotatedP;
              
              // 应用动画旋转（如果启用）
              if (u_autoRotate > 0.5) {
                  rotatedP = applyRotation(rotatedP, angle);
              }
              
              d = arrowSDF(rotatedP);
              
              if (d < 0.001 || t > tMax) break;
              t += d;
          }
          
          // 渲染
          vec3 arrowColor = vec3(0.8, 0.8, 0.8);
          vec3 outlineColor = vec3(0.0, 0.0, 0.0);
          
          vec3 color;
          if (t < tMax) {
              // 命中箭矢
              vec3 rotatedP = dirRotation * p;
              if (u_autoRotate > 0.5) {
                  rotatedP = applyRotation(rotatedP, angle);
              }
              
              // 计算法线
              vec3 eps = vec3(0.001, 0.0, 0.0);
              vec3 normal = normalize(vec3(
                  arrowSDF(dirRotation * (u_autoRotate > 0.5 ? applyRotation(p + eps.xyy, angle) : p + eps.xyy)) - 
                  arrowSDF(dirRotation * (u_autoRotate > 0.5 ? applyRotation(p - eps.xyy, angle) : p - eps.xyy)),
                  
                  arrowSDF(dirRotation * (u_autoRotate > 0.5 ? applyRotation(p + eps.yxy, angle) : p + eps.yxy)) - 
                  arrowSDF(dirRotation * (u_autoRotate > 0.5 ? applyRotation(p - eps.yxy, angle) : p - eps.yxy)),
                  
                  arrowSDF(dirRotation * (u_autoRotate > 0.5 ? applyRotation(p + eps.yyx, angle) : p + eps.yyx)) - 
                  arrowSDF(dirRotation * (u_autoRotate > 0.5 ? applyRotation(p - eps.yyx, angle) : p - eps.yyx))
              ));
              
              vec3 lightDir = normalize(vec3(1.0, 1.0, -1.0));
              float diff = dot(normal, lightDir);
              
              if (diff > 0.8) diff = 1.0;
              else if (diff > 0.4) diff = 0.7;
              else if (diff > 0.0) diff = 0.4;
              else diff = 0.2;
              
              color = arrowColor * diff;
              
              float edge = 1.0 - pow(abs(dot(normal, -rd)), 1.0);
              if (edge > 0.7) {
                  color = mix(color, outlineColor, (edge - 0.7) * 3.0);
              }
              
              vec3 reflectDir = reflect(-lightDir, normal);
              float spec = pow(max(dot(rd, reflectDir), 0.0), 32.0);
              if (spec > 0.5) {
                  color += vec3(1.0) * 0.5;
              }
          } else {
              // 使用透明背景
              discard;
          }
          
          gl_FragColor = vec4(color, 1.0);
      }
    `;
  }
}