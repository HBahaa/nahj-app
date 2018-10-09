import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { studyLevelsOne } from '../../../services/schoolAdmin/studyLevelsOne';
import { ConfigService } from '../../../services/config';

@Component({
  selector: 'app-students-filter',
  templateUrl: './students-filter.component.html',
  styleUrls: ['./students-filter.component.scss']
})
export class StudentsFilterComponent implements OnInit {

	@Input() img: string;
	@Input() title: string;
	@Input() data: any = [];
	@Output() itemClicked = new EventEmitter();

	url: string = '';
	searchText: string = '';
	schoolID: string = '';
	studyLevel1 = []
	studyLevel2 = []
	studyLevel3 = []
	selectedStudyLevel1: any;
	selectedStudyLevel2: any;
	selectedStudyLevel3: any;

	constructor(
		private studyLevelsOne: studyLevelsOne,
		private configService: ConfigService
	) 
	{}

	ngOnInit() {
		this.url = this.configService.url;
		this.schoolID = localStorage.getItem("schoolID");
		this.getStudyLevels(undefined, undefined)
	}

	getStudyLevels(id1, id2){
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
				
			}else{
				this.studyLevel1 = []
				this.studyLevel2 = []
				this.studyLevel3 = []
			}
		})
	}

	handleItemClicked(item){
		this.itemClicked.emit(item);
	}

	handleLevel1Change(level1){
		this.getStudyLevels(level1, undefined)
	}
	handleLevel2Change(level2){
		this.getStudyLevels(this.selectedStudyLevel1, level2)
	}
	handleLevel3Change(level3){
		// console.log("level3 ****", level3)
		// this.getStudyLevels(this.selectedStudyLevel1, this.selectedStudyLevel2)
	}

}
