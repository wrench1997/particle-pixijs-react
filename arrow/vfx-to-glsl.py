import json
import os
import argparse
import base64
import re
from typing import Dict, List, Any, Optional, Union

class VFXToGLSLConverter:
    """将VFX粒子效果转换为GLSL着色器代码的转换器"""
    
    def __init__(self):
        self.uniforms = {
            "u_time": {"type": "float", "default": 0.0},
            "u_resolution": {"type": "vec2", "default": [800.0, 600.0]},
            "u_mouse": {"type": "vec2", "default": [0.0, 0.0]},
            "u_color": {"type": "vec3", "default": [1.0, 1.0, 1.0]}
        }
        
        # 粒子属性映射到GLSL变量
        self.property_map = {
            "position": "v_position",
            "velocity": "v_velocity",
            "color": "v_color",
            "size": "v_size",
            "rotation": "v_rotation",
            "lifetime": "v_lifetime",
            "age": "v_age"
        }
    
    def parse_vfx_file(self, file_path: str) -> Dict[str, Any]:
        """解析VFX文件并提取粒子系统配置"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                if file_path.endswith('.json'):
                    return json.load(f)
                else:
                    # 尝试从JavaScript/TypeScript文件中提取JSON配置
                    content = f.read()
                    # 查找配置对象
                    json_match = re.search(r'const\s+\w+\s*=\s*({[\s\S]*?});', content)
                    if json_match:
                        json_str = json_match.group(1)
                        # 将JavaScript对象转换为有效的JSON
                        json_str = re.sub(r'(\w+):', r'"\1":', json_str)
                        json_str = re.sub(r',\s*}', '}', json_str)
                        try:
                            return json.loads(json_str)
                        except json.JSONDecodeError:
                            print(f"警告: 无法解析提取的JSON，将使用简单解析")
                    
                    # 如果无法提取JSON，尝试简单解析
                    config = {}
                    # 提取生命周期
                    lifetime_match = re.search(r'lifetime\s*:\s*{\s*min\s*:\s*(\d+\.?\d*),\s*max\s*:\s*(\d+\.?\d*)', content)
                    if lifetime_match:
                        config["lifetime"] = {
                            "min": float(lifetime_match.group(1)),
                            "max": float(lifetime_match.group(2))
                        }
                    
                    # 提取颜色
                    color_matches = re.findall(r'value\s*:\s*["\']([0-9a-fA-F]{6})["\']', content)
                    if color_matches:
                        config["colors"] = color_matches
                    
                    return config
        except Exception as e:
            print(f"解析VFX文件时出错: {e}")
            return {}
    
    def extract_behaviors(self, config: Dict[str, Any]) -> List[Dict[str, Any]]:
        """从配置中提取行为列表"""
        if "behaviors" in config:
            return config["behaviors"]
        return []
    
    def generate_vertex_shader(self, config: Dict[str, Any]) -> str:
        """生成顶点着色器代码"""
        vertex_shader = """
        precision highp float;
        
        attribute vec2 aPosition;
        attribute vec2 aUV;
        attribute float aSize;
        attribute float aRotation;
        attribute vec4 aColor;
        attribute float aAge;
        attribute float aLifetime;
        
        uniform mat4 uProjectionMatrix;
        uniform float u_time;
        uniform vec2 u_resolution;
        
        varying vec2 vUV;
        varying vec4 vColor;
        varying float vAge;
        varying float vLifetime;
        
        void main() {
            // 计算粒子的生命周期进度
            float progress = aAge / aLifetime;
            
            // 应用大小和旋转
            float s = sin(aRotation);
            float c = cos(aRotation);
            vec2 rotatedPosition = vec2(
                aPosition.x * c - aPosition.y * s,
                aPosition.x * s + aPosition.y * c
            ) * aSize;
            
            // 设置最终位置
            gl_Position = uProjectionMatrix * vec4(rotatedPosition, 0.0, 1.0);
            
            // 传递变量到片段着色器
            vUV = aUV;
            vColor = aColor;
            vAge = aAge;
            vLifetime = aLifetime;
        }
        """
        
        # 根据配置自定义顶点着色器
        behaviors = self.extract_behaviors(config)
        for behavior in behaviors:
            if behavior["type"] == "moveSpeed" or behavior["type"] == "moveSpeedStatic":
                # 添加速度相关代码
                vertex_shader = vertex_shader.replace(
                    "// 设置最终位置",
                    """
                    // 应用速度
                    vec2 velocity = vec2(cos(aRotation), sin(aRotation)) * aSize;
                    rotatedPosition += velocity * progress;
                    
                    // 设置最终位置
                    """
                )
        
        return vertex_shader
    
    def generate_fragment_shader(self, config: Dict[str, Any]) -> str:
        """生成片段着色器代码"""
        # 基础片段着色器
        fragment_shader = """
        precision highp float;
        
        varying vec2 vUV;
        varying vec4 vColor;
        varying float vAge;
        varying float vLifetime;
        
        uniform sampler2D uTexture;
        uniform float u_time;
        
        void main() {
            // 计算生命周期进度
            float progress = vAge / vLifetime;
            
            // 基本纹理颜色
            vec4 texColor = texture2D(uTexture, vUV);
            
            // 应用粒子颜色
            vec4 finalColor = texColor * vColor;
            
            // 应用透明度衰减
            finalColor.a *= (1.0 - progress);
            
            gl_FragColor = finalColor;
        }
        """
        
        # 根据配置自定义片段着色器
        behaviors = self.extract_behaviors(config)
        
        # 处理颜色行为
        color_behavior = next((b for b in behaviors if b["type"] == "color"), None)
        if color_behavior:
            color_list = color_behavior.get("config", {}).get("color", {}).get("list", [])
            if color_list:
                # 生成颜色插值代码
                color_interp_code = "    // 颜色插值\n"
                color_interp_code += "    vec3 particleColor = "
                
                if len(color_list) == 1:
                    # 单一颜色
                    color = color_list[0]["value"]
                    r = int(color[0:2], 16) / 255.0
                    g = int(color[2:4], 16) / 255.0
                    b = int(color[4:6], 16) / 255.0
                    color_interp_code += f"vec3({r}, {g}, {b});\n"
                else:
                    # 多颜色插值
                    color_interp_code += "mix(\n"
                    for i, color_item in enumerate(color_list):
                        if i < len(color_list) - 1:
                            color1 = color_item["value"]
                            color2 = color_list[i+1]["value"]
                            time1 = color_item["time"]
                            time2 = color_list[i+1]["time"]
                            
                            r1 = int(color1[0:2], 16) / 255.0
                            g1 = int(color1[2:4], 16) / 255.0
                            b1 = int(color1[4:6], 16) / 255.0
                            
                            r2 = int(color2[0:2], 16) / 255.0
                            g2 = int(color2[2:4], 16) / 255.0
                            b2 = int(color2[4:6], 16) / 255.0
                            
                            color_interp_code += f"        vec3({r1}, {g1}, {b1}),\n"
                            color_interp_code += f"        vec3({r2}, {g2}, {b2}),\n"
                            color_interp_code += f"        smoothstep({time1}, {time2}, progress)\n"
                            break
                    
                    color_interp_code += "    );\n"
                
                # 替换颜色应用代码
                fragment_shader = fragment_shader.replace(
                    "// 应用粒子颜色",
                    color_interp_code + "\n    // 应用粒子颜色\n    finalColor = texColor * vec4(particleColor, vColor.a);"
                )
        
        # 处理alpha行为
        alpha_behavior = next((b for b in behaviors if b["type"] == "alpha"), None)
        if alpha_behavior:
            alpha_list = alpha_behavior.get("config", {}).get("alpha", {}).get("list", [])
            if alpha_list:
                # 生成alpha插值代码
                alpha_interp_code = "    // Alpha插值\n"
                alpha_interp_code += "    float particleAlpha = "
                
                if len(alpha_list) == 1:
                    # 单一alpha值
                    alpha_interp_code += f"{alpha_list[0]['value']};\n"
                else:
                    # 多alpha插值
                    alpha_interp_code += "mix(\n"
                    for i, alpha_item in enumerate(alpha_list):
                        if i < len(alpha_list) - 1:
                            alpha1 = alpha_item["value"]
                            alpha2 = alpha_list[i+1]["value"]
                            time1 = alpha_item["time"]
                            time2 = alpha_list[i+1]["time"]
                            
                            alpha_interp_code += f"        {alpha1},\n"
                            alpha_interp_code += f"        {alpha2},\n"
                            alpha_interp_code += f"        smoothstep({time1}, {time2}, progress)\n"
                            break
                    
                    alpha_interp_code += "    );\n"
                
                # 替换透明度应用代码
                fragment_shader = fragment_shader.replace(
                    "// 应用透明度衰减",
                    alpha_interp_code + "\n    // 应用透明度衰减\n    finalColor.a *= particleAlpha;"
                )
        
        # 处理特殊效果
        for behavior in behaviors:
            if behavior["type"] == "glslArrow":
                # 添加箭头特效代码
                arrow_effect = self.generate_arrow_effect()
                fragment_shader = fragment_shader.replace(
                    "void main() {",
                    arrow_effect + "\n\nvoid main() {"
                )
                
                fragment_shader = fragment_shader.replace(
                    "// 基本纹理颜色",
                    """
                    // 计算箭头SDF
                    vec2 uv = vUV * 2.0 - 1.0;
                    float arrowDist = arrowSDF(vec3(uv.x, uv.y, 0.0));
                    
                    // 基本纹理颜色
                    """
                )
                
                fragment_shader = fragment_shader.replace(
                    "gl_FragColor = finalColor;",
                    """
                    // 应用箭头效果
                    if (arrowDist < 0.0) {
                        gl_FragColor = finalColor;
                    } else {
                        discard;
                    }
                    """
                )
        
        return fragment_shader
    
    def generate_arrow_effect(self) -> str:
        """生成箭头特效的GLSL代码"""
        return """
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
        
        // 卡通箭矢 SDF
        float arrowSDF(vec3 p) {
            // 旋转点以创建动画效果
            p = applyRotation(p, u_time * 0.5);
            
            // 箭杆
            vec3 shaftCenter = vec3(0.0, 0.0, 0.0);
            vec3 shaftSize = vec3(0.05, 0.05, 0.6);
            float shaft = distToBox(p, shaftCenter, shaftSize);
            
            // 箭头
            vec3 tipCenter = vec3(0.0, 0.0, -0.35);
            vec3 tipSize = vec3(0.15, 0.15, 0.15);
            float tip = distToBox(p, tipCenter, tipSize);
            
            // 羽毛部分
            vec3 feather1Center = vec3(-0.08, 0.0, 0.3);
            vec3 feather1Size = vec3(0.08, 0.02, 0.15);
            float feather1 = distToBox(p, feather1Center, feather1Size);
            
            vec3 feather2Center = vec3(0.08, 0.0, 0.3);
            vec3 feather2Size = vec3(0.08, 0.02, 0.15);
            float feather2 = distToBox(p, feather2Center, feather2Size);
            
            // 组合结果
            float arrowShape = min(min(shaft, tip), min(feather1, feather2));
        
            return arrowShape - 0.01;
        }
        """
    
    def generate_glsl_code(self, config: Dict[str, Any]) -> Dict[str, str]:
        """生成完整的GLSL代码"""
        vertex_shader = self.generate_vertex_shader(config)
        fragment_shader = self.generate_fragment_shader(config)
        
        return {
            "vertex": vertex_shader,
            "fragment": fragment_shader
        }
    
    def create_html_preview(self, glsl_code: Dict[str, str], output_path: str, config: Dict[str, Any]) -> None:
        """创建HTML预览文件"""
        html_content = f"""<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VFX GLSL 预览</title>
    <style>
        body {{
            margin: 0;
            overflow: hidden;
            background-color: #000;
        }}
        canvas {{
            display: block;
            width: 100vw;
            height: 100vh;
        }}
        .controls {{
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.7);
            padding: 10px;
            border-radius: 5px;
            color: white;
            font-family: Arial, sans-serif;
        }}
        .controls button {{
            background: #333;
            color: white;
            border: none;
            padding: 5px 10px;
            margin: 5px;
            border-radius: 3px;
            cursor: pointer;
        }}
        .controls button:hover {{
            background: #555;
        }}
    </style>
</head>
<body>
    <canvas id="glCanvas"></canvas>
    <div class="controls">
        <button id="playPause">暂停</button>
        <button id="reset">重置</button>
    </div>

    <script>
        // 获取WebGL上下文
        const canvas = document.getElementById('glCanvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const gl = canvas.getContext('webgl');
        
        if (!gl) {{
            alert('无法初始化WebGL，您的浏览器可能不支持它。');
        }}
        
        // 顶点着色器代码
        const vertexShaderSource = `{glsl_code["vertex"]}`;
        
        // 片段着色器代码
        const fragmentShaderSource = `{glsl_code["fragment"]}`;
        
        // 编译着色器
        function compileShader(gl, source, type) {{
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {{
                console.error('着色器编译错误:', gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }}
            
            return shader;
        }}
        
        // 创建着色器程序
        function createShaderProgram(gl, vertexShaderSource, fragmentShaderSource) {{
            const vertexShader = compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
            const fragmentShader = compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);
            
            const program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);
            
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {{
                console.error('程序链接错误:', gl.getProgramInfoLog(program));
                return null;
            }}
            
            return program;
        }}
        
        // 创建粒子系统
        function createParticleSystem(gl, program, particleCount) {{
            // 创建顶点数据
            const vertices = [];
            const uvs = [];
            const sizes = [];
            const rotations = [];
            const colors = [];
            const ages = [];
            const lifetimes = [];
            
            // 生成随机粒子数据
            for (let i = 0; i < particleCount; i++) {{
                // 位置 (-1 到 1)
                vertices.push(Math.random() * 2 - 1);
                vertices.push(Math.random() * 2 - 1);
                
                // UV坐标
                uvs.push(0, 0);
                uvs.push(1, 0);
                uvs.push(1, 1);
                uvs.push(0, 1);
                
                // 大小 (0.01 到 0.1)
                const size = Math.random() * 0.09 + 0.01;
                sizes.push(size);
                
                // 旋转 (0 到 2π)
                rotations.push(Math.random() * Math.PI * 2);
                
                // 颜色 (RGBA)
                colors.push(Math.random(), Math.random(), Math.random(), 1.0);
                
                // 年龄 (0 到 lifetime)
                const lifetime = Math.random() * 2 + 1; // 1到3秒
                ages.push(Math.random() * lifetime);
                lifetimes.push(lifetime);
            }}
            
            // 创建缓冲区
            const vertexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
            
            const uvBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvs), gl.STATIC_DRAW);
            
            const sizeBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, sizeBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sizes), gl.STATIC_DRAW);
            
            const rotationBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, rotationBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(rotations), gl.STATIC_DRAW);
            
            const colorBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
            
            const ageBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, ageBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ages), gl.STATIC_DRAW);
            
            const lifetimeBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, lifetimeBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lifetimes), gl.STATIC_DRAW);
            
            return {{
                count: particleCount,
                vertexBuffer,
                uvBuffer,
                sizeBuffer,
                rotationBuffer,
                colorBuffer,
                ageBuffer,
                lifetimeBuffer,
                vertices,
                uvs,
                sizes,
                rotations,
                colors,
                ages,
                lifetimes
            }};
        }}
        
        // 更新粒子系统
        function updateParticleSystem(gl, particleSystem, deltaTime) {{
            // 更新粒子年龄
            for (let i = 0; i < particleSystem.count; i++) {{
                particleSystem.ages[i] += deltaTime;
                
                // 如果粒子寿命结束，重置它
                if (particleSystem.ages[i] > particleSystem.lifetimes[i]) {{
                    particleSystem.ages[i] = 0;
                    
                    // 重置位置
                    particleSystem.vertices[i * 2] = Math.random() * 2 - 1;
                    particleSystem.vertices[i * 2 + 1] = Math.random() * 2 - 1;
                    
                    // 重置大小
                    particleSystem.sizes[i] = Math.random() * 0.09 + 0.01;
                    
                    // 重置旋转
                    particleSystem.rotations[i] = Math.random() * Math.PI * 2;
                }}
            }}
            
            // 更新缓冲区
            gl.bindBuffer(gl.ARRAY_BUFFER, particleSystem.vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(particleSystem.vertices), gl.STATIC_DRAW);
            
            gl.bindBuffer(gl.ARRAY_BUFFER, particleSystem.ageBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(particleSystem.ages), gl.STATIC_DRAW);
        }}
        
        // 渲染粒子系统
        function renderParticleSystem(gl, program, particleSystem) {{
            // 设置顶点属性
            const positionAttrib = gl.getAttribLocation(program, 'aPosition');
            gl.bindBuffer(gl.ARRAY_BUFFER, particleSystem.vertexBuffer);
            gl.enableVertexAttribArray(positionAttrib);
            gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);
            
            const uvAttrib = gl.getAttribLocation(program, 'aUV');
            gl.bindBuffer(gl.ARRAY_BUFFER, particleSystem.uvBuffer);
            gl.enableVertexAttribArray(uvAttrib);
            gl.vertexAttribPointer(uvAttrib, 2, gl.FLOAT, false, 0, 0);
            
            const sizeAttrib = gl.getAttribLocation(program, 'aSize');
            gl.bindBuffer(gl.ARRAY_BUFFER, particleSystem.sizeBuffer);
            gl.enableVertexAttribArray(sizeAttrib);
            gl.vertexAttribPointer(sizeAttrib, 1, gl.FLOAT, false, 0, 0);
            
            const rotationAttrib = gl.getAttribLocation(program, 'aRotation');
            gl.bindBuffer(gl.ARRAY_BUFFER, particleSystem.rotationBuffer);
            gl.enableVertexAttribArray(rotationAttrib);
            gl.vertexAttribPointer(rotationAttrib, 1, gl.FLOAT, false, 0, 0);
            
            const colorAttrib = gl.getAttribLocation(program, 'aColor');
            gl.bindBuffer(gl.ARRAY_BUFFER, particleSystem.colorBuffer);
            gl.enableVertexAttribArray(colorAttrib);
            gl.vertexAttribPointer(colorAttrib, 4, gl.FLOAT, false, 0, 0);
            
            const ageAttrib = gl.getAttribLocation(program, 'aAge');
            gl.bindBuffer(gl.ARRAY_BUFFER, particleSystem.ageBuffer);
            gl.enableVertexAttribArray(ageAttrib);
            gl.vertexAttribPointer(ageAttrib, 1, gl.FLOAT, false, 0, 0);
            
            const lifetimeAttrib = gl.getAttribLocation(program, 'aLifetime');
            gl.bindBuffer(gl.ARRAY_BUFFER, particleSystem.lifetimeBuffer);
            gl.enableVertexAttribArray(lifetimeAttrib);
            gl.vertexAttribPointer(lifetimeAttrib, 1, gl.FLOAT, false, 0, 0);
            
            // 绘制粒子
            gl.drawArrays(gl.POINTS, 0, particleSystem.count);
        }}
        
        // 主程序
        function main() {{
            // 创建着色器程序
            const program = createShaderProgram(gl, vertexShaderSource, fragmentShaderSource);
            if (!program) {{
                return;
            }}
            
            // 创建粒子系统
            const particleSystem = createParticleSystem(gl, program, 1000);
            
            // 设置WebGL状态
            gl.useProgram(program);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
            
            // 创建投影矩阵
            const projectionMatrix = [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1
            ];
            
            // 获取uniform位置
            const projectionMatrixUniform = gl.getUniformLocation(program, 'uProjectionMatrix');
            const timeUniform = gl.getUniformLocation(program, 'u_time');
            const resolutionUniform = gl.getUniformLocation(program, 'u_resolution');
            
            // 设置分辨率uniform
            gl.uniform2f(resolutionUniform, canvas.width, canvas.height);
            
            // 设置投影矩阵
            gl.uniformMatrix4fv(projectionMatrixUniform, false, projectionMatrix);
            
            // 动画变量
            let time = 0;
            let lastTime = 0;
            let isPlaying = true;
            
            // 动画循环
            function animate(currentTime) {{
                if (!isPlaying) {{
                    requestAnimationFrame(animate);
                    return;
                }}
                
                // 计算时间增量
                const deltaTime = (currentTime - lastTime) / 1000; // 转换为秒
                lastTime = currentTime;
                
                // 更新时间
                time += deltaTime;
                
                // 清除画布
                gl.clearColor(0.0, 0.0, 0.0, 1.0);
                gl.clear(gl.COLOR_BUFFER_BIT);
                
                // 设置时间uniform
                gl.uniform1f(timeUniform, time);
                
                // 更新和渲染粒子系统
                updateParticleSystem(gl, particleSystem, deltaTime);
                renderParticleSystem(gl, program, particleSystem);
                
                // 请求下一帧
                requestAnimationFrame(animate);
            }}
            
            // 开始动画
            requestAnimationFrame(animate);
            
            // 控制按钮
            const playPauseButton = document.getElementById('playPause');
            playPauseButton.addEventListener('click', () => {{
                isPlaying = !isPlaying;
                playPauseButton.textContent = isPlaying ? '暂停' : '播放';
                if (isPlaying) {{
                    lastTime = performance.now();
                    requestAnimationFrame(animate);
                }}
            }});
            
            const resetButton = document.getElementById('reset');
            resetButton.addEventListener('click', () => {{
                time = 0;
                
                // 重置所有粒子
                for (let i = 0; i < particleSystem.count; i++) {{
                    particleSystem.ages[i] = 0;
                    particleSystem.vertices[i * 2] = Math.random() * 2 - 1;
                    particleSystem.vertices[i * 2 + 1] = Math.random() * 2 - 1;
                    particleSystem.sizes[i] = Math.random() * 0.09 + 0.01;
                    particleSystem.rotations[i] = Math.random() * Math.PI * 2;
                }}
                
                // 更新缓冲区
                gl.bindBuffer(gl.ARRAY_BUFFER, particleSystem.vertexBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(particleSystem.vertices), gl.STATIC_DRAW);
                
                gl.bindBuffer(gl.ARRAY_BUFFER, particleSystem.ageBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(particleSystem.ages), gl.STATIC_DRAW);
            }});
            
            // 窗口大小调整
            window.addEventListener('resize', () => {{
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                gl.viewport(0, 0, canvas.width, canvas.height);
                gl.uniform2f(resolutionUniform, canvas.width, canvas.height);
            }});
        }}
        
        // 启动程序
        main();
    </script>
</body>
</html>
"""
        
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(html_content)
        
        print(f"已成功创建HTML预览文件: {output_path}")
    
    def save_glsl_files(self, glsl_code: Dict[str, str], output_dir: str, base_name: str) -> None:
        """保存GLSL代码到单独的文件"""
        os.makedirs(output_dir, exist_ok=True)
        
        # 保存顶点着色器
        vertex_path = os.path.join(output_dir, f"{base_name}.vert")
        with open(vertex_path, 'w', encoding='utf-8') as f:
            f.write(glsl_code["vertex"])
        
        # 保存片段着色器
        fragment_path = os.path.join(output_dir, f"{base_name}.frag")
        with open(fragment_path, 'w', encoding='utf-8') as f:
            f.write(glsl_code["fragment"])
        
        print(f"已保存GLSL文件:\n- {vertex_path}\n- {fragment_path}")
    
    def convert(self, input_path: str, output_html: str = None, output_dir: str = None) -> None:
        """转换VFX文件到GLSL"""
        # 解析VFX文件
        config = self.parse_vfx_file(input_path)
        if not config:
            print(f"错误: 无法解析VFX文件 {input_path}")
            return
        
        # 生成GLSL代码
        glsl_code = self.generate_glsl_code(config)
        
        # 确定输出路径
        base_name = os.path.splitext(os.path.basename(input_path))[0]
        
        # 创建HTML预览
        if output_html is None:
            output_html = os.path.join(os.path.dirname(input_path), f"{base_name}_preview.html")
        self.create_html_preview(glsl_code, output_html, config)
        
        # 保存GLSL文件
        if output_dir is not None:
            self.save_glsl_files(glsl_code, output_dir, base_name)


def main():
    parser = argparse.ArgumentParser(description='将VFX粒子效果转换为GLSL着色器代码')
    parser.add_argument('input', help='输入的VFX文件路径')
    parser.add_argument('-o', '--output', help='输出的HTML预览文件路径')
    parser.add_argument('-d', '--dir', help='输出GLSL文件的目录')
    
    args = parser.parse_args()
    
    converter = VFXToGLSLConverter()
    converter.convert(args.input, args.output, args.dir)


if __name__ == "__main__":
    main()