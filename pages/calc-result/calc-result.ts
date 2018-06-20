import { Component } from '@angular/core';
import { Platform, NavParams, ViewController } from 'ionic-angular';
import { CombMentsu } from '../../common/models/combMentsu';

/**
 * Generated class for the CalcResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-calc-result',
  templateUrl: 'calc-result.html',
})
export class CalcResultPage {
  combMentsu: CombMentsu;

  constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController) {
    this.combMentsu = this.params.get('maxCombMentsu');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
