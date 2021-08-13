import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Constants } from '@app/util/constants';

@Pipe({
  name: 'DateFormatPipe',
})
export class DateTimeFormatPipe extends DatePipe implements PipeTransform {
  transform(value: any, _args?: any): any {
    return super.transform(value, Constants.DATE_TIME_FMT);
  }
}
