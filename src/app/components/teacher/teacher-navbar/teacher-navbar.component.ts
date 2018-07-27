import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-teacher-navbar',
  templateUrl: './teacher-navbar.component.html',
  styleUrls: ['./teacher-navbar.component.scss']
})
export class TeacherNavbarComponent implements OnInit {

	constructor ( private authService: AuthService ) { }

	ngOnInit() {
	}

  	logout(){
		//this.authService.logout();
	}
}
