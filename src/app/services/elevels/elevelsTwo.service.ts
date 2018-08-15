import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ELevelsTwoService {

  constructor(private http: HttpClient) { }
  service(config) { ////method,url,newName2,newName3,id
    let query = '';
    let variable: object = {};
    switch (config.method) {
      case "PUT": //create
        query = ` `
        variable = {
        }
        break;
      case "GET": //read
        query = `{ levelOnes { id, name, LevelTwo { id, name, levelThree { id, name } } } }`;
        break;
      case "POST"://update
        // tslint:disable-next-line:max-line-length
        query = `mutation ($newName2: String!, $newName3: String!, $id: ID!) { updateLevelTwo(data: {name: $newName2, levelThree: {create: {name: $newName3}}}, where: {id: $id}) { id name levelThree { id name } } } `
        variable = {
          newName2:config.newName2,
          newName3:config.newName3,
          id:config.id
        }
        break;
      case "DELETE": //delete
        query = `mutation ($id: ID!) { deleteLevelTwo(where: {id: $id}) { id name } } `
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
