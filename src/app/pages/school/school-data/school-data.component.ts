import { getMySchool } from './../../../services/schoolAdmin/getSchool';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GeoService } from '../../../services/geo/geo.service';
import { updateSchool } from '../../../services/schoolAdmin/updateSchool';
import { studyLevelsOne } from '../../../services/schoolAdmin/studyLevelsOne';
import { studyLevelsTwo } from '../../../services/schoolAdmin/studyLevelsTwo';
import { studyLevelsThree } from '../../../services/schoolAdmin/studyLevelsThree';

@Component({
	selector: 'app-school-data',
	templateUrl: './school-data.component.html',
	styleUrls: ['./school-data.component.scss']
})
export class SchoolDataComponent implements OnInit {

	form: FormGroup;
	level1 = ["المدارس اﻷهلية", "المدارس اﻷهلية", "المدارس اﻷهلية", "المدارس اﻷهلية", "المدارس اﻷهلية", "المدارس اﻷهلية", "المدارس اﻷهلية"];

	url = 'http://localhost:4466';
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

	studyLevel1 = [];
	studyLevel2 = [];
	studyLevel3 = [];

	constructor(private fb: FormBuilder, private geoService: GeoService,
		private getMySchool: getMySchool, private updateSchool: updateSchool,
		private studyLevelsOne: studyLevelsOne, private studyLevelsTwo: studyLevelsTwo,
		private studyLevelsThree: studyLevelsThree) { }

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
			teachersNum: [''],
			adminsNum: [''],
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

			this.getStudyLevelData(undefined);

			this.mySchool['admin'].filter(admin => admin.type == 'res').map(res => {
				let adminRes = res;
				this.adminResID = res.id
				this.mySchool['admin'].filter(admin => admin.type == 'admin').map(admin => {
					let nahjAdmin = admin;
					this.adminNahjID = admin.id
					this.form = this.fb.group({
						schoolName: this.mySchool['name'],
						motherComp: this.mySchool['motherComp'],
						email: this.mySchool['email'],
						phone: this.mySchool['phone'],
						gps: this.mySchool['gps'],
						fax: this.mySchool['fax'],
						address: this.mySchool['address'],
						geo: this.mySchool['speciificArea']['speciificGeaoArea'].id,
						district: this.mySchool['district'],
						city: this.mySchool['speciificArea']['speciificCity'],
						studentsNum: this.mySchool['studentsNum'],
						classesNum: this.mySchool['classesNum'],
						teachersNum: this.mySchool['teachersNum'],
						adminsNum: this.mySchool['adminNum'],
						lowestStudyYear: this.mySchool['lowestStudyYear'],
						highestStudyYear: this.mySchool['highestStudyYear'],
						studyYears: this.mySchool['studyYears'],
						term: this.mySchool['studyYears'],
						adminName: adminRes.name,
						adminEmail: adminRes.email,
						adminPhone: adminRes.phone,
						adminJob: adminRes.job,
						adminWhatsApp: adminRes.whatsApp,
						adminUsername: adminRes.username,
						adminPassword: adminRes.password,
						nahjAdminName: nahjAdmin.name,
						nahjAdminEmail: nahjAdmin.email,
						nahjAdminPhone: nahjAdmin.phone,
						nahjAdminJob: nahjAdmin.job,
						nahjAdminWhatsApp: nahjAdmin.whatsApp,
						nahjAdminUsername: nahjAdmin.username,
						nahjAdminPassword: nahjAdmin.password
					});
				})
			});
		})
	}
	getGeoData(id) {//get geoDataCity
		this.geoService.service({
			method: "GET",
			url: this.url
		}).subscribe((data: any) => {
			this.geoArray = data.data.geoAreas.map((item, index) => {
				if (!id && index == 0) {
					this.citiesArray = item["cities"];
				} else if (item.id == id) {
					this.citiesArray = item["cities"]
				}
				return item;
			});
		});
	}
	getCities($event) {
		this.getGeoData($event.target.value || undefined);
		this.selectedGeo = $event.target.value;
	}

	getStudyLevelData(name1) {
		this.studyLevelsOne.service({
			method: "GET",
			url: this.url,
			schoolId: this.schoolID
		}).subscribe(data => {
			this.studyLevel1 = data['data'].school.specificStudyLevels
				.filter(item1 => item1.studyLevelOne != null)
				.map((item1, index1) => {
					if (!name1 && index1 == 0) {
						return item1.studyLevelOne;
					} else if (name1 == item1.studyLevelOne.name) {
						this.selectedStudyLevel1 = item1;
						// console.log("------------> setting new level 1")
						this.listStudyLevelOne(this.selectedStudyLevel1);
						this.selectedStudyLevel2 = item1.studyLevelOne.studyLevelTwo;
						this.listStudyLevelTwo(this.selectedStudyLevel2);
						return item1.studyLevelOne;
					}
					return item1.studyLevelOne;
				});
				
		})
	}

	//edit function
	addStudyLevelOne($event) {
		switch ($event.eventType) {
			case "add":
				this.studyLevelsOne.service({
					method: "PUT",
					url: this.url,
					schoolId: this.schoolID,
					levelOneName: $event.newValue
				}).subscribe(data => {
					this.getStudyLevelData(undefined);
				})
				break;
			case 'update':
				this.studyLevelsOne.service({
					method: "POST",
					url: this.url,
					levelOneId: this.selectedStudyLevel1.id,
					levelOneName: $event.newValue
				}).subscribe(data => {
					this.getStudyLevelData(this.selectedStudyLevel1.name);
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
					this.getStudyLevelData(this.selectedStudyLevel1.name);
				})
				break;
			case 'update':
				this.studyLevelsTwo.service({
					method: "POST",
					url: this.url,
					levelTwoId: this.selectedStudyLevel2.id,
					levelTwoName: $event.newValue
				}).subscribe(data => {
					this.getStudyLevelData(this.selectedStudyLevel1.name);
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
					this.getStudyLevelData(this.selectedStudyLevel1.name);
				})
				break;
			case 'update':
				this.studyLevelsThree.service({
					method: "POST",
					url: this.url,
					levelThreeId: this.selectedStudyLevel3.id,
					levelThreeName: $event.newValue
				}).subscribe(data => {
					this.getStudyLevelData(this.selectedStudyLevel1.name);
				})
				break;
		}
	}

	updateSchoolData() {
		let adminNahj = {
			name: this.form.value.nahjAdminName,
			phone: this.form.value.nahjAdminPhone,
			email: this.form.value.nahjAdminEmail,
			job: this.form.value.nahjAdminJob,
			whatsApp: this.form.value.nahjAdminWhatsApp,
			type: 'admin',
			password: this.form.value.nahjAdminPassword,
			username: this.form.value.nahjAdminUsername
		};
		let admin2 = {
			name: this.form.value.adminName,
			phone: this.form.value.adminPhone,
			email: this.form.value.adminEmail,
			job: this.form.value.adminJob,
			whatsApp: this.form.value.adminWhatsApp,
			type: 'res',
			password: this.form.value.adminPassword,
			username: this.form.value.adminUsername
		}
		this.form.value.schoolId = this.schoolID;

		this.form.value.admin1 = adminNahj;
		this.form.value.admin1ID = this.adminNahjID;

		this.form.value.admin2 = admin2;
		this.form.value.admin2ID = this.adminResID;

		let config = this.form.value
		config['method'] = "POST"
		config['url'] = this.url
		this.updateSchool.service(config).subscribe((data: any) => {
			console.log("data", data)
		});
	}

	// delete functions
	deleteStudyLevelOne($event) {
		this.studyLevelsOne.service({
			method: "DELETE",
			url: this.url,
			levelOneId: $event.value.id
		}).subscribe(data => {
			this.selectedStudyLevel1 = undefined;
			this.getStudyLevelData(undefined);
		})
	}

	deleteStudyLevelTwo($event) {
		this.studyLevelsTwo.service({
			method: "DELETE",
			url: this.url,
			levelTwoId: $event.value.id
		}).subscribe(data => {
			this.selectedStudyLevel2 = undefined;
			this.getStudyLevelData(this.selectedStudyLevel1.name);
		})
	}

	deleteStudyLevelThree($event) {
		this.studyLevelsThree.service({
			method: "DELETE",
			url: this.url,
			levelThreeId: $event.value.id
		}).subscribe(data => {
			this.selectedStudyLevel3 = undefined;
			this.getStudyLevelData(this.selectedStudyLevel1.name);
		})
	}
}
