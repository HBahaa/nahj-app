import { ConfigService } from './../../../services/config';
import { getMySchool } from './../../../services/schoolAdmin/getSchool';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GeoService } from '../../../services/geo/geo.service';
import { updateSchool } from '../../../services/schoolAdmin/updateSchool';
import { studyLevelsOne } from '../../../services/schoolAdmin/studyLevelsOne';
import { studyLevelsTwo } from '../../../services/schoolAdmin/studyLevelsTwo';
import { studyLevelsThree } from '../../../services/schoolAdmin/studyLevelsThree';
import { classes } from '../../../services/schoolAdmin/class';

@Component({
	selector: 'app-school-data',
	templateUrl: './school-data.component.html',
	styleUrls: ['./school-data.component.scss']
})
export class SchoolDataComponent implements OnInit {

	form: FormGroup;
	url :string;
	geoArray = [];
	citiesArray = [];
	selectedGeo = "";
	mySchool = {};
	adminResID;
	adminNahjID;
	schoolID;
	selectedStudyLevel1;
	selectedStudyLevel2;
	selectedStudyLevel3;
	terms = [];
	licensedTerm = [];
	selectedStudyYear;
	admin;
	res;

	studyLevel1 = [];
	studyLevel2 = [];
	studyLevel3 = [];

	constructor(private fb: FormBuilder, private geoService: GeoService,
		private getMySchool: getMySchool, private updateSchool: updateSchool,
		private studyLevelsOne: studyLevelsOne, private studyLevelsTwo: studyLevelsTwo,
		private studyLevelsThree: studyLevelsThree, private classes: classes,
		private configService: ConfigService) 
		{ 
			this.url = this.configService.url;
		}

	ngOnInit() {
		this.getMySchoolData();
		this.getGeoData(undefined);

		this.form = this.fb.group({
			schoolName: [''],
			motherComp: [''],
			email: [''],
			phone: [''],
			gps: [''],
			fax: [''],
			address: [''],
			geo: [''],
			district: [''],
			city: [''],
			studentsNum: [''],
			classesNum: [''],
			lstudentsNum: [''],
			lclassesNum: [''],
			lteachersNum: [''],
			ladminsNum: [''],
			lowestStudyYear: [''],
			highestStudyYear: [''],
			studyYears: [''],
			term: [''],
			adminName: [''],
			adminEmail: [''],
			adminPhone: [''],
			adminJob: [''],
			adminWhatsApp: [''],
			adminUsername: [''],
			adminPassword: [''],
			nahjAdminName: [''],
			nahjAdminEmail: [''],
			nahjAdminPhone: [''],
			nahjAdminJob: [''],
			nahjAdminWhatsApp: [''],
			nahjAdminUsername: [''],
			nahjAdminPassword: ['']
		});
	}


	//list functions

	listStudyLevelOne(value) {
		this.selectedStudyLevel1 = value;
		this.studyLevel2 = value.studyLevelTwo ? value.studyLevelTwo: value.studyLevelOne.studyLevelTwo;
		this.studyLevel3 = [];
	}

	listStudyLevelTwo(value) {
		console.log("value 2 --------", value)
		this.selectedStudyLevel2 = value;
		this.studyLevel3 =  value.studylevelThree ?  value.studylevelThree : value[0].studylevelThree;
		console.log("studyLevel3", this.studyLevel3)
	}

	listStudyLevelThree(value) {
		this.selectedStudyLevel3 = value;
	}

	// get functions

	getMySchoolData() {
		this.getMySchool.service({
			url: this.url
		}).subscribe((data: any) => {
			this.mySchool = data['data'].schools[0]
			this.schoolID = data['data'].schools[0].id;

			localStorage.setItem("schoolID", this.schoolID);
			this.getStudyLevelData(undefined, undefined);

			this.mySchool['geoArea'] ? this.getGeoData(this.mySchool['geoArea'].id) : '';

			this.licensedTerm = this.mySchool['licensedTerm'];
			this.terms = this.mySchool['licensedTerm'].map(term => term.studyYear );

			this.admin  = this.mySchool['admin'].filter(item=> item.type == 'admin')[0];
			this.res  = this.mySchool['admin'].filter(item=> item.type == 'res')[0];

			this.selectedStudyYear = this.mySchool['licensedTerm'].length > 0 && this.mySchool['licensedTerm'][0].studyYear ? this.mySchool['licensedTerm'][0].studyYear.id : undefined
			this.handleStudyYearChange(this.selectedStudyYear);

			this.form = this.fb.group({
				schoolName: this.mySchool['name'],
				motherComp: this.mySchool['motherComp'],
				email: this.mySchool['email'],
				phone: this.mySchool['phone'],
				gps: this.mySchool['gps'],
				fax: this.mySchool['fax'],
				address: this.mySchool['address'],
				geo: this.mySchool['geoArea'] ? this.mySchool['geoArea'].id : undefined,
				district: this.mySchool['district'],
				city: this.mySchool['city'] ? this.mySchool['city'].id : undefined ,
				studentsNum: this.mySchool['studentsNum'],
				classesNum: this.mySchool['classesNum'],
				lowestStudyYear: this.mySchool['lowestStudyYear'],
				highestStudyYear: this.mySchool['highestStudyYear'],
				teachersNum: this.mySchool['teachersNum'],
				studyYears: this.licensedTerm.length > 0 && this.licensedTerm[0].studyYear ? this.licensedTerm[0].studyYear.id : undefined,

				lteachersNum: this.licensedTerm.length > 0 && this.licensedTerm[0].teachersNum ? this.licensedTerm[0].teachersNum : undefined,

				ladminsNum: this.licensedTerm.length > 0 && this.licensedTerm[0].adminNum ? this.licensedTerm[0].adminNum : undefined,
				
				lstudentsNum: this.licensedTerm.length > 0 && this.licensedTerm[0].studentsNum ? this.licensedTerm[0].studentsNum : undefined,

				lclassesNum: this.licensedTerm.length > 0 && this.licensedTerm[0].classesNum ? this.licensedTerm[0].classesNum : undefined,

				nahjAdminName : this.admin ? this.admin.name : undefined,
				nahjAdminEmail : this.admin ? this.admin.email : undefined,
				nahjAdminPhone : this.admin ? this.admin.phone : undefined,
				nahjAdminPassword : this.admin ? this.admin.password : undefined,
				nahjAdminJob : this.admin ? this.admin.job : undefined,
				nahjAdminWhatsApp : this.admin ? this.admin.whatsApp : undefined,
				nahjAdminUsername : this.admin ? this.admin.username : undefined,

				adminName : this.res ? this.res.name : undefined,
				adminEmail : this.res ? this.res.email : undefined,
				adminPhone : this.res ? this.res.phone : undefined,
				adminPassword : this.res ? this.res.password : undefined,
				adminJob : this.res ? this.res.job : undefined,
				adminWhatsApp : this.res ? this.res.whatsApp : undefined,
				adminUsername : this.res ? this.res.username : undefined
			});
		})
	}
	handleStudyYearChange(id) {
		this.selectedStudyYear = id;
		this.licensedTerm.map((term, i)=>{
			if (id == term.studyYear.id) {
				console.log("term", term)
				this.form = this.fb.group({
					studyYears: term.studyYear.id,
					lstudentsNum: term.studentsNum,
					lclassesNum: term.classesNum,
					lteachersNum: term.teachersNum,
					ladminsNum: term.adminNum
				})
				// this.speciificContent = term.licensedContent
			}else if(i == 0 && !id ){
				// this.speciificContent = term.licensedContent
			}
		})
	}
	getGeoData(id) {//get geoDataCity
		this.geoService.service({
			method: "GET",
			url: this.url
		}).subscribe((data: any) => {
			this.geoArray = data.data.geoAreas.map((item, index) => {
				if (item.id == id) {
					this.citiesArray = item["cities"]
				}
				return item;
			});
		});
	}

	getCities($event) {
		this.getGeoData($event.target.value || undefined);
		this.selectedGeo = $event.target.value
	}

	updateSchoolData() {
		let admin = {
			name: this.form.value.nahjAdminName,
			phone: this.form.value.nahjAdminPhone,
			email: this.form.value.nahjAdminEmail,
			job: this.form.value.nahjAdminJob,
			whatsApp: this.form.value.nahjAdminWhatsApp,
			type: 'admin',
			password: this.form.value.nahjAdminPassword,
			username: this.form.value.nahjAdminUsername,
			id: this.admin.id
		};
		let res = {
			name: this.form.value.adminName,
			phone: this.form.value.adminPhone,
			email: this.form.value.adminEmail,
			job: this.form.value.adminJob,
			whatsApp: this.form.value.adminWhatsApp,
			type: 'res',
			password: this.form.value.adminPassword,
			username: this.form.value.adminUsername,
			id: this.res.id
		}
		let config = {
			id			: this.schoolID,
			admin 		: [admin, res],
			name    	: this.form.value.schoolName ,
			motherComp 	: this.form.value.motherComp ,
			email 		: this.form.value.email ,
			address 	: this.form.value.address , 
			gps     	: this.form.value.gps ,
			phone   	: this.form.value.phone ,
			fax     	: this.form.value.fax ,
			district	: this.form.value.district
		}
		config['method'] = "POST"
		config['url'] = this.url
		console.log("updateSchool", config)
		this.updateSchool.service(config).subscribe((data: any) => {
			console.log("data", data)
		});
	}


	// tab2 

	getStudyLevelData(name1, addClass) {
		console.log("this.schoolID", this.schoolID)
		this.studyLevelsOne.service({
			method: "GET",
			url: this.url,
			id: this.schoolID
		}).subscribe(data => {
			console.log("data", data)
			// this.studyLevel1 = data['data'].school.specificStudyLevels
			// 	.filter(item1 => item1.studyLevelOne != null)
			// 	.map((item1, index1) => {
			// 		if (!name1 && index1 == 0) {
			// 			return item1.studyLevelOne;
			// 		} else if (name1 == item1.studyLevelOne.name) {
			// 			this.selectedStudyLevel1 = item1;
			// 			// console.log("------------> setting new level 1")
			// 			this.listStudyLevelOne(this.selectedStudyLevel1);
			// 			this.selectedStudyLevel2 = item1.studyLevelOne.studyLevelTwo;
			// 			this.listStudyLevelTwo(this.selectedStudyLevel2);

			// 			if(addClass){
			// 				let l3 = this.selectedStudyLevel2[0].studylevelThree.filter(item => item.name == addClass);
							
			// 				this.addClass(
			// 					this.selectedStudyLevel1.studyLevelOne.id,
			// 					this.selectedStudyLevel2[0].id,
			// 					l3[0].id,
			// 					this.schoolID
			// 				)
			// 			}
			// 			return item1.studyLevelOne;
			// 		}
			// 		return item1.studyLevelOne;
			// 	});
				
		})
	}

	//edit function
	addStudyLevelOne($event) {
		switch ($event.eventType) {
			case "add":
				this.studyLevelsOne.service({
					method: "PUT",
					url: this.url,
					id: this.schoolID,
					levelOneName: $event.newValue
				}).subscribe(data => {
					console.log("addStudyLevelOne", data)
					this.getStudyLevelData(undefined, undefined);
				})
				break;
			case 'update':
				this.studyLevelsOne.service({
					method: "POST",
					url: this.url,
					levelOneId: this.selectedStudyLevel1.id,
					levelOneName: $event.newValue
				}).subscribe(data => {
					this.getStudyLevelData(this.selectedStudyLevel1.name, undefined);
				})
				break;

		}
	}

	addStudyLevelTwo($event) {
		switch ($event.eventType) {
			case "add":
				this.studyLevelsTwo.service({
					method: "PUT",
					url: this.url,
					levelOneId: this.selectedStudyLevel1.id,
					levelTwoName: $event.newValue
				}).subscribe(data => {
					this.getStudyLevelData(this.selectedStudyLevel1.name, undefined);
				})
				break;
			case 'update':
				this.studyLevelsTwo.service({
					method: "POST",
					url: this.url,
					levelTwoId: this.selectedStudyLevel2.id,
					levelTwoName: $event.newValue
				}).subscribe(data => {
					this.getStudyLevelData(this.selectedStudyLevel1.name, undefined);
				})
				break;

		}
	}

	addStudyLevelThree($event) {
		switch ($event.eventType) {
			case "add":
				this.studyLevelsThree.service({
					method: "PUT",
					url: this.url,
					levelTwoId: this.selectedStudyLevel2.id,
					levelThreeName: $event.newValue
				}).subscribe(data => {
					this.getStudyLevelData(this.selectedStudyLevel1.name, $event.newValue);
				})
				break;
			case 'update':
				this.studyLevelsThree.service({
					method: "POST",
					url: this.url,
					levelThreeId: this.selectedStudyLevel3.id,
					levelThreeName: $event.newValue
				}).subscribe(data => {
					this.getStudyLevelData(this.selectedStudyLevel1.name, undefined);
				})
				break;
		}
	}

	addClass(id1, id2, id3, schoolId){
		this.classes.service({
			method: "PUT",
			url: this.url,
			studyLevelOne: id1,
			studyLevelTwo: id2,
			studyLevelThree: id3,
		 	schoolId: schoolId
		}).subscribe(data=>{
			console.log("data", data)
		})
	}

	// delete functions
	deleteStudyLevelOne($event) {
		this.studyLevelsOne.service({
			method: "DELETE",
			url: this.url,
			levelOneId: $event.value.id
		}).subscribe(data => {
			this.selectedStudyLevel1 = undefined;
			this.getStudyLevelData(undefined, undefined);
		})
	}

	deleteStudyLevelTwo($event) {
		this.studyLevelsTwo.service({
			method: "DELETE",
			url: this.url,
			levelTwoId: $event.value.id
		}).subscribe(data => {
			this.selectedStudyLevel2 = undefined;
			this.getStudyLevelData(this.selectedStudyLevel1.name, undefined);
		})
	}

	deleteStudyLevelThree($event) {
		this.studyLevelsThree.service({
			method: "DELETE",
			url: this.url,
			levelThreeId: $event.value.id
		}).subscribe(data => {
			this.selectedStudyLevel3 = undefined;
			this.getStudyLevelData(this.selectedStudyLevel1.name, undefined);
		})
	}
}
