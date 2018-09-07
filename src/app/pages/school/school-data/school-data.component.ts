import { getMySchool } from './../../../services/schoolAdmin/getSchool';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GeoService } from '../../../services/geo/geo.service';
import { updateSchool } from '../../../services/schoolAdmin/updateSchool';

@Component({
  selector: 'app-school-data',
  templateUrl: './school-data.component.html',
  styleUrls: ['./school-data.component.scss'] 
})
export class SchoolDataComponent implements OnInit {

	form: FormGroup;
	level1 = ["المدارس اﻷهلية", "المدارس اﻷهلية", "المدارس اﻷهلية", "المدارس اﻷهلية", "المدارس اﻷهلية", "المدارس اﻷهلية", "المدارس اﻷهلية"];

	url = 'http://localhost:4466';
	geoArray = [];
	citiesArray = [];
	selectedGeo= "";
	mySchool = {};
	adminResID ;
	adminNahjID ;
	schoolID;
	
	constructor( private fb: FormBuilder, private geoService: GeoService,
				 private getMySchool: getMySchool, private updateSchool: updateSchool ) {}

	ngOnInit() {
		this.getMySchoolData();
		this.getGeoData(undefined)
		this.form = this.fb.group({
	    	schoolName: [''],
			motherComp: [''],
			email: [''],
			phone: [''],
			gps: [''],
			fax: [''],
			address: [''],
			geo: [''],
			district: [''],
			city: [''],
			studentsNum: [''],
			classesNum: [''],
			teachersNum: [''],
			adminsNum: [''],
			lowestStudyYear: [''],
			highestStudyYear: [''],
			studyYears: [''],
			term: [''],
			adminName: [''],
			adminEmail: [''],
			adminPhone: [''],
			adminJob: [''],
			adminWhatsApp: [''],
			adminUsername: [''],
			adminPassword: [''],
			nahjAdminName: [''],
			nahjAdminEmail: [''],
			nahjAdminPhone: [''],
			nahjAdminJob: [''],
			nahjAdminWhatsApp: [''],
			nahjAdminUsername: [''],
			nahjAdminPassword: ['']
	    });
	}

	handleChanges(){
		this.show = ! this.show;
		this.edit = true;
	}

	// get functions

	getMySchoolData(){
		this.getMySchool.service({
			url: this.url
		}).subscribe((data: any) => {
			console.log("data", data)
			this.mySchool = data['data'].schools[0]
			this.schoolID = data['data'].schools[0].id;
			this.mySchool['admin'].filter(admin => admin.type == 'res').map(res => {
				let adminRes = res;
				this.adminResID = res.id
				this.mySchool['admin'].filter(admin => admin.type == 'admin').map(admin=>{
					let nahjAdmin = admin;
					this.adminNahjID = admin.id
					this.form = this.fb.group({
						schoolName: this.mySchool['name'],
						motherComp: this.mySchool['motherComp'],
						email: this.mySchool['email'],
						phone: this.mySchool['phone'],
						gps: this.mySchool['gps'],
						fax: this.mySchool['fax'],
						address: this.mySchool['address'],
						geo: this.mySchool['speciificArea']['speciificGeaoArea'].id,
						district: this.mySchool['district'],
						city: this.mySchool['speciificArea']['speciificCity'],
						studentsNum: this.mySchool['studentsNum'],
						classesNum: this.mySchool['classesNum'],
						teachersNum: this.mySchool['teachersNum'],
						adminsNum: this.mySchool['adminNum'],
						lowestStudyYear: this.mySchool['lowestStudyYear'],
						highestStudyYear: this.mySchool['highestStudyYear'],
						studyYears: this.mySchool['studyYears'],
						term: this.mySchool['studyYears'],
						adminName: adminRes.name,
						adminEmail: adminRes.email,
						adminPhone: adminRes.phone,
						adminJob: adminRes.job,
						adminWhatsApp: adminRes.whatsApp,
						adminUsername: adminRes.username,
						adminPassword: adminRes.password,
						nahjAdminName: nahjAdmin.name,
						nahjAdminEmail: nahjAdmin.email,
						nahjAdminPhone: nahjAdmin.phone,
						nahjAdminJob: nahjAdmin.job,
						nahjAdminWhatsApp: nahjAdmin.whatsApp,
						nahjAdminUsername: nahjAdmin.username,
						nahjAdminPassword: nahjAdmin.password
					});
				})
			});
		})
	}
	getGeoData(id){//get geoDataCity
		this.geoService.service({
			method: "GET",
			url: this.url
		}).subscribe((data: any) => {
			this.geoArray = data.data.geoAreas.map((item, index) => {
				if(!id && index == 0){
					this.citiesArray = item["cities"];
					console.log("cities", this.citiesArray)
				}else if(item.id == id){
					this.citiesArray =  item["cities"]
				}
				return item;
			} );
		});
	}
	getCities($event){
		this.getGeoData($event.target.value || undefined);
		this.selectedGeo = $event.target.value;
	}

	//edit function
	updateSchoolData(){
		let adminNahj = {
			name: this.form.value.nahjAdminName,
			phone: this.form.value.nahjAdminPhone,
			email: this.form.value.nahjAdminEmail,
			job: this.form.value.nahjAdminJob,
			whatsApp: this.form.value.nahjAdminWhatsApp,
			type: 'admin',
			password: this.form.value.nahjAdminPassword,
			username: this.form.value.nahjAdminUsername
		};
		let admin2 = {
			name: this.form.value.adminName,
			phone: this.form.value.adminPhone,
			email: this.form.value.adminEmail,
			job: this.form.value.adminJob,
			whatsApp: this.form.value.adminWhatsApp,
			type: 'res',
			password: this.form.value.adminPassword,
			username: this.form.value.adminUsername
		}
		this.form.value.schoolId = this.schoolID;

		this.form.value.admin1 = adminNahj;
		this.form.value.admin1ID = this.adminNahjID;

		this.form.value.admin2 = admin2;
		this.form.value.admin2ID = this.adminResID;
		
		let config =  this.form.value
			config['method'] =  "POST"
			config['url']    =  this.url
		this.updateSchool.service(config).subscribe((data: any) => {
			console.log("data", data)
		});
	}
}
