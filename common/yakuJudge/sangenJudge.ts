import { BaseYakuJudge } from './baseYakuJudge';
import { Hai } from '../models/hai';
import { Yaku } from '../models/yaku';
import { CombMentsu } from '../models/combMentsu';
import { Kotsu } from '../models/mentsu/kotsu';
import { YakuMan } from '../yakuMan';

/**
 *  三元判定クラス
 */
export class SangenJudge extends BaseYakuJudge {
  /**
   * 役判定
   * @param combMentsu 組み合わせメンツ
   * @return 役一覧
   */
  protected judgeYaku(combMentsu: CombMentsu): Array<Yaku> {
    let yakuList = new Array<Yaku>();
    let sangenMentsuList = combMentsu.getMentsuList().filter(mentsu => mentsu.getHaiType() == Hai.TYPE_SANGEN);
    if (sangenMentsuList.length == 3) {
      let ankoLength = sangenMentsuList.filter(mentsu => mentsu instanceof Kotsu).length;
      // 役設定
      switch (ankoLength) {
        case 3:
          yakuList.push(YakuMan.DAI_SAN_GEN);
          break;
        case 2:
          yakuList.push(YakuMan.SHOU_SAN_GEN);
          break;
        default:
          break;
      }
    }
    return yakuList;
  }
}