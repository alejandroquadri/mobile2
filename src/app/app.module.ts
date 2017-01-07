// import { NgModule, ErrorHandler } from '@angular/core';
// import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
// import { MyApp } from './app.component';
// import { HomePage } from '../pages/home/home';
//
// @NgModule({
//   declarations: [
//     MyApp,
//     HomePage
//   ],
//   imports: [
//     IonicModule.forRoot(MyApp)
//   ],
//   bootstrap: [IonicApp],
//   entryComponents: [
//     MyApp,
//     HomePage
//   ],
//   providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
// })
// export class AppModule {}

import { NgModule, ErrorHandler  } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// paginas importadas
import { DiaryPage } from '../pages/diary/diary';
import { ChatPage } from '../pages/chat/chat';
import { MePage } from '../pages/me/me';
import { ConfigPage } from '../pages/config/config';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SignupPage } from '../pages/signup/signup';
import { ProfilePage } from '../pages/profile/profile';
import { ProgressPage } from '../pages/progress/progress';
import { CoachPage } from '../pages/coach/coach';

// Components
import { WeekCalendarComponent } from '../components/week-calendar/week-calendar';
import { DiaryEntryComponent } from '../components/diary-entry/diary-entry';

// providers importados
import { AuthData } from '../providers/auth-data';
import { ProfileData } from '../providers/profile-data';
import { CameraService } from '../providers/camera-service';
import { DiaryData } from '../providers/diary-data';

// importo AngularFire2 module
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// settings AF2
export const firebaseConfig = {
  apiKey: "AIzaSyC9EFx_1rQDM0YOleEC-CstB58D0JMj0pA",
  authDomain: "dietapp-9f200.firebaseapp.com",
  databaseURL: "https://dietapp-9f200.firebaseio.com",
  storageBucket: "dietapp-9f200.appspot.com",
  messagingSenderId: "1075458661299"
};

// esto le dice a AF2 que voy a usar Email & Password para autenticacion
const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    MyApp,
    DiaryPage,
    ChatPage,
    MePage,
    ConfigPage,
    TabsPage,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    ProfilePage,
    ProgressPage,
    CoachPage,
    WeekCalendarComponent,
    DiaryEntryComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DiaryPage,
    ChatPage,
    MePage,
    ConfigPage,
    TabsPage,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    ProfilePage,
    ProgressPage,
    CoachPage,
    WeekCalendarComponent,
    DiaryEntryComponent
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthData,
    ProfileData,
    CameraService,
    DiaryData
  ]
})
export class AppModule {}
