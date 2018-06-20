import { Kotsu } from './kotsu';

/**
 *  暗刻クラス
 */
export class Anko extends Kotsu {
  /* 符取得 */
  public getHu(): number {
    return this.isYaochu() ? 8 : 4;
  }
}