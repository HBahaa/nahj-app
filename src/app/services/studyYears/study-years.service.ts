import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudyYearsService {

  constructor(private http: HttpClient) { }
  service(config) { ////method,url,[studyYearName]
    let query: string = "";
    let variable: object = {};
    switch(config.method){
      case "POST" : //update
        query = `mutation($name:String!,$Id:ID!){
          updateStudyYear(
            data:{
              name:$name,
            },
            where:{
              id:$Id
            }
          ){
            id,
            name
          }
        }` 
        variable = {
          name:config.name,
          Id:config.Id
        }       
      break;
      case "GET": //read
        query = `query{
          studyYears{
            id,
            name
          }
        }`;
      break;
      case "PUT"://create
        query = `mutation($name:String!){
          createStudyYear(
            data:{
              name:$name,
            }
          ){
            id,
            name
          }
        }`
        variable = {
          name:config.name
        }
      break;
      case "DELETE": //delete
        query = `mutation($Id:ID!){
          deleteStudyYear(
            where:{
              id:$Id
            }
          ){
            id,
            name
          }
        }`
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
