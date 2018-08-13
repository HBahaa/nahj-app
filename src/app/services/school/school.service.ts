import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private http: HttpClient) { }
  service(config) { ////method,url,name,cities,newName
    let query: string = "";
    let variable: object = {};
    console.log(config)
    switch(config.method){
      case "POST" : //update
        query = `` 
        variable = {
        }       
      break;  
      case "GET": //read
        query = `{ schools { id schAdmins { job name type phone whatsApp email username password } address studentsNum adminNum teachersNum classesNum gps phone fax district StudyYears lowestStudyYear highestStudyYear name motherComp } } `;
      break;
      case "PUT"://create
        query = ` {create: {name: $adminName, job: $adminJob, type: $admintype, phone: $adminPhone, whatsApp: $adminWhatsapp, email: $adminEmail, username: $adminUsername, password: $adminPassword}}}) { highestStudyYear id address phone schAdmins { name job type phone whatsApp email username password } gps fax district StudyYears lowestStudyYear highestStudyYear motherComp studentsNum classesNum teachersNum } } `
        variable = {
            adminWhatsapp:config.adminWhatsapp,
            adminUsername:config.adminUsername,
            adminJob:config.adminJob,
            adminPhone:config.adminPhone,
            admintype:config.admintype,
            adminPassword:config.adminPassword,
            adminEmail:config.adminEmail,
            adminName:config.adminName,
            gps:config.gps,
            name:config.name,
            highestStudyYear:config.highestStudyYear,
            address:config.address,
            StudyYears:config.StudyYears,
            phone:config.phone,
            studentsNum:config.studentsNum,
            district:config.district,
            motherComp:config.motherComp,
            lowestStudyYear:config.lowestStudyYear,
            fax:config.fax,
            teacherNum:config.teacherNum,
            ClassesNum:config.ClassesNum,
            adminNum:config.adminNum
        }
      break;
      case "DELETE": //delete
        query = `mutation ($id: ID!) { deleteschool(where: {id: $id}) { id } } `
        variable = {
          id:config.id
        }
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