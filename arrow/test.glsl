precision mediump float;

uniform vec2 u_resolution;  // 画布分辨率
uniform float u_time;       // 时间（用于动画）

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

// 卡通箭矢 SDF (Signed Distance Function) - 修改箭头为更真实的三角形
float arrowSDF(vec3 p) {
    // 箭杆 - 使用细长的盒子（不变）
    vec3 shaftCenter = vec3(0.0, 0.0, -0.15);
    vec3 shaftSize = vec3(0.05, 0.05, 0.6);
    float shaft = distToBox(p, shaftCenter, shaftSize);
    
    // 箭头 - 改为三角形箭镞（使用两个三角形模拟正面和背面）
    // 三角形顶点：尖端在z=0.3，底边在z=0.1
    vec3 tip = vec3(0.0, 0.0, 0.3);  // 尖端
    vec3 base1 = vec3(0.1, 0.0, 0.1);  // 底边点1
    vec3 base2 = vec3(-0.1, 0.0, 0.1); // 底边点2
    vec3 base3 = vec3(0.0, 0.1, 0.1);  // 添加一个点以模拟厚度（可选侧面）
    
    float head1 = distToTriangle(p, tip, base1, base2);  // 主三角面
    float head2 = distToTriangle(p, tip, base2, base3);  // 侧面三角（增加真实感）
    float head3 = distToTriangle(p, tip, base3, base1);  // 另一侧面
    float head = min(min(head1, head2), head3) - 0.005;  // 轻微膨胀以平滑
    
    // 羽毛部分 - 保留原始盒子作为卡通尾翼（不变）
    vec3 feather1Center = vec3(-0.08, 0.0, -0.4);
    vec3 feather1Size = vec3(0.08, 0.02, 0.15);
    float feather1 = distToBox(p, feather1Center, feather1Size);
    
    vec3 feather2Center = vec3(0.08, 0.0, -0.4);
    vec3 feather2Size = vec3(0.08, 0.02, 0.15);
    float feather2 = distToBox(p, feather2Center, feather2Size);
    
    // 组合结果
    float arrowShape = min(min(shaft, head), min(feather1, feather2));

    // 稍微膨胀使连接更平滑
    return arrowShape - 0.01;
}

void main() {
    // 标准化坐标，使中心为(0,0)，范围为[-1,1]
    vec2 uv = (gl_FragCoord.xy / u_resolution.xy) * 2.0 - 1.0;
    uv.x *= u_resolution.x / u_resolution.y;  // 修正宽高比

    // 相机设置（不变）
    vec3 ro = vec3(3.0, 1.0, 1.0);  // 相机位置调整为更远且略微提高高度
    vec3 rd = normalize(vec3(-1.0, -0.3, -0.3) + vec3(uv.x, uv.y, 0.0));  // 射线方向调整为指向箭矢
    
    // 2D旋转动画 - 只在XY平面上旋转
    float angle = u_time * 0.7; // 旋转角度
    
    // 光线追踪（不变）
    float t = 0.0;
    float tMax = 5.0;
    float d = 0.0;
    vec3 p;
    
    for (int i = 0; i < 64; i++) {
        p = ro + rd * t;
        // 应用2D旋转到点上
        vec3 rotatedP = applyRotation(p, angle);
        d = arrowSDF(rotatedP);
        
        if (d < 0.001 || t > tMax) break;
        t += d;
    }
    
    // 卡通风格渲染（略微增强真实感：添加更多光照阶梯）
    vec3 arrowColor = vec3(0.8, 0.8, 0.8);  // 改为银灰色以增加真实感（像金属箭头）
    vec3 outlineColor = vec3(0.0, 0.0, 0.0); // 黑色轮廓
    vec3 bgColor = vec3(0.5, 0.7, 1.0);     // 淡蓝色背景
    
    vec3 color;
    if (t < tMax) {
        // 命中箭矢
        // 计算法线
        vec3 rotatedP = applyRotation(p, angle);
        vec3 normal = normalize(vec3(
            arrowSDF(applyRotation(p + vec3(0.001, 0.0, 0.0), angle)) - arrowSDF(applyRotation(p - vec3(0.001, 0.0, 0.0), angle)),
            arrowSDF(applyRotation(p + vec3(0.0, 0.001, 0.0), angle)) - arrowSDF(applyRotation(p - vec3(0.0, 0.001, 0.0), angle)),
            arrowSDF(applyRotation(p + vec3(0.0, 0.0, 0.001), angle)) - arrowSDF(applyRotation(p - vec3(0.0, 0.0, 0.001), angle))
        ));
        
        // 卡通光照 - 增加更多阶梯以增强真实感
        vec3 lightDir = normalize(vec3(1.0, 1.0, -1.0));
        float diff = dot(normal, lightDir);
        
        // 卡通风格的阶梯式光照（更多级别）
        if (diff > 0.8) diff = 1.0;
        else if (diff > 0.4) diff = 0.7;
        else if (diff > 0.0) diff = 0.4;
        else diff = 0.2;
        
        color = arrowColor * diff;
        
        // 添加轮廓
        float edge = 1.0 - pow(abs(dot(normal, -rd)), 1.0);
        if (edge > 0.7) {
            color = mix(color, outlineColor, (edge - 0.7) * 3.0);
        }
        
        // 添加高光（增强真实感）
        vec3 reflectDir = reflect(-lightDir, normal);
        float spec = pow(max(dot(rd, reflectDir), 0.0), 32.0);
        if (spec > 0.5) {
            color += vec3(1.0) * 0.5;
        }
    } else {
        // 背景 - 添加简单的渐变（不变）
        color = mix(bgColor, vec3(0.8, 0.9, 1.0), uv.y * 0.5 + 0.5);
    }
    
    // 输出
    gl_FragColor = vec4(color, 1.0);
}