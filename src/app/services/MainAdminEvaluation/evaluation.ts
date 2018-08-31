import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class evaluation {
  constructor(private http: HttpClient) { }

  service(config) { ////method,url,name,cities,newName
    let query: string = "";
    let variable: object = {};
    // console.log(config)
    switch (config.method) {
      case "POST": //update
        query = `mutation(
          $title: String!
          $shortTitle: String!
          $currentStatusId: ID!
          $accountWayId: ID!
          $speciificContentLevelOneId: ID
          $speciificContentLevelTwoId: ID
          $speciificContentLevelThreeId: ID
          $speciificContentLevelFourId: ID
          $evaluationId:ID!
        ) {
          updateEvaluation(
            data: {
              title: $title
              shortTitle: $shortTitle
              currentStatus: { connect: { id: $currentStatusId } }
              accountWay: { connect: { id: $accountWayId } }
              speciificContentLevel: {
                update: {
                  speciificContentLevelOne: {
                    connect: { id: $speciificContentLevelOneId }
                  }
                  speciificContentLevelTwo: {
                    connect: { id: $speciificContentLevelTwoId }
                  }
                  speciificContentLevelThree: {
                    connect: { id: $speciificContentLevelThreeId }
                  }
                  speciificContentLevelFour: {
                    connect: { id: $speciificContentLevelFourId }
                  }
                }
              }
            }
            where: { id: $evaluationId }
          ) {
            id
            title
            shortTitle
            currentStatus {
              id
              name
            }
            accountWay {
              id
              name
              grades {
                id
                grade
                weight
              }
            }
            speciificContentLevel {
              id
              speciificContentLevelOne {
                id
                name
              }
              speciificContentLevelTwo {
                id
                name
              }
              speciificContentLevelThree {
                id
                name
              }
              speciificContentLevelFour {
                id
                name
              }
            }
            questionGroup {
              id
              name
              weight
            }
          }
        }
        `
        variable = {
          title: config.title,
          shortTitle: config.shortTitle,
          currentStatusId: config.currentStatusId,
          accountWayId: config.accountWayId,
          speciificContentLevelOneId: config.speciificContentLevelOneId,
          speciificContentLevelTwoId: config.speciificContentLevelTwoId,
          speciificContentLevelThreeId: config.speciificContentLevelThreeId,
          speciificContentLevelFourId: config.speciificContentLevelFourId,
          evaluationId: config.evaluationId
        }
        break;
      case "GET": //read
        query = `{
                    evaluations{
                      id,
                      title,
                      shortTitle,
                      currentStatus{
                          id,
                        name
                      },
                      accountWay{
                        id,
                        name,
                        grades{
                          id,
                          grade,
                          weight
                        }
                      },
                      speciificContentLevel{
                        id,
                        speciificContentLevelOne{
                          id,
                          name,
                          relativePercentage
                        }
                        speciificContentLevelTwo{
                          id,
                          name,
                          relativePercentage
                        }
                        speciificContentLevelThree{
                          id,
                          relativePercentage,
                          name
                        }
                        speciificContentLevelFour{
                          id,
                          relativePercentage
                          name
                        }
                      },
                      questionGroup{
                        id,
                        name,
                        weight,
                        questions{
                          id,
                          question,
                          details,
                          enhancement,
                          weight,
                          multiSelect,
                          isPercentage,
                          isEqualWeights
                        }
                      }
                    }
                  }`;
        break;
      case "PUT"://create
        query = ` mutation(
          $title: String!
                  $shortTitle: String!
                  $currentStatusId: ID!
                  $accountWayId: ID!
                  $speciificContentLevelOneId: ID
                  $speciificContentLevelTwoId: ID
                  $speciificContentLevelThreeId: ID
                  $speciificContentLevelFourId: ID
                  $questionGroupName: String!
                  $questionGroupWeight: String!
        ) {
          createEvaluation(
            data: {
              title: $title
                      shortTitle: $shortTitle
                      currentStatus: { connect: { id: $currentStatusId } }
                      accountWay: { connect: { id: $accountWayId } }
                      speciificContentLevel: {
                create: {
                  speciificContentLevelOne: {
                    connect: { id: $speciificContentLevelOneId }
                  }
                          speciificContentLevelTwo: {
                    connect: { id: $speciificContentLevelTwoId }
                  }
                          speciificContentLevelThree: {
                    connect: { id: $speciificContentLevelThreeId }
                  }
                          speciificContentLevelFour: {
                    connect: { id: $speciificContentLevelFourId }
                  }
                }
              }
                      questionGroup: {
                create: { name: $questionGroupName, weight: $questionGroupWeight }
              }
            }
          ) {
            id
            title
            shortTitle
            currentStatus {
              id
              name
            }
            accountWay {
              id
              name
              grades {
                id
                grade
                weight
              }
            }
            speciificContentLevel {
              id
              speciificContentLevelOne {
                id
                name
              }
              speciificContentLevelTwo {
                id
                name
              }
              speciificContentLevelThree {
                id
                name
              }
              speciificContentLevelFour {
                id
                name
              }
            }
            questionGroup {
              id
              name
              weight
            }
          }
        }
        `
        variable = {
          title: config.title,
          shortTitle: config.shortTitle,
          currentStatusId: config.currentStatusId,
          accountWayId: config.accountWayId,
          speciificContentLevelOneId: config.speciificContentLevelOneId,
          speciificContentLevelTwoId: config.speciificContentLevelTwoId,
          speciificContentLevelThreeId: config.speciificContentLevelThreeId,
          speciificContentLevelFourId: config.speciificContentLevelFourId,
          questionGroupName: config.questionGroupName,
          questionGroupWeight: config.questionGroupWeight
        }
        break;
      case "DELETE": //delete
        query = `mutation($id: ID!){
          deleteEvaluation(
            where: {
              id: $id
            }
          ){
            id,
              title,
              shortTitle
          }
        } `
        variable = {
          id: config.id
        }
        break;
    }
    return this
      .http
      .post(`${config.url} `, {
        "query": query,
        "variables": variable
      });
  }

}
