import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ELevelsOneService } from '../../../services/elevels/elevelsOne.service';
import { ELevelsTwoService } from '../../../services/elevels/elevelsTwo.service';
import { ELevelsThreeService } from '../../../services/elevels/elevelsThree.service';
import { GeoService } from '../../../services/geo/geo.service';
import { SchoolService } from '../../../services/school/school.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

	title:string = "فلتر تقسيمات المدارس";
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
		private elevelsTwo: ELevelsTwoService,
		private elevelsThree: ELevelsThreeService,
		private schoolService: SchoolService,
		private geoService: GeoService
	 ) { }

	ngOnInit() {
		this.form = this.fb.group({
			schoolName: ['', Validators.required],
			motherComp: ['', Validators.required],
			email: ['', Validators.required],
			phone: ['', Validators.required],
			gps: ['', Validators.required],
			fax: ['', Validators.required],
			address: ['', Validators.required],
			region: ['0', Validators.required],
			district: ['', Validators.required],
			city: ['0', Validators.required],
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
		this.getAllLevels(undefined, undefined);
	}

	///   get data functions
	getAllLevels(name1, name2) {
		this.elevelsOne.service({
			method: 'GET',
			url: this.url
		}).subscribe(data => {
			this.level1 = data['data'].levelOnes.map((level1, index1)=>{
				if (!name1 && index1 == 0) {
					this.selectedLevel1 = level1.name;
					this.level2 = level1['LevelTwo'].filter(n => n.name != "" ).map((level2, index2)=> {
						if (index2 == 0) {
							this.selectedLevel2 = level2['name'];
							if (level2['levelThree']) {
								this.level3 = level2['levelThree'].filter(n => n.name != "" ).map((level3, index3)=> {
									if(index3 == 0){
										this.selectedLevel3 = level3['name']
									}
									return level3.name;
								});
							}
						}
						return level2.name
					});
				}else if (name1 == level1.name) {
					this.level2 = level1['LevelTwo'].filter(n => n.name != "" ).map((level2, index2)=> {
						if (!name2 && index2 == 0) {
							this.selectedLevel2 = level2['name'];
							if (level2['levelThree']) {
								this.level3 = level2['levelThree'].filter(n => n.name != "" ).map((level3, index3)=> {
									if(index3 == 0){
										this.selectedLevel3 = level3['name']
									}
									return level3.name;
								});
							}
						}else if (name2 == level2.name) {
							this.selectedLevel2 = level2['name'];
							if (level2['levelThree']) {
								this.level3 = level2['levelThree'].filter(n => n.name != "" ).map((level3, index3)=> {
									if(index3 == 0){
										this.selectedLevel3 = level3['name']
									}
									return level3.name;
								});
							}
						}
						return level2.name;
					});
				}
				return level1.name;

			});
			console.log("level1", this.level1)
			console.log("level2", this.level2)
			console.log("level3", this.level3)
		});
	}


	getGeoCityData(name){//get geoDataCity
		this.geoService.service({
			method: "GET",
			url: this.url
		}).subscribe((data: any) => {
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
		console.log("getCities", $event.target.value);
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
	filterSchoolList($event){

	}

	handleChange(level, e){
		this.getLevelData({'level': level, 'value': e.target.value })
	}
	
	getFilterData(level1, level2, level3){
		if (!level1 && !level2 && !level3) {
			
		}
		else if(level1  && !level2 && !level3){

		}
		else if(level1  && level2 && !level3){

		}
		else if(level1  && level2 && level3){

		}
	}
	getItemDetails($event){
		$event.admin.filter(admin => admin.type == 'res').map(res => {
			let adminRes = res;
			$event.admin.filter(admin => admin.type == 'admin').map(admin=>{
				let nahjAdmin = admin;
				this.form = this.fb.group({
					schoolName: [$event.name],
					motherComp: [$event.motherComp],
					email: [$event.email],
					phone: [$event.phone],
					gps: [$event.gps],
					fax: [$event.fax],
					address: [$event.address],
					region: [$event.region],
					district: [$event.district],
					city: [$event.city],
					studentsNum: [$event.studentsNum],
					classesNum: [$event.classesNum],
					teachersNum: [$event.teachersNum],
					adminsNum: [$event.adminNum],
					lowestStudyYear: [$event.lowestStudyYear],
					highestStudyYear: [$event.highestStudyYear],
					studyYears: [$event.StudyYears],
					level1: [$event.levels.name],
					level2: [$event.levels.LevelTwo[0].name],
					level3: [],
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

	addSchool($event){
		// this.form = this.fb.group({
		// 	schoolName: [''],motherComp: [''],
		// 	email: [''],
		// 	phone: [''],
		// 	gps: [''],
		// 	fax: [''],
		// 	address: [''],
		// 	region: [''],
		// 	district: [''],
		// 	city: [''],
		// 	studentsNum: [''],
		// 	classesNum: [''],
		// 	teachersNum: [''],
		// 	adminsNum: [''],
		// 	lowestStudyYear: [''],
		// 	highestStudyYear: [''],
		// 	studyYears: [''],
		// 	level1: [''],
		// 	level2: [''],
		// 	level3: [''],
		// 	adminName: [''],
		// 	adminEmail: [''],
		// 	adminPhone: [''],
		// 	adminJob: [''],
		// 	adminWhatsApp: [''],
		// 	adminUsername: [''],
		// 	adminPassword: [''],
		// 	nahjAdminName: [''],
		// 	nahjAdminEmail: [''],
		// 	nahjAdminPhone: [''],
		// 	nahjAdminJob: [''],
		// 	nahjAdminWhatsApp: [''],
		// 	nahjAdminUsername: [''],
		// 	nahjAdminPassword: ['']
	    // });
		let config = this.form.value;
		this.elevelsOne.service({
			method: 'GET',
			url: this.url
		}).subscribe(data => {
			data['data'].levelOnes.map(level1=>{
				if(level1.name == this.form.value.level1){
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
						level1Id:level1.id
					}).subscribe(data => {
						console.log("dataa", data);
					})
				}
			})
			
		})
	}
	editSchool($event){
		
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
						this.getAllLevels(undefined, undefined);
					})
				}
			})
		})
	}

}
