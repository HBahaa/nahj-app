import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private http: HttpClient) { }
  service(config) { ////method,url,id,adminId,address,admin,gps,phone,fa,district,adminNum,studentsNum,classesNum ... , admin[Object of admin data check schema] 
    let query: string = "";
    let variable: object = {};
    console.log(config)
    switch(config.method){
      case "POST" : //update
        query = `mutation ($address: String!, $gps: String!, $phone: String!, $fax: String!, $district: String!, $adminNum: Int!, $studentsNum: Int!, $classesNum: Int!, $teachersNum: Int!, $StudyYears: String!, $lowestStudyYear: String!, $highestStudyYear: String!, $name: String!, $motherComp: String!, $Id: ID!, $admin: NahjAdminUpdateDataInput!, $adminId: ID!) { updateSchool(data: {address: $address, gps: $gps, phone: $phone, fax: $fax, district: $district, adminNum: $adminNum, studentsNum: $studentsNum, classesNum: $classesNum, teachersNum: $teachersNum, StudyYears: $StudyYears, lowestStudyYear: $lowestStudyYear, highestStudyYear: $highestStudyYear, name: $name, motherComp: $motherComp, admin: {update: {where: {id: $adminId}, data: $admin}}}, where: {id: $Id}) { id address admin { id name job type phone whatsApp email username password } gps phone } }  ` 
        variable = {
          id:config.id,
          address:config.address,
          admin:config.admin,
          gps:config.gps,
          phone:config.phone,
          fax:config.fax,
          district:config.district,
          adminNum:config.adminNum,
          studentsNum:config.studentsNum,
          classesNum:config.classesNum,
          teachersNum:config.teachersNum,
          StudyYears:config.StudyYears,
          lowestStudyYear:config.lowestStudyYear,
          highestStudyYear:config.highestStudyYear,
          name:config.name,
          motherComp:config.motherComp,
          adminId:config.adminId
        }       
      break;  
      case "GET": //read
        query = `{schools { id address admin { id name job type phone whatsApp email username password } gps phone fax district adminNum studentsNum classesNum teachersNum StudyYears lowestStudyYear highestStudyYear name motherComp } }`;
      break;
      case "PUT"://create
        query = `mutation ($admin: NahjAdminCreateInput!, $address: String!, $gps: String!, $phone: String!, $fax: String!, $district: String!, $adminNum: Int!, $studentsNum: Int!, $classesNum: Int!, $teachersNum: Int!, $StudyYears: String!, $lowestStudyYear: String!, $highestStudyYear: String!, $name: String!, $motherComp: String!) { createSchool(data: {address: $address, gps: $gps, phone: $phone, fax: $fax, district: $district, adminNum: $adminNum, studentsNum: $studentsNum, classesNum: $classesNum, teachersNum: $teachersNum, StudyYears: $StudyYears, lowestStudyYear: $lowestStudyYear, highestStudyYear: $highestStudyYear, name: $name, motherComp: $motherComp, admin: {create: [$admin]}}) { id address admin { id name job type phone whatsApp email username password } gps phone fax district adminNum studentsNum classesNum teachersNum StudyYears lowestStudyYear highestStudyYear name motherComp } }`
        variable = {
          email	:config.email,
          id:config.id,
          address:config.address,
          admin:config.admin,
          gps:config.gps,
          phone:config.phone,
          fax:config.fax,
          district:config.district,
          adminNum:config.adminNum,
          studentsNum:config.studentsNum,
          classesNum:config.classesNum,
          teachersNum:config.teachersNum,
          StudyYears:config.StudyYears,
          lowestStudyYear:config.lowestStudyYear,
          highestStudyYear:config.highestStudyYear,
          name:config.name,
          motherComp:config.motherComp,
        }
      break;
      case "DELETE": //delete
        query = `mutation ($id: ID!) { deleteSchool(where: {id: $id}) { id name } }`
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