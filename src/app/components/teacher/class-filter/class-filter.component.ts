import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-class-filter',
  templateUrl: './class-filter.component.html',
  styleUrls: ['./class-filter.component.scss']
})
export class ClassFilterComponent implements OnInit {

	name: string;
	
	constructor() { }

	ngOnInit() {
	}

	SearchByName(){

	}

	handleClassChange(value){
		console.log("gegee", value)
	}

}
