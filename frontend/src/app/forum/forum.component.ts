import { Component, OnInit } from '@angular/core';
import { inherits } from 'util';
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

  ngOnInit(): void {
    

    this.init();
  }

  init(): void
  {

    this.service.get_all_topics().subscribe((topics: Topic[]) => {

      console.log(topics);

      this.topics = topics;

      for(let i = 0; i < this.topics.length; i++)
      {
        console.log(this.topics[i]);
        console.log(this.topics);
        if(this.topics[i].theme === "social")
        {
          this.topics_social.push(this.topics[i]);
        }
        else if (this.topics[i].theme === "fair")
        {
          this.topics_fair.push(this.topics[i]);
        }
        else if(this.topics[i].theme === "art_piece")
        {
          this.topics_art_piece.push(this.topics[i]);

        }
      }
    });



  }

  folder: Object [];

}
