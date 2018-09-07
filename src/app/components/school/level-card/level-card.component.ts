import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-level-card',
  templateUrl: './level-card.component.html',
  styleUrls: ['./level-card.component.scss']
})
export class LevelCardComponent implements OnInit {

	@Input() title: string;
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
	
	constructor() { }

	ngOnInit() {
	}

	handleClick(event, componentType, item){
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

	handleChanges(){
		this.show = ! this.show;
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
