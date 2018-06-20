import { BaseYakuJudge } from './baseYakuJudge';
import { Hai } from '../models/hai';
import { Yaku } from '../models/yaku';
import { CombMentsu } from '../models/combMentsu';
import { Kotsu } from '../models/mentsu/kotsu';
import { YakuMan } from '../yakuMan';

/**
 *  四喜判定クラス
 */
export class SuushiJudge extends BaseYakuJudge {
  /**
   * 役判定
   * @param combMentsu 組み合わせメンツ
   * @return 役一覧
   */
  protected judgeYaku(combMentsu: CombMentsu): Array<Yaku> {
    let yakuList = new Array<Yaku>();
    let kazeMentsuList = combMentsu.getMentsuList().filter(mentsu => mentsu.getHaiType() == Hai.TYPE_KAZEHAI);
    if (kazeMentsuList.length == 4) {
      let ankoLength = kazeMentsuList.filter(mentsu => mentsu instanceof Kotsu).length;
      // 役設定
      switch (ankoLength) {
        case 4:
          yakuList.push(YakuMan.DAI_SUU_SHI);
          break;
        case 3:
          yakuList.push(YakuMan.SHOU_SUU_SHI);
          break;
        default:
          break;
      }
    }
    return yakuList;
  }
}