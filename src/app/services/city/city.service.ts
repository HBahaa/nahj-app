import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CityService {
  constructor(private http: HttpClient) { }

  service(config) { ////method,url,name,cities,newName
    let query: string = "";
    let variable: object = {};
    // console.log(config)
    switch(config.method){
      case "POST" : //update
        query = `mutation($name:String!,$id:ID!) {
          updateCity(
            data:{
              name:$name
            }
            where:{
              id:$id
            }
          ){
            id
            name
          }
        }` 
        variable = {
          name:config.name,
          id:config.id
        }       
      break;
      case "GET": //read
        query = `query{
          geoAreas{
            id
            name
            cities{
              id
              name
            }
          }
        }`;
      break;
      case "PUT"://create
        query = `mutation($name:String!,$id:ID!) {
          updateGeoArea(data: {cities:{create:{name:$name}}}, where: { id: $id }) {
            id
            cities {
              id
              name
            }
          }
        }`
        variable = {
          name:config.name,
          id:config.id
        }
      break;
      case "DELETE": //delete
        query = `mutation($id:ID!) {
          deleteCity(where:{id:$id}){id}
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
