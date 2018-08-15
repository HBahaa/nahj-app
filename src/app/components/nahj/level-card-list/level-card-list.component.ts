import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-level-card-list',
  templateUrl: './level-card-list.component.html',
  styleUrls: ['./level-card-list.component.scss']
})
export class LevelCardListComponent implements OnInit {

	@Input() data: any = [];
	@Input() img: string;
	@Input() title: string;
	@Input() componentType: string;
	@Output() saveButton = new EventEmitter();
	@Output() deleteButton = new EventEmitter();
	@Output() listItems = new EventEmitter();
	@Output() updateData = new EventEmitter();

	show: boolean = true;
	selectedItem: any;
	newValue: string;

	constructor() {	}

	ngOnInit() {
	}

	listClick(event, componentType, item) {
	    this.selectedItem = item;
	    this.newValue = item;
	    this.listItems.emit({componentType: this.componentType, value: item,newValue:null,eventType:"click"});
	    this.show = true;
	}

	handleChanges(){
		this.show = ! this.show;
	}
	
	saveChanges(componentType, value1, value2){
		this.saveButton.emit({
			value: this.selectedItem,
			newValue1: value1,
			newValue2: value2,
			type: this.componentType,
			eventType : (this.selectedItem && this.selectedItem !== this.newValue ) 
						? "update" 
						: (this.selectedItem === this.newValue) 
						  ? undefined
						  : "add"
		});
		this.show = true;
		this.updateData.emit();
	}

	addItem(){
		this.show = false;
		this.selectedItem = undefined;
		this.newValue = undefined;
	}

	deleteItem(type){
		if (this.selectedItem) {
			this.deleteButton.emit({
				value: this.selectedItem,
				newValue: this.newValue,
				type: this.componentType,
				eventType : "delete"
			})
			this.newValue = undefined;
		}
	}
}
