import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ELevelsOneService {

  constructor(private http: HttpClient) { }
  service(config) { ////method,url,newName1,newName2,id
    let query: string = "";
    let variable: object = {};
    switch (config.method) {
      case "PUT": //create
        query = `mutation ($name: String!) { createLevelOne(data: {name: $name}) { id, name } }`
        variable = {
          name:config.newName1
        }
        break;
      case "GET": //read
        query = `{ levelOnes { id, name, LevelTwo { id, name, levelThree { id, name } } } }`;
        break;
      case "POST"://update
        query = `mutation ($newName1: String!, $newName2: String!, $id1: ID!) { updateLevelOne(data: {name: $newName1, LevelTwo: {create: {name: $newName2}}}, where: {id: $id1}) { id, name, LevelTwo { id, name } } }`
        variable = {
          newName1:config.newName1,
          newName2:config.newName2,
          id1:config.id
        }
        break;
      case "DELETE": //delete
        query = `mutation ($id: ID!) { deleteLevelOne(where: {id: $id}) { id, name } } `
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
