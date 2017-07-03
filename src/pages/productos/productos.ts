// -----------------------------------------------------------------
// Components
// -----------------------------------------------------------------
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BackProvider } from "../../providers/back/back";
// -----------------------------------------------------------------
// Libraries
// -----------------------------------------------------------------
import { Product } from "../../interface";
import * as firebase from 'firebase';


@IonicPage()
@Component({
	selector: 'page-productos',
	templateUrl: 'productos.html',
})
export class ProductosPage {
	// -----------------------------------------------------------------
	// Atributos
	// -----------------------------------------------------------------

	/** referencia de la pagina crear producto */
	pageCreate = 'NewProductPage'

	/** Lista de los productos */
	listaProductos: Product[] = []

	constructor(public navCtrl: NavController, public navParams: NavParams, private back: BackProvider) {
		this.listaProductos = back.listProducts
		back.obsProduct.subscribe(pro => {
			this.listaProductos = back.listProducts
		})

		back.obsProductDelet.subscribe(()=>{
			this.listaProductos = back.listProducts
		})
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ProductosPage');
	}

	loadimg(elem:HTMLImageElement){
		if(elem.naturalWidth>= elem.naturalHeight)
			elem.classList.add('img-horizontal')
		else
			elem.classList.add('img-vertical')
	}

	borrar(key){
		firebase.database().ref('productos').child(key).remove()
	}

}
