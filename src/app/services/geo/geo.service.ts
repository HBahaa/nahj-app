import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GeoService {
  constructor(private http: HttpClient) { }

  service(config) { ////method,url,name,cities,newName
    let query: string = "";
    let variable: object = {};
    // console.log(config)
    switch(config.method){
      case "POST" : //update
        query = `mutation ($newName: String!, $cities: [String!], $name: String!) { updateManyGeoAreas(data: {name: $newName, cities: {set: $cities}}, where: {name: $name}) { count } }` 
        variable = {
          name:config.name,
          cities:config.cities,
          newName:config.newName,
        }       
      break;
      case "GET": //read
        query = `	{ geoAreas { name, cities } }`;
      break;
      case "PUT"://create
        query = `mutation ($name: String!, $cities: [String!]) { createGeoArea(data: {name: $name, cities: {set: $cities}}) { name, cities } }`
        variable = {
          name:config.name,
          cities:config.cities
        }
      break;
      case "DELETE": //delete
        query = `mutation($Id:ID!){
          deleteManyGeoAreas(where: { id: $Id }) {
            count
          }
        }`
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

  cities(config){
    let query: string = `query( $name: String! ){ geoAreas(where: { name: $name }){ cities }}`;
    let variable: object = { name:config.name };
    return this.http.post(`${config.url}`, {
      "query": query,
      "variables": variable 
    })
  }

}
