import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddprofilesPageRoutingModule } from './addprofiles-routing.module';

import { AddprofilesPage } from './addprofiles.page';
import { ImagepickerComponent } from 'src/app/shared/imagepicker/imagepicker.component';
import { SharedModule } from 'src/app/shared/imagepicker/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddprofilesPageRoutingModule,
    SharedModule
  ],
  declarations: [AddprofilesPage]
})
export class AddprofilesPageModule {}
