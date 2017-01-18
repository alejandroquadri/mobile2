import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { CameraService } from '../../providers/camera-service';
import * as moment from 'moment';

// servicios
import { DiaryData } from '../../providers/diary-data';

@Component({
  selector: 'page-diary',
  templateUrl: 'diary.html'
})
export class DiaryPage {

  day: any = moment()
  diary;
  meals = [
    { title: 'Desayuno', order: '0'},
    { title: 'Almuerzo', order: '1'},
    { title: 'Te', order: '2'},
    { title: 'Cena', order: '3'}
  ]

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public diaryData: DiaryData,
    public camera: CameraService,
  ) {
    this.diaryData.getDay(this.day.format("YYYYMMDD"));
  }

  ionViewDidLoad() {
    this.getData();
  }

  getData(){
    this.diaryData.dayObs
    .subscribe( data => {
      console.log('data', data);
      if (!data.$value) {console.log('vacio')}
      this.diary = data;
    })
  }

  setDay(day){
    this.day = day.date;
    this.diaryData.getDay(this.day.format("YYYYMMDD"));
    this.getData();
  }


}
