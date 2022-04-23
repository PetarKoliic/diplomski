import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { GeneralService } from '../services/general.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private router: Router, private service: GeneralService,
    private notificationService: NotificationService) { }

    user_payed: boolean = true;

  ngOnInit(): void {


    let user: User = JSON.parse(localStorage.getItem("user"));


    let extra_date = new Date((new Date).getTime() + 10 * (1000 * 60 * 60 * 24));


    console.log(user);

    console.log(user.valid_until);
    console.log(new Date());
    const valid_until = new Date(user.valid_until);

    
    if (valid_until >= new Date()) {
      console.log("i dalje sam validan");

    }
    else if (valid_until <= extra_date) {
      console.log("samo upozoravaj");
      // let diffDays = extra_date.getDate() - valid_until.getDate();

      var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds


      var diffDays = Math.round(Math.abs((extra_date.getTime() - valid_until.getTime()) / (oneDay)))

      this.notificationService.alert("Upozoronje niste platili za ovaj mesec istice vam clanarina imate rok placanja jos " + diffDays + " dana.");
    }
    else {
      console.log("nisam vise validan");

      this.user_payed = false;

      this.notificationService.alert("istekao je rok zakasnelog placanja uplatite mesecnu clanarinu kako biste odblokirali sve funkcionalnosti");
    }

  }

}
