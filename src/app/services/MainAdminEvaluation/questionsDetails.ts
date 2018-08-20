import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class questionDetails {
  constructor(private http: HttpClient) { }

  service(config) { ////method,url,name,cities,newName
    let query: string = "";
    let variable: object = {};
    // console.log(config)
    switch(config.method){
      case "POST" : //update
        query = `` 
        variable = {
         
        }       
      break;
      case "GET": //read
        query = ``;
      break;
      case "PUT"://create
        query = ``
        variable = {
         name:config.name 
        }
      break;
      case "DELETE": //delete
        query = ``
        variable = {
            id:config.id
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
