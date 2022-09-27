import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../services/general.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css'],
})
export class RedirectComponent implements OnInit {
  constructor(
    private router: Router,
    private service: GeneralService,
    private notificationService: NotificationService
  ) {}

  register_form_flag: boolean = false;
  username: string = '';
  type: string = '';
  message_success: string;
  message_failure: string = '';
  email: string;
  firstname: string;
  lastname: string;

  ngOnInit(): void {
    // console.log(this._router.snapshot.paramMap.get('username'));
    // console.log(this._router.snapshot.paramMap.get('email'));

    // ew URLSearchParams(queryString);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    this.email = urlParams.get('email');
    // this.username = urlParams.get('username');
    this.firstname = urlParams.get('firstname');
    this.lastname = urlParams.get('lastname');

    console.log(this.email);
    console.log(this.username);


    this.login_register(this.username, this.firstname, this.lastname, this.email);
    // this.service
    //   .login_register(this.username, this.firstname, this.lastname, this.email)
    //   .subscribe((user: any) => {
    //     console.log(user);

    //     localStorage.setItem('type', user.type);
    //     localStorage.setItem('user', JSON.stringify(user));
    //     localStorage.setItem('username', user.username);

    //     if (user['msg'] === 'unregistered') this.register_form_flag = true;
    //     else if (user.type === 'appraiser')
    //       this.router.navigate(['/appraiser']);
    //     else if (user.type === 'admin') this.router.navigate(['/admin']);
    //     else this.router.navigate(['/user']);
    //   });
  }


  login_register(username: string, firstname: string, lastname: string, email: string)
  {
    this.service
    .login_register(this.username, this.firstname, this.lastname, this.email)
    .subscribe((user: any) => {
      console.log(user);

      localStorage.setItem('type', user.type);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('username', user.username);

      if (user['msg'] === 'unregistered') this.register_form_flag = true;
      else if (user.type === 'appraiser')
        this.router.navigate(['/appraiser']);
      else if (user.type === 'admin') this.router.navigate(['/admin']);
      else this.router.navigate(['/user']);
    });
  }

  register() {
    if (this.username === '' || this.type === '') {

      this.notificationService.error('svako polje mora biti uneto');
    } else {
      // this.message = this.checkPw(this.password);
      // if error message "" means no error
      // if (this.checkPw(this.password) === "") {
      this.service
        .register_google(
          this.username,
          this.firstname,
          this.lastname,
          this.email,
          this.type
        )
        .subscribe(async (user: any) => {

          if (user['msg'] === 'ok') {
            console.log('sve ok');




            localStorage.setItem('type', user.type);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('username', user.username);

            this.notificationService.success('uspesno napravljen nov nalog');


            await this.login_register(this.username, this.firstname, this.lastname, this.email);


          //   if (this.type === 'appraiser')
          //     this.router.navigate(['/appraiser']);
          //   else if (this.type === 'admin')
          //     this.router.navigate(['/admin']);
          //   else
          //     this.router.navigate(['/user']);
          // } else {

          //   console.log('msg');
          //   console.log(user['msg']);

          //   this.notificationService.error(user['msg']);
          } else
          {
            this.notificationService.error("korisnicko ime vec postoji");
          }
        });
    }
  }
}
