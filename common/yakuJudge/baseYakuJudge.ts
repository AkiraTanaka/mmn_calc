import { Yaku } from '../models/yaku';
import { CombMentsu } from '../models/combMentsu';

/**
 *  ベース役判定クラス
 */
export abstract class BaseYakuJudge {
  /**
   * 役判定
   * @param combMentsu 組み合わせメンツ
   * @return 判定回数
   */
  public judge(combMentsu: CombMentsu) {
    let yakuList = this.judgeYaku(combMentsu);
    combMentsu.addYakuList(yakuList);
  }

  /**
   * 役判定
   * @param combMentsu 組み合わせメンツ
   * @return 役一覧
   */
  protected abstract judgeYaku(combMentsu: CombMentsu): Array<Yaku>;
}