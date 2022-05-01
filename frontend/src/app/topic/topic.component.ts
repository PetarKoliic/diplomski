import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../services/general.service';
import { ActivatedRoute } from '@angular/router';
import { inherits } from 'util';
import { Topic } from '../models/topic.model';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { Comment } from '../models/comment.model';
import { NotificationService } from '../services/notification.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  constructor(private _router: Router, private router: ActivatedRoute, private service: GeneralService, private notificationService: NotificationService,
    private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {


    this.init();

    console.log("usao u ngOnInit");
  }
  topic_title: string;
  username: string;
  topic: Topic = null;
  new_comment: string;


  init(): void {
    this.topic_title = this.router.snapshot.paramMap.get('name');
    this.username = localStorage.getItem("username");

    console.log(this.topic_title);
    console.log(this.username);

    this.show_comments = [];
    this.service.get_topic(this.topic_title).subscribe((topic: Topic) => {

      this.topic = topic;
      console.log(topic);

      console.log(topic);

      this.show_comments = this.topic.comments.slice(this.startIndex, this.endIndex);

      this.show_comments = [...this.show_comments];

      console.log(this.show_comments);

    });
  }

  endIndex: number = 1;
  startIndex: number = 0;
  pageSize: number
  show_comments: Comment[];

  pageEvent(event: PageEvent) {
    this.startIndex = event.pageIndex * event.pageSize;
    this.endIndex = this.startIndex + event.pageSize;
    this.pageSize = event.pageSize;

    this.show_comments = [];

    if (this.endIndex > this.topic.comments.length)
      this.endIndex = this.topic.comments.length;

    // ovo izmeni
    // this.paginator_images=this.all_countries.slice(startIndex,endIndex);

    // this.img_pagination.set(appraisal._id, { "start_index": startIndex, "end_index": endIndex });

    this.show_comments = this.topic.comments.slice(this.startIndex, this.endIndex);

  }

  format_date(date_d: Date): string {
    let date = new Date(date_d);
    // console.log(date);
    return date.getHours() + ":" + date.getMinutes() + " " + date.getDate() + "." + date.getMonth() + "." + date.getFullYear() + ".";
  }

  add_comment() {

    if (this.new_comment == "" || this.new_comment == null)
      this.notificationService.error("komentar ne sme da stoji prazan");

    else {

      this.show_comments = [];
      console.log(this.username + " " + this.topic._id + " " + new Date() + " " + this.new_comment);
      this.service.add_comment(this.username, this.topic._id, new Date(), this.new_comment).subscribe((res: any) => {

        console.log(res["msg"]);

        if (this.endIndex - this.startIndex + 1 <= this.pageSize)
          this.endIndex++;
        this.reload_comments();

        this.new_comment = "";

        this.notificationService.success("uspesno dodat komentar");
      });

    }
  }



  delete_comment(comment: Comment) {

    console.log(comment);

    console.log(comment.username + " " + comment.comment + " " + comment.date_added);


    this.service.delete_comment(comment.username, this.topic._id, comment.comment, comment.date_added).subscribe((res: any) => {

      console.log("vratili smo se iz http zahteva");
      console.log(res["msg"]);


      this.notificationService.success("uspesno obrisan komentar");

      if (this.endIndex - 1 >= 0)
        this.endIndex--;

      this.reload_comments();


    });
  }

  reload_comments() {
    this.show_comments = [];
    this.service.get_topic(this.topic_title).subscribe((topic: Topic) => {

      this.topic = topic;
      console.log(topic);

      console.log(topic);
      this.show_comments = this.topic.comments.slice(this.startIndex, this.endIndex);
      // console.log(this.)


      console.log(this.startIndex);
      console.log(this.endIndex);
      this.show_comments = Object.assign([], this.show_comments);

      this.changeDetectorRefs.detectChanges();

    });
  }

  show_comments_fun(): Comment[] {
    return this.show_comments;
  }


  logout() {
    localStorage.clear();
    this._router.navigate(['']);

  }

}
