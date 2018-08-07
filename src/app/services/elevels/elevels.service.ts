import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ELevelsService {

  constructor(private http: HttpClient) { }
  service(config) { ////method,url,
    let query: string = "";
    let variable: object = {};
    console.log(config)
    switch (config.method) {
      case "POST": //create
        query = ``
        variable = {

        }
        break;
      case "GET": //read
        query = `{ levelOnes { name LevelTwo { name levelThree { name } } } }`;
        break;
      case "PUT"://update
        query = ``
        variable = {

        }
        break;
      case "DELETE": //delete
        query = `mutation ($namel1: String!, $namel2: String!, $namel3: String!) { deleteManyLevelOnes(where: {name: $namel1, LevelTwo_every: {name: $namel2, levelThree_every: {name: $namel3}}}) { count } }`
        variable = {
          namel1:config.namel1,
          namel2:config.namel2,
          namel3:config.namel3
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
