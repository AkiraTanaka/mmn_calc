import { BaseYakuJudge } from './baseYakuJudge';
import { Yaku } from '../models/yaku';
import { CombMentsu } from '../models/combMentsu';
import { YakuMan } from '../yakuMan';

/**
 *  老頭判定クラス
 */
export class RoutouJudge extends BaseYakuJudge {

  /**
   * 役判定
   * @param combMentsu 組み合わせメンツ
   * @return 役一覧
   */
  protected judgeYaku(combMentsu: CombMentsu): Array<Yaku> {
    let yakuList = new Array<Yaku>();
    let haiList = combMentsu.getHaiList();
    if (haiList.every(hai => hai.isYaoChu())) {
      if(combMentsu.getHaiList().some(hai => hai.isJihai())) {
        yakuList.push(YakuMan.HON_ROUTOU);
      } else {
        yakuList.push(YakuMan.CHIN_ROUTOU);
      }
    }
    return yakuList;
  }
}