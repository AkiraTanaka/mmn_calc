import { Mentsu } from '../mentsu';

/**
 *  対子クラス
 */
export class Toitsu extends Mentsu {
  /* 符取得 */
  public getHu(): number {
    let hu = 0;
    if (this.isJihai()) {
      // 蓮風対子?1
      hu = 2;
    }
    if (this.getAgariType() == Mentsu.TANKI) {
      hu += 2;
    }
    return hu;
  }

  /* 上がり形取得 */
  public getAgariType(): string {
    if (this.isAgari()) {
      return Mentsu.TANKI;
    }
    return "";
  }
}