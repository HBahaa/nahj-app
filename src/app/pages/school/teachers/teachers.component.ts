import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { studyLevelsOne } from '../../../services/schoolAdmin/studyLevelsOne';
import { teachers } from '../../../services/schoolAdmin/teachers';
import { classes } from '../../../services/schoolAdmin/class';
import { ConfigService } from '../../../services/config';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {

	// form: FormGroup;
	url : string;

	schoolID;
	selectedStudyLevel1;
	selectedStudyLevel2;
	selectedStudyLevel3;

	specificStudyLevelsId;
	evaluationAdd;
	evaluationDelete;
	evaluationInfoAdd;
	evaluationInfoEdit;
	name;
	title;
	job;
	whatsApp;
	email;
	phone;
	type;
	username;
	password;
	nickname;
	term;

	classes = [];
	studyLevel1 = [];
	studyLevel2 = [];
	studyLevel3 = [];


	constructor( private teachers: teachers, private configService: ConfigService,
				private studyLevelsOne: studyLevelsOne, private classesService: classes ) {
		this.url = this.configService.url;
		this.schoolID = localStorage.getItem("schoolID");
	}

	ngOnInit() {
		// this.form = this.fb.group({
		// 	name: ['', Validators.required],
		// 	userName: ['', Validators.required],
		// 	nickname: ['', Validators.required],
		// 	email: ['', Validators.required],
		// 	password: ['', Validators.required],
		// 	job: ['', Validators.required],
		// 	phone1: ['', Validators.required],
		// 	phone2: ['', Validators.required],
		// 	class: ['', Validators.required],
		// 	term: ['', Validators.required],
		// 	status: ['', Validators.required],
		// 	add_evaluation: ['', Validators.required],
		// 	add_data: ['', Validators.required],
		// 	edit_data: ['', Validators.required],
		// 	delete_evaluation: ['', Validators.required]
		// });
		this.getStudyLevelData(undefined, undefined, undefined);
		this.getTeachersData();
	}

	handleStudyLevelChange(level, e){
		console.log("********* e", e.target.value)
		console.log("======", this.studyLevel1)
		switch (level) {
			case "studyLevel1":
				this.getStudyLevelData(e.target.value, undefined, undefined)
				break;
		
			case "studyLevel2":
				this.getStudyLevelData( this.selectedStudyLevel1.id, e.target.value, undefined)
				break;
			
			case "studyLevel2":
				this.getStudyLevelData(this.selectedStudyLevel1.id, this.selectedStudyLevel2.id, e.target.value )
				break;
		}
	}

	//get functions 
	getStudyLevelData(id1, id2,id3) {
		this.studyLevelsOne.service({
			method: "GET",
			url: this.url,
			schoolId: this.schoolID
		}).subscribe(data => {
			this.studyLevel1 = data['data'].school.specificStudyLevels
				.filter(item1 => item1.studyLevelOne != null)
				.map((item1, index1) => {
					if (!id1 && index1 == 0) {
						this.selectedStudyLevel1 = item1.studyLevelOne;
						this.studyLevel2 = item1.studyLevelOne.studyLevelTwo.map((l2, index2)=>{
							if (!id2 && index2==0) {
								this.selectedStudyLevel2 = l2
								this.studyLevel3 = l2.studylevelThree
								.map((l3, index3)=>{
									if (index3==0) {
										this.selectedStudyLevel2 = l2;
									}
									return l3;
								})
							}
							return l2;
						})
					} else if (id1 == item1.studyLevelOne.id) {
						this.selectedStudyLevel1 = item1.studyLevelOne;
						this.studyLevel2 = item1.studyLevelOne.studyLevelTwo.map((l2, index2)=>{
							if (!id2 && index2==0) {
								this.selectedStudyLevel2 = l2;
								this.studyLevel3 = l2.studylevelThree
								.map((l3, index3)=>{
									if (index3==0) {
										this.selectedStudyLevel2 = l2;
									}
									return l3;
								})
							}else if (id2 == l2.id) {
								this.selectedStudyLevel2 = l2;
								this.studyLevel3 = l2.studylevelThree.map((l3, index3)=>{
									if (id3) {
										this.selectedStudyLevel2 = l2;
									}
									return l3;
								})
							}
							return l2;
						})
					}
					return item1.studyLevelOne;
				});
		})
	}
	getTeachersData(){
		this.teachers.service({
			method: "GET",
			url: this.url,
			schoolId: this.schoolID
		}).subscribe(data=>{
			console.log("data teachers", data)
		})
	}

	addClass(){
		console.log("selectedStudyLevel1", this.selectedStudyLevel1)
		console.log("selectedStudyLevel2", this.selectedStudyLevel2)
		console.log("selectedStudyLevel3", this.selectedStudyLevel3)
		// this.classesService.service({
		// 	method: "POST",
		// 	url: this.url,
		// 	studyLevelOne:,
		// 	studyLevelTwo:,
		// 	studyLevelThree:
		// }).subscribe(data => {
		// 	console.log("data specificStudyLevelsId", data)
		// });
	}

	addTeacher(){
		// this.teachers.service({
		// 	method: "PUT",
		// 	url: this.url,
		// 	specificStudyLevelsId: ,
		// 	evaluationAdd: ,
		// 	evaluationDelete: ,
		// 	evaluationInfoAdd: ,
		// 	evaluationInfoEdit: ,
		// 	name: ,
		// 	title: ,
		// 	job: ,
		// 	whatsApp: ,
		// 	email:,
		// 	phone:,
		// 	type:,
		// 	username:,
		// 	password:,
		// 	schoolId: this.schoolID
		// })		
	}

}
