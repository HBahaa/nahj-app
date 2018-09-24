import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { evaluation } from '../../../services/MainAdminEvaluation/evaluation';
import { EcontentOneService } from '../../../services/econtent/econtent-one.service';
import { EcontentTwoService } from '../../../services/econtent/econtent-two.service';
import { EcontentThreeService } from '../../../services/econtent/econtent-three.service';
import { EcontentFourService } from '../../../services/econtent/econtent-four.service';
import { EvalutionStatusService } from '../../../services/evaluationStatus/evalution-status.service';
import { questionType } from './../../../services/MainAdminEvaluation/questionType';
import { EvaluationSchema } from '../../../services/MainAdminEvaluation/evaluationSchema';
import { ConfigService } from '../../../services/config';


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
	updateFilter: boolean = false;
	form: FormGroup;
	questGroupForm: FormGroup;
	url: string;
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
	selectedQuestionGroup;

	constructor( 
		private fb: FormBuilder,
		private evaluation: evaluation,
		private questionType: questionType,
		private econtentOneService: EcontentOneService,
		private econtentTwoService: EcontentTwoService,
		private econtentThreeService: EcontentThreeService,
		private econtentFourService: EcontentFourService,
		private evalutionStatusService: EvalutionStatusService,
		private evaluationSchema: EvaluationSchema,
		private configService: ConfigService
	) {
		this.url = this.configService.url;
	}
 
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
		this.selectedEvaluation = undefined;
	}
	handleEditQuestionChanges(){
		this.questionEdit = ! this.questionEdit;
		this.questionAdd = true;
	}
	handleAddQuestionChanges(){
		this.questionAdd = ! this.questionAdd;
		this.questionEdit = true;
		this.questGroupForm = this.fb.group({
			name: ['', Validators.required],
			weight: ['', Validators.required],
		})
	}
	
	// list functions
	evaluationClicked($event){
		this.selectedEvaluation = $event.id;
		this.selectedQuestionGroup = undefined;
		this.questGroupForm = this.fb.group({
			name: [''],
			weight: [''],
		})
		this.form = this.fb.group({
			title: [$event.title],
			shortTitle: [$event.shortTitle],
			currentStatus: [$event.currentStatus.id],
			accountWay: [$event.accountWay.id],
			level1: [$event.speciificContentLevel.speciificContentLevelOne ? $event.speciificContentLevel.speciificContentLevelOne.id     :""],
			level2: [$event.speciificContentLevel.speciificContentLevelTwo ? $event.speciificContentLevel.speciificContentLevelTwo.id     :""],
			level3: [$event.speciificContentLevel.speciificContentLevelThree ? $event.speciificContentLevel.speciificContentLevelThree.id :""],
			level4: [$event.speciificContentLevel.speciificContentLevelFour ? $event.speciificContentLevel.speciificContentLevelFour.id   :""],
		});
		this.getQuestionGroups()
	}
	getQuestionGroupDetails(qGroup){
		this.selectedQuestionGroup = qGroup;
		this.questGroupForm = this.fb.group({
			name: [qGroup.name],
			weight: [qGroup.weight],
		})
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
				if(item.id == this.selectedEvaluation){
					this.questionGroups  =  item.questionGroup.filter(item => item.name !="");
				}
			})
		})
	}
	getContentData(id1, id2, id3, id4){
		this.econtentOneService.service({
			method: 'GET',
			url: this.url
		}).subscribe(econtent1=>{
			this.level1 = econtent1['data'].contentLevelOnes.map((l1, index1)=> {
				if (id1 == l1.id) {
					// this.selectedLevel1 = l1.name;
					this.level2 = l1.contentLevelTwo.map((l2, index2)=>{
						if (id2 == l2.id) {
							// this.selectedLevel2 = l2.name;
							if (l2.contentLevelThree.length > 0) {
								 this.level3 = l2.contentLevelThree.filter(n => n.name != "" ).map((l3, index3)=>{
									if (id3 == l3.id) {
										// this.selectedLevel3=l3.name;
										if (l3.contentLevelFour.length > 0) {
											this.level4 = l3.contentLevelFour.filter(n => n.name != "" )
										}else{
											this.level4 = [];
										}
									}
									return l3
								})
							}else{
								this.level3 = [];
								this.level4 = [];
							}
						}
						return l2
					})
				}
				return (({id, name})=>({id, name}))(l1)
				// return l1.name
			});
		})
	}

	handleLevelChange(level, e){
		this.getLevelData({'level': level, 'value': e.target.value })
	}
	getLevelData($event){
		switch($event.level){
			case "level1":
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
		// this.econtentOneService.service({
		// 	method: 'GET',
		// 	url: this.url
		// }).subscribe(econtent1=>{
			console.log("this.form.value", this.form.value)
			var levelName , levelId;
			// = this.form.value.level4 ? 'updateContentLevelFour' : this.form.value.level3 ? 'updateContentLevelThree' : this.form.value.level2 ? 'updateContentLevelTwo' : this.form.value.level1 ? 'updateContentLevelOne' : undefined

			if (this.form.value.level4) {
				levelName = 'updateContentLevelFour'
				levelId = this.form.value.level4
			}
			else if (this.form.value.level3) {
				levelName = 'updateContentLevelThree'
				levelId = this.form.value.level3
			}
			else if (this.form.value.level2) {
				levelName = 'updateContentLevelTwo'
				levelId = this.form.value.level2
			}
			else if (this.form.value.level1) {
				levelName = 'updateContentLevelOne'
				levelId = this.form.value.level1
			}

			console.log("levelId", levelId)
			console.log("levelName", levelName)
			this.evaluation.service({
				method: "PUT",
				url: this.url,
				title: this.form.value.title,
				shortTitle: this.form.value.shortTitle,
				currentStatus: this.form.value.currentStatus,
				// accountWayId: this.form.value.accountWay,
				levelName: levelName,
				id: levelId
				// speciificContentLevelOneId: this.form.value.level1 ,
				// speciificContentLevelTwoId: this.form.value.level2 || undefined,
				// speciificContentLevelThaddNewreeId: this.form.value.level3 || undefined,
				// speciificContentLevelFourId: this.form.value.level4 || undefined,
				// questionGroupName: "",
				// questionGroupWeight: ""
			}).subscribe(data=>{
				console.log("data", data)
				this.EvalAdd = true;
				this.updateFilter = true;
			})
		// })
		this.updateFilter = false;
	}
	addNewQuestionGroup(){
		if (this.selectedEvaluation) {
			if (this.questGroupForm.valid) {
				this.questionType.service({
					method: "PUT",
					url: this.url,
					name: this.questGroupForm.value.name,
                    weight: this.questGroupForm.value.weight,
                    evaluationId: this.selectedEvaluation
				}).subscribe(data => {
					this.getQuestionGroups()
					this.questionAdd = true;
				})
			}
		}

	}

	// edit functions
	editEvaluation(){
		if (this.selectedEvaluation) {
			this.evaluation.service({
				method: "GET",
				url: this.url
			}).subscribe(evals=>{
				var evaluation = evals['data'].evaluations.filter(evaluation => evaluation.id == this.selectedEvaluation)
				console.log("evaluation", evaluation)

				this.evaluation.service({
					method: "POST",
					url: this.url,
					evaluationId:this.selectedEvaluation,
					title: this.form.value.title,
					shortTitle: this.form.value.shortTitle,
					currentStatusId: this.form.value.currentStatus,
					accountWayId: this.form.value.accountWay,
					speciificContentLevelOneId: this.form.value.level1,
					speciificContentLevelTwoId: this.form.value.level2,
					speciificContentLevelThreeId: this.form.value.level3,
					speciificContentLevelFourId: this.form.value.level4,
					questionGroupName: "",
					questionGroupWeight: "",
					hadL1: evaluation[0].speciificContentLevel.speciificContentLevelOne  ?true:false,
					hadL2: evaluation[0].speciificContentLevel.speciificContentLevelTwo  ?true:false,
					hadL3: evaluation[0].speciificContentLevel.speciificContentLevelThree ?true:false,
					hadL4: evaluation[0].speciificContentLevel.speciificContentLevelFour ?true:false
				}).subscribe(data=>{
					console.log("edit", data)
					this.EvalEdit = true;
					this.updateFilter = true;
				})
			})
		
			this.updateFilter = false;
		}
	}
	EditQuestionGroup(){
		if (this.selectedQuestionGroup) {
			this.questionType.service({
				method: "POST",
				url: this.url,
				name: this.questGroupForm.value.name,
				weight: this.questGroupForm.value.weight,
				evaluationId: this.selectedEvaluation,
				id:this.selectedQuestionGroup.id
			}).subscribe(data => {
				this.getQuestionGroups()
				this.questionEdit = true;
			})
		}
	}


	// delete Functions
	deleteEvaluation(){
		if (this.selectedEvaluation) {
			this.evaluation.service({
				method: 'GET',
				url: this.url
			}).subscribe(data=>{
				data['data'].evaluations.map(item=>{
					if(item.id == this.selectedEvaluation){
						let questionGroupsID =  item.questionGroup.id;
						this.evaluation.service({
							method: "DELETE",
							url: this.url,
							id:this.selectedEvaluation
						}).subscribe(data=>{
							this.updateFilter = true;
							this.EvalEdit = true;
							this.questionType.service({
								method: "DELETE",
								url: this.url,
								Id: questionGroupsID
							}).subscribe(data => {
								this.updateFilter = true;
								this.questionGroups = []
								this.form = this.fb.group({
									title: [''],
									shortTitle: [''],
									currentStatus: [''],
									accountWay: [''],
									level1: [''],
									level2: [''],
									level3: [''],
									level4: ['']
								});
							})
						})
					}
				})
			})
			this.updateFilter = false;			
		}
	}

	deleteQuestionGroup(){
		console.log("dele g", this.selectedQuestionGroup)
		if (this.selectedEvaluation && this.selectedQuestionGroup) {
			this.questionType.service({
				method: "DELETE",
				url: this.url,
				Id:this.selectedQuestionGroup.id
			}).subscribe(data => {
				this.selectedQuestionGroup = undefined;
				
				this.getQuestionGroups()
				this.questGroupForm = this.fb.group({
					name: [''],
					weight: [''],
				})
			})
			this.EvalEdit = true;
			this.updateFilter = true;
			this.updateFilter = false;
		}
	}
}
