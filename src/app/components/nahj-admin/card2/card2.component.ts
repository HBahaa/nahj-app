import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card2',
  templateUrl: './card2.component.html',
  styleUrls: ['./card2.component.scss']
})
export class Card2Component implements OnInit {

	@Input() title: string;
	@Input() color: string;
	@Input() className: string;
	@Input() data: any = [];

	show: boolean = true;

	constructor() {	}

	ngOnInit() {
	}

	handleChanges(){
		this.show = ! this.show;
	}
}
