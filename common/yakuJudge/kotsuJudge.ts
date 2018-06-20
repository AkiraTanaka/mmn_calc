import { BaseYakuJudge } from './baseYakuJudge';
import { Yaku } from '../models/yaku';
import { Mentsu } from '../models/mentsu';
import { CombMentsu } from '../models/combMentsu';
import { Anko } from '../models/mentsu/anko';
import { Ankan } from '../models/mentsu/ankan';
import { Kantsu } from '../models/mentsu/kantsu';
import { Kotsu } from '../models/mentsu/kotsu';
import { YakuMan } from '../yakuMan';

/**
 *  刻子判定クラス
 */
export class KotsuJudge extends BaseYakuJudge {
  /**
   * 役判定
   * @param combMentsu 組み合わせメンツ
   * @return 役一覧
   */
  protected judgeYaku(combMentsu: CombMentsu): Array<Yaku> {
    let yakuList = new Array<Yaku>();
    // 槓子判定
    let kantsuList = combMentsu.getMentsuListByClass(Kantsu);
    switch (kantsuList.length) {
      case 4:
        yakuList.push(YakuMan.SU_KANTSU);
        return yakuList;
      case 3:
        yakuList.push(YakuMan.SAN_KANTSU);
        break;
      default:
        break;
    }
    // 暗刻判定
    let ankoList = combMentsu.getMentsuListByClass(Anko);
    ankoList.concat(combMentsu.getMentsuListByClass(Ankan));
    switch (ankoList.length) {
      case 4:
        if(combMentsu.getAgariMentsu().getAgariType() == Mentsu.TANKI) {
          yakuList.push(YakuMan.SU_TAN);
        } else {
          yakuList.push(YakuMan.SU_ANKO);
        }
        // 四暗刻はトイトイと重複しないため、リターン
        return yakuList;
      case 3:
        yakuList.push(YakuMan.SAN_ANKO);
        break;
      default:
        break;
    }
    // トイトイ判定
    let kotsuList = combMentsu.getMentsuListByClass(Kotsu);
    if (kotsuList.length == 4) {
      yakuList.push(YakuMan.TOI_TOI);
    }
    return yakuList;
  }
}