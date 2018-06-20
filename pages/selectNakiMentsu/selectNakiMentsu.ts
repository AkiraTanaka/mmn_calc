import { Component } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';
import { Mentsu } from '../../common/models/mentsu';
import { Hai } from '../../common/models/hai';
import { HaiMan } from '../../common/HaiMan';
import { MinShun } from '../../common/models/mentsu/minshun';
import { Minko } from '../../common/models/mentsu/minko';
import { Minkan } from '../../common/models/mentsu/minkan';

@Component({
  selector: 'page-selectNakiMentsu',
  templateUrl: 'selectNakiMentsu.html'
})

export class SelectNakiMentsuPage {
  nakiMentsuList: Array<Mentsu>;
 
  constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController) {
    let selectedHai = this.params.get('selectedHai');
    let nakiMentsuList = new Array<Mentsu>();
    let baseHai = Hai.deepCopy(selectedHai);
    selectedHai.setNakiFlg(true);
    // 明順
    if (selectedHai.isJihai() == false) {
      let haiType = baseHai.getType(); 
      let haiCode = Number.parseInt(baseHai.getCode()); 
      if (haiCode >= 3) {
        let shunHaiListR = new Array<Hai>();
        shunHaiListR.push(selectedHai);
        shunHaiListR.push(HaiMan.getHaiByTypeCode(haiType, (haiCode-2).toString()));
        shunHaiListR.push(HaiMan.getHaiByTypeCode(haiType, (haiCode-1).toString()));
        nakiMentsuList.push(new MinShun(shunHaiListR, new Array<number>()));
      }
      if (haiCode >= 2 && haiCode <= 8) {
        let minshunHaiListC = new Array<Hai>();
        minshunHaiListC.push(selectedHai);
        minshunHaiListC.push(HaiMan.getHaiByTypeCode(haiType, (haiCode-1).toString()));
        minshunHaiListC.push(HaiMan.getHaiByTypeCode(haiType, (haiCode+1).toString()));
        nakiMentsuList.push(new MinShun(minshunHaiListC, new Array<number>()));
      }
      if (haiCode <= 7) {
        let minshunHaiListL = new Array<Hai>();
        minshunHaiListL.push(selectedHai);
        minshunHaiListL.push(HaiMan.getHaiByTypeCode(haiType, (haiCode+1).toString()));
        minshunHaiListL.push(HaiMan.getHaiByTypeCode(haiType, (haiCode+2).toString()));
        nakiMentsuList.push(new MinShun(minshunHaiListL, new Array<number>())); 
      }
    }
    // 明刻
    let minkoHaiList = new Array<Hai>();
    minkoHaiList.push(selectedHai);
    for (let index = 1; index < 3; index++) {
      minkoHaiList.push(Hai.deepCopy(baseHai));
    }
    nakiMentsuList.push(new Minko(minkoHaiList, new Array<number>()));
    // 明槓
    let minkanHaiList = new Array<Hai>();
    minkanHaiList.push(selectedHai);
    for (let index = 1; index < 4; index++) {
      minkanHaiList.push(Hai.deepCopy(baseHai));
    }
    nakiMentsuList.push(new Minkan(minkanHaiList, new Array<number>()));
    this.nakiMentsuList = nakiMentsuList;
  }

  selectMentsu(mentsu: Mentsu) {
    this.viewCtrl.dismiss(mentsu);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
