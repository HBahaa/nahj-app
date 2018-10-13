import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class students {

    constructor(private http: HttpClient) { }

    service(config) {
        let query: string = ``
        let variable: object = {};
        switch (config.method) {
            case "POST": //update
              query=`mutation {
                updateStudent(
                  data: {
                    ${config.hasOwnProperty("fullName") ? `fullName:"${config.fullName}"` : ""}
                    ${config.hasOwnProperty("necName") ? `necName:"${config.necName}"` : ""}
                    ${config.hasOwnProperty("birthday") ? `birthday:"${config.birthday}"` : ""}
                    ${config.hasOwnProperty("nationality") ? `nationality:"${config.nationality}"` : ""}
                    ${config.hasOwnProperty("gender") ? `gender:"${config.gender}"` : ""}
                    ${config.hasOwnProperty("photo") ? `photo:"${config.photo}"` : ""}
                    ${config.hasOwnProperty("accountStatus") ? `accountStatus:"${config.accountStatus}"` : ""}
                    ${config.hasOwnProperty("username") ? `username:"${config.username}"` : ""}
                    ${config.hasOwnProperty("password") ? `password:"${config.password}"` : ""}
                    ${config.hasOwnProperty("extraInfoOne") ? `extraInfoOne:"${config.extraInfoOne}"` : ""}
                    ${config.hasOwnProperty("parent") ? `parent: { connect: { id: "${config.parent}" } }` : ""}

                  }
                  where: { id: "${config.id}" }
                ) {
                  id
                }
              }`
            break;
            case "PUT" : //Create
              query=`mutation{
                updateSchool(
                  data:{
                    students:{
                      create:{

                        ${config.hasOwnProperty("fullName") ? `fullName:"${config.fullName}"` : ""}
                        ${config.hasOwnProperty("necName") ? `necName:"${config.necName}"` : ""}
                        ${config.hasOwnProperty("birthday") ? `birthday:"${config.birthday}"` : ""}
                        ${config.hasOwnProperty("nationality") ? `nationality:"${config.nationality}"` : ""}
                        ${config.hasOwnProperty("gender") ? `gender:"${config.gender}"` : ""}
                        ${config.hasOwnProperty("photo") ? `photo:"${config.photo}"` : ""}
                        ${config.hasOwnProperty("accountStatus") ? `accountStatus:"${config.accountStatus}"` : ""}
                        ${config.hasOwnProperty("username") ? `username:"${config.username}"` : ""}
                        ${config.hasOwnProperty("password") ? `password:"${config.password}"` : ""}
                        ${config.hasOwnProperty("extraInfoOne") ? `extraInfoOne:"${config.extraInfoOne}"` : ""}
                        ${config.hasOwnProperty("parent") ? `parent: { connect: { id: "${config.parent}" } }` : ""}
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
            case "DELETE" : //Delete
                query=`mutation{
                  deleteStudent(where:{id:"${config.id}"}){
                    id
                  }
                }`
            break;
            case "GET":
                query=`query{
                  schools(where:{id:"${config.id}"}){
                    id
                    students{
                      id
                      fullName
                      necName
                      birthday
                      nationality
                      gender
                      parent{
                        id
                        name
                      }
                      photo
                      accountStatus
                      username
                      password
                      extraInfoOne
                    }
                  }
                }`
            break;
            case "GETBYNAME":
                query = `query{
                          schools(
                            where:{
                              id:"${config.id}"
                              students_every:{
                                fullName_contains:"config.studentsearchstring"
                              }
                            }
                          ){
                            id
                            students{
                              id
                              fullName
                              birthday
                              idNum
                              nationality
                              gender
                            	parent{
                                id
                                name
                              }
                              photo
                              accountStatus
                              username
                              password
                              extraInfoOne
                              extraInfoTwo
                              extraInfoThree
                            }
                          }
                        }
                `
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
    method (GET|GETBYNAME|PUT|POST|DELETE)
    id --> school id in get, create, GETBYNAME and student id in delete and update
    fullName
    necName
    birthday
    idNum
    nationality
    gender
    parent -> id
    photo
    accountStatus
    username
    password
    extraInfoOne
    extraInfoTwo
    extraInfoThree
    studentsearchstring
  }
*/
