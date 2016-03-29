import {Component, Output, EventEmitter } from 'angular2/core';
import {FORM_DIRECTIVES, FORM_PROVIDERS, FormBuilder, NgForm, Control, ControlGroup, Validators} from "angular2/common";

@Component({
    selector: 'tags',
    template: `
    <div *ngIf="tags">
        <span *ngFor="#tag of tags" style="font-size:14px" class="label label-default" (click)="removeTag(tag)">
            {{tag}} 
            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
        </span>
        <br /><br />
        <span style="display:inline-block;">
            <input [(ngModel)]="tagToAdd" style="width: 50px; font-size: 14px;" class="custom" />
            <button type="button" class="btn btn-secondary" (click)="addTag()">Add Tag</button>
        </span>
    </div>
  `
})
export class TagsComponent {
    @Output() tagsChange: EventEmitter<any>;

    tags: Array<string>;
    tagToAdd: string;

    constructor() {
        this.tagsChange = new EventEmitter();
    }

    setValue(value: Array<string>) {
        this.tags = value;
    }

    removeTag(tag: string) {
        var index = this.tags.indexOf(tag, 0);
        if (index != undefined) {
            this.tags.splice(index, 1);
            this.tagsChange.emit(this.tags);
        }
    }

    addTag() {
        this.tags.push(this.tagToAdd);
        this.tagsChange.emit(this.tags);
        this.tagToAdd = '';
    }
}