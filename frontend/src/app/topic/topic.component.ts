import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../services/general.service';
import {ActivatedRoute} from '@angular/router';
import { inherits } from 'util';
import { Topic } from '../models/topic.model';
import { MatPaginator } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  constructor(private _router:Router, private router: ActivatedRoute, private service: GeneralService) { }

  ngOnInit(): void {


    this.init();
  }
  topic_title: string; 
  username: string;
  topic: Topic = null;

  init(): void
  {
    this.topic_title = this.router.snapshot.paramMap.get('name');
    this.username = localStorage.getItem("username");

    console.log(this.topic_title);
    console.log(this.username);

    this.service.get_topic(this.topic_title).subscribe((topic: Topic) => {

      this.topic = topic;
      console.log(topic);

      console.log(topic.comments);

    });
  }

  format_date(date_d: Date): string {
    let date = new Date(date_d);
    // console.log(date);
    return date.getHours() + ":" + date.getMinutes() + " " + date.getDate() + "." + date.getMonth() + "." + date.getFullYear() + ".";
  }



  logout()
  {
    localStorage.clear();
    this._router.navigate(['']);

  }

}
