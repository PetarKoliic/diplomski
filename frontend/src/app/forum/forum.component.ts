import { Component, OnInit } from '@angular/core';
// import { inherits } from 'util';
import { Router } from '@angular/router';
import { GeneralService } from '../services/general.service';
import { Topic } from '../models/topic.model';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { NotificationService } from '../services/notification.service';
import { ChangeDetectorRef } from '@angular/core';
import { TopicPagination } from '../models/topic-pagination';


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  constructor(private router: Router, private service: GeneralService,
    private notificationService: NotificationService, private changeDetectorRefs: ChangeDetectorRef) { }


  topics: Topic[];
  // topics_social: Topic[] = [];
  // topics_fair: Topic[] = [];

  page_size_options: number[] = [1, 3, 5];

  // topics_art_piece: Topic[] = [];
  // show_topics_art_piece: Topic[];
  arts: TopicPagination = new TopicPagination("art",0, this.page_size_options[0], this.page_size_options[0]);
  fairs : TopicPagination = new TopicPagination("fair",0, this.page_size_options[0], this.page_size_options[0]);
  socials: TopicPagination = new TopicPagination("social", 0, this.page_size_options[0], this.page_size_options[0]);


  search_topic: string;
  sort_choosen: string = "date_created";
  up_down_flag: string;


  guest: boolean = false;

  // $event
  sort() {
    console.log(this.up_down_flag);
    console.log(this.sort_choosen);

    TopicPagination.sort_all(this.search_topic, this.sort_choosen, this.up_down_flag);
    // this.arts.sort(this.search_topic, this.sort_choosen, this.up_down_flag);

  }

  // search mora da se ponovi ?????????????????????????????????????????
  // TODO TODO
  // topic_pagination: TopicPagination
  search()
  {
    console.log(this.search_topic);



    this.service.get_all_topics().subscribe((topics: Topic[]) => {

      console.log(topics);

      this.topics = topics;

      // this.arts.topics = [];
      // this.fairs.topics = [];
      // this.topics_social = [];
      TopicPagination.empty_all_topics();

      for (let i = 0; i < this.topics.length; i++) {

        if (this.topics[i].category === "social") {
          this.socials.topics.push(this.topics[i]);
        }
        else if (this.topics[i].category === "fair") {
          this.fairs.topics.push(this.topics[i]);
        }
        else if (this.topics[i].category === "art") {
          this.arts.topics.push(this.topics[i]);


        }
      }
      console.log("dosli dovde");
      // console.log(this.topics_art_piece);
      console.log(this.arts.topics);
      console.log(this.fairs.topics);
      console.log(this.socials.topics);

      this.arts.topics = this.arts.topics.filter(topic => topic.title.includes(this.search_topic));
      this.socials.topics = this.socials.topics.filter(topic => topic.title.includes(this.search_topic));
      this.fairs.topics = this.fairs.topics.filter(topic => topic.title.includes(this.search_topic));


      console.log("art piece");
      console.log(this.arts.topics);

      TopicPagination.refresh_all_topics(this.startIndex, this.endIndex, 1);
    });


  }

  ngOnInit(): void {
    this.init();
  }



  init(): void {

    if(localStorage.getItem("username") == null)
      this.guest = true;
    else
      this.guest = false;


    this.load_topics();

    console.log("prodji sa mnom ");

  }

  endIndex: number = 1;
  startIndex : number = 0;

  pageEvent(event: PageEvent, topic_pagination: TopicPagination) {
    this.startIndex = event.pageIndex * event.pageSize;
    this.endIndex = this.startIndex + event.pageSize;

    // this.arts.show_topics = [];

    // topic_pagination.show_topics = [];

    // if (this.endIndex == this.arts.topics.length)
    //   this.endIndex = this.arts.topics.length;
    // console.log("osvezena stranica");
    // console.log("startIndex :" + this.startIndex + " endIndex: " + this.endIndex);
    topic_pagination.refresh_show_topics(this.startIndex, this.endIndex, event.pageSize);
    // console.log(this.arts.show_topics)
    // console.log(this.arts.topics);
    this.changeDetectorRefs.detectChanges();

  }

  format_date(date_d: Date): string {
    let date = new Date(date_d);
    // console.log(date);
    return date.getHours() + ":" + date.getMinutes() + " " + date.getDate() + "." + date.getMonth() + "." + date.getFullYear() + ".";
  }

  load_topics() {

    TopicPagination.empty_all_topics();

    this.service.get_all_topics().subscribe((topics: Topic[]) => {

      console.log(topics);

      this.topics = topics;



      for (let i = 0; i < this.topics.length; i++) {

        if (this.topics[i].category === "social") {
          // this.topics_social.push(this.topics[i]);
          this.socials.topics.push(this.topics[i]);
        }
        else if (this.topics[i].category === "fair") {
          // this.topics_fair.push(this.topics[i]);
          this.fairs.topics.push(this.topics[i]);
        }
        else if (this.topics[i].category === "art") {
          // this.topics_art_piece.push(this.topics[i]);

          this.arts.topics.push(this.topics[i]);

          console.log(i);
          console.log("jer sam usao ovde");
          // this.format_date(this.topics_art_piece[i].comments[this.topics[i].comments.length].date_added);

        }
      }


      console.log("duzina niza" + this.arts.topics.length);
      console.log("arts niz");
      console.log(this.arts.topics);

      // this.arts.refresh_show_topics(this.startIndex, this.endIndex, this.page_size_options[0]);
      TopicPagination.refresh_all_topics(this.startIndex, this.endIndex, this.page_size_options[0]);

    this.changeDetectorRefs.detectChanges();
      console.log("load_topics()");
      console.log(this.arts.show_topics);
    });
  }



  open_topic(topic_name: string)
  {
    this.router.navigate(['topic/', topic_name ]);
  }
}
