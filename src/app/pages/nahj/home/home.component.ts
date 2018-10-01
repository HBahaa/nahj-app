import { Component, OnInit } from '@angular/core';
import { GeoService } from '../../../services/geo/geo.service';
import { EvalutionStatusService } from '../../../services/evaluationStatus/evalution-status.service';
import { StudyYearsService } from '../../../services/studyYears/study-years.service';
import { ConfigService } from '../../../services/config';
import { CityService } from '../../../services/city/city.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	url : string;
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
		private cityService: CityService,
		private evaluationService: EvalutionStatusService,
		private studyYearService: StudyYearsService,
		private configService: ConfigService) {

			this.url = this.configService.url;
		}

 
	ngOnInit() {
		this.getGeoCityData(undefined);
		this.getEvaluationStatusData();
		this.getStudyYears();
	}


	//get data functions

	getGeoCityData(id){//get geoDataCity
		this.geoService.service({
			method: "GET",
			url: this.url
		}).subscribe((data: any) => {
			console.log("get geo city", data)
			if (data.data) {
				this.geoArray = data.data.geoAreas.map((item, index) => {
					if(!name && index == 0){
						this.citiesArray = item["cities"]
					}else if(item.id == id){
						this.citiesArray =  item["cities"]
					}
					this.selectedCity = undefined;
					return item;
				} );
			}
		});
	}

	getCities($event){
		console.log("list", $event)
		this.getGeoCityData($event.value.id || undefined);
		this.selectedGeo = $event.value;
		this.selectedCity = undefined;		
	}
	getStudyYears(){
		this.studyYearService.service({
			method: "GET",
			url: this.url
		}).subscribe(data => {
			this.termArray = data["data"].studyYears.map(styYear =>{
				return styYear;
			})

		})
	}

	getEvaluationStatusData(){
		this.evaluationService.service({
			method: "GET",
			url: this.url
		}).subscribe((data: any) => {
			this.evaluationStatus = data.data.evaluationStatuses;
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
					// this.selectedGeo = $event.newValue;
				});			
			break;
			case "update" :
				this.geoService.service({
					url:this.url,
					method: 'POST',
					name:$event.newValue, 
					id:this.selectedGeo['id']
				}).subscribe((data:any)=>{
					this.getGeoCityData($event.newValue)
				})
			break;
		}
	}

	addNewCity($event){
		switch ($event.eventType) {
			case "add":
				this.cityService.service({
					method: "PUT",
					url: this.url,
					name: $event.newValue,
					id: this.selectedGeo['id']
				}).subscribe(cities => {
					console.log("cities", cities)
					this.getGeoCityData(this.selectedGeo['id'])
				})
			break;

			case "update":
				this.cityService.service({
					method: "POST",
					url: this.url,
					name: $event.newValue,
					id: this.selectedCity['id']
				}).subscribe(cities => {
					this.getGeoCityData(this.selectedGeo['id'])
				})
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
					console.log("addNewEvaluation", data)
					this.getEvaluationStatusData();
				});
			break;
		
			case "update":
				this.evaluationService.service({
					method: "POST",
					url: this.url,
					name: $event.newValue,
					id: this.selectedEval['id']
				}).subscribe((data: any) => {
					this.getEvaluationStatusData();
				});
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
				});
			break;
			case "update":
				this.studyYearService.service({
					method: "POST",
					url: this.url,
					name: $event.newValue,
					Id: this.selectedTerm['id'] 
				}).subscribe(data=>{
					this.getStudyYears();
				});
			break;
		}
	}

	//delete data functions
	deleteGeo($event){
		this.geoService.service({
			method: 'DELETE',
			url: this.url,
			id: this.selectedGeo['id']
		}).subscribe((data:any)=> {
			this.getGeoCityData(undefined);
			this.selectedGeo = undefined;
		})	
	}

	deleteCity($event){
		this.cityService.service({
			method: 'DELETE',
			url: this.url,
			id: this.selectedCity['id']
		}).subscribe((data:any)=> {
			this.getGeoCityData(this.selectedGeo['id']);
			this.selectedCity = undefined;
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
	}
}