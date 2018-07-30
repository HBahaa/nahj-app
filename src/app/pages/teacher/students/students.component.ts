import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

	form: FormGroup;
	image= "http://via.placeholder.com/150x150";

	constructor( private fb: FormBuilder) { }

	ngOnInit() {
		this.form = this.fb.group({
	      name: ['', Validators.required],
	      userName: ['', Validators.required],
	      nickname: ['', Validators.required],
	      sname: ['', Validators.required],
	      image: ['', Validators.required],
	      birthdate: ['', Validators.required],
	      password: ['', Validators.required],
	      nationality: ['', Validators.required],
	      type: ['', Validators.required],
	      moreData: ['', Validators.required],
	      class: ['', Validators.required],
	      term: ['', Validators.required],
	      status: ['', Validators.required]
	    });
	}

	handleChanges(){
	}

	changeImage(e){
		console.log("hahahha", e)
		// $('#img').attr('src', e);
	}
}
