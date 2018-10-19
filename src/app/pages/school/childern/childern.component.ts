import { studyLevelsOne } from './../../../services/schoolAdmin/studyLevelsOne';
import { StudyYearsService } from './../../../services/studyYears/study-years.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfigService } from '../../../services/config';
import { students } from '../../../services/schoolAdmin/students';
import { parents } from '../../../services/schoolAdmin/parents';
import { licensedClass } from '../../../services/schoolAdmin/licensedClass';
import { licensedStudent } from '../../../services/schoolAdmin/licensedStudent';

@Component({
  selector: 'app-childern',
  templateUrl: './childern.component.html',
  styleUrls: ['./childern.component.scss']
})
export class ChildernComponent implements OnInit {
	
	form: FormGroup;
	add: boolean = false;
	edit: boolean = false;
	addLicense: boolean = false;
	editLicense: boolean = false;
	url: string;
	schoolID: string;
	licenseTerm: any[];
	searchName: string = '';
	studentsArr: any[] = [];
	parentsArr: any[] = [];
	terms: any[] = [];
	selectedStudent: any;
	image: string;
	file: File;
	selectedLicenseTerm;
	licenseClasses = [];


	constructor( private fb: FormBuilder, private configService: ConfigService,
				 private students: students, private studyYearsService: StudyYearsService,
				 private parents: parents, private studyLevelsOne: studyLevelsOne,
				 private licensedClass: licensedClass, private licensedStudent: licensedStudent)
	{
		this.url = this.configService.url;
		this.schoolID = localStorage.getItem("schoolID");
		this.licenseTerm = JSON.parse(localStorage.getItem("licenseTerm"));

		this.terms = this.licenseTerm && this.licenseTerm.length > 0 ? this.licenseTerm.map(term => term.studyYear) : []
	}

	ngOnInit() {
		this.form = this.fb.group({
			name: ['', Validators.required],
			nickname: ['', Validators.required],
			parent: ['', Validators.required],
			nationality: ['', Validators.required],
			gender: ['', Validators.required],
			term: ['', Validators.required],
			lclassid: ['', Validators.required],
			job: ['', Validators.required],
			birthday: ['', Validators.required],
			username: ['', Validators.required],
			password: ['', Validators.required],
			accountStatus: ['', Validators.required],
			extraInfoOne: ['', Validators.required]
		});
		this.getParents();
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

	handleStudyYearChange(e){
		this.selectedLicenseTerm = this.licenseTerm.filter(data=> data.studyYear.id == e)[0];
		this.getLicenseClasses()
	}

	getLicenseClasses(){
		this.licensedClass.service({
			url: this.url,
			method: "GET",
			id: this.selectedLicenseTerm['id']
		}).subscribe(data=>{
			// this.licenseClasses = data['data']['licensedTerms'][0]['licensedClass'].map(item=> item.class )
			console.log("data['data']['licensedTerms'] && data['data']['licensedTerms'].length > 0", data['data']['licensedTerms'] && data['data']['licensedTerms'].length > 0)
			if (data['data']['licensedTerms'] && data['data']['licensedTerms'].length > 0) {
				this.licenseClasses = data['data']['licensedTerms'][0]['licensedClass']				
			}
		});
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
		//var img = window.btoa(this.file)
		var myReader:FileReader = new FileReader();
		
		myReader.onloadend = (e) => {
			this.image = myReader.result;
		}
		myReader.readAsDataURL(this.file);
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
			//asccountStatus: this.form.value.accountStatus,
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

	addLicenseStudent(){
		this.licensedStudent.service({
			method: "PUT",
			url: this.url,
			teacher: this.selectedStudent.id,
			isActiveAccount: this.form.value.accountStatus,
			classes:this.form.value.lclassid,
			ltermid: this.selectedLicenseTerm['id']
		}).subscribe(data=>{
			console.log("addStudentLicense", data);
			this.addLicense = false;
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
