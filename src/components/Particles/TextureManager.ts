// src/components/Particles/TextureManager.ts
import { Assets, Texture } from 'pixi.js';

export class TextureManager {
  private static instance: TextureManager;
  private textureCache: Map<string, Texture> = new Map();
  private loadingPromises: Map<string, Promise<Texture>> = new Map();
  private textureBasePath: string = 'assets/';

  private constructor() {
    // 私有构造函数，确保单例模式
  }

  public static getInstance(): TextureManager {
    if (!TextureManager.instance) {
      TextureManager.instance = new TextureManager();
    }
    return TextureManager.instance;
  }

  // 设置纹理基础路径
  public setBasePath(path: string): void {
    this.textureBasePath = path.endsWith('/') ? path : `${path}/`;
  }

  // 获取纹理，如果未加载则自动加载
  public async getTexture(textureName: string): Promise<Texture> {
    // 如果已经缓存，直接返回
    if (this.textureCache.has(textureName)) {
      return this.textureCache.get(textureName)!;
    }

    // 如果正在加载，返回加载Promise
    if (this.loadingPromises.has(textureName)) {
      return this.loadingPromises.get(textureName)!;
    }

    // 开始新的加载
    const loadPromise = this.loadTexture(textureName);
    this.loadingPromises.set(textureName, loadPromise);

    try {
      const texture = await loadPromise;
      this.textureCache.set(textureName, texture);
      this.loadingPromises.delete(textureName);
      return texture;
    } catch (error) {
      this.loadingPromises.delete(textureName);
      console.error(`Failed to load texture: ${textureName}`, error);
      throw error;
    }
  }

  // 预加载一组纹理
  public async preloadTextures(textureNames: string[]): Promise<void> {
    const promises = textureNames.map(name => this.getTexture(name));
    await Promise.all(promises);
  }

  // 加载单个纹理
  private async loadTexture(textureName: string): Promise<Texture> {
    const path = this.getTexturePath(textureName);
    return await Assets.load(path);
  }

  // 获取纹理完整路径
  private getTexturePath(textureName: string): string {
    // 如果已经是完整路径（包含http或https），则直接返回
    if (textureName.startsWith('http://') || textureName.startsWith('https://')) {
      return textureName;
    }
    return `${this.textureBasePath}${textureName}`;
  }

  // 清除缓存
  public clearCache(): void {
    this.textureCache.clear();
  }
}

// 导出单例实例
export const textureManager = TextureManager.getInstance();