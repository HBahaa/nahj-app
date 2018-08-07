import { TestBed, inject } from '@angular/core/testing';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
    	imports:[ RouterModule, Router ],
      	providers: [ AuthService ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
