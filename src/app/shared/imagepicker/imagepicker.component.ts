import { Component, OnInit, Output, ElementRef, Input, ViewChild } from '@angular/core';
import {Plugins, Capacitor, CameraSource, CameraResultType} from '@capacitor/core'
import { EventEmitter } from '@angular/core';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-imagepicker',
  templateUrl: './imagepicker.component.html',
  styleUrls: ['./imagepicker.component.scss'],
})
export class ImagepickerComponent implements OnInit {
  selectedImage: string;
  filePickVal: boolean;
  usePicker: boolean = false;
  @Input()imageBool: Boolean;
  @ViewChild('filePick') filePickRef: ElementRef<HTMLInputElement>;
  @Output() imagePick = new EventEmitter<string>();
  constructor(private platform: Platform) { }

  ngOnInit() {
    console.log("Mobile: "+this.platform.is('mobile'));
    console.log("ios: "+this.platform.is('ios'));
    console.log("android: "+this.platform.is('android'));
    console.log("desktop: "+this.platform.is('desktop'));
    console.log("hybrid: "+this.platform.is('hybrid'));
    console.log("mobileweb: "+this.platform.is('mobileweb'));
    console.log("capacitor: "+this.platform.is('capacitor'));
    console.log("cordova: "+this.platform.is('cordova'));
    if((this.platform.is('mobile')&& !this.platform.is('hybrid'))|| this.platform.is('desktop')){
      this.usePicker = true;
    }
  }

  onPickImage(){
   this.imageBool = true;
    console.log("Image Function");
    if(!Capacitor.isPluginAvailable('Camera')){
       console.log("Camera is not available");
       this.filePickRef.nativeElement.click();
         return;
    }
    Plugins.Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt,
      correctOrientation: true, 
      width: 600, 
      resultType: CameraResultType.DataUrl

    }).then(image=>{
      console.log("Came to Camera");
        this.selectedImage = image.dataUrl;
        this.imagePick.emit(image.dataUrl);
    }).catch(err=>{
      console.log(err);
      if(this.usePicker){
        this.filePickRef.nativeElement.click();
      }
      else if((this.platform.is('hybrid') && this.platform.is('mobile'))|| this.platform.is('mobileweb')){
        this.imageBool = false;
      }
       return;
    })

    
  }

  onFileChange(event: Event){
   // console.log(event);
   const pickedFile = (event.target as HTMLInputElement).files[0];
   if(!pickedFile){
     this.imageBool= false;
     return;
   }
   const fr = new FileReader();
   fr.onload = ()=>{
     const dataURL = fr.result.toString();
     this.selectedImage = dataURL;
     this.imagePick.emit(dataURL)
   }
   fr.readAsDataURL(pickedFile);
  }

}
