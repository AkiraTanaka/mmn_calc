import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MentsuModuleComponent } from '../components/mentsu-module/mentsu-module';

import { CalcTehaiPage } from '../pages/calcTehai/calcTehai';
import { CalcResultPage } from '../pages/calc-result/calc-result';
import { SelectNakiMentsuPage } from '../pages/selectNakiMentsu/selectNakiMentsu';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    CalcTehaiPage,
    CalcResultPage,
    SelectNakiMentsuPage
  ],
  imports: [
    BrowserModule,
    // MentsuModuleComponent,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CalcTehaiPage,
    CalcResultPage,
    SelectNakiMentsuPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
