import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-appraiser-menu',
  templateUrl: './appraiser-menu.component.html',
  styleUrls: ['./appraiser-menu.component.css']
})
export class AppraiserMenuComponent implements OnInit {

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
