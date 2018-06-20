import { Hai } from './hai';
import { Yaku } from './yaku';
import { Mentsu } from './mentsu';
import { Calculator } from '../calculator';

/**
 *  面子組み合わせクラス
 */
export class CombMentsu {
  private combMentsu: Array<Mentsu> = new Array<Mentsu>(); //  メンツ組み合わせ一覧
  private haiList: Array<Hai> = new Array<Hai>();		// 牌一覧
  private yakuList: Array<Yaku> = new Array<Yaku>(); //  役一覧
  private score: number = 0; // 点数
  private total: string = ""; // 合計
  private totalHu: number = 0;		// 符合計

  constructor(combMentsu: Array<Mentsu>) {
    this.combMentsu = combMentsu;
    combMentsu.forEach(mentsu => mentsu.getHaiList().forEach(hai => this.haiList.push(hai)));
    Calculator.calculate(this);
    this.calculateHu();
    this.afterCalculate();
  }

  /* 鳴き判定 */
  public isNaki(): boolean {
    return this.haiList.some(hai => hai.isNaki());
  }
  /* 上がり形取得 */
  public getAgariMentsu(): Mentsu {
    return this.combMentsu.find(mentsu => mentsu.getAgariType() != "");
  }

  /* メンツ組み合わせ一覧取得 */
  public getMentsuList(): Array<Mentsu> {
    return this.combMentsu;
  }
  public getMentsuListByClass(clz): Array<Mentsu> {
    return this.combMentsu.filter(mentsu => mentsu instanceof clz);
  }
  /* 牌一覧取得 */
  public getHaiList(): Array<Hai> {
    return this.haiList;
  }
  /* 役一覧取得 */
  public getYakuList(): Array<Yaku> {
    return this.yakuList;
  }
  /* 役一覧追加 */
  public addYakuList(yakuList: Array<Yaku>) {
    if (yakuList != null) {
      yakuList.forEach(yaku => this.yakuList.push(yaku));
    }
  }
  /* 役一覧設定 */
  public setYakuList(yakuList: Array<Yaku>) {
    this.yakuList = yakuList;
  }
  /* 合計取得 */
  public getScore(): number {
    return this.score;
  }
  /* 飜合計取得 */
  public getTotalHan(): number {
    let totalHan = 0;
    let isNaki = this.haiList.some(hai => hai.isNaki());
    this.yakuList.forEach(yaku => totalHan += yaku.getHan(isNaki));
    return totalHan;
  }
  /* 符合計取得 */
  public getTotalHu(): number {
    return this.totalHu;
  }
  /* 合計取得 */
  public getTotal(): string {
    return this.total;
  }

  /** 符計算 */
  private calculateHu() {
    let totalHu = 20; // 底
    // ロン上がりは+10
    totalHu += this.combMentsu.map(mentsu => mentsu.getHu()).reduce(function(x,y) {return x+y});
    // 小数点以下に変換し、切り上げをし、元の桁数に戻す
    let base = 10 ^ (Math.log10(totalHu)-1);
    this.totalHu = Math.ceil(totalHu/base) * base;
  }

  /** 点数計算 */
  private afterCalculate() {
    let totalHanNum = this.getTotalHan();
    if(totalHanNum >= 13) {
      this.score = 48000;
      this.total = "役満";
    } else if(totalHanNum >= 11) {
      this.score = 36000;
      this.total = "三倍満";
    } else if(totalHanNum >= 8) {
      this.score = 24000;
      this.total = "倍満";
    } else if(totalHanNum >= 6) {
      this.score = 18000;
      this.total = "跳満";
    } else if(totalHanNum >= 4) {
      this.score = 12000;
      this.total = "満貫";
    } else if(totalHanNum == 3) {
      this.score = 7700;
    } else if(totalHanNum == 2) {
      this.score = 3900;
    } else if(totalHanNum == 1) {
      this.score = 2000;
    } else {
      this.score = 0;
      this.total = "役なし";
    }
  }
}