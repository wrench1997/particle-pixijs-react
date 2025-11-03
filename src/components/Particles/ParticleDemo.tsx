// src/components/Particles/ParticleDemo.tsx
import { useState, useCallback, useEffect } from 'react';
import { Container, Graphics, Text, Texture, Assets } from 'pixi.js';
import { extend } from '@pixi/react';
import { ParticleSystem } from './ParticleSystem';
import { fireEffect, waterEffect, explosionEffect, magicEffect, createTextureEffect } from './ParticlePresets';

// 注册组件
extend({
  Container,
  Graphics,
  Text
});

export const ParticleDemo = () => {
  const [selectedEffect, setSelectedEffect] = useState('fire');
  const [play, setPlay] = useState(true);
  const [scale, setScale] = useState(1);
  const [textureLoaded, setTextureLoaded] = useState(false);
  const [textureInstance, setTextureInstance] = useState<Texture | null>(null);
  
  // 预加载纹理
  useEffect(() => {
    const loadTexture = async () => {
      try {
        // 使用 Assets.load 异步加载纹理
        const texture = await Assets.load('assets/Bubbles99.png');
        setTextureInstance(texture);
        setTextureLoaded(true);
      } catch (error) {
        console.error('纹理加载失败:', error);
      }
    };
    
    loadTexture();
  }, []);
  
  // 获取当前选择的效果配置
  const getSelectedConfig = useCallback(() => {
    switch (selectedEffect) {
      case 'fire': return fireEffect;
      case 'water': return waterEffect;
      case 'explosion': return explosionEffect;
      case 'magic': return magicEffect;
      case 'texture': 
        // 只有在纹理加载完成后才返回纹理效果
        if (textureLoaded && textureInstance) {
          return createTextureEffect(textureInstance);
        }
        // 如果纹理未加载完成，返回一个默认效果
        return magicEffect;
      default: return fireEffect;
    }
  }, [selectedEffect, textureLoaded, textureInstance]);
  
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
      {/* 粒子系统 */}
      <ParticleSystem
        config={getSelectedConfig()}
        play={play}
        position={[400, 300]}
        scale={scale}
        onComplete={() => console.log('粒子效果完成')}
      />
      
      {/* 控制面板 */}
      <pixiContainer position={{x: 100, y: 500}}>
        <pixiGraphics draw={drawControlPanel} />
        
        {/* 效果选择按钮 */}
        <pixiContainer 
        interactive={true}
        cursor="pointer"
        position={{x: 20, y: 20}}>
          {['fire', 'water', 'explosion', 'magic', 'texture'].map((effect, index) => (
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