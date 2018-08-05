import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.scss']
})
export class LevelsComponent implements OnInit {

	constructor() { }

	ngOnInit() {}
	
	level1 = ["وحدات المستوي اﻷول", "وحدات المستوي الثاني", "مواد الواقع المعزز", "منهج تطوير الفكر"];
	level2 = ["الوحدة اﻷولي روضتي", "الوحدة الثانية (أسرتي)", "الوحدة الثالثة", "الوحدة الرابعة"];
	level3 = ["قصص سلسلة العلوم", "قصص سلسلة الادا و السلوك", "اﻷلعاب", "اﻷناسيد"];
	level4 = ["قصة أعرف عنواني", "قصة من أنا", "قصة اغسل ملابسي"]
}
