import { Injectable } from '@angular/core';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor() { }

  city(config){ //method,city,newCity,url
    return new Promise((resolve, reject)=>{

      let query: string="";
      let variable: object={};
      
      switch(config.method){
        case "GET" : 
          query = `mutation ($name: String!) {  createCity(data: {name: $name}) {    name  }}` 
          variable = {
            name:config.city
          }       
        break;
        case "POST":
          query = `{ cities { name } } `;
        break;
        case "DELETE":
          query = `mutation ($name: String!) { deleteManyCities(where: {name: $name}) { count } } `
          variable = {
            name:config.city
          }
        break;
        case "PUT":
          query = `mutation ($name: String!, $newName: String!) { updateManyCities(data: {name: $newName}, where: {name: $name}) { count } } `
          variable = {
            name:config.city,
            newName:config.newCity
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
