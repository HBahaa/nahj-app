import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-students-filter',
  templateUrl: './students-filter.component.html',
  styleUrls: ['./students-filter.component.scss']
})
export class StudentsFilterComponent implements OnInit {
	@Input() img: string;
	@Input() title: string;

	constructor() { }

	ngOnInit() {
	}

	handleLevel1Change(level1){

	}
	handleLevel2Change(level2){

	}
	handleLevel3Change(level3){

	}
	SearchByName(name){

	}

}
