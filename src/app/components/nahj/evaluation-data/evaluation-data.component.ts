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
	clearInputs(){
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
	}

	handleEditEvalChanges(){
		this.EvalEdit = ! this.EvalEdit;
	}
	handleAddEvalChanges(){
		this.EvalAdd = ! this.EvalAdd;
		 this.clearInputs()
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
			name: [''],
			weight: [''],
		})
	}
	
	// list functions
	evaluationClicked($event){
		this.selectedEvaluation = $event.item.evaluation.id;
		this.getContentData($event.level1, $event.level2, $event.level3, $event.level4)
		this.selectedQuestionGroup = undefined;
		this.questGroupForm = this.fb.group({
			name: [''],
			weight: [''],
		}) 
		this.questionGroups = $event.item.evaluation.questionGroup
		this.form = this.fb.group({
			title: [$event.item.evaluation.title],
			shortTitle: [$event.item.evaluation.shortTitle],
			currentStatus: $event.item.evaluation['currentStatus'].id,
			// accountWay: [$event.item.evaluation.accountWay.id],
			level1: $event.level1,
			level2: $event.level2,
			level3: $event.level3,
			level4: $event.level4,
		});
		// this.getQuestionGroups()
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
		this.questionType.service({
			method: 'GET',
			url: this.url
		}).subscribe(data=>{
			console.log("questionType", data)
			// data['data'].evaluations.map(item=>{
			// 	if(item.id == this.selectedEvaluation){
			// 		this.questionGroups  =  item.questionGroup.filter(item => item.name !="");
			// 	}
			// })
		})
	}
	getContentData(id1, id2, id3, id4){
		this.econtentOneService.service({
			method: 'GET',
			url: this.url
		}).subscribe(econtent1=>{
			this.level1 = econtent1['data'].contentLevelOnes.map((l1, index1)=> {
				if (id1 == l1.id) {
					this.level2 = l1.contentLevelTwo.map((l2, index2)=>{
						if (id2 == l2.id) {
							console.log("id2 == l2.id", id2 == l2.id)
							console.log("l2.contentLevelThree.length", l2.contentLevelThree.length)
							if (l2.contentLevelThree.length > 0) {
								this.level3 = l2.contentLevelThree.filter(n => n.name != "" ).map((l3, index3)=>{
									if (id3 == l3.id) {
										if (l3.contentLevelFour.length > 0) {
											this.level4 = l3.contentLevelFour
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
				return l1
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
				this.getContentData(this.selectedLevel1, this.selectedLevel2 ,$event.value, undefined);
			break;
		}
	}

	//add functions
	addNewEvaluation(){
		var levelName , levelId;

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
		this.evaluation.service({
			method: "PUT",
			url: this.url,
			title: this.form.value.title,
			shortTitle: this.form.value.shortTitle,
			currentStatus: this.form.value.currentStatus,
			accountWay: this.form.value.accountWay,
			levelName: levelName,
			id: levelId
		}).subscribe(data=>{
			this.clearInputs();
			this.EvalAdd = true;
			this.updateFilter = true;
		})
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
                    id: this.selectedEvaluation
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
				method: "POST",
				url: this.url,
				id:this.selectedEvaluation,
				title: this.form.value.title,
				shortTitle: this.form.value.shortTitle,
				currentStatus: this.form.value.currentStatus,
				accountWay: this.form.value.accountWay,
				// speciificContentLevelOneId: this.form.value.level1,
				// speciificContentLevelTwoId: this.form.value.level2,
				// speciificContentLevelThreeId: this.form.value.level3,
				// speciificContentLevelFourId: this.form.value.level4	
			}).subscribe(data=>{
				console.log("edit", data)
				this.EvalEdit = true;
				this.updateFilter = true;
				this.clearInputs()
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
				// this.getQuestionGroups()
				this.questionEdit = true;
			})
		}
	}


	// delete Functions
	deleteEvaluation(){
		if (this.selectedEvaluation) {
			console.log("selectedEvaluation", this.selectedEvaluation)
			this.evaluation.service({
				method: "DELETE",
				url: this.url,
				id:this.selectedEvaluation
			}).subscribe(data=>{
				console.log("data delete ", data)
				this.updateFilter = true;
				// this.EvalEdit = true;
				// this.questionType.service({
				// 	method: "DELETE",
				// 	url: this.url,
				// 	Id: questionGroupsID
				// }).subscribe(data => {
				// 	this.updateFilter = true;
				// 	this.questionGroups = []
				// 	this.form = this.fb.group({
				// 		title: [''],
				// 		shortTitle: [''],
				// 		currentStatus: [''],
				// 		accountWay: [''],
				// 		level1: [''],
				// 		level2: [''],
				// 		level3: [''],
				// 		level4: ['']
				// 	});
				// })
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
				id:this.selectedQuestionGroup.id
			}).subscribe(data => {
				console.log("deleteQuestionGroup", data)
				this.selectedQuestionGroup = undefined;
				// this.getQuestionGroups()
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
