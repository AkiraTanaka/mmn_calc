import { BaseYakuJudge } from './baseYakuJudge';
import { Yaku } from '../models/yaku';
import { CombMentsu } from '../models/combMentsu';
import { Shuntsu } from '../models/mentsu/shuntsu';
import { YakuMan } from '../yakuMan';

/**
 *  一通判定クラス
 */
export class IttsuuJudge extends BaseYakuJudge {
  /**
   * 役判定
   * @param combMentsu 組み合わせメンツ
   * @return 役一覧
   */
  protected judgeYaku(combMentsu: CombMentsu): Array<Yaku> {
    let yakuList = new Array<Yaku>();
    let shuntsuList = combMentsu.getMentsuListByClass(Shuntsu);
    if (shuntsuList.length > 0) {
      let haiTypeMap = new Map<string, Array<string>>();
      shuntsuList.forEach(shuntsu => {
        let haiType = shuntsu.getHaiType();
        let mentsuCodeId = shuntsu.getHaiList().map(hai => hai.getCode()).join("");
        if (mentsuCodeId == "123" || mentsuCodeId == "456" || mentsuCodeId == "789") {
          if (haiTypeMap.has(haiType) == false) {
            let mentsuIdList = new Array<string>();
            haiTypeMap.set(haiType, mentsuIdList);
          } 
          if (haiTypeMap.get(haiType).some(id => id == mentsuCodeId) == false) {
            haiTypeMap.get(haiType).push(mentsuCodeId);
          }
        }
      });
      haiTypeMap.forEach(mentsuIdList => {
        if (mentsuIdList.length == 3) {
          yakuList.push(YakuMan.ITSUU);
        }
      });
    }
    return yakuList;
  }
}