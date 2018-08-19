import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class evaluationSchema {
  constructor(private http: HttpClient) { }

  service(config) { ////method,url,name,cities,newName
    let query: string = "";
    let variable: object = {};
    // console.log(config)
    switch(config.method){
      case "POST" : //update
        query = `mutation($id:ID!,$name:String!,$grades:[String!]){
            updateEvaluationOptions(data:{
              name:$name,
              grades:{
                update:{
                  grades:{
                    set:$grades
                  }
                }
              }
            },where:{
              id:$id
            }){
              id,
              name,
              grades{
                id,
                grades
              }
            }
          }` 
        variable = {
          id:config.id,
          name:config.name,
          grades:config.grades
        }       
      break;
      case "GET": //read
        query = `{
            evaluationOptionses{
              id,
              name,
              grades{
                id,
                grades
              }
            }
          }`;
      break;
      case "PUT"://create
        query = `mutation($name:String!){
            createEvaluationOptions(
              data:{
                name:$name,
                grades:{
                  create:{
                    grades:{
                      set:[""]
                    }
                  }
                }
              }
            ){
              id,
              name,
              grades{
                id,
                grades
              }
            }
          }`
        variable = {
         name:config.name 
        }
      break;
      case "DELETE": //delete
        query = `mutation($id:ID!){
            deleteEvaluationOptions(where:{id:$id}){
              id,
              name,
              grades{
                id,
                grades
              }
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
