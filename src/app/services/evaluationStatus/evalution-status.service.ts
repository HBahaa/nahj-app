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
    console.log(config)
    switch(config.method){
      case "POST" : //update
        query = `` 
        variable = {
          
        }       
      break;
      case "GET": //read
        query = `{ evaluationStatuses { name } } `;
      break;
      case "PUT"://create
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
