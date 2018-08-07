import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-school-navbar',
  templateUrl: './school-navbar.component.html',
  styleUrls: ['./school-navbar.component.scss']
})
export class SchoolNavbarComponent implements OnInit {

	constructor ( private authService: AuthService ) { }

	ngOnInit() {
	}

  	logout(){
		//this.authService.logout();
	}
}
