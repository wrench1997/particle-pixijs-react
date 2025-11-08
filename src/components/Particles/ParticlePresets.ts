// src/components/Particles/ParticlePresets.ts
// src/components/Particles/ParticlePresets.ts
import type { ParticleConfig } from './ParticleSystemEnhanced';
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
          radius: 0,
          innerRadius: 0,
          affectRotation: false
        }
      }
    },
    {
      type: 'textureRandom',
      config: {
        textures: ['assets/particle.png', 'assets/Fire.png'] // 字符串路径，会自动加载
      }
    }
  ]
};


// 水效果
export const waterEffect: ParticleConfig = {
  lifetime: {
    min: 0.25,
    max: 0.5
  },
  
  frequency: 0.001,
  spawnChance: 1,
  particlesPerWave: 30,
  emitterLifetime: 0, // 无限
  maxParticles: 2000,
  addAtBack: false,
  pos: {
    x: 0,
    y: 0
  },

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
              value:0.31,
              time: 1
            }
          ],
        },
      }
    },
    {
      type: 'rotationStatic',
      config: {
        min:260,
        max:280,
      }
    },
    {
      type: "moveAcceleration",
      config: {
        accel: {
          x: 0,
          y: 2000
        },
        minStart: 600,
        maxStart: 600,
        rotate: true
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
              value:1,
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
              value: "ffffff",
              time: 0
            },
            {
              value: "9ff3ff",
              time: 1
            }
          ],
        },
      }
    },

    {
      type: "spawnShape",
      config: {
        type: 'torus',
        data: {
          x: 0,
          y: 0,
          radius: 0,
          innerRadius: 0,
          affectRotation: true
        }
      }
    },
    {
      type: 'textureRandom',
      config: {
        textures: ['assets/Sparks.png'] // 字符串路径，会自动加载
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
        min: -90,  // 左上
        max: 90    // 右上
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
      type: 'polygonalChain',
      config: {
        data: [ // 定义矩形边缘的多边形链（点数组）
          // 创建一个圆形冲击波形状
          Array.from({ length: 16 }).map((_, i) => {
            const angle = (i / 16) * Math.PI * 2;
            return { 
              x: Math.cos(angle) * 50, 
              y: Math.sin(angle) * 50 
            };
          })
          
        ]
      }
    },
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





// 带有 GLSL 箭头的粒子效果
export const arrowParticleEffect: ParticleConfig = {
  lifetime: {
    min: 0.5,
    max: 0.8
  },
  frequency: 0.01,
  spawnChance: 1,
  particlesPerWave: 2,
  emitterLifetime: 0, // 无限
  maxParticles: 0,
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
              value: 0.3,
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
      type: 'color',
      config: {
        color: {
          list: [
            {
              value: "ffcc00",
              time: 0
            },
            {
              value: "ff6600",
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
              value: 60,
              time: 0
            },
            {
              value: 20,
              time: 1
            }
          ],
          isStepped: false
        },
      }
    },
    {
      type: 'spawnShape',
      config: {
        type: 'circle',
        data: {
          x: 0,
          y: 0,
          radius: 100
        }
      }
    }
  ],
  // 添加全局 GLSL 箭头行为
  globalBehaviors: [
    {
      type: 'glslArrow',
      config: {
        // 目标坐标 - 箭矢将指向这个点
        target: { x: 200, y: 100 },
        
        // 可选配置
        autoRotate: false,        // 禁用自动旋转
        scale: 0.8,               // 箭矢缩放
        trackTarget: true,        // 启用目标跟踪
        trackSpeed: 0.1           // 跟踪速度
      }
    }
  ]
};




// 在 ParticlePresets.ts 中添加
export const edgeEffect: ParticleConfig = {
  lifetime: {
    min: 0.5,
    max: 1
  },
  frequency: 0.1,
  spawnChance: 1,
  particlesPerWave: 1,  // 增加每波粒子数量
  emitterLifetime: 0,  // 限制发射时间，使其像一次性斩击
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
              value: 0.8,
              time: 0
            },
            {
              value: 0.3,
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
      type: 'scale',
      config: {
        scale: {
          list: [
            {
              value: 0.1,
              time: 0
            },
            {
              value: 0.5,
              time: 0.2
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
      type: 'color',
      config: {
        color: {
          list: [
            {
              value: "ffffff",  // 开始为白色
              time: 0
            },
            {
              value: "00ffff",  // 中间为青色
              time: 0.3
            },
            {
              value: "0088ff",  // 结束为蓝色
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
              value: 300,  // 开始速度快
              time: 0
            },
            {
              value: 100,  // 逐渐减慢
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
        min: -10,
        max: 10
      }
    },
    {
      type: 'spawnShape',
      config: {
        type: 'rect',
        data: {
          x: 0,
          y: 0,
          w: 10,  // 窄矩形，像一条线
          h: 100  // 高度较大，形成斩击的长度
        }
      }
    },
    {
      type: 'textureRandom',
      config: {
        textures: ['assets/slash.png']  // 使用斩击纹理
      }
    },
  ]
};

