import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient, private ruter: Router) { }



  login(username: string, password: string) {
    const data = {
      'username': username,
      'password': password
    }

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

  register(username: string, firstname: string, lastname: string, password: string, email: string, type: string) {


    const data = {
      'username': username,
      'password': password,
      'firstname': firstname,
      'lastname': lastname,
      'email': email,
      'type': type
    };

    // console.log(data);
    return this.http.post(`${this.uri}/register`, data);
  }


  upload_pic(picture: File) {



    console.log("slika na servisu pozvana");
    console.log(picture.size);
    console.log(picture);
    const file = new FormData();

    file.append("picture", picture);
    console.log(picture.name);
    // file.append("username",username);

    console.log("fajl u servisu : ");
    console.log(file);

    return this.http.post(`${this.uri}/upload_pic`, file);


  }


  add_appraisals(images: File[], username: string, description: string) {

    console.log(username);
    const data = new FormData();
    data.append("username", username);
    data.append("description", description)

    for (let i = 0; i < images.length; i++) {
      data.append('images', images[i]);
    }


    return this.http.post(`${this.uri}/add-appraisal`, data);
  }


  get_current_appraisals_user(username: string) {

    const data = {
      'username': username
    }

    console.log("usao u current appraisal");
    console.log(username);

    return this.http.post(`${this.uri}/get-current-appraisals-user`, data);
  }

  get_current_appraisals_appraiser(username: string) {
    const data = {
      "username": username
    }
    return this.http.post(`${this.uri}/get-current-appraisals-appraiser`, data);
  }

  get_current_appraisals_appraiser_history(username: string) {
    const data = {
      "username": username
    }
    return this.http.post(`${this.uri}/get-current-appraisals-appraiser-history`, data);
  }

  get_all_current_appraisals() {

    return this.http.post(`${this.uri}/get-all-current-appraisals`, {});
  }

  finish_appraisal(id: string, value: number) {
    const data = {
      'value': value,
      '_id': id
    }
    

    return this.http.post(`${this.uri}/finish-appraisal`, data);
  }

  delete_appraisal(id: string) {
    const data = {
      '_id': id
    }
    

    return this.http.post(`${this.uri}/delete-appraisal`, data);
  }

  give_appraisal(id: string, username: string, value: number) {

    const data = {
      'username': username,
      'value': value,
      '_id': id
    }

    return this.http.post(`${this.uri}/give-appraisal`, data);
  }

  check_old_password(username: string, old_password: string) {
    const data = {
      'username': username,
      'old_password': old_password
    }

    return this.http.post(`${this.uri}/check-old-password`, data);
  }

  change_password(username: string, new_password: string) {
    const data = {
      'username': username,
      'new_password': new_password
    }

    return this.http.post(`${this.uri}/change-password`, data);
  }

  get_ratings_by_user(username: string)
  {
    const data = {
      'username': username,
    }

    return this.http.post(`${this.uri}/get-ratings-by-user`, data);
  }

  load_all_users()
  {

    return this.http.get(`${this.uri}/load-all-users`);
  }

  delete_user(username: string)
  {
    const data = {
      'username': username,
    }

    return this.http.post(`${this.uri}/delete-user`, data);
  }

}


