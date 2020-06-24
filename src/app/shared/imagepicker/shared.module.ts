import { NgModule } from '@angular/core';
import { ImagepickerComponent } from './imagepicker.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [ImagepickerComponent],
    imports: [CommonModule,IonicModule],
    exports: [ImagepickerComponent]
})
export class SharedModule{

}