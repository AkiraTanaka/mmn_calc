import { BaseYakuJudge } from './baseYakuJudge';
import { Yaku } from '../models/yaku';
import { CombMentsu } from '../models/combMentsu';
import { YakuMan } from '../yakuMan';
import { Kotsu } from '../models/mentsu/kotsu';
import { Shuntsu } from '../models/mentsu/shuntsu';

/**
 *  三色判定クラス
 */
export class SanshikiJudge extends BaseYakuJudge {
  /**
   * 役判定
   * @param combMentsu 組み合わせメンツ
   * @return 役一覧
   */
  protected judgeYaku(combMentsu: CombMentsu): Array<Yaku> {
    let yakuList = new Array<Yaku>();
    let haiCodeMap = new Map<string, Set<string>>();
    combMentsu.getMentsuList().forEach(mentsu => {
      if (mentsu instanceof Kotsu || mentsu instanceof Shuntsu) {
        let haiCodeStr = mentsu.getHaiList().map(hai => hai.getCode()).join("");
        if (haiCodeMap.has(haiCodeStr) == false) {
          let typeSet = new Set<string>();
          haiCodeMap.set(haiCodeStr, typeSet);
        }
        let haiType = mentsu.getHaiType();
        if (haiCodeMap.get(haiCodeStr).has(haiType) == false) {
          haiCodeMap.get(haiCodeStr).add(haiType);
        }
      }
    });
    haiCodeMap.forEach((typeList, haiCode) => {
      if (typeList.size == 3) {
        if (haiCode[0] == haiCode[1]) {
          yakuList.push(YakuMan.SANSHIKI_DOUKO);
        } else {
          yakuList.push(YakuMan.SANSHIKI_DOUJUN);
        }
      }
    });
    return yakuList;
  }
}