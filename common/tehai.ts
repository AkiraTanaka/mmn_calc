import { Hai } from './models/hai';
import { Yaku } from './models/yaku';
import { Mentsu } from './models/mentsu';
import { CombMentsu } from './models/combMentsu';

import { MentsuMan } from './mentsuMan';
import { Kokushi } from './models/mentsu/kokushi';
import { YakuMan } from './yakuMan';
import { Toitsu } from './models/mentsu/toitsu';

/**
 *  手牌クラス
 */
export class Tehai {
  private haiList: Array<Hai> = new Array<Hai>();  //  手牌
  private dekiMentsuList: Array<Mentsu> = new Array<Mentsu>(); //  出来メンツ一覧
  private combMentsuList: Array<CombMentsu>; //  メンツ組み合わせ一覧
  private maxCombMentsu: CombMentsu; //  最大メンツ組み合わせ

  /**
   * 手牌追加
   * @param hai 牌
   */
  public addHai(hai: Hai) {
    let addHai = Hai.deepCopy(hai);
    if (this.getAllHaiCount() == 13) {
      addHai.setAgariFlg(true);
    }
    this.haiList.push(addHai);
    this.afterChangeHai();
  }

  /**
   * 手牌削除
   * @param hai 牌
   */
  public deleteHai(hai: Hai) {
    let index = this.haiList.indexOf(hai);
    this.haiList.splice(index, 1);
    this.haiList.forEach(hai => hai.setAgariFlg(false));
    this.afterChangeHai();
  }

  /* 手牌取得 */
  public getHaiList(): Array<Hai> {
    return this.haiList;
  }
  /* 手牌取得 */
  public getHaiListWithOutAgariHai(): Array<Hai> {
    return this.haiList.filter(hai => !hai.isAgari());
  }
  /* 手牌クリア */
  public clearHaiList() {
    this.haiList = new Array<Hai>();
    this.dekiMentsuList = new Array<Mentsu>();
    this.combMentsuList = new Array<CombMentsu>();
  }
  /* メンツ組み合わせ一覧取得 */
  public getCombMentsuList(): Array<CombMentsu> {
    return this.combMentsuList;
  }
  /* 最大メンツ組み合わせ取得 */
  public getMaxCombMentsu(): CombMentsu {
    return this.maxCombMentsu;
  }

  /* 出来メンツ一覧取得 */
  public getDekiMentsuList(): Array<Mentsu> {
    return this.dekiMentsuList;
  }
  /* 出来メンツ追加 */
  public addDekiMentsuList(mentsu: Mentsu) {
    this.dekiMentsuList.push(mentsu);
    this.afterChangeHai();
  }
  /**
   * 出来メンツ削除
   * @param mentsu 出来メンツ
   */
  public deleteDekiMentsu(mentsu: Mentsu) {
    let index = this.dekiMentsuList.indexOf(mentsu);
    this.dekiMentsuList.splice(index, 1);
    this.haiList.forEach(hai => hai.setAgariFlg(false));
    this.afterChangeHai();
  }


  /* 上がり牌取得 */
  public getAgariHai(): Hai {
    let agariHai: Hai = null;
    this.haiList.forEach(hai => {
      if (hai.isAgari()) {
        agariHai = hai;
      }
    });
    return agariHai;
  }

  /* 役一覧取得 */
  public getYakuList(): Array<Yaku> {
    let yakuList = new Array<Yaku>();
    if (this.maxCombMentsu != null) {
      yakuList = this.maxCombMentsu.getYakuList();
    }
    return yakuList;
  }
  /* 飜合計取得 */
  public getTotalHan(): number {
    let totalHan = 0;
    if (this.maxCombMentsu != null) {
      totalHan = this.maxCombMentsu.getTotalHan();
    }
    return totalHan;
  }
  /* 符合計取得 */
  public getTotalHu(): number {
    let totalHu = 0;
    if (this.maxCombMentsu != null) {
      totalHu = this.maxCombMentsu.getTotalHu();
    }
    return totalHu;
  }
  /* 合計取得 */
  public getTotal(): string {
    let total = "";
    if (this.maxCombMentsu != null) {
      total = this.maxCombMentsu.getTotal();
    }
    return total;
  }
  /* 点数取得 */
  public getScore(): number {
    let score = 0;
    if (this.maxCombMentsu != null) {
      score = this.maxCombMentsu.getScore();
    }
    return score;
  }

  /**
   * 牌追加可能判定
   * @param addHaiList 追加牌一覧
   * @returns 判定メッセージ
   */
  public canAddHai(addHaiList: Array<Hai>): string {
    return this.getErrorMessage(addHaiList.length, addHaiList);
  }
  /**
   * メンツ追加可能判定
   * @param addMentsu 追加メンツ
   * @returns 判定メッセージ
   */
  public canAddMentsu(addMentsu: Mentsu): string {
    return this.getErrorMessage(addMentsu.getHaiCount(), addMentsu.getHaiList());
  }
  private getErrorMessage(addHaiCount: number, haiList: Array<Hai>): string {
    let haiMap = new Map<string, Array<Hai>>();
    haiList.forEach(hai => {
      let haiId = hai.getId();
      if (haiMap.has(haiId) == false) {
        haiMap.set(haiId, []);
      }
      haiMap.get(haiId).push(hai);
    });
    let message = null;
    if (this.getAllHaiCount() + addHaiCount > 14) {
      message = "14牌以上選択できません。";
    } else {
      haiMap.forEach((haiList, haiId) => {
        if (this.getTeHaiCountById(haiId) + haiList.length > 4) {
          message = "同一牌は４つまでしか選択できません。";
        }
      });
    }
    return message;
  }

  /* 全ての牌一覧取得 */
  public getAllHaiList(): Array<Hai> {
    let allHaiList = new Array<Hai>();
    this.haiList.forEach(hai => allHaiList.push(hai));
    this.dekiMentsuList.forEach(mentsu => {
      mentsu.getHaiList().forEach(hai => allHaiList.push(hai));
    });
    return allHaiList;
  }
  /* 全ての牌数取得(槓子考慮) */
  public getAllHaiCount(): number {
    let allHaiCount = 0;
    this.haiList.forEach(hai => allHaiCount++);
    this.dekiMentsuList.forEach(mentsu => allHaiCount += mentsu.getHaiCount());
    return allHaiCount;
  }
  private getTeHaiCountById(haiId: string): number {
    return this.getHaiCountById(this.getAllHaiList(), haiId);
  }
  private getHaiCountById(haiList: Array<Hai>, haiId: string): number {
    return haiList.filter(hai => hai.getId() == haiId).length;
  }

  /** 牌変更後処理 */
  private afterChangeHai() {
    this.sortList();
    if (this.getAllHaiCount() == 14) {
      // 国士のメンツ判定
      let kokushiMentsu = this.checkKokushi(this.haiList);
      if (kokushiMentsu != null) {
        this.combMentsuList.push(kokushiMentsu);
      } else {
        // 通常の組み合わせ判定(3,3,3,3,2)
        this.combMentsuList = this.combMain(this.haiList);
        //  チートイ組み合わせ追加
        let chitoiMentsu = this.checkChitoi(this.haiList);
        if (chitoiMentsu != null) {
          this.combMentsuList.push(chitoiMentsu);
        }
      }
      // 役有無判定
      this.combMentsuList.forEach(combMentsu => {
        if(this.maxCombMentsu == null || this.maxCombMentsu.getScore() < combMentsu.getScore()) {
          this.maxCombMentsu = combMentsu;
        }
      });
    } else {
      this.combMentsuList = new Array<CombMentsu>();
      this.maxCombMentsu = null;
    }
  }

  /** 国士無双判定処理 */
  private checkKokushi(haiList: Array<Hai>): CombMentsu {
    let kokushiMentsu = new CombMentsu([new Kokushi(haiList, null)]);
    let isKokushi = kokushiMentsu.getYakuList().some(yaku => yaku == YakuMan.KOKUSHI);
    return isKokushi ? kokushiMentsu :null;
  }
  /** 七対子判定処理 */
  private checkChitoi(haiList: Array<Hai>): CombMentsu {
    let haiMap = new Map<string, Array<Hai>>();
    if (haiList.some(hai => hai.isNaki()) == false) {      
      haiList.forEach(hai => {
        let haiId = hai.getId();
        if (haiMap.has(haiId) == false) {
          haiMap.set(haiId, new Array<Hai>());
        }
        haiMap.get(haiId).push(hai);
      });

      let chitoiFlg = true;
      let combMentsu = new Array<Mentsu>();
      haiMap.forEach(haiList => {
        let mentsu = MentsuMan.getInstance(haiList, null);
        if (mentsu instanceof Toitsu) {
          combMentsu.push(mentsu);
        } else {
          chitoiFlg = false;
        }
      });
      if (chitoiFlg) {
        return new CombMentsu(combMentsu);
      }
      return null;
    }
    
    let kokushiMentsu = new CombMentsu([new Kokushi(haiList, null)]);
    let isKokushi = kokushiMentsu.getYakuList().some(yaku => yaku == YakuMan.KOKUSHI);
    return isKokushi ? kokushiMentsu :null;
  }

  /** 牌組み合わせ処理 */
  private combMain(haiList: Array<Hai>): Array<CombMentsu> {
    // let typeHaiMap = new Map<string, Array<Hai>>();
    // haiList.forEach(hai => {
    //   let type = hai.getTypeName();
    //   if (typeHaiMap.get(type) == undefined) {
    //     typeHaiMap.set(type, new Array<Hai>());
    //   }
    //   typeHaiMap.get(type).push(hai);
    // });
    // 牌組み合わせ一覧生成
    let combList = this.comb(haiList, 3);
    // 面子変換
    let mentsuList = new Array<Mentsu>();
    combList.forEach(haiNumList => {
      let mentsuHaiList = haiNumList.map(haiNum => haiList[haiNum]);
      let mentsu = MentsuMan.getInstance(mentsuHaiList, haiNumList);
      if (mentsu != null) {
        mentsuList.push(mentsu);
      }
    });
    return this.combMentsu(mentsuList, haiList);
  }

  private comb(haiList: Array<Hai>, combMax: number): Array<Array<number>> {
    let combList = new Array<Array<number>>();
    let max = haiList.length;
    for (let i = 0; i < haiList.length; i++) {
      let list = new Array<number>();
      list.push(i);
      for (let j = i+1; j < haiList.length; j++) {
        this.combSub(j, max, combMax, list.map(x => x), combList);
      }
    }
    return combList;
  }

  private combSub(start: number, max: number, combMax: number, list: Array<number>, combList: Array<Array<number>>) {
    if (list.length < combMax) {
      list.push(start);
      if (list.length == combMax) {
        combList.push(list);
      }
    }
    for (let i = start+1; i < max; i++) {
      this.combSub(i, max, combMax, list.map(x => x), combList);
    }
  }

  private combMentsu(baseMentsuList: Array<Mentsu>, haiList: Array<Hai>): Array<CombMentsu> {
    // 面子組み合わせ作成
    let haiLength = haiList.length;
    let combMax: number = Math.floor(haiLength/3);
    let tempCombMentsuList = new Array<Array<Mentsu>>();
    for (let i = 0; i < baseMentsuList.length; i++) {
      let list = new Array<Mentsu>();
      // list.push(baseMentsuList[i]);
      // this.combMentsuSub(i+1, combMax, list, baseMentsuList, tempCombMentsuList);
      this.combMentsuSub(i, combMax, list, baseMentsuList, tempCombMentsuList);
    }
    // 重複削除
    let combMentsuSet = new Set<string>();
    let combMentsuList = new Array<Array<Mentsu>>();
    tempCombMentsuList.forEach(combMentsu => {
      let combId = combMentsu.map(mentsu => mentsu.getMentsuId()).join("");
      if (combMentsuSet.has(combId) == false) {
        combMentsuSet.add(combId);
        combMentsuList.push(combMentsu);
      }
    });
    // 余りを頭にする
    let fixedMentsuList = new Array<CombMentsu>();
    if (haiList.length == 2) {
      let mentsu = MentsuMan.getInstance(haiList, [0,1]);
      if (mentsu != null) {
        let combMentsu = new Array<Mentsu>();
        combMentsu.push(mentsu);
        // 出来メンツを追加する
        this.dekiMentsuList.forEach(dekiMentsu => combMentsu.push(dekiMentsu));
        fixedMentsuList.push(new CombMentsu(combMentsu));
      }
    } else {
      combMentsuList.forEach(combMentsu => {
        let numListList = new Array<number>();
        combMentsu.forEach(mentsu => {
          mentsu.getHaiNumList().forEach(haiNum => {
            numListList.push(haiNum);
          });
        });
        let restNumList = new Array<number>();
        for (let i = 0; i < haiLength; i++) {
          if(numListList.some(num => num == i) == false) {
            restNumList.push(i);
          }
        }
        let mentsuHaiList = restNumList.map(haiNum => haiList[haiNum]);
        let mentsu = MentsuMan.getInstance(mentsuHaiList, restNumList);
        if (mentsu != null) {
          combMentsu.push(mentsu);
          // 出来メンツを追加する
          this.dekiMentsuList.forEach(dekiMentsu => combMentsu.push(dekiMentsu));
          fixedMentsuList.push(new CombMentsu(combMentsu));
        }
      });
    }
    return fixedMentsuList;
  }

  private combMentsuSub(start: number, combMax: number, list: Array<Mentsu>, baseMentsuList: Array<Mentsu>, combMentsuList: Array<Array<Mentsu>>) {
    if (list.length < combMax) {
      let newMentsu = baseMentsuList[start];
      if (newMentsu != null) {
        let isNotContainsNum = newMentsu.getHaiNumList().every(haiNum => {
          return list.every(mentsu => {
            return (mentsu.getHaiNumList().some(subHaiNum => subHaiNum == haiNum) == false);
          });
        });
        if (isNotContainsNum) {
          list.push(newMentsu);
        }
      }
    }
    if (list.length == combMax) {
      combMentsuList.push(list);
    }
    if (start+1 < baseMentsuList.length) {
      this.combMentsuSub(start+1, combMax, list.map(x => x), baseMentsuList, combMentsuList);
    }
  }

  /*  ソート */
  private sortList() {
    this.haiList.sort((a, b) => 
      (a.getId() < b.getId()) == true ? -1 : 1
    );
  }
}