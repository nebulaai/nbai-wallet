import { EqualValidatorDirective } from './equal-validator.directive';
import { FormControl, FormGroup } from '@angular/forms';

describe('EqualValidatorDirective', () => {
  let conPassword = new FormControl('123456');
  it('should create an instance', () => {
    const directive = new EqualValidatorDirective('');
    expect(directive).toBeTruthy();
  });

  it('should return null', () => {
    let newPassword = new FormControl('123456');

    let group = new FormGroup({
      newPassword: newPassword,
      conPassword: conPassword
    });
    const directive = new EqualValidatorDirective('newPassword');
    expect(directive.validate(conPassword)).toEqual(null);
  })

  it('should return true', () => {
    let newPassword = new FormControl('12345');
    let conPassword = new FormControl('123456');
    let group = new FormGroup({
      newPassword: newPassword,
      conPassword: conPassword
    });
    const directive = new EqualValidatorDirective('newPassword');
    expect(directive.validate(conPassword)).toEqual({ "compare": true });
  })

});
