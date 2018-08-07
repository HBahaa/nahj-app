import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-level-card-list',
  templateUrl: './level-card-list.component.html',
  styleUrls: ['./level-card-list.component.scss']
})
export class LevelCardListComponent implements OnInit {

	@Input() data: any = [];
	@Input() img: string;

	show: boolean = true;
	selectedItem: any;

	constructor() {	}

	ngOnInit() {
	}

	listClick(event, newValue) {
	    this.selectedItem = newValue;
	}

	handleChanges(){
		this.show = ! this.show;
	}
}
