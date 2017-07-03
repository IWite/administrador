import { Component, NgZone ,Output, EventEmitter} from '@angular/core';

/**
 * Generated class for the FileDropComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
	selector: 'file-drop',
	templateUrl: 'file-drop.html'
})
export class FileDropComponent {

	loaded: boolean;
	imageSrc: string = '';
	drawin: boolean = false
	activeColor: string = 'green';
	baseColor: string = '#ccc';

	@Output() imgUpdate = new EventEmitter();

	constructor(private zone: NgZone) {
	}

	handleDragEnter() {
		this.zone.run(() => {
			this.drawin = true;
		})

	}

	handleDragLeave() {
		this.zone.run(() => {
			this.drawin = false;
		})		
	}

	handleInputChange(e) {
		var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
		if (file == null)
			return

		var pattern = /image-*/;
		var reader = new FileReader();

		if (!file.type.match(pattern)) {
			alert('invalid format');
			return;
		}

		this.loaded = false;

		reader.onload = this._handleReaderLoaded.bind(this);
		reader.readAsDataURL(file);
	}

	handleDrop(e) {
		e.preventDefault();
		this.drawin = false;
		this.handleInputChange(e);
	}

	_handleReaderLoaded(e) {
		let reader = e.target;
		this.imageSrc = reader.result;
		this.imgUpdate.emit(this.imageSrc)
		this.loaded = true;
	}

}
