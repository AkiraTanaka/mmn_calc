import { Mentsu } from '../mentsu';

/**
 *  順子クラス
 */
export abstract class Shuntsu extends Mentsu {
  /* 符取得 */
  public getHu(): number {
    let hu = 0;
    let agariType = this.getAgariType();
    if (agariType == Mentsu.KANTYAN || agariType == Mentsu.PENTYAN) {
      hu += 2;
    }
    return hu;
  }
  
  /* 上がり形取得 */
  public getAgariType(): string {
    if (this.isAgari()) {
      let haiList = this.haiList;
      if (haiList[1].isAgari()) {
        return Mentsu.KANTYAN;
      } else if (haiList.some(hai => hai.isAgari() == false && hai.isYaoChu())) {
        return Mentsu.PENTYAN;
      } else {
        return Mentsu.RYANMEN;
      }
    }
    return "";
  }
}