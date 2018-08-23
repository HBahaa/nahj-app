import { map } from 'rxjs/operators';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EcontentOneService } from '../../../services/econtent/econtent-one.service';
import { EcontentTwoService } from '../../../services/econtent/econtent-two.service';
import { EcontentThreeService } from '../../../services/econtent/econtent-three.service';
import { EcontentFourService } from '../../../services/econtent/econtent-four.service';
import { evaluation } from '../../../services/MainAdminEvaluation/evaluation';

@Component({
  selector: 'app-level-filter',
  templateUrl: './level-filter.component.html',
  styleUrls: ['./level-filter.component.scss']
})
export class LevelFilterComponent implements OnInit {

	@Input() img: string;
	@Input() update: boolean;
	@Output() itemClicked = new EventEmitter();
	url: string = 'http://localhost:4466';
	level1 = [];
	level2 = [];
	level3 = [];
	level4 = [];
	selectedLevel1;
	selectedLevel2;
	selectedLevel3;
	selectedLevel4;
	evaluations = [];

	constructor(
		private econtentOneService: EcontentOneService,
		private econtentTwoService: EcontentTwoService,
		private econtentThreeService: EcontentThreeService,
		private econtentFourService: EcontentFourService,
		private evaluation: evaluation
	) { }

	ngOnInit() {
		this.getEvaluations();
		this.getContentData(undefined, undefined, undefined, undefined);
	}

	ngOnChanges(){
		this.getEvaluations();
	}

	handleItemClicked(item){
		this.itemClicked.emit(item);
	}

	getEvaluations(){
		this.evaluation.service({
			method: 'GET',
			url: this.url
		}).subscribe(data=>{
			if (this.selectedLevel1) {
				var evals = data['data'].evaluations.filter(evaluation => evaluation.speciificContentLevel.speciificContentLevelOne['name'] == this.selectedLevel1);
				if (this.selectedLevel2) {
					evals = evals.filter(item => item.speciificContentLevel.speciificContentLevelTwo['name'] == this.selectedLevel2);
					if (this.selectedLevel3) {
						evals = evals.filter(item => item.speciificContentLevel.speciificContentLevelThree['name'] == this.selectedLevel3);
						if (this.selectedLevel4) {
							evals = evals.filter(item => item.speciificContentLevel.speciificContentLevelFour['name'] == this.selectedLevel4);
						}
					}
				}
			}
			this.evaluations = evals
		})
	}
	/// get Functions
	getContentData(name1, name2, name3, name4){
		this.econtentOneService.service({
			method: 'GET',
			url: this.url
		}).subscribe(econtent1=>{
			this.level1 =  econtent1['data'].contentLevelOnes.map(object=> (({name, id, relativePercentage, contentLevelTwo})=>({name, relativePercentage}))(object));
			econtent1['data'].contentLevelOnes.map((l1, index1)=> {
				if (!name1 && index1 == 0) {
					this.selectedLevel1 = l1.name;
					this.level2 = l1.contentLevelTwo.filter(n => n.name != "" ).map(object=> (({name, id, relativePercentage, contentLevelThree})=>({name, relativePercentage}))(object));
					if (l1.contentLevelTwo.length > 0) {
						l1.contentLevelTwo.map((l2, index2)=>{
							if (!name2 && index2 == 0) {
								this.selectedLevel2 = l2.name;
								if (l2.contentLevelThree.length > 0) {
									this.level3 = l2.contentLevelThree.filter(n => n.name != "" ).map(object=> (({name, id, relativePercentage, contentLevelFour})=>({name, relativePercentage}))(object));
									l2.contentLevelThree.filter(n => n.name != "" ).map((l3, index3)=>{
										this.selectedLevel3=l3.name;
										if (!name3 && index3 == 0) {
											if (l3.contentLevelFour.length > 0) {
												this.level4 = l3.contentLevelFour.filter(n => n.name != "" ).map(object=> (({name, id, relativePercentage})=>({name, relativePercentage}))(object));
											}else{
												this.level4 = [];
											}
										}else if (name3 == l3.name) {
											if (l3.contentLevelFour.length > 0) {
												this.level4 = l3.contentLevelFour.filter(n => n.name != "" ).map(object=> (({name, id, relativePercentage})=>({name, relativePercentage}))(object));
											}else{
												this.level4 = [];
											}
										}
									})
								}else{
									this.level3 = [];
									this.level4 = [];
								}
							}else if (name2 == l2.name) {
								this.selectedLevel2 = l2.name;
								if (l2.contentLevelThree.length > 0) {
									this.level3 = l2.contentLevelThree.filter(n => n.name != "" ).map(object=> (({name, id, relativePercentage, contentLevelFour})=>({name, relativePercentage}))(object));
									l2.contentLevelThree.filter(n => n.name != "" ).map((l3, index3)=>{
										this.selectedLevel3=l3.name;
										if (!name3 && index3 == 0) {
											if (l3.contentLevelFour.length > 0) {
												this.level4 = l3.contentLevelFour.filter(n => n.name != "" ).map(object=> (({name, id, relativePercentage})=>({name, relativePercentage}))(object));
											}else{
												this.level4 = [];
											}
										}else if (name3 == l3.name) {
											if (l3.contentLevelFour.length > 0) {
												this.level4 = l3.contentLevelFour.filter(n => n.name != "" ).map(object=> (({name, id, relativePercentage})=>({name, relativePercentage}))(object));
											}else{
												this.level4 = [];
											}
										}
									})
								}else{
									this.level3 = [];
									this.level4 = [];
								}
							}
						})
					}else{
						this.selectedLevel2 = undefined;
						this.selectedLevel3 = undefined;
						this.level2 = [];
						this.level3 = [];
						this.level4 = [];
					}
				}else if (name1 == l1.name) {
					this.selectedLevel1 = l1.name;
					this.level1 = l1.id;
					this.level2 = l1.contentLevelTwo.filter(n => n.name != "" ).map(object=> (({name, id, relativePercentage, contentLevelTwo})=>({name, relativePercentage}))(object));
					if (l1.contentLevelTwo.length > 0) {
						l1.contentLevelTwo.map((l2, index2)=>{
							// this.selectedLevel2 = l2.name;
							if (!name2 && index2 == 0) {
								this.selectedLevel2 = l2.name;
								if (l2.contentLevelThree.length > 0) {
									this.level3 = l2.contentLevelThree.filter(n => n.name != "" ).map(object=> (({name, id, relativePercentage, contentLevelFour})=>({name, relativePercentage}))(object));
									l2.contentLevelThree.filter(n => n.name != "" ).map((l3, index3)=>{
										if (!name3 && index3 == 0) {
											this.selectedLevel3=l3.name;
											if (l3.contentLevelFour.length > 0) {
												this.level4 = l3.contentLevelFour.filter(n => n.name != "" ).map(object=> (({name, id, relativePercentage})=>({name, relativePercentage}))(object));
											}else{
												this.level4 = [];
											}
										}else if (name3 == l3.name) {
											this.selectedLevel3=l3.name;
											if (l3.contentLevelFour.length > 0) {
												this.level4 = l3.contentLevelFour.filter(n => n.name != "" ).map(object=> (({name, id, relativePercentage})=>({name, relativePercentage}))(object));
											}else{
												this.level4 = [];
											}
										}
									})
								}else{
									this.level3 = [];
									this.level4 = [];
								}
							}else if (name2 == l2.name) {
								this.selectedLevel2 = l2.name;
								if (l2.contentLevelThree.length > 0) {
									this.level3 = l2.contentLevelThree.filter(n => n.name != "" ).map(object=> (({name, id, relativePercentage, contentLevelFour})=>({name, relativePercentage}))(object));
									l2.contentLevelThree.filter(n => n.name != "" ).map((l3, index3)=>{
										if (!name3 && index3 == 0) {
											this.selectedLevel3=l3.name;
											if (l3.contentLevelFour.length > 0) {
												this.level4 = l3.contentLevelFour.filter(n => n.name != "" ).map(object=> (({name, id, relativePercentage})=>({name, relativePercentage}))(object));
											}else{
												this.level4 = [];
											}
										}else if (name3 == l3.name) {
											this.selectedLevel3=l3.name;
											if (l3.contentLevelFour.length > 0) {
												this.level4 = l3.contentLevelFour.filter(n => n.name != "" ).map(object=> (({name, id, relativePercentage})=>({name, relativePercentage}))(object));
											}else{
												this.level4 = [];
											}
										}
									})
								}else{
									this.level3 = [];
									this.level4 = [];
								}
							}
						})
					}else{
						this.selectedLevel2 = undefined;
						this.selectedLevel3 = undefined;
						this.level2 = [];
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
		switch($event.level){
			case "level1":
				this.selectedLevel1 = $event.value;
				this.getContentData(this.selectedLevel1, undefined, undefined, undefined);
				this.getEvaluations()
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
}
