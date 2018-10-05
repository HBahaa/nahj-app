import { StudyYearsService } from './../../../services/studyYears/study-years.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfigService } from '../../../services/config';
import { students } from '../../../services/schoolAdmin/students';

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
	studentsArr: any[] = [];
	terms: any[] = [];
	
	constructor( private fb: FormBuilder, private configService: ConfigService,
	private students: students, private studyYearsService: StudyYearsService ) {
		this.url = this.configService.url;
	}

	ngOnInit() {
		this.schoolID = localStorage.getItem("schoolID");
		this.form = this.fb.group({
			name: ['', Validators.required],
			nickname: ['', Validators.required],
			parent: ['', Validators.required],
			nationality: ['', Validators.required],
			type: ['', Validators.required],
			term: ['', Validators.required],
			class: ['', Validators.required],
			job: ['', Validators.required],
			birthday: ['', Validators.required],
			id: ['', Validators.required],
			username: ['', Validators.required],
			password: ['', Validators.required],
			status: ['', Validators.required],
			data1: ['']
		});
		this.getStudyYear();
		this.getStudents();
	}
	clearInputs(){
		this.form = this.fb.group({
			name: [''],
			nickname: [''],
			parent: [''],
			nationality: [''],
			type: [''],
			term: [''],
			class: [''],
			birthday: [''],
			id: [''],
			username: [''],
			password: [''],
			status: [''],
			data1: ['']
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

	getStudents(){
		this.students.service({
			method: "GET",
			url: this.url
		}).subscribe(data => {
			console.log("getStudents", data)
		})
	}

	addStudent(){
		this.students.service({
			url: this.url,
			method: 'PUT',
			id: this.schoolID,
			fullName: this.form.value.name,
			necName: this.form.value.nickname,
			birthday: this.form.value.birthday,
			phone: this.form.value.phone,
			whatsApp: this.form.value.whatsApp,
			accountStatus: this.form.value.accountStatus,
			class: this.form.value.class,
			term: this.form.value.term,
			username: this.form.value.username,
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
		
	}

	deleteStudent(){

	}
}
