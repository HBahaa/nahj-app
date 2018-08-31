import { Component, OnInit } from '@angular/core';
import { ELevelsOneService } from '../../../services/elevels/elevelsOne.service';
import { ELevelsTwoService } from '../../../services/elevels/elevelsTwo.service';
import { ELevelsThreeService } from '../../../services/elevels/elevelsThree.service';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss']
})
export class EntitiesComponent implements OnInit {

	url = 'http://localhost:4466';
	selectedLevel1;
	selectedLevel2;
	selectedLevel3;
	clearSelected: boolean = false;

	constructor(
		private elevelsOne: ELevelsOneService,
		private elevelsTwo: ELevelsTwoService,
		private elevelsThree: ELevelsThreeService
	) { }

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
				this.getAllLevels($event.value, undefined);
			break;
			case "level2":
				this.selectedLevel2 = $event.value;
				this.getAllLevels(this.selectedLevel1, this.selectedLevel2);
			break;
		}
	}

	/////   get data functions
	getAllLevels(name1, name2) {
		this.elevelsOne.service({
			method: 'GET',
			url: this.url
		}).subscribe(data => {
			this.level1 = data['data'].levelOnes.map((level1, index1)=>{
				if (!name1 && index1 == 0) {
					this.selectedLevel1 = level1.name;
					if(level1['LevelTwo'].length > 0){ 
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
								}else{
									this.level3 = undefined
								}
							}
							return level2.name
						});
					}else{
						this.selectedLevel2 = undefined;
						this.selectedLevel3 = undefined;
						this.level2 = [];
						this.level3 = [];
					}
				}else if (name1 == level1.name) {
					if(level1['LevelTwo'].length > 0){
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
								}else{
									this.selectedLevel3 = undefined;
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
								}else{
									this.level3 = undefined
								}
							}
							return level2.name;
						});
					}
					else{
						this.selectedLevel2 = undefined;
						this.selectedLevel3 = undefined;
						this.level2 = []
						this.level3 = []
					}
				}
				return level1.name;

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
					this.getAllLevels(data['data']['createLevelOne']['name'], undefined);
					this.selectedLevel1 = data['data']['createLevelOne']['name'];
				});
			break;
			case 'update':
				this.elevelsOne.service({
					method: 'GET',
					url: this.url
				}).subscribe(data => {
					data['data'].levelOnes.map(level=>{
						if (level.name  == $event.value) {
							let id = level.id;
							this.elevelsOne.service({
								method: 'POST',
								url: this.url,
								id: id,
								newName1: $event.newValue,
								newName2: ""
							}).subscribe(data => {
								// let index = this.level1.indexOf($event.value);
								// this.level1.splice(index , 1);
								// this.level1.splice(index , 0, data['data'].updateLevelOne.name);
								this.getAllLevels(data['data']['updateLevelOne']['name'], undefined);
								this.selectedLevel1 = data['data']['updateLevelOne']['name'];
							});

						}
					});

				});	
			break;
		}
	}
	addLevelTwo($event){
		this.elevelsOne.service({
			method: 'GET',
			url: this.url
		}).subscribe(data => {
			data['data'].levelOnes.map((level, i)=>{
				if (level.name  == this.selectedLevel1) {
					let id = level.id;
					switch ($event.eventType) {
						case "add":
							this.elevelsOne.service({
								method: 'POST',
								url: this.url,
								id: id,
								newName1: this.selectedLevel1,
								newName2: $event.newValue
							}).subscribe(data => {
								this.selectedLevel2 = $event.newValue;
								this.getAllLevels(this.selectedLevel1, $event.newValue);
							});
						break;
						case "update":
							level['LevelTwo'].map(item =>{
								if (item.name == $event.value) {
									let id2 = item.id;
									this.elevelsTwo.service({
										method: 'POST',
										url: this.url,
										id: id2,
										newName2: $event.newValue,
										newName3: ""
									}).subscribe(resp=>{
										this.selectedLevel2 = $event.newValue;
										this.getAllLevels(this.selectedLevel1, $event.newValue);
									})
								}
							})
						break;
					}
				}
			});
		})
	}
	addLevelThree($event){
		this.elevelsOne.service({
			method: 'GET',
			url: this.url
		}).subscribe(data => {
			data['data'].levelOnes.map((level, i)=>{
				if (level.name  == this.selectedLevel1) {
					level['LevelTwo'].map(item =>{
						if (item.name == this.selectedLevel2) {
							let id = item.id;
							switch ($event.eventType) {
								case "add":
									this.elevelsTwo.service({
										method: 'POST',
										url: this.url,
										id: id,
										newName2: this.selectedLevel2,
										newName3: $event.newValue
									}).subscribe(data2 => {
										this.getAllLevels(this.selectedLevel1, this.selectedLevel2);
									});
								break;
								case "update":
									item['levelThree'].map(l3=>{
										if (l3.name == $event.value) {
											let id3 = l3.id
											this.elevelsThree.service({
												method: 'POST',
												url: this.url,
												id: id3,
												newName3: $event.newValue
											}).subscribe(data3 =>{
												this.getAllLevels(this.selectedLevel1, this.selectedLevel2);
											})
										}
									})
								break;
							}
						}
					})
				}
			});
		})
	}
	/// delete functions
	deleteLevelOne($event){
		this.elevelsOne.service({
			method: 'GET',
			url: this.url
		}).subscribe(data => {
			data['data'].levelOnes.map(level=>{
				if (level.name  == $event.value) {
					let id = level.id;
					this.elevelsOne.service({
						method: 'DELETE',
						url: this.url,
						id: id
					}).subscribe(resp => {
						this.getAllLevels(undefined, undefined);
					})
				}
			});
		})
	}

	deleteLevelTwo($event){
		this.elevelsOne.service({
			method: 'GET',
			url: this.url
		}).subscribe(data => {
			data['data'].levelOnes.map(level1=>{
				level1['LevelTwo'].map(level2=>{
					if (level2.name  == $event.value) {
						let id = level2.id;
						this.elevelsTwo.service({
							method: 'DELETE',
							url: this.url,
							id: id
						}).subscribe(resp => {
							this.getAllLevels(undefined, undefined);
						})
					}
				})
			});
		})
	}

	deleteLevelThree($event){
		this.elevelsOne.service({
			method: 'GET',
			url: this.url
		}).subscribe(data => {
			data['data'].levelOnes.map(level1=>{
				level1['LevelTwo'].map(level2=>{
					level2['levelThree'].map(level3 =>{
						if (level3.name  == $event.value) {
							let id = level3.id;
							this.elevelsThree.service({
								method: 'DELETE',
								url: this.url,
								id: id
							}).subscribe(resp => {
								this.getAllLevels(undefined, undefined);
							})
						}
					})
				})
			});
		});
	}
}
