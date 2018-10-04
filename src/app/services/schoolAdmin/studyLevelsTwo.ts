import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class studyLevelsTwo {

    constructor(private http: HttpClient) { }

    service(config) {
        let query: string = ``
        let variable: object = {};
        switch (config.method) {
            case "POST": //update
              query=`mutation{
                updateStudyLevelTwo(
                  data:{
                    name:"${config.name}"
                  }
                  where:{
                    id:"${config.id}"
                  }
                ){
                  id
                }
              }`
            break;
            case "PUT" : //Create
                query=`mutation{
                  updateStudyLevelOne(
                    data:{
                      studyLevelTwo:{
                        create:{
                          name:"${config.name}"
                        }
                      }
                    }
                    where:{
                      id:"${config.id}"
                    }
                  ){
                    id
                  }
                }`
            break;
            case "DELETE" : //Delete
                  query=`mutation{
                    deleteStudyLevelTwo(where:{id:"${config.id}"}){id}
                  }`
            break;
            case "GET":
                  query=``
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
