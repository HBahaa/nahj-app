import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EcontentThreeService {

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
        query = `	mutation ($namel3: String!, $namel4: String!, $Id: ID!) { updateContentLevelThree(data: {name: $namel3, contentLevelFour: {create: {name: $namel4}}}, where: {id: $Id}) { id name contentLevelFour { id name } } } `
        variable = {
          namel3:config.namel3,
          namel4:config.namel4,
          Id:config.Id
        }
        break;
      case "DELETE": //delete
        query = `mutation ($Id: ID!) { deleteContentLevelThree(where: {id: $Id}) { id name } } `
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
