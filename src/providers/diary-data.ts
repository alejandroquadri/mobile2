import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthData } from './auth-data';

@Injectable()
export class DiaryData {

  public dayObs: Observable<any>;
  lastArray: string;

  constructor(
    public af: AngularFire,
    public authData: AuthData
  ) {}

  getDay(day: string){
    this.dayObs = this.af.database.object(`/diary/${this.authData.fireAuth.uid}/${day}`)
  }

  newImage(image, day:string, meal:string) {
    this.af.database.list(`/diary/${this.authData.fireAuth.uid}/${day}/${meal}/images`)
    .push(image).then( ret => {
      console.log('retorno', ret.key);
      this.lastArray = ret.key;
      return ret.key
    });
  }

  updateImage(key, image, day:string, meal:string) {
    this.af.database.list(`/diary/${this.authData.fireAuth.uid}/${day}/${meal}/images`)
    .update(key, image);
  }

  updateText(form, day:string, meal:string){
    this.af.database.object(`/diary/${this.authData.fireAuth.uid}/${day}/${meal}`)
    .update(form);
  }

}
