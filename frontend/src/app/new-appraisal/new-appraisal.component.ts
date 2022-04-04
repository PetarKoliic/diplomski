import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../services/general.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-new-appraisal',
  templateUrl: './new-appraisal.component.html',
  styleUrls: ['./new-appraisal.component.css']
})
export class NewAppraisalComponent implements OnInit {


  selectedFile: File = null;
  pic: File = null;
  previews: string[] = [];
  images: File[] = [];
  username: string;
  description: string;
  name: string;
  country: string;
  date: Date;
  author: string;

  // message_success: boolean = false;
  // message_fail: boolean = false;

  constructor(private router: Router, private service: GeneralService, private notificationService: NotificationService) { }


  ngOnInit(): void {
    this.username = localStorage.getItem("username");

  }


  upload(event: any) {

    // this.message_fail = false;
    // this.message_success = false;
    this.pic = event.target.files[0];


    // this.previews = [];
    if (event.target.files[0] != null) {
      // const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.pic);

        // this.selectedFileNames.push(this.pic.name);

        this.images.push(event.target.files[i]);
      }
      console.log("slike");
      console.log(this.previews);
    }



  }

  // name: string;
  // country: string;
  // date: Date;
  confirm_upload() {

    console.log("slika");
    console.log(this.images == [] ? "prazna slika" : "nije prazna");
    console.log(this.images);    

    if (this.name == "" || this.name == null ||  
        this.country == "" || this.country == null ||
                              this.date == null ||
        this.author == "" || this.author == null ||
        // this.description == "" || this.description == null ||
        this.images == [] || this.images.length == 0) {

          this.notificationService.error("polja ime, zemlja, autor i slika su obavezna polja");

    }
    else {

      this.service.add_appraisals(this.images, this.username, this.name, this.country, this.date, this.author, this.description).subscribe((res: any) => {

        if (res.msg == "ok") {
          // this.message_success = true;
          // this.message_fail = false;
          console.log("Dobro sam proslo");
          this.notificationService.success("uspesno postavljena nova umetnina na procenu");
        }
        else {
          // this.message_success = false;
          // this.message_fail = true;

          this.notificationService.error("neuspesno postavljena nova umetnina na procenu");
        }

        console.log(res);

        this.images = [];
        this.previews = [];
        this.pic = null;
        this.description = "";
        this.author = "";
        this.country = "";
        this.date = null;
        this.name = "";


      });
    }
  }

}
