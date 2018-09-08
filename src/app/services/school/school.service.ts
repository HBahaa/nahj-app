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
    let linc = undefined;
    let l1Content = "";
    let l2Content = "";
    let l3Content = "";
    let l4Content = "";


    if (config.contentLevel1) l1Content = `speciificContentLevelOne: { connect: { id: $contentLevel1 } }`
    if (config.contentLevel2) l2Content = `speciificContentLevelTwo: { connect: { id: $contentLevel2 } }`
    if (config.contentLevel3) l3Content = `speciificContentLevelThree: { connect: { id: $contentLevel3 } }`
    if (config.contentLevel4) l4Content = `speciificContentLevelFour: { connect: { id: $contentLevel4 } }`
    if (config.contentID) linc = ` licensedContent: {
         update: {
           where: { id: $contentID }
           data: {
            ${l1Content}
            ${l2Content}
            ${l3Content}
            ${l4Content}            
           }
         }
       }`

    switch (config.method) {
      case "POST": //update
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
          $email:String
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
          ${config.contentID ? '$contentID:ID' : ""}
          ${config.contentLevel1 ? '$contentLevel1:ID' : ''}
          ${config.contentLevel2 ? '$contentLevel2:ID' : ''}
          ${config.contentLevel3 ? '$contentLevel3:ID' : ''}
          ${config.contentLevel4 ? '$contentLevel4:ID' : ''}
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
              email:$email
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
            email
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
          address: config.address,
          adminRes: config.adminRes,
          admin: config.admin,
          gps: config.gps,
          phone: config.gps,
          email:config.email,
          fax: config.fax,
          district: config.district,
          adminNum: config.adminNum,
          studentsNum: config.studentsNum,
          teachersNum: config.teachersNum,
          classesNum: config.classesNum,
          StudyYears: config.StudyYears,
          lowestStudyYear: config.lowestStudyYear,
          highestStudyYear: config.highestStudyYear,
          name: config.name,
          motherComp: config.motherComp,
          level1: config.level1,
          adminId: config.adminId,
          adminResID: config.adminResID,
          level2: config.level2,
          level3: config.level3,
          schoolID: config.schoolID,
          GeoAreaID: config.GeoAreaID,
          cityName: config.cityName,

        }

        if (config.contentID) variable['contentID'] = config.contentID
        if (config.contentLevel1) variable['contentLevel1'] = config.contentLevel1
        if (config.contentLevel2) variable['contentLevel2'] = config.contentLevel2
        if (config.contentLevel3) variable['contentLevel3'] = config.contentLevel3
        if (config.contentLevel4) variable['contentLevel4'] = config.contentLevel4

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
            email
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
          $email:String
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
              email:$email
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
          address: config.address,
          adminRes: config.adminRes,
          admin: config.admin,
          gps: config.gps,
          email:config.email,
          phone: config.gps,
          fax: config.fax,
          district: config.district,
          adminNum: config.adminNum,
          studentsNum: config.studentsNum,
          teachersNum: config.teachersNum,
          classesNum: config.classesNum,
          StudyYears: config.StudyYears,
          lowestStudyYear: config.lowestStudyYear,
          highestStudyYear: config.highestStudyYear,
          name: config.name,
          motherComp: config.motherComp,
          level1: config.level1,
          level2: config.level2,
          level3: config.level3,
          GeoAreaID: config.GeoAreaName,
          cityName: config.cityName,
          arrayOfSpeciificContent: config.arrayOfSpeciificContent 
        }

        if(variable['arrayOfSpeciificContent'] == "")
        delete variable['arrayOfSpeciificContent']


        break;
      case "DELETE": //delete
        query = `mutation($id: ID!) {
          deleteSchool(where: { id: $id }) {
            id
            name
          }
        }`
        variable = {
          id: config.id
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