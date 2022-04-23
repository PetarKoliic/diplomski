import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-blocked-menu',
  templateUrl: './user-blocked-menu.component.html',
  styleUrls: ['./user-blocked-menu.component.css']
})
export class UserBlockedMenuComponent implements OnInit {

  constructor(private router: Router) { }

  username: string;
  ngOnInit(): void {
    this.username = JSON.parse(localStorage.getItem("user")).username;
    
  }

  logout()
  {
    localStorage.clear();
    this.router.navigate(['']);

  }

}
