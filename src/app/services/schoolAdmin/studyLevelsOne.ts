import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class studyLevelsOne {

    constructor(private http: HttpClient) { }

    service(config) {
        let query: string = ``
        let variable: object = {};
        switch (config.method) {
            case "POST": //update
                query=`mutation {
                  updateStudyLevelOne(
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
            console.log("put config", config)
                query=`mutation {
                  updateSchool(
                    where: { id: "${config.id}" }
                    data:{
                      classes:{
                        create:{
                          name:""
                          studyLevelOnea:{
                            create:{
                              name:"${config.name}"
                            } 
                          }
                        }
                      }
                    }
                  ) {
                    id
                  }
                }`
            break;
            case "DELETE" : //Delete
                  query=`mutation {
                    deleteStudyLevelOne(where: { id: "${config.id}" }) {
                      id
                    }
                  }`
            break;
            case "GET":
                  query=`query{
                    schools(
                      where:{id:"${config.id}"}
                    ){
                      classes{
                        studyLevelOnea{
                          id
                          name
                          studyLevelTwo{
                            id
                            name
                            class{
                              id
                              name
                            }
                          }
                        }
                      }
                    }
                  }`
                  
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

/*
config{
  method:
  id: --> school id (create/get) || studylevelOneid (update/delete) (required)
  name: (required)

}

*/