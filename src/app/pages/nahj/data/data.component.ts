import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ELevelsOneService } from '../../../services/elevels/elevelsOne.service';
import { ELevelsTwoService } from '../../../services/elevels/elevelsTwo.service';
import { ELevelsThreeService } from '../../../services/elevels/elevelsThree.service';

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

	constructor( 
		private fb: FormBuilder,
		private elevelsOne: ELevelsOneService,
		private elevelsTwo: ELevelsTwoService,
		private elevelsThree: ELevelsThreeService,
		private schoolService: SchoolService
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
			
		});
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
	onSubmit(){
		console.log("data", this.form.value);
		let config = this.form.value;
		this.schoolService.service({
			method: 'PUT',
			url: this.url,
			email:config.email,
			address:config.address,
			admin:[{
				name: config.nahjAdminName,
				phone: config.nahjAdminPhone,
				email: config.nahjAdminEmail,
				job: config.nahjAdminJob,
				whatsApp: config.nahjAdminWhatsApp,
				type: 'nahjAdmin',
				password: config.nahjAdminPassword,
				username: config.nahjAdminUsername
			}],
			gps:config.gps,
			phone:config.phone,
			fax:config.fax,
			district:config.district,
			adminNum:config.adminsNum,
			studentsNum:config.studentsNum,
			classesNum:config.classesNum,
			teachersNum:config.teachersNum,
			StudyYears:config.studyYears,
			lowestStudyYear:config.lowestStudyYear,
			highestStudyYear:config.highestStudyYear,
			name:config.schoolName,
			motherComp:config.motherComp,
		}).subscribe(data => {
			console.log("dataa", data)
		})
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
		console.log("details ", $event)
	}

	addSchool($event){
		this.onSubmit()
	}
	editSchool($event){
		
	}
	deleteSchool($event){
		 
	}

}
