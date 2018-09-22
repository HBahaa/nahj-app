import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EcontentFourService {

  constructor(private http: HttpClient) { }
  service(config) { ////method,url,namel1,namel2,namel3
    let query: string = "";
    let variable: object = {};
    switch (config.method) {
      case "PUT": //create
        query = `mutation($name: String!, $percentage: Int, $id: ID!) {
          updateContentLevelThree(
            data: {
              contentLevelFour: {
                create: { name: $name, relativePercentage: $percentage }
              }
            }
            where: { id: $id }
          ) {
            id
            contentLevelFour {
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
        query = `mutation($name: String!, $percentage: Int, $id: ID!) {
          updateContentLevelFour(
            data: { name: $name, relativePercentage: $percentage }
            where: { id: $id }
          ) {
            id
            name
            relativePercentage
          }
        }`
        variable = {
          id:config.id,
          name:config.name,
          percentage:config.percentage
        }
        break;
      case "DELETE": //delete
        query = `mutation($id: ID!) {
          deleteContentLevelFour(where: { id: $id }) {
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
