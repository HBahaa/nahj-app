import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment-hijri';
import 'moment/locale/ar-sa';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
	date : any;

	@Input() userType;

	constructor( private authService: AuthService ) {
		let m = moment();
		this.date = m.format('dddd Do MMMM YYYY - iDo iMMMM iYYYY ');
	}

	ngOnInit() {
	}
	logout(){
		//this.authService.logout();
	}
}
