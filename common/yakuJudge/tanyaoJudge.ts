import { BaseYakuJudge } from './baseYakuJudge';
import { Yaku } from '../models/yaku';
import { CombMentsu } from '../models/combMentsu';
import { YakuMan } from '../yakuMan';

/**
 *  断么九判定クラス
 */
export class TanyaoJudge extends BaseYakuJudge {
  /**
   * 役判定
   * @param combMentsu 組み合わせメンツ
   * @return 役一覧
   */
  protected judgeYaku(combMentsu: CombMentsu): Array<Yaku> {
    let yakuList = new Array<Yaku>();
    let haiList = combMentsu.getHaiList();
    if (haiList.some(hai => hai.isYaoChu()) == false){
      yakuList.push(YakuMan.TANYAO);
    }
    return yakuList;
  }
}