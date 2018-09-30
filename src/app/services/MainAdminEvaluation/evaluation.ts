import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class evaluation {
  constructor(private http: HttpClient) { }
  
  service(config) { 
    let query: string = "";
    let variable: object = {};
    console.log("evaluation service: ===> ",config)
    switch (config.method) {
      case "POST": //update
        query = `mutation{
          updateEvaluation(
            data:{
              ${config.hasOwnProperty('title')  ? `title: "${config.title}"`:`` }
              ${config.hasOwnProperty('shortTitle')  ? `shortTitle: "${config.shortTitle}"`:`` }
              ${config.hasOwnProperty('currentStatus') ? `${ config.currentStatus == false ? `currentStatus: {disconnect:true}` : `currentStatus: {connect:{id:"${config.currentStatus}"}}` }` : ''}
              ${config.hasOwnProperty('accountWay') ? `${ config.accountWay == false ? `accountWay: {disconnect:true}` : `accountWay: {connect:{id:"${config.accountWay}"}}` }` : ''}

            }
            where:{
              id:"${config.id}"
            }
          ){
            id
          }
        }
        `
        break;
      case "GET": //read
        query = `query {
          contentLevelOnes {
            id
            name
            evaluation {
              id
              title
              shortTitle
              accountWay {
                id
                name
                grades {
                  id
                  grade
                  weight
                }
              }
              currentStatus {
                id
                name
              }
              questionGroup {
                id
                name
                weight
              }
            }
          }
          contentLevelTwoes {
            id
            name
            relativePercentage
            evaluation {
              id
              title
              shortTitle
              currentStatus {
                id
                name
              }
              accountWay {
                id
                name
                grades {
                  id
                  grade
                  weight
                }
              }
              questionGroup {
                id
                name
                weight
              }
            }
          }
          contentLevelThrees {
            id
            relativePercentage
            name
            evaluation {
              id
              title
              shortTitle
              currentStatus {
                id
                name
              }
              accountWay {
                id
                name
                grades {
                  id
                  grade
                  weight
                }
              }
              questionGroup {
                id
                name
                weight
              }
            }
          }
          contentLevelFours {
            id
            relativePercentage
            name
            evaluation {
              id
              title
              shortTitle
              currentStatus {
                id
                name
              }
              accountWay {
                id
                name
                grades {
                  id
                  grade
                  weight
                }
              }
              questionGroup {
                id
                name
                weight
              }
            }
          }
        }
        `;
        break;
      case "PUT"://create
        query = `mutation {
            ${config.levelName}(
              data: {
                evaluation: {
                  create: {
                    ${config.hasOwnProperty('title') ? `title: "${config.title}"` : '' }
                    ${config.hasOwnProperty('shortTitle') ? `shortTitle: "${config.shortTitle}"` : '' }
                    ${config.hasOwnProperty('currentStatus') ? `currentStatus: { connect: { id: "${config.currentStatus}" } }`:'' }
                    ${config.hasOwnProperty('accountWay') ? `accountWay: { connect: { id: "${config.accountWay}" } }`:'' }
                  }
                }
              } 
              where: { id: "${config.id}" }
            ) {
              id
            }
          }`
        break; 
      case "DELETE": //delete
        query = `mutation($id:ID!){
          deleteEvaluation(where:{id:$id}){id}
        }`
        variable = {
          id: config.id
        }
        break;
    }
    return this
      .http
      .post(`${config.url} `, {
        "query": query,
        "variables": variable
      });
  }

}


`
config:{
  method: "",
  levelName: options --> updateContentLevelOne | updateContentLevelTwo | updateContentLevelThree | updateContentLevelFour (only in create)
  title :""
  shortTitle: ""
  currentStatus: 'ID'
  id: "ID"  --> id of content level(create evaluation) or id of evaluation(update or delete)
}
`