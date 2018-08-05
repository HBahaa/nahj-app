import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-school-filter',
  templateUrl: './school-filter.component.html',
  styleUrls: ['./school-filter.component.scss']
})
export class SchoolFilterComponent implements OnInit {

	@Input() title;

	constructor() { }

	ngOnInit() {
	}

	handleChange(e){
		// console.log("dddd", e.target.value)
	}
}
