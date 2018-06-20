import { BaseYakuJudge } from './baseYakuJudge';
import { Yaku } from '../models/yaku';
import { CombMentsu } from '../models/combMentsu';
import { YakuMan } from '../yakuMan';

/**
 *  全帯幺九判定クラス
 */
export class TyantaJudge extends BaseYakuJudge {
  /**
   * 役判定
   * @param combMentsu 組み合わせメンツ
   * @return 役一覧
   */
  protected judgeYaku(combMentsu: CombMentsu): Array<Yaku> {
    let yakuList = new Array<Yaku>();
    let tyantaFlg = combMentsu.getMentsuList().every(mentsu => 
                          mentsu.getHaiList().some(hai => hai.isYaoChu()));
    if (tyantaFlg) {
      if(combMentsu.getHaiList().some(hai => hai.isJihai())) {
        yakuList.push(YakuMan.TYANTA);
      } else {
        yakuList.push(YakuMan.JUN_TYAN);
      }
    }
    return yakuList;
  }
}