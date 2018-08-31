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
		this.form = this.fb.group({
			title: [$event.title],
			shortTitle: [$event.shortTitle],
			currentStatus: [$event.currentStatus.id],
			accountWay: [$event.accountWay.id],
			level1: [$event.speciificContentLevel.speciificContentLevelOne['id']],
			level2: [$event.speciificContentLevel.speciificContentLevelTwo['id']],
			level3: [$event.speciificContentLevel.speciificContentLevelThree['id']],
			level4: [$event.speciificContentLevel.speciificContentLevelFour['id']]
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
	getContentData(name1, name2, name3, name4){
		this.econtentOneService.service({
			method: 'GET',
			url: this.url
		}).subscribe(econtent1=>{
			this.level1 = econtent1['data'].contentLevelOnes.map((l1, index1)=> {
				if (!name1 && index1 == 0) {
					this.selectedLevel1 = l1.name;
					this.level2 = l1.contentLevelTwo.map((l2, index2)=>{
						if (!name2 && index2 == 0) {
							this.selectedLevel2 = l2.name;
							if (l2.contentLevelThree.length > 0) {
								this.level3 = l2.contentLevelThree.filter(n => n.name != "" ).map((l3, index3)=>{
									this.selectedLevel3=l3.name;
									if (!name3 && index3 == 0) {
										if (l3.contentLevelFour.length > 0) {
											this.level4 = l3.contentLevelFour.filter(n => n.name != "" )
										}else{
											this.level4 = [];
										}
									}else if (name3 == l3.name) {
										if (l3.contentLevelFour.length > 0) {
											this.level4 = l3.contentLevelFour.filter(n => n.name != "" )
										}else{
											this.level4 = [];
										}
									}
									return l3;
								})
							}else{
								this.level3 = [];
								this.level4 = [];
							}
						}else if (name2 == l2.name) {
							this.selectedLevel2 = l2.name;
							if (l2.contentLevelThree.length > 0) {
								this.level3 =  l2.contentLevelThree.filter(n => n.name != "" ).map((l3, index3)=>{
									if (!name3 && index3 == 0) {
										this.selectedLevel3=l3.name;
										if (l3.contentLevelFour.length > 0) {
											this.level4 = l3.contentLevelFour.filter(n => n.name != "" )
										}else{
											this.level4 = [];
										}
									}else if (name3 == l3.name) {
										this.selectedLevel3=l3.name;
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
						return l2;
					})
				}else if (name1 == l1.name) {
					this.selectedLevel1 = l1.name;
					this.level2 = l1.contentLevelTwo.map((l2, index2)=>{
						if (!name2 && index2 == 0) {
							this.selectedLevel2 = l2.name;
							if (l2.contentLevelThree.length > 0) {
								this.level3 = l2.contentLevelThree.filter(n => n.name != "" ).map((l3, index3)=>{
									if (!name3 && index3 == 0) {
										this.selectedLevel3=l3.name;
										if (l3.contentLevelFour.length > 0) {
											this.level4 = l3.contentLevelFour.filter(n => n.name != "" )
										}else{
											this.level4 = [];
										}
									}else if (name3 == l3.name) {
										this.selectedLevel3=l3.name;
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
						}else if (name2 == l2.name) {
							this.selectedLevel2 = l2.name;
							if (l2.contentLevelThree.length > 0) {
								 this.level3 = l2.contentLevelThree.filter(n => n.name != "" ).map((l3, index3)=>{
									if (!name3 && index3 == 0) {
										this.selectedLevel3=l3.name;
										if (l3.contentLevelFour.length > 0) {
											this.level4 = l3.contentLevelFour.filter(n => n.name != "" )
										}else{
											this.level4 = [];
										}
									}else if (name3 == l3.name) {
										this.selectedLevel3=l3.name;
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
		this.econtentOneService.service({
			method: 'GET',
			url: this.url
		}).subscribe(econtent1=>{
			this.evaluation.service({
				method: "PUT",
				url: this.url,
				title: this.form.value.title,
				shortTitle: this.form.value.shortTitle,
				currentStatusId: this.form.value.currentStatus,
				accountWayId: this.form.value.accountWay,
				speciificContentLevelOneId: this.form.value.level1 ,
				speciificContentLevelTwoId: this.form.value.level2 || undefined,
				speciificContentLevelThreeId: this.form.value.level3 || undefined,
				speciificContentLevelFourId: this.form.value.level4 || undefined,
				questionGroupName: "",
				questionGroupWeight: ""
			}).subscribe(data=>{
				this.EvalAdd = true;
				this.updateFilter = true;
			})
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
			this.econtentOneService.service({
				method: 'GET',
				url: this.url
			}).subscribe(econtent1=>{
				econtent1['data'].contentLevelOnes.filter(l1=> l1.name == this.form.value.level1).map(l1 => {
					var l1ID = l1.id;
					l1.contentLevelTwo.filter(l2 => l2.name == this.form.value.level2).map(l2=>{
						var l2ID = l2.id
						l2.contentLevelThree.filter(l3 => l3.name == this.form.value.level3).map(l3=>{
							var l3ID = l3.id
							l3.contentLevelFour.filter(l4 => l4.name == this.form.value.level4).map(l4=>{
								var l4ID = l4.id
								this.evaluation.service({
									method: "POST",
									url: this.url,
									evaluationId:this.selectedEvaluation,
									title: this.form.value.title,
									shortTitle: this.form.value.shortTitle,
									currentStatusId: this.form.value.currentStatus,
									accountWayId: this.form.value.accountWay,
									speciificContentLevelOneId: l1ID,
									speciificContentLevelTwoId: l2ID,
									speciificContentLevelThreeId: l3ID,
									speciificContentLevelFourId: l4ID,
									questionGroupName: "",
									questionGroupWeight: ""
								}).subscribe(data=>{
									// console.log("data", data)
									this.EvalEdit = true;
									this.updateFilter = true;
								})
								
							})
						})
					})
				})
				this.updateFilter = false;
			})
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
			this.econtentOneService.service({
				method: 'GET',
				url: this.url
			}).subscribe(econtent1=>{
				econtent1['data'].contentLevelOnes.filter(l1=> l1.name == this.form.value.level1).map(l1 => {
					var l1ID = l1.id;
					l1.contentLevelTwo.filter(l2 => l2.name == this.form.value.level2).map(l2=>{
						var l2ID = l2.id
						l2.contentLevelThree.filter(l3 => l3.name == this.form.value.level3).map(l3=>{
							var l3ID = l3.id
							l3.contentLevelFour.filter(l4 => l4.name == this.form.value.level4).map(l4=>{
								var l4ID = l4.id
								this.evaluation.service({
									method: "POST",
									url: this.url,
									evaluationId:this.selectedEvaluation,
									title: this.form.value.title,
									shortTitle: this.form.value.shortTitle,
									currentStatusId: this.form.value.currentStatus,
									accountWayId: this.form.value.accountWay,
									speciificContentLevelOneId: l1ID,
									speciificContentLevelTwoId: l2ID,
									speciificContentLevelThreeId: l3ID,
									speciificContentLevelFourId: l4ID,
									questionGroupName: "",
									questionGroupWeight: ""
								}).subscribe(data=>{
									// console.log("data", data)
									this.questionType.service({
										method: "DELETE",
										url: this.url,
										Id:this.selectedQuestionGroup.id
									}).subscribe(data => {
										this.getQuestionGroups()
									})
									this.EvalEdit = true;
									this.updateFilter = true;
								})
							})
						})
					})
				})
				this.updateFilter = false;
			})
		}
	}
}
