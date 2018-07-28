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
	type

	constructor(private router: Router, private authService: AuthService){
		
	}

	ngOnInit() {
		this.isLoggedIn$ = this.authService.isLoggedIn;
		this.authService.isLoggedIn.subscribe((isLoggedIn:boolean)=>{
			if (!isLoggedIn) {
				this.router.navigate(['/login']);
			}
			else{
				this.authService.userType.subscribe(type=>{
					this.type = type;
				})
			}
		})
	}

}
