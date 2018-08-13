import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-level-card',
  templateUrl: './level-card.component.html',
  styleUrls: ['./level-card.component.scss']
})
export class LevelCardComponent implements OnInit {

	@Input() title: string;
	@Input() img: string;
	@Input() data: any = [];
	show: boolean = true;
	
	constructor() { }

	ngOnInit() {
	}
	handleChanges(){
		this.show = ! this.show;
	}
}
