import { Component, OnInit } from '@angular/core';
import { EcontentOneService } from '../../../services/econtent/econtent-one.service';
import { EcontentTwoService } from '../../../services/econtent/econtent-two.service';
import { EcontentThreeService } from '../../../services/econtent/econtent-three.service';
import { EcontentFourService } from '../../../services/econtent/econtent-four.service';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.scss']
})
export class LevelsComponent implements OnInit {
	url: string = 'http://localhost:4466';
	selectedContent1;
	selectedContent2;
	selectedContent3;
	selectedContent4;
	selectedParcentage1;
	selectedParcentage2;
	selectedParcentage3; 
	selectedParcentage4;

	constructor(
		private econtentOneService: EcontentOneService,
		private econtentTwoService: EcontentTwoService,
		private econtentThreeService: EcontentThreeService,
		private econtentFourService: EcontentFourService
	) { }

	ngOnInit() {
		this.getContentData(undefined, undefined, undefined, undefined);

	}
	
	level1 = [];
	level2 = [];
	level3 = [];
	level4 = [];

	/// get Functions
	getContentData(name1, name2, name3, name4){
		this.econtentOneService.service({
			method: 'GET',
			url: this.url
		}).subscribe(econtent1=>{
			this.level1 =  econtent1['data'].contentLevelOnes.map(object=> (({name, id, relativePercentage, contentLevelTwo})=>({name, relativePercentage}))(object));
			econtent1['data'].contentLevelOnes.map((l1, index1)=> {
				if (!name1 && index1 == 0) {
					this.selectedContent1 = l1.name;
					this.selectedParcentage1 = l1.relativePercentage;
					this.level2 = l1.contentLevelTwo.filter(n => n.name != "" ).map(object=> (({name, id, relativePercentage, contentLevelThree})=>({name, relativePercentage}))(object));
					if (l1.contentLevelTwo.length > 0) {
						l1.contentLevelTwo.map((l2, index2)=>{
							if (!name2 && index2 == 0) {
								this.selectedContent2 = l2.name;
								this.selectedParcentage2 = l2.relativePercentage;
								if (l2.contentLevelThree.length > 0) {
									this.level3 = l2.contentLevelThree.filter(n => n.name != "" ).map(object=> (({name, id, relativePercentage, contentLevelFour})=>({name, relativePercentage}))(object));
									l2.contentLevelThree.filter(n => n.name != "" ).map((l3, index3)=>{
										this.selectedContent3=l3.name;
										this.selectedParcentage3 = l3.relativePercentage;
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
								this.selectedContent2 = l2.name;
								this.selectedParcentage2 = l2.relativePercentage;
								if (l2.contentLevelThree.length > 0) {
									this.level3 = l2.contentLevelThree.filter(n => n.name != "" ).map(object=> (({name, id, relativePercentage, contentLevelFour})=>({name, relativePercentage}))(object));
									l2.contentLevelThree.filter(n => n.name != "" ).map((l3, index3)=>{
										this.selectedContent3=l3.name;
										this.selectedParcentage3 = l3.relativePercentage;
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
						this.selectedContent2 = undefined;
						this.selectedContent3 = undefined;
						this.selectedParcentage2 = undefined;
						this.selectedParcentage3 = undefined;
						this.level3 = [];
						this.level4 = [];
					}
				}else if (name1 == l1.name) {
					this.selectedContent1 = l1.name;
					this.level2 = l1.contentLevelTwo.filter(n => n.name != "" ).map(object=> (({name, id, relativePercentage, contentLevelTwo})=>({name, relativePercentage}))(object));
					if (l1.contentLevelTwo.length > 0) {
						l1.contentLevelTwo.map((l2, index2)=>{
							// this.selectedContent2 = l2.name;
							if (!name2 && index2 == 0) {
								this.selectedContent2 = l2.name;
								this.selectedParcentage2 = l2.relativePercentage;
								if (l2.contentLevelThree.length > 0) {
									this.level3 = l2.contentLevelThree.filter(n => n.name != "" ).map(object=> (({name, id, relativePercentage, contentLevelFour})=>({name, relativePercentage}))(object));
									l2.contentLevelThree.filter(n => n.name != "" ).map((l3, index3)=>{
										if (!name3 && index3 == 0) {
											this.selectedContent3=l3.name;
											this.selectedParcentage3 = l3.relativePercentage;
											if (l3.contentLevelFour.length > 0) {
												this.level4 = l3.contentLevelFour.filter(n => n.name != "" ).map(object=> (({name, id, relativePercentage})=>({name, relativePercentage}))(object));
											}else{
												this.level4 = [];
											}
										}else if (name3 == l3.name) {
											this.selectedContent3=l3.name;
											this.selectedParcentage3 = l3.relativePercentage;
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
								this.selectedContent2 = l2.name;
								this.selectedParcentage2 = l2.relativePercentage;
								if (l2.contentLevelThree.length > 0) {
									this.level3 = l2.contentLevelThree.filter(n => n.name != "" ).map(object=> (({name, id, relativePercentage, contentLevelFour})=>({name, relativePercentage}))(object));
									l2.contentLevelThree.filter(n => n.name != "" ).map((l3, index3)=>{
										if (!name3 && index3 == 0) {
											this.selectedContent3=l3.name;
											this.selectedParcentage3 = l3.relativePercentage;
											if (l3.contentLevelFour.length > 0) {
												this.level4 = l3.contentLevelFour.filter(n => n.name != "" ).map(object=> (({name, id, relativePercentage})=>({name, relativePercentage}))(object));
											}else{
												this.level4 = [];
											}
										}else if (name3 == l3.name) {
											this.selectedContent3=l3.name;
											this.selectedParcentage3 = l3.relativePercentage;
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
						this.selectedContent2 = undefined;
						this.selectedContent3 = undefined;
						this.selectedParcentage2 = undefined;
						this.selectedParcentage3 = undefined;
						this.level3 = [];
						this.level4 = [];
					}
				}
			})
		})
	}

	/// list functions
	getContentTwo($event){
		this.selectedContent1 = $event.value;
		this.getContentData($event.value, undefined, undefined, undefined)
	}
	getContentThree($event){
		this.selectedContent2 = $event.value;
		this.getContentData(this.selectedContent1, $event.value, undefined, undefined)
	}
	getContentFour($event){
		this.selectedContent3 = $event.value;
		this.getContentData(this.selectedContent1, this.selectedContent2, $event.value, undefined)
	}

	////   add functions
	addContentOne($event){
		try{
			switch ($event.eventType) {
				case "add":
					this.econtentOneService.service({
						method: 'PUT',
						url: this.url,
						namel1: $event.newValue1,
						relativePercentagel1: $event.newValue2
					}).subscribe(data=>{
						try{
							this.level1.push({name:data['data'].createContentLevelOne.name, relativePercentage: data['data'].createContentLevelOne.parcentage});
							this.selectedContent1 = $event.newValue1;
						}catch(er){
							console.log(er)
						}
						
					})
					break;
					
				case "update":
					this.econtentOneService.service({
						method: "GET",
						url: this.url
					}).subscribe(resp=>{
						resp['data'].contentLevelOnes.map(l1=> {
							if (l1.name == this.selectedContent1) {
	
								this.econtentOneService.service({
									method: 'POST',
									url: this.url,
									namel1: $event.newValue1,
									relativePercentagel1: $event.newValue2,
									namel2: "",
									relativePercentagel2: 0,
									Id: l1.id
								}).subscribe(data=>{
									this.selectedContent1 = $event.newValue1;
									this.getContentData($event.newValue1, undefined, undefined, undefined)
								})
							}
						})
					})
					break;
			}
		}catch(er){
			console.log(er)
		}
		
	}
	addContentTwo($event){
		this.econtentOneService.service({
			method: 'GET',
			url: this.url
		}).subscribe(data1=>{
			data1['data'].contentLevelOnes.map(l1=> {
				if (l1.name == this.selectedContent1) {
					console.log("add l2", this.selectedContent1, $event.newValue1, this.selectedParcentage1, $event.newValue2)
					switch ($event.eventType) {
						case "add":
							this.econtentOneService.service({
								method: 'POST',
								url: this.url,
								Id: l1.id,
								namel1: this.selectedContent1,
								namel2: $event.newValue1,
								relativePercentagel1: this.selectedParcentage1,
								relativePercentagel2: $event.newValue2
							}).subscribe(resp => {
								this.getContentData(this.selectedContent1, $event.newValue1, undefined, undefined)
							});
						break;
						case "update":
							l1.contentLevelTwo.map(l2 =>{
								if (l2.name == $event.value) {
									this.econtentTwoService.service({
										method: 'POST',
										url: this.url,
										namel3: "",
										namel2: $event.newValue1,
										relativePercentagel2: $event.newValue2,
										relativePercentagel3: 0,
										Id: l2.id
									}).subscribe(data2=>{
										this.getContentData(this.selectedContent1, $event.newValue1, undefined, undefined)
									})
								}
							})
						break;
					}
				}
			})
		})
	}

	addContentThree($event){
		this.econtentOneService.service({
			method: 'GET',
			url: this.url
		}).subscribe(data1=>{
			data1['data'].contentLevelOnes.map(l1=> {
				if (l1.name == this.selectedContent1) {
					l1.contentLevelTwo.map(l2=>{
						if (l2.name == this.selectedContent2) {
							switch ($event.eventType) {
								case "add":
									this.econtentTwoService.service({
										method: 'POST',
										url: this.url,
										Id: l2.id,
										namel2: this.selectedContent2,
										namel3: $event.newValue1,
										relativePercentagel2: this.selectedParcentage2,
										relativePercentagel3: $event.newValue2
									}).subscribe(resp => {
										this.getContentData(this.selectedContent1, this.selectedContent2, $event.newValue1, undefined);
									});
								break;

								case "update":
									l2.contentLevelThree.map(l3 =>{
										if (l3.name == $event.value) {
											this.econtentThreeService.service({
												method: 'POST',
												url: this.url,
												namel4: "",
												namel3: $event.newValue1,
												relativePercentagel3: $event.newValue2,
												relativePercentagel4: 0,
												Id: l3.id
											}).subscribe(data2=>{
												this.getContentData(this.selectedContent1, this.selectedContent2, $event.newValue1, undefined)
											})
										}
									})
								break;
							}
						}
					})
				}
			})
		})
	}

	addContentFour($event){
		this.econtentOneService.service({
			method: 'GET',
			url: this.url
		}).subscribe(data1=>{
			data1['data'].contentLevelOnes.map(l1=> {
				if (l1.name == this.selectedContent1) {
					l1.contentLevelTwo.map(l2=>{
						if (l2.name == this.selectedContent2) {
							l2.contentLevelThree.map(l3=>{
								if (l3.name == this.selectedContent3) {
									switch ($event.eventType) {
										case "add":
											this.econtentThreeService.service({
												method: 'POST',
												url: this.url,
												Id: l3.id,
												namel3: this.selectedContent3,
												namel4: $event.newValue1,
												relativePercentagel4: $event.newValue2,
												relativePercentagel3: this.selectedParcentage3
											}).subscribe(resp => {
												this.getContentData(this.selectedContent1, this.selectedContent2, this.selectedContent3, $event.newValue1)
											});
										break;

										case "update":
											l3.contentLevelFour.map(l4 =>{
												if (l4.name == $event.value) {
													this.econtentFourService.service({
														method: 'POST',
														url: this.url,
														namel4: $event.newValue1,
														relativePercentagel4: $event.newValue2,
														Id: l4.id
													}).subscribe(data2=>{
														this.getContentData(this.selectedContent1, this.selectedContent2, this.selectedContent3, $event.newValue1)
													})
												}
											})
										break;
									}
								}
							})
						}
					})
				}
			})
		})
	}


	/// delete functions
	deleteContentOne($event){
		this.econtentOneService.service({
			method: "GET",
			url: this.url
		}).subscribe(data=>{
			data['data'].contentLevelOnes.map(item =>{
				if (item.name == $event.value ) {
					this.econtentOneService.service({
						method: 'DELETE',
						url: this.url,
						Id: item.id
					}).subscribe(resp=>{
						this.getContentData(undefined, undefined, undefined, undefined)
					});
				}
			})
		})
	}

	deleteContentTwo($event){
		this.econtentOneService.service({
			method: "GET",
			url: this.url
		}).subscribe(data=>{
			data['data'].contentLevelOnes.map(item1 =>{
				item1.contentLevelTwo.map(item2 => {
					if (item2.name == $event.value ) {
						this.econtentTwoService.service({
							method: 'DELETE',
							url: this.url,
							Id: item2.id
						}).subscribe(resp=>{
							this.selectedContent2 = undefined;
							this.selectedParcentage2 = undefined;
							this.selectedContent3 = undefined;
							this.selectedParcentage3 = undefined;
							this.selectedContent4 = undefined;
							this.selectedParcentage4 = undefined;
							this.getContentData(this.selectedContent1, undefined, undefined, undefined)
						});
					}
				})
			})
		})
	}
	deleteContentThree($event){
		this.econtentOneService.service({
			method: "GET",
			url: this.url
		}).subscribe(data=>{
			data['data'].contentLevelOnes.map(item1 =>{
				item1.contentLevelTwo.map(item2 => {
					item2.contentLevelThree.map(item3 =>{
						if (item3.name == $event.value ) {
							this.econtentThreeService.service({
								method: 'DELETE',
								url: this.url,
								Id: item3.id
							}).subscribe(resp=>{
								this.selectedContent3 = undefined;
								this.selectedParcentage3 = undefined;
								this.selectedContent4 = undefined;
								this.selectedParcentage4 = undefined;
								this.getContentData(this.selectedContent1, this.selectedContent2, undefined, undefined)
							});
						}
					})
				})
			})
		})
		
	}
	deleteContentFour($event){
		this.econtentOneService.service({
			method: "GET",
			url: this.url
		}).subscribe(data=>{
			data['data'].contentLevelOnes.map(item1 =>{
				item1.contentLevelTwo.map(item2 => {
					item2.contentLevelThree.map(item3 =>{
						item3.contentLevelFour.map(item4=>{
							if (item4.name == $event.value ) {
								this.econtentFourService.service({
									method: 'DELETE',
									url: this.url,
									Id: item4.id
								}).subscribe(resp=>{
									this.selectedContent4 = undefined;
									this.selectedParcentage4 = undefined;
									this.getContentData(this.selectedContent1, this.selectedContent2, this.selectedContent3, undefined)
								});
							}
						})
					})
				})
			})
		})
	}
}
