import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { Observable} from 'rxjs';
import { map, take } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

	title = 'app';
	isLoggedIn$: Observable<boolean>;
	type: any;

	constructor(private router: Router, private authService: AuthService){
		
	}

	ngOnInit() {
		this.isLoggedIn$ = this.authService.isLoggedIn;
		this.authService.isLoggedIn.subscribe((isLoggedIn:boolean)=>{
			this.type = 1;

			if (!isLoggedIn) {
				this.router.navigate(['/login']);
			}else if (this.type == 1) {
				this.router.navigate(['/']);
			}else if (this.type == 2) {
				this.router.navigate(['/teacher/profile']);
			}
		})
	}

}
