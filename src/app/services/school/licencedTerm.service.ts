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
        let query: string = "";
        let variable: object = {};


        switch (config.method) {
            case "PUT"://create
                query = `mutation {
                    updateSchool(
                      data: {
                        licensedTerm: {
                          create: {
                            create: {
                                ${config.hasOwnProperty('ladminNum') ? 'adminNum: $ladminNum' : ''}
                                ${config.hasOwnProperty('lstudentsNum') ? 'studentsNum: $lstudentsNum' : ''}
                                ${config.hasOwnProperty('lteachersNum') ? 'teachersNum: $lteachersNum' : ''}
                                ${config.hasOwnProperty('lclassesNum') ? 'classesNum: $lclassesNum' : ''}
                                ${config.hasOwnProperty('lstudyYear') ? 'studyYear: { connect: { id: $lstudyYear } }' : ''}
                                licensedContent: { create: [${this.CreateContentLevel(config)}] }
                            }
                          }
                        }
                      }
                      where: { id: ${config.id} }
                    ) {
                      id
                    }
                  }`
                variable = this.createVariable(config)
                break;
        }

        return this
            .http
            .post(`${config.url}`, {
                "query": query,
                "variables": variable
            });
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
}