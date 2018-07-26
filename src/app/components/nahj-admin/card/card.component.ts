import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

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
