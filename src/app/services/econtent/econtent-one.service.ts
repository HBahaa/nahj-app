import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EcontentOneService {

  constructor(private http: HttpClient) { }
  service(config) { ////method,url,namel1,namel2,namel3
    let query: string = "";
    let variable: object = {};
    switch (config.method) {
      case "PUT": //create
      console.log("confi", config);
        query = `mutation ($namel1: String!, $relativePercentagel1: Int!) { createContentLevelOne(data: {name: $namel1, relativePercentage: $relativePercentagel1}) { id name relativePercentage } } `
        variable = {
          namel1:config.namel1,
          relativePercentagel1: config.relativePercentagel1
        }
        break;
      case "GET": //read
        query = `{ contentLevelOnes { id name relativePercentage contentLevelTwo { id name relativePercentage contentLevelThree { id name relativePercentage contentLevelFour { id name relativePercentage } } } } }`;
        break;
      case "POST"://update
        query = `mutation ($namel1: String!, $namel2: String!, $relativePercentagel1: Int!, $relativePercentagel2 : Int!, $Id: ID!) { updateContentLevelOne(data: {name: $namel1, relativePercentage: $relativePercentagel1, contentLevelTwo: {create: {name: $namel2, relativePercentage: $relativePercentagel2}}}, where: {id: $Id}) { id name relativePercentage contentLevelTwo { id name relativePercentage } } } `
        variable = {
          namel1:config.namel1,
          namel2:config.namel2,
          relativePercentagel1: config.relativePercentagel1,
          relativePercentagel2: config.relativePercentagel2,
          Id:config.Id
        }
        break;
      case "DELETE": //delete
        query = `mutation ($Id: ID!) { deleteContentLevelOne(where: {id: $Id}) { id name relativePercentage } } `
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
