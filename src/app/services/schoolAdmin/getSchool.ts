import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class getMySchool {

    constructor(private http: HttpClient) { }

    service(config) {
        let query: string = `query{
          schools{
            id
            name
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
            }
            email
            address
            gps
            phone
            fax
            
            admin{
              id
              name
              type
              job
              phone
              whatsApp
              email
              username
              password
            }
            
            motherComp
            geoArea{
              id
              name
            }
            city{
              id
              name
            }
            district
            classesNum
            studentsNum
            highestStudyYear
            lowestStudyYear
            
          }
        }`;
        let variable: object = {};

        return this
            .http
            .post(`${config.url}`, {
                "query": query,
                "variables": variable
            });
    }
}