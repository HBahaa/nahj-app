import { evaluation } from './evaluation';
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
                query = `mutation($name:String!,$weight:String!,$id:ID) {
            updateQuestionType(
              data: {
                name: $name
                weight: $weight
              }
              where: { id: $id }
            ) {
              id
              name
              weight
            }
          }`
                variable = {
                    name: config.name,
                    weight: config.weight,
                    id: config.id
                }
                break;
            case "GET": //read
                query = `{
                    questionTypes {
                      id
                      name
                      weight
                      questions {
                        id
                        question
                        details
                        enhancement
                        weight
                        multiSelect
                        isPercentage
                        isEqualWeights
                      }
                    }
                  }`;
                break;
            case "PUT"://create
                query = `mutation($name:String!,$weight:String!,$evaluationId:ID){
            updateEvaluation(
              data:{
                questionGroup:{
                  create:{
                    name:$name,
                    weight:$weight
                  }
                }
              },
              where:{
                id:$evaluationId
              }
            ){
              id,
              title
              questionGroup{
                id,
                name,
                weight
              }
            }
          }`
                variable = {
                    name: config.name,
                    weight: config.weight,
                    evaluationId: config.evaluationId
                }
                break;
            case "DELETE": //delete
                query = `mutation($Id:ID!){
                    deleteQuestionType(
                      where:{
                        id:$Id
                      }
                    ){
                          id,
                      name,
                      weight
                      }
                  }`
                variable = {
                    Id: config.Id
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
