// -----------------------------------------------------------------
// Components
// -----------------------------------------------------------------
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
// -----------------------------------------------------------------
// Libraries
// -----------------------------------------------------------------
import * as firebase from 'firebase';
import * as _ from 'lodash';
import { Product } from "../../interface";


@Injectable()
export class BackProvider {

	keyProducts = {}
	listProducts = []
	private updateProduct = new Subject<Product>()
	obsProduct = this.updateProduct.asObservable()

	private deletProduct = new Subject<void>()
	obsProductDelet = this.deletProduct.asObservable()

	constructor(private http: Http) {
		console.log('Hello BackProvider Provider');
	}

	load(){
		this.loadProducts()
	}

	private loadProducts() {
		firebase.database().ref('productos').on('child_added', snap => {
			if (!this.keyProducts[snap.key]) {
				this.keyProducts[snap.val().codigo] = 1
				this.listProducts.push(snap.val())
				this.updateProduct.next(snap.val())
			}
		})

		firebase.database().ref('productos').on('child_removed', snap => {
			let prod:Product = snap.val()
			delete this.keyProducts[prod.codigo]
			this.listProducts = _.remove(this.listProducts,(o:Product)=>{
				return o.key == prod.key
			})
			this.deletProduct.next()
		})
	}

}
