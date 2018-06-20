import { BaseYakuJudge } from './baseYakuJudge';
import { Yaku } from '../models/yaku';
import { CombMentsu } from '../models/combMentsu';
import { YakuMan } from '../yakuMan';

/**
 *   染め手判定クラス
 */
export class SometeJudge extends BaseYakuJudge {
  private CHUREN_HAI_CODE_LIST = [
    "1", "1", "1", "2", "3", "4", "5", "6", "7", "8", "9", "9", "9" 
  ];

  /**
   * 役判定
   * @param combMentsu 組み合わせメンツ
   * @return 役一覧
   */
  protected judgeYaku(combMentsu: CombMentsu): Array<Yaku> {
    let haiList = combMentsu.getHaiList();
    let typeSet = new Set<string>();
    // 牌種別を分ける
    haiList.forEach(hai => { 
      let type = hai.isJihai() ? "字牌" : hai.getType();
      if(typeSet.has(type) == false) {
        typeSet.add(type);
      }
    });
    let yakuList = new Array<Yaku>();
    switch (typeSet.size) {
      case 1:
        if (typeSet.has("字牌")) {
          yakuList.push(YakuMan.TSU_I_SO);
        } else {
          // チュウレン判定
          // if (condition) {
            
          // } else {
            yakuList.push(YakuMan.CHINITSU);
          // }
        }
        break;
      case 2:
        if (typeSet.has("字牌")) {
          yakuList.push(YakuMan.HONNITSU);
        }
        break;
      default:
        break;
    }
    return yakuList;
  }
}