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
    console.log(config)
    switch(config.method){
      case "POST" : //update
        query = `mutation{
          updateQuestion(
            data:{
              ${config.hasOwnProperty('question') ? `question: "${config.question}"` : '' }
              ${config.hasOwnProperty('details') ? `details: "${config.details}"` : '' }
              ${config.hasOwnProperty('enhancement') ? `enhancement: "${config.enhancement}"` : '' }
              ${config.hasOwnProperty('weight') ? `weight: "${config.weight}"` : '' }
              ${config.hasOwnProperty('multiSelect') ? `multiSelect: "${config.multiSelect}"` : '' }
              isPercentage:${config.isPercentage ? 'true' : 'false'}
              isEqualWeights:${config.isEqualWeights ? 'true' : 'false'}
            }
            where:{
              id:"${config.id}"
            }
          ){
            id
          }
        }` 
      break;
      case "GET": //read
        query = `query{
          evaluations{
            id
            title
            questionGroup{
              id
              name
              questions{
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
          }
        }`; 
      break;
      case "PUT"://create
        query = `mutation{
          updateQuestionType(
            data:{
              questions:{
                create:{
                  ${config.hasOwnProperty('question') ? `question: "${config.question}"` : '' }
                  ${config.hasOwnProperty('details') ? `details: "${config.details}"` : '' }
                  ${config.hasOwnProperty('enhancement') ? `enhancement: "${config.enhancement}"` : '' }
                  ${config.hasOwnProperty('weight') ? `weight: "${config.weight}"` : '' }
                  ${config.hasOwnProperty('multiSelect') ? `multiSelect: "${config.multiSelect}"` : '' }
                  isPercentage:${config.isPercentage ? 'true' : 'false'}
                  isEqualWeights:${config.isEqualWeights ? 'true' : 'false'}
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
      case "DELETE": //delete
        query = `mutation{
          deleteQuestion(where:{id:${config.id}}){id}
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
/**
 * question
 * details
 * enhancement
 * weight
 * multiselect
 * isPercentage =-> true/false
 * isEqualWeights =-> true/false
 * id
 */