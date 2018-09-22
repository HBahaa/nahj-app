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
        // console.log(config)
        switch (config.method) {
            case "POST": //update
                query = `mutation{
                  updateQuestionType(
                    data:{
                      ${config.hasOwnProperty('name') ? `name: ${config.name}` : '' }
                      ${config.hasOwnProperty('weight') ? `weight: ${config.weight}` : '' }
                      ${config.hasOwnProperty('accountWay') ? `${ config.accountWay == false ? `accountWay: {disconnect:true}` : `accountWay: {connect:{id:${config.accountWay}}}` }` : ''}
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
                      title
                      shortTitle
                      currentStatus{
                        id
                        name
                      }
                      questionGroup{
                        id
                        name
                      }
                    }
                  }
                  contentLevelTwoes{
                    evaluation{
                      id
                      title
                      shortTitle
                      currentStatus{
                        id
                        name
                      }
                      questionGroup{
                        id
                        name
                      }
                    }
                  }
                  contentLevelThrees{
                    evaluation{
                      id
                      title
                      shortTitle
                      currentStatus{
                        id
                        name
                      }
                      questionGroup{
                        id
                        name
                      }
                    }
                  }
                  contentLevelFours{
                    evaluation{
                      id
                      title
                      shortTitle
                      currentStatus{
                        id
                        name
                      }
                      questionGroup{
                        id
                        name
                      }
                    }
                  }
                }`;
                break;
            case "PUT"://create
                query = `mutation{
                  updateEvaluation(
                    data:{
                      questionGroup:{
                        create:{
                          ${config.hasOwnProperty('name') ? `name: ${config.name}` : '' }
                          ${config.hasOwnProperty('weight') ? `weight: ${config.weight}` : '' }
                          ${config.hasOwnProperty('accountWay') ? `accountWay:{connect:{id:""}}`:'' }
                        }
                      }
                    }
                    where:{
                      id:${config.id}
                    }
                  ){
                    id
                  }
                }`
                break;
            case "DELETE": //delete
                query = `mutation{
                  deleteQuestionType(where:{id:${config.id}}){id}
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
  config:{
    method:'',
    name:'',
    accountWay:'ID'
    id:'id'
  }
*/