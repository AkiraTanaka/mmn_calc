import { CombMentsu } from './models/combMentsu';

import { BaseYakuJudge } from './yakuJudge/baseYakuJudge';
import { KokushiJudge } from './yakuJudge/kokushiJudge';
import { ChitoiJudge } from './yakuJudge/chitoiJudge';
import { TanyaoJudge } from './yakuJudge/tanyaoJudge';
import { YakuhaiJudge } from './yakuJudge/yakuhaiJudge';
import { KotsuJudge } from './yakuJudge/kotsuJudge';
import { PecoJudge } from './yakuJudge/pecoJudge';
import { SometeJudge } from './yakuJudge/someteJudge';
import { SanshikiJudge } from './yakuJudge/sanshikiJudge';
import { SouzuJudge } from './yakuJudge/souzuJudge';
import { SangenJudge } from './yakuJudge/sangenJudge';
import { SuushiJudge } from './yakuJudge/suushiJudge';
import { TyantaJudge } from './yakuJudge/tyantaJudge';
import { RoutouJudge } from './yakuJudge/routouJudge';
import { IttsuuJudge } from './yakuJudge/ittsuuJudge';
import { PinhuJudge } from './yakuJudge/pinhuJudge';

/**
 *  点数計算クラス
 */
export class Calculator {
  private static specialYakuJudgeList: Array<BaseYakuJudge> = [
    new KokushiJudge()
  ];
  private static basicYakuJudgeList: Array<BaseYakuJudge> = [
    new ChitoiJudge(),
    new IttsuuJudge(),
    new KotsuJudge(),
    new PecoJudge(),
    new PinhuJudge(),
    new RoutouJudge(),
    new SanshikiJudge(),
    new SangenJudge(),
    new SometeJudge(),
    new SouzuJudge(),
    new SuushiJudge(),
    new TanyaoJudge(),
    new TyantaJudge(),
    new YakuhaiJudge()
  ];

  public static calculate(combMentsu: CombMentsu) {
    let haiList = combMentsu.getHaiList();
    if (haiList.length >= 14) {
      // ①特殊形の合致
      this.specialYakuJudgeList.forEach(yakuJudge => yakuJudge.judge(combMentsu));
      if (combMentsu.getYakuList().length == 0) {
        // ②基本役の合致
        this.basicYakuJudgeList.forEach(yakuJudge => yakuJudge.judge(combMentsu));
      }
    }
    // 役満がある場合、役満以下の役は切り捨て
    let yakuList = combMentsu.getYakuList();
    let yakumanList = yakuList.filter(yaku => yaku.isYakuman());
    if (yakumanList.length > 0) {
      combMentsu.setYakuList(yakumanList);
    }
  }

}