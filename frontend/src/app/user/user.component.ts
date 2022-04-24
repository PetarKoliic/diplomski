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
    username: string;

  ngOnInit(): void {



    let user: User = JSON.parse(localStorage.getItem("user"));

    this.username = user.username;

    // let extra_date = new Date((new Date).getTime() + 10 * (1000 * 60 * 60 * 24));
    let curr_date = new Date((new Date).getTime());

    // console.log(user);
    // console.log(extra_date);

    // console.log(user.valid_until);
    // console.log(new Date());
    this.service.get_subscription_valid_until(this.username).subscribe((res: any) => {

      const valid_until = new Date(res["valid_until"]);
    // console.log("valid until");
    // console.log(valid_until);

    let extra_valid_date = new Date(valid_until.getTime() + 10 * (1000 * 60 * 60 * 24));

    console.log("valid_until, extra_valid_date, curr_date");
    console.log(valid_until);
    console.log(extra_valid_date);
    console.log(curr_date);

    if (valid_until >= curr_date) {
      console.log("i dalje sam validan");

    }
    else if (extra_valid_date >= curr_date) {


      // let diffDays = extra_date.getDate() - valid_until.getDate();

      var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds


      var diffDays = Math.round(Math.abs((extra_valid_date.getTime() - curr_date.getTime()) / (oneDay)))

      console.log("diffDays : " + diffDays);

      this.notificationService.alert("Upozoronje niste platili za ovaj mesec istice vam clanarina imate rok placanja jos " + diffDays + " dana.");
    }
    else {
      console.log("nisam vise validan");

      this.user_payed = false;

      this.notificationService.alert("istekao je rok zakasnelog placanja uplatite mesecnu clanarinu kako biste odblokirali sve funkcionalnosti");
    }

    });
    

  }

}
