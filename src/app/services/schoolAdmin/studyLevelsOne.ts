import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class studyLevelsOne {

    constructor(private http: HttpClient) { }
    fields = ['schoolId','levelOneName','levelOneId'];
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
                query=`mutation(
                    $levelOneName: String!
                    $levelOneId:ID!
                  ){
                    updateStudyLevelOne(
                      data:{
                        name:$levelOneName
                      }
                      where:{
                        id:$levelOneId
                      }
                    ){
                      id
                    }
                  }`
                  variable = this.createVariable(config);
            break;
            case "PUT" : //Create
                query=`mutation($levelOneName: String!, $schoolId: ID!) {
                    updateSchool(
                      data: {
                        specificStudyLevels: {
                          create: { studyLevelOne: { create: { name: $levelOneName } } }
                        }
                      }
                      where: { id: $schoolId }
                    ) {
                      id
                    }
                  }
                `
                variable = this.createVariable(config);
            break;
            case "DELETE" : //Delete
                  query=`mutation($levelOneId: ID!) {
                    deleteStudyLevelOne(where: { id: $levelOneId }) {
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
                  variable = {
                    schoolId:config.schoolId
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
