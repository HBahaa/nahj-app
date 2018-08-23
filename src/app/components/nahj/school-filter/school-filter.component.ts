import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { ELevelsOneService } from '../../../services/elevels/elevelsOne.service';
import { ELevelsTwoService } from '../../../services/elevels/elevelsTwo.service';
import { ELevelsThreeService } from '../../../services/elevels/elevelsThree.service';
import { SchoolService } from '../../../services/school/school.service';

@Component({
  selector: 'app-school-filter',
  templateUrl: './school-filter.component.html',
  styleUrls: ['./school-filter.component.scss']
})
export class SchoolFilterComponent implements OnInit {

	@Input() img: string;
	@Input() update: string;
	url = 'http://localhost:4466';
	level1=[];
	level2=[];
	level3=[];
	result=[];
	selectedLevel1;
	selectedLevel2;
	selectedLevel3;
	selectedItem;
	selectedItemName;
	add: boolean = true;
	edit: boolean = true;

	@Output() filterChange = new EventEmitter();
	@Output() itemDetails = new EventEmitter();
	@Output() deleteButton = new EventEmitter();
	@Output() editButton = new EventEmitter();
	@Output() addButton = new EventEmitter();
	@Output() clearFormFields = new EventEmitter();


	constructor(
		private elevelsOne: ELevelsOneService,
		private elevelsTwo: ELevelsTwoService,
		private elevelsThree: ELevelsThreeService,
		private schoolService: SchoolService
	) { }

	ngOnInit() {
		this.getAllLevels(undefined, undefined);
	}
	ngOnChanges(){
		//when update input changes this function runs
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
					this.schoolService.service({
						method: 'GET',
						url: this.url
					}).subscribe(schools =>{
						this.result = []
						schools['data'].schools.map(data=> {
							if(data.levels.name == level1.name){
								this.result.push(data);
							}
						})
					});
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
					this.schoolService.service({
						method: 'GET',
						url: this.url
					}).subscribe(schools =>{
						this.result = []
						schools['data'].schools.map(data=> {
							if(data.levels.name == level1.name){								
								this.result.push(data);
							}
						})
					});
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
		this.add = true;
		this.edit = true;
	    this.selectedItemName = item.name;
	    this.selectedItem = item;
		this.itemDetails.emit(item);
	}

	handleChange(level, e){
		this.getLevelData({'level': level, 'value': e.target.value })
	}
	addClicked(){
		this.add = false;
		this.clearFormFields.emit();
	}
	editClicked(){
		this.edit = false;
	}
	addSchool(){
		this.addButton.emit();
		this.add = true;
	}
	editSchool(){
		this.editButton.emit(this.selectedItem);
		this.edit = true;
	}
	deleteSchool(item){
		this.deleteButton.emit(this.selectedItem)
	}
}
