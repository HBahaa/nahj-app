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
        query = `mutation ($name: [String!]) { updateManyStudyYears(data: {name: {set: $name}}) { count } } ` 
        variable = {
          studyYearName:config.studyYearName
        }       
      break;
      case "GET": //read
        query = `{ studyYears { name } } `;
      break;
      case "PUT"://create
        query = `mutation ($studyYearName: [String!]) { createStudyYear(data: {name: {set: $studyYearName}}) { name } } `
        variable = {
          studyYearName:config.studyYearName
        }
      break;
      case "DELETE": //delete
        query = `mutation { deleteManyStudyYears { count } } `
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
