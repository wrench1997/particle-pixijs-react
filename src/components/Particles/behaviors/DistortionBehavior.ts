// src/components/Particles/behaviors/DistortionBehavior.ts
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IBehavior } from '../ParticleBehaviorSystem';
import { BehaviorPriority } from '../ParticleBehaviorSystem';

// 扭曲行为：基于配置添加不规则扰动
export class DistortionBehavior implements IBehavior {
  type = 'distortion';
  order = BehaviorPriority.APPEARANCE + 5; // 外观行为优先级

  // 无需实现（全局更新，如果不需要可留空）
  updateGlobal: any = undefined;

  // 无需实现（清理，如果不需要可留空）
  cleanup: any = undefined;

  // 初始化每个粒子：存储配置值（添加轻微随机以增加真实感）
  init(particle: any, config: any): void {
    particle.distortionAmp = (config.amplitude || 3) * (Math.random() * 0.2 + 0.9); // 轻微随机幅度
    particle.distortionFreq = config.frequency || 5; // 频率
    particle.distortionPhase = Math.random() * Math.PI * 2; // 随机相位，避免所有粒子同步
  }

  // 更新每个粒子：应用正弦/余弦扭曲
  update(particle: any, deltaTime: number, progress: number): void {
    const angle = progress * Math.PI * particle.distortionFreq + particle.distortionPhase;
    particle.x += Math.sin(angle) * particle.distortionAmp;
    particle.y += Math.cos(angle) * particle.distortionAmp;
  }
}