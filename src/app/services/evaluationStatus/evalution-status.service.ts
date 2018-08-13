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
        query = `` 
        variable = {
          
        }       
      break;
      case "GET": //read
        query = `{ evaluationStatuses { name } } `;
      break;
      case "POST"://create
        query = `mutation ($value: [String!]) { createEvaluationStatus(data: {name: {set: $value}}) { name } } `
        variable = {
          value:config.value
        }
      break;
      case "DELETE": //delete
        query = `mutation { deleteManyEvaluationStatuses { count } }`
        variable = {
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
