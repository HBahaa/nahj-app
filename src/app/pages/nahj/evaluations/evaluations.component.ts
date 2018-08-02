import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-evaluations',
  templateUrl: './evaluations.component.html',
  styleUrls: ['./evaluations.component.scss']
})
export class EvaluationsComponent implements OnInit {

	@Input() options = ["تقييم ثلاثي (ممتاز)", "تقييم خماسي (ممتاز)", "تقييم وصفي"]	

	constructor() { }

	ngOnInit() {
	}



}
