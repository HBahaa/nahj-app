import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../../components/dialog/dialog.component';
import { ELevelsOneService } from '../../../services/elevels/elevelsOne.service';
import { GeoService } from '../../../services/geo/geo.service';
import { SchoolService } from '../../../services/school/school.service';
import { EcontentOneService } from '../../../services/econtent/econtent-one.service';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

	title:string = "فلتر تقسيمات المدارس";
	show: boolean = true;
	updateChildData = false
	url = 'http://localhost:4466';
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

	constructor( 
		private fb: FormBuilder,
		private elevelsOne: ELevelsOneService,
		private schoolService: SchoolService,
		private geoService: GeoService,
		public dialog: MatDialog,
		private econtentOneService: EcontentOneService
	 ) { }

	ngOnInit() {	
		this.getAllLevels(undefined, undefined);
		this.getGeoCityData(undefined)
		this.getContentData(undefined, undefined, undefined, undefined);
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
			teachersNum: ['', Validators.required],
			adminsNum: ['', Validators.required],
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
	getAllLevels(name1, name2) {
		this.elevelsOne.service({
			method: 'GET',
			url: this.url
		}).subscribe(data => {
			this.level1 = data['data'].levelOnes.filter(n => n.name != "" ).map(object=> (({name, id, levelTwo})=>({id,name}))(object));
			data['data'].levelOnes.map((level1, index1)=>{
				if (!name1 && index1 == 0) {
					this.selectedLevel1 = level1.name;
					this.level2 = level1['LevelTwo'].filter(n => n.name != "" ).map(object=> (({name, id, levelThree})=>({id,name}))(object));
					level1['LevelTwo'].filter(n => n.name != "" ).map((level2, index2)=> {
						if (index2 == 0) {
							this.selectedLevel2 = level2['name'];
							if (level2['levelThree']) {
								this.level3 = level2['levelThree'].filter(n => n.name != "" ).map(object=> (({name, id})=>({id,name}))(object));
								level2['levelThree'].filter(n => n.name != "" ).map((level3, index3)=> {
									if(index3 == 0){
										this.selectedLevel3 = level3['name']
									}
								});
							}
						}
					});
				}else if (name1 == level1.id) {
					this.level2 = level1['LevelTwo'].filter(n => n.name != "" ).map(object=> (({name, id, levelThree})=>({id,name}))(object)); 
					level1['LevelTwo'].filter(n => n.name != "" ).map((level2, index2)=> {
						if (!name2 && index2 == 0) {
							this.selectedLevel2 = level2['name'];
							if (level2['levelThree']) {
								this.level3 = level2['levelThree'].filter(n => n.name != "" ).map(object=> (({name, id})=>({id,name}))(object));
								level2['levelThree'].filter(n => n.name != "" ).map((level3, index3)=> {
									if(index3 == 0){
										this.selectedLevel3 = level3['name']
									}
								});
							}
						}else if (name2 == level2.id) {
							this.selectedLevel2 = level2['name'];
							if (level2['levelThree']) {
								this.level3 = level2['levelThree'].filter(n => n.name != "" ).map(object=> (({name, id})=>({id,name}))(object));
								level2['levelThree'].filter(n => n.name != "" ).map((level3, index3)=> {
									if(index3 == 0){
										this.selectedLevel3 = level3['name']
									}
								});
							}
						}
					});
				}
			});
		});
	}

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

	getGeoCityData(id){//get geoDataCity
		this.geoService.service({
			method: "GET",
			url: this.url
		}).subscribe((data: any) => {
			this.geoArray = data.data.geoAreas.map((item, index) => {
				if(!id && index == 0){
					this.citiesArray = item["cities"];
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
				if (!name1 && index1 == 0) {
					this.selectedContent1 = l1.name;
					this.content2 = l1.contentLevelTwo.map((l2, index2)=>{
						if (!name2 && index2 == 0) {
							this.selectedContent2 = l2.name;
							if (l2.contentLevelThree.length > 0) {
								this.content3 = l2.contentLevelThree.filter(n => n.name != "" ).map((l3, index3)=>{
									this.selectedContent3=l3.name;
									if (!name3 && index3 == 0) {
										if (l3.contentLevelFour.length > 0) {
											this.content4 = l3.contentLevelFour.filter(n => n.name != "" )
										}else{
											this.content4 = [];
										}
									}else if (name3 == l3.name) {
										if (l3.contentLevelFour.length > 0) {
											this.content4 = l3.contentLevelFour.filter(n => n.name != "" )
										}else{
											this.content4 = [];
										}
									}
									return l3;
								})
							}else{
								this.content3 = [];
								this.content4 = [];
							}
						}else if (name2 == l2.name) {
							this.selectedContent2 = l2.name;
							if (l2.contentLevelThree.length > 0) {
								this.content3 =  l2.contentLevelThree.filter(n => n.name != "" ).map((l3, index3)=>{
									if (!name3 && index3 == 0) {
										this.selectedContent3=l3.name;
										if (l3.contentLevelFour.length > 0) {
											this.content4 = l3.contentLevelFour.filter(n => n.name != "" )
										}else{
											this.content4 = [];
										}
									}else if (name3 == l3.name) {
										this.selectedContent3=l3.name;
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
						return l2;
					})
				}else if (name1 == l1.name) {
					this.selectedContent1 = l1.name;
					this.content2 = l1.contentLevelTwo.map((l2, index2)=>{
						if (!name2 && index2 == 0) {
							this.selectedContent2 = l2.name;
							if (l2.contentLevelThree.length > 0) {
								this.content3 = l2.contentLevelThree.filter(n => n.name != "" ).map((l3, index3)=>{
									if (!name3 && index3 == 0) {
										this.selectedContent3=l3.name;
										if (l3.contentLevelFour.length > 0) {
											this.content4 = l3.contentLevelFour.filter(n => n.name != "" )
										}else{
											this.content4 = [];
										}
									}else if (name3 == l3.name) {
										this.selectedContent3=l3.name;
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
						}else if (name2 == l2.name) {
							this.selectedContent2 = l2.name;
							if (l2.contentLevelThree.length > 0) {
								 this.content3 = l2.contentLevelThree.filter(n => n.name != "" ).map((l3, index3)=>{
									if (!name3 && index3 == 0) {
										this.selectedContent3=l3.name;
										if (l3.contentLevelFour.length > 0) {
											this.content4 = l3.contentLevelFour.filter(n => n.name != "" )
										}else{
											this.content4 = [];
										}
									}else if (name3 == l3.name) {
										this.selectedContent3=l3.name;
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

	handleChange(level, e){
		this.getLevelData({'level': level, 'value': e.target.value })
	}

	getItemDetails($event){
		this.selectedSchool= $event;
		$event.admin.filter(admin => admin.type == 'res').map(res => {
			let adminRes = res;
			$event.admin.filter(admin => admin.type == 'admin').map(admin=>{
				let nahjAdmin = admin;
				let l2 = $event['levelTwo'].id
				let l3 = $event['levelThree'].id;
				this.speciificContent = $event.licensedContent;
				this.form = this.fb.group({
					schoolName: [$event.name],
					motherComp: [$event.motherComp],
					email: [$event.email],
					phone: [$event.phone],
					gps: [$event.gps],
					fax: [$event.fax],
					address: [$event.address],
					geo: [$event['speciificArea'].speciificGeaoArea.id],
					district: [$event.district],
					city: [$event['speciificArea'].speciificCity.name],
					studentsNum: [$event.studentsNum],
					classesNum: [$event.classesNum],
					teachersNum: [$event.teachersNum],
					adminsNum: [$event.adminNum],
					lowestStudyYear: [$event.lowestStudyYear],
					highestStudyYear: [$event.highestStudyYear],
					studyYears: [$event.StudyYears],
					level1: [$event.levels.id],
					level2: [l2],
					level3: [l3],
					adminName: [adminRes.name],
					adminEmail: [adminRes.email],
					adminPhone: [adminRes.phone],
					adminJob: [adminRes.job],
					adminWhatsApp: [adminRes.whatsApp],
					adminUsername: [adminRes.username],
					adminPassword: [adminRes.password],
					nahjAdminName: [nahjAdmin.name],
					nahjAdminEmail: [nahjAdmin.email],
					nahjAdminPhone: [nahjAdmin.phone],
					nahjAdminJob: [nahjAdmin.job],
					nahjAdminWhatsApp: [nahjAdmin.whatsApp],
					nahjAdminUsername: [nahjAdmin.username],
					nahjAdminPassword: [nahjAdmin.password],
					content1: '',
					content2: '',
					content3: '',
					content4: ''
				});
			})
		})	
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
			nahjAdminPassword: [''],
			content1:[''],
			content2:[''],
			content3:[''],
			content4:['']
		});
	}

	addSchool(conf,state = 0){
		console.log("add scool", state, conf)
		let config = conf || this.form.value;
		this.schoolService.service({
			method: 'PUT',
			url: this.url,
			email:config.email,
			address:config.address,
			admin:{
				name: config.nahjAdminName,
				phone: config.nahjAdminPhone,
				email: config.nahjAdminEmail,
				job: config.nahjAdminJob,
				whatsApp: config.nahjAdminWhatsApp,
				type: 'admin',
				password: config.nahjAdminPassword,
				username: config.nahjAdminUsername
			},
			adminRes:{
				name: config.adminName,
				phone: config.adminPhone,
				email: config.adminEmail,
				job: config.adminJob,
				whatsApp: config.adminWhatsApp,
				type: 'res',
				password: config.adminPassword,
				username: config.adminUsername
			},
			gps:config.gps,
			phone:config.phone,
			fax:config.fax,
			district:config.district,
			adminNum:parseInt(config.adminsNum),
			studentsNum:parseInt(config.studentsNum),
			classesNum:parseInt(config.classesNum),
			teachersNum:parseInt(config.teachersNum),
			StudyYears:config.studyYears,
			lowestStudyYear:config.lowestStudyYear,
			highestStudyYear:config.highestStudyYear,
			name:config.schoolName,
			motherComp:config.motherComp,
			level1: config.level1,
			level2: config.level2,
			level3: config.level3,
			GeoAreaName: config.geo,
			cityName: config.city,
			arrayOfSpeciificContent: state ? conf.licensedContent  : (this.speciificContent.length > 0 ? this.speciificContent : "")
		}).subscribe(data => {
			console.log("add school", data)
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
				nahjAdminPassword: [''],
				content1: [''],
				content2: [''],
				content3: [''],
				content4: ['']
			});
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
