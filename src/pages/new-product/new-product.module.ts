import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewProductPage } from './new-product';
import { FileDropComponentModule } from "../../components/file-drop/file-drop.module";
// -----------------------------------------------------------------
// Libraries
// -----------------------------------------------------------------
import { Ng2CompleterModule } from "ng2-completer";
@NgModule({
  declarations: [
    NewProductPage,
  ],
  imports: [
    IonicPageModule.forChild(NewProductPage),
    FileDropComponentModule,
    Ng2CompleterModule
  ],
  exports: [
    NewProductPage
  ]
})
export class NewProductPageModule {}
