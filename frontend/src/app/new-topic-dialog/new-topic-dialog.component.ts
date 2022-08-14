import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { NotificationService } from '../services/notification.service';


@Component({
  selector: 'app-new-topic-dialog',
  templateUrl: './new-topic-dialog.component.html',
  styleUrls: ['./new-topic-dialog.component.css']
})

export class NewTopicDialogComponent implements OnInit {

  // @Output("dummy_fun") parentFun: EventEmitter<any> = new EventEmitter();
  constructor(private service: GeneralService, private notificationService: NotificationService) { }

  ngOnInit(): void {

    this.username = JSON.parse(localStorage.getItem("user")).username;
    this.categories_map.set("art","umetnine");
    this.categories_map.set("social","druzenje");
    this.categories_map.set("fair","sajmovi");


  }

  username: string;
  title: string;
  category: string;
  comment: string;
  selected_category: string;
  categories: String[] = ["art", "fair", "social"];

  categories_map = new Map<any, String>();


  // result: boolean;

  close_topic() {

  }

  add_topic() {



    console.log("nesto smo i uradili" + this.title + " " + this.category + " " + this.comment);

    if (this.title == "" || this.title == null ||
      this.category == "" || this.category == null ||
      this.comment == "" || this.comment == null) {
      this.notificationService.error("sva polja moraju biti uneta");
    }

    // this.result = false;

    // this.parentFun.emit();

    else {

      this.service.add_topic(this.username, this.title, this.category, this.comment).subscribe((res: any) => {

        if(res["msg"] == "ok")
          this.notificationService.success("uspesno napravljena nova tema");
        else
          this.notificationService.error(res["msg"]);

      });
    }

  }

  get_keys(map: any){
    return Array.from(map.keys());
  }

}
