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
  topics_social: Topic[] = [];
  
  topics_fair: Topic[] = [];


  // topics_art_piece: Topic[] = [];
  // show_topics_art_piece: Topic[];
  arts: TopicPagination = new TopicPagination();


  search_topic: string;
  sort_choosen: string = "date_created";
  up_down_flag: string;
  

  // $event
  sort() {
    console.log(this.up_down_flag);
    console.log(this.sort_choosen);

    this.arts.sort(this.search_topic, this.sort_choosen, this.up_down_flag);
    // this.show_topics_art_piece.sort((a: Topic, b: Topic) => {


    //   let flag = this.up_down_flag === "up" ? 1 : -1;


    //   // if (this.sort_choosen === "date_created")
    //   //   return a.title > b.title ? 1 * flag : -1 * flag;

    //   if (this.sort_choosen === "title" || this.sort_choosen === "views" ||
    //     this.sort_choosen === "date_added")
    //     return a[this.sort_choosen] > b[this.sort_choosen] ? 1 * flag : -1 * flag;
    //   else if (this.sort_choosen === "comments_count")
    //     return a.comments.length - b.comments.length;
    //   else // last comment
    //     return a.comments[a.comments.length - 1].date_added > b.comments[b.comments.length - 1].date_added ? 1 * flag : -1 * flag;

    // });

    // this.sort_array_criteria(this.show_topics_art_piece);
    // this.sort_array_criteria(this.topics_art_piece);

    // console.log(this.show_topics_art_piece);
    // console.log(this.topics_art_piece);

  }

  sort_array_criteria(topics: Topic[])
  {
    topics.sort((a: Topic, b: Topic) => {


      let flag = this.up_down_flag === "up" ? 1 : -1;


      // if (this.sort_choosen === "date_created")
      //   return a.title > b.title ? 1 * flag : -1 * flag;

      if (this.sort_choosen === "title" || this.sort_choosen === "views" ||
        this.sort_choosen === "date_added")
        return a[this.sort_choosen] > b[this.sort_choosen] ? 1 * flag : -1 * flag;
      else if (this.sort_choosen === "comments_count")
        return a.comments.length - b.comments.length;
      else // last comment
        return a.comments[a.comments.length - 1].date_added > b.comments[b.comments.length - 1].date_added ? 1 * flag : -1 * flag;

    });

    console.log(topics);
  }  

  search()
  {
    console.log(this.search_topic);



    this.service.get_all_topics().subscribe((topics: Topic[]) => {

      console.log(topics);

      this.topics = topics;

      // this.topics_art_piece = [];
      this.arts.topics = []
      this.topics_fair = [];
      this.topics_social = [];

      for (let i = 0; i < this.topics.length; i++) {
        // console.log(this.topics[i]);
        // console.log(this.topics);
        if (this.topics[i].category === "social") {
          this.topics_social.push(this.topics[i]);
        }
        else if (this.topics[i].category === "fair") {
          this.topics_fair.push(this.topics[i]);
        }
        else if (this.topics[i].category === "art") {
          // this.topics_art_piece.push(this.topics[i]);
          this.arts.topics.push(this.topics[i]);

          // console.log(i);
          // console.log("jer sam usao ovde");
          // this.format_date(this.topics_art_piece[i].comments[this.topics[i].comments.length].date_added);

        }
      }
      console.log("dosli dovde");
      // console.log(this.topics_art_piece);
      console.log(this.arts.topics);
      
      // this.topics_art_piece = this.topics_art_piece.filter(topic => topic.title.includes(this.search_topic));
      // this.show_topics_art_piece = this.topics_art_piece;
      this.arts.topics = this.arts.topics.filter(topic => topic.title.includes(this.search_topic));

      console.log("art piece");
      console.log(this.arts.topics);
    });





    // console.log(this.topics_art_piece);
  }

  ngOnInit(): void {


    this.init();
  }



  init(): void {

    this.load_topics();

    console.log("prodji sa mnom ");

  }

  endIndex: number = 1;
  startIndex : number = 0;

  // paginator_images: Array<String[]>;
  pageEvent(event: PageEvent) {
    this.startIndex = event.pageIndex * event.pageSize;
    this.endIndex = this.startIndex + event.pageSize;

    // this.show_topics_art_piece = [];
    this.arts.show_topics = [];

    // if (this.endIndex == this.topics_art_piece.length)
    //   this.endIndex = this.topics_art_piece.length;

    if (this.endIndex == this.arts.topics.length)
      this.endIndex = this.arts.topics.length;


    this.arts.fill_indexes(this.startIndex, this.endIndex, event.pageSize);

    // ovo izmeni
    // this.paginator_images=this.all_countries.slice(startIndex,endIndex);

    // this.img_pagination.set(appraisal._id, { "start_index": startIndex, "end_index": endIndex });


    this.arts.refresh_show_topics();
    // this.show_topics_art_piece = this.topics_art_piece.slice(this.startIndex, this.endIndex);

  }

  format_date(date_d: Date): string {
    let date = new Date(date_d);
    // console.log(date);
    return date.getHours() + ":" + date.getMinutes() + " " + date.getDate() + "." + date.getMonth() + "." + date.getFullYear() + ".";
  }

  load_topics() {


    // this.show_topics_art_piece = [];


    this.service.get_all_topics().subscribe((topics: Topic[]) => {

      console.log(topics);

      this.topics = topics;

      // this.topics_art_piece = [];
      this.topics_fair = [];
      this.topics_social = [];


      for (let i = 0; i < this.topics.length; i++) {
        // console.log(this.topics[i]);
        // console.log(this.topics);
        if (this.topics[i].category === "social") {
          this.topics_social.push(this.topics[i]);
        }
        else if (this.topics[i].category === "fair") {
          this.topics_fair.push(this.topics[i]);
        }
        else if (this.topics[i].category === "art") {
          // this.topics_art_piece.push(this.topics[i]);

          this.arts.topics.push(this.topics[i]);

          console.log(i);
          console.log("jer sam usao ovde");
          // this.format_date(this.topics_art_piece[i].comments[this.topics[i].comments.length].date_added);

        }
      }


      // console.log("duzina niza" + this.topics_art_piece.length);
      console.log("duzina niza" + this.arts.topics.length);

      // ???????????????????????????????????????
      // if (this.endIndex + 1 == this.topics_art_piece.length)
      //   this.endIndex++;
      // ???????????????????????????????????????

    // this.show_topics_art_piece = [...this.topics_art_piece.slice(this.startIndex, this.endIndex)];
      this.arts.refresh_show_topics();

    this.changeDetectorRefs.detectChanges();      
      console.log("load_topics()");
      // console.log(this.show_topics_art_piece);
      console.log(this.arts.show_topics);
    });
  }



  open_topic(topic_name: string)
  {

    console.log("usao 22");

    this.router.navigate(['topic/', topic_name ]);
  }
}
