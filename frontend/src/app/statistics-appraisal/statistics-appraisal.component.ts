import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';
// import { inherits } from 'util';
import { GeneralService } from '../services/general.service';
import { Ratings } from '../models/rating.model';
import { Appraisal } from '../models/appraisal.model';
import { FunctionService } from '../services/function.service';
import { AppraisalStatistics } from '../models/appraisal_statistics';


@Component({
    selector: 'app-statistics-appraisal',
    templateUrl: './statistics-appraisal.component.html',
    styleUrls: ['./statistics-appraisal.component.css']
})
export class StatisticsAppraisalComponent implements OnInit {

    constructor(private router: Router, private service: GeneralService,
        public functions: FunctionService) { }


    username_search: string = null;
    appraisals: Appraisal[] = null;
    appraisal_selected: Appraisal = null

    ngOnInit(): void {
    }

    search_user() {

        console.log("usao u search usera")

        this.service.get_history_appraisals_user(this.username_search).subscribe(
            (appraisals: Array<Appraisal>) => {

                console.log("vratio se iz appraisala");

                this.appraisals = appraisals;



                console.log(this.appraisals);

            });
    }

    fun_change($event) {
        console.log(this.appraisal_selected);
        console.log("function change");

        this.draw_chart();

    }



    draw_chart() {
        let x_axis_1 = [];

        let appraisal_statistics: AppraisalStatistics[] = [];

        // for (let i = 0; i < this.functions.number_of_evaluations(this.appraisal_selected); i++) {
        //     x_axis_1.push(i);

        //     if (this.functions.number_of_evaluations(this.appraisal_selected) > 0 &&
        //         !isNaN(this.appraisal_selected.value)) {
        //         // appraisal_statistics.push(new AppraisalStatistics(this.appraisal_selected.name, parseInt(this.functions.current_evaluation(this.appraisal_selected).toString()), this.appraisal_selected.value));
        //         // ovo je procenjena vrednost
        //     }
        // }


        for (let i = 0; i < this.functions.number_of_evaluations(this.appraisal_selected); i++) {
            x_axis_1.push(i);

            if (this.functions.number_of_evaluations(this.appraisal_selected) > 0 &&
                !isNaN(this.appraisal_selected.value)) {
                appraisal_statistics.push(new AppraisalStatistics(this.appraisal_selected.evaluations[i].username, parseInt(this.appraisal_selected.evaluations[i].value.toString()), this.appraisal_selected.value));
                // ovo je procenjena vrednost

                appraisal_statistics[i].estimated_value = parseInt(appraisal_statistics[i].estimated_value.toString()); 
            }
        }



        console.log("appraisal Statistics");
        console.log(appraisal_statistics);

        console.log(this.functions.extractValue(appraisal_statistics, "estimated_value"));

        Highcharts.chart('container_1', {
            chart: {
                zoomType: 'xy'
            },
            title: {
                text: 'Odnos prodate i procenjene vrednosti umetnine'
            },
            // subtitle: {
            //     text: 'Source: WorldClimate.com'
            // },
            xAxis: [{
                categories: this.functions.extractValue(appraisal_statistics, "name"),
                crosshair: true
            }],
            yAxis: [{ // Primary yAxis
                labels: {
                    format: '{value} €',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                title: {
                    text: 'Prodata cena',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                }
            }, { // Secondary yAxis
                title: {
                    text: 'Procenjena cena',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                labels: {
                    format: '{value} €',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                opposite: true
            }],
            tooltip: {
                shared: true
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                x: 120,
                verticalAlign: 'top',
                y: 100,
                floating: true,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || // theme
                    'rgba(255,255,255,0.25)'
            },
            series: [{
                name: 'Procenjena cena',
                type: 'spline',
                yAxis: 1,
                data: this.functions.extractValue(appraisal_statistics, "estimated_value"),
                tooltip: {
                    valueSuffix: ' mm'
                }

            }, {
                name: 'Prodata cena',
                type: 'spline',
                data: this.functions.extractValue(appraisal_statistics, "sold_value"),
                tooltip: {
                    valueSuffix: '°C'
                }
            }]
        });


        console.log("extractovana vrednost");
        console.log(this.functions.extractValue(appraisal_statistics, "estimated_value"));
        console.log(this.functions.extractValue(appraisal_statistics, "sold_value"));
    }

}

