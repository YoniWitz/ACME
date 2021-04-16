import { AbstractControl, ValidatorFn } from "@angular/forms";

export class NumberValidators{
    static range(minValue: number, maxValue: number): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
          if (c.value != null && (isNaN(c.value) || c.value < minValue || c.value > maxValue)) {
            return { 'range': true };
          }
      
          return null;
        };
      }
}