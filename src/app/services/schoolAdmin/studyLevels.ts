import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class studyLevels {

    constructor(private http: HttpClient) { }

    service(config) {
        let query: string = ``
        let variable: object = {};
        switch (config.method) {
            case "POST": //update
            break;
            case "PUT" : //Create
            break;
            case "DELETE" : //Delete
            break;
            case "GET":
            break;

        }

        return this
            .http
            .post(`${config.url}`, {
                "query": query,
                "variables": variable
            });
    }
}