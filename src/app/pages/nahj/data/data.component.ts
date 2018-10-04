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
	admin;
	res;

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
		console.log("url", this.url)
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
	// get functions
	getStudyYear() {
		this.studyYearsService.service({
			method: "GET",
			url: this.url
		}).subscribe(terms => {
			this.terms = terms['data']['studyYears'];
		})
	}
	//handle level function
	handleChange(level, e) {
		this.getLevelData({ 'level': level, 'value': e.target.value })
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

	handleContentChange(level, e) {
		this.getContent({ 'level': level, 'value': e.target.value })
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
			console.log("econtent1", econtent1)
			this.content1 = econtent1['data'].contentLevelOnes ? econtent1['data'].contentLevelOnes.map((l1, index1) => {
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
			}) : [];
		})
	}

	// term functions

	addTermClicked() {
		this.add = true;
		// this.show = true;
		this.form = this.fb.group({
			studyYears:'',
			lstudentsNum: '',
			lclassesNum: '',
			lteachersNum: '',
			ladminsNum: '',
		})
		this.speciificContent = []
		this.getStudyYear()
	}
	addTerm() {
		let config = this.form.value;
		
		this.licencedTermService.service({
			method: 'PUT',
			url: this.url,
			id: this.selectedSchool.id,
			ladminNum: config.ladminsNum,
			lstudentsNum: config.lstudentsNum,
			lteachersNum: config.lteachersNum,
			lclassesNum: config.lclassesNum,
			lstudyYear: config.studyYears,
			content: this.speciificContent
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

	///   get data functions
	saveLContent() {
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
			
			this.speciificContent.push(obj)
			alert("added successfully")
		};
	}

	getItemDetails($event) {
		console.log("getItemDetails", $event);
		this.selectedSchool = $event;

		// this condition to get cities of a selected geo and set selected city
		$event['geoArea'] ? this.getGeoCityData($event['geoArea'].id) : ''
		$event['levels'] ? $event['levelTwo'] ? this.getAllLevels($event['levels'].id, $event['levelTwo'].id) : this.getAllLevels($event['levels'].id, undefined) : undefined

		this.licensedTerm = $event.licensedTerm;
		this.terms = $event.licensedTerm.map(term => term.studyYear );

		this.admin  = $event.admin.filter(item=> item.type == 'admin')[0];
		this.res  = $event.admin.filter(item=> item.type == 'res')[0];

		this.selectedStudyYear = $event.licensedTerm.length > 0 && $event.licensedTerm[0].studyYear ? $event.licensedTerm[0].studyYear.id : undefined
		this.handleStudyYearChange(this.selectedStudyYear);

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

			studyYears: $event.licensedTerm.length > 0 && $event.licensedTerm[0].studyYear ? $event.licensedTerm[0].studyYear.id : undefined,
			lstudentsNum: $event.licensedTerm.length > 0 && $event.licensedTerm[0].studentsNum ? $event.licensedTerm[0].studentsNum : undefined,
			lclassesNum: $event.licensedTerm.length > 0 && $event.licensedTerm[0].classesNum ? $event.licensedTerm[0].classesNum : undefined,
			lteachersNum: $event.licensedTerm.length > 0 && $event.licensedTerm[0].teachersNum ? $event.licensedTerm[0].teachersNum : undefined,
			ladminsNum: $event.licensedTerm.length > 0 && $event.licensedTerm[0].adminNum ? $event.licensedTerm[0].adminNum : undefined,

			level1: $event.levels ? $event.levels.id : undefined,
			level2: $event['levelTwo'] ? $event['levelTwo'].id : undefined,
			level3: $event['levelThree'] ? $event['levelThree'].id : undefined,

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
	}

	handleStudyYearChange(id) {
		this.selectedStudyYear = id;
		this.licensedTerm.map((term, i)=>{
			if (id == term.studyYear.id) {
				this.form = this.fb.group({
					studyYears: term.studyYear.id,
					lstudentsNum: term.studentsNum,
					lclassesNum: term.classesNum,
					lteachersNum: term.teachersNum,
					ladminsNum: term.adminNum
				})
				this.speciificContent = term.licensedContent
			}else if(i == 0 && !id ){
				this.speciificContent = term.licensedContent
			}
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

	addSchool(conf) {
		let config = conf || this.form.value;
		var myObj = {
			method: 'PUT',
			url: this.url,
			admin:[
				{
					name:config.adminName,
					email:config.adminEmail,
					password:config.adminPassword,
					job:config.adminJob,
					whatsApp:config.adminWhatsApp,
					phone:config.adminPhone,
					username:config.adminUsername,
					type:"res"
				},
				{
					name:config.nahjAdminName,
					email:config.nahjAdminEmail,
					password:config.nahjAdminPassword,
					job:config.nahjAdminJob,
					whatsApp:config.nahjAdminWhatsApp,
					phone:config.nahjAdminPhone,
					username:config.nahjAdminUsername,
					type:"admin"
				}
			]
		}

		this.speciificContent != [] ? myObj['content']=this.speciificContent: ''

		config.schoolName ? myObj['name'] = config.schoolName: '';
		config.district ? myObj['district'] = config.district: '';
		config.motherComp ? myObj['motherComp'] = config.motherComp: '';
		config.fax ? myObj['fax'] = config.fax: '';
		config.email ? myObj['email'] = config.email: '';
		config.address ? myObj['address'] = config.address: '';
		config.phone ? myObj['phone'] = config.phone: '';
		config.gps ? myObj['gps'] = config.gps: '';
		config.studentsNum ? myObj['studentsNum'] = parseInt(config.studentsNum): '';
		config.classesNum ? myObj['classesNum'] = parseInt(config.classesNum): '';
		config.lowestStudyYear ? myObj['lowestStudyYear'] = config.lowestStudyYear: '';
		config.highestStudyYear ? myObj['highestStudyYear'] = config.highestStudyYear: '';
		
		config.geo ? myObj['geoArea'] = config.geo: '';
		config.city ? myObj['city'] = config.city: '';

		config.level1 != "" ? myObj['levels'] = config.level1 : ''
		config.level2 !="" ? myObj['levelTwo'] = config.level2 : ''
		config.level3 !="" ? myObj['levelThree'] = config.level3 : ''	

		config.lstudentsNum ? myObj['lstudentsNum'] = parseInt(config.lstudentsNum) : '';
		config.lclassesNum ? myObj['lclassesNum'] = parseInt(config.lclassesNum) : '';
		config.lteachersNum ? myObj['lteachersNum'] = parseInt(config.lteachersNum) : '';
		config.ladminsNum ? myObj['ladminNum'] = parseInt(config.ladminsNum) : '';
		config.studyYears ? myObj['lstudyYear'] = config.studyYears : '';

		Object.keys(myObj).forEach((key) => (myObj[key] == "" || myObj[key] == null ) && delete myObj[key]);

		this.schoolService.service(myObj).subscribe(data => {
			this.clearFields();
			this.updateChildData = true;
			this.speciificContent = [];
		})
		this.updateChildData = false;
	}

	editSchool($event) {
		let config = this.form.value;
		var myObj = {
			method: "POST",
			url: this.url,
			id: this.selectedSchool.id,

		};
		
		config.district != $event.district ? myObj['district'] = config.district : ''
		config.phone != $event.phone ? myObj['phone'] = config.phone : ''
		config.gps != $event.gps ? myObj['gps'] = config.gps : ''
		config.fax != $event.fax ? myObj['fax'] = config.fax : ''
		config.address != $event.address ? myObj['address'] = config.address : ''
		config.schoolName != $event.name ? myObj['name'] = config.schoolName : ''

		config.motherComp != $event.motherComp ? myObj['motherComp'] = config.motherComp : ''
		config.classesNum != $event.classesNum ? myObj['classesNum'] = config.classesNum: ''
		config.classesNum != $event.classesNum ? myObj['classesNum'] = config.classesNum: ''
		config.studentsNum != $event.studentsNum ? myObj['studentsNum'] = config.studentsNum: ''
		config.highestStudyYear != $event.highestStudyYear ? myObj['highestStudyYear'] = config.highestStudyYear: ''
		config.lowestStudyYear != $event.lowestStudyYear ? myObj['lowestStudyYear'] = config.lowestStudyYear: ''

		$event.levels != null ? config.level1 != $event.levels.id ? myObj["levels"]=config.level1 :'' : myObj["levels"]=config.level1
		$event.levelTwo != null ? config.level2 != $event.levelTwo.id ? myObj["levelTwo"]=config.level2 :'': myObj["levelTwo"]=config.level2
		$event.levelThree != null ? config.level3 != $event.levelThree.id ? myObj["levelThree"]=config.level3 :'' : myObj["levelThree"]=config.level3

		$event.geoArea ? config.geo != $event.geoArea.id ? myObj["geoArea"]=config.geo :'' : undefined
		$event.city ? config.city != $event.city.id ? myObj["city"]=config.city :'' : undefined

		if(this.res){
			this.res['name'] = config.adminName != this.res.name ?  config.adminName : this.res.name
			this.res['email'] = config.adminEmail != this.res.email ?  config.adminEmail : this.res.email
			this.res['phone'] = config.adminPhone != this.res.phone ?  config.adminPhone : this.res.phone
			this.res['job'] = config.adminJob != this.res.job ?  config.adminJob : this.res.job
			this.res['username'] = config.adminUsername != this.res.username ?  config.adminUsername : this.res.username
			this.res['password'] = config.adminPassword != this.res.password ?  config.adminPassword : this.res.password
			this.res['whatsApp'] = config.adminWhatsApp != this.res.whatsApp ?  config.adminWhatsApp : this.res.whatsApp
		}
		
		if (this.admin) {
			this.admin['name'] = config.nahjAdminName != this.admin.name ?  config.nahjAdminName : this.admin.name
			this.admin['email'] = config.nahjAdminEmail != this.admin.email ?  config.nahjAdminEmail : this.admin.email
			this.admin['phone'] = config.nahjAdminPhone != this.admin.phone ?  config.nahjAdminPhone : this.admin.phone
			this.admin['job'] = config.nahjAdminJob != this.admin.job ?  config.nahjAdminJob : this.admin.job
			this.admin['username'] = config.nahjAdminUsername != this.admin.username ?  config.nahjAdminUsername : this.admin.username
			this.admin['password'] = config.nahjAdminPassword != this.admin.password ?  config.nahjAdminPassword : this.admin.password
			this.admin['whatsApp'] = config.nahjAdminWhatsApp != this.admin.whatsApp ?  config.nahjAdminWhatsApp : this.admin.whatsApp
		}

		myObj['admin'] = [this.admin, this.res]
		
		myObj['licensedTerm'] = {}

		config.ladminsNum != $event.licensedTerm.adminNum ? myObj['licensedTerm']['ladminNum'] = config.ladminsNum : $event.licensedTerm.adminNum
		config.lstudentsNum != $event.licensedTerm.studentsNum ? myObj['licensedTerm']['lstudentsNum'] = config.lstudentsNum : $event.licensedTerm.studentsNum
		config.lteachersNum != $event.licensedTerm.teachersNum ? myObj['licensedTerm']['lteachersNum'] = config.lteachersNum : $event.licensedTerm.teachersNum
		config.lclassesNum != $event.licensedTerm.classesNum ? myObj['licensedTerm']['lclassesNum'] = config.lclassesNum : $event.licensedTerm.classesNum

		myObj['licensedTerm']['licensedContent'] =  this.speciificContent	

		Object.keys(myObj).forEach((key) => (myObj[key] == "" || myObj[key] == null ) && delete myObj[key]);

		console.log("myObj ===== ", myObj)

		this.schoolService.service(myObj)
		.subscribe(data => {
			this.updateChildData = true;
			this.clearFields()
		});
		this.updateChildData = false;
		this.show = true;
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
				console.log("this.selectedSchool", this.selectedSchool)
				this.selectedSchool.licensedTerm.map(term=>{
					console.log("term", term)
					if(term.studyYear.id == this.selectedStudyYear){
						term.licensedContent = this.speciificContent
					}
				})
				console.log("this.selectedSchool ==== ", this.selectedSchool)
				// this.editSchool(this.selectedSchool)
			} else {
				console.log("thanks")
			}
		});
	}

}
