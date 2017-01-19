import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import 'rxjs/add/operator/take';

// clases
import { ProfileForm } from './profileForm';

// servicios
import { AuthData } from '../../providers/auth-data';
import { ProfileData } from '../../providers/profile-data';
import { CameraService } from '../../providers/camera-service';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  avatar: string = "./assets/images/smiley-cyrus.jpg";
  profileForm: ProfileForm;

  constructor(
    public navCtrl: NavController,
    public authData: AuthData,
    public profileData: ProfileData,
    public camera: CameraService,
    public af: AngularFire,
    public loadingCtrl: LoadingController
  ) {
    this.profileForm = new ProfileForm;
  }

  ionViewDidLoad() {
    this.profileData.profileObs
    .subscribe( data => {
      console.log('actualiza', data);
      this.profileForm = data;
    })
  }

  logOut(){
    this.authData.logoutUser()
  }

  updateUser(){
    console.log('update user', this.profileForm);
    let updateProfile = {
      firstName :  this.profileForm.firstName || '',
      lastName : this.profileForm.lastName || '',
      bio : this.profileForm.bio || '',
      displayName: this.profileForm.displayName || '',
      birthDate: this.profileForm.birthDate || '',
    }
    console.log('form a actualizar', updateProfile);
    this.profileData.updateProfile(updateProfile);
  }

  updateAvatar(){
    this.camera.takePicture('profile');
    let profileImageObs = this.camera.imageData.take(2)
    profileImageObs.subscribe((imageData:any) => {
      console.log('data de observable en profile', JSON.stringify(imageData));
      this.profileData.updateProfile(imageData);
    },
    err => console.log('error', err),
    () => console.log('termino profileImageObs'))
  }

}
