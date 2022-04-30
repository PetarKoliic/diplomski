import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../services/general.service';
import * as CryptoJS from 'crypto-js';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private router: Router, private service: GeneralService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("username");
    this.type = localStorage.getItem("type");

    console.log("type: " + this.type);
    this.old_password = "";

  }

  username: string = "";
  old_password: string = "";
  new_password: string = "";
  // message: string = "";
  new_password_repeat: string = "";
  type: string = "";

  change_password() {

    if (this.username == "" || this.old_password == ""
      || this.new_password == "" || this.new_password_repeat == "") {
      // this.message = "svi podaci moraju biti uneti";
      this.notificationService.error("svi podaci moraju biti uneti")
      return;
    }
    else if (this.new_password != this.new_password_repeat) {
      // this.message = "potvrdjena nova lozinka ne odgovara novoj lozinki";
      this.notificationService.error("potvrdjena nova lozinka ne odgovara novoj lozinki");

      return;
    }


    else {

      this.service.check_old_password(this.username, CryptoJS.SHA3(this.old_password, { outputLength: 224 }).toString()).subscribe(data => {

        if (data["msg"] === "ok") {
          this.service.change_password(this.username, CryptoJS.SHA3(this.new_password, { outputLength: 224 }).toString()).subscribe(data => {



            if (data["msg"] === "ok") {
              // this.message = "Uspesno promenjena lozinka";
              this.notificationService.success("Uspesno promenjena lozinka");


            }

          }
          )
        }
        else
          // this.message = "Originalna lozinka ne odgovara";
          this.notificationService.error("Originalna lozinka ne odgovara");

      });
    }
  }
}
