import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss']
})
export class EntitiesComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

	level1 = ["المدارس اﻷهلية", "المدارس اﻷهلية", "المدارس اﻷهلية", "المدارس اﻷهلية"];
	level2 = ["منطقة الرياض", "منطقة الرياض", "منطقة الرياض", "منطقة الرياض"];
	level3 = ["المدارس المشتركة بالفعل", "المدارس المشتركة بالفعل", "المدارس المشتركة بالفعل", "المدارس المشتركة بالفعل"];

}
