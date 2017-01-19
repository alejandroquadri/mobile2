import { Component, Input } from '@angular/core';
// import { Slides } from 'ionic-angular';
// import { ViewChild } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { CameraService } from '../../providers/camera-service';
import { DiaryData } from '../../providers/diary-data';
// import * as moment from 'moment';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/skip';


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
  lastArray;

  // mySlideOptions = {
  //   initialSlide: 0,
  //   loop: true,
  //   pager: true
  // };

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

  // addPicture(){
  //   this.camera.takePicture();
  //   let diaryImageObs = this.camera.imageData.take(2);
  //   diaryImageObs.subscribe(
  //     (imageData:any) => {
  //
  //       console.log('data de observable en diary-entry', JSON.stringify(imageData));
  //       let lastArray;
  //
  //       if (imageData.photoURL) {
  //         console.log('vuelta con photoUrl');
  //         this.diaryData.updateImage(lastArray, imageData, this.day.format("YYYYMMDD"), this.meal);
  //       } else if (imageData.localPath) {
  //         console.log('vuelta con localPath');
  //         lastArray = this.diaryData.newImage(imageData, this.day.format("YYYYMMDD"), this.meal);
  //         console.log('lastArray', lastArray);
  //         this.addText();
  //       }
  //     },
  //     err => console.log('error en diaryImageObs', err),
  //     () => console.log('termino diaryImageObs')
  //   )
  // }

  addPicture(){
    let day: string = this.day.format("YYYYMMDD");
    this.camera.takePicture('diary');
    let diaryImageObsFirst = this.camera.imageData.take(1);
    let diaryImageObsSecond = this.camera.imageData.take(2).skip(1);

    diaryImageObsFirst.subscribe(
      (imageData:any) => {
        console.log('data de observable en diary-entry first', JSON.stringify(imageData));
        this.lastArray = this.diaryData.newImage(imageData, day, this.meal);
      },
      err => console.log('error en diaryImageObs first', err),
      () => console.log('termino diaryImageObs first')
    )

    diaryImageObsSecond.subscribe(
      (imageData:any) => {
        console.log('data de observable en diary-entry second', JSON.stringify(imageData));
        this.diaryData.updateImage(this.lastArray, imageData, day, this.meal);
      },
      err => console.log('error en diaryImageObs second', err),
      () => console.log('termino diaryImageObs second')
    )

  }

}
