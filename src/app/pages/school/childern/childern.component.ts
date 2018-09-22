import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-childern',
  templateUrl: './childern.component.html',
  styleUrls: ['./childern.component.scss']
})
export class ChildernComponent implements OnInit {
	
	form: FormGroup;
	constructor( private fb: FormBuilder ) {}

	ngOnInit() {
		this.form = this.fb.group({
			name: ['', Validators.required],
			nickname: ['', Validators.required],
			parent: ['', Validators.required],
			nationality: ['', Validators.required],
			type: ['', Validators.required],
			job: ['', Validators.required],
			birthday: ['', Validators.required],
			id: ['', Validators.required],
			userName: ['', Validators.required],
			password: ['', Validators.required],
			status: ['', Validators.required],
			data1: [''],
			data2: [''],
			data3: ['']
	    });
	}

	onSubmit() {
		console.log("submit", this.form.value)
	    if (this.form.valid) {
	    	console.log(this.form.value);
	    }
	}

}
