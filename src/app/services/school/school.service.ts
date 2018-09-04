import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private http: HttpClient) { }
  service(config) { ////method,url,id,adminId,address,admin,gps,phone,fa,district,adminNum,studentsNum,classesNum ... , admin[Object of admin data check schema] 
    console.log(config.arrayOfSpeciificContent)
    let query: string = "";
    let variable: object = {};
    let linc = "";


    switch(config.method){
      case "POST" : //update
        query = `mutation(
          $schoolID: ID
          $admin: NahjAdminUpdateDataInput!
          $adminId: ID
          $adminRes: NahjAdminUpdateDataInput!
          $adminResID: ID
          $address: String
          $gps: String
          $phone: String
          $fax: String
          $district: String
          $adminNum: Int
          $studentsNum: Int
          $classesNum: Int
          $teachersNum: Int
          $StudyYears: String
          $lowestStudyYear: String
          $highestStudyYear: String
          $name: String
          $motherComp: String
          $level1: ID
          $level2: ID
          $level3: ID
          $GeoAreaID: ID!
          $cityName: String!
          $contentLevel1:ID,
          $contentLevel2:ID,
          $contentLevel3:ID,
          $contentLevel4:ID,
          $contentID:ID
          
        ) {
          updateSchool(
            data: {
              admin: {
                update: [
                  { where: { id: $adminId }, data: $admin }
                  { where: { id: $adminResID }, data: $adminRes }
                ]
              }
              address: $address
              gps: $gps
              phone: $phone
              fax: $fax
              district: $district
              adminNum: $adminNum
              studentsNum: $studentsNum
              classesNum: $classesNum
              teachersNum: $teachersNum
              StudyYears: $StudyYears
              lowestStudyYear: $lowestStudyYear
              highestStudyYear: $highestStudyYear
              name: $name
              motherComp: $motherComp
              levels: { connect: { id: $level1 } }
              levelTwo: { connect: { id: $level2 } }
              levelThree: { connect: { id: $level3 } }
              speciificArea: {
                update: {
                  speciificGeaoArea: { connect: { id: $GeoAreaID } }
                  speciificCity: { create: { name: $cityName } }
                }
              }
            }
            where: { id: $schoolID }
          ) {
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
            name
            motherComp
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
            }
            levelTwo{
              id
              name
            }
            levelThree{
              id
              name
            }
            licensedContent{
              id
              speciificContentLevelOne{
                id
                name
              }
              speciificContentLevelTwo{
                id
                name
              }
              speciificContentLevelThree{
                id
                name
              }
              speciificContentLevelFour{
                id
                name
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
          level1:config.level1,
          adminId: config.adminId,
          adminResID: config.adminResID,
					level2: config.level2,
  				level3: config.level3,
  				schoolID: config.schoolID,
  				GeoAreaID: config.GeoAreaID,
          cityName: config.cityName,
          contentLevel1:config.contentLevel1,
          contentLevel2:config.contentLevel2,
          contentLevel3:config.contentLevel3,
          contentLevel4:config.contentLevel4
        }       
      break;  
      case "GET": //read
        query = `{
          schools{
            id,
            name,
            address,
            speciificArea{
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
            admin{
              id,
              name,
              job,
              type,
              phone,
              whatsApp,
              email,
              username,
              password
            }
            gps
            phone
            fax
            district
            levels{
              id
              name
            }
            levelTwo{
              id
              name
            }
            levelThree{
              id
              name
            }
            adminNum
            studentsNum
            classesNum
            teachersNum
            StudyYears
            lowestStudyYear
            highestStudyYear
            motherComp
            licensedContent{
              id,
              speciificContentLevelOne{
                id
                name
              }
              speciificContentLevelTwo{
                id
                name
              }
              speciificContentLevelThree{
                id
                name
              }
              speciificContentLevelFour{
                id
                name
              }
            }
          }
        }
        `;
      break;
      case "PUT"://create
        query = `mutation(
          $admin: NahjAdminCreateInput!
          $adminRes: NahjAdminCreateInput!
          $address: String!
          $gps: String!
          $phone: String!
          $fax: String!
          $district: String!
          $adminNum: Int!
          $studentsNum: Int!
          $classesNum: Int!
          $teachersNum: Int!
          $StudyYears: String!
          $lowestStudyYear: String!
          $highestStudyYear: String
          $name: String
          $motherComp: String
          $level1: ID
          $level2: ID
          $level3: ID
          $GeoAreaID: ID
          $cityName: String!
          $arrayOfSpeciificContent: [LicensedContentCreateInput!]
        ) {
          createSchool(
            data: {
              admin: { create: [$admin, $adminRes] }
              address: $address
              gps: $gps
              phone: $phone
              fax: $fax
              district: $district
              adminNum: $adminNum
              studentsNum: $studentsNum
              classesNum: $classesNum
              teachersNum: $teachersNum
              StudyYears: $StudyYears
              lowestStudyYear: $lowestStudyYear
              highestStudyYear: $highestStudyYear
              name: $name
              motherComp: $motherComp
              levels: { connect: { id: $level1 } }
              levelTwo: { connect: { id: $level2 } }
              levelThree: { connect: { id: $level3 } }
              speciificArea: {
                create: {
                  speciificGeaoArea: { connect: { id: $GeoAreaID } }
                  speciificCity: { create: { name: $cityName } }
                }
              }
              licensedContent: { create: $arrayOfSpeciificContent }
            }
          ) {
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
          level1:config.level1,
					level2: config.level2,
  				level3: config.level3,
  				GeoAreaID: config.GeoAreaName,
          cityName: config.cityName,
          arrayOfSpeciificContent:config.arrayOfSpeciificContent
        }

      break;
      case "DELETE": //delete
        query = `mutation($id: ID!) {
          deleteSchool(where: { id: $id }) {
            id
            name
          }
        }`
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