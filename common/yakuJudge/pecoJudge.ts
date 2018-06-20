import { BaseYakuJudge } from './baseYakuJudge';
import { Mentsu } from '../models/mentsu';
import { Yaku } from '../models/yaku';
import { CombMentsu } from '../models/combMentsu';
import { AnShun } from '../models/mentsu/anshun';
import { YakuMan } from '../yakuMan';

/**
 *  盃口判定クラス
 */
export class PecoJudge extends BaseYakuJudge {
  /**
   * 役判定
   * @param combMentsu 組み合わせメンツ
   * @return 役一覧
   */
  protected judgeYaku(combMentsu: CombMentsu): Array<Yaku> {
    let yakuList = new Array<Yaku>();
    let shuntsuList = combMentsu.getMentsuListByClass(AnShun);
    if (shuntsuList.length > 0) {
      let mentsuIdMap = new Map<string, Array<Mentsu>>();
      shuntsuList.forEach(shuntsu => {
        let mentsuId = shuntsu.getMentsuId();
        if (mentsuIdMap.has(mentsuId)) {
          mentsuIdMap.get(mentsuId).push(shuntsu);
        } else {
          let mentsuList = new Array<Mentsu>();
          mentsuList.push(shuntsu);
          mentsuIdMap.set(mentsuId, mentsuList);
        }
      });
      let pecoCount = 0;
      mentsuIdMap.forEach(mentsuList => {
        if(mentsuList.length == 2) {
          pecoCount++;
        }
      });

      // 役設定
      switch (pecoCount) {
        case 1:
          yakuList.push(YakuMan.I_PECO);
          break;
        case 2:
          yakuList.push(YakuMan.RYAN_PECO);
          break;
        default:
          break;
      }
    }
    return yakuList;
  }
}