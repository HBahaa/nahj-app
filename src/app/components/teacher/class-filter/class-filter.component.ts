import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-class-filter',
  templateUrl: './class-filter.component.html',
  styleUrls: ['./class-filter.component.scss']
})
export class ClassFilterComponent implements OnInit {

	@Input() img: string;
	name: string;

	constructor() { }

	ngOnInit() {
	}

	SearchByName(){
	}

	handleClassChange(value){
	}

}
