
# 🚀 PixiJS React 粒子系统使用说明

本项目提供了一个基于 **PixiJS + React** 实现的可扩展粒子系统，包括基础版本与增强版本，支持自定义行为、纹理、重力、路径动画、阻力等多种效果。  
通过预设与自定义配置，你可以快速创建火焰、爆炸、水、魔法等酷炫视觉特效。

---

## 📁 项目结构

```bash

src/
├── components/
│   ├── Particles/
│   │   ├── ParticleDemo.tsx           # 粒子系统演示界面
│   │   ├── ParticleSystem.tsx         # 基础粒子系统
│   │   ├── ParticleSystemEnhanced.tsx # 增强版粒子系统
│   │   ├── ParticlePresets.ts         # 各种粒子效果预设
│   │   ├── ParticleBehaviorSystem.ts  # 行为注册与对象池
│   │   └── behaviors/                 # 粒子行为定义模块
│   │       ├── BaseBehaviors.ts
│   │       ├── AdvancedBehaviors.ts
│   │       └── ShapeBehaviors.ts
└── assets/
    └── Bubbles99.png                # 粒子纹理资源
```

---

## 🧩 安装依赖

在项目根目录执行以下命令：

```bash
npm install pixi.js @pixi/react
```

或使用 Yarn：

```bash
yarn add pixi.js @pixi/react
```

---

## 💡 基本用法

### 1️⃣ 在 React 中引入和渲染粒子系统

```tsx
import { Application } from '@pixi/react';
import { ParticleSystemEnhanced } from './components/Particles/ParticleSystemEnhanced';
import { createFireTextureEffect } from './components/Particles/ParticlePresets';
import { useEffect, useState } from 'react';
import { Assets, Texture } from 'pixi.js';

export default function TexturedParticles() {
  const [texture, setTexture] = useState<Texture | null>(null);
  
  useEffect(() => {
    const loadTexture = async () => {
      const tex = await Assets.load('assets/particle.png');
      setTexture(tex);
    };
    
    loadTexture();
  }, []);
  
  if (!texture) return null;
  
  return (
    <Application width={800} height={600} options={{ background: 0x000000 }}>
      <ParticleSystemEnhanced
        config={createFireTextureEffect([texture])}
        play={true}
        position={[400, 300]}
        scale={1.0}
      />
    </Application>
  );
}
```

---

### 2️⃣ 使用自带演示组件

该组件带有完整控制面板，可实时切换粒子效果、播放状态和缩放。

```tsx
import { Application } from '@pixi/react';
import { ParticleDemo } from './components/Particles/ParticleDemo';

export default function Demo() {
  return (
    <Application width={800} height={600} options={{ background: 0x000000 }}>
      <ParticleDemo />
    </Application>
  );
}
```

---

## ⚙️ 粒子配置说明

### 核心配置结构

```ts
const config = {
  lifetime: { min: 1, max: 3 },           // 粒子的生命周期 (秒)
  frequency: 0.1,                         // 发射频率
  spawnChance: 1,                         // 每次发射的概率
  particlesPerWave: 5,                    // 每波粒子数量
  emitterLifetime: 0,                     // 发射器寿命 (0 表示无限)
  maxParticles: 100,                      // 最大粒子数
  pos: { x: 0, y: 0 },                    // 发射位置（相对坐标）
  addAtBack: false,                       // 是否在底层绘制
  behaviors: [ /* 粒子行为数组 */ ]
};
```

---

### 💫 粒子行为（Behaviors）

行为定义了粒子随时间的属性变化，可叠加组合。

#### 🔸 基础行为

| 行为类型 | 描述 | 示例配置 |
|-----------|------|-----------|
| `alpha` | 控制透明度 | `{ type: 'alpha', config: { alpha: { list: [{ value: 0, time: 0 }, { value: 1, time: 0.2 }, { value: 0, time: 1 }] }}}` |
| `scale` | 控制缩放 | `{ type: 'scale', config: { scale: { list: [{ value: 0.2, time: 0 }, { value: 1, time: 0.5 }, { value: 0.1, time: 1 }] }}}` |
| `color` | 控制颜色渐变 | `{ type: 'color', config: { color: { list: [{ value: 'ff0000', time: 0 }, { value: 'ffff00', time: 0.5 }, { value: '0000ff', time: 1 }] }}}` |
| `moveSpeed` | 粒子移动速度变化 | `{ type: 'moveSpeed', config: { speed: { list: [{ value: 250, time: 0 }, { value: 100, time: 1 }] }}}` |
| `rotationStatic` | 初始旋转范围 | `{ type: 'rotationStatic', config: { min: 0, max: 360 }}` |
| `textureSingle` | 应用纹理 | `{ type: 'textureSingle', config: { texture: yourTexture }}` |

---

#### 🔹 高级行为（增强版）

| 行为类型 | 功能 | 示例配置 |
|-----------|--------|-------------|
| `gravity` | 模拟重力加速度 | `{ type: 'gravity', config: { x: 0, y: 200 }}` |
| `drag` | 模拟空气阻力 | `{ type: 'drag', config: { value: 0.98 }}` |
| `pathFollow` | 沿路径运动 | `{ type: 'pathFollow', config: { path: [{x:0,y:0},{x:100,y:-60},{x:200,y:0}], speed: 0.5 }}` |
| `animatedTexture` | 多帧动画纹理 | `{ type: 'animatedTexture', config: { textures: [tex1, tex2, tex3], animationSpeed: 0.1 }}` |

---

#### 🔻 形状行为（Spawn Shape）

| 类型 | 描述 | 配置示例 |
|------|------|----------|
| `circle` | 从圆形区域生成粒子 | `{ type: 'spawnShape', config: { type: 'circle', data: { radius: 50 }}}` |
| `torus` | 从环形边缘发射 | `{ type: 'spawnShape', config: { type: 'torus', data: { radius: 80 }}}` |
| `rect` | 从矩形区域生成粒子 | `{ type: 'spawnShape', config: { type: 'rect', data: { width: 200, height: 100 }}}` |

---

## 🔥 预设效果 (ParticlePresets)

你可以直接导入一组现成的粒子效果：

| 名称 | 描述 |
|------|------|
| `fireEffect`  | 火焰特效
| `waterEffect` | 水涌动特效 |
| `explosionEffect` | 爆炸特效 |
| `magicEffect` | 魔法闪烁 |
---

## 🎮 实时控制（ParticleDemo 内置）

演示组件 `ParticleDemo` 提供了以下交互：

| 控制项 | 功能 |
|--------|------|
| **效果按钮** | 在 fire / water / explosion / magic / texture 间切换 |
| **播放 / 暂停按钮** | 开启或停止粒子发射 |
| **缩放控制** | 缩小（-）或放大（+）粒子系统 |

---

## 🧠 性能优化

增强版粒子系统使用对象池技术：

- 对已销毁的粒子复用对象
- 降低垃圾回收频率；
- 使用链表而非数组管理粒子
- 行为优先级排序，优化更新流程
---

## 纹理加载
新版本支持异步加载纹理并应用到粒子系统：

```ts
// 在 ParticleDemo 中的纹理加载示例
useEffect(() => {
  const loadTextures = async () => {
    try {
      // 使用 Assets.load 异步加载纹理
      const [particle, fire] = await Promise.all([
        Assets.load('assets/particle.png'),
        Assets.load('assets/Fire.png'),
      ]);
      
      setParticleTexture(particle);
      setFireTexture(fire);
      setTexturesLoaded(true);
    } catch (error) {
      console.error('纹理加载失败:', error);
    }
  };
  
  loadTextures();
}, []);
```


## 🧾 提示与调试建议

1. 确认粒子纹理（例如 `assets/Bubbles99.png`）路径正确；
2. 调整 `maxParticles`、`frequency` 获取理想性能；
3. 为高性能场景应避免使用透明度叠加过多；
4. 可结合调试工具（如 Chrome Pixi DevTools）分析渲染性能；
5. 用多个 `ParticleSystemEnhanced` 叠加实现多层效果。

---

## 📄 License

本项目代码自由使用与扩展，用于学习和开发 PixiJS 粒子系统。

---

## ❤️ 作者寄语

此粒子系统设计为模块化、可扩展，对希望在 React + Pixi 项目中实现游戏特效、UI 动画、炫酷视觉演出的人非常适合。  
你可以自由编写自己的 `Behavior` 类，注册到 `behaviorRegistry` 中，实现更加复杂的粒子逻辑！

> 🌟 “每一个粒子，都是光的语言。”