import { Component, OnInit } from '@angular/core';
// import { inherits } from 'util';
import { Router } from '@angular/router';
import { GeneralService } from '../services/general.service';
import { Topic } from '../models/topic.model';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {

  constructor(private router: Router, private service: GeneralService) { }


  topics: Topic[];
  topics_social: Topic[] = [];
  topics_art_piece: Topic[] = [];
  topics_fair: Topic[] = [];



  sort_choosen: string = "date_created";
  up_down_flag: string;


  // $event
  sort() {
    console.log(this.up_down_flag);
    console.log(this.sort_choosen);

    this.topics_art_piece.sort((a: Topic, b: Topic) => {


      let flag = this.up_down_flag === "up" ? 1 : -1;


      // if (this.sort_choosen === "date_created")
      //   return a.title > b.title ? 1 * flag : -1 * flag;

      if (this.sort_choosen === "title" || this.sort_choosen === "views" ||
        this.sort_choosen === "date_added")
        return a[this.sort_choosen] > b[this.sort_choosen] ? 1 * flag : -1 * flag;
      else if (this.sort_choosen === "comments_count")
        return a.comments.length - b.comments.length;
      else // last comment
        return a.comments[a.comments.length - 1].date_added > b.comments[a.comments.length - 1].date_added ? 1 * flag : -1 * flag;

    });
  }

  ngOnInit(): void {


    this.init();
  }



  init(): void {

    this.load_topics();



  }

  format_date(date_d: Date): string {
    let date = new Date(date_d);
    // console.log(date);
    return date.getHours() + ":" + date.getMinutes() + " " + date.getDate() + "." + date.getMonth() + "." + date.getFullYear() + ".";
  }

  load_topics() {
    this.service.get_all_topics().subscribe((topics: Topic[]) => {

      console.log(topics);

      this.topics = topics;


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
          this.topics_art_piece.push(this.topics[i]);

          console.log(i);
          console.log("jer sam usao ovde");
          // this.format_date(this.topics_art_piece[i].comments[this.topics[i].comments.length].date_added);

        }
      }
      console.log(this.topics_art_piece);
    });
  }

}
