import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../services/general.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  constructor(private router: ActivatedRoute, private service: GeneralService) { }

  ngOnInit(): void {

    console.log(this.router.snapshot.paramMap.get('name'));
  }

}
