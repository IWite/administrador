// -----------------------------------------------------------------
// Components
// -----------------------------------------------------------------
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
// -----------------------------------------------------------------
// Providers
// -----------------------------------------------------------------
import { EnvironmentsModule } from "./environment/env.module";
import { ComunProvider } from '../providers/comun/comun';
import { BackProvider } from '../providers/back/back';
@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    EnvironmentsModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ComunProvider,
    BackProvider
  ]
})
export class AppModule { }
