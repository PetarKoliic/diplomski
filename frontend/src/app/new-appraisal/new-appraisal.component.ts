import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../services/general.service';

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
  message_success: boolean = false;
  message_fail: boolean = false;
  description: string;

  constructor(private router: Router, private service: GeneralService) { }


  ngOnInit(): void {
    this.username = localStorage.getItem("username");

  }


  upload(event: any) {

    this.message_fail = false;
    this.message_success = false;
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


  confirm_upload() {

    this.service.add_appraisals(this.images, this.username, this.description).subscribe((res: any) => {

      if (res.msg == "ok") {
        this.message_success = true;
        this.message_fail = false;
      }
      else {
        this.message_success = false;
        this.message_fail = true;
      }

      console.log(res);

      this.images = [];
      this.previews = [];
      this.pic = null;


    });
  }
}
