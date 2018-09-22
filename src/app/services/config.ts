import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    // url = 'http://134.119.195.228/login';
    url = 'http://localhost:4466';
    constructor(private http: HttpClient) { }
}