import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { GeneralService } from '../services/general.service';
import { User } from '../models/user.model';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private service: GeneralService) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;
  message: string;
  stagod: string;

  login() {
    this.message = "";

    if (this.username == "" || this.password == "") {
      this.message = "svi podaci moraju biti uneti";
      return;
    }
    else {

      this.service.login(this.username, CryptoJS.SHA3(this.password, { outputLength: 224 }).toString()).subscribe((user: User) => {


        console.log(user);

        // && wrap_user != undefined && Object.keys(wrap_user).length > 1
        if (user != null) {


          // console.log(JSON.stringify(wrap_user));
          // console.log('odgovor na frontendu je : ' + wrap_user.type);

          localStorage.setItem("type", JSON.stringify(user.type));
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("username", user.username);


          if (user.type === "appraiser")
            this.router.navigate(['/appraiser']);
          else if (user.type === "admin")
            this.router.navigate(['/admin']);
          else
            this.router.navigate(['/user']);


        }

        this.message = "greska korisnicko ime i/ili lozinka ne odgovaraju nijednom korisniku";
        this.username = "";
        this.password = "";

      });
    }
  }

  register()
  {
    this.router.navigate(['/register']);
  }

  encryptedMessage: string;
  decryptedMessage: string;
  encrypt() {

    this.encryptedMessage = CryptoJS.AES.encrypt(this.message.trim(), "333").toString();
    this.decryptedMessage = CryptoJS.AES.decrypt(this.encryptedMessage, "333").toString(CryptoJS.enc.Utf8);

    console.log("enkriptovano");
    console.log(this.encryptedMessage);
    console.log("dekriptovano");
    console.log(CryptoJS.AES.decrypt(this.encryptedMessage, "333").toString(CryptoJS.enc.Utf8));


    console.log("SHA");
    // var hash = CryptoJS.SHA3("qwerty", { outputLength: 224 }).toString();

    // console.log(hash);
  }
}

