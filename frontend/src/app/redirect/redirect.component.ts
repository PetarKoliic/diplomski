import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../services/general.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';


@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {

  constructor(private router: Router, private service: GeneralService) { }

  ngOnInit(): void {

    // console.log(this._router.snapshot.paramMap.get('username'));
    // console.log(this._router.snapshot.paramMap.get('email'));

    // ew URLSearchParams(queryString);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const email = urlParams.get('email');
    const username = urlParams.get('username');
    const firstname = urlParams.get('firstname');
    const lastname = urlParams.get('lastname');


    console.log(email);
    console.log(username);

    this.service.login_register(username, firstname, lastname, email).subscribe((user: User)=> {

      console.log(user);

      localStorage.setItem("type", user.type);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("username", user.username);

      if (user.type === "appraiser")
      this.router.navigate(['/appraiser']);
    else if (user.type === "admin")
      this.router.navigate(['/admin']);
    else
      this.router.navigate(['/user']);

    });
  }

}
