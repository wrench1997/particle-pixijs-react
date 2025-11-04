// src/components/Particles/ParticlePresets.ts
// src/components/Particles/ParticlePresets.ts
import type { ParticleConfig } from './ParticleSystem';
import * as PIXI from 'pixi.js';







// src/components/Particles/ParticlePresets.ts 中添加火焰效果配置

// 火焰效果
export const fireEffect: ParticleConfig = {
  lifetime: {
    min: 0.1,
    max: 0.75
  },
  frequency: 0.005,
  spawnChance: 1,
  particlesPerWave: 50,
  emitterLifetime: 0, // 无限
  maxParticles: 1000,
  pos: {
    x: 0,
    y: 0
  },
  addAtBack: false,
  behaviors: [
    {
      type: 'alpha',
      config: {
        alpha: {
          list: [
            {
              value: 0.62,
              time: 0
            },
            {
              value: 0.5,
              time: 0.5
            },
            {
              value: 0,
              time: 1
            }
          ],
        },
      }
    },

    {
      type: 'rotation',
      config: {
        accel: 0,
        minSpeed: 50,
        maxSpeed: 50,
        minStart: 265,
        maxStart: 275
      }
    },
    
    {
      type: "moveSpeedStatic",
      config: {
        min: 500,
        max: 500
      }
    },

    {
      type: 'scale',
      config: {
        scale: {
          list: [
            {
              value: 0.25,
              time: 0
            },
            {
              value: 0.75,
              time: 1
            }
          ],
        },
        minMult: 1
      }
    },

    {
      type: 'color',
      config: {
        color: {
          list: [
            {
              value: "fff191",
              time: 0
            },
            {
              value: "ff622c",
              time: 1
            }
          ],
        },
      }
    },
    {
      type: 'moveSpeed',
      config: {
        speed: {
          list: [
            {
              value: 100,
              time: 0
            },
            {
              value: 50,
              time: 1
            }
          ],
          isStepped: false
        },
        minMult: 0.8
      }
    },
    {
      type: 'spawnShape',
      config: {
        type: 'torus',
        data: {
          x: 0,
          y: 0,
          radius: 10,
          innerRadius: 0,
          affectRotation: false
        }
      }
    }
  ]
};

// 创建带纹理的火焰效果
export const createFireTextureEffect = (textures: PIXI.Texture | PIXI.Texture[]): ParticleConfig => {
  const baseConfig = {...fireEffect};
  
  // 添加纹理行为
  baseConfig.behaviors.push({
    type: 'textureRandom',
    config: {
      textures: Array.isArray(textures) ? textures : [textures]
    }
  });
  
  return baseConfig;
};



// 水效果
export const waterEffect: ParticleConfig = {
  lifetime: {
    min: 0.8,
    max: 0.8
  },
  frequency: 0.01,
  spawnChance: 1,
  particlesPerWave: 2,
  emitterLifetime: 0, // 无限
  maxParticles: 200,
  pos: {
    x: 0,
    y: 0
  },
  addAtBack: false,
  behaviors: [
    {
      type: 'alpha',
      config: {
        alpha: {
          list: [
            {
              value: 0.7,
              time: 0
            },
            {
              value: 0.1,
              time: 1
            }
          ],
        },
      }
    },
    {
      type: 'scale',
      config: {
        scale: {
          list: [
            {
              value: 0.5,
              time: 0
            },
            {
              value: 0.2,
              time: 1
            }
          ],
        },
      }
    },
    {
      type: 'color',
      config: {
        color: {
          list: [
            {
              value: "3399ff",
              time: 0
            },
            {
              value: "99ccff",
              time: 1
            }
          ],
        },
      }
    },
    {
      type: 'moveSpeed',
      config: {
        speed: {
          list: [
            {
              value: 80,
              time: 0
            },
            {
              value: 40,
              time: 1
            }
          ],
          isStepped: false
        },
      }
    },
    {
      type: 'rotationStatic',
      config: {
        min: 0,
        max: 360
      }
    },
    {
      type: 'spawnShape',
      config: {
        type: 'circle',
        data: {
          x: 0,
          y: 0,
          radius: 20
        }
      }
    }
  ]
};

// 爆炸效果
export const explosionEffect: ParticleConfig = {
  lifetime: {
    min: 0.5,
    max: 0.7
  },
  frequency: 0.001,
  spawnChance: 1,
  particlesPerWave: 30,
  emitterLifetime: 0, // 短暂爆发
  maxParticles: 100,
  pos: {
    x: 0,
    y: 0
  },
  addAtBack: false,
  behaviors: [
    {
      type: 'alpha',
      config: {
        alpha: {
          list: [
            {
              value: 1,
              time: 0
            },
            {
              value: 0,
              time: 1
            }
          ],
        },
      }
    },
    {
      type: 'scale',
      config: {
        scale: {
          list: [
            {
              value: 1.2,
              time: 0
            },
            {
              value: 0.2,
              time: 1
            }
          ],
        },
      }
    },
    {
      type: 'color',
      config: {
        color: {
          list: [
            {
              value: "ff3300",
              time: 0
            },
            {
              value: "ffcc00",
              time: 0.5
            },
            {
              value: "999999",
              time: 1
            }
          ],
        },
      }
    },
    {
      type: 'moveSpeed',
      config: {
        speed: {
          list: [
            {
              value: 200,
              time: 0
            },
            {
              value: 100,
              time: 0.5
            },
            {
              value: 50,
              time: 1
            }
          ],
          isStepped: false
        },
      }
    },
    {
      type: 'rotationStatic',
      config: {
        min: 0,
        max: 360
      }
    },
    {
      type: 'spawnShape',
      config: {
        type: 'circle',
        data: {
          x: 0,
          y: 0,
          radius: 5
        }
      }
    }
  ]
};

// 魔法效果
export const magicEffect: ParticleConfig = {
  lifetime: {
    min: 1,
    max: 1.5
  },
  frequency: 0.02,
  spawnChance: 1,
  particlesPerWave: 1,
  emitterLifetime: 0, // 无限
  maxParticles: 100,
  pos: {
    x: 0,
    y: 0
  },
  addAtBack: false,
  behaviors: [
    {
      type: 'alpha',
      config: {
        alpha: {
          list: [
            {
              value: 0,
              time: 0
            },
            {
              value: 0.8,
              time: 0.2
            },
            {
              value: 0,
              time: 1
            }
          ],
        },
      }
    },
    {
      type: 'scale',
      config: {
        scale: {
          list: [
            {
              value: 0.2,
              time: 0
            },
            {
              value: 0.5,
              time: 0.5
            },
            {
              value: 0.2,
              time: 1
            }
          ],
        },
      }
    },
    {
      type: 'color',
      config: {
        color: {
          list: [
            {
              value: "9966ff",
              time: 0
            },
            {
              value: "cc99ff",
              time: 0.5
            },
            {
              value: "ffffff",
              time: 1
            }
          ],
        },
      }
    },
    {
      type: 'moveSpeed',
      config: {
        speed: {
          list: [
            {
              value: 50,
              time: 0
            },
            {
              value: 30,
              time: 1
            }
          ],
          isStepped: false
        },
      }
    },
    {
      type: 'rotationStatic',
      config: {
        min: 0,
        max: 360
      }
    },
    {
      type: 'spawnShape',
      config: {
        type: 'torus',
        data: {
          x: 0,
          y: 0,
          radius: 30
        }
      }
    }
  ]
};

// 创建带纹理的粒子效果
export const createTextureEffect = (texture: PIXI.Texture): ParticleConfig => {
  return {
    lifetime: {
      min: 0.6,
      max: 0.8
    },
    frequency: 0.01,
    spawnChance: 1,
    particlesPerWave: 1,
    emitterLifetime: 0, // 无限
    maxParticles: 100,
    pos: {
      x: 0,
      y: 0
    },
    addAtBack: false,
    behaviors: [
      {
        type: 'alpha',
        config: {
          alpha: {
            list: [
              {
                value: 0.8,
                time: 0
              },
              {
                value: 0.1,
                time: 1
              }
            ],
          },
        }
      },
      {
        type: 'scale',
        config: {
          scale: {
            list: [
              {
                value: 1,
                time: 0
              },
              {
                value: 0.3,
                time: 1
              }
            ],
          },
        }
      },
      {
        type: 'moveSpeed',
        config: {
          speed: {
            list: [
              {
                value: 100,
                time: 0
              },
              {
                value: 50,
                time: 1
              }
            ],
            isStepped: false
          },
        }
      },
      {
        type: 'rotationStatic',
        config: {
          min: 0,
          max: 360
        }
      },
      {
        type: 'spawnShape',
        config: {
          type: 'torus',
          data: {
            x: 0,
            y: 0,
            radius: 20
          }
        }
      },
      {
        type: 'textureSingle',
        config: {
          texture: texture
        }
      }
    ]
  };
};










