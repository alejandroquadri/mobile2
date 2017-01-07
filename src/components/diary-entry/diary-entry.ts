import { Component, Input } from '@angular/core';
// import { Slides } from 'ionic-angular';
// import { ViewChild } from '@angular/core';
import { CameraService } from '../../providers/camera-service';

@Component({
  selector: 'diary-entry',
  templateUrl: 'diary-entry.html'
})
export class DiaryEntryComponent {

  @Input() day: string;
  text: string;
  image: any = "./assets/images/desayuno.jpg";
  
  mySlideOptions = {
    initialSlide: 0,
    loop: true,
    pager: true
  };
  // @ViewChild('mySlider') slider: Slides;
  slides = [
    {
      title: "Desayuno",
      description: "Gran desayuno para arrancar bien el dia",
      image: "./assets/images/desayuno.jpg",
    },
    {
      title: "Almuerzo",
      description: "Almorzando un poco rapido",
      image: "./assets/images/lunch.jpg",
    },
    {
      title: "Cena",
      description: "Ahh! Un bife argentino!",
      image: "./assets/images/dinner.jpg",
    }
  ];

  constructor(
    public cameraService: CameraService
  ) {
    console.log('Hello DiaryEntry Component');
    this.text = 'Hoy comi manzanas';
  }

  // onSlideChanged() {
  //   let currentIndex = this.slider.getActiveIndex();
  //   console.log("Current index is", currentIndex);
  // }

  addPicture(){
    console.log("una foto mas");
    this.cameraService.openActionSheet();
  }

}
