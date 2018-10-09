import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class licensedTeacher {

    constructor(private http: HttpClient) { }

    service(config) {
        let query: string = ``
        let variable: object = {};
        switch (config.method) {
            case "POST": //update
                query=` mutation {
                       updateLicensedTerm(
                         data: {
                           licensedTeacher: {
                             update: {
                               data: {
                                 isActiveAccount: true
                                 specificClassConfig: {
                                   create: [
                                    ${config.classes.reduce((_str,item)=>{
                                        return _str+= `{
                                            canAddEval: ${item.canAddEval ? 'true':'false'}
                                            canEnterEval: ${item.canEnterEval ? 'true':'false'}
                                            canDeleteEval: ${item.canDeleteEval ? 'true':'false'}
                                            canEditEval: ${item.canEditEval ? 'true':'false'}
                                            licensedClass: {
                                              connect: { id: "${item.lclassid}" }
                                            }
                                          }`
                                      },'')}
                                   ]
                                   update: [
                                     ${
                                         config.specificConfigUpdate.reduce((_str,item)=>{
                                            return _str+=`{
                                                where: { id: "${item.specificid}" } 
                                                data: {
                                                    canAddEval: ${item.canAddEval ? 'true':'false'}
                                                    canEnterEval: ${item.canEnterEval ? 'true':'false'}
                                                    canDeleteEval: ${item.canDeleteEval ? 'true':'false'}
                                                    canEditEval: ${item.canEditEval ? 'true':'false'}
                                                }
                                              }`
                                         },'')
                                     }
                                   ]
                                 }
                               }
                               where: { id: "${config.lteacherid}" }
                             }
                           }
                           licensedClass: {
                             update: [
                                ${
                                    config.classes.reduce((_str,item)=>{
                                      return _str += `{ where: { id: "${item.lclassid}" }, data: { teacher: { connect: { id: "${config.teacher}" } } } }`
                                    },'')
                                }
                             ]
                           }
                         }
                         where: { id: "${config.ltermid}" }
                       ) {
                         id
                       }
                     }`
            break;
            case "PUT" : //create
                  query=` mutation {
                       updateLicensedTerm(
                         data: {
                           licensedTeacher: {
                             create: {
                               teacher: { connect: { id: "${config.teacher}" } }
                               ${
                                config.hasOwnProperty('isActiveAccount') 
                                    ?config.isActiveAccount  
                                        ?`isActiveAccount: true` 
                                        :`isActiveAccount: false` 
                                    :'' 
                                }
                               
                                specificClassConfig: {
                                    create: [
                                      ${config.classes.reduce((_str,item)=>{
                                        return _str+= `{
                                            canAddEval: ${item.canAddEval ? 'true':'false'}
                                            canEnterEval: ${item.canEnterEval ? 'true':'false'}
                                            canDeleteEval: ${item.canDeleteEval ? 'true':'false'}
                                            canEditEval: ${item.canEditEval ? 'true':'false'}
                                            licensedClass: {
                                              connect: { id: "${item.lclassid}" }
                                            }
                                          }`
                                      },'')}
                                    ]
                                }
                             }
                           }
                           licensedClass: {
                            update: [
                              ${
                                  config.classes.reduce((_str,item)=>{
                                    return _str += `{ where: { id: "${item.lclassid}" }, data: { teacher: { connect: { id: "${config.teacher}" } } } }`
                                  },'')
                              }
                            ]
                          }
                         }
                         where: { id: "${config.ltermid}" }
                       ) {
                         id
                       }
                     }`
            break;
            case "DELETE" : //Delete
                  query=` mutation{
                       updateLicensedTeacher(
                         data:{
                           specificClassConfig:{
                             delete:{
                               id:"${config.specificid}"
                             }
                           }
                         }
                         where:{
                           id:"${config.lteacherid}" 
                         }
                       ){
                         id
                       }
                       updateLicensedClass(
                         data:{
                           teacher:{
                             delete:{
                               id:"${config.lteacherid}"
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
            case "GET": // Read
                  query=` query {
                       licensedTerms(
                         where: { id: "${config.ltermid}", licensedTeacher_every: { teacher: { id: "${config.teacher}" } } }
                       ) {
                         id
                         licensedTeacher {
                           id
                           teacher {
                             id
                             name
                           }
                           isActiveAccount
                           specificClassConfig {
                             id
                             licensedClass {
                               id
                               class {
                                 name
                               }
                             }
                             canAddEval
                             canEnterEval
                             canDeleteEval
                             canEditEval
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
    teacher: (teacher id,required at create/query)
    lteacherid: (licenced teacher id)
    isActiveAccount (optional , true or false)
    classes:[{ (optional)
        canAddEval: true (required)
        canEnterEval: true (required)
        canDeleteEval: true (required)
        canEditEval: true (required)
        lclassid:"" ()required
    }]
    specificConfigUpdate:[{ (optional)
        canAddEval: true (required)
        canEnterEval: true (required)
        canDeleteEval: true (required)
        canEditEval: true (required)
        specificid:"" ()required
    }]
    specificid: specific config id to delete
  
}
*/