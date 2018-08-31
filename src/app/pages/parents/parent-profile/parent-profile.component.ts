import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-parent-profile',
  templateUrl: './parent-profile.component.html',
  styleUrls: ['./parent-profile.component.scss']
})
export class ParentProfileComponent implements OnInit {

	form: FormGroup;
	edit: boolean = true;
	add: boolean = true;

	constructor( private fb: FormBuilder ) {}

	ngOnInit() {
		this.form = this.fb.group({
	      userName: ['', Validators.required],
	      nickname: ['', Validators.required],
	      email: ['', Validators.required],
	      password: ['', Validators.required],
	      relation: ['', Validators.required],
	      phone1: ['', Validators.required],
	      phone2: ['', Validators.required],
	      more1: [''],
	      more2: [''],
	      more3: [''],
	      more4: ['']
	    });
	}

	onSubmit() {
	    if (this.form.valid) {
	    	console.log(this.form.value);
	    }
	}


}
