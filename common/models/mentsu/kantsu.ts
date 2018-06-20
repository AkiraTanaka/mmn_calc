import { Kotsu } from './kotsu';

/**
 *  槓子クラス
 */
export abstract class Kantsu extends Kotsu {
  /* 上がり形取得 */
  public getAgariType(): string {
    return "";
  }
  /* 牌数取得 */
  public getHaiCount(): number {
    return 3;
  }
}