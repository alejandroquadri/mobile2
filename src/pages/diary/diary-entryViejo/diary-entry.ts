import { Component, Input, OnInit , OnChanges} from '@angular/core';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/skip';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

// servicios
import { CameraService } from '../../../providers/camera-service';
import { DiaryData } from '../../../providers/diary-data';
import { AuthData } from '../../../providers/auth-data';

@Component({
  selector: 'diary-entry',
  templateUrl: 'diary-entry.html'
})

export class DiaryEntryComponent implements OnInit, OnChanges {

  @Input() day;
  @Input() meal: string;
  @Input() mealInput;
  text: string;
  lastImage: string;
  images: FirebaseListObservable<any>;
  mealList;

  constructor(
    public camera: CameraService,
    public alertCtrl: AlertController,
    public diaryData: DiaryData,
    public af: AngularFire,
    public authData: AuthData
  ) {
  }

  ngOnInit() {
    this.images = this.af.database.list(`/diary/${this.authData.fireAuth.uid}/${this.day.format("YYYYMMDD")}/${this.meal}/images`);
  }

  ngOnChanges() {
    this.images = this.af.database.list(`/diary/${this.authData.fireAuth.uid}/${this.day.format("YYYYMMDD")}/${this.meal}/images`);
  }

  addText(){
    let alert = this.alertCtrl.create({
      message: "Que comiste?",
      inputs: [
        {
          name: "meal",
          placeholder: "Que comiste?"
        }
      ],
      buttons: [
        { text: 'Cancelar'},
        { text: 'Guardar',
      handler: data => {
        console.log('esto es lo que guardaria', data.meal);
        let form = {
          text: data.meal
        };
        console.log('esto es lo que guardaria', form, this.day.format("YYYYMMDD"));
        this.diaryData.updateText(form, this.day.format("YYYYMMDD"), this.meal);
      }}
      ]
    });
    alert.present();
  }

  addPicture(){
    let day: string = this.day.format("YYYYMMDD");
    this.camera.takePicture('diary');
    let diaryImageObsFirst = this.camera.imageData.take(1);
    let diaryImageObsSecond = this.camera.imageData.take(2).skip(1);

    diaryImageObsFirst.subscribe(
      (imageData:any) => {
        console.log('data de observable en diary-entry first');
        this.diaryData.newImage(imageData, day, this.meal);
      },
      err => console.log('error en diaryImageObs first', err),
      () => {
        console.log('termino diaryImageObs first')
        if(!this.mealInput[this.meal]) { this.addText();}
      }
    )

    diaryImageObsSecond.subscribe(
      (imageData:any) => {
        console.log('data de observable en diary-entry second');
        this.diaryData.updateImage(this.diaryData.lastArray, imageData, day, this.meal);
      },
      err => console.log('error en diaryImageObs second', err),
      () => console.log('termino diaryImageObs second')
    )
  }

}
