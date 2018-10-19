import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { studyLevelsOne } from '../../../services/schoolAdmin/studyLevelsOne';
import { teachers } from '../../../services/schoolAdmin/teachers';
import { classes } from '../../../services/schoolAdmin/class';
import { ConfigService } from '../../../services/config';
import { licensedTeacher } from '../../../services/schoolAdmin/licensedTeacher';
import { StudyYearsService } from '../../../services/studyYears/study-years.service';
import { licensedClass } from '../../../services/schoolAdmin/licensedClass';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {

	form: FormGroup;
	teacherLicenseForm: FormGroup;
	licenseClassForm: FormGroup;
	licenseForm: FormGroup;
	url : string;
	teachersArr:any[] = [];
	schoolID: string = '';
	add: boolean = false;
	edit: boolean = false;
	addLicense: boolean = false;
	editLicense: boolean = false;
	licenseTerm;
	selectedStudyLevel1;
	selectedStudyLevel2;
	selectedStudyLevel3;
	selectedTeacher;
	selectedLicenseTerm;
	licenseClasses = [];
	teacherClasses = [];
	studyLevel1 = [];
	studyLevel2 = [];
	studyLevel3 = [];
	terms= [];
	licenseContent = [];


	constructor( private teachers: teachers, private configService: ConfigService,private fb: FormBuilder,
				private studyLevelsOne: studyLevelsOne, private classesService: classes, private licensedTeacher: licensedTeacher,
				private studyYearsService: StudyYearsService, private licensedClass: licensedClass )
	{
		this.url = this.configService.url;
		this.schoolID = localStorage.getItem("schoolID");
		this.licenseTerm = JSON.parse(localStorage.getItem("licenseTerm"));

		this.terms = this.licenseTerm && this.licenseTerm.length > 0 ? this.licenseTerm.map(term => term.studyYear) : []
	}

	ngOnInit() {
		this.form = this.fb.group({
			name: ['', Validators.required],
			username: ['', Validators.required],
			title: ['', Validators.required],
			email: ['', Validators.required],
			password: ['', Validators.required],
			job: ['', Validators.required],
			phone: ['', Validators.required],
			whatsApp: ['', Validators.required]
		});
		this.licenseForm = this.fb.group({
			term: ['', Validators.required],
			accountStatus: ['', Validators.required]
		})
		this.teacherLicenseForm = this.fb.group({
			licenseClass: ['', Validators.required],
			canAddEval: ['', Validators.required],
			canEnterEval: ['', Validators.required],
			canEditEval: ['', Validators.required],
			canDeleteEval: ['', Validators.required]
		})
		this.licenseClassForm = this.fb.group({
			studyLevel1: ['', Validators.required],
			studyLevel2: ['', Validators.required],
			studyLevel3: ['', Validators.required]
		})
		this.getStudyLevelData(undefined, undefined);
		this.getTeachers();
	}

	handleStudyYearChange(e){
		this.selectedLicenseTerm = this.licenseTerm.filter(data=> data.studyYear.id == e)[0];
		this.getLicenseClasses()
	}

	handleStudyLevelChange(level, e){
		switch (level) {
			case "studyLevel1":
				this.getStudyLevelData(e.target.value, undefined)
				break;		
			case "studyLevel2":
				this.getStudyLevelData( this.selectedStudyLevel1, e.target.value)
				break;
			case "studyLevel2":
				this.getStudyLevelData(this.selectedStudyLevel1, this.selectedStudyLevel2 )
				break;
		}
	}

	teacherClicked(e){
		this.selectedTeacher = e;
		this.form = this.fb.group({
			name: e.name,
			username: e.username,
			title: e.title,
			email: e.email,
			password: e.password,
			job: e.job,
			phone: e.phone,
			whatsApp: e.whatsApp
		});
	}

	//get functions 
	getStudyLevelData(id1, id2){
		this.studyLevelsOne.service({
			method: "GET",
			url: this.url,
			id: this.schoolID
		}).subscribe(data => {
			if (data['data']['schools'].length > 0) {
				if (data['data']['schools'][0].classes) {
					this.studyLevel1 = data['data']['schools'][0].classes
						.filter(item1 => item1.studyLevelOnea != null)
						.map(item1 => { 
							if (id1 == item1.studyLevelOnea.id) {
								this.selectedStudyLevel1 = item1.studyLevelOnea.id;
								if (item1.studyLevelOnea.studyLevelTwo.length > 0) {
									this.studyLevel2 = item1.studyLevelOnea.studyLevelTwo
										.filter(item2=> item2 != null)
										.map(item2=>{
											if (id2 == item2.id) {
												this.selectedStudyLevel2 = item2.id;
													if (item2.class.length > 0) {
														this.studyLevel3 = item2.class.filter(item3=> item3 != null)
													}else{
														this.studyLevel3 = []
													}

												return item2
											}
											return item2;
										})
								}else{
									this.studyLevel2 = []
									this.studyLevel3 = []
								}						
								return item1.studyLevelOnea;
							}
							else if(id1 == '' || !id1){
								this.studyLevel2 = []
								this.studyLevel3 = []
							}
							return item1.studyLevelOnea;
						});
				}else{
					this.studyLevel1 = []
					this.studyLevel2 = []
					this.studyLevel3 = []
				}
				
			}
		})
	}
	getTeachers(){
		this.teachers.service({
			method: "GET",
			url: this.url,
			id: this.schoolID
		}).subscribe(data=>{
			if(data['data'].schools.length > 0){
				this.teachersArr = data['data'].schools[0].teachers
			}else{
				this.teachersArr= []; 
			}
		})
	}
	clearInputs(){
		this.form = this.fb.group({
			name: [''],
			username: [''],
			title: [''],
			email: [''],
			password: [''],
			job: [''],
			phone: [''],
			whatsApp: ['']
		});
		this.clearLicenseInputs();
	}
	clearLicenseInputs(){
		this.teacherLicenseForm = this.fb.group({
			licenseClass: [''],
			canAddEval: [''],
			canEnterEval: [''],
			canEditEval: [''],
			canDeleteEval: ['']
		})
	}

	addClicked(){
		this.add = true;
		this.clearInputs();
	}
	editClicked(){
		this.edit = true;
	}
	addLicenseClicked(){
		this.addLicense = true;
		this.clearLicenseInputs();
	}
	editLicenseClicked(){
		this.editLicense = true;
	}
	
	getLicenseClasses(){
		this.licensedClass.service({
			url: this.url,
			method: "GET",
			id: this.selectedLicenseTerm['id']
		}).subscribe(data=>{
			// this.licenseClasses = data['data']['licensedTerms'][0]['licensedClass'].map(item=> item.class )
			if (data['data']['licensedTerms'] && data['data']['licensedTerms'].length > 0) {
				this.licenseClasses = data['data']['licensedTerms'][0]['licensedClass']				
			}
		});
	}

	addLicenseClass(){
		if (this.licenseClassForm.value.studyLevel3 && this.form.value.term) {
			this.licensedClass.service({
				method: "PUT",
				url: this.url,
				id: this.selectedLicenseTerm['id'],
				class:this.licenseClassForm.value.studyLevel3
			}).subscribe(data=>{
				alert("added successfully")
			});
		}else{
			alert("please select class and term to continue");
		}
	}

	addTeacher(){
		this.teachers.service({
			method: "PUT",
			url: this.url,
			name: this.form.value.name,
			title: this.form.value.title,
			job: this.form.value.job,
			whatsApp: this.form.value.whatsApp,
			email:this.form.value.email,
			phone:this.form.value.phone,
			type:this.form.value.type,
			username:this.form.value.username,
			password:this.form.value.password,
			id: this.schoolID
		}).subscribe(data=>{
			this.getTeachers();
			this.clearInputs();
			this.add = false;
		})
	}
	addLicenseClassToTeacher(){
		if (this.teacherLicenseForm.value.licenseClass) {
			let obj = {}
			obj['lclassid'] = this.teacherLicenseForm.value.licenseClass ? this.teacherLicenseForm.value.licenseClass : ''
			obj['canAddEval'] = this.teacherLicenseForm.value.canAddEval ? this.teacherLicenseForm.value.canAddEval : false
			obj['canEnterEval'] = this.teacherLicenseForm.value.canEnterEval ? this.teacherLicenseForm.value.canEnterEval : false
			obj['canDeleteEval'] = this.teacherLicenseForm.value.canDeleteEval ? this.teacherLicenseForm.value.canDeleteEval : false
			obj['canEditEval'] = this.teacherLicenseForm.value.canEditEval ? this.teacherLicenseForm.value.canEditEval : false

			this.licenseContent.push(obj);
			alert("added successfully")
		}
	}

	addTeacherLicense(){
		this.licensedTeacher.service({
			method: "PUT",
			url: this.url,
			teacher: this.selectedTeacher.id,
			isActiveAccount: this.licenseForm.value.accountStatus,
			classes:this.licenseContent,
			ltermid: this.selectedLicenseTerm['id']
		}).subscribe(data=>{
			console.log("addTeacherLicense", data);

			this.licensedTeacher.service({
				method: "GETBYID",
				url: this.url,
				teacher: this.selectedTeacher.id,
				ltermid: this.selectedLicenseTerm['id']
			}).subscribe(data=>{
				console.log("get license to teacher ", data);


				// this.licensedTeacher.service({
				// 	method: "PUT2",
				// 	url: this.url,
				// 	lteacherid: data['data'].updateLicensedTerm['licensedTeacher'].id,
				// 	classes:this.licenseContent
				// }).subscribe(data=>{
				// 	console.log("add license to teacher ", data)
				// 	this.addLicense = false;
				// })
			})
			
		})
	}

	getTeacherLivcienseId(){
		this.licensedTeacher.service({
			method: "GETBYID",
			url: this.url,
			teacher: this.selectedTeacher.id,
			ltermid: this.selectedLicenseTerm['id']
		}).subscribe(data=>{
			console.log("add license to teacher ", data);
		})
	}
	
	editTeacherLicense(){
		this.licensedTeacher.service({
			method: "POST",
			url: this.url,
			teacher: this.selectedTeacher.id,
			isActiveAccount: this.licenseForm.value.accountStatus,
			classes:this.licenseContent,
			ltermid: this.selectedLicenseTerm['id']
		}).subscribe(data=>{
			console.log("addTeacherLicense", data);
			this.editLicense = false;
		})
	}

	editTeacher(){
		this.teachers.service({
			method: "POST",
			url: this.url,
			name: this.form.value.name,
			title: this.form.value.title,
			job: this.form.value.job,
			whatsApp: this.form.value.whatsApp,
			email:this.form.value.email,
			phone:this.form.value.phone,
			type:this.form.value.type,
			username:this.form.value.username,
			password:this.form.value.password,
			id: this.selectedTeacher.id
		}).subscribe(data=>{
			this.getTeachers();
			this.edit= false;
		})
	}

	deleteTeacher(){
		this.teachers.service({
			method: "DELETE",
			url: this.url,
			id: this.selectedTeacher.id
		}).subscribe(data=>{
			this.getTeachers();
			this.clearInputs();
		})
	}
}
