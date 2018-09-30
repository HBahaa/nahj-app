import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    url = 'http://localhost:4466';
    constructor(private http: HttpClient) { }
}