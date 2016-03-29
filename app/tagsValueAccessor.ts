import {Directive, Provider} from 'angular2/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR } from 'angular2/common';
import {CONST_EXPR} from 'angular2/src/facade/lang';
import {forwardRef} from 'angular2/src/core/di';

import {TagsComponent} from './tags';

const CUSTOM_VALUE_ACCESSOR = CONST_EXPR(new Provider(NG_VALUE_ACCESSOR, {useExisting: forwardRef(() => TagsValueAccessor), multi: true}));

@Directive({
  selector: 'tags',
  host: {'(tagsChange)': 'onChange($event)'},
  providers: [CUSTOM_VALUE_ACCESSOR]
})
export class TagsValueAccessor implements ControlValueAccessor {
  onChange = (_) => {};
  onTouched = () => {};

  constructor(private host: TagsComponent) { }

  writeValue(value: any): void {
    this.host.setValue(value);
  }

  registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}