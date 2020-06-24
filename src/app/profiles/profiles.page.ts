import { Component, OnInit } from '@angular/core';
import { ProfileModel } from './profile.model';
import { ProfilesfetchService } from './profilesfetch.service';
import { LoadingController, IonItemSliding } from '@ionic/angular';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.page.html',
  styleUrls: ['./profiles.page.scss'],
})
export class ProfilesPage implements OnInit {
  profilesGet: ProfileModel[]=[];
  constructor(private profileServiceObj: ProfilesfetchService, private loadingCtrl: LoadingController) { }
  isDataAvailable:boolean = false;
  ngOnInit() {
    
    this.profileServiceObj.fetchProfile()
    .subscribe(resData=>{
        console.log(resData);
        this.profilesGet = this.profileServiceObj.profilesAll;
        this.isDataAvailable= true;
    })
    
  }

  ionViewDidEnter(){
    
    this.profilesGet = this.profileServiceObj.profilesAll;
   // console.log(this.profilesGet);
  }

  onProfileDelete(id: string, profileSlideRef: IonItemSliding){
    profileSlideRef.close();
    this.loadingCtrl.create({keyboardClose: true, message: 'Deleting Profile...'})
    .then(loadingCtrlEle=>{
      loadingCtrlEle.present();
      this.profileServiceObj.deleteProfile(id).subscribe(resData=>{
        console.log(resData);
      })
      setTimeout(()=>{
        loadingCtrlEle.dismiss();
        this.profilesGet = this.profileServiceObj.profilesAll;
      },1500)
    })
      
    
  }

}
