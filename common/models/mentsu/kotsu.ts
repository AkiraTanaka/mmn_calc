import { Mentsu } from '../mentsu';

/**
 *  刻子クラス
 */
export abstract class Kotsu extends Mentsu {
  /* 上がり形取得 */
  public getAgariType(): string {
    if (this.isAgari()) {
      return Mentsu.SYABO;
    }
    return "";
  }
}