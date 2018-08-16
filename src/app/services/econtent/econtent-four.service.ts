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
        query = `{ contentLevelOnes { id name relativePercentage contentLevelTwo { id name relativePercentage contentLevelThree { id name relativePercentage contentLevelFour { id name relativePercentage } } } } }
        variables	{}`;
        break;
      case "POST"://update
        query = `mutation ($namel4: String!, $relativePercentagel4: Int!, $Id: ID!) { updateContentLevelFour(data: {name: $namel4, relativePercentage: $relativePercentagel4}, where: {id: $Id}) { id name relativePercentage } }`
        variable = {
          namel4:config.namel4,
          relativePercentagel4: config.relativePercentagel4,
          Id:config.Id
        }
        break;
      case "DELETE": //delete
        query = `mutation ($Id: ID!) { deleteContentLevelFour(where: {id: $Id}) { id name relativePercentage } }`
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
