import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-students-filter',
  templateUrl: './students-filter.component.html',
  styleUrls: ['./students-filter.component.scss']
})
export class StudentsFilterComponent implements OnInit {

	@Input() img: string;
	@Input() title: string;
	@Input() data: any = [];
	// @Input() update: boolean;
	@Output() itemClicked = new EventEmitter();

	constructor() { }

	ngOnInit() {
	}

	handleItemClicked(item){
		console.log("handleItemClicked", item)
		this.itemClicked.emit({item});
	}

	handleLevel1Change(level1){

	}
	handleLevel2Change(level2){

	}
	handleLevel3Change(level3){

	}

}
