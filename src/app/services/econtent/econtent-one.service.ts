import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EcontentOneService {

  constructor(private http: HttpClient) { }
  service(config) { ////method,url,namel1,namel2,namel3
    let query: string = "";
    let variable: object = {};
    switch (config.method) {
      case "PUT": //create
      console.log("confi", config);
        query = `mutation($name:String!,$percentage:Int){
          createContentLevelOne(
            data:{
              name:$name
              relativePercentage:$percentage
            }
          ){
            id
            name
            relativePercentage
          }
        }`
        variable = {
          name:config.name,
          percentage:config.percentage
        }
        break;
      case "GET": //read
        query = `query {
          contentLevelOnes {
            id
            name
            relativePercentage
            contentLevelTwo {
              id
              name
              relativePercentage
              contentLevelThree {
                id
                name
                relativePercentage
                contentLevelFour {
                  id
                  name
                  relativePercentage
                }
              }
            }
          }
        }`;
        break;
      case "POST"://update
        query = `mutation($name:String!,$percentage:Int,$id:ID!){
          updateContentLevelOne(
            data:{
              name:$name
              relativePercentage:$percentage
            }
            where:{
              id:$id
            }
          ){
            id
            name
            relativePercentage
          }
        }`
        variable = {
          name:config.name,
          percentage:config.percentage,
          id:config.id
        }
        break;
      case "DELETE": //delete
        query = `mutation( $id: ID!) {
          deleteContentLevelOne(where: { id: $id }) {
            id
            name
            relativePercentage
          }
        }`
        variable = {
          id:config.id
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
