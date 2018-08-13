import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CourseContentService {

  constructor(private http: HttpClient) { }
  service(config) { ////method,url,namel1,namel2,namel3
    let query: string = "";
    let variable: object = {};
    console.log(config)
    switch (config.method) {
      case "PUT": //create
        query = ``
        variable = {
          
        }
        break;
      case "GET": //read
        query = ``;
        break;
      case "POST"://update
        query = ``
        variable = {

        }
        break;
      case "DELETE": //delete
        query = ``
        variable = {
          
        }
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
