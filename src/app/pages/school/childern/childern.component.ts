import { studyLevelsOne } from './../../../services/schoolAdmin/studyLevelsOne';
import { StudyYearsService } from './../../../services/studyYears/study-years.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfigService } from '../../../services/config';
import { students } from '../../../services/schoolAdmin/students';
import { parents } from '../../../services/schoolAdmin/parents';

@Component({
  selector: 'app-childern',
  templateUrl: './childern.component.html',
  styleUrls: ['./childern.component.scss']
})
export class ChildernComponent implements OnInit {
	
	form: FormGroup;
	add: boolean = false;
	edit: boolean = false;
	url: string;
	schoolID: string;
	searchName: string = '';
	studentsArr: any[] = [];
	parentsArr: any[] = [];
	classesArr: any[] = [];
	terms: any[] = [];
	selectedStudent: any;
	image: string;
	file: File;
	
	constructor( private fb: FormBuilder, private configService: ConfigService,
				 private students: students, private studyYearsService: StudyYearsService,
				 private parents: parents, private studyLevelsOne: studyLevelsOne )
	{
		this.url = this.configService.url;
	}

	ngOnInit() {
		this.schoolID = localStorage.getItem("schoolID");
		this.form = this.fb.group({
			name: ['', Validators.required],
			nickname: ['', Validators.required],
			parent: ['', Validators.required],
			nationality: ['', Validators.required],
			gender: ['', Validators.required],
			term: ['', Validators.required],
			class: ['', Validators.required],
			job: ['', Validators.required],
			birthday: ['', Validators.required],
			username: ['', Validators.required],
			password: ['', Validators.required],
			accountStatus: ['', Validators.required],
			extraInfoOne: ['', Validators.required]
		});
		this.getStudyYear();
		this.getParents();
		this.getStudyLevels()
		this.getStudents();
	}
	clearInputs(){
		this.form = this.fb.group({
			name: [''],
			nickname: [''],
			parent: [''],
			nationality: [''],
			gender: [''],
			term: [''],
			class: [''],
			birthday: [''],
			username: [''],
			password: [''],
			accountStatus: [''],
			extraInfoOne: ['']
	    });
	}
	getStudyYear() {
		this.studyYearsService.service({
			method: "GET",
			url: this.url
		}).subscribe(terms => {
			this.terms = terms['data']['studyYears'];
		})
	}
	getParents(){
		this.parents.service({
			url: this.url,
			method: 'GET',
			id: this.schoolID
		}).subscribe(data=>{
			if(data['data'].schools.length > 0){
				this.parentsArr = data['data'].schools[0].parents
			}else{
				this.parentsArr= []; 
			}
		})
	}

	getStudyLevels(){
		this.studyLevelsOne.service({
			method: "GET",
			url: this.url,
			id: this.schoolID
		}).subscribe(data => {
			if (data['data']['schools'].length > 0) {
				if (data['data']['schools'][0].classes) {
					data['data']['schools'][0].classes
						.filter(item1 => item1.studyLevelOnea != null)
						.map(item1 => { 
							item1.studyLevelOnea.studyLevelTwo
							.filter(item2 => item2 != null)
							.map(item2=>{
								this.classesArr.push(...item2.class);
							})
						});
				}else{
					this.classesArr = []
				}
				
			}
				
		})
	}

	getStudents(){
		this.students.service({
			method: "GET",
			url: this.url,
			id: this.schoolID
		}).subscribe(data => {
			if(data['data'].schools.length > 0){
				this.studentsArr = data['data'].schools[0].students.map(student=>{
					student['name'] = student.fullName
					return student
				})
				console.log("StudentsArr", this.studentsArr)
			}else{
				this.studentsArr= []; 
			}
		})
	}

	addClicked(){
		this.add = true;
		this.clearInputs()
	}
	editClicked(){
		this.edit = true;
	}

	studentClicked(e){
		console.log("e========", e)
		this.selectedStudent = e;
		this.form = this.fb.group({
			name: e.fullName,
			nickname: e.necName,
			parent: e.parent.id,
			nationality: e.nationality,
			gender: e.gender,
			// term: e.,
			// class: e.,
			birthday: e.birthday,
			username: e.username,
			password: e.password,
			photo: e.photo,
			accountStatus: e.accountStatus,
			extraInfoOne: e.extraInfoOne
	    });
	}


	changeListener($event) : void {
		this.readThis($event.target);
	}
	
	readThis(inputValue: any): void {
		this.file = inputValue.files[0];
		console.log("file===", this.file)
		var myReader:FileReader = new FileReader();
		
		myReader.onloadend = (e) => {
			this.image = myReader.result;
		}
		myReader.readAsDataURL(this.file);
		console.log("myReader", myReader)
	}

	addStudent(){
		this.students.service({
			url: this.url,
			method: 'PUT',
			id: this.schoolID,
			fullName: this.form.value.name,
			necName: this.form.value.nickname,
			birthday: this.form.value.birthday,
			nationality: this.form.value.nationality,
			photo: this.file.name,
			parent: this.form.value.parent,
			asccountStatus: this.form.value.accountStatus,
			// class: this.form.value.class,
			// term: this.form.value.term,
			username: this.form.value.username,
			gender: this.form.value.gender,
			password: this.form.value.password,
			extraInfoOne: this.form.value.extraInfoOne
		}).subscribe(data=>{
			console.log("addParent", data)
			this.clearInputs();
			this.getStudents();
			this.add = false;
		})
	}

	editStudent(){
		console.log("this.selectedStudent.photo", this.selectedStudent.photo)
		this.students.service({
			url: this.url,
			method: 'POST',
			id: this.selectedStudent.id,
			fullName: this.form.value.name,
			necName: this.form.value.nickname,
			birthday: this.form.value.birthday,
			nationality: this.form.value.nationality,
			photo: this.file ? this.file.name : this.selectedStudent.photo,
			parent: this.form.value.parent,
			asccountStatus: this.form.value.accountStatus,
			// class: this.form.value.class,
			// term: this.form.value.term,
			username: this.form.value.username,
			gender: this.form.value.gender,
			password: this.form.value.password,
			extraInfoOne: this.form.value.extraInfoOne
		}).subscribe(data=>{
			console.log("edit student", data)
			this.getStudents();
			this.edit = false;
		})
	}

	deleteStudent(){
		this.students.service({
			url: this.url,
			method: 'DELETE',
			id: this.selectedStudent.id,
		}).subscribe(data=>{
			console.log("delete student", data)
			this.getStudents();
		})
	}
}
