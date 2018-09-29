import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private http: HttpClient) { }
  fields = ['address', 'gps', 'email', 'phone', 'fax', 'district', 'studentsNum', 'classesNum', 'ladminNum', 'lstudentsNum', 'lclassesNum', 'lteachersNum', 'lowestStudyYear', 'highestStudyYear', 'name', 'motherComp', 'city', 'levels', 'levelTwo', 'levelThree', 'lstudyYear', 'geoArea', 'id'];

  createVariable(config) {
    let newVar = {};
    for (let key in config) {
      if (this.fields.includes(key) && config[key])
        newVar[key] = config[key]
    }
    return newVar
  }

  service(config) { ////method,url,id,adminId,address,admin,gps,phone,fa,district,adminNum,studentsNum,classesNum ... , admin[Object of admin data check schema] 
    let query: string = "";
    let variable: object = {};

    console.log("config service ===> ", config)
    switch (config.method) {
      case "POST": //update
        query = `mutation {
          updateSchool(
            data:{
              ${config.hasOwnProperty('address') ? `address: "${config.address}"` : ''}
              ${config.hasOwnProperty('gps') ? `gps:     "${config.gps}"` : ''}
              ${config.hasOwnProperty('email') ? `email: "${config.email}"` : ''}
              ${config.hasOwnProperty('phone') ? `phone: "${config.phone}"` : ''}
              ${config.hasOwnProperty('fax') ? `fax:     "${config.fax}"` : ''}
              ${config.hasOwnProperty('district') ? `district: "${config.district}"` : ''}
              ${config.hasOwnProperty('studentsNum') ? `studentsNum: ${config.studentsNum}` : ''}
              ${config.hasOwnProperty('classesNum') ? `classesNum: ${config.classesNum}` : ''}
              ${config.hasOwnProperty('lowestStudyYear') ? `lowestStudyYear: "${config.lowestStudyYear}"` : ''}
              ${config.hasOwnProperty('highestStudyYear') ? `highestStudyYear: "${config.highestStudyYear}"` : ''}
              ${config.hasOwnProperty('name') ? `name: "${config.name}"` : ''}
              ${config.hasOwnProperty('motherComp') ? `motherComp: "${config.motherComp}"` : ''}
              
              
              ${config.hasOwnProperty('geoArea') ? (config.geoArea == false ? 'geoArea:   {disconnect:true}' : `geoArea:{connect:{id:"${config.geoArea}"}}`) : ''}
              ${config.hasOwnProperty('city') ? (config.city == false ? 'city:   {disconnect:true}' : `city:{connect:{id:"${config.city}"}}`) : ''}
              ${config.hasOwnProperty('levels') ? (config.levels == false ? 'levels:   {disconnect:true}' : `levels:{connect:{id:"${config.levels}"}}`) : ''}
              ${config.hasOwnProperty('levelTwo') ? (config.levelTwo == false ? 'levelTwo:   {disconnect:true}' : `levelTwo:{connect:{id:"${config.levelTwo}"}}`) : ''}
              ${config.hasOwnProperty('levelThree') ? (config.levelThree == false ? 'levelThree:   {disconnect:true}' : `levelThree:{connect:{id:"${config.levelThree}"}}`) : ''}
              
              admin:{
                update:${ this.updateAdmin(config) ? "[" + this.updateAdmin(config) + "]" : '[]'} 
              }
              ${config.hasOwnProperty('licencedTermId') ? `
                licensedTerm:{
                  update:{
                    where:{ id:"${config.licencedTermId}" }
                    data:{
                      ${config.hasOwnProperty('ladminNum')    ? `adminNum: ${config.ladminNum}` : ''}
                      ${config.hasOwnProperty('lstudentsNum') ? `studentsNum: ${config.lstudentsNum}` : ''}
                      ${config.hasOwnProperty('lteachersNum') ? `teachersNum: ${config.lteachersNum}` : ''}
                      ${config.hasOwnProperty('lclassesNum')  ? `classesNum: ${config.lclassesNum}` : ''}

                      ${config.hasOwnProperty('lstudyYear')   ? (config.lstudyYear == false ? 'studyYear:   {disconnect:true}' : `studyYear:{connect:{id:"${config.lstudyYear}"}}`) : ''}
                      licensedContent:{
                        create:[
                          ${this.CreateContentLevel(config) ? '[' + this.CreateContentLevel(config) + ']' : '[]'}
                        ]
                        delete:[
                          ${this.deleteContentLevel(config)}
                        ]
                      }
                    }
                  }
                }
              ` : ''}
              
            }
            where:{
              id:"${config.id}"
            }
          ){
            id
          }
        }`

        variable = this.createVariable(config);
        break;
      case "GET": //read
        query = `query{
          schools{
            id
            address
            geoArea{
              id
              name
            }
            city{
              id
              name
            }
            admin{
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
            email
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
            studentsNum
            classesNum
            lowestStudyYear
            highestStudyYear
            name
            motherComp
            licensedTerm{
              id
              studyYear{
                id
                name
              }
              adminNum
              studentsNum
              classesNum
              teachersNum
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
        }`;
        break;
      case "PUT"://create
        query = `mutation{
          createSchool(
            data: {
              ${config.hasOwnProperty('address') ? `address: "${config.address}"` : ''}
              ${config.hasOwnProperty('gps') ? `gps: "${config.gps}"` : ''}
              ${config.hasOwnProperty('email') ? `email: "${config.email}"` : ''}
              ${config.hasOwnProperty('phone') ? `phone: "${config.phone}"` : ''}
              ${config.hasOwnProperty('fax') ? `fax: "${config.fax}"` : ''}
              ${config.hasOwnProperty('district') ? `district: "${config.district}"` : ''}
              ${config.hasOwnProperty('studentsNum') ? `studentsNum: ${config.studentsNum}` : ''}
              ${config.hasOwnProperty('classesNum') ? `classesNum: ${config.classesNum}` : ''}
              ${config.hasOwnProperty('lowestStudyYear') ? `lowestStudyYear: "${config.lowestStudyYear}"` : ''}
              ${config.hasOwnProperty('highestStudyYear') ? `highestStudyYear: "${config.highestStudyYear}"` : ''}
              ${config.hasOwnProperty('name') ? `name: "${config.name}"` : ''}
              ${config.hasOwnProperty('motherComp') ? `motherComp: "${config.motherComp}"` : ''}
              
              ${config.hasOwnProperty('city') ? `city: { connect: { id: "${config.city}" } }` : ''}
              ${config.hasOwnProperty('geoArea') ? `geoArea: { connect: { id: "${config.geoArea}" } }` : ''}
              ${config.hasOwnProperty('levels') ? `levels: { connect: { id: "${config.levels}" } }` : ''}
              ${config.hasOwnProperty('levelTwo') ? `levelTwo: { connect: { id: "${config.levelTwo}" } }` : ''}
              ${config.hasOwnProperty('levelThree') ? `levelThree: { connect: { id: "${config.levelThree}" } }` : ''}
             
              admin: { create: ${ this.CreateAdmin(config) ? "[" + this.CreateAdmin(config) + "]" : '[]'} }
              licensedTerm: {
                create: {
                  ${config.hasOwnProperty('ladminNum') ? `adminNum: ${config.ladminNum}` : ''}
                  ${config.hasOwnProperty('lstudentsNum') ? `studentsNum: ${config.lstudentsNum}` : ''}
                  ${config.hasOwnProperty('lteachersNum') ? `teachersNum: ${config.lteachersNum}` : ''}
                  ${config.hasOwnProperty('lclassesNum') ? `classesNum: ${config.lclassesNum}` : ''}
                  ${config.hasOwnProperty('lstudyYear') ? `studyYear: { connect: { id: "${config.lstudyYear}" } }` : ''}
                  licensedContent: { create: ${this.CreateContentLevel(config) ? '[' + this.CreateContentLevel(config) + ']' : '[]'} }
                }
              }
            }
          ) {
            id
          }
        }`
        variable = this.createVariable(config);
        break;
      case "DELETE": //delete
        // query = `mutation{
        //   deleteSchool(where:{id:${config.id}}){id}
        // }`

        // *****heba
        query = `mutation($id:ID!) {
          deleteSchool(where:{id:$id}){id}
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
    if (config.admin && config.admin.length > 1) {
      return config.admin.reduce((admin, item) => { 
        let a = `{
          name: "${item.name || ""}",
          job:  "${item.job || ""}",
          type: "${item.type || ""}",
          phone:"${item.phone || ""}",
          whatsApp: "${item.whatsApp || ""}",
          username: "${item.username || ""}",
          password: "${item.password || ""}",
          email: "${item.email || ""}",
        }`
        a = a.replace(/\r?\n|\r/g, '')
        admin += a;
        return admin
      }, '')
    } else {
      return '';
    }
  }

  CreateContentLevel(config) {
    if (config.content && config.content.length > 0) {
      return (config.content
        .reduce((content, item) => {
          let a = `{
            ${(item.speciificContentLevelOne) ? `speciificContentLevelOne : { connect: { id: "${item.speciificContentLevelOne}" } }` : ''}
            ${(item.speciificContentLevelTwo) ? `speciificContentLevelTwo : { connect: { id: "${item.speciificContentLevelTwo}" } }` : ''}
            ${(item.speciificContentLevelThree) ? `speciificContentLevelThree : { connect: { id: "${item.speciificContentLevelThree}" } }` : ''}
            ${(item.speciificContentLevelFour) ? `speciificContentLevelFour : { connect: { id: "${item.speciificContentLevelFour}" } }` : ''}
          }`
          a = a.replace(/\r?\n|\r/g, '')
          content += a
          return content;
        }, '')
      )
    } else {
      return '';
    }
  }

  updateAdmin(config) {
    if (config.admin && config.admin.length > 1)
      return config.admin.reduce((admin, item) => {
        return admin += `{
          where: {
            id: "${item.id}"
          },
          data: {
            name: "${item.name || ""}",
            email: "${item.email || ""}",
            job: "${item.job || ""}",
            type: "${item.type || ""}",
            phone: "${item.phone || ""}",
            whatsApp: "${item.whatsApp || ""}",
            username: "${item.username || ""}",
            password: "${item.password || ""}",
          }
        }`
      }, '').replace(/\r?\n|\r/g, '')
    else {
      return ''
    }
  }

  deleteContentLevel(config) {
    let str = '';
    if(!config.content_to_delete || config.content_to_delete.length < 1) return str;
    str = config.content_to_delete.reduce((strI,id) =>{
     return strI+=`{id:"${id}"}`
    },str)
    return str;
  }
}


`config = {
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
[optional]  geoArea:        'ID' || false --> for disconnect ,
[optional]  city:           'ID' || false --> for disconnect ,
[optional]  levels:         'ID' || false --> for disconnect ,
[optional]  levelTwo:       'ID' || false --> for disconnect ,
[optional]  levelThree:     'ID' || false --> for disconnect ,
[optional]  licencedTermId: 'ID' || false --> for disconnect,
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
    [optional] speciificContentLevelOne:    "ID"   
    [optional] speciificContentLevelTwo:    "ID"  
    [optional] speciificContentLevelThree:  "ID"
    [optional] speciificContentLevelFour:   "ID" 
  }]
[optional]  content_to_delete:[id]
}`