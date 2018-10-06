import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { parents } from '../../../services/schoolAdmin/parents';
import { ConfigService } from '../../../services/config';
import { StudyYearsService } from '../../../services/studyYears/study-years.service';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.scss']
})
export class ParentsComponent implements OnInit {

	form: FormGroup;
	add: boolean = false;
	edit: boolean = false;
	url: string;
	schoolID: string;
	terms = [];
	parentsArr: any[] = [];

	constructor( private fb: FormBuilder, private parents: parents,
		private configService: ConfigService, private studyYearsService: StudyYearsService ) 
	{
		this.url = this.configService.url;
	}
 
	ngOnInit() {
		this.schoolID = localStorage.getItem("schoolID");
		this.form = this.fb.group({
			name: ['', Validators.required],
			nickname: ['', Validators.required],
			email: ['', Validators.required],
			relation: ['', Validators.required],
			phone: ['', Validators.required],
			whatsApp: ['', Validators.required],
			class: ['', Validators.required],
			term: ['', Validators.required],
			accountStatus: ['', Validators.required],
			username: ['', Validators.required],
			password: ['', Validators.required],
			extraInfoOne: [''],
			extraInfoTwo: [''],
			extraInfoThree: [''],
			extraInfoFour: ['']
		});
		this.getStudyYear();
		this.getParents();
	}

	clearInputs(){
		this.form = this.fb.group({
			name: [''],
			nickname: [''],
			email: [''],
			relation: [''],
			phone: [''],
			whatsApp: [''],
			class: [''],
			term: [''],
			accountStatus: [''],
			username: [''],
			password: [''],
			extraInfoOne: [''],
			extraInfoTwo: [''],
			extraInfoThree: [''],
			extraInfoFour: ['']
		});
	}

	addClicked(){
		this.add = true;
		this.clearInputs()
	}
	editClicked(){
		this.edit = true;
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
			console.log("getParents", data);
		})
	}

	parentClicked(e){
		console.log("parentClicked", e)
		this.form = this.fb.group({
			name: e.name,
			nickname: e.title,
			email: e.email,
			relation: e.relationToChild,
			phone: e.phone,
			whatsApp: e.whatsApp,
			// class: e.,
			// term: e.,
			accountStatus: e.accountStatus,
			username: e.username,
			password: e.password,
			extraInfoOne: e.extraInfoOne,
			extraInfoTwo: e.extraInfoTwo,
			extraInfoThree: e.extraInfoThree,
			extraInfoFour: e.extraInfoFour
		});
	}

	addParent(){
		this.parents.service({
			url: this.url,
			method: 'PUT',
			id: this.schoolID,
			name: this.form.value.name,
			title: this.form.value.nickname,
			relationToChild: this.form.value.relation,
			phone: this.form.value.phone,
			whatsApp: this.form.value.whatsApp,
			accountStatus: this.form.value.accountStatus,
			username: this.form.value.username,
			password: this.form.value.password,
			extraInfoOne: this.form.value.extraInfoOne,
			extraInfoTwo: this.form.value.extraInfoTwo,
			extraInfoThree: this.form.value.extraInfoThree,
			extraInfoFour: this.form.value.extraInfoFour
		}).subscribe(data=>{
			console.log("addParent", data)
			this.clearInputs();
			this.getParents();
			this.add = false;
		})
	}

	editParent(){
		this.parents.service({
			url: this.url,
			method: 'POST',
			id: this.schoolID,
			name: this.form.value.name,
			title: this.form.value.nickname,
			relationToChild: this.form.value.relation,
			phone: this.form.value.phone,
			whatsApp: this.form.value.whatsApp,
			accountStatus: this.form.value.accountStatus,
			username: this.form.value.username,
			password: this.form.value.password,
			extraInfoOne: this.form.value.extraInfoOne,
			extraInfoTwo: this.form.value.extraInfoTwo,
			extraInfoThree: this.form.value.extraInfoThree,
			extraInfoFour: this.form.value.extraInfoFour
		}).subscribe(data=>{
			console.log("editParent", data);
			this.getParents();
			this.edit = false;
		})
	}

	deleteParent(){
		this.parents.service({
			url: this.url,
			method: 'DELETE',
			id: this.schoolID
		}).subscribe(data=>{
			console.log("deleteParent", data)
			this.getParents();
		})
	}

}
