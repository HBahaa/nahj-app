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

    switch (config.method) {
      case "POST": //update
        query = `mutation{
          updateEvaluation(
            data:{
              ${config.hasOwnProperty('title')  ? `title: ${config.title}`:`` }
              ${config.hasOwnProperty('shortTitle')  ? `shortTitle: ${config.shortTitle}`:`` }
              ${config.hasOwnProperty('currentStatus') ? `${ config.currentStatus == false ? `currentStatus: {disconnect:true}` : `currentStatus: {connect:{id:${config.currentStatus}}}` }` : ''}
            }
            where:{
              id:${config.id}
            }
          ){
            id
          }
        }
        `
        break;
      case "GET": //read
        query = `query{
          contentLevelOnes{
            evaluation{
              id
              title
              shortTitle
              currentStatus{id,name}
            }
          }
          contentLevelTwoes{
            evaluation{
              id
              title
              shortTitle
              currentStatus{id,name}
            }
          }
          contentLevelThrees{
            evaluation{
              id
              title
              shortTitle
              currentStatus{id,name}
            }
          }
          contentLevelFours{
            evaluation{
              id
              title
              shortTitle
              currentStatus{id,name}
            }
          }
        }`;
        break;
      case "PUT"://create
      console.log("config", config)
        query = `mutation {
            ${config.levelName}(
              data: {
                evaluation: {
                  create: {
                    ${config.hasOwnProperty('title') ? `title: ${config.title}` : '' }
                    ${config.hasOwnProperty('shortTitle') ? `shortTitle: ${config.shortTitle}` : '' }
                    ${config.hasOwnProperty('currentStatus') ? `currentStatus: { connect: { id: ${config.id} } }`:'' }
                  }
                }
              } 
              where: { id: ${config.id} }
            ) {
              id
            }
          }`
        break;
      case "DELETE": //delete
        query = `mutation{
          deleteEvaluation(where:{id:${config.id}}){id}
        }`
        
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