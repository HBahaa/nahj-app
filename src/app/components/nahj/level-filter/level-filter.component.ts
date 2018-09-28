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

	ngOnChanges() {
		this.getEvaluations();
	}

	handleItemClicked(item) {
		this.itemClicked.emit(item);
	}
	/// get Functions

	getEvaluations() {
		this.evaluation.service({
			method: 'GET',
			url: this.url
		}).subscribe(data => {
			if (this.selectedLevel1) {
				this.evaluations = []
				this.evaluations = data['data'].contentLevelOnes.filter(level1 => {
					if(level1.id == this.selectedLevel1)
					    return level1.evaluation
				});
			}

			if (this.selectedLevel2) {
				this.evaluations=[]
				this.evaluations = data['data'].contentLevelTwoes.filter(level2 => {
					if(level2.id == this.selectedLevel2)
					    return level2.evaluation
				});
			}

			if (this.selectedLevel3) {
				this.evaluations=[]				
				this.evaluations = data['data'].contentLevelThrees.filter(level3 => {
					if(level3.id == this.selectedLevel3)
					    return level3.evaluation
				});
			}
			if (this.selectedLevel4) {
				this.evaluations=[]				
				this.evaluations = data['data'].contentLevelFours.filter(level4 => {
					if(level4.id == this.selectedLevel4)
					    return level4.evaluation
				});
			}
			console.log("evaluations ===", this.evaluations)
		})
	}

	getContentData(id1, id2, id3, id4) {
		this.econtentOneService.service({
			method: 'GET',
			url: this.url
		}).subscribe(econtent1 => {
			this.level1 = econtent1['data'].contentLevelOnes.map((l1, index1) => {
				if (id1 == l1.id) {
					this.level2 = l1.contentLevelTwo.map((l2, index2) => {
						if (id2 == l2.id) {
							if (l2.contentLevelThree.length > 0) {
								this.level3 = l2.contentLevelThree.filter(n => n.name != "").map((l3, index3) => {
									if (id3 == l3.id) {
										if (l3.contentLevelFour.length > 0) {
											this.level4 = l3.contentLevelFour.filter(n => n.name != "")
										}
									} else {
										this.level4 = [];
									}
									return l3
								})
							}
						}else{
							this.level3 = [];
							this.level4 = [];
						}
						return l2
					})
				}
				return l1
			});
		})
	}

	handleLevelChange(level, e) {
		this.getLevelData({ 'level': level, 'value': e.target.value })
	}
	getLevelData($event) {
		switch ($event.level) {
			case "level1":
				this.selectedLevel1 = $event.value;
				this.getContentData(this.selectedLevel1, undefined, undefined, undefined);
				this.selectedLevel2 = undefined;
				this.selectedLevel3 = undefined;
				this.selectedLevel4 = undefined;
				break;
			case "level2":
				this.selectedLevel2 = $event.value;
				this.selectedLevel3 = undefined;
				this.selectedLevel4 = undefined;
				this.getContentData(this.selectedLevel1, this.selectedLevel2, undefined, undefined);
				break;
			case "level3":
				this.selectedLevel3 = $event.value;
				this.selectedLevel4 = undefined;
				this.getContentData(this.selectedLevel3, this.selectedLevel2, $event.value, undefined);
				break;
		}
		this.evaluations=[]
		this.getEvaluations();
	}
}
