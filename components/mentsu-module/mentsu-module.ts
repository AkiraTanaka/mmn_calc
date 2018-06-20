import { Component, NgModule } from '@angular/core';

/**
 * Generated class for the MentsuModuleComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'mentsu-module',
  templateUrl: 'mentsu-module.html'
})
export class MentsuModuleComponent {

  text: string;

  constructor() {
    console.log('Hello MentsuModuleComponent Component');
    this.text = 'Hello World';
  }

}
