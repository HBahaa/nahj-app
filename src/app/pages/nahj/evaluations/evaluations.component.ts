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
					this.grades = option.grades.filter(n => n.grade != "" ).map(object=> (({grade, id, weight})=>({name:grade, relativePercentage:weight}))(object));
				}else if(option.name == name){
					// this.selectedEvaluationOption = option.name;
					this.grades = option.grades.filter(n => n.grade != "" ).map(object=> (({grade, id, weight})=>({name:grade, relativePercentage:weight}))(object));
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
							this.evaluationSchema.service({
								method: 'POST',
								url: this.url,
								id: option.id,
								name: $event.newValue,
								Gid:"",
								Gname:"",
								Gwt: ""
							}).subscribe((data: any) => {
								this.getEvaluationOptions(this.selectedEvaluationOption);
							});
						}
					});
				});
			break;
		}
	}
	addNewGrade($event){
		this.evaluationSchema.service({
			method: 'GET',
			url: this.url
		}).subscribe((data: any) => {
			data['data'].evaluationOptionses.map(option =>{
				if (option.name == this.selectedEvaluationOption) {
					let gwt = $event.newValue2.toString();
					switch ($event.eventType) {
						case "add":
							this.evaluationSchema.service({
								method: 'POST',
								url: this.url,
								id: option.id,
								name: this.selectedEvaluationOption,
								Gid:"",
								Gname:$event.newValue1,
								Gwt: gwt
							}).subscribe((data: any) => {
								this.getEvaluationOptions(this.selectedEvaluationOption);
							});
							break;
						case "update":
							option.grades.map(grade =>{
								if(grade.grade == $event.value){
									this.evaluationSchema.service({
										method: 'POST',
										url: this.url,
										id: option.id,
										name: this.selectedEvaluationOption,
										Gid: grade.id,
										Gname: $event.newValue1,
										Gwt: gwt
									}).subscribe((data: any) => {
										this.getEvaluationOptions(this.selectedEvaluationOption);
									});
								}
							})
							break;
					}
				}
			});
		});
	}
	deleteEvaluationOption($event){
		console.log("eval ppt", $event)
		this.evaluationSchema.service({
			method: 'GET',
			url: this.url
		}).subscribe((data: any) => {
			data['data'].evaluationOptionses.map(option =>{
				if (option.name == $event.value) {
					this.evaluationSchema.service({
						method: 'DELETE',
						url: this.url,
						id: option.id
					}).subscribe(res =>{
						this.getEvaluationOptions(undefined);
					})
				}
			});
		});
	}
	deleteGrade($event){
		console.log("grade", $event)
		this.evaluationSchema.service({
			method: 'GET',
			url: this.url
		}).subscribe((data: any) => {
			data['data'].evaluationOptionses.map(option =>{
				if (option.name == this.selectedEvaluationOption) {
					option.grades.map(grade =>{
						if(grade.grade == $event.value){
							this.evaluationSchema.service({
								method: 'POST',
								url: this.url,
								id: option.id,
								name: this.selectedEvaluationOption,
								Gid: grade.id,
								Gname: "",
								Gwt: ""
							}).subscribe((data: any) => {
								this.getEvaluationOptions(this.selectedEvaluationOption);
							});
						}
					})
				}
			});
		});
	}
}
