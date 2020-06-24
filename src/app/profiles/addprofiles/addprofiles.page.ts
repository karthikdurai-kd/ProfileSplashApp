import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProfilesfetchService } from '../profilesfetch.service';
import { Router } from '@angular/router';
import { LoadingController, IonImg } from '@ionic/angular';


@Component({
  selector: 'app-addprofiles',
  templateUrl: './addprofiles.page.html',
  styleUrls: ['./addprofiles.page.scss'],
})
export class AddprofilesPage implements OnInit {
  @ViewChild('f') form: NgForm
  @ViewChild('imagePick') imagePickRef: ElementRef;
  
  imageString: string
  flag: boolean =false;
  imageFlag: boolean = false;
  constructor(private profileServiceObj: ProfilesfetchService, private router: Router, private loadingCtrl: LoadingController) { }

  ngOnInit() {
   
  }
  submitProfile(){
    if(this.form.invalid){
      return
    }
    console.log(this.form.value);
    this.loadingCtrl.create({keyboardClose: true, message: 'Adding Profile...'})
    .then(loadingctrlEle=>{
      loadingctrlEle.present();
      this.profileServiceObj.saveProfile(this.form.value.name, this.form.value.age, this.form.value.phoneNo, this.form.value.imageURL)
      .subscribe(resData=>{
        console.log(resData);
        this.form.reset();
        this.imageFlag = false;
        
      })
      setTimeout(()=>{
        loadingctrlEle.dismiss();
        
        this.router.navigateByUrl('/profiles');
      }, 3000);
    })
   
  

  }

  delete(){
   //console.log(this.imagePickRef.nativeElement)
   this.imageFlag = false;
    this.form.reset();
  }

  onImagePick(image: string){
  
    console.log(image);
    this.flag = true;
    this.imageFlag = true;
    this.imageString = image;
  }


}
