import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EvaluationSchema {
  constructor(private http: HttpClient) { }

  service(config) { ////method,url,name,cities,newName
    let query: string = "";
    let variable: object = {};
    // console.log(config)
    switch (config.method) {
      case "POST": //update
        query = `mutation($id:ID!,$name:String!,$Gid:ID,$Gname:String!,$Gwt:String!){
          updateEvaluationOptions(
            data:{
              name:$name,
              grades:{
                upsert:{
                  where:{
                    id:$Gid
                  }
                  update:{
                    grade:$Gname,
                    weight:$Gwt
                  },
                  create:{
                    grade:$Gname
                    weight:$Gwt
                  }
                }
              }
            },
            where:{
              id:$id
            }
          ){
            id,
            name,
            grades{
              id,
              grade,
              weight
            }
          }
        }`
        variable = {
          id: config.id,
          name: config.name,
          Gid: config.Gid,//optional pass for update , skip for create
          Gname: config.Gname,
          Gwt: config.Gwt
        }
        break;
      case "GET": //read
        query = `{
            evaluationOptionses{
              id,
              name,
              grades{
                id,
                grade,
                weight
              }
            }
          }`; 
        break;
      case "PUT"://create main grade not sub-fields
        query = `mutation($name:String!){
          createEvaluationOptions(
            data:{
              name:$name,
            }
          ){
            id,
            name,
          }
        }`
        variable = {
          name: config.name
        }
        break;
      case "DELETE": //delete
        if (config.Gid) {
          query = `mutation($id:ID!$Gid:ID){
            updateEvaluationOptions(
              data:{
                grades:{
                  delete:{
                    id:$Gid
                  }
                }
              },
              where:{
                id:$id
              }
            ){
              id,
              name,
              grades{
                id,
                grade,
                weight
              }
            }
          }
          `
          variable = {
            id : config.id,
            Gid : config.Gid
          }
        } else {
          query = `mutation($id:ID!){
            deleteEvaluationOptions(where:{id:$id}){
              id,
              name,
              grades{
                id,
                grade,
                weight
              }
            }
          }`
          variable = {
            id: config.id
          }
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
