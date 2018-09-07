import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class updateSchool {
    
    constructor(private http: HttpClient) { }
    createVariable(variable,config){
        for (let key in config){
            if(this.fields.includes(key))
                variable[key] = config[key]
        }
        return variable
    }
    fields  = ['address','gps','phone','fax','StudyYears','lowestStudyYear','highestStudyYear','name','motherComp','district','adminNum','studentsNum','classesNum','teachersNum','speciificCity','speciificGeaoArea','admin1ID','admin2ID','admin1','admin2','schoolId']
    renderSpecificArea(config){
        if(config.speciificGeaoArea && config.speciificCity)
            return `speciificArea: {
                update: {
                    speciificGeaoArea: { connect: { id: $speciificGeaoArea } }
                    speciificCity: { connect: { id: $speciificCity } }
                }
            }`
        else
            return ""
            
    }
    renderAdmin(config){
        if(config.admin1 && config.admin2 && config.admin1ID && config.admin2ID)
            return `admin: {
                update: [
                    { where: { id: $admin1ID }, data: $admin1 }
                    { where: { id: $admin2ID }, data: $admin2 }
                ]
            }`
        else
            return ``
    }
    service(config) {
        let query: string = ``
        let variable: object = {};
        switch (config.method) {
            case "POST": //update
                query=`mutation(
                        ${config.address?"$address: String":""}
                        ${config.gps?"$gps: String":""}
                        ${config.phone?"$phone: String":""}
                        ${config.fax?"$fax: String":""}
                        ${config.StudyYears?"$StudyYears:String":""}
                        ${config.lowestStudyYear?"$lowestStudyYear:String":""}                        
                        ${config.highestStudyYear?"$highestStudyYear:String":""}                        
                        ${config.name?"$name:String":""}                        
                        ${config.motherComp?"$motherComp:String":""}                        
                        ${config.district?"$district:String":""}                        
                        ${config.adminNum?"$adminNum:Int":""}                        
                        ${config.studentsNum?"$studentsNum:Int":""}                        
                        ${config.classesNum?"$classesNum:Int":""}                        
                        ${config.teachersNum?"$teachersNum:Int":""}                        
                        ${config.speciificCity?"$speciificCity:ID":""}                        
                        ${config.speciificGeaoArea?"$speciificGeaoArea:ID":""}                        
                        ${config.admin1ID?"$admin1ID: ID!":""}                        
                        ${config.admin1?"$admin1: NahjAdminUpdateDataInput!":""}                        
                        ${config.admin2ID?"$admin2ID: ID!":""}                        
                        ${config.admin2?"$admin2: NahjAdminUpdateDataInput!":""}                        
                        ${config.schoolId?"$schoolId: ID!":""}                        
                    ) {
                        updateSchool(
                        data: {
                            ${config.address?"address: $address":""}
                            ${config.gps?"gps: $gps":""}
                            ${config.phone?"phone: $phone":""}
                            ${config.fax?"fax: $fax":""}
                            ${config.district?"district: $district":""}  
                            ${config.adminNum?"adminNum: $adminNum":""} 
                            ${config.studentsNum?"studentsNum: $studentsNum":""}
                            ${config.classesNum?"classesNum: $classesNum":""}
                            ${config.teachersNum?"teachersNum: $teachersNum":""} 
                            ${config.StudyYears?"StudyYears: $StudyYears":""}
                            ${config.lowestStudyYear?"lowestStudyYear: $lowestStudyYear":""} 
                            ${config.highestStudyYear?"highestStudyYear: $highestStudyYear":""} 
                            ${config.name?"name: $name":""} 
                            ${config.motherComp?"motherComp: $motherComp":""} 
                            ${this.renderSpecificArea(config)}
                            ${this.renderAdmin(config)}
                        }
                        ${config.$schoolId?"where: { id: $schoolId }":""} 
                        ) {
                        id
                        }
                    }
                `
                variable = this.createVariable(variable,config);
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
                specificStudyLevels {
                    id
                    speciificLevelOne {
                    name
                    id
                    }
                    speciificLevelTwo {
                    id
                    name
                    }
                    speciificLevelThree {
                    id
                    name
                    }
                }
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