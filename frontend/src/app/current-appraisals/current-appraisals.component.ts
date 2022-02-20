import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../services/general.service';
import { Appraisal } from '../models/appraisal.model';

@Component({
  selector: 'app-current-appraisals',
  templateUrl: './current-appraisals.component.html',
  styleUrls: ['./current-appraisals.component.css']
})
export class CurrentAppraisalsComponent implements OnInit {

  constructor(private router: Router, private service: GeneralService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("username");
    console.log("ngOnInit");
    this.init();
  }


  username: string;
  appraisals: Appraisal[] = null;


  init(): void {

    this.service.get_current_appraisals_user(this.username).subscribe(
      (appraisals: Array<Appraisal>) => {

        console.log("vratio se iz appraisala");

        this.appraisals = appraisals;

        console.log(this.appraisals);

      });
  }


  number_of_evaluations(appraisal: Appraisal): number {
    return appraisal.evaluations.length;
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
          value_high_priority += evaluations[i].rating ^ 3 * evaluations[i].value;
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



}
