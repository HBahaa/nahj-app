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

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

	title:string = "فلتر تقسيمات المدارس";
	show: boolean = true;
	updateChildData = false;
	url: string;
	form: FormGroup;
	level1=[];
	level2=[];
	level3=[];
	content1=[];
	content2=[];
	content3=[];
	content4=[];
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

	constructor( 
		private fb: FormBuilder,
		private elevelsOne: ELevelsOneService,
		private schoolService: SchoolService,
		private geoService: GeoService,
		public dialog: MatDialog,
		private econtentOneService: EcontentOneService,
		private studyYearsService:StudyYearsService,
		private configService: ConfigService
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
			content1: ['', Validators.required],
			content2: ['', Validators.required],
			content3: ['', Validators.required],
			content4: ['', Validators.required],
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
	}

	// get functions
	getStudyYear(){
		this.studyYearsService.service({
			method: "GET",
			url: this.url
		}).subscribe(terms=>{
			this.terms = terms['data']['studyYears'];
		})
	}

	getAllLevels(id1, id2) {
		this.elevelsOne.service({
			method: 'GET',
			url: this.url
		}).subscribe(data => {
			this.level1 = data['data'].levelOnes.filter(n => n.name != "" ).map(object=> (({name, id, levelTwo})=>({id,name}))(object));
			data['data'].levelOnes.map((level1, index1)=>{
				if (id1 == level1.id) {
					this.level2 = level1['LevelTwo'].filter(n => n.name != "" ).map(object=> (({name, id, levelThree})=>({id,name}))(object)); 
					level1['LevelTwo'].filter(n => n.name != "" ).map((level2, index2)=> {
						if (id2 == level2.id) {
							// this.selectedLevel2 = level2['name'];
							if (level2['levelThree']) {
								this.level3 = level2['levelThree'].filter(n => n.name != "" ).map(object=> (({name, id})=>({id,name}))(object));
								// level2['levelThree'].filter(n => n.name != "" ).map((level3, index3)=> {
								// 	if(index3 == 0){
								// 		this.selectedLevel3 = level3['name']
								// 	}
								// });
							}
						}
					});
				}
			});
		});
	}
	getGeoCityData(id){//get geoDataCity
		this.geoService.service({
			method: "GET",
			url: this.url
		}).subscribe((data: any) => {
			this.geoArray = data.data.geoAreas.map((item, index) => {
				if(!id && index == 0){
					// this.citiesArray = item["cities"];
					this.citiesArray = [];
				}else if(item.id == id){
					this.citiesArray =  item["cities"]
				}
				return item;
			} );
		});
	}
	getCities($event){
		this.getGeoCityData($event.target.value || undefined);
		this.selectedGeo = $event.target.value
	}

	getLevelData($event){
		switch($event.level){
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
	getContent($event){
		switch($event.level){
			case "level1":
				this.selectedContent1 = $event.value;
				this.getContentData(this.selectedContent1, undefined, undefined, undefined);
			break;
			case "level2":
				this.selectedContent2 = $event.value;
				this.getContentData(this.selectedContent1, this.selectedContent2, undefined, undefined);
			break;
			case "level3":
				this.selectedContent3 = $event.value;
				this.getContentData(this.selectedContent3, this.selectedContent2,$event.value, undefined);
			break;
		}
	}

	getContentData(name1, name2, name3, name4){
		this.econtentOneService.service({
			method: 'GET',
			url: this.url
		}).subscribe(econtent1=>{
			this.content1 = econtent1['data'].contentLevelOnes.map((l1, index1)=> {
				if (name1 == l1.name) {
					this.content2 = l1.contentLevelTwo.map((l2, index2)=>{
						if (!name2 && index2 == 0) {
							if (l2.contentLevelThree.length > 0) {
								this.content3 = [];
								this.content4 = [];
							}
						}else if (name2 == l2.name) {
							if (l2.contentLevelThree.length > 0) {
								 this.content3 = l2.contentLevelThree.filter(n => n.name != "" ).map((l3, index3)=>{
									if (!name3 && index3 == 0) {
										this.content4 = [];
									}else if (name3 == l3.name) {
										if (l3.contentLevelFour.length > 0) {
											this.content4 = l3.contentLevelFour.filter(n => n.name != "" )
										}else{
											this.content4 = [];
										}
									}
									return l3
								})
							}else{
								this.content3 = [];
								this.content4 = [];
							}
						}
						return l2
					})
				}
				return (({id, name})=>({id, name}))(l1)
				// return l1.name
			});
		})
	}

	// term functions

	addTermClicked(){

	}
	addTerm(){

	}
	deleteTerm(){

	}

	/// 
	setContentFlag(e){
		this.show = e.show;
	}
	handleContentChange(level, e){
		this.getContent({'level': level, 'value': e.target.value })
	}

	openDialog($event) {
		const dialogRef = this.dialog.open(DialogComponent, {
		  width: '500px'
		});
		dialogRef.afterClosed().subscribe(result => {
			if(result){
				this.deleteSchool($event);
			}else{
				console.log("thanks")
			}
		});
	}

	///   get data functions
	saveLContent(){
		if (this.form.value.content1) {
			let obj  = {}
			if(this.form.value.content1){
				obj["speciificContentLevelOne"] = {
					connect:{
						id:this.form.value.content1
					}
				}
			}
			if(this.form.value.content2){
				obj["speciificContentLevelTwo"] = {
					connect:{
						id:this.form.value.content2
					}
				}
			}
			if(this.form.value.content3){
				obj["speciificContentLevelThree"] = {
					connect:{
						id:this.form.value.content3
					}
				}
			}
			if(this.form.value.content4){
				obj["speciificContentLevelFour"] = {
					connect:{
						id:this.form.value.content4
					}
				}
			}	
			this.speciificContent.push(obj)
			alert("added successfully")
		};
	} 



	//handle level function

	handleChange(level, e){
		this.getLevelData({'level': level, 'value': e.target.value })
	}

	getItemDetails($event){
		console.log("getItemDetails", $event)
		this.selectedSchool= $event;



		this.form = this.fb.group({
			schoolName: $event.name ? $event.name : undefined,
			motherComp: $event.motherComp ? $event.motherComp : undefined,
			email: $event.email ? $event.email : undefined,
			phone: $event.phone ? $event.phone : undefined,
			gps: $event.gps ? $event.gps : undefined,
			fax: $event.fax ? $event.fax : undefined,
			address: $event.address ? $event.address: undefined,
			geo: $event['geoArea'] ? $event['geoArea'].id : undefined,
			district: $event.district ? $event.district: undefined,
			city: $event['city'] ? $event['city'].id : undefined,
			studentsNum: $event.studentsNum ? $event.studentsNum: undefined,
			classesNum: $event.classesNum ? $event.classesNum: undefined,
			lstudentsNum: $event.licensedTerm.length > 0 ? $event.licensedTerm[0]: undefined,
			lclassesNum: $event.licensedTerm.length > 0 ? $event.licensedTerm[0]: undefined,
			lteachersNum: $event.licensedTerm.length > 0 ? $event.licensedTerm[0]: undefined,
			ladminsNum: $event.licensedTerm.length > 0 ? $event.licensedTerm[0]: undefined,
			lowestStudyYear: $event.lowestStudyYear ? $event.lowestStudyYear: undefined,
			highestStudyYear: $event.highestStudyYear ? $event.highestStudyYear: undefined,
			studyYears: $event.StudyYears ? $event.StudyYears: undefined,
			level1: $event.levels ? $event.levels.id: undefined,
			level2: $event['levelTwo'] ? $event['levelTwo'].id: undefined,
			level3: $event['levelThree'] ? $event['levelThree'].id: undefined,
			adminName: $event.admin && $event.admin.type == 'res' ? $event.admin.name: undefined,
			adminEmail: $event.admin && $event.admin.type == 'res' ? $event.admin.email: undefined,
			adminPhone: $event.admin && $event.admin.type == 'res' ? $event.admin.phone: undefined,
			adminJob: $event.admin && $event.admin.type == 'res' ? $event.admin.job: undefined,
			adminWhatsApp: $event.admin && $event.admin.type == 'res' ? $event.admin.whatsApp: undefined,
			adminUsername: $event.admin && $event.admin.type == 'res' ? $event.admin.username: undefined,
			adminPassword: $event.admin && $event.admin.type == 'res' ? $event.admin.password: undefined,

			nahjAdminName: $event.admin && $event.admin.type == 'admin' ? $event.admin.name: undefined,
			nahjAdminEmail: $event.admin && $event.admin.type == 'admin' ? $event.admin.email: undefined,
			nahjAdminPhone: $event.admin && $event.admin.type == 'admin' ? $event.admin.phone: undefined,
			nahjAdminJob: $event.admin && $event.admin.type == 'admin' ? $event.admin.job: undefined,
			nahjAdminWhatsApp: $event.admin && $event.admin.type == 'admin' ? $event.admin.whatsApp: undefined,
			nahjAdminUsername: $event.admin && $event.admin.type == 'admin' ? $event.admin.username: undefined,
			nahjAdminPassword: $event.admin && $event.admin.type == 'admin' ? $event.admin.password: undefined,
			// content1: '',
			// content2: '',
			// content3: '',
			// content4: ''
		});
	}

	handleStudyYearChange(){

	}

	clearFields(){
		this.form = this.fb.group({
			schoolName: [''],motherComp: [''],
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
			content1:[''],
			content2:[''],
			content3:[''],
			content4:['']
		});
	} 

	addSchool(conf,state = 0){
		let config = conf || this.form.value;
		this.schoolService.service({
			method: 'PUT',
			url: this.url,
			email:config.email,
			address:config.address,
			admin:
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
			// admin:
			// 	{
			// 		name: config.adminName,
			// 		phone: config.adminPhone,
			// 		email: config.adminEmail,
			// 		job: config.adminJob,
			// 		whatsApp: config.adminWhatsApp,
			// 		type: 'res',
			// 		password: config.adminPassword,
			// 		username: config.adminUsername
			// 	}
			// ,
			gps:config.gps,
			phone:config.phone,
			fax:config.fax,
			district:config.district,
			ladminNum:parseInt(config.ladminsNum),
			studentsNum:parseInt(config.studentsNum),
			classesNum:parseInt(config.classesNum),
			lstudentsNum:parseInt(config.lstudentsNum),
			lclassesNum:parseInt(config.lclassesNum),
			lteachersNum:parseInt(config.lteachersNum),
			lstudyYear:config.studyYears,
			lowestStudyYear:config.lowestStudyYear,
			highestStudyYear:config.highestStudyYear,
			name:config.schoolName,
			motherComp:config.motherComp,
			levels: config.level1,
			levelTwo: config.level2,
			levelThree: config.level3,
			geoArea: config.geo,
			city: config.city,
			arrayOfSpeciificContent: state ? conf.licensedContent  : (this.speciificContent.length > 0 ? this.speciificContent : "")
		}).subscribe(data => {
			console.log("add school", data)
			this.clearFields();
			this.updateChildData = true;
			this.speciificContent = [];
		})
		this.updateChildData = false;
	}
	editSchool($event){
		let config = this.form.value;
		let arr = [];
		if (config.licensedContent ) {
			for(let item of config.licensedContent){
				let obj = {}
				if(item.speciificContentLevelOne   )  
					obj['speciificContentLevelOne']={connect:{id:item.speciificContentLevelOne.id}}
				if(item.speciificContentLevelTwo   )  
					obj['speciificContentLevelTwo']={connect:{id:item.speciificContentLevelTwo.id}}
				if(item.speciificContentLevelThree )  
					obj['speciificContentLevelThree']={connect:{id:item.speciificContentLevelThree.id}}
				if(item.speciificContentLevelFour  )  
					obj['speciificContentLevelFour']={connect:{id:item.speciificContentLevelFour.id}}
				arr.push(obj);
			}
		}
		else{
			for(let item of $event.licensedContent){
				let obj = {}
				if(item.speciificContentLevelOne   )  
					obj['speciificContentLevelOne']= item.speciificContentLevelOne.connect? item.speciificContentLevelOne : {connect:{id:item.speciificContentLevelOne.id}}
				if(item.speciificContentLevelTwo   )  
					obj['speciificContentLevelTwo']=item.speciificContentLevelTwo.connect? item.speciificContentLevelTwo : {connect:{id:item.speciificContentLevelTwo.id}}
				if(item.speciificContentLevelThree )  
					obj['speciificContentLevelThree']=item.speciificContentLevelThree.connect? item.speciificContentLevelThree : {connect:{id:item.speciificContentLevelThree.id}}
				if(item.speciificContentLevelFour  )  
					obj['speciificContentLevelFour']=item.speciificContentLevelFour.connect? item.speciificContentLevelFour : {connect:{id:item.speciificContentLevelFour.id}}
				arr.push(obj);
			}
			
		}
		config.licensedContent = arr;

		this.schoolService.service({
			method: "GET",
			url: this.url
		}).subscribe(schools =>{
			schools["data"].schools.map(school=>{
				if (school.id == $event.id) {
					this.addSchool(config,1)
					this.schoolService.service({
						method: "DELETE",
						url: this.url,
						id: $event.id
					}) .subscribe(resp=>{
						console.log("deleted", resp);
					});
				}
			})
		});
		this.updateChildData = false;
	}
	deleteSchool($event){
		this.schoolService.service({
			method: "GET",
			url: this.url
		}).subscribe(schools =>{
			schools["data"].schools.map(school=>{
				if(school.id == $event.id){
					this.schoolService.service({
						method: "DELETE",
						url: this.url,
						id: $event.id
					}) .subscribe(resp=>{
						this.updateChildData = true;
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
							nahjAdminPassword: ['']
						});
					})
				}
			})
		})
		this.updateChildData = false;
	}

	deleteContent($event){
		var index = $event.target.id;
		const dialogRef = this.dialog.open(DialogComponent, {
			width: '500px'
		  });
		  dialogRef.afterClosed().subscribe(result => {
			  if(result){
				  this.speciificContent.splice(index, 1);
				  this.selectedSchool.licensedContent = this.speciificContent
				  this.editSchool(this.selectedSchool)
			  }else{
				  console.log("thanks")
			  }
		  });
	}

}
