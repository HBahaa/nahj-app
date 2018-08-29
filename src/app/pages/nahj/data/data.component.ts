import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../../components/dialog/dialog.component';

import { ELevelsOneService } from '../../../services/elevels/elevelsOne.service';
import { GeoService } from '../../../services/geo/geo.service';
import { SchoolService } from '../../../services/school/school.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

	title:string = "فلتر تقسيمات المدارس";
	updateChildData = false
	url = 'http://localhost:4466';
	form: FormGroup;
	level1=[];
	level2=[];
	level3=[];
	selectedLevel1;
	selectedLevel2;
	selectedLevel3;
	geoArray;
	citiesArray;
	selectedGeo;


	constructor( 
		private fb: FormBuilder,
		private elevelsOne: ELevelsOneService,
		private schoolService: SchoolService,
		private geoService: GeoService,
		public dialog: MatDialog
	 ) { }

	ngOnInit() {
	
		this.getAllLevels(undefined, undefined);
		this.getGeoCityData(undefined)
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


	getGeoCityData(name){//get geoDataCity
		this.geoService.service({
			method: "GET",
			url: this.url
		}).subscribe((data: any) => {
			console.log("getGeoCityData", data)
			this.geoArray = data.data.geoAreas.map((item, index) => {
				if(!name && index == 0){
					this.citiesArray = item["cities"];
				}else if(item.name == name){
					this.citiesArray =  item["cities"]
				}
				return item.name;
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

	handleChange(level, e){
		this.getLevelData({'level': level, 'value': e.target.value })
	}

	getItemDetails($event){
		console.log("clicked", $event)
		$event.admin.filter(admin => admin.type == 'res').map(res => {
			let adminRes = res;
			$event.admin.filter(admin => admin.type == 'admin').map(admin=>{
				let nahjAdmin = admin;
				let l2 = $event.levels.LevelTwo.filter(n => n.name != "" )[0].id
				let l3 = $event.levels.LevelTwo.filter(n => n.name != "" )[0].levelThree.filter(n => n.name != "" )[0].id;
				this.form = this.fb.group({
					schoolName: [$event.name],
					motherComp: [$event.motherComp],
					email: [$event.email],
					phone: [$event.phone],
					gps: [$event.gps],
					fax: [$event.fax],
					address: [$event.address],
					geo: [$event.speciificArea.speciificGeaoArea.name],
					district: [$event.district],
					city: [$event.speciificArea.speciificCity.name],
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
					nahjAdminPassword: [nahjAdmin.password]
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
			nahjAdminPassword: ['']
		});
	}

	addSchool(){
		console.log("form", this.form.value)
		let config = this.form.value;
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
			cityName: config.city
		}).subscribe(data => {
			console.log("data add", data);
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
				nahjAdminPassword: ['']
			});
			this.updateChildData = true;
		})
		this.updateChildData = false;
	}
	editSchool($event){
		console.log("edit", $event)
		let config = this.form.value;
		this.schoolService.service({
			method: "GET",
			url: this.url
		}).subscribe(schools =>{
			schools["data"].schools.map(school=>{
				let adminId = $event.admin.filter(admin => admin.type == 'admin')[0].id;
				let resId = $event.admin.filter(admin => admin.type == 'res')[0].id;
				let l1ID = $event.levels.id;
				let l2ID = $event.levels.LevelTwo.filter(n => n.name != "" )[0].id
				let l3ID = $event.levels.LevelTwo.filter(n => n.name != "" )[0].levelThree.filter(n => n.name != "" )[0].id;
				if(school.id == $event.id){
					this.schoolService.service({
						method: "POST",
						url: this.url,
						schoolID: $event.id,
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
						level1: l1ID,
						level2: l2ID,
						level3: l3ID,
						GeoAreaName: config.geo,
						cityName: config.city,
						adminId: adminId,
          				adminResID: resId
					}) .subscribe(resp=>{
						this.updateChildData = true;
					})
				}
			})
		})
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

}
