import { Injectable } from '@angular/core';
import { Appraisal } from '../models/appraisal.model';


@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  constructor() { }


  number_of_evaluations(appraisal: Appraisal): number {
    return appraisal.evaluations.length;
  }

  format_date_only(date_d: Date): string {
    let date = new Date(date_d);
    // console.log(date);
    return  date.getDate() + "." + date.getMonth() + "." + date.getFullYear() + ".";
  }

  format_date(date_d: Date): string {
    let date = new Date(date_d);
    // console.log(date);
    return date.getHours() + ":" + date.getMinutes() + " " + date.getDate() + "." + date.getMonth() + "." + date.getFullYear() + ".";
  }

  current_evaluation(appraisal: Appraisal): String {


    console.log("appraisal");
    console.log(appraisal);

    if (this.number_of_evaluations(appraisal) == 0)
      return "jos uvek ni jedan procenitelj nije dao svoju procenu";
    else {
      let value = 0;

      let value_high_priority = 0;
      let rating_formula_high_priority = 0;
      let value_low_priority = 0;
      let cnt_low_priority = 0;

      let evaluations = appraisal.evaluations;
      for (let i in appraisal.evaluations) {
        if (evaluations[i].rating <= 5) {
          value_low_priority += Number(evaluations[i].value);
          cnt_low_priority++;
          // console.log(value_low_priority + " : " + cnt_low_priority);

        }
        else {
          value_high_priority += (evaluations[i].rating ^ 3) * evaluations[i].value;
          rating_formula_high_priority += evaluations[i].rating ^ 3;
          // console.log(value_high_priority + " : " + rating_formula_high_priority);
        }
      }

      // console.log(value_high_priority + " : " + rating_formula_high_priority);
      // console.log(value_low_priority + " : " + cnt_low_priority);

      if (rating_formula_high_priority > 0) {
        value_high_priority /= rating_formula_high_priority;
      }



      if (cnt_low_priority > 0)
        value_low_priority /= cnt_low_priority;

      if (value_high_priority == 0)
        return value_low_priority.toString();
      else if (value_low_priority == 0)
        return value_high_priority.toString();
      else
        return (value_high_priority * 0.95 + value_low_priority * 0.05).toString();
    }
  
  
  
  
  
  
  
  }


  extractValue(arr, prop) {

    // extract value from property
    let extractedValue = arr.map(item => item[prop]);

    return extractedValue;

}


toFixed(num, fixed) {
  var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
  return num.toString().match(re)[0];
}

}
