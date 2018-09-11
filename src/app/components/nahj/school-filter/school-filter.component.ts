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
	schoolName = '';

	@Output() filterChange = new EventEmitter();
	@Output() itemDetails = new EventEmitter();
	@Output() deleteButton = new EventEmitter();
	@Output() editButton = new EventEmitter();
	@Output() addButton = new EventEmitter();
	@Output() clearFormFields = new EventEmitter();
	@Output() addContentFlag = new EventEmitter()

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

	searchBySchoolName(){

	}

	///   get data functions
	getAllLevels(id1, id2) {
		this.elevelsOne.service({
			method: 'GET',
			url: this.url
		}).subscribe(data => {
			console.log("data", data);
			this.level1 = data['data'].levelOnes.map((level1, index1)=>{
				if (!id1 && index1 == 0) {
					this.selectedLevel1 = level1.id;
					this.getSchool('level1', level1.id)
					this.level2 = level1['LevelTwo'].filter(n => n.id != "" ).map((level2, index2)=> {
						if (index2 == 0) {
							this.selectedLevel2 = level2['id'];
							this.getSchool('level2', level2.id)
							if (level2['levelThree']) {
								this.level3 = level2['levelThree'].filter(n => n.id != "" ).map((level3, index3)=> {
									if(index3 == 0){
										this.selectedLevel3 = level3['id']
										this.getSchool('level3', level3.id)
									}
									return level3;
								});
							}
						}
						return level2;
					});
				}else if (id1 == level1.id) {
					this.getSchool('level1' ,level1.id)
					this.level2 = level1['LevelTwo'].filter(n => n.id != "" ).map((level2, index2)=> {
						if (!id2 && index2 == 0) {
							this.selectedLevel2 = level2['id'];
							this.getSchool('level2', level2.id)
							if (level2['levelThree']) {
								this.level3 = level2['levelThree'].filter(n => n.id != "" ).map((level3, index3)=> {
									if(index3 == 0){
										this.selectedLevel3 = level3['id']
										this.getSchool('level3', level3.id)
									}
									return level3;
								});
							}
						}else if (id2 == level2.id) {
							console.log("level 2", level2)
							this.selectedLevel2 = level2['id'];
							this.getSchool('level2' ,level2.id)
							if (level2['levelThree']) {
								this.level3 = level2['levelThree'].filter(n => n.id != "" ).map((level3, index3)=> {
									if(index3 == 0){
										this.selectedLevel3 = level3['id']
										this.getSchool('level3', level3.id)
									}
									return level3;
								});
							}
						}
						return level2;
					});
				}
				return level1;
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
	getSchool(levelName, id){
		this.schoolService.service({
			method: 'GET',
			url: this.url
		}).subscribe(schools =>{
			if (levelName == 'level1') {
				this.result = []
			}
			
			schools['data'].schools.map(data=> {
				if (levelName == 'level1') {
					if(data.levels.id == id){
						this.result.push(data);
					}
				}
				if (levelName == 'level2') {
					this.result = this.result.filter(item=> item.levelTwo.id == id)
				}
				if (levelName == 'level3') {
					this.result = this.result.filter(item=> item.levelThree.id == id)
				}
				
			})
		});
	}

	handleChange(level, e){
		switch (level) {
			case "level1":
				this.level2 = []
				this.level3 = []
				break;
			case "level2":
				this.level3 = []
				break;
		}
		this.getLevelData({'level': level, 'value': e.target.value })
	}
	addClicked(){
		this.add = false;
		this.addContentFlag.emit({show: false});
		this.clearFormFields.emit();
	}
	editClicked(){
		this.addContentFlag.emit({show: false});
		this.edit = false;
	}
	addSchool(){
		this.addContentFlag.emit({show: true})
		this.addButton.emit();
		this.add = true;
	}
	editSchool(){
		this.addContentFlag.emit({show: true})
		this.editButton.emit(this.selectedItem);
		this.edit = true;
	}
	deleteSchool(item){
		this.deleteButton.emit(this.selectedItem)
	}
}
