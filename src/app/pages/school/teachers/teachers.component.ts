import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

	form: FormGroup;
	url : string;
	teachersArr:any[] = [];
	schoolID: string = '';
	add: boolean = false;
	edit: boolean = false;
	
	selectedStudyLevel1;
	selectedStudyLevel2;
	selectedStudyLevel3;
	selectedTeacher;
	classes = [];
	studyLevel1 = [];
	studyLevel2 = [];
	studyLevel3 = [];


	constructor( private teachers: teachers, private configService: ConfigService,private fb: FormBuilder
				private studyLevelsOne: studyLevelsOne, private classesService: classes ) {
		this.url = this.configService.url;
		this.schoolID = localStorage.getItem("schoolID");
	}

	ngOnInit() {
		this.form = this.fb.group({
			name: ['', Validators.required],
			username: ['', Validators.required],
			title: ['', Validators.required],
			email: ['', Validators.required],
			password: ['', Validators.required],
			job: ['', Validators.required],
			phone: ['', Validators.required],
			whatsApp: ['', Validators.required],
			class: ['', Validators.required],
			term: ['', Validators.required],
			accountStatus: ['', Validators.required],
			add_evaluation: ['', Validators.required],
			add_data: ['', Validators.required],
			edit_data: ['', Validators.required],
			delete_evaluation: ['', Validators.required]
		});
		this.getStudyLevelData(undefined, undefined);
		this.getTeachers();
	}

	handleStudyLevelChange(level, e){
		console.log("********* e", e.target.value)
		console.log("======", this.studyLevel1)
		switch (level) {
			case "studyLevel1":
				this.getStudyLevelData(e.target.value, undefined)
				break;
		
			case "studyLevel2":
				this.getStudyLevelData( this.selectedStudyLevel1.id, e.target.value)
				break;
			
			case "studyLevel2":
				this.getStudyLevelData(this.selectedStudyLevel1.id, this.selectedStudyLevel2.id )
				break;
		}
	}

	teacherClicked(e){
		console.log("e====", e);
		this.selectedTeacher = e;
		this.form = this.fb.group({
			name: e.name,
			username: e.username,
			title: e.title,
			email: e.email,
			password: e.password,
			job: e.job,
			phone: e.phone,
			whatsApp: e.whatsApp,
		});
	}

	//get functions 
	getStudyLevelData(id1, id2){
		this.studyLevelsOne.service({
			method: "GET",
			url: this.url,
			id: this.schoolID
		}).subscribe(data => {
			if (data['data']['schools'].length > 0) {
				if (data['data']['schools'][0].classes) {
					this.studyLevel1 = data['data']['schools'][0].classes
						.filter(item1 => item1.studyLevelOnea != null)
						.map(item1 => { 
							if (id1 == item1.studyLevelOnea.id) {
								this.selectedStudyLevel1 = item1.studyLevelOnea.id;
								if (item1.studyLevelOnea.studyLevelTwo.length > 0) {
									this.studyLevel2 = item1.studyLevelOnea.studyLevelTwo
										.filter(item2=> item2 != null)
										.map(item2=>{
											if (id2 == item2.id) {
												this.selectedStudyLevel2 = item2.id;
													if (item2.class.length > 0) {
														this.studyLevel3 = item2.class.filter(item3=> item3 != null)
													}else{
														this.studyLevel3 = []
													}

												return item2
											}
											return item2;
										})
								}else{
									this.studyLevel2 = []
									this.studyLevel3 = []
								}						
								return item1.studyLevelOnea;
							}
							else if(id1 == '' || !id1){
								this.studyLevel2 = []
								this.studyLevel3 = []
							}
							return item1.studyLevelOnea;
						});
				}else{
					this.studyLevel1 = []
					this.studyLevel2 = []
					this.studyLevel3 = []
				}
				
			}
		})
	}
	getTeachers(){
		this.teachers.service({
			method: "GET",
			url: this.url,
			id: this.schoolID
		}).subscribe(data=>{
			if(data['data'].schools.length > 0){
				this.teachersArr = data['data'].schools[0].teachers
			}else{
				this.teachersArr= []; 
			}
		})
	}
	clearInputs(){
		this.form = this.fb.group({
			name: [''],
			username: [''],
			title: [''],
			email: [''],
			password: [''],
			job: [''],
			phone: [''],
			whatsApp: [''],
			class: [''],
			term: [''],
			accountStatus: [''],
			add_evaluation: [''],
			add_data: [''],
			edit_data: [''],
			delete_evaluation: ['']
		});
	}

	addClicked(){
		this.add = true;
		this.clearInputs()
	}
	editClicked(){
		this.edit = true;
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
		this.teachers.service({
			method: "PUT",
			url: this.url,
			name: this.form.value.name,
			title: this.form.value.title,
			job: this.form.value.job,
			whatsApp: this.form.value.whatsApp,
			email:this.form.value.email,
			phone:this.form.value.phone,
			type:this.form.value.type,
			username:this.form.value.username,
			password:this.form.value.password,
			id: this.schoolID
		}).subscribe(data=>{
			this.getTeachers();
			this.clearInputs();
			this.add = false;
		})
	}

	editTeacher(){
		this.teachers.service({
			method: "POST",
			url: this.url,
			name: this.form.value.name,
			title: this.form.value.title,
			job: this.form.value.job,
			whatsApp: this.form.value.whatsApp,
			email:this.form.value.email,
			phone:this.form.value.phone,
			type:this.form.value.type,
			username:this.form.value.username,
			password:this.form.value.password,
			id: this.selectedTeacher.id
		}).subscribe(data=>{
			this.getTeachers();
			this.edit= false;
		})
	}

	deleteTeacher(){
		this.teachers.service({
			method: "DELETE",
			url: this.url,
			id: this.selectedTeacher.id
		}).subscribe(data=>{
			this.getTeachers();
			this.clearInputs();
		})
	}
}
