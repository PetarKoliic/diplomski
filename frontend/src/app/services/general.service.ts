import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  uri = 'http://localhost:4000';

  constructor(private http: HttpClient, private ruter: Router) { }

  login(username: string, password: string) {
    const data = {
      username: username,
      password: password,
    };

    // console.log(data);
    return this.http.post(`${this.uri}/login`, data);
  }

  // testing
  // get_img()
  // {
  //   const data = {
  //     url: "1644117757165-slika2.png"
  //   };

  //   return this.http.post(`${this.uri}/image.png`, data);
  // }

  register(
    username: string,
    firstname: string,
    lastname: string,
    password: string,
    email: string,
    type: string
  ) {
    const data = {
      username: username,
      password: password,
      firstname: firstname,
      lastname: lastname,
      email: email,
      type: type,
      payed: 0,
      bonus: 0,
      // 'owned':  ovo dodati unutar servera
      date_added: new Date(),
      last_payment: new Date(),
      valid_until: new Date(),
    };

    // console.log(data);
    return this.http.post(`${this.uri}/register`, data);
  }

  register_google(
    username: string, firstname: string, lastname: string, email: string, type: string) {
    let data: any;

    console.log(username + " : " + firstname + " " + lastname + " " + email
    + " " + type);
    if (type == "user") {
      data = {
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        type: type,
        payed: 0,
        bonus: 0,
        // 'owned':  ovo dodati unutar servera
        date_added: new Date(),
        last_payment: new Date(),
        valid_until: new Date(),
      };
    }
    else {
      data = {
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        type: type,
        date_added: new Date(),
      }

    }
    // console.log(data);
    return this.http.post(`${this.uri}/register-google`, data);
  }

  upload_pic(picture: File) {
    console.log('slika na servisu pozvana');
    console.log(picture.size);
    console.log(picture);
    const file = new FormData();

    file.append('picture', picture);
    console.log(picture.name);
    // file.append("username",username);

    console.log('fajl u servisu : ');
    console.log(file);

    return this.http.post(`${this.uri}/upload_pic`, file);
  }

  add_appraisals(
    images: File[],
    username: string,
    name: string,
    country: string,
    date: Date,
    author: string,
    description: string
  ) {
    console.log(username);
    const data = new FormData();
    data.append('username', username);
    data.append('description', description);
    data.append('name', name);
    data.append('country', country);
    data.append('date', date.toString());
    data.append('author', author);

    for (let i = 0; i < images.length; i++) {
      data.append('images', images[i]);
    }

    return this.http.post(`${this.uri}/add-appraisal`, data);
  }

  get_current_appraisals_user(username: string) {
    const data = {
      username: username,
    };

    console.log('usao u current appraisal');
    console.log(username);

    return this.http.post(`${this.uri}/get-current-appraisals-user`, data);
  }

  get_history_appraisals_user(username: string) {
    const data = {
      username: username,
    };

    console.log('usao u history appraisal user');
    console.log(username);

    return this.http.post(`${this.uri}/get-history-appraisals-user`, data);
  }

  get_current_appraisals_appraiser(username: string) {
    const data = {
      username: username,
    };
    console.log('pozvan sam');
    return this.http.post(`${this.uri}/get-current-appraisals-appraiser`, data);
  }

  get_current_appraisals_appraiser_history(username: string) {
    const data = {
      username: username,
    };
    return this.http.post(
      `${this.uri}/get-current-appraisals-appraiser-history`,
      data
    );
  }

  get_all_current_appraisals() {
    return this.http.post(`${this.uri}/get-all-current-appraisals`, {});
  }

  finish_appraisal(id: string, value: number) {
    const data = {
      value: value,
      _id: id,
    };

    return this.http.post(`${this.uri}/finish-appraisal`, data);
  }

  user_finish_appraisal(id: string) {
    const data = {
      _id: id,
    };

    return this.http.post(`${this.uri}/user-finish-appraisal`, data);
  }

  delete_appraisal(id: string) {
    const data = {
      _id: id,
    };

    return this.http.post(`${this.uri}/delete-appraisal`, data);
  }

  give_appraisal(id: string, username: string, value: number) {
    const data = {
      username: username,
      value: value,
      _id: id,
    };

    return this.http.post(`${this.uri}/give-appraisal`, data);
  }

  check_old_password(username: string, old_password: string) {
    const data = {
      username: username,
      old_password: old_password,
    };

    return this.http.post(`${this.uri}/check-old-password`, data);
  }

  change_password(username: string, new_password: string) {
    const data = {
      username: username,
      new_password: new_password,
    };

    return this.http.post(`${this.uri}/change-password`, data);
  }

  get_ratings_by_user(username: string) {
    const data = {
      username: username,
    };

    return this.http.post(`${this.uri}/get-ratings-by-user`, data);
  }

  load_all_users() {
    return this.http.get(`${this.uri}/load-all-users`);
  }

  delete_user(username: string) {
    const data = {
      username: username,
    };

    return this.http.post(`${this.uri}/delete-user`, data);
  }

  get_all_topics() {
    return this.http.post(`${this.uri}/get-all-topics`, {});
  }

  get_rating(username: string) {
    const data = {
      username: username,
    };

    return this.http.post(`${this.uri}/get-rating`, data);
  }

  get_topic(title: string) {
    const data = {
      title: title
    };

    return this.http.post(`${this.uri}/get-topic`, data);
  }

  add_topic(
    username: string,
    title: string,
    category: string,
    comment: string
  ) {
    const data = {
      username: username,
      title: title,
      category: category,
      comment: comment,
      date: new Date(),
    };

    return this.http.post(`${this.uri}/add-topic`, data);
  }

  add_comment(
    username: string,
    topic_id: string,
    date_added: Date,
    comment: string
  ) {
    const data = {
      username: username,
      date_added: date_added,
      _id: topic_id,
      comment: comment,
    };

    console.log(data);

    return this.http.post(`${this.uri}/add-comment`, data);
  }

  delete_comment(
    username: string,
    topic_id: string,
    comment: string,
    date_added: Date
  ) {
    const data = {
      username: username,
      date_added: date_added,
      comment: comment,
      _id: topic_id,
    };

    console.log(data);

    return this.http.post(`${this.uri}/delete-comment`, data);
  }

  redirect() {
    return this.http.get(`${this.uri}/redirect`, {});
  }

  auth_google() {
    // const data = {'responseType': 'text'};
    return this.http.get(`${this.uri}/auth-google`, { responseType: 'text' });

    // return this.http.post(
    //   'http://10.0.1.19/login',
    //   {email, password},
    //   {responseType: 'text'})
  }

  login_register(
    username: string,
    firstname: string,
    lastname: string,
    email: string
  ) {
    const data = {
      username: username,
      firstname: firstname,
      lastname: lastname,
      email: email,
    };

    return this.http.post(`${this.uri}/login-register`, data);
  }

  pay(stripeToken: any) {
    return this.http.post(`${this.uri}/pay`, { token: stripeToken });
  }

  get_monthly_fee() {
    return this.http.get(`${this.uri}/get-monthly-fee`);
  }

  update_subscription(username: string) {
    const data = {
      username: username,
    };
    return this.http.post(`${this.uri}/update-subscription`, data);
  }

  get_subscription_valid_until(username: string) {
    const data = {
      username: username,
    };
    return this.http.post(`${this.uri}/get-subscription-valid-until`, data);
  }

  appraisal_change_mind(id: string, username: string, value: number) {
    const data = {
      username: username,
      value: value,
      _id: id,
    };

    return this.http.post(`${this.uri}/appraisal-change-mind`, data);
  }


  add_revenue()
  {
    const data = {};
    return this.http.post(`${this.uri}/add-revenue-monthly-subscription`, data);

  }
}
