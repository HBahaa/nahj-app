import { Injectable } from '@angular/core';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  constructor() { }

  geo(config){ ////method,url,name,cities,newName
    return new Promise((resolve, reject)=>{

      let query: string="";
      let variable: object={};
      
      switch(config.method){
        case "PUT" : //create
          query = `mutation ($name: String!, $cities: [String!]) { createGeoArea(data: {name: $name, cities: {set: $cities}}) { name cities } } ` 
          variable = {
            name:config.name,
            cities:config.cities
          }       
        break;
        case "GET": //read
          query = `	{ geoAreas { name cities } } `;
        break;
        case "POST"://update
          query = `mutation ($newName: String!, $cities: [String!], $name: String!) { updateManyGeoAreas(data: {name: $newName, cities: {set: $cities}}, where: {name: $name}) { count } } `
          variable = {
            name:config.name,
            newName:config.newName,
            cities:config.cities
          }
        break;
        case "DELETE": //delete
          query = ``
          variable = {
            name:config.city
          }
        break;
        
      }

			var settings = {
				"async": true,
				"crossDomain": true,
				"url": `${config.url}`,
				"method": "get",
        "body":{
          "query":query,
          "variables":variable
        }
			}

			$.ajax(settings).done(response=> {
				resolve(response);
			}).fail(error=>{
				reject(error);
			});
		})
  }
}
