import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-kids-evaluations',
  templateUrl: './kids-evaluations.component.html',
  styleUrls: ['./kids-evaluations.component.scss']
})
export class KidsEvaluationsComponent implements OnInit {

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
	onSubmit(){
		console.log("data", this.form.value)
	}
	handleClassChange(value){

	}
	SearchByName(){
		
	}
}
