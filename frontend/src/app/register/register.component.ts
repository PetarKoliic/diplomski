import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { GeneralService } from '../services/general.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private service: GeneralService) { }

  ngOnInit(): void {
    this.message_failure = "";
    this.message_success = "";

  }

  register() {

    this.message_failure = "";
    this.message_success = "";

    console.log(this.message_failure);
    console.log('usao u register');

    // username: string;
    // password: string;
    // firstname: string;

    // lastname: string;
    // nationality: string;
    // email: string;
    // type: string;


    if (this.username == "" || this.password == "" || this.firstname == "" ||
      this.lastname == "" || this.email == "" ||
      this.type == "") {
      this.message_failure = "svako polje mora biti uneto";
    } 
    else if(this.password!=this.password_repeat){
      this.message_failure ='lozinke se ne poklapaju';
    }
    else if(this.validateEmail(this.email) == false)
    {
      this.message_failure = "email mora postovati formu";
    }
    else {

      // this.message = this.checkPw(this.password);
      // if error message "" means no error
      // if (this.checkPw(this.password) === "") {
        this.service.register(this.username,  this.firstname, this.lastname, CryptoJS.SHA3(this.password, { outputLength: 224 }).toString(), this.email, this.type).subscribe(
          (user  : Object) => {
            if (user['msg'] == 'ok') {
              console.log('sve ok');

              this.message_success = "uspesno napravljen nov nalog";
              
              this.username = "";
              this.password = "";
              this.firstname = "";
              this.lastname = "";
              this.email = "";
              this.type = "";
              this.password_repeat = "";


              // username: string = "";
              // password: string = "";
              // firstname: string = "";
              // lastname: string = "";
              // email: string = "";
              // type: string = "";
              // password_repeat:string="";
            }
            else
              this.message_failure = user['user'];


          });
      }
  }
  validateEmail(elementValue) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue);
  }

  private check_email_format(email: string): string {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (regex.test(email))
      return '';
    else
      return 'greska format emaila nije dobar \n';
  }


  checkPw(pw: string): string {
    var numerics = 0;
    var upercase = 0;
    var lowercase = 0;
    var specials = 0;
    var err = false;
    let msg_err = "";
    var prevChar;
    var sameCharsInARow = 1;
    if (pw.length < 8 || pw.length > 12) {
      err = true;
      msg_err = msg_err + "duzina mora biti izmedju 8 i 12 karaktera  ";
      // console.log("msg_err " + msg_err);
      // console.log("duzina ne odgovara");
    } else {
      for (var i = 0; i < pw.length; i++) {
        var ascii = pw.charCodeAt(i);
        if (i != 0 && ascii == prevChar) {
          sameCharsInARow++;
          if (sameCharsInARow == 3) {
            err = true;
            msg_err = msg_err + "broj ponavljanja 3 ili vise karaktera  ";
            // console.log("broj ponavljanja 3 ili vise");

            break;
          }
        } else {
          prevChar = ascii;
          sameCharsInARow = 1;
        }
        if (ascii >= 65 && ascii <= 90)
          upercase++;
        else if (ascii >= 97 && ascii <= 122)
          lowercase++;
        else if (ascii >= 48 && ascii <= 57)
          numerics++;
        else if ((ascii >= 32 && ascii <= 47) || (ascii >= 58 && ascii <= 64) || (ascii >= 91 && ascii <= 96) || (ascii >= 123 && ascii <= 126))
          specials++;
        else {
          // console.log("uslov ovde");
          msg_err = msg_err + "svi karakteri moraju biti alfanumericki ili specijalni karakteri  ";
          err = true;
          break;
        }
        if (i == 0 && upercase == 0 && lowercase == 0) {
          msg_err = msg_err + "prvi karakter mora biti slovo  ";
          err = true;
          // console.log(msg_err + " idi  u break");
          break;
        }
      }
    }
    if (err || lowercase < 3)
      msg_err = msg_err + "broj malih slova manji od 3 ";
    if (
      upercase == 0)
      msg_err = msg_err + "broj velikih slova mora biti bar 1 ";
    if (numerics < 2)
      msg_err = msg_err + "broj numerik karaktera mora biti bar 2 ";
    if (specials < 2)
      msg_err = msg_err + "broj specijalnih karaktera mora biti bar 2 ";


    // console.log("!err " + !err + " err " + err);

    // console.log("msg_err" + msg_err);

    // msg_err = msg_err  + " konkatenacija";
    return msg_err;
  }



  username: string = "";
  password: string = "";
  firstname: string = "";
  lastname: string = "";
  email: string = "";
  type: string = "";
  password_repeat:string="";

  message_success: string;
  message_failure: string = "";




}
