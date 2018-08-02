import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evaluation-options',
  templateUrl: './evaluation-options.component.html',
  styleUrls: ['./evaluation-options.component.scss']
})
export class EvaluationOptionsComponent implements OnInit {

	show: boolean = true;

	constructor() { }

	ngOnInit() {
	}

	handleChanges(){
		this.show = ! this.show;
	}
}
