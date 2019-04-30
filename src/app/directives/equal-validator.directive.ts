import { Directive, Attribute } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[EqualValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EqualValidatorDirective, multi: true }]
})
export class EqualValidatorDirective implements Validator {

  constructor(@Attribute('EqualValidator') public comparer: string) { }

  validate(c: AbstractControl): { [key: string]: any; } {
    let e = c.root.get(this.comparer);
    if (e && c.value !== e.value) {
      return { "compare": true };
    }
    return null;
  }
}