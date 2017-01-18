import { Component, Input } from '@angular/core';
// import { Slides } from 'ionic-angular';
// import { ViewChild } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { CameraService } from '../../providers/camera-service';
import { DiaryData } from '../../providers/diary-data';
// import * as moment from 'moment';
import 'rxjs/add/operator/take';

@Component({
  selector: 'diary-entry',
  templateUrl: 'diary-entry.html'
})
export class DiaryEntryComponent {

  @Input() day;
  @Input() meal: string;
  @Input() mealInput
  text: string;
  image: any = "./assets/images/desayuno.jpg";
  lastImage: string;

  mySlideOptions = {
    initialSlide: 0,
    loop: true,
    pager: true
  };

  constructor(
    public camera: CameraService,
    public alertCtrl: AlertController,
    public diaryData: DiaryData
  ) {}

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
    this.camera.takePicture();
    this.camera.imageData
    .subscribe((imageData:any) => {

      let vuelta = JSON.stringify(imageData);
      console.log('data de observable en diary-entry', vuelta);
      let lastArray;

      if (!imageData.localPath) {
        console.log('vuelta sin data');
      } else if (imageData.localPath) {
        console.log('vuelta con localPath');
        lastArray = this.diaryData.newImage(imageData, this.day, this.meal);
        console.log('lastArray', lastArray);
        this.addText();
      } else if (imageData.photoURL) {
        console.log('vuelta con photoUrl');
        this.diaryData.updateImage(lastArray, imageData, this.day, this.meal);
      } else {
        console.log('paso algo raro');
      }

    })
  }

}
