import { BaseYakuJudge } from './baseYakuJudge';
import { HaiMan } from '../HaiMan';

import { Yaku } from '../models/yaku';
import { CombMentsu } from '../models/combMentsu';
import { YakuMan } from '../yakuMan';


/**
 *  国士無双判定クラス
 */
export class KokushiJudge extends BaseYakuJudge {
  /**
   * 役判定
   * @param combMentsu 組み合わせメンツ
   * @return 役一覧
   */
  protected judgeYaku(combMentsu: CombMentsu): Array<Yaku> {
    let yakuList = new Array<Yaku>();
    let haiList = combMentsu.getHaiList();
    let agariFlg = true;
    HaiMan.YAOCHU_HAI_LIST.forEach(yaoHai => {
      if(haiList.some(hai => hai.getId() == yaoHai.getId()) == false) {
        agariFlg = false;
      }
    });
    if (haiList.every(hai => hai.isYaoChu()) == false) {
      agariFlg = false;
    }

    if (agariFlg) {
      yakuList.push(YakuMan.KOKUSHI);
    }
    return yakuList;
  }
}