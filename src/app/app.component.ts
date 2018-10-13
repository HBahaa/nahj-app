import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { EvalutionStatusService } from './services/evaluationStatus/evalution-status.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	isLoggedIn$: Observable<boolean>;
	type: number;

	constructor(private router: Router, private authService: AuthService, private evaluate: EvalutionStatusService) {

	}

	async ngOnInit() {
		this.isLoggedIn$ = this.authService.isLoggedIn;
		// this.authService.isLoggedIn.subscribe((isLoggedIn:boolean)=>{
		// 	if (!isLoggedIn) {
		// 		this.router.navigate(['/login']);
		// 	}
		// 	else if (isLoggedIn) {
		// 		this.authService.userType.subscribe(type=>{
		// 			this.type = type;
		// 		})
		// 	}
		// })
		this.authService.isLoggedIn.subscribe((isLoggedIn:boolean)=>{
			// if (!isLoggedIn) {
			// 	this.router.navigate(['/login']);
			// }
			// else 
			if (isLoggedIn) {
				this.authService.userType.subscribe(type=>{
					this.router.navigate(['/school/teachers']);
					this.type = 3;
				})
			}
		})
	}

}
