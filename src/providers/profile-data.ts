import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Observable } from 'rxjs/Observable';

import { AuthData } from './auth-data';

@Injectable()
export class ProfileData {

  public profileObs: Observable<any>;
  current;

  constructor(
    public af: AngularFire,
    public authData: AuthData
  ) {
    this.profileObs = af.database.object(`/userProfile/${authData.fireAuth.uid}`);
  }

  updateProfile(form){
    this.af.database.object(`/userProfile/${this.authData.fireAuth.uid}`)
    .update(form)
  }

}
