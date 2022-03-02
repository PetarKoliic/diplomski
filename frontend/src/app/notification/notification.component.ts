import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(

    public notificationService: NotificationService,
    private _snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {

  }



  openSnackBar(message: string, action: string, className: string) {

    this._snackBar.open(message, action, {
      duration: 0,
      panelClass: [className]

    });

  }



  showAlert() {

    this.notificationService.alert("an alert", "notice", () => {
      
      this.notificationService.success("alert oked");
    });

  }



  showConfirm() {

    this.notificationService.confirmation("it will be gone forever", () => {

      this.notificationService.success("confirm oked");

    },

      'Are you sure?',

      () => {

        this.notificationService.error("confirm canceled");

      });

  }

}
