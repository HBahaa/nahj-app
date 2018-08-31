import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-kids',
  templateUrl: './kids.component.html',
  styleUrls: ['./kids.component.scss']
})
export class KidsComponent implements OnInit {
	form: FormGroup;
	image= "./assets/images/profile.png";

	kids = ["محمد أحمد", "أحمد عبدالله"];
	edit: boolean = true;
	add: boolean = true;

	constructor( private fb: FormBuilder) { }

	ngOnInit() {
		this.form = this.fb.group({
	      userName: ['', Validators.required],
	      password: ['', Validators.required],
	      nickname: ['', Validators.required],
	      image: ['', Validators.required],
	      birthdate: ['', Validators.required],
	      nationality: ['', Validators.required],
	      type: ['', Validators.required],
	      moreData: ['', Validators.required]
	    });
	}

	onSubmit() {
	    if (this.form.valid) {
	    	console.log(this.form.value);
	    }
	}

	changeImage(){
		// $('#img').attr('src', e);
	}
}
