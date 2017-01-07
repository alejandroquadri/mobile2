import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

// servicios
import { DiaryData } from '../../providers/diary-data';

@Component({
  selector: 'page-diary',
  templateUrl: 'diary.html'
})
export class DiaryPage {

  day: any = moment()
  diaryO: Observable<any>;
  diary;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public diaryData: DiaryData
  ) {}

  ionViewDidLoad() {
    this.diaryData.diaryObs
    .subscribe( data => {
      console.log('actualiza', data);
      this.diary = data;
    })
  }

  setDay(day){
    this.day = day.date;
  }

  updateDiary(){
    let form = {
      nombre: 'Pepe',
      apellido: 'Quadri',
      imagenes: [
        'almerzo.jpg',
        'comida.jpg',
        'desayuno.jpg'
      ]
    }
    console.log('sube', form);
    this.diaryData.updateDiary(form);
  }

}
