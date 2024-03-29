import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../services/general.service';
import { Appraisal } from '../models/appraisal.model';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationService } from '../services/notification.service';
import { FunctionService } from '../services/function.service';

@Component({
  selector: 'app-art-for-appraisal',
  templateUrl: './art-for-appraisal.component.html',
  styleUrls: ['./art-for-appraisal.component.css'],
})
export class ArtForAppraisalComponent implements OnInit {
  constructor(
    private router: Router,
    private service: GeneralService,
    private notificationService: NotificationService,
    public global_functions: FunctionService
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username');

    console.log('usao ovde');
    this.init();
  }

  username: string;
  // img_indexes: number[] = [];
  img_map: Map<string, number> = new Map<string, number>();
  img_pagination: Map<string, Object> = new Map<string, Object>();
  appraisals: Appraisal[] = null;
  estimated_values: Map<string, number> = new Map<string, number>();

  init(): void {
    this.service
      .get_current_appraisals_appraiser(this.username)
      .subscribe((appraisals: Array<Appraisal>) => {
        this.appraisals = appraisals;

        console.log(this.appraisals);

        for (let i in appraisals) {
          this.img_map.set(appraisals[i]._id, 0);
          this.img_pagination.set(appraisals[i]._id, {
            start_index: 0,
            end_index: 1,
          });

          // this.estimated_values.set(appraisals[i]._id, 0)
        }

        console.log(this.appraisals);
        console.log(this.img_map);
      });
  }

  get_value(event: Event): number {
    console.log(event);

    // return Number((event.target as HTMLInputElement).value);
    return Number(event);
  }

  show_img(appraisal: Appraisal): string[] {
    // this.all_countries.slice(0, this.page_size);

    // console.log("pagination");
    // console.log(this.img_pagination.get(appraisal._id)["start_index"]);
    // console.log(this.img_pagination.get(appraisal._id)["end_index"]);

    return appraisal.img_names.slice(
      this.img_pagination.get(appraisal._id)['start_index'],
      this.img_pagination.get(appraisal._id)['end_index']
    );
  }

  img_name(apprasial: Appraisal) {
    return apprasial.img_names[this.img_map.get(apprasial._id)];
  }

  forward_image(appraisal: Appraisal) {
    let position = this.img_map.get(appraisal._id);

    if (appraisal.img_names.length > position + 1) position++;

    this.img_map.set(appraisal._id, position);
  }

  backward_image(appraisal: Appraisal) {
    let position = this.img_map.get(appraisal._id);

    if (0 <= position - 1) position--;

    this.img_map.set(appraisal._id, position);
  }

  paginator_images: Array<String[]>;
  pageEvent(event: PageEvent, appraisal: Appraisal) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;

    if (endIndex > appraisal.img_names.length)
      endIndex = appraisal.img_names.length;

    // ovo izmeni
    // this.paginator_images=this.all_countries.slice(startIndex,endIndex);

    this.img_pagination.set(appraisal._id, {
      start_index: startIndex,
      end_index: endIndex,
    });
  }

  estimated_value: number;
  appraise(appraisal: Appraisal) {
    console.log('******************');
    console.log(this.estimated_values.get(appraisal._id));

    this.estimated_value = this.estimated_values.get(appraisal._id);

    if (!this.global_functions.check_positive_number(this.estimated_value)) {
      this.notificationService.error('Greska morate uneti pozitivan broj');
    } else {
      this.service
        .give_appraisal(appraisal._id, this.username, this.estimated_value)
        .subscribe((res: Object) => {
          if (res['msg'] == 'ok') {
            for (let i in this.appraisals) {
              if (this.appraisals[i]._id === appraisal._id) {
                this.appraisals.splice(Number(i), 1);
              }
            }

            this.notificationService.success('uspesno procenjena umetnina');
          } else
            this.notificationService.error('neuspesno procenjena umetnina');

          console.log('response : ' + res['msg']);
        });
    }
  }
}
