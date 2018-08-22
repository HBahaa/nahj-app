import { map } from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core';
import { EvaluationSchema } from '../../../services/MainAdminEvaluation/evaluationSchema';

@Component({
  selector: 'app-evaluations',
  templateUrl: './evaluations.component.html',
  styleUrls: ['./evaluations.component.scss']
})
export class EvaluationsComponent implements OnInit {

	@Input() options = [];	
	@Input() grades = [];
	url : string = "http://localhost:4466";
	selectedEvaluationOption : string;

	constructor(
		private evaluationSchema: EvaluationSchema
	) { }

	ngOnInit() {
		this.getEvaluationOptions(undefined);
	}


	getEvaluationOptions(name){
		this.evaluationSchema.service({
			method: 'GET',
			url: this.url
		}).subscribe((data: any) => {
			this.options = data['data'].evaluationOptionses.map((option, index) =>{
				if(!name && index == 0){
					// this.selectedEvaluationOption = option.name;
					this.grades = option.grades.filter(n => n.name != "" ).map(object=> (({grade, id, weight})=>({grade, weight}))(object));
				}else if(option.name == name){
					// this.selectedEvaluationOption = option.name;
					this.grades = option.grades.filter(n => n.name != "" ).map(object=> (({grade, id, weight})=>({grade, weight}))(object));
				}
				return option.name;
			});
		});
	}

	getGrades($event){
		this.getEvaluationOptions($event.value || undefined);
		this.selectedEvaluationOption = $event.value 
	}

	addNewEvaluationOption($event){
		console.log("add eval", $event);
		switch($event.eventType){
			case "add" :
				this.evaluationSchema.service({
					method: 'PUT',
					url: this.url,
					name: $event.newValue
				}).subscribe((data: any) => {
					this.getEvaluationOptions(undefined)
				});
			
			break;
			case "update" :
				this.evaluationSchema.service({
					method: 'GET',
					url: this.url
				}).subscribe((data: any) => {
					data['data'].evaluationOptionses.map(option =>{
						if (option.name == $event.value) {
							console.log("equal", $event.newValue)
							this.evaluationSchema.service({
								method: 'POST',
								url: this.url,
								id: option.id,
								name: $event.newValue,
								Gname:"",
								Gwt: ""
							}).subscribe((data: any) => {
								console.log("data", data)
							});
						}
					});
				});
			break;
		}
	}
	addNewGrade($event){

	}
	deleteEvaluationOption($event){

	}


}
