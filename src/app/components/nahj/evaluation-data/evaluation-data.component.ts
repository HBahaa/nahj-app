import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { evaluation } from '../../../services/MainAdminEvaluation/evaluation';
import { questionDetails } from '../../../services/MainAdminEvaluation/questionsDetails';
import { EcontentOneService } from '../../../services/econtent/econtent-one.service';
import { EcontentTwoService } from '../../../services/econtent/econtent-two.service';
import { EcontentThreeService } from '../../../services/econtent/econtent-three.service';
import { EcontentFourService } from '../../../services/econtent/econtent-four.service';
import { EvalutionStatusService } from '../../../services/evaluationStatus/evalution-status.service';
import { EvaluationSchema } from '../../../services/MainAdminEvaluation/evaluationSchema';


@Component({
  selector: 'app-evaluation-data',
  templateUrl: './evaluation-data.component.html',
  styleUrls: ['./evaluation-data.component.scss']
})
export class EvaluationDataComponent implements OnInit {

	EvalEdit: boolean = true;
	EvalAdd: boolean = true;
	questionEdit: boolean = true;
	questionAdd: boolean = true;
	form: FormGroup;
	questGroupForm: FormGroup;
	url: string = 'http://localhost:4466';
	level1 = [];
	level2 = [];
	level3 = [];
	level4 = [];
	evalStatus = [];
	evalOptions = [];
	questionGroups= [];
	selectedLevel1;
	selectedLevel2;
	selectedLevel3;
	selectedLevel4;
	selectedEvaluation;

	constructor( 
		private fb: FormBuilder,
		private evaluation: evaluation,
		private questionDetails: questionDetails,
		private econtentOneService: EcontentOneService,
		private econtentTwoService: EcontentTwoService,
		private econtentThreeService: EcontentThreeService,
		private econtentFourService: EcontentFourService,
		private evalutionStatusService: EvalutionStatusService,
		private evaluationSchema: EvaluationSchema
	) {}
 
	ngOnInit() {
		this.form = this.fb.group({
			title: ['', Validators.required],
			shortTitle: ['', Validators.required],
			currentStatus: ['', Validators.required],
			accountWay: ['', Validators.required],
			level1: ['', Validators.required],
			level2: ['', Validators.required],
			level3: ['', Validators.required],
			level4: ['', Validators.required]
		});
		this.questGroupForm = this.fb.group({
			name: ['', Validators.required],
			weight: ['', Validators.required],
		})
		this.getContentData(undefined, undefined, undefined, undefined);
		this.getEvaluationStatus();
		this.getEvaluationOptions();
	}

	SaveEvaluation() {
		console.log("submit", this.form.value)
	    if (this.form.valid) {
	    	console.log(this.form.value);
	    }
	}

	handleEditEvalChanges(){
		this.EvalEdit = ! this.EvalEdit;
	}
	handleAddEvalChanges(){
		this.EvalAdd = ! this.EvalAdd;
		this.form = this.fb.group({
			title: ['', Validators.required],
			shortTitle: ['', Validators.required],
			currentStatus: ['', Validators.required],
			accountWay: ['', Validators.required],
			level1: ['', Validators.required],
			level2: ['', Validators.required],
			level3: ['', Validators.required],
			level4: ['', Validators.required]
		});
	}
	handleEditQuestionChanges(){
		this.questionEdit = ! this.questionEdit;
	}
	handleAddQuestionChanges(){
		this.questionAdd = ! this.questionAdd;
		this.questGroupForm = this.fb.group({
			name: ['', Validators.required],
			weight: ['', Validators.required],
		})
	}
	
	// list functions
	evaluationClicked($event){
		console.log("evaluationClicked", $event);
		this.selectedEvaluation = $event.name;
		this.form = this.fb.group({
			title: [$event.title, Validators.required],
			shortTitle: [$event.shortTitle, Validators.required],
			currentStatus: [$event.currentStatus.id, Validators.required],
			accountWay: [$event.accountWay.id, Validators.required],
			level1: [$event.speciificContentLevel.speciificContentLevelOne['id'], Validators.required],
			level2: [$event.speciificContentLevel.speciificContentLevelTwo['id'], Validators.required],
			level3: [$event.speciificContentLevel.speciificContentLevelThree['id'], Validators.required],
			level4: [$event.speciificContentLevel.speciificContentLevelFour['id'], Validators.required]
		});
	}
	
	/// get Functions

	getEvaluationStatus(){
		this.evalutionStatusService.service({
			method: "GET",
			url: this.url
		}).subscribe(data=>{
			this.evalStatus = data['data'].evaluationStatuses;
		})
	}
	getEvaluationOptions(){
		this.evaluationSchema.service({
			method: 'GET',
			url: this.url
		}).subscribe((data: any) => {
			this.evalOptions = data['data'].evaluationOptionses.map(object => (({id, name, grades})=>({id, name}))(object));
		});
	}
	getQuestionGroups(){
		this.evaluation.service({
			method: 'GET',
			url: this.url
		}).subscribe(data=>{
			data['data'].evaluations.map(item=>{
				if(item.title == this.selectedEvaluation){
					
				}
			})
		})
	}
	getContentData(name1, name2, name3, name4){
		this.econtentOneService.service({
			method: 'GET',
			url: this.url
		}).subscribe(econtent1=>{
			this.level1 =  econtent1['data'].contentLevelOnes.map(object=> (({name, id, relativePercentage, contentLevelTwo})=>({id, name}))(object));
			econtent1['data'].contentLevelOnes.map((l1, index1)=> {
				if (!name1 && index1 == 0) {
					this.selectedLevel1 = l1.name;
					this.level2 = l1.contentLevelTwo.filter(n => n.name != "" ).map(object=> (({name, id, relativePercentage, contentLevelThree})=>({id, name}))(object));
					if (l1.contentLevelTwo.length > 0) {
						l1.contentLevelTwo.map((l2, index2)=>{
							if (!name2 && index2 == 0) {
								this.selectedLevel2 = l2.name;
								if (l2.contentLevelThree) {
									this.level3 = l2.contentLevelThree.filter(n => n.name != "" ).map(object=> (({name, id, relativePercentage, contentLevelFour})=>({id, name}))(object));
									l2.contentLevelThree.filter(n => n.name != "" ).map((l3, index3)=>{
										this.selectedLevel3=l3.name;
										if (!name3 && index3 == 0) {
											if (l3.contentLevelFour) {
												this.level4 = l3.contentLevelFour.filter(n => n.name != "" ).map(object=> (({name, id, relativePercentage})=>({id, name}))(object));
											}
										}else if (name3 == l3.name) {
											if (l3.contentLevelFour) {
												this.level4 = l3.contentLevelFour.filter(n => n.name != "" ).map(object=> (({name, id, relativePercentage})=>({id, name}))(object));
											}
										}
									})
								}
							}else if (name2 == l2.name) {
								this.selectedLevel2 = l2.name;
								if (l2.contentLevelThree) {
									this.level3 = l2.contentLevelThree.filter(n => n.name != "" ).map(object=> (({name, id, relativePercentage, contentLevelFour})=>({id, name}))(object));
									l2.contentLevelThree.filter(n => n.name != "" ).map((l3, index3)=>{
										this.selectedLevel3=l3.name;
										if (!name3 && index3 == 0) {
											if (l3.contentLevelFour) {
												this.level4 = l3.contentLevelFour.filter(n => n.name != "" ).map(object=> (({name, id, relativePercentage})=>({id, name}))(object));
											}
										}else if (name3 == l3.name) {
											if (l3.contentLevelFour) {
												this.level4 = l3.contentLevelFour.filter(n => n.name != "" ).map(object=> (({name, id, relativePercentage})=>({id, name}))(object));
											}
										}
									})
								}
							}
						})
					}else{
						this.selectedLevel2 = undefined;
						this.selectedLevel3 = undefined;
						this.level3 = [];
						this.level4 = [];
					}
				}else if (name1 == l1.name) {
					this.selectedLevel1 = l1.name;
					console.log("selectedLevel1", this.selectedLevel1)
					this.level2 = l1.contentLevelTwo.filter(n => n.name != "" ).map(object=> (({name, id, relativePercentage, contentLevelTwo})=>({id, name}))(object));
					if (l1.contentLevelTwo.length > 0) {
						l1.contentLevelTwo.map((l2, index2)=>{
							this.selectedLevel2 = l2.name;
							if (!name2 && index2 == 0) {
								this.selectedLevel2 = l2.name;
								if (l2.contentLevelThree) {
									this.level3 = l2.contentLevelThree.filter(n => n.name != "" ).map(object=> (({name, id, relativePercentage, contentLevelFour})=>({id, name}))(object));
									l2.contentLevelThree.filter(n => n.name != "" ).map((l3, index3)=>{
										if (!name3 && index3 == 0) {
											this.selectedLevel3=l3.name;
											if (l3.contentLevelFour) {
												this.level4 = l3.contentLevelFour.filter(n => n.name != "" ).map(object=> (({name, id, relativePercentage})=>({id, name}))(object));
											}
										}else if (name3 == l3.name) {
											this.selectedLevel3=l3.name;
											if (l3.contentLevelFour) {
												this.level4 = l3.contentLevelFour.filter(n => n.name != "" ).map(object=> (({name, id, relativePercentage})=>({id, name}))(object));
											}
										}
									})
								}
							}else if (name2 == l2.name) {
								this.selectedLevel2 = l2.name;
								if (l2.contentLevelThree) {
									this.level3 = l2.contentLevelThree.filter(n => n.name != "" ).map(object=> (({name, id, relativePercentage, contentLevelFour})=>({id, name}))(object));
									l2.contentLevelThree.filter(n => n.name != "" ).map((l3, index3)=>{
										if (!name3 && index3 == 0) {
											this.selectedLevel3=l3.name;
											if (l3.contentLevelFour) {
												this.level4 = l3.contentLevelFour.filter(n => n.name != "" ).map(object=> (({name, id, relativePercentage})=>({id, name}))(object));
											}
										}else if (name3 == l3.name) {
											this.selectedLevel3=l3.name;
											if (l3.contentLevelFour) {
												this.level4 = l3.contentLevelFour.filter(n => n.name != "" ).map(object=> (({name, id, relativePercentage})=>({id, name}))(object));
											}
										}
									})
								}
							}
						})
					}else{
						this.selectedLevel2 = undefined;
						this.selectedLevel3 = undefined;
						this.level3 = [];
						this.level4 = [];
					}
				}
			})
		})
	}

	handleLevelChange(level, e){
		this.getLevelData({'level': level, 'value': e.target.value })
	}
	getLevelData($event){
		console.log("level", $event)
		switch($event.level){
			case "level1":
				console.log("equal 1")
				this.selectedLevel1 = $event.value;
				this.getContentData(this.selectedLevel1, undefined, undefined, undefined);
			break;
			case "level2":
				this.selectedLevel2 = $event.value;
				this.getContentData(this.selectedLevel1, this.selectedLevel2, undefined, undefined);
			break;
			case "level3":
				this.selectedLevel3 = $event.value;
				this.getContentData(this.selectedLevel3, this.selectedLevel2,$event.value, undefined);
			break;
		}

	}

	//add functions
	addNewEvaluation(){
		this.evaluation.service({
			method: "PUT",
			url: this.url,
			title: this.form.value.title,
			shortTitle: this.form.value.shortTitle,
			currentStatusId: this.form.value.currentStatus,
			accountWayId: this.form.value.accountWay,
			speciificContentLevelOneId: this.form.value.level1,
			speciificContentLevelTwoId: this.form.value.level2,
			speciificContentLevelThreeId: this.form.value.level3,
			speciificContentLevelFourId: this.form.value.level4,
			questionGroupName: "",
			questionGroupWeight: ""
		}).subscribe(data=>{
			this.EvalAdd = false;
			this.EvalEdit = false;

		})
	}
	addNewQuestionGroup(){

	}
}
