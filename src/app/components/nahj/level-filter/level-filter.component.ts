import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-level-filter',
  templateUrl: './level-filter.component.html',
  styleUrls: ['./level-filter.component.scss']
})
export class LevelFilterComponent implements OnInit {

	@Input() img: string;
	
	levels = {
		level1:'',
		level2:'',
		level3:'',
		level4:''
	}

	constructor() { }

	ngOnInit() {
	} 

	handleLevelChange(e){
		console.log(e.target.value)
	}
}
