import { BaseYakuJudge } from './baseYakuJudge';
import { Yaku } from '../models/yaku';
import { CombMentsu } from '../models/combMentsu';
import { Shuntsu } from '../models/mentsu/shuntsu';
import { YakuMan } from '../yakuMan';
import { Mentsu } from '../models/mentsu';

/**
 *  平和判定クラス
 */
export class PinhuJudge extends BaseYakuJudge {
  /**
   * 役判定
   * @param combMentsu 組み合わせメンツ
   * @return 役一覧
   */
  protected judgeYaku(combMentsu: CombMentsu): Array<Yaku> {
    let yakuList = new Array<Yaku>();
    if (combMentsu.isNaki() == false) {      
      let shuntsuList = combMentsu.getMentsuListByClass(Shuntsu);
      let isPinhu = shuntsuList.some(mentsu => mentsu.getAgariType() == Mentsu.RYANMEN);
      if (shuntsuList.length == 4 && isPinhu){
        yakuList.push(YakuMan.PINHU);
      }
    }
    return yakuList;
  }
}