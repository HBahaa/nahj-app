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
        query = `{ contentLevelOnes { id name relativePercentage contentLevelTwo { id name relativePercentage contentLevelThree { id name relativePercentage contentLevelFour { id name relativePercentage } } } } }
        variables	{}`;
        break;
      case "POST"://update
        query = `	mutation ($namel3: String!, $namel4: String!, $relativePercentagel3: Int!, $relativePercentagel4: Int!, $Id: ID!) { updateContentLevelThree(data: {name: $namel3, relativePercentage: $relativePercentagel3, contentLevelFour: {create: {name: $namel4, relativePercentage: $relativePercentagel4}}}, where: {id: $Id}) { id name relativePercentage contentLevelFour { id name relativePercentage } } } `
        variable = {
          namel3:config.namel3,
          namel4:config.namel4,
          relativePercentagel3: config.relativePercentagel3,
          relativePercentagel4: config.relativePercentagel4,
          Id:config.Id
        }
        break;
      case "DELETE": //delete
        query = `mutation ($Id: ID!) { deleteContentLevelThree(where: {id: $Id}) { id name relativePercentage } } `
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
