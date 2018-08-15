import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { ELevelsOneService } from '../../../services/elevels/elevelsOne.service';
import { ELevelsTwoService } from '../../../services/elevels/elevelsTwo.service';
import { ELevelsThreeService } from '../../../services/elevels/elevelsThree.service';


@Component({
  selector: 'app-school-filter',
  templateUrl: './school-filter.component.html',
  styleUrls: ['./school-filter.component.scss']
})
export class SchoolFilterComponent implements OnInit {

	@Input() img: string;
	url = 'http://localhost:4466';
	level1=[];
	level2=[];
	level3=[];
	result=[];
	selectedLevel1;
	selectedLevel2;
	selectedLevel3;
	selectedItem;

	@Output() filterChange = new EventEmitter();
	@Output() itemDetails = new EventEmitter();
	@Output() deleteButton = new EventEmitter();
	@Output() editButton = new EventEmitter();
	@Output() addButton = new EventEmitter();


	constructor(
		private elevelsOne: ELevelsOneService,
		private elevelsTwo: ELevelsTwoService,
		private elevelsThree: ELevelsThreeService
	) { }

	ngOnInit() {
		this.getAllLevels(undefined, undefined);
	}

	///   get data functions
	getAllLevels(name1, name2) {
		this.elevelsOne.service({
			method: 'GET',
			url: this.url
		}).subscribe(data => {
			this.level1 = data['data'].levelOnes.map((level1, index1)=>{
				if (!name1 && index1 == 0) {
					this.selectedLevel1 = level1.name;
					this.level2 = level1['LevelTwo'].filter(n => n.name != "" ).map((level2, index2)=> {
						if (index2 == 0) {
							this.selectedLevel2 = level2['name'];
							if (level2['levelThree']) {
								this.level3 = level2['levelThree'].filter(n => n.name != "" ).map((level3, index3)=> {
									if(index3 == 0){
										this.selectedLevel3 = level3['name']
									}
									return level3.name;
								});
							}
						}
						return level2.name
					});
				}else if (name1 == level1.name) {
					this.level2 = level1['LevelTwo'].filter(n => n.name != "" ).map((level2, index2)=> {
						if (!name2 && index2 == 0) {
							this.selectedLevel2 = level2['name'];
							if (level2['levelThree']) {
								this.level3 = level2['levelThree'].filter(n => n.name != "" ).map((level3, index3)=> {
									if(index3 == 0){
										this.selectedLevel3 = level3['name']
									}
									return level3.name;
								});
							}
						}else if (name2 == level2.name) {
							this.selectedLevel2 = level2['name'];
							if (level2['levelThree']) {
								this.level3 = level2['levelThree'].filter(n => n.name != "" ).map((level3, index3)=> {
									if(index3 == 0){
										this.selectedLevel3 = level3['name']
									}
									return level3.name;
								});
							}
						}
						return level2.name;
					});
				}
				return level1.name;

			});
			
		});
	}

	getLevelData($event){
		switch($event.level){
			case "level1":
				this.selectedLevel1 = $event.value;
				this.getAllLevels($event.value, undefined);
			break;
			case "level2":
				this.selectedLevel2 = $event.value;
				this.getAllLevels(this.selectedLevel1, this.selectedLevel2);
			break;
		}

	}

	itemClicked(item) {
	    this.selectedItem = item;
	    this.itemDetails.emit({ value: item });
	}

	handleChange(level, e){
		this.getLevelData({'level': level, 'value': e.target.value })
	}
	addSchool(){
		this.addButton.emit();
	}
	editSchool(){
		this.editButton.emit({})
	}
	deleteSchool(){
		this.deleteButton.emit({})
	}
}
