import { BaseYakuJudge } from './baseYakuJudge';
import { Yaku } from '../models/yaku';
import { CombMentsu } from '../models/combMentsu';
import { YakuMan } from '../yakuMan';
import { Toitsu } from '../models/mentsu/toitsu';

/**
 *  七対子判定クラス
 */
export class ChitoiJudge extends BaseYakuJudge {
  /**
   * 役判定
   * @param combMentsu 組み合わせメンツ
   * @return 役一覧
   */
  protected judgeYaku(combMentsu: CombMentsu): Array<Yaku> {
    let yakuList = new Array<Yaku>();
    let mentsuList = combMentsu.getMentsuList();
    if (mentsuList.every(mentsu => mentsu instanceof Toitsu)) {
      if (mentsuList.every(mentsu => mentsu.isJihai())) {
        yakuList.push(YakuMan.DAI_CHI_SEI);
      } else {
        yakuList.push(YakuMan.CHI_TOI);
      }
    }
    return yakuList;
  }
}