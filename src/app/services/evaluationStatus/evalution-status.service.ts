import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EvalutionStatusService {

  constructor(private http: HttpClient) { }

  service(config) { ////method,url,[value]
    let query: string = "";
    let variable: object = {};
    switch(config.method){
      case "PUT" : //update
        query = `mutation($name: String!, $id: ID!) {
          updateEvaluationStatus(where: { id: $id }, data: { name: $name }) {
            id
            name
          }
        }` 
        variable = {
          name:config.name,
          id:config.id
        }       
      break;
      case "GET": //read
        query = `query{
          evaluationStatuses{
            id,
            name
          }
        }`;
      break;
      case "POST"://create
        query = `mutation($name: String!) {
          createEvaluationStatus(data: { name: $name }) {
            id
            name
          }
        }`
        variable = {
          name:config.name
        }
      break;
      case "DELETE": //delete
        query = `mutation( $id: ID!) {
          deleteEvaluationStatus(where: { id: $id }) {
            id
            name
          }
        }`
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
