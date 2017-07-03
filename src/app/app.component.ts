// -----------------------------------------------------------------
// Components
// -----------------------------------------------------------------
import { Component, ViewChild ,Inject} from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EnvVariables } from "./environment/env.token";
// -----------------------------------------------------------------
// Providers
// -----------------------------------------------------------------
import { BackProvider } from "../providers/back/back";
// -----------------------------------------------------------------
// Libraries
// -----------------------------------------------------------------
import * as firebase from 'firebase';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    // -----------------------------------------------------------------
    // Atributos
    // -----------------------------------------------------------------
    @ViewChild(Nav) nav: Nav;

    rootPage: any = 'ProductosPage';

    pages: Array<{ title: string, component: any }>;


    // -----------------------------------------------------------------
    // Constructor
    // -----------------------------------------------------------------
    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen , @Inject(EnvVariables) private env, private back:BackProvider) {
        this.initializeApp();
        firebase.initializeApp(env.config)
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Productos', component: 'ProductosPage' },
        ];
    }

    // -----------------------------------------------------------------
    // Metodos
    // -----------------------------------------------------------------

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.back.load()
        });
    }

    openPage(page) {
        this.nav.setRoot(page.component);
    }
}
