// src/components/ParticleTest.tsx
import { Application } from '@pixi/react';
import { ParticleDemo } from './Particles/ParticleDemo';

export const ParticleTest = () => {
  return (
    <div style={{ width: '800px', height: '600px', margin: '0 auto' }}>
      <Application width={800} height={600} backgroundColor={0x1d1d1d}>
        <ParticleDemo />
      </Application>
    </div>
  );
};