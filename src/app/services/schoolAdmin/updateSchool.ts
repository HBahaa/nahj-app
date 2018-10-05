import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class updateSchool {
    
    constructor(private http: HttpClient) { }

    renderAdmin(config){
        let str = '';
        if(!config.admin || !(config.admin.length > 1))return ''
        str = config.admin.reduce((myStr,item)=>{
            return myStr += `{
                where:{
                    id : "${item.id}"
                }
                data:{
                    ${item.hasOwnProperty("name")     ? `name:    "${item.name}"` : "" }
                    ${item.hasOwnProperty("job")      ? `job:     "${item.job}"` : "" }
                    ${item.hasOwnProperty("type")     ? `type:    "${item.type}"` : "" }
                    ${item.hasOwnProperty("phone")    ? `phone:   "${item.phone}"` : "" }
                    ${item.hasOwnProperty("whatsApp") ? `whatsApp:"${item.whatsApp}"` : "" }
                    ${item.hasOwnProperty("name")     ? `name:    "${item.name}"` : "" }
                    ${item.hasOwnProperty("email")    ? `email:   "${item.email}"` : "" }
                    ${item.hasOwnProperty("username") ? `username:"${item.username}"` : "" }
                    ${item.hasOwnProperty("password") ? `password:"${item.password}"` : "" }
                }
            }`
        },str)

        return str;
    }

    service(config) {
        console.log("config", config)
        let query: string = ``
        let variable: object = {};
        switch (config.method) {
            case "POST": //update
                query=`mutation{
                    updateSchool(
                      data:{
                        name:"${config.name}"
                        email:"${config.email}"
                        address:"${config.address}"
                        gps:"${config.gps}"
                        phone:"${config.phone}"
                        fax:"${config.fax}"
                        admin:{
                          update:[${this.renderAdmin(config)}]
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
            case "GET":
            query= `query {
                schools {
                  id
                  address
                  speciificArea {
                    id
                    speciificGeaoArea {
                      id
                      name
                    }
                    speciificCity {
                      id
                      name
                    }
                  }
                  gps
                  phone
                  admin {
                    id
                    name
                    job
                    type
                    phone
                    whatsApp
                    email
                    username
                    password
                  }
                  fax
                  district
                  adminNum
                  studentsNum
                  classesNum
                  teachersNum
                  StudyYears
                  lowestStudyYear
                  highestStudyYear
                  name
                  motherComp
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

`config{
    id:  ""
    method  : "GET|POST",
    name    : "" ,
    email   : "" ,
    address : "" , 
    gps     : "" ,
    phone   : "" ,
    fax     : "" ,
    admin   : [{
        name        : "",
        job         : "",
        type        : "",
        phone       : "",
        whatsApp    : "",
        email       : "",
        username    : "",
        password    : "",
        id          : ""            
    }]
}`