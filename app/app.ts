import {Component, OnInit } from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators} from "angular2/common";

import {TagsComponent} from './tags';
import {TagsValueAccessor} from './tagsValueAccessor';

@Component({
    selector: 'my-app',
    directives: [TagsComponent, TagsValueAccessor],
    template: `
    <form [ngFormModel]="companyForm" (ngSubmit)="onSubmit(companyForm)">
        Name: <input [(ngModel)]="company.name" [ngFormControl]="companyForm.controls.name"/> <br/>
        <tags [(ngModel)]="company.tags" [ngFormControl]="companyForm.controls.tags"></tags>
        <div *ngIf="companyForm.find('tags').hasError('notEmpty')" class="alert alert-danger" role="alert">
            <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span><span class="sr-only">Error:</span> Tags cannot be empty <tt>MOO</tt>
        </div>
        <br /><br />
        <button class="btn btn-primary" type="submit">Submit</button>  
    </form>
  `
})
export class AppComponent {

    companyForm: ControlGroup;
    company: Company;

    constructor(fb: FormBuilder) {
        this.company = new Company('companyid', 'some name', ['tag1', 'tag2']);

        this.companyForm = fb.group({
            name: ['', Validators.required],
            tags: ['', notEmpty]
        });
    }

    onSubmit(form) {
        console.log(form.valid);
        console.log(form.value);
    }
}

function notEmpty(control) {
    if (control.value == null || control.value.length === 0) {
        return {
            notEmpty: true
        }
    }
    return null;
}

export class Company {
    constructor(public id: string, public name: string, public tags: Array<string>) { }
}
