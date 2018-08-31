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
    let query1 = config.speciificContentLevelOneId ? `speciificContentLevelOne: { connect: { id: $speciificContentLevelOneId }}` : ""
    let query2 = config.speciificContentLevelTwoId ? `speciificContentLevelTwo: { connect: { id: $speciificContentLevelTwoId } }` : ""
    let query3 = config.speciificContentLevelThreeId ? `speciificContentLevelThree: { connect: { id: $speciificContentLevelThreeId } }` : ""
    let query4 = config.speciificContentLevelFourId ? `speciificContentLevelFour: { connect: { id: $speciificContentLevelFourId } }` : ""

    let variable1 = config.speciificContentLevelOneId ? `$speciificContentLevelOneId: ID` : ""
    let variable2 = config.speciificContentLevelTwoId ? `$speciificContentLevelTwoId: ID` : ""
    let variable3 = config.speciificContentLevelThreeId ? `$speciificContentLevelThreeId: ID` : ""
    let variable4 = config.speciificContentLevelFourId ? `$speciificContentLevelFourId: ID` : ""

    

    switch (config.method) {

      case "POST": //update


        query = `mutation(
          $title: String!
          $shortTitle: String!
          $currentStatusId: ID!
          $accountWayId: ID!
          ${variable1}
          ${variable2}
          ${variable3}
          ${variable4}
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
                  ${query1 ? "speciificContentLevelOne: { connect: { id: $speciificContentLevelOneId }}" : "speciificContentLevelOne: { disconnect: true}" }
                  ${query2 ? "speciificContentLevelTwo: { connect: { id: $speciificContentLevelTwoId }}" : "speciificContentLevelTwo: { disconnect: true}" }
                  ${query3 ? "speciificContentLevelThree: { connect: { id: $speciificContentLevelThreeId }}" : "speciificContentLevelThree: { disconnect: true}" }
                  ${query4 ? "speciificContentLevelFour: { connect: { id: $speciificContentLevelFourId }}" : "speciificContentLevelFour: { disconnect: true}" }

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
                  ${variable1}
                  ${variable2}
                  ${variable3}
                  ${variable4}
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
                  ${query1}
                  ${query2}
                  ${query3}
                  ${query4}
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

    if (config.speciificContentLevelOneId) variable["speciificContentLevelOneId"] = config.speciificContentLevelOneId;
    if (config.speciificContentLevelTwoId) variable["speciificContentLevelTwoId"] = config.speciificContentLevelTwoId;
    if (config.speciificContentLevelThreeId) variable["speciificContentLevelThreeId"] = config.speciificContentLevelThreeId;
    if (config.speciificContentLevelFourId) variable["speciificContentLevelFourId"] = config.speciificContentLevelFourId;

    return this
      .http
      .post(`${config.url} `, {
        "query": query,
        "variables": variable
      });
  }

}
