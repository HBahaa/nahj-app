import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class licensedParent {

  constructor(private http: HttpClient) { }

  service(config) {
    let query: string = ``
    let variable: object = {};
    switch (config.method) {
      case "POST": //update
        query = `mutation {
                  updateLicensedTerm(
                    data: {
                      licensedParents: {
                        update: { data: { isActive: ${config.isActive ? 'true':'false'} }, where: { id: "${config.parent}" } }
                      }
                    }
                    where: { id: "${config.id}" }
                  ) {
                    id
                    licensedParents {
                      id
                      parent {
                        name
                      }
                    }
                  }
                }`
        break;
      case "PUT": //create
        query = `mutation {
                  updateLicensedTerm(
                    data: {
                      licensedParents: {
                        create: { isActive: ${config.isActive ? 'true':'false'}, parent: { connect: { id: "${config.parent}" } } }
                      }
                    }
                    where: { id: "" }
                  ) {
                    id
                    licensedParents {
                      id
                      parent {
                        name
                      }
                    }
                  }
                }`
        break;
      case "DELETE": //Delete
        query = `mutation {
                  updateLicensedTerm(
                    data: { licensedParents: { delete: { id: "${config.parent}" } } }
                    where: { id: "${config.id}" }
                  ) {
                    licensedParents {
                      id
                      parent {
                        name
                      }
                    }
                  }
                }`
        break;
      case "GET": // Read
        query = `query{
                  licensedTerms(where:{
                    id:"${config.id}"
                  }){
                    id
                    licensedParents{
                      id
                      isActive
                      parent{
                        id
                        name
                      }
                    }
                  }
                }`
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


/*
config:{
  method: (required)[GET|POST|DELETE|PUT]
  id: (required licenced term id)
  parent: (parent id at create | licenced parent id at delete/update) (required)
  isActive: (boolean)(optional)
}
*/
