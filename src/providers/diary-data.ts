import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthData } from './auth-data';

@Injectable()
export class DiaryData {

  public diaryObs: Observable<any>;
  current;

  constructor(
    public af: AngularFire,
    public authData: AuthData
  ) {
    this.diaryObs = af.database.object((`/diary/${authData.fireAuth.uid}`))
  }

  updateDiary(form){
    console.log('update diary en service', form);
    this.af.database.object(`/diary/${this.authData.fireAuth.uid}`)
    .update(form)
  }

}
