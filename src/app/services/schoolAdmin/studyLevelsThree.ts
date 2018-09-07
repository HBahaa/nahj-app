import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class studyLevelsThree {

    constructor(private http: HttpClient) { }
    fields = ['schoolId','levelTwoId','levelThreeId','levelThreeName'];
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
                query=`mutation($levelThreeName: String!, $levelThreeId: ID!) {
                  updateStudyLevelThree(
                    data: { name: $levelThreeName }
                    where: { id: $levelThreeId }
                  ) {
                    id
                  }
                }`
                  variable = this.createVariable(config);
            break;
            case "PUT" : //Create
                query=`mutation($levelThreeName: String!, $levelTwoId: ID!) {
                  updateStudyLevelTwo(
                    data: { studylevelThree: { create: { name: $levelThreeName } } }
                    where: { id: $levelTwoId }
                  ) {
                    id
                  }
                }`
                variable = this.createVariable(config);
            break;
            case "DELETE" : //Delete
                  query=`mutation($levelThreeId: ID!) {
                    deleteStudyLevelTwo(where: { id: $levelThreeId }) {
                      id
                    }
                  }`
                  variable = this.createVariable(config);
            break;
            case "GET":
                  query=`query($schoolId: ID!) {
                    school(where: { id: $schoolId }) {
                      specificStudyLevels {
                        id
                        studyLevelOne {
                          id
                          name
                          studyLevelTwo {
                            id
                            name
                            studylevelThree {
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
