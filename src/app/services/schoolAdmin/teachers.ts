import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class teachers {

    constructor(private http: HttpClient) { }
    fields = ['schoolId','specificStudyLevelsId','evaluationAdd','evaluationDelete','evaluationInfoEdit','evaluationInfoAdd','name','title','job','phone','whatsApp','email','type','username','password','connectedClasses','disconnectedClasses','teacherId'];
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
                  ${config.connectedClasses?'$connectedClasses: SpecificStudyLevelWhereUniqueInput!':''}
                  ${config.disconnectedClasses?'$disconnectedClasses: SpecificStudyLevelWhereUniqueInput!':''}
                  
                  ${config.evaluationAdd?'$evaluationAdd: Boolean':""}
                  ${config.evaluationDelete?'$evaluationDelete: Boolean':""}
                  ${config.evaluationInfoAdd?'$evaluationInfoAdd: Boolean':""}
                  ${config.evaluationInfoEdit?'$evaluationInfoEdit: Boolean':""}
                  ${config.name?'$name: String':""}
                  ${config.title?'$title: String':""}
                  ${config.job?'$job: String':""}
                  ${config.whatsApp?'$whatsApp: String':""}
                  ${config.email?'$email: String':""}
                  ${config.phone?'$phone: String':""}
                  ${config.type?'$type: String':""}
                  ${config.username?'$username: String':""}
                  ${config.password?'$password: String':""}

                  ${config.teacherId?'$teacherId: ID!':""}
                ) {
                  updateTeacher(
                    data: {
                      ${config.name?'name: $name':""}
                      ${config.title?'title: $title':""}
                      ${config.job?'job: $job':""}
                      ${config.type?'type: $type':""}
                      ${config.phone?'phone: $phone':""}
                      ${config.whatsApp?'whatsApp: $whatsApp':""}
                      ${config.email?'email: $email':""}
                      ${config.username?'username: $username':""}
                      ${config.password?'password: $password':""}
                      ${config.evaluationAdd?'evaluationAdd: $evaluationAdd':""}
                      ${config.evaluationDelete?'evaluationDelete: $evaluationDelete':""}
                      ${config.evaluationInfoEdit?'evaluationInfoEdit: $evaluationInfoEdit':""}
                      ${config.evaluationInfoAdd?'evaluationInfoAdd: $evaluationInfoAdd':""}
                      ${config.connectedClasses || config.disconnectedClasses ? `specificStudyLevels: {
                                                                                  ${config.connectedClasses?'connect: [$connectedClasses]':''}
                                                                                  ${config.disconnectedClasses?'disconnect: [$disconnectedClasses]':''}
                                                                                }`
                                                                                :''
                      }
                    }
                    ${config.teacherId?'where: { id: $teacherId }':""}
                  ) {
                    id
                  }
                }`
                variable = this.createVariable(config);
            break;
            case "PUT" : //Create
                query=`mutation(
                  ${config.specificStudyLevelsId?'$specificStudyLevelsId: ID!':""}
                  ${config.evaluationAdd?'$evaluationAdd: Boolean':""}
                  ${config.evaluationDelete?'$evaluationDelete: Boolean':""}
                  ${config.evaluationInfoAdd?'$evaluationInfoAdd: Boolean':""}
                  ${config.evaluationInfoEdit?'$evaluationInfoEdit: Boolean':""}
                  ${config.name?'$name: String':""}
                  ${config.title?'$title: String':""}
                  ${config.job?'$job: String':""}
                  ${config.whatsApp?'$whatsApp: String':""}
                  ${config.email?'$email: String':""}
                  ${config.phone?'$phone: String':""}
                  ${config.type?'$type: String':""}
                  ${config.username?'$username: String':""}
                  ${config.password?'$password: String':""}
                  ${config.schoolId?'$schoolId: ID!':""}
                ) {
                  updateSchool(
                    data: {
                      teachers: {
                        create: {
                          ${config.name?'name: $name':""}
                          ${config.title?'title: $title':""}
                          ${config.job?'job: $job':""}
                          ${config.type?'type: $type':""}
                          ${config.phone?'phone: $phone':""}
                          ${config.whatsApp?'whatsApp: $whatsApp':""}
                          ${config.email?'email: $email':""}
                          ${config.username?'username: $username':""}
                          ${config.password?'password: $password':""}
                          ${config.evaluationAdd?'evaluationAdd: $evaluationAdd':""}
                          ${config.evaluationDelete?'evaluationDelete: $evaluationDelete':""}
                          ${config.evaluationInfoEdit?'evaluationInfoEdit: $evaluationInfoEdit':""}
                          ${config.evaluationInfoAdd?'evaluationInfoAdd: $evaluationInfoAdd':""}
                          ${config.specificStudyLevelsId?'specificStudyLevels: { connect: { id: $specificStudyLevelsId } }':""}
                        }
                      }
                    }
                    ${config.schoolId?'where: { id: $schoolId }':""}
                  ) {
                    id
                  }
                }`
                variable = this.createVariable(config);
            break;
            case "DELETE" : //Delete
                  query=`mutation($teacherId:ID!){
                    deleteTeacher(where:{id:$teacherId}){id}
                  }`
                  variable = this.createVariable(config);
            break;
            case "GET":
                  query=`query($schoolId: ID!) {
                    school(where: { id: $schoolId }) {
                      id
                      teachers {
                        id
                        name
                        title
                        job
                        type
                        phone
                        whatsApp
                        email
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
                        evaluationAdd
                        evaluationDelete
                        evaluationInfoEdit
                        evaluationInfoAdd
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
