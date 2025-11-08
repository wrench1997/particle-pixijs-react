
// src/components/Particles/ParticleDemo.tsx
import { useState, useCallback } from 'react';
import { Container, Graphics, Text } from 'pixi.js';
import { extend } from '@pixi/react';
// 导入增强版粒子系统
import { ParticleSystemEnhanced, type ParticleConfig } from './ParticleSystemEnhanced';
import { 
  fireEffect,  waterEffect, edgeEffect, 
  magicEffect, arrowParticleEffect 
} from './ParticlePresets';

// 注册组件
extend({
  Container,
  Graphics,
  Text
});

// 在 ParticleDemo.tsx 中添加对多发射器的支持

// 修改 ParticleSystemEnhanced 组件以支持多配置
interface MultiEmitterProps {
  configs: ParticleConfig[];
  play?: boolean;
  position?: [number, number];
  scale?: number;
  onComplete?: () => void;
}

export const MultiEmitterSystem = ({ 
  configs, 
  play = true, 
  position = [0, 0], 
  scale = 1,
  onComplete 
}: MultiEmitterProps) => {
  return (
    <pixiContainer
      position={{x: position[0], y: position[1]}}
      scale={{x: scale, y: scale}}
    >
      {configs.map((config, index) => (
        <ParticleSystemEnhanced
          key={index}
          config={config}
          play={play}
          position={[0, 0]} // 相对于父容器的位置
          scale={1} // 相对于父容器的缩放
          onComplete={index === 0 ? onComplete : undefined} // 只在第一个发射器完成时触发
        />
      ))}
    </pixiContainer>
  );
};

export const ParticleDemo = () => {
  const [selectedEffect, setSelectedEffect] = useState('fire');
  const [play, setPlay] = useState(true);
  const [scale, setScale] = useState(1);

  
  // 获取当前选择的效果配置
  const getSelectedConfig = useCallback(() => {
    switch (selectedEffect) {
      case 'fire':  return [fireEffect];
      case 'water': return [waterEffect];
      case 'edgeEffect': return [edgeEffect];
      case 'magic': return [magicEffect];
      case 'arrow': return [arrowParticleEffect]; // 新增
      default: return [magicEffect];
    }
  }, [selectedEffect]);
  
  // 绘制按钮
  const drawButton = useCallback((g: Graphics, isSelected: boolean) => {
    g.clear();
    g.beginFill(isSelected ? 0x3366cc : 0x666666, 0.8);
    g.drawRoundedRect(0, 0, 120, 40, 5);
    g.endFill();
  }, []);
  
  // 绘制控制面板背景
  const drawControlPanel = useCallback((g: Graphics) => {
    g.clear();
    g.beginFill(0x000000, 0.5);
    g.drawRoundedRect(0, 0, 600, 100, 10);
    g.endFill();
  }, []);
  
  // 使用 useCallback 包装所有事件处理函数
  const handleEffectSelect = useCallback((effect: string) => {
    console.log('选择效果:', effect);
    setSelectedEffect(effect);
  }, []);
  
  const handlePlayToggle = useCallback(() => {
    console.log('切换播放状态:', !play);
    setPlay(!play);
  }, [play]);
  
  const handleScaleDecrease = useCallback(() => {
    console.log('缩小');
    setScale(Math.max(0.5, scale - 0.1));
  }, [scale]);
  
  const handleScaleIncrease = useCallback(() => {
    console.log('放大');
    setScale(Math.min(2.0, scale + 0.1));
  }, [scale]);
  
  return (
    <pixiContainer>
      {/* 使用多发射器系统 */}
      {Array.isArray(getSelectedConfig()[0]) ? (
        <MultiEmitterSystem
          configs={getSelectedConfig()}
          play={play}
          position={[400, 300]}
          scale={scale}
          onComplete={() => console.log('粒子效果完成')}
        />
      ) : (
        <ParticleSystemEnhanced
          config={getSelectedConfig()[0]}
          play={play}
          position={[400, 300]}
          scale={scale}
          onComplete={() => console.log('粒子效果完成')}
        />
      )}
      
      {/* 控制面板 */}
      <pixiContainer position={{x: 100, y: 500}}>
        <pixiGraphics draw={drawControlPanel} />
        
        {/* 效果选择按钮 */}
        <pixiContainer 
        interactive={true}
        cursor="pointer"
        position={{x: 20, y: 20}}>
          {['fire', 'water', 'edgeEffect', 'magic','arrow'].map((effect, index) => (
            <pixiContainer
              key={effect}
              position={{x: index * 130, y: 0}}
              eventMode="static"
              cursor="pointer"
              onPointerDown={() => handleEffectSelect(effect)}
            >
              <pixiGraphics draw={(g) => drawButton(g, selectedEffect === effect)} />
              <pixiText
                text={effect.charAt(0).toUpperCase() + effect.slice(1)}
                position={{x: 60, y: 20}}
                anchor={0.5}
                style={{
                  fill: 0xffffff,
                  fontSize: 16
                }}
              />
            </pixiContainer>
          ))}
        </pixiContainer>
        
        {/* 播放/暂停按钮 */}
        <pixiContainer
          position={{x: 20, y: 70}}
          eventMode="static"
          cursor="pointer"
          onPointerDown={handlePlayToggle}
        >
          <pixiGraphics draw={(g) => {
            g.clear();
            g.beginFill(play ? 0x66cc66 : 0xcc6666, 0.8);
            g.drawRoundedRect(0, 0, 100, 30, 5);
            g.endFill();
          }} />
          <pixiText
            text={play ? "暂停" : "播放"}
            position={{x: 50, y: 15}}
            anchor={0.5}
            style={{
              fill: 0xffffff,
              fontSize: 14
            }}
          />
        </pixiContainer>
        
        {/* 缩放控制 */}
        <pixiContainer position={{x: 140, y: 70}}>
          <pixiContainer
            eventMode="static"
            cursor="pointer"
            onPointerDown={handleScaleDecrease}
          >
            <pixiGraphics draw={(g) => {
              g.clear();
              g.beginFill(0x666666, 0.8);
              g.drawRoundedRect(0, 0, 30, 30, 5);
              g.endFill();
            }} />
            <pixiText
              text="-"
              position={{x: 15, y: 15}}
              anchor={0.5}
              style={{
                fill: 0xffffff,
                fontSize: 20
              }}
            />
          </pixiContainer>
          
          <pixiText
            text={`缩放: ${scale.toFixed(1)}`}
            position={{x: 80, y: 15}}
            anchor={0.5}
            style={{
              fill: 0xffffff,
              fontSize: 14
            }}
          />
          
          <pixiContainer
            position={{x: 130, y: 0}}
            eventMode="static"
            cursor="pointer"
            onPointerDown={handleScaleIncrease}
          >
            <pixiGraphics draw={(g) => {
              g.clear();
              g.beginFill(0x666666, 0.8);
              g.drawRoundedRect(0, 0, 30, 30, 5);
              g.endFill();
            }} />
            <pixiText
              text="+"
              position={{x: 15, y: 15}}
              anchor={0.5}
              style={{
                fill: 0xffffff,
                fontSize: 20
              }}
            />
          </pixiContainer>
        </pixiContainer>
      </pixiContainer>
    </pixiContainer>
  );
};
