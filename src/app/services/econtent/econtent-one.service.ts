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
        query = `mutation ($namel1: String!) { createContentLevelOne(data: {name: $namel1}) { id name } } `
        variable = {
          namel1:config.namel1
        }
        break;
      case "GET": //read
        query = `{ contentLevelOnes { id name contentLevelTwo { id name contentLevelThree { id name contentLevelFour { id name } } } } }`;
        break;
      case "POST"://update
        query = `mutation ($namel1: String!, $namel2: String!, $Id: ID!) { updateContentLevelOne(data: {name: $namel1, contentLevelTwo: {create: {name: $namel2}}}, where: {id: $Id}) { id name contentLevelTwo { id name } } } `
        variable = {
          namel1:config.namel1,
          namel2:config.namel2,
          Id:config.Id
        }
        break;
      case "DELETE": //delete
        query = `mutation ($Id: ID!) { deleteContentLevelOne(where: {id: $Id}) { id name } } `
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
