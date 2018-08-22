import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class questionDetails {
  constructor(private http: HttpClient) { }

  service(config) { ////method,url,name,cities,newName
    let query: string = "";
    let variable: object = {};
    // console.log(config)
    switch(config.method){
      case "POST" : //update
        query = `mutation(
          $Id: ID!
          $question: String!
          $details: String!
          $enhancement: String!
          $weight: String!
          $multiSelect: String!
          $isPercentage: Boolean!
          $isEqualWeights: Boolean!
        ) {
          updateQuestion(
            data: {
              question: $question
              details: $details
              enhancement: $enhancement
              weight: $weight
              multiSelect: $multiSelect
              isPercentage: $isPercentage
              isEqualWeights: $isEqualWeights
            }
            where: { id: $Id }
          ) {
            id
            question
            details
            enhancement
            weight
            multiSelect
            isPercentage
            isEqualWeights
          }
        }` 
        variable = {
          Id:config.Id,
          question:config.question,
          details:config.details,
          enhancement:config.enhancement,
          weight:config.weight,
          multiSelect:config.multiSelect,
          isPercentage:config.isPercentage,
          isEqualWeights:config.isEqualWeights
        }       
      break;
      case "GET": //read
        query = `query {
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
        }`;
      break;
      case "PUT"://create
        query = `mutation(
          $questionTypeId: ID!
          $question: String!
          $details: String!
          $enhancement: String!
          $weight: String!
          $multiSelect: String!
          $isPercentage: Boolean!
          $isEqualWeights: Boolean!
        ) {
          updateQuestionType(
            data: {
              questions: {
                create: {
                  question: $question
                  details: $details
                  enhancement: $enhancement
                  weight: $weight
                  multiSelect: $multiSelect
                  isPercentage: $isPercentage
                  isEqualWeights: $isEqualWeights
                }
              }
            }
            where: { id: $questionTypeId }
          ) {
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
        }`
        variable = {
          questionTypeId:config.questionTypeId,
          question:config.question,
          details:config.details,
          enhancement:config.enhancement,
          weight:config.weight,
          multiSelect:config.multiSelect,
          isPercentage:config.isPercentage,
          isEqualWeights:config.isEqualWeights
        }
      break;
      case "DELETE": //delete
        query = `mutation($Id:ID!) {
          deleteQuestion(where: { id: $Id }) {
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
        `
        variable = {
            Id:config.Id
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
