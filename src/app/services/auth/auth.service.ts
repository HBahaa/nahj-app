import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(true);
  private type = new BehaviorSubject<number>(1);


  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  get userType() {
    return this.type.asObservable();
  }

  constructor(
    private router: Router
  ) {}

  login(user){
    if (user.userName !== '' && user.password !== '' ) {
      this.loggedIn.next(true);
      // this.router.navigate(['/']);

      if (user.userName == 'admin') {
        this.router.navigate(['/']);
        this.type.next(1);
      }
      else if (user.userName == 'teacher') {
        this.router.navigate(['/teacher/profile']);
        this.type.next(2);
      }
    }
  }

  logout() {                           
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}