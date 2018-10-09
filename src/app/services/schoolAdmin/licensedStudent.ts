import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class licensedStudent {

    constructor(private http: HttpClient) { }

    service(config) {
        let query: string = ``
        let variable: object = {};
        switch (config.method) {
            case "POST": //update
                query=` mutation {
                     updateLicensedTerm(
                       data: {
                         licensedClass: {
                           update: [
                             ${config.oldlclassid 
                                ?`{ where: { id: "${config.oldlclassid}" }, data: { students: { disconnect: { id: "${config.lstudentid}" } } } }` 
                                :''
                             }
                             ${
                               config.newlclassid 
                               ? `{ where: { id: "${config.newlclassid}" }, data: { students: { connect: { id: "${config.lstudentid}" } } } }`
                               :'' 
                             }
                           ]
                         }
                       }
                       where: { id: "${config.ltermid}" }
                     ) {
                       id
                     }
                    
                     updateLicensedStudent(
                       data:{
                         isActiveAccount:true
                       }
                       where:{
                         id:"${config.lstudentid}"
                       }
                     ){
                       id
                     }
                   }`
            break;
            case "PUT" : //create
                  query=` mutation{
                       updateLicensedTerm(
                         data:{
                           licensedClass:{
                             update:{
                               where:{
                                 id:"${config.lclassid}"
                               }
                               data:{
                                 students:{
                                   create:{
                                     isActiveAccount:${config.isActiveAccount ? 'true': 'false'}
                                     student:{
                                       connect:{id:"${config.student}"}
                                     }
                                   }
                                 }
                               }
                             }
                           }
                         }
                         where:{
                           id:"${config.ltermid}"
                         }
                       ){
                         id
                       }
                     }`
            break;
            case "DELETE" : //Delete
                  query=``
            break;
            case "GET": // Read
                  query=`query{
                       licensedTerms(
                         where:{
                           id:"${config.ltermid}"
                           licensedClass_every:{
                             students_every:{
                               student:{
                                 id:"${config.student}"
                               }
                             }
                           }
                         }
                       ){
                         licensedClass{
                           id
                          	students{
                             id
                             student{
                               id
                               fullName
                             }
                             isActiveAccount
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
    ltermid: (required)
    isActiveAccount (optional , true or false)
    lclassid:"" ()required
    oldlclassid
    newlclassid
    lstudentid  
    student : student id
}
*/