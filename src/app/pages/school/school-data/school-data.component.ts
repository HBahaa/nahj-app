import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-school-data',
  templateUrl: './school-data.component.html',
  styleUrls: ['./school-data.component.scss']
})
export class SchoolDataComponent implements OnInit {

	form: FormGroup;
	level1 = ["المدارس اﻷهلية", "المدارس اﻷهلية", "المدارس اﻷهلية", "المدارس اﻷهلية", "المدارس اﻷهلية", "المدارس اﻷهلية", "المدارس اﻷهلية"];
	
	constructor( private fb: FormBuilder ) {}

	ngOnInit() {
		this.form = this.fb.group({
	    	manager_name: ['', Validators.required],
			manager_userName: ['', Validators.required],
			manager_email: ['', Validators.required],
			manager_password: ['', Validators.required],
			manager_job: ['', Validators.required],
			manager_phone1: ['', Validators.required],
			manager_phone2: ['', Validators.required],
			admin_name: ['', Validators.required],
			admin_userName: ['', Validators.required],
			admin_email: ['', Validators.required],
			admin_password: ['', Validators.required],
			admin_job: ['', Validators.required],
			admin_phone1: ['', Validators.required],
			admin_phone2: ['', Validators.required],
			term: ['', Validators.required]
	    });
	}

	onSubmit() {
		console.log("submit", this.form.value)
	    if (this.form.valid) {
	    	console.log(this.form.value);
	    }
	}
}
