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
        console.log("config", config);
        console.log("config", config.geoArea);

        query = `mutation(
          $admin: NahjAdminCreateInput!
          $adminRes: NahjAdminCreateInput!
          $address: String!
          $gps: String!
          $phone: String!
          $fax: String!
          $email:String!
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

  CreateAdmin(config) {
    console.log("config.admin", config.admin)
    if (config.admin && config.admin.length > 0) {
      return config.admin.map((item) => {
        let a = {
          name: item.name || "",
          job: item.job || "",
          type: item.type || "",
          phone: item.phone || "",
          whatsApp: item.whatsApp || "",
          username: item.username || "",
          password: item.password || "",
          email: item.email || "",
        }
        console.log("a", a)
        return a
      })
    } else {
      return '';
    }
  }

  CreateContentLevel(config) {
    if (config.content && config.content.length > 0) {
      return (config.content
        .map((item) => {
          let a = {}
          if (item.speciificContentLevelOne) a['speciificContentLevelOne'] = { connect: { id: item.speciificContentLevelOne } }
          if (item.speciificContentLevelTwo) a['speciificContentLevelTwo'] = { connect: { id: item.speciificContentLevelTwo } }
          if (item.speciificContentLevelThree) a['speciificContentLevelThree'] = { connect: { id: item.speciificContentLevelThree } }
          if (item.speciificContentLevelFour) a['speciificContentLevelFour'] = { connect: { id: item.speciificContentLevelFour } }
          return a;
        })
      )
    } else {
      return '';
    }
  }

  updateAdmin(config) {
    if (config.admin && config.admin.length > 1)
      return config.admin.map(item => {
        return {
          where: {
            id: item.id
          },
          data: {
            name: item.name || "",
            job: item.job || "",
            type: item.type || "",
            phone: item.phone || "",
            whatsApp: item.whatsApp || "",
            username: item.username || "",
            password: item.password || "",
          }
        }
      })
    else{
      return ''
    }
  }

  updatelicenceContent(config) {
    return config.content.map((item) => {
    let a =  {
        where:{
          id:item.id
        },
        data:{
          
        }
      }
      if (item.hasOwnProperty('speciificContentLevelOne')) item.speciificContentLevelOne == false?  a.data['speciificContentLevelOne'] = { disconnect: true} :  a.data['speciificContentLevelOne'] = { connect: { id: item.speciificContentLevelOne } }
      if (item.hasOwnProperty('speciificContentLevelTwo')) item.speciificContentLevelTwo == false?  a.data['speciificContentLevelTwo'] = { disconnect: true} :  a.data['speciificContentLevelTwo'] = { connect: { id: item.speciificContentLevelTwo } }
      if (item.hasOwnProperty('speciificContentLevelThree')) item.speciificContentLevelThree == false?  a.data['speciificContentLevelThree'] = { disconnect: true} :  a.data['speciificContentLevelThree'] = { connect: { id: item.speciificContentLevelThree } }
      if (item.hasOwnProperty('speciificContentLevelFour')) item.speciificContentLevelFour == false?  a.data['speciificContentLevelFour'] = { disconnect: true} :  a.data['speciificContentLevelFour'] = { connect: { id: item.speciificContentLevelFour } }  

    return a;
    })
  }
}

`
config = {
method:""
[optional]  id :"",
[optional]  address:"",
[optional]  gps:"",
[optional]  email:"",
[optional]  phone:"",
[optional]  fax:"",
[optional]  district:"",
[optional]  studentsNum:"",
[optional]  classesNum:"",
[optional]  lowestStudyYear:"",
[optional]  highestStudyYear:"",
[optional]  name:"",
[optional]  motherComp:"",
[optional]  geoArea:     'ID' || false --> for disconnect ,
[optional]  city:        'ID' || false --> for disconnect ,
[optional]  levels:      'ID' || false --> for disconnect ,
[optional]  levelTwo:    'ID' || false --> for disconnect ,
[optional]  levelThree:  'ID' || false --> for disconnect ,
[optional]  ladminNum:"",
[optional]  lstudentsNum:"",
[optional]  lclassesNum:"",
[optional]  lteachersNum:"",
[optional]  lstudyYear:  'ID' || false --> for disconnect,
[optional]  admin : [{
  [optional]  id         'value' || ""
  [required]  name       'value' || ""
  [required]  job        'value' || ""
  [required]  type       'value' || ""
  [required]  phone      'value' || ""
  [required]  whatsApp   'value' || ""
  [required]  username   'value' || ""
  [required]  password   'value' || ""
  [required]  email      'value' || ""
  }]
[optional]  content:[{
    [optional] id       'value' || ""
    [optional] speciificContentLevelOne:"ID"   || false --> for disconnect
    [optional] speciificContentLevelTwo:"ID"   || false --> for disconnect
    [optional] speciificContentLevelThree:"ID" || false --> for disconnect
    [optional] speciificContentLevelFour:"ID"  || false --> for disconnect
  }]

[optional] licencedTermId: 'ID' || ''
}
`
