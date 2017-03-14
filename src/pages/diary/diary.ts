import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { CameraService } from '../../providers/camera-service';
import * as moment from 'moment';

// servicios
import { DiaryData } from '../../providers/diary-data';

// pipes
import { SortPipe } from '../../shared/pipes/sort.pipe';
import { SortAddPipe } from '../../shared/pipes/sortAdd.pipe';

@Component({
  selector: 'page-diary',
  templateUrl: 'diary.html',
})
export class DiaryPage {

  day: any = moment()
  diary;
  diary2;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public diaryData: DiaryData,
    public camera: CameraService,
    private sortPipe: SortPipe,
    private sortAddPipe: SortAddPipe
  ) {
    this.diaryData.getDay(this.day.format("YYYYMMDD"));
    this.getData2();
    // this.diary2 = this.diaryData.getDay2(this.day.format("YYYYMMDD"))
  }

  ionViewDidLoad() {
    this.getData();
  }

  getData(){
    this.diaryData.dayObs
    .subscribe( data => {
      if (!data.$value) {console.log('vacio')}
      this.diary = data;
    })
  }

  getData2() {
    this.diaryData.getDay2(this.day.format("YYYYMMDD"))
    .subscribe( data => {
      this.diary2 = this.sortAddPipe.transform(data, 'order', true);
      console.log('diary2', this.diary2);
    })
  }

  setDay(day){
    this.day = day.date;
    this.diaryData.getDay(this.day.format("YYYYMMDD"));
    this.getData();
    this.getData2();
  }


}
