import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { FileDropComponent } from './file-drop';

@NgModule({
  declarations: [
    FileDropComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    FileDropComponent
  ]
})
export class FileDropComponentModule {}
