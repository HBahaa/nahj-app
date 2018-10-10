import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    url = 'http://134.119.195.228:4000/api';
    constructor(private http: HttpClient) { }
}