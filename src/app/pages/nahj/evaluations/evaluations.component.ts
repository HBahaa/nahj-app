import { map } from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core';
import { EvaluationSchema } from '../../../services/MainAdminEvaluation/evaluationSchema';
import { ConfigService } from '../../../services/config';

@Component({
  selector: 'app-evaluations',
  templateUrl: './evaluations.component.html',
  styleUrls: ['./evaluations.component.scss']
})
export class EvaluationsComponent implements OnInit {

	@Input() options = [];	
	@Input() grades = [];
	url : string;
	selectedEvaluationOption : string;

	constructor(
		private evaluationSchema: EvaluationSchema,
		private configService: ConfigService
	) {  
		this.url = this.configService.url;
	}

	ngOnInit() {
		this.getEvaluationOptions(undefined);
	}


	getEvaluationOptions(id){
		this.evaluationSchema.service({
			method: 'GET',
			url: this.url
		}).subscribe((data: any) => {
			console.log("data['data'].evaluationOptionses", data['data'].evaluationOptionses)
			this.options = data['data'].evaluationOptionses.map((option, index) =>{
				// if(!id && index == 0){
				// 	// this.selectedEvaluationOption = option.name;
				// 	this.grades = option.grades.filter(n => n.grade != "" ).map(object=> (({grade, id, weight})=>({name:grade, relativePercentage:weight}))(object));
				// }else 
				if(option.id == id){
					// this.selectedEvaluationOption = option.name;
					this.grades = option.grades.filter(n => n.grade != "" ).map(object=> (({grade, id, weight})=>({name:grade, relativePercentage:weight}))(object));
				}
				return option;
			});
		});
	}

	getGrades($event){
		this.getEvaluationOptions($event.value['id'] || undefined);
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
								this.getEvaluationOptions(this.selectedEvaluationOption['id']);
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
				if (option.id == this.selectedEvaluationOption['id']) {
					let gwt = $event.newValue2.toString();
					switch ($event.eventType) {
						case "add":
							this.evaluationSchema.service({
								method: 'POST',
								url: this.url,
								id: option.id,
								name: this.selectedEvaluationOption['name'],
								Gid:"",
								Gname:$event.newValue1,
								Gwt: gwt
							}).subscribe((data: any) => {
								this.getEvaluationOptions(this.selectedEvaluationOption['id']);
							});
							break;
						case "update":
							option.grades.map(grade =>{
								if(grade.grade == $event.value){
									this.evaluationSchema.service({
										method: 'POST',
										url: this.url,
										id: option.id,
										name: this.selectedEvaluationOption['name'],
										Gid: grade.id,
										Gname: $event.newValue1,
										Gwt: gwt
									}).subscribe((data: any) => {
										this.getEvaluationOptions(this.selectedEvaluationOption['id']);
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
		this.evaluationSchema.service({
			method: 'GET',
			url: this.url
		}).subscribe((data: any) => {
			data['data'].evaluationOptionses.map(option =>{
				if (option.id == this.selectedEvaluationOption['id']) {
					option.grades.map(grade =>{
						if(grade.grade == $event.value){
							this.evaluationSchema.service({
								method: 'POST',
								url: this.url,
								id: option.id,
								name: this.selectedEvaluationOption['name'],
								Gid: grade.id,
								Gname: "",
								Gwt: ""
							}).subscribe((data: any) => {
								this.getEvaluationOptions(this.selectedEvaluationOption['id']);
							});
						}
					})
				}
			});
		});
	}
}
