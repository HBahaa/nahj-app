import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class classes {

    constructor(private http: HttpClient) { }
    fields = ['studyLevelOne','studyLevelTwo','studyLevelThree','schoolId'];
    createVariable(config){
        let newVar = {};
        for (let key in config){
            if(this.fields.includes(key) && config[key])
                newVar[key] = config[key]
        }
        return newVar
    }
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
                variable = this.createVariable(config);
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
                variable = this.createVariable(config);
            break;
            case "DELETE" : //Delete
                  query=``
                  variable = this.createVariable(config);
            break;
            case "GET":
                  query=`
                  query($schoolId:ID!){
                    school(where: { id: $schoolId }) {
                      specificStudyLevels {
                        id
                        studyLevelOne {
                          id
                          name
                        }
                        studyLevelTwo {
                          id
                          name
                        }
                        studylevelThree {
                          id
                          name
                        }
                      }
                    }
                  }`
                  variable = this.createVariable(config);
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
