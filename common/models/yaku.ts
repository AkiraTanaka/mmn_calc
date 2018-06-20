/**
 *  役クラス
 */
export class Yaku {
  private name: string;  // 役名
  private yomi: string;		// 役読み仮名
  private han: number;  // 飜数
  private isKuisagri: boolean;  // 食い下がり有無

  constructor(name: string, yomi: string, han: number, isKuisagri: boolean) {
    this.name = name;
    this.yomi = yomi;
    this.han = han;
    this.isKuisagri = isKuisagri;
  }

  /* 役名取得 */
  public getName(): string {
    return this.name;
  }
  /* 役読み仮名取得 */
  public getYomi(): string {
    return this.yomi;
  }
  /* 飜数取得 */
  public getHan(isNaki: boolean): number {
    let han = this.han;
    if (this.isKuisagri && isNaki) {
      han--;
    }
    return han;
  }
  /* 点数取得 */
  public getScore(): number {
    return 48000;
  }

  /* 役満判定 */
  public isYakuman(): boolean {
    return this.han >= 13;
  }
}