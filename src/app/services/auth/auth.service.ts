import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(true);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router
  ) {}

  login(user){
    if (user.userName !== '' && user.password !== '' ) {
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    }
  }

  logout() {                           
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}