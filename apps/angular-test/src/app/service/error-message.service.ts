import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ErrorMessageService {

  constructor() { }

  getErrorMessage(errors: ValidationErrors, hint: string): string {
    if(errors['required']) {
      return `${hint} is required`
    } else if(errors['minlength']) {
      return `${hint} should contain atleast ${errors['minlength'].requiredLength} letters`;
    } else if(errors['maxlength']) {
      return `${hint} should not exceed ${errors['maxlength'].requiredLength} letters`;
    } else if(errors['pattern']) {
      return `Invalid URL`;
    } else if(errors['matDatepickerParse']) {
      return `${hint} is required`;
    }
    return '';
  }
}
