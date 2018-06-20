import { Component } from '@angular/core';
import { AlertController, NavController, ModalController } from 'ionic-angular';
import { HaiMan } from '../../common/HaiMan';
import { Hai } from '../../common/models/hai';
import { Mentsu } from '../../common/models/mentsu';
import { Tehai } from '../../common/tehai';
import { SelectNakiMentsuPage } from '../selectNakiMentsu/selectNakiMentsu';
import { CalcResultPage } from '../calc-result/calc-result';

@Component({
  selector: 'page-calcTehai',
  templateUrl: 'calcTehai.html'
})

export class CalcTehaiPage {
  tehai: Tehai;
  haiTypeList: Array<string>;
  combMentsuList: Array<Array<Mentsu>>;
  selectHaiMap: Array<Array<Hai>> = new Array<Array<Hai>>();
  selectMentsu: Mentsu;
  // 画面制御
  nakiFlg: boolean = false;
 
  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public modalCtrl: ModalController) {
    this.tehai = new Tehai();
    this.haiTypeList = ["萬子", "筒子", "索子"];
  }
 
  ionViewDidLoad() {
    // 数牌
    this.haiTypeList.forEach(haiType => {
      let haiList:Array<Hai> = HaiMan.getHaiListByTypeName(haiType);
      this.selectHaiMap.push(HaiMan.getHaiListByTypeName(haiType));
    });
    // 字牌
    this.selectHaiMap.push(HaiMan.getJihaiList());
  }

  selectHai(selectedHai: Hai) {
    let newHai = Hai.deepCopy(selectedHai);
    if(this.nakiFlg) {
      this.addNakiMentsu(newHai);
    } else {
      this.addHai(newHai);
    };
    this.showResult();
  }

  addNakiMentsu(selectedHai: Hai) {
    // 候補一覧をモーダルで表示して選択する
    let modal = this.modalCtrl.create(SelectNakiMentsuPage, {"selectedHai": selectedHai});
    modal.onDidDismiss(mentsu => { 
      if (mentsu != null) {
        let message = this.tehai.canAddMentsu(mentsu);
        if(message != null) {
          this.alertMessage(message);
        } else {
          this.tehai.addDekiMentsuList(mentsu);
        }
      }
    });
    modal.present();
  }

  addHai(selectedHai: Hai) {
    let message = this.tehai.canAddHai([selectedHai]);
    if(message != null) {
      this.alertMessage(message);
    } else {
      this.tehai.addHai(selectedHai);
    }
  }

  alertMessage(message: string) {
    if (message != null) {
      let alert = this.alertCtrl.create({
        title: message,
        buttons: ['OK']
      });
      alert.present();
    }
  }

  showResult() {
    if (this.tehai.getCombMentsuList().length > 0) {
      let modal = this.modalCtrl.create(CalcResultPage, {"maxCombMentsu": this.tehai.getMaxCombMentsu()});
      modal.present();
    }
  }

  deleteHai(selectedHai: Hai) {
    this.tehai.deleteHai(selectedHai);
  }
  deleteMentsu(selectedMentsu: Mentsu) {
    this.tehai.deleteDekiMentsu(selectedMentsu);
  }

  clearList() {
    this.tehai.clearHaiList();
  }

  setNakiFlg() {
    this.nakiFlg = !this.nakiFlg;
  }

  setDetail() {

  }

  getNakiButtonValue():string {
    return this.nakiFlg? "牌選択モード" : "鳴きモード";
  }
}
