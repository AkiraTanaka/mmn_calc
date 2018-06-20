import { BaseYakuJudge } from './baseYakuJudge';
import { Yaku } from '../models/yaku';
import { CombMentsu } from '../models/combMentsu';
import { Kotsu } from '../models/mentsu/kotsu';
import { YakuMan } from '../yakuMan';

/**
 *  役牌判定クラス
 */
export class YakuhaiJudge extends BaseYakuJudge {
  /**
   * 役判定
   * @param combMentsu 組み合わせメンツ
   * @return 役一覧
   */
  protected judgeYaku(combMentsu: CombMentsu): Array<Yaku> {
    let yakuList = new Array<Yaku>();
    let kotsuList = combMentsu.getMentsuListByClass(Kotsu);
    kotsuList.forEach(kotsu => {
      if (kotsu.isJihai()) {
        yakuList.push(YakuMan.YAKU_HAI);
      }
    });
    return yakuList;
  }
}