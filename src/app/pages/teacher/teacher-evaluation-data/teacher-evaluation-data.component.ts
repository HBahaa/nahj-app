import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-teacher-evaluation-data',
  templateUrl: './teacher-evaluation-data.component.html',
  styleUrls: ['./teacher-evaluation-data.component.scss']
})
export class TeacherEvaluationDataComponent implements OnInit {

	form: FormGroup;

	constructor( private fb: FormBuilder ) { }

	ngOnInit() {
		this.form = this.fb.group({
			custom0: [''],
			custom1: [''],
			custom2: [''],
			custom3: [''],
			custom4: [''],
			custom5: [''],
			custom6: ['']
	    });
	}
	handleChange(){
		console.log("data", this.form.value)
	}
}
