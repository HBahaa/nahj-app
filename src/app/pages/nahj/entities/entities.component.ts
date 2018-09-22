import { Component, OnInit } from '@angular/core';
import { ELevelsOneService } from '../../../services/elevels/elevelsOne.service';
import { ELevelsTwoService } from '../../../services/elevels/elevelsTwo.service';
import { ELevelsThreeService } from '../../../services/elevels/elevelsThree.service';
import { ConfigService } from '../../../services/config';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss']
})
export class EntitiesComponent implements OnInit {

	url : string;
	selectedLevel1;
	selectedLevel2;
	selectedLevel3;
	clearSelected: boolean = false;

	constructor(
		private elevelsOne: ELevelsOneService,
		private elevelsTwo: ELevelsTwoService,
		private elevelsThree: ELevelsThreeService,
		private configService: ConfigService
	) {
		this.url = this.configService.url;
	}

	ngOnInit() {
		this.getAllLevels(undefined, undefined);
	}

	level1 = [];
	level2 = [];
	level3 = [];

	//// click functions

	getLevelData($event){
		switch($event.componentType){
			case "level1":
				this.selectedLevel1 = $event.value;
				this.level2 = [];
				this.level3 = [];
				this.getAllLevels($event.value['id'], undefined);
			break;
			case "level2":
				this.selectedLevel2 = $event.value;
				this.level3 = [];
				this.getAllLevels(this.selectedLevel1['id'], this.selectedLevel2['id']);
			break;
		}
	}

	/////   get data functions
	getAllLevels(id1, id2) {
		this.elevelsOne.service({
			method: 'GET',
			url: this.url
		}).subscribe(data => {
			this.level1 = data['data'].levelOnes.map((level1, index1)=>{
				if (!id1 && index1 == 0) {
					if(level1['LevelTwo'].length > 0){ 
						this.level2 = level1['LevelTwo'].filter(n => n.name != "" ).map((level2, index2)=> {
							if (index2 == 0) {
								this.selectedLevel2 = level2;
								if (level2['levelThree']) {
									this.level3 = level2['levelThree'].filter(n => n.name != "" );
								}
							}
							return level2
						});
					}else{
						this.selectedLevel2 = undefined;
						this.selectedLevel3 = undefined;
						this.level2 = [];
						this.level3 = [];
					}
				}else if (id1 == level1.id) {
					if(level1['LevelTwo'].length > 0){
						this.level2 = level1['LevelTwo'].filter(n => n.name != "" ).map((level2, index2)=> {
							if (!id2 && index2 == 0) {
								if (level2['levelThree']) {
									this.level3 = level2['levelThree'].filter(n => n.name != "" )
								}
							}else if (id2 == level2.id) {
								if (level2['levelThree']) {
									this.level3 = level2['levelThree'].filter(n => n.name != "" )
								}
							}
							return level2;
						});
					}
					else{
						this.selectedLevel2 = undefined;
						this.selectedLevel3 = undefined;
						this.level2 = []
						this.level3 = []
					}
				}
				return level1;
			});
		});
	}

	///update and add functions

	addLevelOne($event) {
		switch($event.eventType) {
			case 'add':
				this.elevelsOne.service({
					method: 'PUT',
					url: this.url,
					newName1: $event.newValue
				}).subscribe(data => {
					console.log("data['data']['createLevelOne']"), data['data']['createLevelOne']
					this.getAllLevels(data['data']['createLevelOne']['id'], undefined);
					// this.selectedLevel1 = data['data']['createLevelOne']['name'];
				});
			break;
			case 'update':
				this.elevelsOne.service({
					method: 'POST',
					url: this.url,
					id: this.selectedLevel1['id'],
					newName1: $event.newValue,
					newName2: ""
				}).subscribe(data => {
					this.getAllLevels(data['data']['updateLevelOne']['id'], undefined);
					// this.selectedLevel1 = data['data']['updateLevelOne']['name'];
				});
			break;
		}
	}
	addLevelTwo($event){
		switch ($event.eventType) {
			case "add":
				this.elevelsOne.service({
					method: 'POST',
					url: this.url,
					id: this.selectedLevel1['id'],
					newName1: this.selectedLevel1['name'],
					newName2: $event.newValue
				}).subscribe(data => {
					// this.selectedLevel2 = $event.newValue;
					this.level2 =data['data'].updateLevelOne.LevelTwo.filter(l2=> l2.name != "");
					this.getAllLevels(this.selectedLevel1['id'], undefined);
				});
			break;
			case "update":
				this.elevelsTwo.service({
					method: 'POST',
					url: this.url,
					id: this.selectedLevel2['id'],
					newName2: $event.newValue,
					newName3: ""
				}).subscribe(resp=>{
					this.getAllLevels(this.selectedLevel1['id'], undefined);
				})
			break;
		}
	}
	addLevelThree($event){
		switch ($event.eventType) {
			case "add":
			this.elevelsTwo.service({
				method: 'POST',
				url: this.url,
				id: this.selectedLevel2['id'],
				newName2: this.selectedLevel2['name'],
				newName3: $event.newValue
			}).subscribe(data2 => {
				this.getAllLevels(this.selectedLevel1['id'], this.selectedLevel2['id']);
			});
			break;
			case "update":
				this.elevelsThree.service({
					method: 'POST',
					url: this.url,
					id: this.selectedLevel3['id'],
					newName3: $event.newValue
				}).subscribe(data3 =>{
					this.getAllLevels(this.selectedLevel1['id'], this.selectedLevel2['id']);
				})
			break;
		}
	}
	/// delete functions
	deleteLevelOne($event){
		this.elevelsOne.service({
			method: 'DELETE',
			url: this.url,
			id: this.selectedLevel1['id']
		}).subscribe(resp => {
			this.getAllLevels(undefined, undefined);
			this.selectedLevel1 = undefined
			this.selectedLevel2=undefined
			this.selectedLevel3=undefined
		})
				
	}

	deleteLevelTwo($event){
		this.elevelsTwo.service({
			method: 'DELETE',
			url: this.url,
			id: this.selectedLevel2['id']
		}).subscribe(resp => {
			this.getAllLevels(undefined, undefined);
			this.selectedLevel2=undefined
			this.selectedLevel3=undefined
		})				
	}

	deleteLevelThree($event){
		this.elevelsThree.service({
			method: 'DELETE',
			url: this.url,
			id: this.selectedLevel3['id']
		}).subscribe(resp => {
			this.getAllLevels(undefined, undefined);
			this.selectedLevel3=undefined
		})
	}			
}
