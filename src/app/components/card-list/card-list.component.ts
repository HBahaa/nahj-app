import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

	@Input() title: string;
	@Input() img: string;
	@Input() data: any = [];

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
