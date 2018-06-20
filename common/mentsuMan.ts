import { Toitsu } from './models/mentsu/toitsu';
import { Mentsu } from './models/mentsu';
import { Hai } from './models/hai';
import { Minko } from './models/mentsu/minko';
import { Anko } from './models/mentsu/anko';
import { MinShun } from './models/mentsu/minshun';
import { AnShun } from './models/mentsu/anshun';

/**
 *  面子管理クラス
 */
export class MentsuMan {
  /**
   * インスタンス取得
   * @param haiList 牌一覧
   * @param haiNumList 牌順序一覧
   * @returns メンツクラスインスタンス
   */
  public static getInstance(haiList: Array<Hai>, haiNumList: Array<number>): Mentsu {
    if (haiList != null) {
      let nakiFlg = haiList.some(hai => hai.isNaki());
      if (this.isShuntsu(haiList)) {
        if (nakiFlg) {
          return new MinShun(haiList, haiNumList);
        } else {
          return new AnShun(haiList, haiNumList);
        }
      } else if (this.isKotsu(haiList)) {
        if (nakiFlg) {
          return new Minko(haiList, haiNumList);
        } else {
          return new Anko(haiList, haiNumList);
        }
      } else if (this.isToitsu(haiList)) {
        return new Toitsu(haiList, haiNumList);
      }
    }
    return null;
  }

  /**
   * 順子判定処理
   * @param haiList 牌一覧
   * @returns 判定結果
   */
  private static isShuntsu(haiList: Array<Hai>): boolean {
    let result = false;
    if(haiList.every(hai => hai.isJihai() == false) && haiList.length == 3) {
      let type = haiList[0].getTypeName();
      if (haiList.every(hai => hai.getTypeName() == type)) {
        result = true;
        let oldHaiNum: number = -1;
        haiList.forEach(hai => {
          let haiNum = parseInt(hai.getCode());
          if (oldHaiNum != -1 && (haiNum - oldHaiNum) != 1) {
            result = false;
          }
          oldHaiNum = haiNum;
        });
      }
    }
    return result;
  }

  /**
   * 刻子判定処理
   * @param haiList 牌一覧
   * @returns 判定結果
   */
  private static isKotsu(haiList: Array<Hai>): boolean {
    let result = false;
    if(haiList.length == 3) {
      let type = haiList[0].getTypeName();
      if (haiList.every(hai => hai.getTypeName() == type)) {
        result = true;
        let oldHaiCode = null;
        haiList.forEach(hai => {
          if (oldHaiCode != null && hai.getCode() != oldHaiCode) {
            result = false;
          }
          oldHaiCode = hai.getCode();
        });
      }
    }
    return result;
  }

  /**
   * 対子判定処理
   * @param haiList 牌一覧
   * @returns 判定結果
   */
  private static isToitsu(haiList: Array<Hai>): boolean {
    let result = false;
    if(haiList.length == 2) {
      let type = haiList[0].getTypeName();
      if (haiList.every(hai => hai.getTypeName() == type)) {
        result = true;
        let oldHaiCode = null;
        haiList.forEach(hai => {
          if (oldHaiCode != null && hai.getCode() != oldHaiCode) {
            result = false;
          }
          oldHaiCode = hai.getCode();
        });
      }
    }
    return result;
  }
}