import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class licencedTermService {

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
    service(config) {
        console.log("licenced config ===> ",config)
        let query: string = "";
        let variable: object = {};


        switch (config.method) {
            case "PUT"://create
                query = `mutation {
                    updateSchool(
                      data: {
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
                      where: { id: "${config.id}" }
                    ) {
                      id
                    }
                  }`
                variable = this.createVariable(config)
                break;
            case "POST"://update
                  query= `mutation{
                    updateLicensedTerm(
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
                        where:{
                            id:"${config.id}"
                        }
                    ){
                      id
                    }
                  }
                  `
                break;
            case "DELETE":
                  query=`mutation{
                    deleteLicensedTerm(
                      where:{id:"${config.id}"}
                    ){
                      id
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
    deleteContentLevel(config) {
        let str = '';
        if(!config.content_to_delete || config.content_to_delete.length < 1) return str;
        str = config.content_to_delete.reduce((strI,id) =>{
         return strI+=`{id:"${id}"}`
        },str)
        return str;
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
}