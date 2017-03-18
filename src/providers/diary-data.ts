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
    public authData: AuthData,
  ) {}

  getDiary() {
    return this.af.database.object(`/diary/${this.authData.fireAuth.uid}`);
  }

  updateList(form, key, day:string): firebase.Promise<void> {
    return this.af.database.list(`/diary/${this.authData.fireAuth.uid}/${day}`)
    .update(key, form)
  }

  pushEntry(form, day: string): firebase.database.ThenableReference {
    console.log('entra', form, day);
    return this.af.database.list(`/diary/${this.authData.fireAuth.uid}/${day}`)
    .push(form)
  }

}
