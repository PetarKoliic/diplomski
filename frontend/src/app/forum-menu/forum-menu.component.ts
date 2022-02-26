import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../services/general.service';
import {MatDialog} from '@angular/material/dialog'
import { NewTopicDialogComponent } from '../new-topic-dialog/new-topic-dialog.component';


@Component({
  selector: 'app-forum-menu',
  templateUrl: './forum-menu.component.html',
  styleUrls: ['./forum-menu.component.css']
})
export class ForumMenuComponent implements OnInit {

  @Output("load_topics") load_topics: EventEmitter<any> = new EventEmitter();
  constructor(private router: Router, private service: GeneralService, public dialog: MatDialog) { }


  username: string;

  ngOnInit(): void {

    this.username = JSON.parse(localStorage.getItem("user")).username;
  }

  logout()
  {
    localStorage.clear();
    this.router.navigate(['']);

  }

  open_new_topic()
  {
    const dialogRef = this.dialog.open(NewTopicDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      this.load_topics.emit();
    });
  }
  

}
