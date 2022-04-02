import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';
// import { inherits } from 'util';
import { GeneralService } from '../services/general.service';
import { Ratings } from '../models/rating.model';
import { Appraisal } from '../models/appraisal.model';


@Component({
  selector: 'app-statistics-user',
  templateUrl: './statistics-user.component.html',
  styleUrls: ['./statistics-user.component.css']
})
export class StatisticsUserComponent implements OnInit {

  constructor(private router: Router, private service: GeneralService) { }


  username_search: string = null;
  appraisals: Appraisal[] = null;
  appraisal_selected: Appraisal = null
  
  ngOnInit(): void {
  }

  search_user() {

    this.service.get_history_appraisals_user(this.username_search).subscribe(
      (appraisals: Array<Appraisal>) => {

        console.log("vratio se iz appraisala");

        this.appraisals = appraisals;



        console.log(this.appraisals);

      });
  }

  fun_change($event)
  {
    console.log(this.appraisal_selected);
    console.log("function change");
  }

}

