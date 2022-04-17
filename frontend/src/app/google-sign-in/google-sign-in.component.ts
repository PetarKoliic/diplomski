import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-google-sign-in',
  templateUrl: './google-sign-in.component.html',
  styleUrls: ['./google-sign-in.component.css']
})
export class GoogleSignInComponent implements OnInit {

  constructor(private router: Router, private service: GeneralService) { }

  ngOnInit(): void {

  //


  // window.location.href =  "http://localhost:4000/auth-google";
//
    // this.service.auth_google().subscribe((user: any) => {

    //   console.log(user);
    // });


    // this.service.redirect().subscribe((user: any) => {
    //   console.log("user");
    // })
    window.location.href = 'http://localhost:4000/auth-google';


      // window.open('");
     let listener = window.addEventListener('DOMContentLoaded', (message) => {
       //message will contain google user and details

       console.log(message);
     });
}

// flogin(){
//   window.open('/auth-google',"mywindow","location=1,status=1,scrollbars=1, width=800,height=800");
//  let listener = window.addEventListener('message', (message) => {
   
//   console.log(message);
//  });
 
//  }
}
