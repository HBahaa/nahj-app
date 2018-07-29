import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

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

	onSubmit() {
		console.log("submit", this.form.value)
	    if (this.form.valid) {
	    	console.log(this.form.value);
	    }
	}

	toggle(){
        $('#sidebar').toggleClass('active');
	}
}
