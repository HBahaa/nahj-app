import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-nahj-navbar',
  templateUrl: './nahj-navbar.component.html',
  styleUrls: ['./nahj-navbar.component.scss']
})
export class NahjNavbarComponent implements OnInit {


	constructor( private authService: AuthService ) {
	}

	ngOnInit() {
	}

	logout(){
		//this.authService.logout();
	}
}
