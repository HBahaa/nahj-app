import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class licensedClass {

    constructor(private http: HttpClient) { }

    service(config) {
        let query: string = ``
        let variable: object = {};
        switch (config.method) {
            case "POST": //update
                query=``
            break;
            case "PUT" : //create
                  query=`
                   mutation {
                       updateLicensedTerm(
                         data: { licensedClass: { create: { class: { connect: { id: "${config.class}" } } } } }
                         where: { id: "${config.id}" }
                       ) {
                         id
                       }
                     }`
            break;
            case "DELETE" : //Delete
                  query=` mutation{
                       updateLicensedTerm(
                         data:{
                           licensedClass:{
                             delete:{
                               id:"${config.class}"
                             }
                           }
                         }
                         where:{
                           id:"${config.id}"
                         }
                       ){
                         id
                       }
                     }`
            break;
            case "GET": // Read
                  query=` query{
                       licensedTerms(
                         where:{
                           id:"${config.id}"
                         }
                       ){
                         licensedClass{
                           id
                           class{
                             id
                             name
                             studyLevelOnea{
                               id
                               name
                             }
                             studyLevelTwo{
                               id
                               name
                             }
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
  class: (class id at create | licenced class id at delete)
}
*/
