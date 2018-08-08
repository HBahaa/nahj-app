import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.scss']
})
export class ParentsComponent implements OnInit {

	form: FormGroup;
	constructor( private fb: FormBuilder ) {}

	ngOnInit() {
		this.form = this.fb.group({
			name: ['', Validators.required],
			nickname: ['', Validators.required],
			email: ['', Validators.required],
			relation: ['', Validators.required],
			phone1: ['', Validators.required],
			phone2: ['', Validators.required],
			class: ['', Validators.required],
			term: ['', Validators.required],
			status: ['', Validators.required],
			userName: ['', Validators.required],
			password: ['', Validators.required],
			data1: [''],
			data2: [''],
			data3: [''],
			data4: ['']
	    });
	}

	onSubmit() {
		console.log("submit", this.form.value)
	    if (this.form.valid) {
	    	console.log(this.form.value);
	    }
	}

}
