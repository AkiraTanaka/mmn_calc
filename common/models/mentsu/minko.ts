import { Kotsu } from './kotsu';

/**
 *  明刻クラス
 */
export class Minko extends Kotsu {
  /* 符取得 */
  public getHu(): number {
    return this.isYaochu() ? 4 : 2;
  }
}