import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {

	form: FormGroup;

	constructor( private fb: FormBuilder ) {}

	ngOnInit() {
		this.form = this.fb.group({
			name: ['', Validators.required],
			userName: ['', Validators.required],
			nickname: ['', Validators.required],
			email: ['', Validators.required],
			password: ['', Validators.required],
			job: ['', Validators.required],
			phone1: ['', Validators.required],
			phone2: ['', Validators.required],
			class: ['', Validators.required],
			term: ['', Validators.required],
			status: ['', Validators.required],
			add_evaluation: ['', Validators.required],
			add_data: ['', Validators.required],
			edit_data: ['', Validators.required],
			delete_evaluation: ['', Validators.required]
	    });
	}

	handleLevel1Change(level1){

	}
	handleLevel2Change(level2){

	}
	handleLevel3Change(level3){

	}
	SearchByName(name){

	}
	onSubmit() {
		console.log("submit", this.form.value)
	    if (this.form.valid) {
	    	console.log(this.form.value);
	    }
	}
}
