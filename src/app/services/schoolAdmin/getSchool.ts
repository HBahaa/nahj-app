import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class getMySchool {

    constructor(private http: HttpClient) { }

    service(config) {
        let query: string = `query {
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
                            }
                            `;
        let variable: object = {};

        return this
            .http
            .post(`${config.url}`, {
                "query": query,
                "variables": variable
            });
    }
}