import { ConfigService } from './../../../services/config';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../../components/dialog/dialog.component';
import { ELevelsOneService } from '../../../services/elevels/elevelsOne.service';
import { GeoService } from '../../../services/geo/geo.service';
import { SchoolService } from '../../../services/school/school.service';
import { EcontentOneService } from '../../../services/econtent/econtent-one.service';
import { StudyYearsService } from '../../../services/studyYears/study-years.service';
import { licencedTermService } from '../../../services/school/licencedTerm.service';

@Component({
	selector: 'app-data',
	templateUrl: './data.component.html',
	styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

	title: string = "فلتر تقسيمات المدارس";
	show: boolean = true;
	add: boolean = false;
	updateChildData = false;
	url: string;
	form: FormGroup;
	contentForm: FormGroup;
	level1 = [];
	level2 = [];
	level3 = [];
	content1 = [];
	content2 = [];
	content3 = [];
	content4 = [];
	selectedLevel1;
	selectedLevel2;
	selectedLevel3;
	selectedContent1;
	selectedContent2;
	selectedContent3;
	selectedContent4;
	selectedSchool;
	geoArray;
	citiesArray;
	selectedGeo;
	speciificContent = [];
	terms = [];
	licensedTerm = [];
	selectedStudyYear;

	constructor(
		private fb: FormBuilder,
		private elevelsOne: ELevelsOneService,
		private schoolService: SchoolService,
		private geoService: GeoService,
		public dialog: MatDialog,
		private econtentOneService: EcontentOneService,
		private studyYearsService: StudyYearsService,
		private configService: ConfigService,
		private licencedTermService: licencedTermService
	) {

		this.url = this.configService.url;
	}

	ngOnInit() {
		this.getAllLevels(undefined, undefined);
		this.getGeoCityData(undefined)
		this.getContentData(undefined, undefined, undefined, undefined);
		this.getStudyYear();
		this.form = this.fb.group({
			schoolName: ['', Validators.required],
			motherComp: ['', Validators.required],
			email: ['', Validators.required],
			phone: ['', Validators.required],
			gps: ['', Validators.required],
			fax: ['', Validators.required],
			address: ['', Validators.required],
			geo: ['', Validators.required],
			district: ['', Validators.required],
			city: ['', Validators.required],
			studentsNum: ['', Validators.required],
			classesNum: ['', Validators.required],
			lstudentsNum: ['', Validators.required],
			lclassesNum: ['', Validators.required],
			lteachersNum: ['', Validators.required],
			ladminsNum: ['', Validators.required],
			lowestStudyYear: ['', Validators.required],
			highestStudyYear: ['', Validators.required],
			studyYears: ['', Validators.required],
			level1: ['', Validators.required],
			level2: ['', Validators.required],
			level3: ['', Validators.required],
			adminName: ['', Validators.required],
			adminEmail: ['', Validators.required],
			adminPhone: ['', Validators.required],
			adminJob: ['', Validators.required],
			adminWhatsApp: ['', Validators.required],
			adminUsername: ['', Validators.required],
			adminPassword: ['', Validators.required],
			nahjAdminName: ['', Validators.required],
			nahjAdminEmail: ['', Validators.required],
			nahjAdminPhone: ['', Validators.required],
			nahjAdminJob: ['', Validators.required],
			nahjAdminWhatsApp: ['', Validators.required],
			nahjAdminUsername: ['', Validators.required],
			nahjAdminPassword: ['', Validators.required]
		});

		this.contentForm = this.fb.group({
			content1: ['', Validators.required],
			content2: ['', Validators.required],
			content3: ['', Validators.required],
			content4: ['', Validators.required]
		})
	}

	// get functions
	getStudyYear() {
		this.studyYearsService.service({
			method: "GET",
			url: this.url
		}).subscribe(terms => {
			this.terms = terms['data']['studyYears'];
		})
	}

	getAllLevels(id1, id2) {
		this.elevelsOne.service({
			method: 'GET',
			url: this.url
		}).subscribe(data => {
			this.level1 = data['data'].levelOnes.filter(n => n.name != "").map(object => (({ name, id, levelTwo }) => ({ id, name }))(object));
			data['data'].levelOnes.map((level1, index1) => {
				if (id1 == level1.id) {
					this.level2 = level1['LevelTwo'].filter(n => n.name != "").map(object => (({ name, id, levelThree }) => ({ id, name }))(object));
					level1['LevelTwo'].filter(n => n.name != "").map((level2, index2) => {
						if (id2 == level2.id) {
							if (level2['levelThree']) {
								this.level3 = level2['levelThree'].filter(n => n.name != "").map(object => (({ name, id }) => ({ id, name }))(object));
							}
						}
					});
				}
			});
		});
	}
	getGeoCityData(id) {//get geoDataCity
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
		this.getGeoCityData($event.target.value || undefined);
		this.selectedGeo = $event.target.value
	}

	getLevelData($event) {
		switch ($event.level) {
			case "level1":
				this.selectedLevel1 = $event.value;
				this.getAllLevels($event.value, undefined);
				break;
			case "level2":
				this.selectedLevel2 = $event.value;
				this.getAllLevels(this.selectedLevel1, this.selectedLevel2);
				break;
		}

	}
	getContent($event) {
		switch ($event.level) {
			case "content1":
				this.selectedContent1 = $event.value;
				this.getContentData(this.selectedContent1, undefined, undefined, undefined);
				break;
			case "content2":
				this.selectedContent2 = $event.value;
				this.getContentData(this.selectedContent1, this.selectedContent2, undefined, undefined);
				break;
			case "content3":
				this.selectedContent3 = $event.value;
				this.getContentData(this.selectedContent1, this.selectedContent2, $event.value, undefined);
				break;
			case "content4":
				this.selectedContent4 = $event.value;
				this.getContentData(this.selectedContent1, this.selectedContent2, this.selectedContent3, $event.value);
				break;

		}
	}

	getContentData(id1, id2, id3, id4) {
		this.econtentOneService.service({
			method: 'GET',
			url: this.url
		}).subscribe(econtent1 => {
			this.content1 = econtent1['data'].contentLevelOnes.map((l1, index1) => {
				if (id1 == l1.id) {
					this.content2 = l1.contentLevelTwo.map((l2, index2) => {
						if (!id2 && index2 == 0) {
							if (l2.contentLevelThree.length > 0) {
								this.content3 = [];
								this.content4 = [];
							}
						} else if (id2 == l2.id) {
							if (l2.contentLevelThree.length > 0) {
								this.content3 = l2.contentLevelThree.filter(n => n.name != "").map((l3, index3) => {
									if (!id3 && index3 == 0) {
										this.content4 = [];
									} else if (id3 == l3.id) {
										if (l3.contentLevelFour.length > 0) {
											this.content4 = l3.contentLevelFour.filter(n => n.name != "")
										} else {
											this.content4 = [];
										}
									}
									return l3
								})
							} else {
								this.content3 = [];
								this.content4 = [];
							}
						}
						return l2
					})
				}
				return l1
			});
		})
	}

	// term functions

	addTermClicked() {
		this.add = true
	}
	addTerm() {
		let config = this.form.value;
		console.log("addTerm", config)
		this.licencedTermService.service({
			method: 'PUT',
			url: this.url,
			id: this.selectedSchool.id,
			ladminNum: config.ladminsNum,
			lstudentsNum: config.lstudentsNum,
			lteachersNum: config.lteachersNum,
			lclassesNum: config.lclassesNum,
			lstudyYear: config.studyYears
		}).subscribe(data=>{
			console.log("data =-=-=-=", data)
		})
		this.add = false
	}
	deleteTerm() {

	}

	/// 
	setContentFlag(e) {
		this.show = e.show;
	}
	handleContentChange(level, e) {
		console.log("handleContentChange", level, e)
		this.getContent({ 'level': level, 'value': e.target.value })
	}

	openDialog($event) {
		const dialogRef = this.dialog.open(DialogComponent, {
			width: '500px'
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.deleteSchool($event);
			} else {
				console.log("thanks")
			}
		});
	}

	///   get data functions
	saveLContent() {
		console.log("saveLContent", this.contentForm.value.content1)
		console.log("this.speciificContent", this.speciificContent)
		if (this.contentForm.value.content1) {
			let obj = {}
			if (this.contentForm.value.content1) {
				obj["speciificContentLevelOne"] =this.contentForm.value.content1
			}
			this.contentForm.value.content2 ? obj["speciificContentLevelTwo"] = this.contentForm.value.content2 : 
			''

			this.contentForm.value.content3 ? obj["speciificContentLevelThree"] = this.contentForm.value.content3
			: ''
			this.contentForm.value.content4 ? obj["speciificContentLevelFour"] = this.contentForm.value.content4
			: ''
			
			console.log("obj save content", obj)
			this.speciificContent.push(obj)
			alert("added successfully")
		};
	}



	//handle level function

	handleChange(level, e) {
		this.getLevelData({ 'level': level, 'value': e.target.value })
	}

	getItemDetails($event) {
		this.selectedSchool = $event;
		// this condition to get cities of a selected geo and set selected city
		$event['geoArea'] ? this.getGeoCityData($event['geoArea'].id) : ''
		$event['levels'] ? $event['levelTwo'] ? this.getAllLevels($event['levels'].id, $event['levelTwo'].id) : this.getAllLevels($event['levels'].id, undefined) : undefined

		this.licensedTerm = $event.licensedTerm;

		this.terms = $event.licensedTerm.map(term => term.studyYear );

		this.handleStudyYearChange(undefined)
		console.log("term=====", this.terms)
		for(let item of $event.admin){
			console.log("item", item)
			this.form = this.fb.group({
				schoolName: $event.name ? $event.name : undefined,
				motherComp: $event.motherComp ? $event.motherComp : undefined,
				email: $event.email ? $event.email : undefined,
				phone: $event.phone ? $event.phone : undefined,
				gps: $event.gps ? $event.gps : undefined,
				fax: $event.fax ? $event.fax : undefined,
				address: $event.address ? $event.address : undefined,
				district: $event.district ? $event.district : undefined,
				geo: $event['geoArea'] ? $event['geoArea'].id : undefined,
				city: $event['city'] ? $event['city'].id : undefined,
				lowestStudyYear: $event.lowestStudyYear ? $event.lowestStudyYear : undefined,
				highestStudyYear: $event.highestStudyYear ? $event.highestStudyYear : undefined,
				studentsNum: $event.studentsNum ? $event.studentsNum : undefined,
				classesNum: $event.classesNum ? $event.classesNum : undefined,
	
				studyYears: $event.licensedTerm.length > 0 ? $event.licensedTerm[0].studyYear.id : undefined,
				lstudentsNum: $event.licensedTerm.length > 0 ? $event.licensedTerm[0].studentsNum : undefined,
				lclassesNum: $event.licensedTerm.length > 0 ? $event.licensedTerm[0].classesNum : undefined,
				lteachersNum: $event.licensedTerm.length > 0 ? $event.licensedTerm[0].teachersNum : undefined,
				ladminsNum: $event.licensedTerm.length > 0 ? $event.licensedTerm[0].adminNum : undefined,

				level1: $event.levels ? $event.levels.id : undefined,
				level2: $event['levelTwo'] ? $event['levelTwo'].id : undefined,
				level3: $event['levelThree'] ? $event['levelThree'].id : undefined,

				nahjAdminName : item.type == "admin" ? item.name : undefined,
				nahjAdminEmail : item.type == 'admin' ? item.email : undefined,
				nahjAdminPhone : item.type == 'admin' ? item.phone : undefined,
				nahjAdminJob : item.type == 'admin' ? item.job : undefined,
				nahjAdminWhatsApp : item.type == 'admin' ? item.whatsApp : undefined,
				nahjAdminUsername : item.type == 'admin' ? item.username : undefined,

				adminName : item.type == 'res' ? item.name : undefined,
				adminEmail : item.type == 'res' ? item.email : undefined,
				adminPhone : item.type == 'res' ? item.phone : undefined,
				adminJob : item.type == 'res' ? item.job : undefined,
				adminWhatsApp : item.type == 'res' ? item.whatsApp : undefined,
				adminUsername : item.type == 'res' ? item.username : undefined
				
			});	
		}

		

		
	}

	handleStudyYearChange(id) {
		this.licensedTerm.map((term, i)=>{
			console.log("term i", i ,term)
			if (id == term.id) {
				console.log("id == term.id", id == term.id)
				this.form = this.fb.group({
					studyYears: term.studyYear.id,
					lstudentsNum: term.studentsNum,
					lclassesNum: term.classesNum,
					lteachersNum: term.teachersNum,
					ladminsNum: term.adminNum
				})
				this.speciificContent = term.licensedContent
			}else if(i == 0 && !id ){
				// console.log("term.studyYear.id", term.studyYear.id )
				// this.form = this.fb.group({
				// 	studyYears: term.studyYear.id,
				// 	lstudentsNum: term.studentsNum,
				// 	lclassesNum: term.classesNum,
				// 	lteachersNum: term.teachersNum,
				// 	ladminsNum: term.adminNum
				// })
				this.speciificContent = term.licensedContent
			}
		console.log("speciificContent", this.speciificContent)

		})
	}

	clearFields() {
		this.form = this.fb.group({
			schoolName: [''], motherComp: [''],
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
			level1: [''],
			level2: [''],
			level3: [''],
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
			nahjAdminPassword: [''],
			content1: [''],
			content2: [''],
			content3: [''],
			content4: ['']
		});
		this.speciificContent = [];
	}

	addSchool(conf, state = 0) {
		let config = conf || this.form.value;
		var myObj = {
			method: 'PUT',
			url: this.url,
			email: config.email,
			address: config.address,
			admin:[
				{
					name: config.nahjAdminName,
					phone: config.nahjAdminPhone,
					email: config.nahjAdminEmail,
					job: config.nahjAdminJob,
					whatsApp: config.nahjAdminWhatsApp,
					type: 'admin',
					password: config.nahjAdminPassword,
					username: config.nahjAdminUsername
				},
				{
					name: config.adminName,
					phone: config.adminPhone,
					email: config.adminEmail,
					job: config.adminJob,
					whatsApp: config.adminWhatsApp,
					type: 'res',
					password: config.adminPassword,
					username: config.adminUsername
				}
			],
			gps: config.gps,
			phone: config.phone,
			fax: config.fax,
			district: config.district,
			ladminNum: parseInt(config.ladminsNum),
			studentsNum: parseInt(config.studentsNum),
			classesNum: parseInt(config.classesNum),
			lstudentsNum: parseInt(config.lstudentsNum),
			lclassesNum: parseInt(config.lclassesNum),
			lteachersNum: parseInt(config.lteachersNum),
			lstudyYear: config.studyYears,
			lowestStudyYear: config.lowestStudyYear,
			highestStudyYear: config.highestStudyYear,
			name: config.schoolName,
			motherComp: config.motherComp,
			levels: config.level1,
			levelTwo: config.level2,
			levelThree: config.level3,
			geoArea: config.geo,
			city: config.city,
			content:this.speciificContent
		}

		Object.keys(myObj).forEach((key) => (myObj[key] == "") && delete myObj[key]);

		this.schoolService.service(myObj).subscribe(data => {
			console.log("add school", data)
			this.clearFields();
			this.updateChildData = true;
			this.speciificContent = [];
		})
		this.updateChildData = false;
	}
	editSchool($event) {
		console.log("event", $event)
		console.log("this.form.value", this.form.value)
		console.log("this.contentForm.value", this.contentForm.value)
		let config = this.form.value;
		let arr = [];

		if (this.contentForm.value.content) {
			for (let item of this.contentForm.value.content) {
				let obj = {}
				if (item.speciificContentLevelOne)
					obj['speciificContentLevelOne'] = item.speciificContentLevelOne.id
				if (item.speciificContentLevelTwo)
					obj['speciificContentLevelTwo'] =  item.speciificContentLevelTwo.id
				if (item.speciificContentLevelThree)
					obj['speciificContentLevelThree'] = item.speciificContentLevelThree.id
				if (item.speciificContentLevelFour)
					obj['speciificContentLevelFour'] = item.speciificContentLevelFour.id
				
				arr.push(obj);
			}
		}
		else 
		if($event.content){
			for (let item of $event.content) {
				let obj = {}
				if (item.speciificContentLevelOne)
					obj['speciificContentLevelOne'] = item.speciificContentLevelOne ? item.speciificContentLevelOne : item.speciificContentLevelOne.id

				if (item.speciificContentLevelTwo)
					obj['speciificContentLevelTwo'] = item.speciificContentLevelTwo ? item.speciificContentLevelTwo : item.speciificContentLevelTwo.id

				if (item.speciificContentLevelThree)
					obj['speciificContentLevelThree'] = item.speciificContentLevelThree ? item.speciificContentLevelThree : item.speciificContentLevelThree.id

				if (item.speciificContentLevelFour)
					obj['speciificContentLevelFour'] = item.speciificContentLevelFour ? item.speciificContentLevelFour : item.speciificContentLevelFour.id

				arr.push(obj);
			}

		}

		console.log("arr ******** ", arr)
		config.content = arr;

		var myObj = {
			method: "POST",
			url: this.url,
			email: config.email,
			address: config.address,
			admin:[
				{
					name: config.nahjAdminName,
					phone: config.nahjAdminPhone,
					email: config.nahjAdminEmail,
					job: config.nahjAdminJob,
					whatsApp: config.nahjAdminWhatsApp,
					type: 'admin',
					password: config.nahjAdminPassword,
					username: config.nahjAdminUsername
				},
				{
					name: config.adminName,
					phone: config.adminPhone,
					email: config.adminEmail,
					job: config.adminJob,
					whatsApp: config.adminWhatsApp,
					type: 'res',
					password: config.adminPassword,
					username: config.adminUsername
				}
			],
			gps: config.gps,
			phone: config.phone,
			fax: config.fax,
			district: config.district,
			ladminNum: parseInt(config.ladminsNum),
			studentsNum: parseInt(config.studentsNum),
			classesNum: parseInt(config.classesNum),
			lstudentsNum: parseInt(config.lstudentsNum),
			lclassesNum: parseInt(config.lclassesNum),
			lteachersNum: parseInt(config.lteachersNum),
			lstudyYear: config.studyYears,
			lowestStudyYear: config.lowestStudyYear,
			highestStudyYear: config.highestStudyYear,
			name: config.schoolName,
			motherComp: config.motherComp,
			levels: config.level1,
			levelTwo: config.level2,
			levelThree: config.level3,
			geoArea: config.geo,
			city: config.city,
			content:this.speciificContent,
			id: this.selectedSchool.id
		};

		Object.keys(myObj).forEach((key) => (myObj[key] == "") && delete myObj[key]);

		this.schoolService.service(myObj).subscribe(data => {
			console.log("school edited", data)
			this.updateChildData = true;
			this.clearFields()
		});
		this.updateChildData = false;
	}

	deleteSchool($event) {
		this.schoolService.service({
			method: "DELETE",
			url: this.url,
			id: $event.id
		}).subscribe(resp => {
			this.updateChildData = true;
			this.clearFields();
			this.speciificContent = [];
		})
				
		this.updateChildData = false;
	}

	deleteContent($event) {
		var index = $event.target.id;
		const dialogRef = this.dialog.open(DialogComponent, {
			width: '500px'
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.speciificContent.splice(index, 1);
				console.log("sep----", this.speciificContent)
				this.selectedSchool.content = this.speciificContent
				this.editSchool(this.selectedSchool)
			} else {
				console.log("thanks")
			}
		});
	}

}
