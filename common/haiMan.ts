import { Hai } from './models/hai';

/**
 *  牌管理クラス
 */
export class HaiMan {
  public static MAN1 = new Hai("011", "１萬");
  public static MAN2 = new Hai("012", "２萬");
  public static MAN3 = new Hai("013", "３萬");
  public static MAN4 = new Hai("014", "４萬");
  public static MAN5 = new Hai("015", "５萬");
  public static MAN6 = new Hai("016", "６萬");
  public static MAN7 = new Hai("017", "７萬");
  public static MAN8 = new Hai("018", "８萬");
  public static MAN9 = new Hai("019", "９萬");

  public static PIN1 = new Hai("021", "１筒");
  public static PIN2 = new Hai("022", "２筒");
  public static PIN3 = new Hai("023", "３筒");
  public static PIN4 = new Hai("024", "４筒");
  public static PIN5 = new Hai("025", "５筒");
  public static PIN6 = new Hai("026", "６筒");
  public static PIN7 = new Hai("027", "７筒");
  public static PIN8 = new Hai("028", "８筒");
  public static PIN9 = new Hai("029", "９筒");
  
  public static SOU1 = new Hai("031", "１索");
  public static SOU2 = new Hai("032", "２索");
  public static SOU3 = new Hai("033", "３索");
  public static SOU4 = new Hai("034", "４索");
  public static SOU5 = new Hai("035", "５索");
  public static SOU6 = new Hai("036", "６索");
  public static SOU7 = new Hai("037", "７索");
  public static SOU8 = new Hai("038", "８索");
  public static SOU9 = new Hai("039", "９索");

  public static TON = new Hai("1aA", "東");
  public static NAN = new Hai("1aB", "西");
  public static SYA = new Hai("1aC", "南");
  public static PE = new Hai("1aD", "北");
  public static HAKU = new Hai("1bE", "白");
  public static HATSU = new Hai("1bF", "發");
  public static TYUN = new Hai("1bG", "中");

  /** 么九牌一覧 */
  public static YAOCHU_HAI_LIST: Array<Hai> = [
    HaiMan.MAN1, HaiMan.MAN9, HaiMan.PIN1, HaiMan.PIN9, HaiMan.SOU1, HaiMan.SOU9
    , HaiMan.TON, HaiMan.NAN, HaiMan.SYA, HaiMan.PE, HaiMan.HAKU, HaiMan.HATSU, HaiMan.TYUN
  ];

  /** 牌タイプ一覧 */
  public static ALL_HAI_TYPE_LIST: Array<Hai> = [
    HaiMan.MAN1, HaiMan.MAN2, HaiMan.MAN3, HaiMan.MAN4, HaiMan.MAN5
    , HaiMan.MAN6, HaiMan.MAN7, HaiMan.MAN8, HaiMan.MAN9                // 1:萬
    , HaiMan.PIN1, HaiMan.PIN2, HaiMan.PIN3, HaiMan.PIN4, HaiMan.PIN5
    , HaiMan.PIN6, HaiMan.PIN7, HaiMan.PIN8, HaiMan.PIN9                // 2:筒
    , HaiMan.SOU1, HaiMan.SOU2, HaiMan.SOU3, HaiMan.SOU4, HaiMan.SOU5
    , HaiMan.SOU6, HaiMan.SOU7, HaiMan.SOU8, HaiMan.SOU9                // 3:索
    , HaiMan.TON, HaiMan.NAN, HaiMan.SYA, HaiMan.PE                     // a:風牌
    , HaiMan.HAKU, HaiMan.HATSU, HaiMan.TYUN                            // b:三元牌
  ];

  // private ALL_HAI_TYPE_LIST: Array<Hai> = new Array<Hai>();
  private ALL_HAI_LIST: Array<Hai> = new Array<Hai>();

  constructor() {
    this.init();
  }

  /* public */
  /**
   * 牌IDから牌を取得
   * @param id 牌ID
   */
  public static getHaiById(id: string): Hai {
    return HaiMan.ALL_HAI_TYPE_LIST.find(hai => hai.getId() == id);
  }

  /**
   * 牌タイプ・コードから牌を取得
   * @param type 牌タイプ
   * @param code 牌コード
   */
  public static getHaiByTypeCode(type: string, code: string): Hai {
    return HaiMan.ALL_HAI_TYPE_LIST.find(hai => (hai.getType() == type && hai.getCode() == code));
  }

  /**
   * 牌タイプ名ごとの牌一覧を取得
   * @param typeName 牌タイプ名
   */
  public static getHaiListByTypeName(typeName: string): Array<Hai> {
    let haiList: Array<Hai> = HaiMan.ALL_HAI_TYPE_LIST.filter(hai => {
      return hai.getTypeName() == typeName;
    });
    return haiList;
  }

  /**
   * 字牌タイプ一覧を取得
   */
  public static getJihaiList(): Array<Hai> {
    let haiList: Array<Hai> = HaiMan.ALL_HAI_TYPE_LIST.filter(hai => {
      return hai.isJihai() == true;
    });
    return haiList;
  }

  /* private */
  private init() {
    // 4枚ずつ
    HaiMan.ALL_HAI_TYPE_LIST.forEach(hai => {
      for (let i = 0; i < 4; i++) {
        this.ALL_HAI_LIST.push(hai);
      }
    });
  }
}