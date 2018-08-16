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
        query = `mutation ($admin: NahjAdminUpdateDataInput!, $adminId: ID!, $adminRes: NahjAdminUpdateDataInput!, $adminResID: ID!, $address: String!, $gps: String!, $phone: String!, $fax: String!, $district: String!, $adminNum: Int!, $studentsNum: Int!, $classesNum: Int!, $teachersNum: Int!, $StudyYears: String!, $lowestStudyYear: String!, $highestStudyYear: String!, $name: String!, $motherComp: String!, $level1Id: ID!) {
          updateSchool(data: {admin: {update: [{where: {id: $adminId}, data: $admin}, {where: {id: $adminResID}, data: $adminRes}]}, address: $address, gps: $gps, phone: $phone, fax: $fax, district: $district, adminNum: $adminNum, studentsNum: $studentsNum, classesNum: $classesNum, teachersNum: $teachersNum, StudyYears: $StudyYears, lowestStudyYear: $lowestStudyYear, highestStudyYear: $highestStudyYear, name: $name, motherComp: $motherComp, levels: {connect: {id: $level1Id}}}, where: {id: ""}) {
            id
            address
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
            gps
            phone
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
            levels {
              id
              name
              LevelTwo {
                id
                name
                levelThree {
                  id
                  name
                }
              }
            }
          }
        }
        ` 
        variable = {
          address:config.address,
          adminRes:config.adminRes,
          admin:config.admin,
          gps:config.gps,
          phone:config.gps,
          fax:config.fax,
          district:config.district,
          adminNum:config.adminNum,
          studentsNum:config.studentsNum,
          teachersNum:config.teachersNum,
          classesNum:config.classesNum,
          StudyYears:config.StudyYears,
          lowestStudyYear:config.lowestStudyYear,
          highestStudyYear:config.highestStudyYear,
          name:config.name,
          motherComp:config.motherComp,
          level1Id:config.level1Id,
          adminId: config.adminId,
  				adminResID: config.adminResID
        }       
      break;  
      case "GET": //read
        query = `{
          schools {
            id
            address
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
            gps
            phone
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
            levels {
              id
              name
              LevelTwo {
                id
                name
                levelThree {
                  id
                  name
                }
              }
            }
          }
        }
        `;
      break;
      case "PUT"://create
        query = `mutation ($admin: NahjAdminCreateInput!, $adminRes: NahjAdminCreateInput!, $address: String!, $gps: String!, $phone: String!, $fax: String!, $district: String!, $adminNum: Int!, $studentsNum: Int!, $classesNum: Int!, $teachersNum: Int!, $StudyYears: String!, $lowestStudyYear: String!, $highestStudyYear: String!, $name: String!, $motherComp: String!, $level1Id: ID!) {
          createSchool(data: {admin: {create: [$admin, $adminRes]}, address: $address, gps: $gps, phone: $phone, fax: $fax, district: $district, adminNum: $adminNum, studentsNum: $studentsNum, classesNum: $classesNum, teachersNum: $teachersNum, StudyYears: $StudyYears, lowestStudyYear: $lowestStudyYear, highestStudyYear: $highestStudyYear, name: $name, motherComp: $motherComp, levels: {connect: {id: $level1Id}}}) {
            id
            address
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
            gps
            phone
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
            levels {
              id
              name
              LevelTwo {
                id
                name
                levelThree {
                  id
                  name
                }
              }
            }
          }
        }
        `
        variable = {
          address:config.address,
          adminRes:config.adminRes,
          admin:config.admin,
          gps:config.gps,
          phone:config.gps,
          fax:config.fax,
          district:config.district,
          adminNum:config.adminNum,
          studentsNum:config.studentsNum,
          teachersNum:config.teachersNum,
          classesNum:config.classesNum,
          StudyYears:config.StudyYears,
          lowestStudyYear:config.lowestStudyYear,
          highestStudyYear:config.highestStudyYear,
          name:config.name,
          motherComp:config.motherComp,
          level1Id:config.level1Id,
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