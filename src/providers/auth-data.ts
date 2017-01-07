import { Injectable } from '@angular/core';
import { AngularFire} from 'angularfire2';

@Injectable()
export class AuthData {
  current: any;
  public userProfile: any;
  fireAuth: any;

  constructor(
    public af: AngularFire
  ) {
    af.auth.subscribe( user => {
      if (user) {
        this.fireAuth = user.auth;
        console.log(user);
      }
    });
  }

  loginUser(newEmail: string, newPassword: string): any {
    return this.af.auth.login({ email: newEmail, password: newPassword });
  }

  // para esto uso el JS SDK, no esta disponible todavia en AF2
  resetPassword(email: string): any {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): any {
    return this.af.auth.logout()
  }

  signupUser(newEmail: string, newPassword: string): any {
    return this.af.auth.createUser({ email: newEmail, password: newPassword })
    .then(newUser => {
      this.af.database.object(`/userProfile/${newUser.uid}`)
      .set({email:newEmail, coach: false});
      //.update({email:newEmail, coach: false});
      // podria escribir lo de arriba y tambien crea la direccion

    })
  }

  setCurrent(user){
    return this.current = user;
  }

}

// usando firebase JS SDK
// signupUser(newEmail: string, newPassword: string): any {
//   return this.af.auth.createUser({ email: newEmail, password: newPassword })
//   .then(newUser => {
//     firebase.database().ref('/userProfile').child(newUser.uid)
//     .set({email:newEmail, coach: false});
//   })
//  }
