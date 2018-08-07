import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-school-filter',
  templateUrl: './school-filter.component.html',
  styleUrls: ['./school-filter.component.scss']
})
export class SchoolFilterComponent implements OnInit {

	@Input() img: string;

	constructor() { }

	ngOnInit() {
	}

	handleChange(e){
	}
}
