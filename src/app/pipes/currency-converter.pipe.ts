import {Pipe, PipeTransform} from "@angular/core";
@Pipe({
  name:'currencyConverter'
})
export class CurrencyConverterPipe implements PipeTransform{
  transform(value: any, unit: any): any {
   if(unit==='MKD'){
     return (value*61.5).toFixed(2);
   }
   if(unit==='EUR'){
     return (value / 61.5).toFixed(2);
   }
  }

}
