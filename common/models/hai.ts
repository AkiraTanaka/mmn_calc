import { HaiMan } from "../HaiMan";

/**
 *  牌クラス
 */
export class Hai {
  public static TYPE_MANZU = "萬子";
  public static TYPE_PINZU = "筒子";
  public static TYPE_SOUZU = "索子";
  public static TYPE_KAZEHAI = "風牌";
  public static TYPE_SANGEN = "三元";

  private id: string;		// 牌ID
  private name: string;  // 牌名
  private agariFlg: boolean = false;  // 上がり牌フラグ
  private nakiFlg: boolean = false;  // 鳴き牌フラグ

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  /* クローン作成 */
  public static deepCopy(hai: Hai): Hai {
    return new Hai(hai.getId(), hai.getName());
  }

  /* 牌ID取得 */
  public getId(): string {
    return this.id;
  }
  /* 牌名取得 */
  public getName(): string {
    return this.name;
  }
  /* 上がり牌フラグ取得 */
  public isAgari(): boolean {
    return this.agariFlg;
  }
  /* 上がり牌フラグ設定 */
  public setAgariFlg(agariFlg: boolean) {
    this.agariFlg = agariFlg;
  }
  /* 鳴き牌フラグ取得 */
  public isNaki(): boolean {
    return this.nakiFlg;
  }
  /* 鳴き牌フラグ設定 */
  public setNakiFlg(nakiFlg: boolean) {
    this.nakiFlg = nakiFlg;
  }
  /* 牌コード取得 */
  public getCode(): string {
    return this.id.substr(2, 1);
  }
  /* 字牌フラグ取得 */
  public isJihai(): boolean {
    let jihaiFlg:boolean = false;
    if (this.id.substr(0, 1) == "1") {
      jihaiFlg = true;
    }
    return jihaiFlg;
  }
  /* 么九牌フラグ取得 */
  public isYaoChu(): boolean {
    return HaiMan.YAOCHU_HAI_LIST.some(hai => hai.getId() == this.id);
  }
  /* 牌タイプ取得 */
  public getType(): string {
    return this.id.substr(1, 1);
  }
  /* 牌タイプ名取得 */
  public getTypeName(): string {
    let type:string = "";
    switch (this.getType()) {
      case "1":
        type = Hai.TYPE_MANZU;
        break;
      case "2":
        type = Hai.TYPE_PINZU;
        break;
      case "3":
        type = Hai.TYPE_SOUZU;
        break;
      case "a":
        type = Hai.TYPE_KAZEHAI;
        break;
      case "b":
        type = Hai.TYPE_SANGEN;
        break;
    }
    return type;
  }
  
  /* 牌画像パス取得 */
  public getPngPath(): string {
    return "assets/imgs/hai/" + this.id + ".png";
  }
  /* 画面表示用クラス名取得 */
  public getVisualClass(): string {
    return this.nakiFlg ? "yoko" : "";
  }
  /* 表示文字列取得 */
  public toString(): string  {
    return this.name;
  }
}