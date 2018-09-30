import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class questionType {
    constructor(private http: HttpClient) { }

    service(config) { ////method,url,name,cities,newName
        let query: string = "";
        let variable: object = {};
        console.log("questionType service: ===> ", config)
        switch (config.method) {
            case "POST": //update
                query = `mutation{
                  updateQuestionType(
                    data:{
                      ${config.hasOwnProperty('name') ? `name: ${config.name}` : '' }
                      ${config.hasOwnProperty('weight') ? `weight: ${config.weight}` : '' }
                      
                    }
                    where:{
                      id:${config.id}
                    }
                  ){
                    id
                  }
                }`
                break;
            case "GET": //read
                query = `query{
                  contentLevelOnes{
                    evaluation{
                      id
                      questionGroup{
                        id
                        name
                        weight
                      }
                    }
                  }
                  contentLevelTwoes{
                    evaluation{
                      id
                      questionGroup{
                        id
                        name
                        weight
                      }
                    }
                  }
                  contentLevelThrees{
                    evaluation{
                      id
                      questionGroup{
                        id
                        name
                        weight
                      }
                    }
                  }
                  contentLevelFours{
                    evaluation{
                      id
                      questionGroup{
                        id
                        name
                        weight
                      }
                    }
                  }
                }`;
                break;
            case "PUT"://create
                query = `mutation($id:ID!, $name: String!, $weight:String!){
                  updateEvaluation(
                    data:{
                      questionGroup:{
                        create:{
                          name: $name
                          weight: $weight
                        }
                      }
                    }
                    where:{
                      id:$id
                    }
                  ){
                    id
                  }
                }`
                variable = {
                  id: config.id,
                  name: config.name,
                  weight: config.weight
                }
                break;
            case "DELETE": //delete
                query = `mutation($id: ID!){
                  deleteQuestionType(where:{id:$id}){id}
                }`
                variable= {
                  id: config.id
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

/*
  config:{
    method:'',
    name:'',
    accountWay:'ID'
    id:'id'
  }
*/