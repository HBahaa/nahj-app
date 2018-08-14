import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EcontentFourService {

  constructor(private http: HttpClient) { }
  service(config) { ////method,url,namel1,namel2,namel3
    let query: string = "";
    let variable: object = {};
    switch (config.method) {
      case "PUT": //create
        query = ``
        variable = {
        }
        break;
      case "GET": //read
        query = `{ contentLevelOnes { id name contentLevelTwo { id name contentLevelThree { id name contentLevelFour { id name } } } } }
        variables	{}`;
        break;
      case "POST"://update
        query = `mutation ($namel4: String!, $Id: ID!) { updateContentLevelFour(data: {name: $namel4}, where: {id: $Id}) { id name } }`
        variable = {
          namel4:config.namel4,
          Id:config.Id
        }
        break;
      case "DELETE": //delete
        query = `mutation ($Id: ID!) { deleteContentLevelFour(where: {id: $Id}) { id name } }`
        variable = {
          Id:config.Id
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
