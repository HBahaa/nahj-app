import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EcontentTwoService {

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
        query = `mutation ($namel2: String!, $namel3: String!, $relativePercentagel2: Int!, $relativePercentagel3: Int!, $Id: ID!) { updateContentLevelTwo(data: {name: $namel2, relativePercentage: $relativePercentagel2, contentLevelThree: {create: {name: $namel3, relativePercentage: $relativePercentagel3}}}, where: {id: $Id}) { id name relativePercentage contentLevelThree { id name relativePercentage } } } `
        variable = {
          namel2:config.namel2,
          namel3:config.namel3,
          relativePercentagel2: config.relativePercentagel2,
          relativePercentagel3: config.relativePercentagel3,
          Id:config.Id
        }
        break;
      case "DELETE": //delete
        query = `mutation ($Id: ID!) { deleteContentLevelTwo(where: {id: $Id}) { id name relativePercentage } } `
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
