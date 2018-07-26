import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment-hijri';
import 'moment/locale/ar-sa';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
	date : any;

	@Input() userType;

	constructor() {
		let m = moment();
		this.date = m.format('dddd Do MMMM YYYY - iDo iMMMM iYYYY ');
	}

	ngOnInit() {
	}
}
