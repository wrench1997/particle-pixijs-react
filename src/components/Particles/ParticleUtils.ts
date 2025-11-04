// src/components/Particles/ParticleUtils.ts
import * as PIXI from 'pixi.js';

// 角度转弧度常量
export const DEG_TO_RADS = Math.PI / 180;

// 旋转点
export function rotatePoint(angle: number, p: PIXI.Point): void {
  if (!angle) return;
  
  const s = Math.sin(angle);
  const c = Math.cos(angle);
  const xnew = (p.x * c) - (p.y * s);
  const ynew = (p.x * s) + (p.y * c);
  
  p.x = xnew;
  p.y = ynew;
}

// 计算向量长度
export function length(point: PIXI.Point): number {
  return Math.sqrt((point.x * point.x) + (point.y * point.y));
}

// 归一化向量
export function normalize(point: PIXI.Point): void {
  const oneOverLen = 1 / length(point);
  point.x *= oneOverLen;
  point.y *= oneOverLen;
}

// 缩放向量
export function scaleBy(point: PIXI.Point, value: number): void {
  point.x *= value;
  point.y *= value;
}