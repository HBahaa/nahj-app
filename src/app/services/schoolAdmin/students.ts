import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class students {

    constructor(private http: HttpClient) { }
    fields = ['schoolId','specificStudyLevelsId','fullName','necName','birthday','idNum','nationality','gender','studyYear','class','photo','accountStatus','username','password','extraInfoOne','extraInfoTwo','extraInfoThree','connectedClassId','disconnect','studentId'];
    createVariable(config){
        let newVar = {};
        for (let key in config){
            if(this.fields.includes(key) && config[key])
                newVar[key] = config[key]
        }
        return newVar
    }
    service(config) {
        let query: string = ``
        let variable: object = {};
        switch (config.method) {
            case "POST": //update
                query=`mutation(
                  ${config.fullName?'$fullName: String':""}
                  ${config.necName?'$necName: String':""}
                  ${config.birthday?'$birthday: String':""}
                  ${config.idNum?'$idNum: String':""}
                  ${config.nationality?'$nationality: String':""}
                  ${config.gender?'$gender: String':""}
                  ${config.studyYear?'$studyYear: String':""}
                  ${config.class?'$class: String':""}
                  ${config.photo?'$photo: String':""}
                  ${config.accountStatus?'$accountStatus: String':""}
                  ${config.username?'$username: String':""}
                  ${config.password?'$password: String':""}
                  ${config.extraInfoOne?'$extraInfoOne: String':""}
                  ${config.extraInfoTwo?'$extraInfoTwo: String':""}
                  ${config.extraInfoThree?'$extraInfoThree: String':""}
                  
                  
                  ${config.connectedClassId?'$connectedClassId: ID':""}
                  ${config.disconnect?'$disconnect:Boolean':""}
                  
                  ${config.studentId?'$studentId: ID!':""}
                ){
                  updateStudent(
                    data:{

                      ${config.fullName?'fullName: $fullName':""}
                      ${config.necName?'necName: $necName':""}
                      ${config.birthday?'birthday: $birthday':""}
                      ${config.idNum?'idNum: $idNum':""}
                      ${config.nationality?'nationality: $nationality':""}
                      ${config.gender?'gender: $gender':""}
                      ${config.class?'class: $class':""}
                      ${config.studyYear?'studyYear: $studyYear':""}
                      ${config.photo?'photo: $photo':""}
                      ${config.accountStatus?'accountStatus: $accountStatus':""}
                      ${config.username?'username: $username':""}
                      ${config.password?'password: $password':""}
                      ${config.extraInfoOne?'extraInfoOne: $extraInfoOne':""}
                      ${config.extraInfoTwo?'extraInfoTwo: $extraInfoTwo':""}
                      ${config.extraInfoThree?'extraInfoThree: $extraInfoThree':""}
                      ${config.connectedClassId || config.disconnect? `specificStudyLevels: {
                                                                          ${config.connectedClassId?'connect: {id:$connectedClassId}':''}
                                                                          ${config.disconnect?'disconnect: $disconnect':''}
                                                                        }`:'' }
                    }
                    where:{
                      id:$studentId
                    }
                  ){
                    id
                  }
                }`
                variable = this.createVariable(config);
            break;
            case "PUT" : //Create
                query=`mutation(
                  ${config.schoolId?'$schoolId: ID!':""}
                  ${config.specificStudyLevelsId?'$specificStudyLevelsId: ID!':""}
                  ${config.fullName?'$fullName: String':""}
                  ${config.necName?'$necName: String':""}
                  ${config.birthday?'$birthday: String':""}
                  ${config.idNum?'$idNum: String':""}
                  ${config.nationality?'$nationality: String':""}
                  ${config.gender?'$gender: String':""}
                  ${config.studyYear?'$studyYear: String':""}
                  ${config.class?'$class: String':""}
                  ${config.photo?'$photo: String':""}
                  ${config.accountStatus?'$accountStatus: String':""}
                  ${config.username?'$username: String':""}
                  ${config.password?'$password: String':""}
                  ${config.extraInfoOne?'$extraInfoOne: String':""}
                  ${config.extraInfoTwo?'$extraInfoTwo: String':""}
                  ${config.extraInfoThree?'$extraInfoThree: String':""}                 
                ){
                  updateSchool(
                    data:{
                      students:{
                        create:{
                          ${config.fullName?'fullName: $fullName':""}
                          ${config.necName?'necName: $necName':""}
                          ${config.birthday?'birthday: $birthday':""}
                          ${config.idNum?'idNum: $idNum':""}
                          ${config.nationality?'nationality: $nationality':""}
                          ${config.gender?'gender: $gender':""}
                          ${config.class?'class: $class':""}
                          ${config.studyYear?'studyYear: $studyYear':""}
                          ${config.photo?'photo: $photo':""}
                          ${config.accountStatus?'accountStatus: $accountStatus':""}
                          ${config.username?'username: $username':""}
                          ${config.password?'password: $password':""}
                          ${config.extraInfoOne?'extraInfoOne: $extraInfoOne':""}
                          ${config.extraInfoTwo?'extraInfoTwo: $extraInfoTwo':""}
                          ${config.extraInfoThree?'extraInfoThree: $extraInfoThree':""}

                          ${config.specificStudyLevelsId?'specificStudyLevels:{connect:{id:$specificStudyLevelsId }}':""}
                        }
                      }
                    }
                    ${config.schoolId?'where: { id: $schoolId }':""}
                  ){
                    id
                  }
                }`
                variable = this.createVariable(config);
            break;
            case "DELETE" : //Delete
                  query=`mutation($studentId:ID!){deleteStudent(where:{id:$studentId}){id}}`
                  variable = this.createVariable(config);
            break;
            case "GET":
                  query=`query($schoolId: ID!) {
                    school(where: { id: $schoolId }) {
                      students {
                        id
                        fullName
                        necName
                        birthday
                        idNum
                        nationality
                        gender
                        class
                        studyYear
                        photo
                        accountStatus
                        username
                        password
                        specificStudyLevels {
                          id
                          studyLevelOne {
                            id
                            name
                          }
                          studyLevelTwo {
                            id
                            name
                          }
                          studylevelThree {
                            id
                            name
                          }
                        }
                        extraInfoOne
                        extraInfoTwo
                        extraInfoThree
                      }
                    }
                  }`
                  variable = this.createVariable(config);
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
