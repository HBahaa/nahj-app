import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class teachers {

    constructor(private http: HttpClient) { }

    service(config) {
        let query: string = ``;
        let variable: object = {};
        switch (config.method) {
            case "POST": //update
                query=`mutation{
                  updateTeacher(
                    data:{
                      ${config.hasOwnProperty("name") ? `name:"${config.name}"` : ""}
                      ${config.hasOwnProperty("title") ? `title:"${config.title}"` : ""}
                      ${config.hasOwnProperty("job") ? `job:"${config.job}"` : ""}
                      ${config.hasOwnProperty("type") ? `type:"${config.type}"` : ""}
                      ${config.hasOwnProperty("phone") ? `phone:"${config.phone}"` : ""}
                      ${config.hasOwnProperty("whatsApp") ? `whatsApp:"${config.whatsApp}"` : ""}
                      ${config.hasOwnProperty("email") ? `email:"${config.email}"` : ""}
                      ${config.hasOwnProperty("username") ? `username:"${config.username}"` : ""}
                      ${config.hasOwnProperty("password") ? `password:"${config.password}"` : ""}
                    }
                    where:{
                      id:"${config.id}"
                    }
                  ){
                    id
                  }
                }`
            break;
            case "PUT" : //Create
                query=`mutation {
                  updateSchool(
                    data: {
                      teachers: {
                        create: {
                          ${config.hasOwnProperty("name") ? `name:"${config.name}"` : ""}
                          ${config.hasOwnProperty("title") ? `title:"${config.title}"` : ""}
                          ${config.hasOwnProperty("job") ? `job:"${config.job}"` : ""}
                          ${config.hasOwnProperty("type") ? `type:"${config.type}"` : ""}
                          ${config.hasOwnProperty("phone") ? `phone:"${config.phone}"` : ""}
                          ${config.hasOwnProperty("whatsApp") ? `whatsApp:"${config.whatsApp}"` : ""}
                          ${config.hasOwnProperty("email") ? `email:"${config.email}"` : ""}
                          ${config.hasOwnProperty("username") ? `username:"${config.username}"` : ""}
                          ${config.hasOwnProperty("password") ? `password:"${config.password}"` : ""}
                        }
                      }
                    }
                    where: { id: "${config.id}" }
                  ) {
                    id
                  }
                }`
            break;
            case "DELETE" : //Delete
                  query=`mutation {
                    deleteTeacher(where: { id: "${config.id}" }){id}
                  }`
            break;
            case "GET":
                  query=`query{
                    schools(where:{id:"${config.id}"}){
                      id
                      teachers{
                        id
                        name
                        title
                        job
                        type
                        phone
                        whatsApp
                        email
                        username
                        password
                      }
                    }
                  }`
            break;
            case "GETBYNAME":
              query=`query {
                schools(
                  where: {
                    id: "${config.id}"
                    teachers_every: { name_contains: "${config.teachersearchstring}" }
                  }
                ) {
                  id
                  licensedTerm ${config.ltermid ? `(where: { id: "${config.ltermid}" }) `:""} {
                    licensedClass
                      ${config.classl1id || config.classl2id ? `(
                        where: {
                          class: {
                            ${config.classl1id ? `studyLevelOnea: { id: "${config.classl1id}" }`:""}
                            ${config.classl2id ? `studyLevelTwo: { id: "${config.classl2id}" }`:""}
                          }
                        }
                      )`:""} 
                    {
                      class {
                        id
                        name
                      }
                      teacher {
                        id
                        teacher {
                          id
                          name
                        }
                      }
                    }
                  }
                  teachers {
                    id
                    name
                    title
                    job
                    type
                    phone
                    whatsApp
                    email
                    username
                    password
                  }
                }
              }`
            break;
        }

        return this.http.post(`${config.url}`, {
                "query": query,
                "variables": variable
            });
    }
}

/*
  config:{
    method: (PUT|GET|GETBYNAME|DELETE|POST)
    id: (unique id for school id when using with create, GETBYNAME,GET  | teacher id when using with update and delete)
    teachersearchstring:
    name
    title
    job
    type
    phone
    whatsApp
    email
    username
    password
    ltermid
    classl1id
    classl2id
}
*/
