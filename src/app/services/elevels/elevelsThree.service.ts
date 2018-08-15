import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ELevelsThreeService {

  constructor(private http: HttpClient) { }
  service(config) {
    let query = '';
    let variable: object = {};

    switch (config.method) {
      case 'POST': // update
        // console.log("conf" , config);
        query = `mutation ($newName3: String!, $id: ID!) { updateLevelThree(data: {name: $newName3}, where: {id: $id}) { id name } }`;
        variable = {
          newName3:config.newName3,
          id:config.id
        };
        break;
      case 'DELETE': // delete
        query = `mutation ($id: ID!) { deleteLevelThree(where: {id: $id}) { id, name } }`;
        variable = {
          id: config.id
        };
        break;
    }
    return this
      .http
      .post(`${config.url}`, {
        'query': query,
        'variables': variable
      });
  }
}
