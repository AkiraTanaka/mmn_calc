import { BaseYakuJudge } from './baseYakuJudge';
import { Yaku } from '../models/yaku';
import { CombMentsu } from '../models/combMentsu';
import { HaiMan } from '../HaiMan';
import { YakuMan } from '../yakuMan';

/**
 *  索子判定クラス
 */
export class SouzuJudge extends BaseYakuJudge {
  private BENI_HAI_LIST = [
    HaiMan.SOU1, HaiMan.SOU5, HaiMan.SOU7, HaiMan.SOU9, HaiMan.TYUN
  ];
  private RYU_HAI_LIST = [
    HaiMan.SOU2, HaiMan.SOU3, HaiMan.SOU4, HaiMan.SOU6, HaiMan.SOU8, HaiMan.HATSU
  ];

  /**
   * 役判定
   * @param combMentsu 組み合わせメンツ
   * @return 役一覧
   */
  protected judgeYaku(combMentsu: CombMentsu): Array<Yaku> {
    let yakuList = new Array<Yaku>();
    let haiList = combMentsu.getHaiList();
    if (haiList.every(hai => this.BENI_HAI_LIST.some(beni => beni.getName() == hai.getName()))){
      yakuList.push(YakuMan.BENI_KUJAKU);
    } 
    if (haiList.every(hai => this.RYU_HAI_LIST.some(beni => beni.getName() == hai.getName()))){
      yakuList.push(YakuMan.RYU_I_SO);
    }
    return yakuList;
  }
}