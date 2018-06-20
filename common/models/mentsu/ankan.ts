import { Kantsu } from './kantsu';

/**
 *  暗槓クラス
 */
export class Ankan extends Kantsu {
  /* 符取得 */
  public getHu(): number {
    return this.isYaochu() ? 16 : 8;
  }
}