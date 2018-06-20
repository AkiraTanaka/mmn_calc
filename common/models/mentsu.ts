import { Hai } from './hai';

/**
 *  面子クラス
 */
export abstract class Mentsu {
  public static TANKI = "単騎";
  public static SYABO = "シャボ";
  public static PENTYAN = "ペンチャン";
  public static KANTYAN = "カンチャン";
  public static RYANMEN = "リャンメン";

  protected haiList: Array<Hai>;		// 牌一覧
  protected haiNumList: Array<number>;		// 牌順序一覧
  protected type: string;		// 面子タイプ
  protected hu: number;		// 符
  protected nakiFlg: boolean;		// 鳴きフラグ

  /**
   * コンストラクタ
   * @param haiList 牌一覧
   * @param haiNumList 牌順序一覧
   */
  public constructor(haiList: Array<Hai>, haiNumList: Array<number>) {
    this.haiList = haiList;
    this.haiNumList = haiNumList;
    this.nakiFlg = this.haiList.some(hai => hai.isNaki());
  }

  /* 符取得 */
  public abstract getHu(): number;
  /* 上がり形取得 */
  public abstract getAgariType(): string;

  /* 字牌判定 */
  public isJihai(): boolean {
    return this.haiList.every(hai => hai.isJihai());
  }
  /* 么九牌判定 */
  public isYaochu(): boolean {
    return this.haiList.some(hai => hai.isYaoChu());
  }
  /* 上がり判定 */
  public isAgari(): boolean {
    return this.haiList.some(hai => hai.isAgari());
  }

  /* 牌タイプ取得 */
  public getHaiType(): string {
    return this.haiList[0].getTypeName();
  }
  /* メンツID取得 */
  public getMentsuId(): string {
    return this.haiList.join("");
  }

  /* 牌一覧取得 */
  public getHaiList(): Array<Hai> {
    return this.haiList;
  }
  /* 牌順序一覧取得 */
  public getHaiNumList(): Array<number> {
    return this.haiNumList;
  }
  /* 牌数取得 */
  public getHaiCount(): number {
    return this.haiList.length;
  }
}