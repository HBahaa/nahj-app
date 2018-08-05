import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-evaluation-data',
  templateUrl: './evaluation-data.component.html',
  styleUrls: ['./evaluation-data.component.scss']
})
export class EvaluationDataComponent implements OnInit {

	show: boolean = true;
	form: FormGroup;

	constructor( private fb: FormBuilder ) {}
 
	ngOnInit() {
		this.form = this.fb.group({
	      level1: ['1', Validators.required],
	      level2: ['1', Validators.required],
	      level3: ['1', Validators.required],
	      level4: ['1', Validators.required]
	    });
	}

	onSubmit() {
		console.log("submit", this.form.value)
	    if (this.form.valid) {
	    	console.log(this.form.value);
	    }
	}

	handleChange(e){
		this.show = ! this.show;
	}
}
