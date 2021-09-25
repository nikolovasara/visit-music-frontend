import {Pipe, PipeTransform} from "@angular/core";
@Pipe({
  name:'currencyConverter'
})
export class CurrencyConverterPipe implements PipeTransform{
  transform(value: any, unit: any): any {
   if(unit==='MKD'){
     const toMkd = (value*61.5).toFixed(1);
     if(+toMkd.substr(toMkd.length-1,1)>4){
       return (+toMkd.substr(0,toMkd.length-2)+1).toFixed(1);
     }
     return (+toMkd.substr(0,toMkd.length-2)).toFixed(1);
   }
   if(unit==='EUR'){
     return (value / 61.5).toFixed(1);
   }
  }

}
