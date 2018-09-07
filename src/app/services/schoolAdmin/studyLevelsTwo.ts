import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class studyLevelsTwo {

    constructor(private http: HttpClient) { }
    fields = ['schoolId','levelOneId','levelTwoId','levelTwoName'];
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
                query=`mutation($levelTwoName: String!, $levelTwoId: ID!) {
                  updateStudyLevelTwo(
                    data: { name: $levelTwoName }
                    where: { id: $levelTwoId }
                  ) {
                    id
                  }
                }`
                  variable = this.createVariable(config);
            break;
            case "PUT" : //Create
                query=`mutation($levelTwoName: String!, $levelOneId: ID!) {
                  updateStudyLevelOne(
                    data: { studyLevelTwo: { create: { name: $levelTwoName } } }
                    where: { id: $levelOneId }
                  ) {
                    id
                  }
                }
                `
                variable = this.createVariable(config);
            break;
            case "DELETE" : //Delete
                  query=`mutation($levelTwoId: ID!) {
                    deleteStudyLevelTwo(where: { id: $levelTwoId }) {
                      id
                    }
                  }
                  `
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
                  }
                  `
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
