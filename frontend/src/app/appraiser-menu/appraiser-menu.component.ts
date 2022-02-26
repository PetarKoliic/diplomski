import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../services/general.service';


@Component({
  selector: 'app-appraiser-menu',
  templateUrl: './appraiser-menu.component.html',
  styleUrls: ['./appraiser-menu.component.css']
})
export class AppraiserMenuComponent implements OnInit {

  constructor(private router: Router, private service: GeneralService) { }

  username: string;
  rating: any;


  ngOnInit(): void {
    this.username = JSON.parse(localStorage.getItem("user")).username;


    this.load_all_topics();
  }

  load_all_topics()
  {
    this.service.get_rating(this.username).subscribe((res) => {

      
      this.rating = res["rating"].toFixed(2);

      // this.rating.toFixed(2);
    });  
  }

  logout()
  {
    localStorage.clear();
    this.router.navigate(['']);

  }

}
