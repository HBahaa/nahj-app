import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {

	@Input() img: string;
	@Input() data: any = [];
	@Input() componentType: string;
	@Output() saveButton = new EventEmitter();
	@Output() deleteButton = new EventEmitter();
	@Output() listItems = new EventEmitter();
	@Output() updateData = new EventEmitter();

	show: boolean = true;
	edit: boolean = false;
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
		this.edit = true;
	}
	
	saveChanges(componentType, value){
		this.saveButton.emit({
			value: this.selectedItem,
			newValue: this.newValue,
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
