import json
import os
import base64
import struct
import argparse

def read_binary_file(file_path):
    """读取二进制文件内容"""
    with open(file_path, 'rb') as f:
        return f.read()

def create_html_from_gltf(gltf_path, output_path):
    # 读取GLTF文件
    with open(gltf_path, 'r') as f:
        gltf_data = json.load(f)
    
    # 获取bin文件路径
    bin_file = gltf_data['buffers'][0]['uri']
    bin_path = os.path.join(os.path.dirname(gltf_path), bin_file)
    
    # 读取bin文件
    bin_data = read_binary_file(bin_path)
    
    # 将bin数据转换为base64字符串
    bin_base64 = base64.b64encode(bin_data).decode('utf-8')
    
    # 提取模型信息
    accessors = gltf_data['accessors']
    buffer_views = gltf_data['bufferViews']
    meshes = gltf_data['meshes']
    
    # 创建HTML文件
    html_content = f"""<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <title>GLTF 3D 模型渲染 - {os.path.basename(gltf_path)}</title>
    <script type="module">
      import {{
        Application,
        Mesh,
        Geometry,
        Shader,
        Container
      }} from 'https://cdn.jsdelivr.net/npm/pixi.js@8/dist/pixi.mjs';

      (async () => {{
        try {{
          // 创建应用
          const app = new Application();
          await app.init({{
            height: window.innerHeight,
            width: window.innerWidth,
            background: '#1a1a1a',
            antialias: true
          }});
          document.body.appendChild(app.view);
          
          // 从GLTF数据创建几何体
          const createGeometryFromGLTF = () => {{
            // 解码base64数据
            const binData = atob("{bin_base64}");
            const buffer = new ArrayBuffer(binData.length);
            const view = new Uint8Array(buffer);
            for (let i = 0; i < binData.length; i++) {{
              view[i] = binData.charCodeAt(i);
            }}
            
            // 解析GLTF数据
            const gltfData = {json.dumps(gltf_data)};
            const accessors = gltfData.accessors;
            const bufferViews = gltfData.bufferViews;
            const meshes = gltfData.meshes;
            
            // 创建几何体数组
            const geometries = [];
            
            // 遍历所有网格
            for (const mesh of meshes) {{
              // 遍历网格中的所有图元
              for (const primitive of mesh.primitives) {{
                const attributes = primitive.attributes;
                
                // 获取位置数据
                const positionAccessorIndex = attributes.POSITION;
                const positionAccessor = accessors[positionAccessorIndex];
                const positionBufferView = bufferViews[positionAccessor.bufferView];
                const positionOffset = (positionBufferView.byteOffset || 0) + (positionAccessor.byteOffset || 0);
                const positionStride = positionBufferView.byteStride || 12; // 3个float32 = 12字节
                const positionCount = positionAccessor.count;
                
                // 提取位置数据
                const positions = [];
                for (let i = 0; i < positionCount; i++) {{
                  const offset = positionOffset + i * positionStride;
                  const x = new Float32Array(buffer.slice(offset, offset + 4))[0];
                  const y = new Float32Array(buffer.slice(offset + 4, offset + 8))[0];
                  const z = new Float32Array(buffer.slice(offset + 8, offset + 12))[0];
                  
                  // 缩放模型以适应屏幕
                  positions.push(x * 20, y * 20, z * 20);
                }}
                
                // 获取法线数据（如果有）
                let normals = [];
                if (attributes.NORMAL !== undefined) {{
                  const normalAccessorIndex = attributes.NORMAL;
                  const normalAccessor = accessors[normalAccessorIndex];
                  const normalBufferView = bufferViews[normalAccessor.bufferView];
                  const normalOffset = (normalBufferView.byteOffset || 0) + (normalAccessor.byteOffset || 0);
                  const normalStride = normalBufferView.byteStride || 12;
                  const normalCount = normalAccessor.count;
                  
                  for (let i = 0; i < normalCount; i++) {{
                    const offset = normalOffset + i * normalStride;
                    const nx = new Float32Array(buffer.slice(offset, offset + 4))[0];
                    const ny = new Float32Array(buffer.slice(offset + 4, offset + 8))[0];
                    const nz = new Float32Array(buffer.slice(offset + 8, offset + 12))[0];
                    normals.push(nx, ny, nz);
                  }}
                }}
                
                // 获取索引数据
                const indices = [];
                if (primitive.indices !== undefined) {{
                  const indexAccessorIndex = primitive.indices;
                  const indexAccessor = accessors[indexAccessorIndex];
                  const indexBufferView = bufferViews[indexAccessor.bufferView];
                  const indexOffset = (indexBufferView.byteOffset || 0) + (indexAccessor.byteOffset || 0);
                  const indexCount = indexAccessor.count;
                  
                  // 根据索引类型读取数据
                  const componentType = indexAccessor.componentType;
                  const bytesPerIndex = componentType === 5123 ? 2 : (componentType === 5125 ? 4 : 1);
                  
                  for (let i = 0; i < indexCount; i++) {{
                    const offset = indexOffset + i * bytesPerIndex;
                    let index;
                    
                    if (componentType === 5123) {{ // UNSIGNED_SHORT
                      index = new Uint16Array(buffer.slice(offset, offset + 2))[0];
                    }} else if (componentType === 5125) {{ // UNSIGNED_INT
                      index = new Uint32Array(buffer.slice(offset, offset + 4))[0];
                    }} else {{ // UNSIGNED_BYTE
                      index = new Uint8Array(buffer.slice(offset, offset + 1))[0];
                    }}
                    
                    indices.push(index);
                  }}
                }}
                
                // 创建几何体
                const geometryAttributes = {{
                  aPosition: positions
                }};
                
                if (normals.length > 0) {{
                  geometryAttributes.aNormal = normals;
                }}
                
                const geometry = new Geometry({{
                  attributes: geometryAttributes,
                  indexBuffer: indices.length > 0 ? indices : undefined
                }});
                
                geometries.push(geometry);
              }}
            }}
            
            return geometries;
          }};
          
          const geometries = createGeometryFromGLTF();
          
          // 创建着色器
          const shader = Shader.from({{
            gl: {{
              vertex: `
                precision mediump float;
                attribute vec3 aPosition;
                attribute vec3 aNormal;
                
                uniform mat4 uModelMatrix;
                uniform mat4 uViewMatrix;
                uniform mat4 uProjectionMatrix;
                uniform float uTime;
                
                varying vec3 vPosition;
                varying vec3 vNormal;
                varying vec3 vWorldPosition;
                
                void main() {{
                  // 应用模型矩阵
                  vec4 worldPosition = uModelMatrix * vec4(aPosition, 1.0);
                  vec4 viewPosition = uViewMatrix * worldPosition;
                  gl_Position = uProjectionMatrix * viewPosition;
                  
                  // 变换法线
                  vNormal = mat3(uModelMatrix) * (aNormal != vec3(0.0) ? aNormal : vec3(0.0, 1.0, 0.0));
                  vPosition = aPosition;
                  vWorldPosition = worldPosition.xyz;
                }}
              `,
              fragment: `
                precision mediump float;
                
                varying vec3 vPosition;
                varying vec3 vNormal;
                varying vec3 vWorldPosition;
                uniform float uTime;
                
                void main() {{
                  // 光照方向
                  vec3 lightDir = normalize(vec3(sin(uTime * 0.5), 0.7, cos(uTime * 0.5)));
                  
                  // 计算漫反射
                  vec3 normal = normalize(vNormal);
                  float diff = max(dot(normal, lightDir), 0.0);
                  
                  // 基础颜色
                  vec3 baseColor = vec3(0.7, 0.7, 0.8);
                  
                  // 环境光
                  vec3 ambient = baseColor * 0.3;
                  
                  // 漫反射
                  vec3 diffuse = baseColor * diff * 0.7;
                  
                  // 高光
                  vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0) - vWorldPosition);
                  vec3 reflectDir = reflect(-lightDir, normal);
                  float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
                  vec3 specular = vec3(1.0) * spec * 0.3;
                  
                  // 最终颜色
                  vec3 color = ambient + diffuse + specular;
                  
                  gl_FragColor = vec4(color, 1.0);
                }}
              `
            }},
            resources: {{
              uniforms: {{
                uTime: {{ type: 'f32', value: 0.0 }},
                uModelMatrix: {{ 
                  type: 'mat4x4<f32>', 
                  value: [
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1
                  ]
                }},
                uViewMatrix: {{ 
                  type: 'mat4x4<f32>', 
                  value: [
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    0, 0, -5, 1
                  ]
                }},
                uProjectionMatrix: {{ 
                  type: 'mat4x4<f32>', 
                  value: [
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    0, 0, 0, 1
                  ]
                }}
              }}
            }}
          }});
          
          // 创建透视投影矩阵
          const createPerspectiveMatrix = (fov, aspect, near, far) => {{
            const f = 1.0 / Math.tan(fov / 2);
            const nf = 1 / (near - far);
            
            return [
              f / aspect, 0, 0, 0,
              0, f, 0, 0,
              0, 0, (far + near) * nf, -1,
              0, 0, 2 * far * near * nf, 0
            ];
          }};
          
          // 设置投影矩阵
          const updateProjectionMatrix = () => {{
            const aspect = app.renderer.width / app.renderer.height;
            const projMatrix = createPerspectiveMatrix(Math.PI / 4, aspect, 0.1, 100.0);
            shader.resources.uniforms.uniforms.uProjectionMatrix = projMatrix;
          }};
          
          updateProjectionMatrix();
          
          // 创建网格并添加到舞台
          const meshes = [];
          for (const geometry of geometries) {{
            const mesh = new Mesh({{ geometry, shader }});
            app.stage.addChild(mesh);
            meshes.push(mesh);
          }}
          
          // 添加窗口大小变化事件
          window.addEventListener('resize', () => {{
            app.renderer.resize(window.innerWidth, window.innerHeight);
            updateProjectionMatrix();
          }});
          
          // 相机控制
          class OrbitControls {{
            constructor(element) {{
              this.element = element;
              this.rotationX = 0;
              this.rotationY = 0;
              this.distance = 5;
              this.targetX = 0;
              this.targetY = 0;
              this.targetZ = 0;
              this.damping = 0.1; // 阻尼系数
              
              // 当前状态
              this.isDragging = false;
              this.isRotating = false;
              this.isPanning = false;
              this.previousMouseX = 0;
              this.previousMouseY = 0;
              this.rotationSpeed = 0.01;
              this.panSpeed = 0.01;
              this.zoomSpeed = 0.1;
              
              // 自动旋转
              this.autoRotate = false;
              this.autoRotateSpeed = 0.005;
              
              // 绑定事件
              this.bindEvents();
            }}
            
            bindEvents() {{
              // 鼠标按下事件
              this.element.addEventListener('mousedown', (e) => {{
                if (e.button === 0) {{ // 左键
                  this.isRotating = true;
                }} else if (e.button === 1) {{ // 中键
                  this.isPanning = true;
                  e.preventDefault(); // 阻止默认的中键滚动行为
                }}
                
                this.previousMouseX = e.clientX;
                this.previousMouseY = e.clientY;
              }});
              
              // 鼠标抬起事件
              window.addEventListener('mouseup', (e) => {{
                this.isRotating = false;
                this.isPanning = false;
              }});
              
              // 鼠标移动事件
              window.addEventListener('mousemove', (e) => {{
                if (this.isRotating) {{
                  const deltaX = e.clientX - this.previousMouseX;
                  const deltaY = e.clientY - this.previousMouseY;
                  
                  this.rotationY += deltaX * this.rotationSpeed;
                  this.rotationX += deltaY * this.rotationSpeed;
                  
                  // 限制垂直旋转角度
                  this.rotationX = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, this.rotationX));
                }} else if (this.isPanning) {{
                  const deltaX = e.clientX - this.previousMouseX;
                  const deltaY = e.clientY - this.previousMouseY;
                  
                  // 计算平移方向
                  const forward = [
                    Math.sin(this.rotationY) * Math.cos(this.rotationX),
                    -Math.sin(this.rotationX),
                    Math.cos(this.rotationY) * Math.cos(this.rotationX)
                  ];
                  
                  const right = [
                    Math.cos(this.rotationY),
                    0,
                    -Math.sin(this.rotationY)
                  ];
                  
                  const up = [
                    Math.sin(this.rotationY) * Math.sin(this.rotationX),
                    Math.cos(this.rotationX),
                    Math.cos(this.rotationY) * Math.sin(this.rotationX)
                  ];
                  
                  // 应用平移
                  this.targetX -= (right[0] * deltaX + up[0] * deltaY) * this.panSpeed;
                  this.targetY -= (right[1] * deltaX + up[1] * deltaY) * this.panSpeed;
                  this.targetZ -= (right[2] * deltaX + up[2] * deltaY) * this.panSpeed;
                }}
                
                this.previousMouseX = e.clientX;
                this.previousMouseY = e.clientY;
              }});
              
              // 滚轮事件
              this.element.addEventListener('wheel', (e) => {{
                this.distance += e.deltaY * this.zoomSpeed * 0.01;
                this.distance = Math.max(1, Math.min(20, this.distance));
                e.preventDefault();
              }});
              
              // 双击事件 - 重置视图
              this.element.addEventListener('dblclick', () => {{
                this.reset();
              }});
              
              // 触摸事件支持
              this.element.addEventListener('touchstart', (e) => {{
                if (e.touches.length === 1) {{
                  this.isRotating = true;
                }} else if (e.touches.length === 2) {{
                  this.isPanning = true;
                  // 存储初始触摸点距离，用于缩放
                  const dx = e.touches[0].clientX - e.touches[1].clientX;
                  const dy = e.touches[0].clientY - e.touches[1].clientY;
                  this.initialPinchDistance = Math.sqrt(dx * dx + dy * dy);
                }}
                
                this.previousMouseX = e.touches[0].clientX;
                this.previousMouseY = e.touches[0].clientY;
                e.preventDefault();
              }});
              
              this.element.addEventListener('touchmove', (e) => {{
                if (this.isRotating && e.touches.length === 1) {{
                  const deltaX = e.touches[0].clientX - this.previousMouseX;
                  const deltaY = e.touches[0].clientY - this.previousMouseY;
                  
                  this.rotationY += deltaX * this.rotationSpeed;
                  this.rotationX += deltaY * this.rotationSpeed;
                  
                  // 限制垂直旋转角度
                  this.rotationX = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, this.rotationX));
                  
                  this.previousMouseX = e.touches[0].clientX;
                  this.previousMouseY = e.touches[0].clientY;
                }} else if (e.touches.length === 2) {{
                  // 处理平移
                  const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
                  const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
                  
                  const deltaX = centerX - this.previousMouseX;
                  const deltaY = centerY - this.previousMouseY;
                  
                  // 计算平移方向
                  const forward = [
                    Math.sin(this.rotationY) * Math.cos(this.rotationX),
                    -Math.sin(this.rotationX),
                    Math.cos(this.rotationY) * Math.cos(this.rotationX)
                  ];
                  
                  const right = [
                    Math.cos(this.rotationY),
                    0,
                    -Math.sin(this.rotationY)
                  ];
                  
                  const up = [
                    Math.sin(this.rotationY) * Math.sin(this.rotationX),
                    Math.cos(this.rotationX),
                    Math.cos(this.rotationY) * Math.sin(this.rotationX)
                  ];
                  
                  // 应用平移
                  this.targetX -= (right[0] * deltaX + up[0] * deltaY) * this.panSpeed;
                  this.targetY -= (right[1] * deltaX + up[1] * deltaY) * this.panSpeed;
                  this.targetZ -= (right[2] * deltaX + up[2] * deltaY) * this.panSpeed;
                  
                  // 处理缩放
                  const dx = e.touches[0].clientX - e.touches[1].clientX;
                  const dy = e.touches[0].clientY - e.touches[1].clientY;
                  const distance = Math.sqrt(dx * dx + dy * dy);
                  
                  if (this.initialPinchDistance) {{
                    const scale = distance / this.initialPinchDistance;
                    this.distance /= scale;
                    this.distance = Math.max(1, Math.min(20, this.distance));
                    this.initialPinchDistance = distance;
                  }}
                  
                  this.previousMouseX = centerX;
                  this.previousMouseY = centerY;
                }}
                
                e.preventDefault();
              }});
              
              this.element.addEventListener('touchend', () => {{
                this.isRotating = false;
                this.isPanning = false;
                this.initialPinchDistance = null;
              }});
            }}
            
            reset() {{
              this.rotationX = 0;
              this.rotationY = 0;
              this.distance = 5;
              this.targetX = 0;
              this.targetY = 0;
              this.targetZ = 0;
            }}
            
            update() {{
              if (this.autoRotate && !this.isRotating && !this.isPanning) {{
                this.rotationY += this.autoRotateSpeed;
              }}
              
              // 计算视图矩阵
              const cx = Math.cos(this.rotationX);
              const sx = Math.sin(this.rotationX);
              const cy = Math.cos(this.rotationY);
              const sy = Math.sin(this.rotationY);
              
              // 计算相机位置
              const cameraX = this.distance * sy * cx + this.targetX;
              const cameraY = this.distance * sx + this.targetY;
              const cameraZ = this.distance * cy * cx + this.targetZ;
              
              // 计算视图矩阵
              const forward = [
                this.targetX - cameraX,
                this.targetY - cameraY,
                this.targetZ - cameraZ
              ];
              
              // 归一化
              const forwardLength = Math.sqrt(
                forward[0] * forward[0] + 
                forward[1] * forward[1] + 
                forward[2] * forward[2]
              );
              
              forward[0] /= forwardLength;
              forward[1] /= forwardLength;
              forward[2] /= forwardLength;
              
              // 计算右向量
              const right = [
                Math.cos(this.rotationY),
                0,
                -Math.sin(this.rotationY)
              ];
              
              // 计算上向量
              const up = [
                forward[1] * right[2] - forward[2] * right[1],
                forward[2] * right[0] - forward[0] * right[2],
                forward[0] * right[1] - forward[1] * right[0]
              ];
              
              // 构建视图矩阵
              const viewMatrix = [
                right[0], up[0], -forward[0], 0,
                right[1], up[1], -forward[1], 0,
                right[2], up[2], -forward[2], 0,
                -(right[0] * cameraX + right[1] * cameraY + right[2] * cameraZ),
                -(up[0] * cameraX + up[1] * cameraY + up[2] * cameraZ),
                forward[0] * cameraX + forward[1] * cameraY + forward[2] * cameraZ,
                1
              ];
              
              return viewMatrix;
            }}
          }}
          
          // 创建轨道控制器
          const controls = new OrbitControls(app.view);
          
          // 添加键盘控制
          window.addEventListener('keydown', (e) => {{
            const key = e.key.toLowerCase();
            
            // 按R键重置视图
            if (key === 'r') {{
              controls.reset();
            }}
            
            // 按空格键切换自动旋转
            if (e.code === 'Space') {{
              controls.autoRotate = !controls.autoRotate;
              e.preventDefault();
            }}
          }});
          
          let time = 0;
          // 添加动画
          app.ticker.add(() => {{
            time += 1 / 60;
            
            // 更新时间uniform
            shader.resources.uniforms.uniforms.uTime = time;
            
            // 更新视图矩阵
            shader.resources.uniforms.uniforms.uViewMatrix = controls.update();
            
            // 更新模型矩阵
            const modelMatrix = [
              1, 0, 0, 0,
              0, 1, 0, 0,
              0, 0, 1, 0,
              0, 0, 0, 1
            ];
            
            shader.resources.uniforms.uniforms.uModelMatrix = modelMatrix;
          }});
          
          console.log('3D 模型渲染已成功初始化');
        }} catch (error) {{
          console.error('初始化错误:', error);
          document.body.innerHTML = `<div style="color: red; padding: 20px;">
            <h2>渲染错误</h2>
            <pre>${{error.toString()}}</pre>
          </div>`;
        }}
      }})();
    </script>
    <style>
      body {{
        margin: 0;
        overflow: hidden;
        background-color: #1a1a1a;
      }}
      canvas {{
        display: block;
      }}
      .info {{
        position: absolute;
        bottom: 10px;
        left: 10px;
        color: white;
        font-family: Arial, sans-serif;
        background-color: rgba(0, 0, 0, 0.5);
        padding: 5px 10px;
        border-radius: 5px;
      }}
    </style>
  </head>
  <body>
    <div class="info">
      左键拖动: 旋转模型 | 中键拖动: 平移视图 | 滚轮: 缩放 | 双击: 重置视图 | 空格: 自动旋转
    </div>
  </body>
</html>
"""
    
    # 写入HTML文件
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"已成功将 {gltf_path} 转换为 {output_path}")

# 使用命令行参数
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='将GLTF模型转换为HTML网页进行渲染')
    parser.add_argument('input', help='输入的GLTF文件路径')
    parser.add_argument('-o', '--output', help='输出的HTML文件路径')
    
    args = parser.parse_args()
    
    gltf_path = args.input
    output_path = args.output if args.output else os.path.splitext(gltf_path)[0] + '.html'
    
    create_html_from_gltf(gltf_path, output_path)