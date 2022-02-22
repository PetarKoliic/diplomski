import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {

  constructor(private router: Router, private service: GeneralService) { }

  username: string;
  rating: number;

  ngOnInit(): void {
    this.username = JSON.parse(localStorage.getItem("user")).username;



  }

  logout()
  {
    localStorage.clear();
    this.router.navigate(['']);

  }

}
