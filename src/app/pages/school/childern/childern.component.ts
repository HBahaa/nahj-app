import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfigService } from '../../../services/config';

@Component({
  selector: 'app-childern',
  templateUrl: './childern.component.html',
  styleUrls: ['./childern.component.scss']
})
export class ChildernComponent implements OnInit {
	
	form: FormGroup;
	url: string;
	
	constructor( private fb: FormBuilder, private configService: ConfigService ) {
		this.url = this.configService.url;
	}

	ngOnInit() {
		this.form = this.fb.group({
			name: ['', Validators.required],
			nickname: ['', Validators.required],
			parent: ['', Validators.required],
			nationality: ['', Validators.required],
			type: ['', Validators.required],
			term: ['', Validators.required],
			class: ['', Validators.required],
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
