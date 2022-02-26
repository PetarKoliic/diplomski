import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { GeneralService } from '../services/general.service';


@Component({
  selector: 'app-new-topic-dialog',
  templateUrl: './new-topic-dialog.component.html',
  styleUrls: ['./new-topic-dialog.component.css']
})

export class NewTopicDialogComponent implements OnInit {
  
  // @Output("dummy_fun") parentFun: EventEmitter<any> = new EventEmitter();
  constructor(private service: GeneralService) { }

  ngOnInit(): void {

    this.username = JSON.parse(localStorage.getItem("user")).username;

  }

  username: string;
  title: string;
  category: string;
  description: string;
  selected_category: string;
  categories: String[] = ["art", "fair", "social"];
  // result: boolean;

  add_topic()
  {
    console.log("nesto smo i uradili" + this. title + " " + this.category + " " + this.description);


    // this.result = false;
    
    // this.parentFun.emit();    

    this.service.add_topic(this.username, this.title, this.category, this.description).subscribe((res: any) => {

      console.log(res["msg"]);
      
    });


  }

}
