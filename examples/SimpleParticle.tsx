// examples/SimpleParticle.tsx
import React from 'react';
import { Application } from '@pixi/react';
import { ParticleSystemEnhanced, fireEffect } from 'pixi-particle-system';

export const SimpleParticleExample = () => {
  return (
    <div style={{ width: '800px', height: '600px', margin: '0 auto' }}>
      <Application width={800} height={600} options={{ backgroundColor: 0x1d1d1d }}>
        <ParticleSystemEnhanced
          config={fireEffect}
          play={true}
          position={[400, 300]}
          scale={1}
          onComplete={() => console.log('粒子效果完成')}
        />
      </Application>
    </div>
  );
};