import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-parents-navbar',
  templateUrl: './parents-navbar.component.html',
  styleUrls: ['./parents-navbar.component.scss']
})
export class ParentsNavbarComponent implements OnInit {

	constructor(private authService: AuthService) { }

	ngOnInit() {
	}

	logout(){
		//this.authService.logout();
	}

}
