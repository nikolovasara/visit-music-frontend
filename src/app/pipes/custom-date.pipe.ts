import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDate',
  pure: true
})
export class CustomDatePipe extends
  DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return super.transform(value, "EEEE, d MMM");
  }
}
