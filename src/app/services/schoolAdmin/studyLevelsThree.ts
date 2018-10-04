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
                query=`mutation{
                  updateClass(
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
                  updateStudyLevelTwo(
                    data:{
                      class:{
                        create:{
                          name:"${config.name}"
                          studyLevelOnea:{
                            connect:{
                              id:"${config.studyLevelOnea}"
                            }
                          }
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
                query=`mutation {
                  deleteClass(where: { id: "${config.id}" }) {
                    id
                  }
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
