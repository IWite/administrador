// -----------------------------------------------------------------
// Components
// -----------------------------------------------------------------
import { Component, } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComunProvider } from "../../providers/comun/comun";
import { CompleterService, CompleterData } from 'ng2-completer';
// -----------------------------------------------------------------
// Providers
// -----------------------------------------------------------------
import { BackProvider } from "../../providers/back/back";
// -----------------------------------------------------------------
// Libraries
// -----------------------------------------------------------------
import * as firebase from 'firebase';
import * as _ from 'lodash';
import { Product } from "../../interface";


@IonicPage()
@Component({
	selector: 'page-new-product',
	templateUrl: 'new-product.html',
})
export class NewProductPage {
	// -----------------------------------------------------------------
	// Atributos
	// -----------------------------------------------------------------

	nombre: string
	codigo: string
	description: string
	img: string

	protected dataService: CompleterData;
	protected searchData: any[];
	listaSubProduc: Product[] = []
	selectSubProd: Product

	identificador: string

	constructor(public navCtrl: NavController, public navParams: NavParams, private comun: ComunProvider, private back: BackProvider, private completerService: CompleterService) {
		this.searchData = back.listProducts
		this.dataService = completerService.local(this.searchData, 'nombre,codigo', 'nombre');

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad NewProductPage');
	}

	validar(parametro: string) {
		return (parametro == null || parametro == '') ? false : true
	}

	addSubp() {
		if (this.selectSubProd) {

			let ind = _.findIndex(this.listaSubProduc, (o: Product) => {
				return o.key == this.selectSubProd.key
			})
			if (ind == -1) {
				this.listaSubProduc.push(this.selectSubProd)
				console.log(this.listaSubProduc)
			}
			this.selectSubProd = null
			this.identificador = null
		}

	}
	selesc(eve) {
		if (eve) {
			this.selectSubProd = eve.originalObject
		}

	}

	loadimg(elem: HTMLImageElement) {
		if (elem.naturalWidth >= elem.naturalHeight)
			elem.classList.add('img-horizontal')
		else
			elem.classList.add('img-vertical')
	}

	borrar(index){
		this.listaSubProduc.splice(index,1)
	}

	save() {
		if (!this.validar(this.nombre))
			this.comun.showAlert('Error', 'EL producto debe tener un nombre')
		else if (!this.validar(this.codigo))
			this.comun.showAlert('Error', 'El producto debe tener un código')
		else if (this.back.keyProducts[this.codigo] != null)
			this.comun.showAlert('Error', 'El código del producto ya esta en uso')
		else {
			let load = this.comun.loadingCtrl.create({
				content: 'Cargando...',
				dismissOnPageChange: true
			})
			load.present()
			let pat = firebase.database().ref('productos').push()
			let pro: Product = {
				codigo: this.codigo,
				key: pat.key,
				nombre: this.nombre,
				descripcion: (this.validar(this.description)) ? this.description : ''
			}
			if(this.listaSubProduc.length>0){
				let lista = this.listaSubProduc.map((elem:Product)=>{
					return elem.key
				})
				pro.subProductos = lista
			}
			if (this.img != null && this.img != '') {
				let storageRef = firebase.storage().ref()
				let file = this.dataURItoBlob(this.img)
				let uploadTask = storageRef.child('producto').child(pat.key + '.jpg').put(file);
				uploadTask.on('state_changed',
					snap => {
						let progress = (snap.bytesTransferred / snap.totalBytes) * 100;
						console.log(progress)
					},
					err => {
						console.log(err)
						load.dismiss()
					},
					() => {
						let url = uploadTask.snapshot.downloadURL
						pro['img'] = url
						pat.set(pro).then(a => {
							this.navCtrl.pop()
						})
					}
				)
			}
			else {
				pat.set(pro).then(a => {
					this.navCtrl.pop()
				})
			}
		}
	}


	/**
	 * Covert a imga 64 to a blob
	 * @param {string} dataURI string of img 64
	 * @returns {Blob}
	 * @memberOf ComunService
	 */
	dataURItoBlob(dataURI: string): Blob {
		var arr = dataURI.split(','), mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new Blob([u8arr], { type: mime });
	}
}

