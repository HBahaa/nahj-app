import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EcontentTwoService {

  constructor(private http: HttpClient) { }
  service(config) { ////method,url,namel1,namel2,namel3
    let query: string = "";
    let variable: object = {};
    switch (config.method) {
      case "PUT": //create
        query = `mutation($name:String!,$percentage:Int,$id:ID!){
          updateContentLevelOne(
            data:{
              contentLevelTwo:{
                create:{
                  name:$name
                  relativePercentage:$percentage
                }
              }
            }
            where:{
              id:$id
            }
          ){
            id
            contentLevelTwo{
              id
              name
              relativePercentage
            }
          }
        }`
        variable = {
          id:config.id,
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
        query = `
        mutation($name: String!, $percentage: Int, $id: ID!) {
          updateContentLevelTwo(
            data: { name: $name, relativePercentage: $percentage }
            where: { id: $id }
          ) {
            id
            name
            relativePercentage
          }
        }
        `
        variable = {
          id:config.id,
          name:config.name,
          percentage:config.percentage
        }
        break;
      case "DELETE": //delete
        query = `mutation ($Id: ID!) { deleteContentLevelTwo(where: {id: $Id}) { id name relativePercentage } } `
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
