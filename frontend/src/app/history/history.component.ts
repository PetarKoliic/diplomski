import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { Appraisal } from '../models/appraisal.model';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';
import { FunctionService } from '../services/function.service';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  constructor(private router: Router, private service: GeneralService,
    private notificationService: NotificationService,
    public functions: FunctionService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("username");
    console.log("ngOnInit");
    this.init();
  }


  username: string;
  appraisals: Appraisal[] = null;
  img_map: Map<string, number> = new Map<string, number>();
  img_pagination: Map<string, Object> = new Map<string, Object>();
  user_payed: boolean = true;
  // user_type: string;


  init(): void {

    // this.user_type = localStorage.getItem("type");
    console.log("****************");
    console.log(localStorage.getItem("user_payed"));
    console.log("****************");
    // if (this.user_type == "user") {
      if (localStorage.getItem("user_payed") == "true")
        this.user_payed = true;
      else this.user_payed = false;

      console.log("***");
      console.log(this.user_payed);
      console.log("***");

    // }

    this.service.get_history_appraisals_user(this.username).subscribe(
      (appraisals: Array<Appraisal>) => {

        console.log("vratio se iz appraisala");

        this.appraisals = appraisals;

        for (let i in appraisals) {
          this.img_map.set(appraisals[i]._id, 0);
          this.img_pagination.set(appraisals[i]._id, { "start_index": 0, "end_index": 1 });

          // this.estimated_values.set(appraisals[i]._id, 0)
        }


        console.log(this.appraisals);

      });
  }


  paginator_images: Array<String[]>;
  pageEvent(event: PageEvent, appraisal: Appraisal) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if (endIndex > appraisal.img_names.length)
      endIndex = appraisal.img_names.length;

    // ovo izmeni
    // this.paginator_images=this.all_countries.slice(startIndex,endIndex);

    // this.img_pagination.set(appraisal._id, { "start_index": startIndex, "end_index": endIndex });

    this.img_pagination.set(appraisal._id, { "start_index": startIndex, "end_index": endIndex });


  }

  show_img(appraisal: Appraisal): string[] {
    // this.all_countries.slice(0, this.page_size);

    // console.log("pagination");
    // console.log(this.img_pagination.get(appraisal._id)["start_index"]);
    // console.log(this.img_pagination.get(appraisal._id)["end_index"]);

    return appraisal.img_names.slice(this.img_pagination.get(appraisal._id)["start_index"],
      this.img_pagination.get(appraisal._id)["end_index"]);
  }

  // number_of_evaluations(appraisal: Appraisal): number {
  //   return appraisal.evaluations.length;
  // }



  // finish_appraisal(appraisal: Appraisal)
  // {
  // this.service.user_finish_appraisal(appraisal._id).subscribe(
  // (res: Object) => {
  // 
  // 
  // console.log(res["msg"]);
  // if (res["msg"] == "ok") {
  // for (let i in this.appraisals) {
  // if (this.appraisals[i]._id === appraisal._id) {
  // 
  // this.appraisals.splice(Number(i), 1);
  // }
  // }
  // }
  // 
  // this.notificationService.alert("Nasilno zavrsena procena");
  // console.log("response : " + res["msg"]);
  // 
  // });
  // }


  // current_evaluation(appraisal: Appraisal): String {


  //   console.log("appraisal");
  //   console.log(appraisal);

  //   if (this.number_of_evaluations(appraisal) == 0)
  //     return "jos uvek ni jedan procenitelj nije dao svoju procenu";
  //   else {
  //     let value = 0;

  //     let value_high_priority = 0;
  //     let rating_formula_high_priority = 0;
  //     let value_low_priority = 0;
  //     let cnt_low_priority = 0;

  //     let evaluations = appraisal.evaluations;
  //     for (let i in appraisal.evaluations) {
  //       if (evaluations[i].rating <= 5) {
  //         value_low_priority += Number(evaluations[i].value);
  //         cnt_low_priority++;
  //         // console.log(value_low_priority + " : " + cnt_low_priority);

  //       }
  //       else {
  //         value_high_priority += evaluations[i].rating ^ 3 * evaluations[i].value;
  //         rating_formula_high_priority += evaluations[i].rating ^ 3;
  //         // console.log(value_high_priority + " : " + rating_formula_high_priority);
  //       }
  //     }

  //     // console.log(value_high_priority + " : " + rating_formula_high_priority);
  //     // console.log(value_low_priority + " : " + cnt_low_priority);

  //     if (rating_formula_high_priority > 0) {
  //       value_high_priority /= rating_formula_high_priority;
  //     }
  //     if (cnt_low_priority > 0)
  //       value_low_priority /= cnt_low_priority;

  //     if (value_high_priority == 0)
  //       return value_low_priority.toString();
  //     else if (value_low_priority == 0)
  //       return value_high_priority.toString();
  //     else
  //       return (value_high_priority * 0.95 + value_low_priority * 0.05).toString();
  //   }
  // }

}
