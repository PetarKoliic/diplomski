import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../services/general.service';
import * as Highcharts from 'highcharts';
// import { inherits } from 'util';
import { Ratings } from '../models/rating.model';





@Component({
  selector: 'app-statistics-appraiser-rating',
  templateUrl: './statistics-appraiser-rating.component.html',
  styleUrls: ['./statistics-appraiser-rating.component.css']
})
export class StatisticsAppraiserRatingComponent implements OnInit {



  a: any;

  private options_1: any = null;
  private options_2: Object = null;


  constructor(private router: Router, private service: GeneralService) { }



  username: string;

  ngOnInit() {
    // Highcharts.chart('container', this.options);

    // this.a = Highcharts.chart('container_2', this.options_2);


    // Highcharts.chart('container_3', this.options_1);


  }



  login() {
    this.service.get_ratings_by_user(this.username).subscribe((ratings: Ratings) => {


      console.log(ratings.ratings);

      // this.options_1.series.data = ratings.ratings;

      // console.log(this.options_1.series.data);

      let y_axis_1 = [];
      let x_axis_1 = [];

      let j = 0;
      for (let i in ratings.ratings) {
        x_axis_1.push(++j);
        y_axis_1.push(ratings.ratings[i]);
      }

      // let data_obj = {"data" : data};
      console.log("data");
      console.log(y_axis_1 );

      this.options_1 = {
        chart: {
          type: 'line'
        },
        xAxis: {
          name: ''
          // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        title: {
          text: 'Rejting pojedinacnih procena'
        },

        plotOptions: {
          series: {
            fillOpacity: 1
          }
        },

        series: [{
          "data": y_axis_1 
        }]
      };

      console.log(x_axis_1);
      this.options_1.xAxis.categories = x_axis_1;
      this.options_1.subtitle = { 'text': 'username: ' + ratings.username };

      Highcharts.chart('container_1', this.options_1);

      this.options_2 = JSON.parse(JSON.stringify(this.options_1));

      
      let y_axis_2 = [];
      // let x_axis_1 = [];

      let cnt_values = ratings.ratings.length;
      let total_value = 0;
      if (cnt_values > 0) {
        y_axis_2.push(y_axis_1[0]);
        total_value = y_axis_1[0];
      }


    
      
      for (let i = 1; i < cnt_values; i++) {

        total_value += y_axis_1[i];
        y_axis_2.push(total_value  / (i + 1));
      }

      console.log(y_axis_2);
      this.options_2["series"][0]["data"] = y_axis_2;
      this.options_2["title"]["text"] = "ukupan rejting posle svakog pogadjanja";
      

      Highcharts.chart('container_2', this.options_2);
      

    });
  }
}
