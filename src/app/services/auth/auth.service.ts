import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private type = new BehaviorSubject<number>(0);


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
        this.type.next(1);
        this.router.navigate(['/']);
      }
      else if (user.userName == 'teacher') {
        this.type.next(2);
        this.router.navigate(['/teacher/profile']);
      }
    }
  }

  logout() {                           
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}