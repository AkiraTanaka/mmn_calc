import { Yaku } from './models/yaku';

/**
 *  役管理クラス
 */
export class YakuMan {
  /** 1飜 */
  public static TANYAO = new Yaku("断么九", "タンヤオ", 1, false);
  public static PINHU = new Yaku("平和", "ピンフ", 1, false);
  public static I_PECO = new Yaku("一盃口", "イーペーコー", 1, false);
  public static YAKU_HAI = new Yaku("役牌", "ヤクハイ", 1, false);
  /** 2飜 */
  public static CHI_TOI = new Yaku("七対子", "チートイツ", 2, false); // 未
  public static ITSUU = new Yaku("一気通貫", "イッキツウカン", 2, true);
  public static TOI_TOI = new Yaku("対々和", "トイトイホー", 2, false);
  public static SAN_ANKO = new Yaku("三暗刻", "サンアンコウ", 2, false);
  public static SAN_KANTSU = new Yaku("三槓子", "サンカンツ", 2, false);
  public static SHOU_SAN_GEN = new Yaku("小三元", "ショウサンゲン", 2, false);
  public static SANSHIKI_DOUJUN = new Yaku("三色同順", "サンショクドウジュン", 2, true);
  public static SANSHIKI_DOUKO = new Yaku("三色同刻", "サンショクドウコウ", 2, true);
  public static TYANTA = new Yaku("混全帯幺九", "チャンタ", 2, true);
  /** 3飜 */
  public static RYAN_PECO = new Yaku("二盃口", "リャンペーコー", 3, false);
  public static JUN_TYAN = new Yaku("純全帯公九", "ジュンチャン", 3, true);
  /** 4飜 */
  public static HON_ROUTOU = new Yaku("混老頭", "ホンロウトウ", 4, true);
  public static HONNITSU = new Yaku("混一色", "ホンイーソー", 4, true);
  /** 6飜 */
  public static CHINITSU = new Yaku("清一色", "チンイーソー", 6, true);
  /** 13飜 */
  public static KOKUSHI = new Yaku("国士無双", "コクシムソウ", 13, false);
  public static SU_ANKO = new Yaku("四暗刻", "スーアンコウ", 13, false);
  public static DAI_SAN_GEN = new Yaku("大三元", "ダイサンゲン", 13, false);
  public static CHIN_ROUTOU = new Yaku("清老頭", "チンロウトウ", 13, true);
  public static TSU_I_SO = new Yaku("字一色", "ツーイーソー", 13, true);
  public static RYU_I_SO = new Yaku("緑一色", "リューイーソウ", 13, false);
  public static SHOU_SUU_SHI = new Yaku("小四喜", "ショウスーシー", 13, false);
  public static DAI_SUU_SHI = new Yaku("大四喜", "ダイスーシー", 13, false);
  public static CHUREN = new Yaku("九蓮宝燈", "チュウレンポウトウ", 13, false); // 未
  public static CHI_HO = new Yaku("地和", "チーホウ", 13, false); // 未
  public static TEN_HO = new Yaku("天和", "テンホウ", 13, false); // 未
  /** 古役 */
  public static BENI_KUJAKU = new Yaku("紅孔雀", "ベニクジャク", 13, false);
  public static DAI_CHI_SEI = new Yaku("大七星", "ダイチーセイ", 13, false); // 未
  /** 26飜 */
  public static SU_TAN = new Yaku("四暗刻単騎", "スーアンコウタンキ", 26, false);
  public static SU_KANTSU = new Yaku("四槓子", "スーカンツ", 26, false);
  public static JUNSEI_CHUREN = new Yaku("純正九蓮宝燈", "ジュンセイチュウレンポウトウ", 26, false); // 未

  /** 役一覧 */
  public static ALL_YAKU_LIST: Array<Yaku> = [
    YakuMan.PINHU
  ];
}