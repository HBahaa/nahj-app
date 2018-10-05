import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class classes {

    constructor(private http: HttpClient) { }

    service(config) {
        let query: string = ``
        let variable: object = {};
        switch (config.method) {
            case "POST": //update
                query=`query(
                  $studyLevelOne:ID!
                  $studyLevelTwo:ID!
                  $studyLevelThree:ID!
                ){
                  specificStudyLevels(
                    where:{
                      studyLevelOne:{
                        id:$studyLevelOne
                      }
                      studyLevelTwo:{
                        id:$studyLevelTwo
                      }
                      studylevelThree:{
                        id:$studyLevelThree
                      }
                    }
                  ){
                    id
                  }
                }`
            break;
            case "PUT" : //Create
                query=`mutation(
                    $studyLevelOne:ID!
                    $studyLevelTwo:ID!
                    $studyLevelThree:ID!
                    $schoolId:ID!
                  ){
                    updateSchool(
                      data: {
                        specificStudyLevels: {
                          create: {
                            studyLevelOne:   { connect: { id: $studyLevelOne  } }
                            studyLevelTwo:   { connect: { id: $studyLevelTwo  } }
                            studylevelThree: { connect: { id: $studyLevelThree } }
                          }
                        }
                      }
                      where: { id: $schoolId }
                    ) {
                      id
                    }
                  }`
            break;
            case "DELETE" : //Delete
                  query=``
            break;
            case "GET":
                  query=`
                  query($schoolId: ID!) {
                    school(where: { id: $schoolId }) {
                      classes {
                        id
                        studyLevelOnea {
                          id
                          name
                          studyLevelTwo {
                            id
                            name
                            class {
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
