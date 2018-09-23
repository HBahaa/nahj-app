import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(private http: HttpClient) { }
  fields = ['address', 'gps', 'email', 'phone', 'fax', 'district', 'studentsNum', 'classesNum', 'ladminNum', 'lstudentsNum', 'lclassesNum', 'lteachersNum', 'lowestStudyYear', 'highestStudyYear', 'name', 'motherComp', 'city', 'levels', 'levelTwo', 'levelThree', 'lstudyYear', 'geoArea','id'];

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


    switch (config.method) {
      case "POST": //update
        query = `mutation(
          ${config.hasOwnProperty('address') ? '$address: String' : ''}
          ${config.hasOwnProperty('gps') ? '$gps: String' : ''}
          ${config.hasOwnProperty('email') ? '$email: String' : ''}
          ${config.hasOwnProperty('phone') ? '$phone: String' : ''}
          ${config.hasOwnProperty('fax') ? '$fax: String' : ''}
          ${config.hasOwnProperty('district') ? '$district: String' : ''}
          ${config.hasOwnProperty('lowestStudyYear') ? '$lowestStudyYear: String' : ''}
          ${config.hasOwnProperty('highestStudyYear') ? '$highestStudyYear: String' : ''}
          ${config.hasOwnProperty('name') ? '$name: String' : ''}
          ${config.hasOwnProperty('motherComp') ? '$motherComp: String' : ''}
          ${config.hasOwnProperty('studentsNum') ? '$studentsNum: Int' : ''}
          ${config.hasOwnProperty('classesNum') ? '$classesNum: Int' : ''}
          ${config.hasOwnProperty('ladminNum') ? '$ladminNum: Int' : ''}
          ${config.hasOwnProperty('lstudentsNum') ? '$lstudentsNum: Int' : ''}
          ${config.hasOwnProperty('lclassesNum') ? '$lclassesNum: Int' : ''}
          ${config.hasOwnProperty('lteachersNum') ? '$lteachersNum: Int' : ''}
          ${config.hasOwnProperty('geoArea') ? '$geoArea:ID!' : ''}
          ${config.hasOwnProperty('city') ? '$city: ID' : ''}
          ${config.hasOwnProperty('levels') ? '$levels: ID' : ''}
          ${config.hasOwnProperty('levelTwo') ? '$levelTwo: ID' : ''}
          ${config.hasOwnProperty('levelThree') ? '$levelThree: ID' : ''}
          ${config.hasOwnProperty('lstudyYear') ? '$lstudyYear: ID' : ''}
          ${config.hasOwnProperty('licencedTermId') ? '$licencedTermId: ID' : ''}
        ) {
          updateSchool(
            data:{
              ${config.hasOwnProperty('address') ? 'address: $address' : ''}
              ${config.hasOwnProperty('gps') ? 'gps: $gps' : ''}
              ${config.hasOwnProperty('email') ? 'email: $email' : ''}
              ${config.hasOwnProperty('phone') ? 'phone: $phone' : ''}
              ${config.hasOwnProperty('fax') ? 'fax: $fax' : ''}
              ${config.hasOwnProperty('district') ? 'district: $district' : ''}
              ${config.hasOwnProperty('studentsNum') ? 'studentsNum: $studentsNum' : ''}
              ${config.hasOwnProperty('classesNum') ? 'classesNum: $classesNum' : ''}
              ${config.hasOwnProperty('lowestStudyYear') ? 'lowestStudyYear: $lowestStudyYear' : ''}
              ${config.hasOwnProperty('highestStudyYear') ? 'highestStudyYear: $highestStudyYear' : ''}
              ${config.hasOwnProperty('name') ? 'name: $name' : ''}
              ${config.hasOwnProperty('motherComp') ? 'motherComp: $motherComp' : ''}
              
              
              ${config.hasOwnProperty('geoArea') ? (config.geoArea == false ? 'geoArea:   {disconnect:true}' : 'geoArea:{connect:{id:$geoArea}}') : ''}
              ${config.hasOwnProperty('city') ? (config.city == false ? 'city:   {disconnect:true}' : 'city:{connect:{id:$city}}') : ''}
              ${config.hasOwnProperty('levels') ? (config.levels == false ? 'levels:   {disconnect:true}' : 'levels:{connect:{id:$levels}}') : ''}
              ${config.hasOwnProperty('levelTwo') ? (config.levelTwo == false ? 'levelTwo:   {disconnect:true}' : 'levelTwo:{connect:{id:$levelTwo}}') : ''}
              ${config.hasOwnProperty('levelThree') ? (config.levelThree == false ? 'levelThree:   {disconnect:true}' : 'levelThree:{connect:{id:$levelThree}}') : ''}
              
              admin:{
                update:[${this.updateAdmin(config)}]
              }
              ${config.hasOwnProperty('licencedTermId') ? `
                licensedTerm:{
                  update:{
                    where:{ id:${config.licencedTermId} }
                    data:{
                      ${config.hasOwnProperty('ladminNum') ? 'adminNum: $ladminNum' : ''}
                      ${config.hasOwnProperty('lstudentsNum') ? 'studentsNum: $lstudentsNum' : ''}
                      ${config.hasOwnProperty('lteachersNum') ? 'teachersNum: $lteachersNum' : ''}
                      ${config.hasOwnProperty('lclassesNum') ? 'classesNum: $lclassesNum' : ''}
                      ${config.hasOwnProperty('lstudyYear') ? (config.lstudyYear == false ? 'studyYear:   {disconnect:true}' : 'studyYear:{connect:{id:$lstudyYear}}') : ''}
                      licensedContent:{
                        update:[
                          ${this.updatelicenceContent(config)}
                        ]
                      }
                    }
                  }
                }
              ` : ''}
              
            }
            where:{
              id:${config.id}
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
        console.log("config", config);
        console.log("config", config.geoArea);

        query = `mutation(
          ${config.hasOwnProperty('address') ? '$address: String' : ''}
          ${config.hasOwnProperty('gps') ? '$gps: String' : ''}
          ${config.hasOwnProperty('email') ? '$email: String' : ''}
          ${config.hasOwnProperty('phone') ? '$phone: String' : ''}
          ${config.hasOwnProperty('fax') ? '$fax: String' : ''}
          ${config.hasOwnProperty('district') ? '$district: String' : ''}
          ${config.hasOwnProperty('lowestStudyYear') ? '$lowestStudyYear: String' : ''}
          ${config.hasOwnProperty('highestStudyYear') ? '$highestStudyYear: String' : ''}
          ${config.hasOwnProperty('name') ? '$name: String' : ''}
          ${config.hasOwnProperty('motherComp') ? '$motherComp: String' : ''}
          
          ${config.hasOwnProperty('studentsNum') ? '$studentsNum: Int' : ''}
          ${config.hasOwnProperty('classesNum') ? '$classesNum: Int' : ''}
          ${config.hasOwnProperty('ladminNum') ? '$ladminNum: Int' : ''}
          ${config.hasOwnProperty('lstudentsNum') ? '$lstudentsNum: Int' : ''}
          ${config.hasOwnProperty('lclassesNum') ? '$lclassesNum: Int' : ''}
          ${config.hasOwnProperty('lteachersNum') ? '$lteachersNum: Int' : ''}
                              
         
          ${config.hasOwnProperty('city') ? '$city: ID' : ''}
          ${config.hasOwnProperty('levels') ? '$levels: ID' : ''}
          ${config.hasOwnProperty('levelTwo') ? '$levelTwo: ID' : ''}
          ${config.hasOwnProperty('levelThree') ? '$levelThree: ID' : ''}
          ${config.hasOwnProperty('geoArea') ? '$geoArea: ID' : ''}
          ${config.hasOwnProperty('lstudyYear') ? '$lstudyYear: ID' : ''}
        ) {
          createSchool(
            data: {
              ${config.hasOwnProperty('address') ? 'address: $address' : ''}
              ${config.hasOwnProperty('gps') ? 'gps: $gps' : ''}
              ${config.hasOwnProperty('email') ? 'email: $email' : ''}
              ${config.hasOwnProperty('phone') ? 'phone: $phone' : ''}
              ${config.hasOwnProperty('fax') ? 'fax: $fax' : ''}
              ${config.hasOwnProperty('district') ? 'district: $district' : ''}
              ${config.hasOwnProperty('studentsNum') ? 'studentsNum: $studentsNum' : ''}
              ${config.hasOwnProperty('classesNum') ? 'classesNum: $classesNum' : ''}
              ${config.hasOwnProperty('lowestStudyYear') ? 'lowestStudyYear: $lowestStudyYear' : ''}
              ${config.hasOwnProperty('highestStudyYear') ? 'highestStudyYear: $highestStudyYear' : ''}
              ${config.hasOwnProperty('name') ? 'name: $name' : ''}
              ${config.hasOwnProperty('motherComp') ? 'motherComp: $motherComp' : ''}
              
              ${config.hasOwnProperty('city') ? 'city: { connect: { id: $city } }' : ''}
              ${config.hasOwnProperty('geoArea') ? 'geoArea: { connect: { id: $geoArea } }' : ''}
              ${config.hasOwnProperty('levels') ? 'levels: { connect: { id: $levels } }' : ''}
              ${config.hasOwnProperty('levelTwo') ? 'levelTwo: { connect: { id: $levelTwo } }' : ''}
              ${config.hasOwnProperty('levelThree') ? 'levelThree: { connect: { id: $levelThree } }' : ''}
              
              admin: { create: [${this.CreateAdmin(config)}] }
              licensedTerm: {
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
          ) {
            id
          }
        }`
        variable = this.createVariable(config);
        break;
      case "DELETE": //delete
        query = `mutation{
          deleteSchool(where:{id:${config.id}}){id}
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

  CreateAdmin(config) {
    console.log("config.admin", config.admin)
    if (config.admin && config.admin.length > 0) {
      return config.admin.map((item) => {
        let a = {
          name: item.name || "",
          job: item.job || "",
          type: item.type || "",
          phone: item.phone || "",
          whatsApp: item.whatsApp || "",
          username: item.username || "",
          password: item.password || "",
          email: item.email || "",
        }
        console.log("a", a)
        return a
      })
    } else {
      return '';
    }
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

  updateAdmin(config) {
    if (config.admin && config.admin.length > 1)
      return config.admin.map(item => {
        return {
          where: {
            id: item.id
          },
          data: {
            name: item.name || "",
            job: item.job || "",
            type: item.type || "",
            phone: item.phone || "",
            whatsApp: item.whatsApp || "",
            username: item.username || "",
            password: item.password || "",
          }
        }
      })
    else{
      return ''
    }
  }

  updatelicenceContent(config) {
    return config.content.map((item) => {
    let a =  {
        where:{
          id:item.id
        },
        data:{
          
        }
      }
      if (item.hasOwnProperty('speciificContentLevelOne')) item.speciificContentLevelOne == false?  a.data['speciificContentLevelOne'] = { disconnect: true} :  a.data['speciificContentLevelOne'] = { connect: { id: item.speciificContentLevelOne } }
      if (item.hasOwnProperty('speciificContentLevelTwo')) item.speciificContentLevelTwo == false?  a.data['speciificContentLevelTwo'] = { disconnect: true} :  a.data['speciificContentLevelTwo'] = { connect: { id: item.speciificContentLevelTwo } }
      if (item.hasOwnProperty('speciificContentLevelThree')) item.speciificContentLevelThree == false?  a.data['speciificContentLevelThree'] = { disconnect: true} :  a.data['speciificContentLevelThree'] = { connect: { id: item.speciificContentLevelThree } }
      if (item.hasOwnProperty('speciificContentLevelFour')) item.speciificContentLevelFour == false?  a.data['speciificContentLevelFour'] = { disconnect: true} :  a.data['speciificContentLevelFour'] = { connect: { id: item.speciificContentLevelFour } }  

    return a;
    })
  }
}

`
config = {
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
[optional]  geoArea:     'ID' || false --> for disconnect ,
[optional]  city:        'ID' || false --> for disconnect ,
[optional]  levels:      'ID' || false --> for disconnect ,
[optional]  levelTwo:    'ID' || false --> for disconnect ,
[optional]  levelThree:  'ID' || false --> for disconnect ,
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
    [optional] id       'value' || ""
    [optional] speciificContentLevelOne:"ID"   || false --> for disconnect
    [optional] speciificContentLevelTwo:"ID"   || false --> for disconnect
    [optional] speciificContentLevelThree:"ID" || false --> for disconnect
    [optional] speciificContentLevelFour:"ID"  || false --> for disconnect
  }]
[optional] licencedTermId: 'ID' || ''
}
`