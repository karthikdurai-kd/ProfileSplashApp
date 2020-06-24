import { Injectable } from '@angular/core';
import { ProfileModel } from './profile.model';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {tap, map, reduce} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ProfilesfetchService {
  private profiles: ProfileModel[]= [
    /*new ProfileModel('1','Karthik', 22, 9840461341, 'https://i.pinimg.com/originals/b0/fc/18/b0fc18f7ad25cb3af09cc0905ecb39db.jpg'),
    new ProfileModel('2','Durai', 56, 9940367534, 'https://i.pinimg.com/originals/b0/fc/18/b0fc18f7ad25cb3af09cc0905ecb39db.jpg')*/
  ];
  constructor(private http: HttpClient) { }
  get profilesAll(){
    console.log(this.profiles)
    return [...this.profiles];
  }

  saveProfile(name:string, age:number, phoneNo:number, imageURL:string){
    console.log("Came");
    const newProfile = new ProfileModel(Math.random.toString(), name, age, phoneNo, imageURL);
    return this.http.post<any>(`https://profilesplashapp.firebaseio.com/profiles.json`, {...newProfile, id:null})
    .pipe(tap(resData=>{
          console.log("Profile Saved");
    }),
     map(resData=>{
       newProfile.id = resData.name;
      // newProfile.imageURL = imageURL.toString();
       console.log("Profile ID: "+newProfile.id);
       this.profiles.push(newProfile);
       return resData.name;
       //console.log(this.profiles);
     })
    )
   // this.profiles.push(newProfile);
  }

  fetchProfile(){
    this.profiles= [];
   return this.http.get('https://profilesplashapp.firebaseio.com/profiles.json')
    .pipe(tap(resData=>{
      console.log(resData);
    }),
    map(resData=>{
      for(const key in resData){
        if(resData.hasOwnProperty(key)){
          const newProfile = new ProfileModel(key, resData[key].name, resData[key].age, resData[key].phoneNo,resData[key].imageURL);
          this.profiles.push(newProfile);
        }
      }
    })
    )
  }

  deleteProfile(id: string){
    return this.http.delete(`https://profilesplashapp.firebaseio.com/profiles/${id}.json`)
    .pipe(map(resData=>{
      this.profiles = this.profiles.filter(p=>{
        return p.id!= id;
      })
      console.log(this.profiles);
    }))
  }
}
