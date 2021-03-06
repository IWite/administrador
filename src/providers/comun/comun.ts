// -----------------------------------------------------------------
// Componentes
// -----------------------------------------------------------------
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { LoadingController, Loading } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import 'rxjs/add/operator/map';


@Injectable()
export class ComunProvider {

	constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController) { }

	/**
	  * show a native menssage in Ionic 
	  * @param {string} title
	  * @param {string} msg
	  * @memberOf UnregisteredPage
	  */
	showAlert(title: string, msg: string) {
		let alert = this.alertCtrl.create({
			title: title,
			message: msg,
			buttons: ["Aceptar"]
		})
		alert.present()
	}


	/**
	 * Show a native loading popup in ionic 
	 * @param {string} msg
	 * @returns {Loading} isntancia de la ventana de cargando
	 * @memberOf ComunService
	 */
	showLoad(msg: string): Loading {
		let loader = this.loadingCtrl.create({
			content: msg,
		});
		return loader
	}


}
