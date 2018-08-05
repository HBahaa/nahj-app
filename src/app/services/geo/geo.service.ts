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
    console.log(config)
    switch(config.method){
      case "POST" : //create
        query = `mutation ($newName: String!, $cities: [String!], $name: String!) { updateManyGeoAreas(data: {name: $newName, cities: {set: $cities}}, where: {name: $name}) { count } }` 
        variable = {
          name:config.name,
          cities:config.cities,
          newName:config.newName,
        }       
      break;
      case "GET": //read
        query = `	{ geoAreas { name cities } }`;
      break;
      case "PUT"://update
        query = `mutation ($name: String!, $cities: [String!]) { createGeoArea(data: {name: $name, cities: {set: $cities}}) { name cities } }`
        variable = {
          name:config.name,
          cities:config.cities
        }
      break;
      case "DELETE": //delete
        query = `mutation { deleteManyGeoAreas(where: {name: "new city"}) { count } }`
        variable = {
          name:config.city
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
