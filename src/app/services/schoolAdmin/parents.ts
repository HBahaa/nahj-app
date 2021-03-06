import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class parents {

    constructor(private http: HttpClient) { }


    service(config) {
        let query: string = ``
        let variable: object = {};
        switch (config.method) {
            case "POST": //update
                query = `mutation {
                    updateParent(
                      data: {
                        ${config.hasOwnProperty("name") ? `name:"${config.name}"` : ""}
                        ${config.hasOwnProperty("title") ? `title:"${config.title}"` : ""}
                        ${config.hasOwnProperty("relationToChild") ? `relationToChild:"${config.relationToChild}"` : ""}
                        ${config.hasOwnProperty("phone") ? `phone:"${config.phone}"` : ""}
                        ${config.hasOwnProperty("whatsApp") ? `whatsApp:"${config.whatsApp}"` : ""}
                        ${config.hasOwnProperty("accountStatus") ? `accountStatus:"${config.accountStatus}"` : ""}
                        ${config.hasOwnProperty("username") ? `username:"${config.username}"` : ""}
                        ${config.hasOwnProperty("email") ? `email:"${config.email}"` : ""}
                        ${config.hasOwnProperty("password") ? `password:"${config.password}"` : ""}

                        ${config.hasOwnProperty("extraInfoOne") ? `extraInfoOne:"${config.extraInfoOne}"` : ""}
                        ${config.hasOwnProperty("extraInfoTwo") ? `extraInfoTwo:"${config.extraInfoTwo}"` : ""}
                        ${config.hasOwnProperty("extraInfoThree") ? `extraInfoThree:"${config.extraInfoThree}"` : ""}
                        ${config.hasOwnProperty("extraInfoFour") ? `extraInfoFour:"${config.extraInfoFour}"` : ""}

                        ${config.hasOwnProperty("students") || config.hasOwnProperty("students_to_delete") ?

                            `students: {
                                connect: [${config.students.reduce((str, item) => str += `{ id:"${item}"}`, '')}]

                                disconnect: [${config.students_to_delete.reduce((str, item) => str += `{ id:"${item}"}`, '')}]
                            }`

                            :

                            ""
                        }
                      }
                      where: { id: "${config.id}" }
                    ) {
                      id
                    }
                  }`
                break;
            case "PUT": //Create
                query = `mutation{
                    updateSchool(
                      data:{
                        parents:{
                          create:{
                            ${config.hasOwnProperty("name") ? `name:"${config.name}"` : ""}
                            ${config.hasOwnProperty("title") ? `title:"${config.title}"` : ""}
                            ${config.hasOwnProperty("relationToChild") ? `relationToChild:"${config.relationToChild}"` : ""}
                            ${config.hasOwnProperty("phone") ? `phone:"${config.phone}"` : ""}
                            ${config.hasOwnProperty("whatsApp") ? `whatsApp:"${config.whatsApp}"` : ""}
                            ${config.hasOwnProperty("accountStatus") ? `accountStatus:"${config.accountStatus}"` : ""}
                            ${config.hasOwnProperty("email") ? `email:"${config.email}"` : ""}
                            ${config.hasOwnProperty("username") ? `username:"${config.username}"` : ""}
                            ${config.hasOwnProperty("password") ? `password:"${config.password}"` : ""}

                            ${config.hasOwnProperty("extraInfoOne") ? `extraInfoOne:"${config.extraInfoOne}"` : ""}
                            ${config.hasOwnProperty("extraInfoTwo") ? `extraInfoTwo:"${config.extraInfoTwo}"` : ""}
                            ${config.hasOwnProperty("extraInfoThree") ? `extraInfoThree:"${config.extraInfoThree}"` : ""}
                            ${config.hasOwnProperty("extraInfoFour") ? `extraInfoFour:"${config.extraInfoFour}"` : ""}

                            ${config.hasOwnProperty("students") ? `:"students:{ connect:[${config.students.reduce((str, item) => str += `{ id:"${item}"}`, '')}] }` : ""}

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
            case "DELETE": //Delete
                query = `mutation{
                    deleteParent(where:{id:"${config.id}"}){id}
                  }`
                break;
            case "GET":
                query = `query{
                    schools(where:{id:"${config.id}"}){
                      parents{
                        id
                        name
                        title
                        relationToChild
                        phone
                        whatsApp
                        email
                        accountStatus
                        username
                        password
                        extraInfoOne
                        extraInfoTwo
                        extraInfoThree
                        extraInfoFour
                        students{
                          id
                          fullName
                        }
                      }
                    }
                  }`
                break;
                case "GETBYNAME":
                    query= `query{
                              schools(
                                where:{
                                  id:"${config.id}"
                                  parents_every:{
                                    name_contains:"${config.parentsearchstring}"
                                  }
                                }
                              ){
                                id
                                parents{
                                  id
                                  name
                                  title
                                  relationToChild
                                  phone
                                  whatsApp
                                  email
                                  students{
                                    id
                                    fullName
                                  }
                                  accountStatus
                                  username
                                  password
                                  extraInfoOne
                                  extraInfoTwo
                                  extraInfoThree
                                  extraInfoFour
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


//
/*
    config{
        method
        id -> school id when GET,GETBYNAME,PUT | parent id when update,delete
        name
        title
        relation
        relationToChild
        phone
        whatsApp
        accountStatus
        username
        password

        extraInfoOne
        extraInfoTwo
        extraInfoThree
        extraInfoFour

        students:[array of connected ids]
        students_to_delete:[array of disconnected ids]
        parentsearchstring
    }
*/
