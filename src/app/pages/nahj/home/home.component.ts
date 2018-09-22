import { Component, OnInit } from '@angular/core';
import { GeoService } from '../../../services/geo/geo.service';
import { EvalutionStatusService } from '../../../services/evaluationStatus/evalution-status.service';
import { StudyYearsService } from '../../../services/studyYears/study-years.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	url : string = "http://localhost:4466";
	geoArray : any = [];
	citiesArray : any = [];
	termArray = [];
	evaluationStatus = [];

	selectedGeo : string;
	selectedCity: string;
	selectedTerm: string;
	selectedEval: string;

	constructor(
		private geoService: GeoService,
		private evaluationService: EvalutionStatusService,
		private studyYearService: StudyYearsService) { }

 
	ngOnInit() {
		this.getGeoCityData(undefined);
		this.getEvaluationStatusData();
		this.getStudyYears();
	}


	//get data functions

	getGeoCityData(name){//get geoDataCity
		this.geoService.service({
			method: "GET",
			url: this.url
		}).subscribe((data: any) => {
			this.geoArray = data.data.geoAreas.map((item, index) => {
				if(!name && index == 0){
					this.citiesArray = item["cities"]
				}else if(item.name == name){
					this.citiesArray =  item["cities"]
				}
				return item.name;
			} );
		});
	}

	getCities($event){
		this.getGeoCityData($event.value || undefined);
		this.selectedGeo = $event.value 
	}
	getStudyYears(){
		this.studyYearService.service({
			method: "GET",
			url: this.url
		}).subscribe(data => {
			this.termArray = data["data"].studyYears.map(styYear =>{
				return styYear.name;
			})

		})
	}

	getEvaluationStatusData(){
		this.evaluationService.service({
			method: "GET",
			url: this.url
		}).subscribe((data: any) => {
			this.evaluationStatus = data.data.evaluationStatuses.map(item => item.name);
		})
	}

	//save data functions
	addNewGeo($event){
		switch($event.eventType){
			case "add" :
				this.geoService.service({
					method: 'PUT',
					url: this.url,
					name: $event.newValue
				}).subscribe((data: any) => {
					this.getGeoCityData($event.newValue);
					this.selectedGeo = $event.newValue;
				});
			
			break;
			case "update" :
				this.geoService.service({
					url:this.url,
					method: 'GET',
				}).subscribe((data:any)=>{
					data.data.geoAreas.map((item)=>{
						if(item.name === $event.value){
							this.geoService.service({
								url:this.url,
								method: 'POST',
								newName:$event.newValue,
								name:$event.value,
								cities:item.cities
							}).subscribe((data:any)=>{
								this.getGeoCityData($event.newValue)
								this.geoService.service({
									method: 'DELETE',
									url: this.url,
									name: $event.value
								}).subscribe((data: any)=>{
									this.getGeoCityData($event.newValue)
								})
							})					
						}
					})
				})
			break;
		}
	}

	addNewCity($event){
		console.log("add city", $event)
		switch ($event.eventType) {
			case "add":
				this.geoService.service({
					url: this.url,
					name: this.selectedGeo
				}).subscribe(data => {
					let oldCities = data["data"]["geoAreas"][0]["cities"];
					let newCities = oldCities
					console.log("old city", oldCities)
					newCities.push($event.newValue);
					console.log("new city", newCities)

					this.geoService.service({
						method: 'GET',
						url: this.url
					}).subscribe(geos=>{
						geos['data'].geoAreas.filter(geo=>geo.name == this.selectedGeo).map(geo=>{
							this.geoService.service({
								method: "DELETE",
								url: this.url,
								Id: geo.id
							}).subscribe(data =>{
								this.geoService.service({
									method: 'PUT',
									url: this.url,
									name: this.selectedGeo,
									cities: newCities
								}).subscribe((data: any) => {
									this.citiesArray= data["data"]["createGeoArea"]["cities"];
									this.selectedCity = $event.newValue;
								});
							})
						})
					})
				});
				break;

			case "update":
				this.geoService.service({
					url: this.url,
					name: this.selectedGeo
				}).subscribe(data => {
					let cities = data["data"]["geoAreas"][0]["cities"];
					let index = cities.indexOf($event.value);
					cities.splice(index , 1);
					cities.push($event.newValue);
					this.geoService.service({
						method: 'GET',
						url: this.url
					}).subscribe(geos=>{
						geos['data'].geoAreas.filter(geo=>geo.name == this.selectedGeo).map(geo=>{
							this.geoService.service({
								method: "DELETE",
								url: this.url,
								Id: geo.id
							}).subscribe(data =>{
								this.geoService.service({
									method: 'PUT',
									url: this.url,
									name: this.selectedGeo,
									cities: cities
								}).subscribe((data: any) => {
									this.citiesArray= data["data"]["createGeoArea"]["cities"];
									this.selectedCity = $event.newValue;
								});
							})
						})
					})
				});
				break;
		}
	}
	addNewEvaluation($event){
		switch ($event.eventType) {
			case "add":
				this.evaluationService.service({
					method: "PUT",
					url: this.url,
					name: $event.newValue
				}).subscribe((data: any) => {
					this.getEvaluationStatusData();
					this.selectedEval = $event.newValue;
				});
				break;
		
			case "update":
				this.evaluationService.service({
					method: "GET",
					url: this.url
				}).subscribe((data: any) => {
					data.data.evaluationStatuses.filter(item => item.name == $event.value ).map(item => {
						this.evaluationService.service({
							method: "POST",
							url: this.url,
							name: $event.newValue,
							id: item.id
						}).subscribe((data: any) => {
							this.getEvaluationStatusData();
							this.selectedEval = $event.newValue;
						});
					});
				})
				break;
		}
	}
	addNewStudyYear($event){
		switch($event.eventType){
			case "add":
				this.studyYearService.service({
					method: "PUT",
					url: this.url,
					name: $event.newValue, 
				}).subscribe(data=>{
					this.getStudyYears();
					this.selectedTerm  =  $event.newValue;
				});
			break;
			case "update":
			this.studyYearService.service({
				method: "GET",
				url: this.url 
			}).subscribe(data=>{
				data['data'].studyYears.filter(studyYear=> studyYear.name == $event.value).map(resp=>{
					this.studyYearService.service({
						method: "POST",
						url: this.url,
						name: $event.newValue,
						Id: resp.id 
					}).subscribe(data=>{
						this.getStudyYears();
						this.selectedTerm  =  $event.newValue;
					});
				})
			});
			break;
		}
	}

	//delete data functions
	deleteGeo($event){
		this.geoService.service({
			method: 'GET',
			url: this.url
		}).subscribe(geos=>{
			geos['data'].geoAreas.map(geo=>{
				if (geo.name == $event.value) {
					this.geoService.service({
						method: 'DELETE',
						url: this.url,
						Id: geo.id
					}).subscribe((data:any)=> {
						this.getGeoCityData(undefined);
						this.selectedGeo = undefined;
					})
				}
			})
		})
	}

	deleteCity($event){
		this.geoService.service({
			method: 'GET',
			url: this.url
		}).subscribe(data=>{
			data['data'].geoAreas.filter(geo=>geo.name == this.selectedGeo).map(geo=>{
				let cities = geo["cities"];
				let index = cities.indexOf($event.value);
				cities.splice(index , 1);
				this.geoService.service({
					method: "DELETE",
					url: this.url,
					Id: geo.id
				}).subscribe(data =>{
					this.geoService.service({
						method: 'PUT',
						url: this.url,
						name: this.selectedGeo,
						cities: cities
					}).subscribe((data: any) => {
						this.citiesArray= data["data"]["createGeoArea"]["cities"];
						this.selectedCity = $event.newValue;
					});
				})
			})
		})
	}

	deleteEvaluation($event){
		this.evaluationService.service({
			method: "GET",
			url: this.url
		}).subscribe((data: any) => {
			data.data.evaluationStatuses.filter(item => item.name == $event.value ).map(item => {
				this.evaluationService.service({
					method: "DELETE",
					url: this.url,
					id: item.id
				}).subscribe((data: any) => {
					this.getEvaluationStatusData();
					this.selectedEval = undefined;
				});
			});
		})
	}

	deleteStudyYear($event){
		this.studyYearService.service({
			method: "GET",
			url: this.url 
		}).subscribe(data=>{
			data['data'].studyYears.filter(studyYear=> studyYear.name == $event.value).map(resp=>{
				this.studyYearService.service({
					method: "DELETE",
					url: this.url,
					Id: resp.id 
				}).subscribe(data=>{
					console.log("data", data)
					this.getStudyYears();
					this.selectedTerm = undefined;
				});
			})
		});
		// this.studyYearService.service({
		// 	method: "DELETE",
		// 	url: this.url
		// }).subscribe(data =>{
		// 	this.termArray = []
		// 	this.selectedTerm = undefined;
		// })
	}
}