import { Kantsu } from './kantsu';

/**
 *  明槓クラス
 */
export class Minkan extends Kantsu {
  /* 符取得 */
  public getHu(): number {
    return this.isYaochu() ? 8 : 4;
  }
}